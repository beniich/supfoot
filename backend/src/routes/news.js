const express = require('express');
const router = express.Router();
const newsService = require('../services/newsService');
const News = require('../models/News');
const { cache } = require('../middleware/cache');

// Get featured news (public)
router.get('/featured', cache(300), async (req, res) => {
  try {
    const news = await newsService.getFeaturedNews(5);

    res.json({
      success: true,
      news,
    });
  } catch (error) {
    console.error('Featured news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured news',
    });
  }
});

// Get all news (public, paginated)
router.get('/', cache(300), async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;

    let result;

    if (search) {
      result = await newsService.searchNews(search, parseInt(page), parseInt(limit));
    } else if (category) {
      result = await newsService.getNewsByCategory(category, parseInt(page), parseInt(limit));
    } else {
      const skip = (parseInt(page) - 1) * parseInt(limit);

      const [news, total] = await Promise.all([
        News.find({ status: 'Published' })
          .sort({ publishedAt: -1 })
          .skip(skip)
          .limit(parseInt(limit))
          .populate('league teams'),
        News.countDocuments({ status: 'Published' }),
      ]);

      result = {
        news,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit)),
        },
      };
    }

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch news',
    });
  }
});

// Get news by league
router.get('/league/:leagueId', cache(300), async (req, res) => {
  try {
    const { leagueId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const result = await newsService.getNewsByLeague(
      leagueId,
      parseInt(page),
      parseInt(limit)
    );

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('League news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch league news',
    });
  }
});

// Get news by team
router.get('/team/:teamId', cache(300), async (req, res) => {
  try {
    const { teamId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const result = await newsService.getNewsByTeam(
      teamId,
      parseInt(page),
      parseInt(limit)
    );

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Team news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch team news',
    });
  }
});

// Get single news article
router.get('/:id', cache(300), async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate('league teams');

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found',
      });
    }

    // Increment views
    news.views += 1;
    await news.save();

    res.json({
      success: true,
      news,
    });
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch news',
    });
  }
});

module.exports = router;