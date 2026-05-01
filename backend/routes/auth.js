const express = require('express');
const router = express.Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { authenticateToken } = require('../middleware/auth');

// Helper to sign token
const signToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

// POST /api/auth/register
router.post('/register', catchAsync(async (req, res) => {
    const { name, email, password, referralCode } = req.body;

    // Check if user exists
    let user = await User.findOne({ where: { email } });
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }

    let referredById = null;
    if (referralCode) {
        const referrer = await User.findOne({ where: { referralCode } });
        if (referrer) {
            referredById = referrer.id;
        }
    }

    // Create user
    user = await User.create({
        name,
        email,
        password,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        referredBy: referredById
    });

    const token = signToken(user);

    res.json({
        token,
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        isTwoFactorEnabled: user.isTwoFactorEnabled,
        loyaltyPoints: user.loyaltyPoints,
        referralCode: user.referralCode
    });
}));

// POST /api/auth/login
router.post('/login', catchAsync(async (req, res) => {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Check password securely
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Check if 2FA is enabled
    if (user.isTwoFactorEnabled) {
        return res.json({
            twoFactorRequired: true,
            userId: user.id,
            message: 'Two-Factor Authentication Required'
        });
    }

    const token = signToken(user);

    res.json({
        token,
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        isTwoFactorEnabled: user.isTwoFactorEnabled,
        loyaltyPoints: user.loyaltyPoints,
        referralCode: user.referralCode
    });
}));

// GET /api/auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// GET /api/auth/google/callback
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=GoogleAuthFailed`, session: false }),
    (req, res) => {
        // Successful authentication
        const token = signToken(req.user);
        // Redirect to frontend
        res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?token=${token}`);
    }
);

// GET /api/auth/me - Get current user using token
router.get('/me', authenticateToken, catchAsync(async (req, res) => {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        isTwoFactorEnabled: user.isTwoFactorEnabled,
        loyaltyPoints: user.loyaltyPoints,
        referralCode: user.referralCode
    });
}));

module.exports = router;
