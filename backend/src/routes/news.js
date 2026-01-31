// src/routes/news.js
const express = require('express');
const router = express.Router();
const NewsArticle = require('../models/NewsArticle');

// GET /api/news - Get all news articles
router.get('/', async (req, res) => {
  try {
    const {
      league,
      team,
      category,
      featured,
      search,
      page = 1,
      limit = 20,
    } = req.query;

    const query = { isPublished: true };
    if (league) query.league = league;
    if (team) query.teams = team;
    if (category) query.category = category;
    if (featured) query.isFeatured = featured === 'true';
    if (search) {
      query.$text = { $search: search };
    }

    const articles = await NewsArticle.find(query)
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('league', 'name logo')
      .populate('teams', 'name logo');

    const count = await NewsArticle.countDocuments(query);

    res.json({
      articles,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/news/featured - Get featured articles
router.get('/featured', async (req, res) => {
  try {
    const articles = await NewsArticle.find({
      isFeatured: true,
      isPublished: true,
    })
      .sort({ publishedAt: -1 })
      .limit(5)
      .populate('league', 'name logo')
      .populate('teams', 'name logo');

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/news/:id - Get article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await NewsArticle.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewCount: 1 } },
      { new: true }
    )
      .populate('league', 'name logo')
      .populate('teams', 'name logo');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/news - Create new article
router.post('/', async (req, res) => {
  try {
    const article = await NewsArticle.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST /api/news/:id/like - Like article
router.post('/:id/like', async (req, res) => {
  try {
    const article = await NewsArticle.findByIdAndUpdate(
      req.params.id,
      { $inc: { likeCount: 1 } },
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({ message: 'Article liked', article });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /api/news/:id - Update article
router.patch('/:id', async (req, res) => {
  try {
    const article = await NewsArticle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/news/:id - Delete article
router.delete('/:id', async (req, res) => {
  try {
    const article = await NewsArticle.findByIdAndUpdate(
      req.params.id,
      { isPublished: false },
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({ message: 'Article unpublished' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;