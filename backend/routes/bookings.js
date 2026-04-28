const express = require('express');
const router = express.Router();
const { Booking, Service, User } = require('../models');
const { verifyAdmin, authenticateToken } = require('../middleware/auth');
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

        const oldStatus = booking.status;
        booking.status = status;
        await booking.save();

        // Loyalty Points Logic
        if (status === 'Completed' && oldStatus !== 'Completed' && booking.userId) {
            const user = await User.findByPk(booking.userId);
            const service = await Service.findByPk(booking.serviceId);

            if (user && service) {
                const pointsEarned = Math.floor(parseFloat(service.price) * 10);
                user.loyaltyPoints += pointsEarned;
                await user.save();

                // Referral Bonus Logic: If this is the user's FIRST completed booking
                const completedCount = await Booking.count({
                    where: { userId: user.id, status: 'Completed' }
                });

                if (completedCount === 1 && user.referredBy) {
                    const referrer = await User.findByPk(user.referredBy);
                    if (referrer) {
                        referrer.loyaltyPoints += 100; // Bonus for referring a new customer
                        await referrer.save();
                    }
                }
            }
        }

        res.json(booking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET /api/bookings - Fetch user bookings (Authenticated)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            where: { userId: req.user.id },
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
        const { serviceId, date, time, notes, customerName, userId, usePoints } = req.body;

        if (!serviceId || !date || !time) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Fetch service details for price
        const service = await Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Logic for point deduction
        if (usePoints && userId) {
            const user = await User.findByPk(userId);
            if (user && user.loyaltyPoints > 0) {
                const servicePrice = parseFloat(service.price);
                const pointsNeeded = Math.min(user.loyaltyPoints, servicePrice * 100);
                user.loyaltyPoints -= pointsNeeded;
                await user.save();
                console.log(`Deducted ${pointsNeeded} points from user ${userId}`);
            }
        }

        // 1. Validate Date (Must be future)
        const bookingDate = new Date(`${date}T${time}`);
        const now = new Date();
        if (bookingDate < now) {
            return res.status(400).json({ message: 'Cannot book appointments in the past' });
        }

        // 2. Check for Double Booking
        const existingBooking = await Booking.findOne({
            where: {
                date,
                time,
                serviceId
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

        // Fetch service name for response (Already fetched above)


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
