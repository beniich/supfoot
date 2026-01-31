// src/models/League.js
const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  apiFootballId: {
    type: Number,
    unique: true,
    sparse: true,
  },
  
  name: {
    type: String,
    required: true,
  },
  
  type: {
    type: String,
    enum: ['League', 'Cup'],
    default: 'League',
  },
  
  country: {
    name: String,
    code: String,
    flag: String,
  },
  
  logo: String,
  
  currentSeason: {
    year: Number,
    start: Date,
    end: Date,
    current: Boolean,
  },
  
  isActive: {
    type: Boolean,
    default: true,
  },
  
  isFeatured: {
    type: Boolean,
    default: false,
  },
  
  priority: {
    type: Number,
    default: 0,
  },
  
  followersCount: {
    type: Number,
    default: 0,
  },
  
  lastSyncedAt: Date,
  
}, {
  timestamps: true,
});

leagueSchema.index({ country: 1, priority: -1 });
leagueSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('League', leagueSchema);