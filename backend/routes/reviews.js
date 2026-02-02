const express = require('express');
const router = express.Router();
const { Review, Booking, User, Service } = require('../models');
const { authenticateToken, verifyAdmin } = require('../middleware/auth');
const { Op } = require('sequelize');

// GET /api/reviews/service/:serviceId - Get all reviews for a service
router.get('/service/:serviceId', async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { serviceId: req.params.serviceId },
            include: [{ model: User, attributes: ['name', 'avatar'] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/reviews - Add a review (Verified Booking Only)
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { serviceId, rating, comment } = req.body;
        const userId = req.user.id;

        // 1. Check if User has a Confirmed or Completed booking for this service
        // We use Op.or to check for either status if you implement 'Completed' later. 
        // For now, assuming 'Confirmed' is enough or checks past dates.
        const booking = await Booking.findOne({
            where: {
                userId,
                serviceId,
                status: { [Op.or]: ['Confirmed', 'Completed'] }
            }
        });

        if (!booking) {
            return res.status(403).json({ message: 'You can only review services you have booked and completed.' });
        }

        // 2. Check if already reviewed (Optional, but good practice)
        const existingReview = await Review.findOne({ where: { userId, serviceId } });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this service.' });
        }

        // 3. Create Review
        const review = await Review.create({
            userId,
            serviceId,
            rating,
            comment
        });

        // Return review with user info for immediate UI update
        const reviewWithUser = await Review.findByPk(review.id, {
            include: [{ model: User, attributes: ['name', 'avatar'] }]
        });

        res.status(201).json(reviewWithUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE /api/reviews/:id - Delete (Admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        await review.destroy();
        res.json({ message: 'Review deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
