const express = require('express');
const router = express.Router();
const { Service } = require('../models');

// GET /api/services - Fetch all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
