// src/models/Odds.js
const mongoose = require('mongoose');

const oddsSchema = new mongoose.Schema({
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true,
  },
  
  bookmaker: {
    name: String,
    logo: String,
  },
  
  matchWinner: {
    home: Number,
    draw: Number,
    away: Number,
  },
  
  overUnder: {
    over0_5: Number,
    under0_5: Number,
    over1_5: Number,
    under1_5: Number,
    over2_5: Number,
    under2_5: Number,
    over3_5: Number,
    under3_5: Number,
  },
  
  bothTeamsScore: {
    yes: Number,
    no: Number,
  },
  
  correctScore: [{
    score: String,
    odds: Number,
  }],
  
  firstGoalscorer: [{
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
    },
    odds: Number,
  }],
  
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  
}, {
  timestamps: true,
});

oddsSchema.index({ match: 1 });

module.exports = mongoose.model('Odds', oddsSchema);