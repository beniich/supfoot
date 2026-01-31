// src/models/NewsArticle.js
const mongoose = require('mongoose');

const newsArticleSchema = new mongoose.Schema({
  source: String,
  sourceUrl: String,
  
  title: {
    type: String,
    required: true,
  },
  description: String,
  content: String,
  
  image: String,
  video: String,
  
  category: {
    type: String,
    enum: ['Match', 'Transfer', 'Injury', 'Interview', 'General'],
    default: 'General',
  },
  
  tags: [String],
  
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'League',
  },
  
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  }],
  
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  
  isPublished: {
    type: Boolean,
    default: true,
  },
  
  isFeatured: {
    type: Boolean,
    default: false,
  },
  
  viewCount: {
    type: Number,
    default: 0,
  },
  
  likeCount: {
    type: Number,
    default: 0,
  },
  
  author: {
    name: String,
    avatar: String,
  },
  
}, {
  timestamps: true,
});

newsArticleSchema.index({ publishedAt: -1 });
newsArticleSchema.index({ category: 1 });
newsArticleSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('NewsArticle', newsArticleSchema);