// src/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  
  category: {
    type: String,
    enum: ['Jersey', 'Training', 'Accessories', 'Memorabilia', 'Equipment'],
    required: true,
  },
  
  price: {
    type: Number,
    required: true,
  },
  comparePrice: Number,
  
  stock: {
    type: Number,
    default: 0,
  },
  
  sku: {
    type: String,
    unique: true,
  },
  
  images: [String],
  
  sizes: [{
    size: String,
    stock: Number,
  }],
  
  colors: [String],
  
  isFeatured: {
    type: Boolean,
    default: false,
  },
  
  isActive: {
    type: Boolean,
    default: true,
  },
  
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  
  reviewCount: {
    type: Number,
    default: 0,
  },
  
  salesCount: {
    type: Number,
    default: 0,
  },
  
  tags: [String],
  
}, {
  timestamps: true,
});

// Auto-generate SKU
productSchema.pre('save', async function(next) {
  if (!this.sku) {
    const count = await mongoose.model('Product').countDocuments();
    this.sku = `PRD${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);