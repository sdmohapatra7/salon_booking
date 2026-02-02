const express = require('express');
const router = express.Router();
const { User } = require('../models');

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user (In real app, hash password here)
        user = await User.create({
            name: fullName,
            email,
            password,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`
        });

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Check password (In real app, compare hash)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
