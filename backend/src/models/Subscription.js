// src/models/Subscription.js
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true,
    },
    associationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Association',
        required: true,
    },
    planName: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: 'EUR',
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled', 'pending'],
        default: 'active',
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        required: true,
    },
    paymentType: {
        type: String,
        enum: ['cash', 'card', 'transfer'],
        default: 'card',
    },
    stripeSessionId: String,
    autoRenew: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
