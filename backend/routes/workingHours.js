const express = require('express');
const router = express.Router();
const { WorkingHours } = require('../models');
const { verifyAdmin } = require('../middleware/auth');

// GET /api/working-hours - Fetch salon schedule
router.get('/', async (req, res) => {
    try {
        const hours = await WorkingHours.findAll({ order: [['dayOfWeek', 'ASC']] });
        res.json(hours);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// PUT /api/working-hours/:id - Update schedule (Admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
    try {
        const schedule = await WorkingHours.findByPk(req.params.id);
        if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
        
        await schedule.update(req.body);
        res.json(schedule);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
