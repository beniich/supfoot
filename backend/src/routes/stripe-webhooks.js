// server/src/routes/stripe-webhooks.js
const express = require('express');
const router = express.Router();
const stripe = require('../config/stripe');
const Order = require('../models/Order');
const User = require('../models/User');
const EmailService = require('../services/emailService');
const logger = require('../utils/logger');

// Webhook endpoint (must be before body parser)
router.post('/webhook',
    express.raw({ type: 'application/json' }),
    async (req, res) => {
        const sig = req.headers['stripe-signature'];
        let event;

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            logger.error('Webhook signature verification failed:', err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Handle event
        try {
            switch (event.type) {
                case 'payment_intent.succeeded':
                    await handlePaymentIntentSucceeded(event.data.object);
                    break;

                case 'payment_intent.payment_failed':
                    await handlePaymentIntentFailed(event.data.object);
                    break;

                case 'charge.succeeded':
                    await handleChargeSucceeded(event.data.object);
                    break;

                case 'charge.refunded':
                    await handleChargeRefunded(event.data.object);
                    break;

                case 'customer.subscription.created':
                    await handleSubscriptionCreated(event.data.object);
                    break;

                case 'customer.subscription.updated':
                    await handleSubscriptionUpdated(event.data.object);
                    break;

                case 'customer.subscription.deleted':
                    await handleSubscriptionDeleted(event.data.object);
                    break;

                case 'invoice.paid':
                    await handleInvoicePaid(event.data.object);
                    break;

                case 'invoice.payment_failed':
                    await handleInvoicePaymentFailed(event.data.object);
                    break;

                default:
                    logger.warn(`Unhandled event type: ${event.type}`);
            }

            res.json({ received: true });
        } catch (error) {
            logger.error('Webhook handler error:', error);
            res.status(500).json({ error: 'Webhook handler failed' });
        }
    }
);

// Helper functions for event handling

async function handlePaymentIntentSucceeded(paymentIntent) {
    logger.info(`PaymentIntent succeeded: ${paymentIntent.id}`);

    const orderId = paymentIntent.metadata.orderId;

    if (orderId) {
        const order = await Order.findById(orderId).populate('user items.product');

        if (order) {
            order.paymentStatus = 'Paid';
            order.stripePaymentId = paymentIntent.id;
            order.paidAt = new Date();
            await order.save();

            // Send confirmation email
            await EmailService.sendOrderConfirmationEmail(order);

            logger.info(`Order ${orderId} marked as paid`);
        }
    }
}

async function handlePaymentIntentFailed(paymentIntent) {
    logger.warn(`PaymentIntent failed: ${paymentIntent.id}`);

    const orderId = paymentIntent.metadata.orderId;

    if (orderId) {
        await Order.findByIdAndUpdate(orderId, {
            paymentStatus: 'Failed',
            paymentError: paymentIntent.last_payment_error?.message,
        });

        logger.info(`Order ${orderId} marked as failed`);
    }
}

async function handleChargeSucceeded(charge) {
    logger.info(`Charge succeeded: ${charge.id}`);
}

async function handleChargeRefunded(charge) {
    logger.info(`Charge refunded: ${charge.id}`);
}

async function handleSubscriptionCreated(subscription) {
    logger.info(`Subscription created: ${subscription.id}`);

    await User.findOneAndUpdate(
        { stripeCustomerId: subscription.customer },
        {
            'subscription.id': subscription.id,
            'subscription.status': subscription.status,
            'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000),
            'subscription.plan': subscription.items.data[0].price.id,
        }
    );
}

async function handleSubscriptionUpdated(subscription) {
    logger.info(`Subscription updated: ${subscription.id}`);

    await User.findOneAndUpdate(
        { stripeCustomerId: subscription.customer },
        {
            'subscription.status': subscription.status,
            'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000),
        }
    );
}

async function handleSubscriptionDeleted(subscription) {
    logger.info(`Subscription deleted: ${subscription.id}`);

    await User.findOneAndUpdate(
        { stripeCustomerId: subscription.customer },
        {
            'subscription.status': 'canceled',
            'subscription.canceledAt': new Date(),
        }
    );
}

async function handleInvoicePaid(invoice) {
    logger.info(`Invoice paid: ${invoice.id}`);

    // Update subscription billing
    await User.findOneAndUpdate(
        { stripeCustomerId: invoice.customer },
        {
            'subscription.lastInvoiceId': invoice.id,
            'subscription.lastInvoiceDate': new Date(invoice.created * 1000),
        }
    );
}

async function handleInvoicePaymentFailed(invoice) {
    logger.warn(`Invoice payment failed: ${invoice.id}`);

    const user = await User.findOne({ stripeCustomerId: invoice.customer });

    if (user) {
        // Send payment failed email
        logger.warn(`Payment failed for user ${user.email}`);
        // TODO: Send email notification
    }
}

module.exports = router;
