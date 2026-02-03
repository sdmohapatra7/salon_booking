const express = require('express');
const router = express.Router();
const { Favorite, Service } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// GET /api/favorites - Get all favorites for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const favorites = await Favorite.findAll({
            where: { userId: req.user.id },
            include: [{ model: Service }]
        });

        // Format to return just the service details (as expected by frontend components usually, 
        // or return wrapper object. Frontend expects list of services for 'items')
        // Looking at Favorites.jsx, it maps over 'favorites' and expects 'service' object (id, name, etc)
        // So we should return the Service objects.
        const services = favorites.map(f => f.Service);
        res.json(services);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/favorites - Add a service to favorites
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { serviceId } = req.body;

        // Check if already exists
        const existing = await Favorite.findOne({
            where: {
                userId: req.user.id,
                serviceId
            }
        });

        if (existing) {
            return res.status(400).json({ message: 'Service already in favorites' });
        }

        await Favorite.create({
            userId: req.user.id,
            serviceId
        });

        const service = await Service.findByPk(serviceId);
        res.json(service); // Return the service details to add to store
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE /api/favorites/:serviceId - Remove a service from favorites
router.delete('/:serviceId', authenticateToken, async (req, res) => {
    try {
        const { serviceId } = req.params;

        await Favorite.destroy({
            where: {
                userId: req.user.id,
                serviceId
            }
        });

        res.json({ message: 'Removed from favorites', serviceId: parseInt(serviceId) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
