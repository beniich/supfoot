// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  avatar: String,
  phone: String,

  country: String,
  city: String,

  role: {
    type: String,
    enum: ['user', 'admin', 'staff'],
    default: 'user',
  },

  // Push Notifications
  pushToken: String,
  notificationSettings: {
    matchStart: { type: Boolean, default: true },
    goals: { type: Boolean, default: true },
    matchResult: { type: Boolean, default: true },
    news: { type: Boolean, default: false },
  },

  // Favorites
  favoriteLeagues: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'League',
  }],
  favoriteTeams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  }],
  favoritePlayers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  }],

  // Fantasy
  fantasyTeams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FantasyTeam',
  }],

  // Social
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],

  isActive: {
    type: Boolean,
    default: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  lastLogin: Date,
  passwordChangedAt: Date,

  associationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Association',
  },

}, {
  timestamps: true,
});

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual for full name
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('User', userSchema);