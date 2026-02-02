const express = require('express');
const router = express.Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');

// Helper to sign token
const signToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user (In real app, hash password here)
        user = await User.create({
            name,
            email,
            password,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
            // role defaults to 'customer'
        });

        const token = signToken(user);

        res.json({
            token,
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role
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

        const token = signToken(user);

        res.json({
            token,
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
