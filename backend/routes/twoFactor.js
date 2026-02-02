const express = require('express');
const router = express.Router();
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const { User } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// POST /api/2fa/generate - Generate Secret & QR Code
router.post('/generate', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);

        // Generate secret
        const secret = speakeasy.generateSecret({
            name: `SalonApp (${user.email})`
        });

        // Save secret temporarily (or permanently but disabled)
        user.twoFactorSecret = secret.base32;
        await user.save();

        // Generate QR Code
        qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
            if (err) {
                return res.status(500).json({ message: 'Error creating QR code' });
            }
            res.json({
                secret: secret.base32,
                qrCode: data_url
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/2fa/verify - specific for enabling
router.post('/verify', authenticateToken, async (req, res) => {
    try {
        const { token } = req.body;
        const user = await User.findByPk(req.user.id);

        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token: token
        });

        if (verified) {
            user.isTwoFactorEnabled = true;
            await user.save();
            res.json({ success: true, message: '2FA Enabled Successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid Token' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/2fa/validate - for login flow
const jwt = require('jsonwebtoken');

// ... (top of file)

router.post('/validate', async (req, res) => {
    try {
        const { userId, token } = req.body;
        const user = await User.findByPk(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token: token
        });

        if (verified) {
            const authToken = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                success: true,
                token: authToken,
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role
            });
        } else {
            res.status(400).json({ success: false, message: 'Invalid Token' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/2fa/disable - Disable 2FA
router.post('/disable', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        user.isTwoFactorEnabled = false;
        user.twoFactorSecret = null;
        await user.save();
        res.json({ success: true, message: '2FA Disabled' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
