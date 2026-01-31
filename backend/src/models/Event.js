// src/models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  
  category: {
    type: String,
    enum: ['Match', 'Training', 'Tournament', 'Meeting', 'Other'],
    default: 'Match',
  },
  
  startDate: {
    type: Date,
    required: true,
  },
  endDate: Date,
  
  venue: {
    name: String,
    address: String,
    city: String,
    capacity: Number,
  },
  
  capacity: Number,
  ticketPrice: Number,
  
  status: {
    type: String,
    enum: ['Draft', 'Published', 'Ongoing', 'Completed', 'Cancelled'],
    default: 'Draft',
  },
  
  coverImage: String,
  images: [String],
  
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  
  attendees: [{
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Pending', 'Cancelled'],
      default: 'Confirmed',
    },
  }],
  
  isFeatured: {
    type: Boolean,
    default: false,
  },
  
  tags: [String],
  
}, {
  timestamps: true,
});

eventSchema.index({ startDate: 1, status: 1 });
eventSchema.index({ category: 1 });

module.exports = mongoose.model('Event', eventSchema);