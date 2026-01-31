// src/models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  
  url: {
    type: String,
    required: true,
  },
  thumbnail: String,
  duration: Number,
  
  provider: {
    type: String,
    enum: ['youtube', 'dailymotion', 'streamable', 'custom'],
    default: 'youtube',
  },
  providerId: String,
  
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
  },
  
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'League',
  },
  
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  }],
  
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  }],
  
  type: {
    type: String,
    enum: ['highlight', 'fullMatch', 'interview', 'analysis', 'goal', 'skill'],
    default: 'highlight',
  },
  
  views: {
    type: Number,
    default: 0,
  },
  
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  
  isPublished: {
    type: Boolean,
    default: true,
  },
  
}, {
  timestamps: true,
});

videoSchema.index({ match: 1 });
videoSchema.index({ type: 1, publishedAt: -1 });

module.exports = mongoose.model('Video', videoSchema);