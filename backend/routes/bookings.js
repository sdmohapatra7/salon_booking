const express = require('express');
const router = express.Router();
const { Booking, Service } = require('../models');

// GET /api/bookings - Fetch all bookings (for demo purpose, fetches all. In real app, filter by User)
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
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        booking.status = 'Cancelled';
        await booking.save();

        res.json({ success: true, message: "Booking cancelled", booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
