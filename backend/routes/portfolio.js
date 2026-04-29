const express = require('express');
const router = express.Router();
const { Portfolio } = require('../models');
const { verifyAdmin } = require('../middleware/auth');

// GET /api/portfolio - Fetch all lookbook items
router.get('/', async (req, res) => {
    try {
        const portfolio = await Portfolio.findAll({ order: [['createdAt', 'DESC']] });
        res.json(portfolio);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/portfolio - Add new work to gallery (Admin only)
router.post('/', verifyAdmin, async (req, res) => {
    try {
        const item = await Portfolio.create(req.body);
        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
