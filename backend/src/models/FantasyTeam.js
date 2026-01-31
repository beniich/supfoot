// src/models/FantasyTeam.js
const mongoose = require('mongoose');

const fantasyPlayerSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  position: {
    type: String,
    enum: ['GK', 'DEF', 'MID', 'FWD'],
    required: true,
  },
  isCaptain: Boolean,
  isViceCaptain: Boolean,
  purchasePrice: Number,
  currentValue: Number,
});

const fantasyTeamSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  name: {
    type: String,
    required: true,
  },
  
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'League',
    required: true,
  },
  
  season: Number,
  
  squad: [fantasyPlayerSchema],
  
  formation: {
    type: String,
    default: '4-3-3',
  },
  
  startingEleven: [fantasyPlayerSchema],
  
  budget: {
    type: Number,
    default: 100000000,
  },
  
  remainingBudget: Number,
  
  totalPoints: {
    type: Number,
    default: 0,
  },
  
  gameweekPoints: [{
    gameweek: Number,
    points: Number,
    transfers: Number,
  }],
  
  freeTransfers: {
    type: Number,
    default: 1,
  },
  
  transfersMade: {
    type: Number,
    default: 0,
  },
  
  chipsAvailable: [{
    type: {
      type: String,
      enum: ['wildcard', 'bench_boost', 'triple_captain', 'free_hit'],
    },
    used: Boolean,
    gameweekUsed: Number,
  }],
  
  globalRank: Number,
  countryRank: Number,
  
}, {
  timestamps: true,
});

fantasyTeamSchema.index({ user: 1, league: 1 });
fantasyTeamSchema.index({ totalPoints: -1 });

module.exports = mongoose.model('FantasyTeam', fantasyTeamSchema);