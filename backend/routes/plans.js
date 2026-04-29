const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Plan, User } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// GET /api/plans - Fetch all active plans
router.get('/', async (req, res) => {
    try {
        const plans = await Plan.findAll({ where: { isActive: true } });
        res.json(plans);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/plans/subscribe - Create a Stripe subscription session
router.post('/subscribe', authenticateToken, async (req, res) => {
    try {
        const { planId } = req.body;
        const user = await User.findByPk(req.user.id);
        const plan = await Plan.findByPk(planId);

        if (!plan) return res.status(404).json({ message: 'Plan not found' });

        // Ensure we have a Stripe Customer ID
        let customerId = user.stripeCustomerId;
        if (!customerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                name: user.name,
                metadata: { userId: user.id.toString() }
            });
            customerId = customer.id;
            user.stripeCustomerId = customerId;
            await user.save();
        }

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            line_items: [
                {
                    price: plan.stripePriceId, // Use Stripe Price ID
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.FRONTEND_URL}/dashboard?subscription=success`,
            cancel_url: `${process.env.FRONTEND_URL}/membership?subscription=cancelled`,
            metadata: {
                userId: user.id.toString(),
                planId: plan.id.toString()
            }
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error('Subscription Session Error:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

module.exports = router;
