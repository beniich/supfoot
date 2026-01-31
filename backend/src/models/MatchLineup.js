// src/models/MatchLineup.js
const mongoose = require('mongoose');

const lineupPlayerSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  position: String,
  positionX: Number,
  positionY: Number,
  jerseyNumber: Number,
  isCaptain: Boolean,
  matchStats: {
    goals: Number,
    assists: Number,
    yellowCard: Boolean,
    redCard: Boolean,
    rating: Number,
  },
});

const matchLineupSchema = new mongoose.Schema({
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  formation: String,
  startingEleven: [lineupPlayerSchema],
  substitutes: [lineupPlayerSchema],
  coach: {
    name: String,
    photo: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('MatchLineup', matchLineupSchema);