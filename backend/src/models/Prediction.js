// src/models/Prediction.js
const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true,
  },
  
  predictions: {
    homeWin: Number,
    draw: Number,
    awayWin: Number,
    expectedScore: {
      home: Number,
      away: Number,
    },
    overUnder: {
      over2_5: Number,
      under2_5: Number,
    },
    bothTeamsScore: {
      yes: Number,
      no: Number,
    },
  },
  
  confidence: {
    type: Number,
    min: 0,
    max: 100,
  },
  
  factors: {
    headToHead: Object,
    recentForm: Object,
    homeAdvantage: Number,
    injuries: Array,
    averageGoals: Object,
  },
  
  actualResult: {
    homeScore: Number,
    awayScore: Number,
    outcome: String,
  },
  
  accuracy: Number,
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Prediction', predictionSchema);