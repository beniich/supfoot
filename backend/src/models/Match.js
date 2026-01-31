// src/models/Match.js
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  apiFootballId: {
    type: Number,
    unique: true,
    sparse: true,
  },
  
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'League',
    required: true,
  },
  
  season: Number,
  round: String,
  
  homeTeam: {
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
    name: String,
    logo: String,
  },
  
  awayTeam: {
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
    name: String,
    logo: String,
  },
  
  matchDate: {
    type: Date,
    required: true,
  },
  
  timezone: String,
  
  venue: {
    name: String,
    city: String,
  },
  
  status: {
    type: String,
    enum: ['SCHEDULED', 'LIVE', 'FINISHED', 'POSTPONED', 'CANCELLED'],
    default: 'SCHEDULED',
  },
  
  elapsed: Number,
  
  score: {
    halftime: {
      home: Number,
      away: Number,
    },
    fulltime: {
      home: Number,
      away: Number,
    },
    extratime: {
      home: Number,
      away: Number,
    },
    penalty: {
      home: Number,
      away: Number,
    },
  },
  
  goals: [{
    team: String,
    player: String,
    minute: Number,
    type: {
      type: String,
      enum: ['Normal Goal', 'Own Goal', 'Penalty'],
    },
  }],
  
  statistics: {
    homeTeam: {
      shotsOnGoal: Number,
      shotsOffGoal: Number,
      possession: Number,
      corners: Number,
      yellowCards: Number,
      redCards: Number,
      fouls: Number,
      offsides: Number,
    },
    awayTeam: {
      shotsOnGoal: Number,
      shotsOffGoal: Number,
      possession: Number,
      corners: Number,
      yellowCards: Number,
      redCards: Number,
      fouls: Number,
      offsides: Number,
    },
  },
  
  lastSyncedAt: Date,
  
}, {
  timestamps: true,
});

matchSchema.index({ league: 1, matchDate: -1 });
matchSchema.index({ status: 1, matchDate: 1 });

module.exports = mongoose.model('Match', matchSchema);