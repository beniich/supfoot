// src/models/Standing.js
const mongoose = require('mongoose');

const standingSchema = new mongoose.Schema({
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'League',
    required: true,
  },
  season: {
    type: Number,
    required: true,
  },
  rankings: [{
    rank: Number,
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
    teamName: String,
    teamLogo: String,
    played: Number,
    win: Number,
    draw: Number,
    lose: Number,
    goals: {
      for: Number,
      against: Number,
      diff: Number,
    },
    points: Number,
    form: String,
    status: String,
    description: String,
  }],
  lastSyncedAt: Date,
}, {
  timestamps: true,
});

standingSchema.index({ league: 1, season: -1 });

module.exports = mongoose.model('Standing', standingSchema);