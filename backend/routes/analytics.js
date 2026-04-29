const express = require('express');
const router = express.Router();
const { Booking, Service, Staff, User, sequelize } = require('../models');
const { verifyAdmin } = require('../middleware/auth');
const { Op } = require('sequelize');

// GET /api/analytics/summary - Get overall analytics summary (Admin only)
router.get('/summary', verifyAdmin, async (req, res) => {
    try {
        // 1. Total Revenue (Paid bookings)
        const totalRevenue = await Booking.sum('totalAmount', { where: { paymentStatus: 'Paid' } });

        // 2. Bookings by Status
        const statusCounts = await Booking.findAll({
            attributes: ['status', [sequelize.fn('COUNT', sequelize.col('status')), 'count']],
            group: ['status']
        });

        // 3. Top Stylists
        const topStylists = await Booking.findAll({
            attributes: [
                'staffId',
                [sequelize.fn('COUNT', sequelize.col('Booking.id')), 'bookingCount']
            ],
            include: [{ model: Staff, attributes: ['name'] }],
            group: ['Booking.staffId', 'Staff.id', 'Staff.name'],
            order: [[sequelize.fn('COUNT', sequelize.col('Booking.id')), 'DESC']],
            limit: 5
        });

        // 4. Peak Booking Hours
        const peakHours = await Booking.findAll({
            attributes: [
                'time',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            group: ['time'],
            order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
            limit: 8
        });

        res.json({
            totalRevenue: totalRevenue || 0,
            statusCounts,
            topStylists,
            peakHours
        });
    } catch (err) {
        console.error('Analytics Error:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
