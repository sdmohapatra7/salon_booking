const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { GiftCard } = require('../models');
const crypto = require('crypto');

// POST /api/gift-cards/buy - Create a checkout session for buying a gift card
router.post('/buy', async (req, res) => {
    try {
        const { amount, recipientEmail } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Salon Gift Card - $${amount}`,
                            description: `Digital gift card for use at our salon. Recipient: ${recipientEmail}`,
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/gift-cards/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/gift-cards`,
            metadata: {
                type: 'gift_card',
                amount: amount.toString(),
                recipientEmail: recipientEmail
            }
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET /api/gift-cards/validate/:code - Validate a gift card code
router.get('/validate/:code', async (req, res) => {
    try {
        const card = await GiftCard.findOne({ where: { code: req.params.code, status: 'active' } });
        if (!card) return res.status(404).json({ message: 'Invalid or expired gift card' });
        
        res.json(card);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
