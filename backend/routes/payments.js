const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Booking, Service, User, Plan, GiftCard } = require('../models');
const { sendPaymentSuccessNotification } = require('../utils/whatsappService');
const crypto = require('crypto');

// POST /api/payments/create-checkout-session
router.post('/create-checkout-session', async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findByPk(bookingId, {
            include: [{ model: Service }]
        });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: booking.Service.name,
                            description: `Booking for ${booking.date} at ${booking.time}`,
                        },
                        unit_amount: Math.round(parseFloat(booking.Service.price) * 100), // Stripe expects cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/payment-cancelled`,
            metadata: {
                bookingId: booking.id.toString(),
            },
        });

        booking.stripeSessionId = session.id;
        booking.totalAmount = booking.Service.price;
        await booking.save();

        res.json({ id: session.id, url: session.url });
    } catch (err) {
        console.error('Stripe Session Error:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

// POST /api/payments/webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook Signature Error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        
        if (session.metadata && session.metadata.type === 'gift_card') {
            const amount = parseFloat(session.metadata.amount);
            const recipientEmail = session.metadata.recipientEmail;
            const code = crypto.randomBytes(4).toString('hex').toUpperCase(); // 8 char code

            await GiftCard.create({
                code: `SALON-${code}`,
                initialValue: amount,
                balance: amount,
                recipientEmail: recipientEmail,
                status: 'active'
            });
            console.log(`Gift Card SALON-${code} generated for ${recipientEmail}`);
        } else if (session.mode === 'subscription') {
            const userId = session.metadata.userId;
            const planId = session.metadata.planId;
            const user = await User.findByPk(userId);
            if (user) {
                user.planId = planId;
                user.subscriptionStatus = 'active';
                user.stripeCustomerId = session.customer;
                await user.save();
                console.log(`User ${userId} subscribed to Plan ${planId}`);
            }
        } else {
            const bookingId = session.metadata.bookingId;
            const booking = await Booking.findByPk(bookingId, {
                include: [{ model: Service }]
            });
            if (booking) {
                booking.paymentStatus = 'Paid';
                booking.status = 'Confirmed';
                await booking.save();
                sendPaymentSuccessNotification(booking, booking.Service.name);
                console.log(`Booking ${bookingId} marked as Paid and notified`);
            }
        }
    } else if (event.type === 'customer.subscription.deleted') {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        const user = await User.findOne({ where: { stripeCustomerId: customerId } });
        if (user) {
            user.subscriptionStatus = 'inactive';
            user.planId = null;
            await user.save();
            console.log(`User ${user.id} subscription cancelled`);
        }
    }

    res.json({ received: true });
});

module.exports = router;
