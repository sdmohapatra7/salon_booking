const express = require('express');
const router = express.Router();
const { Staff } = require('../models');
const { verifyAdmin } = require('../middleware/auth');

// GET /api/staff - Fetch all staff
router.get('/', async (req, res) => {
    try {
        const staff = await Staff.findAll({ where: { isActive: true } });
        res.json(staff);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/staff - Add new staff (Admin only)
router.post('/', verifyAdmin, async (req, res) => {
    try {
        const staff = await Staff.create(req.body);
        res.json(staff);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// PUT /api/staff/:id - Update staff (Admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
    try {
        const staff = await Staff.findByPk(req.params.id);
        if (!staff) return res.status(404).json({ message: 'Staff not found' });
        
        await staff.update(req.body);
        res.json(staff);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE /api/staff/:id - Soft delete staff (Admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const staff = await Staff.findByPk(req.params.id);
        if (!staff) return res.status(404).json({ message: 'Staff not found' });
        
        staff.isActive = false;
        await staff.save();
        res.json({ message: 'Staff removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
