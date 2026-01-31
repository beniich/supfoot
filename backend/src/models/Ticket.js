// src/models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketNumber: {
    type: String,
    unique: true,
    required: true,
  },
  
  qrCode: {
    type: String,
    required: true,
  },
  
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
  },
  
  ticketType: {
    type: String,
    enum: ['VIP', 'Standard', 'EarlyBird', 'Free'],
    default: 'Standard',
  },
  
  price: {
    type: Number,
    required: true,
  },
  
  seating: {
    section: String,
    row: String,
    seat: String,
  },
  
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  
  status: {
    type: String,
    enum: ['Valid', 'Used', 'Cancelled', 'Expired'],
    default: 'Valid',
  },
  
  isValidated: {
    type: Boolean,
    default: false,
  },
  
  validatedAt: Date,
  validatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  
  paymentMethod: String,
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Refunded'],
    default: 'Paid',
  },
  
}, {
  timestamps: true,
});

// Auto-generate ticket number and QR code
ticketSchema.pre('save', function(next) {
  if (!this.ticketNumber) {
    this.ticketNumber = `TKT-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
  }
  
  if (!this.qrCode) {
    const qrData = {
      ticketNumber: this.ticketNumber,
      event: this.event,
      member: this.member,
      timestamp: Date.now(),
    };
    this.qrCode = Buffer.from(JSON.stringify(qrData)).toString('base64');
  }
  
  next();
});

ticketSchema.index({ event: 1, member: 1 });
ticketSchema.index({ status: 1 });

module.exports = mongoose.model('Ticket', ticketSchema);