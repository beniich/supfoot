// src/models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  entityType: {
    type: String,
    enum: ['match', 'news', 'player', 'team'],
    required: true,
  },
  
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  
  content: {
    type: String,
    required: true,
    maxLength: 500,
  },
  
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  
  isHidden: {
    type: Boolean,
    default: false,
  },
  
  reportCount: {
    type: Number,
    default: 0,
  },
  
}, {
  timestamps: true,
});

commentSchema.index({ entityType: 1, entityId: 1 });

module.exports = mongoose.model('Comment', commentSchema);