const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { authenticate } = require('../middleware/auth');
const Order = require('../models/Order');
const User = require('../models/User');

// Create Payment Intent
router.post('/create-payment-intent', authenticate, async (req, res) => {
    try {
        const { amount, currency = 'mad', orderId } = req.body;

        if (!process.env.STRIPE_SECRET_KEY) {
            return res.status(500).json({ success: false, message: 'Stripe configuration missing' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency,
            metadata: {
                userId: req.userId.toString(),
                orderId: orderId || '',
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });
    } catch (error) {
        console.error('Payment intent error:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Create Subscription
router.post('/create-subscription', authenticate, async (req, res) => {
    try {
        const { priceId, paymentMethodId } = req.body;
        const user = await User.findById(req.userId);

        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        // Create or retrieve customer
        let customerId = user.stripeCustomerId;

        if (!customerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                metadata: {
                    userId: user._id.toString(),
                },
            });
            customerId = customer.id;

            user.stripeCustomerId = customerId;
            await user.save();
        }

        // Attach payment method
        await stripe.paymentMethods.attach(paymentMethodId, {
            customer: customerId,
        });

        // Set as default payment method
        await stripe.customers.update(customerId, {
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });

        // Create subscription
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            payment_settings: {
                payment_method_types: ['card'],
                save_default_payment_method: 'on_subscription',
            },
            expand: ['latest_invoice.payment_intent'],
        });

        // Update user subscription
        user.subscription = {
            id: subscription.id,
            status: subscription.status,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            plan: priceId,
        };
        await user.save();

        res.json({
            success: true,
            subscription,
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        });
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Cancel Subscription
router.post('/cancel-subscription', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user?.subscription?.id) {
            return res.status(400).json({
                success: false,
                message: 'No active subscription',
            });
        }

        const subscription = await stripe.subscriptions.cancel(user.subscription.id);

        user.subscription.status = 'canceled';
        await user.save();

        res.json({
            success: true,
            subscription,
        });
    } catch (error) {
        console.error('Cancel subscription error:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Webhook Handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // Update order status
            if (paymentIntent.metadata.orderId) {
                await Order.findOneAndUpdate(
                    { _id: paymentIntent.metadata.orderId },
                    { paymentStatus: 'Paid', stripePaymentId: paymentIntent.id }
                );
            }
            break;

        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
            const subscription = event.data.object;
            await User.findOneAndUpdate(
                { stripeCustomerId: subscription.customer },
                {
                    'subscription.status': subscription.status,
                    'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000),
                }
            );
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
});

module.exports = router;
