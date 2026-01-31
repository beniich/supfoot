// src/models/Team.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  apiFootballId: {
    type: Number,
    unique: true,
    sparse: true,
  },
  
  name: {
    type: String,
    required: true,
  },
  
  code: String,
  country: String,
  founded: Number,
  logo: String,
  
  venue: {
    name: String,
    address: String,
    city: String,
    capacity: Number,
    surface: String,
    image: String,
  },
  
  leagues: [{
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'League',
    },
    season: Number,
  }],
  
  followersCount: {
    type: Number,
    default: 0,
  },
  
  lastSyncedAt: Date,
  
}, {
  timestamps: true,
});

teamSchema.index({ name: 'text' });
teamSchema.index({ country: 1 });

module.exports = mongoose.model('Team', teamSchema);