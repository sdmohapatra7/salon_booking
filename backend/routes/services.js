const express = require('express');
const router = express.Router();
const { Service } = require('../models');
const { verifyAdmin } = require('../middleware/auth');

// GET /api/services - Fetch all services (Public)
router.get('/', async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/services - Create Service (Admin)
router.post('/', verifyAdmin, async (req, res) => {
    try {
        const { name, description, price, duration, image } = req.body;
        const service = await Service.create({ name, description, price, duration, image });
        res.status(201).json(service);
    } catch (err) {
        console.error('Create Service Error:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// PUT /api/services/:id - Update Service (Admin)
router.put('/:id', verifyAdmin, async (req, res) => {
    try {
        const { name, description, price, duration, image } = req.body;
        const service = await Service.findByPk(req.params.id);

        if (!service) return res.status(404).json({ message: 'Service not found' });

        await service.update({ name, description, price, duration, image });
        res.json(service);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE /api/services/:id - Delete Service (Admin)
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);

        if (!service) return res.status(404).json({ message: 'Service not found' });

        await service.destroy();
        res.json({ message: 'Service deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
