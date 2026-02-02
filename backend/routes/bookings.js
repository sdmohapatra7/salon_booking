const express = require('express');
const router = express.Router();
const { Booking, Service } = require('../models');
const { verifyAdmin } = require('../middleware/auth');
const { sendBookingConfirmation, sendBookingCancellation } = require('../utils/emailService');

// GET /api/bookings/all - Fetch ALL bookings (Admin only)
router.get('/all', verifyAdmin, async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [{ model: Service, attributes: ['name', 'price'] }],
            order: [['date', 'DESC'], ['time', 'ASC']]
        });

        // Format for frontend
        const formattedBookings = bookings.map(b => ({
            id: b.id,
            serviceId: b.serviceId,
            serviceName: b.Service ? b.Service.name : 'Unknown Service',
            servicePrice: b.Service ? b.Service.price : 0,
            date: b.date,
            time: b.time,
            status: b.status,
            customerName: b.customerName,
            notes: b.notes,
            userId: b.userId
        }));

        res.json(formattedBookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// PUT /api/bookings/:id/status - Update Booking Status (Admin only)
router.put('/:id/status', verifyAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByPk(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.status = status;
        await booking.save();

        res.json(booking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET /api/bookings - Fetch user bookings (Public/User)
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [{ model: Service, attributes: ['name', 'price'] }],
            order: [['date', 'ASC']]
        });

        // Format to match frontend expectation
        const formattedBookings = bookings.map(b => ({
            id: b.id,
            serviceId: b.serviceId,
            serviceName: b.Service ? b.Service.name : 'Unknown Service',
            servicePrice: b.Service ? b.Service.price : 0,
            date: b.date,
            time: b.time,
            status: b.status,
            customerName: b.customerName,
            notes: b.notes
        }));

        res.json(formattedBookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/bookings - Create new booking
router.post('/', async (req, res) => {
    console.log('Received booking request:', req.body);
    try {
        const { serviceId, date, time, notes, customerName, userId } = req.body;

        if (!serviceId || !date || !time) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // 1. Validate Date (Must be future)
        const bookingDate = new Date(`${date}T${time}`);
        const now = new Date();
        if (bookingDate < now) {
            return res.status(400).json({ message: 'Cannot book appointments in the past' });
        }

        // 2. Check for Double Booking
        // In a real app, you'd check if the SPECIFIC STYLIST is busy.
        // For this demo, we'll assume limited slots per service/time.
        const existingBooking = await Booking.findOne({
            where: {
                date,
                time,
                serviceId // Simple rule: Can't have same service at same time (demo logic)
            }
        });

        if (existingBooking) {
            return res.status(409).json({ message: 'This time slot is already booked for this service' });
        }

        const booking = await Booking.create({
            serviceId: parseInt(serviceId),
            date,
            time,
            notes,
            customerName,
            userId,
            status: 'Confirmed'
        });

        // Fetch service name for response
        const service = await Service.findByPk(serviceId);

        // --- EMAIL SIMULATION ---
        const serviceName = service ? service.name : 'Service';
        if (userId) {
            // If logged in, fetch email (omitted query for speed, usually user email is in JWT or passed in body)
            // Using customerName or passed body email would be standard.
        }
        sendBookingConfirmation({ email: null }, { ...booking.toJSON(), serviceName });
        // ------------------------

        console.log('Booking saved successfully:', booking.id);

        res.json({
            success: true,
            message: "Booking confirmed",
            booking: {
                ...booking.toJSON(),
                serviceName: service ? service.name : 'Service',
                servicePrice: service ? service.price : 0
            }
        });
    } catch (err) {
        console.error('Error saving booking:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// POST /api/bookings/:id/cancel
router.post('/:id/cancel', async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id, {
            include: [{ model: Service, attributes: ['name'] }]
        });

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        booking.status = 'Cancelled';
        await booking.save();

        // --- EMAIL SIMULATION ---
        sendBookingCancellation({
            ...booking.toJSON(),
            serviceName: booking.Service ? booking.Service.name : 'Service'
        });
        // ------------------------

        res.json({ success: true, message: "Booking cancelled", booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
