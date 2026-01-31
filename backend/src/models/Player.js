// src/models/Player.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  apiFootballId: Number,
  
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  commonName: String,
  photo: String,
  
  dateOfBirth: Date,
  
  nationality: {
    name: String,
    code: String,
    flag: String,
  },
  
  height: Number,
  weight: Number,
  
  position: {
    type: String,
    enum: ['GK', 'RB', 'CB', 'LB', 'RWB', 'LWB', 'CDM', 'CM', 'CAM', 'RM', 'LM', 'RW', 'LW', 'CF', 'ST'],
  },
  
  jerseyNumber: Number,
  preferredFoot: {
    type: String,
    enum: ['Left', 'Right', 'Both'],
  },
  
  currentTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  
  stats: {
    appearances: { type: Number, default: 0 },
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    yellowCards: { type: Number, default: 0 },
    redCards: { type: Number, default: 0 },
    minutesPlayed: { type: Number, default: 0 },
  },
  
  rating: {
    overall: { type: Number, min: 0, max: 100 },
    pace: { type: Number, min: 0, max: 100 },
    shooting: { type: Number, min: 0, max: 100 },
    passing: { type: Number, min: 0, max: 100 },
    dribbling: { type: Number, min: 0, max: 100 },
    defending: { type: Number, min: 0, max: 100 },
    physical: { type: Number, min: 0, max: 100 },
  },
  
  lastSyncedAt: Date,
  
}, {
  timestamps: true,
});

playerSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

playerSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
});

module.exports = mongoose.model('Player', playerSchema);