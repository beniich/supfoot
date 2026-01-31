// src/models/Member.js
const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  photo: String,
  
  membershipNumber: {
    type: String,
    unique: true,
  },
  
  role: {
    type: String,
    enum: ['Player', 'Staff', 'Fan', 'Admin'],
    default: 'Fan',
  },
  
  tier: {
    type: String,
    enum: ['VIP', 'Elite', 'Standard'],
    default: 'Standard',
  },
  
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active',
  },
  
  joinDate: {
    type: Date,
    default: Date.now,
  },
  
  dateOfBirth: Date,
  address: String,
  city: String,
  country: String,
  
  tickets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
  }],
  
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  }],
  
  totalSpent: {
    type: Number,
    default: 0,
  },
  
  loyaltyPoints: {
    type: Number,
    default: 0,
  },
  
}, {
  timestamps: true,
});

// Auto-generate membership number
memberSchema.pre('save', async function(next) {
  if (!this.membershipNumber) {
    const count = await mongoose.model('Member').countDocuments();
    this.membershipNumber = `MEM${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Member', memberSchema);