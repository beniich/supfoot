// src/routes/leagues.js
const express = require('express');
const router = express.Router();
const League = require('../models/League');

// GET /api/leagues - Get all leagues
router.get('/', async (req, res) => {
  try {
    const {
      country,
      featured,
      type,
      search,
      page = 1,
      limit = 20,
    } = req.query;

    const query = { isActive: true };
    if (country) query['country.name'] = country;
    if (featured) query.isFeatured = featured === 'true';
    if (type) query.type = type;
    if (search) {
      query.name = new RegExp(search, 'i');
    }

    const leagues = await League.find(query)
      .sort({ priority: -1, followersCount: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await League.countDocuments(query);

    res.json({
      leagues,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/leagues/featured - Get featured leagues
router.get('/featured', async (req, res) => {
  try {
    const leagues = await League.find({
      isFeatured: true,
      isActive: true,
    })
      .sort({ priority: -1 })
      .limit(10);

    res.json(leagues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/leagues/:id - Get league by ID
router.get('/:id', async (req, res) => {
  try {
    const league = await League.findById(req.params.id);

    if (!league) {
      return res.status(404).json({ message: 'League not found' });
    }

    res.json(league);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/leagues - Create new league
router.post('/', async (req, res) => {
  try {
    const league = await League.create(req.body);
    res.status(201).json(league);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST /api/leagues/sync - Sync leagues from API-Football
router.post('/sync', async (req, res) => {
  try {
    const footballApi = require('../services/footballApi');
    await footballApi.syncLeagues();

    res.json({ message: 'Leagues sync started' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/leagues/:id/follow - Follow/Unfollow league
router.post('/:id/follow', async (req, res) => {
  try {
    const league = await League.findByIdAndUpdate(
      req.params.id,
      { $inc: { followersCount: 1 } },
      { new: true }
    );

    if (!league) {
      return res.status(404).json({ message: 'League not found' });
    }

    res.json({ message: 'League followed', league });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /api/leagues/:id - Update league
router.patch('/:id', async (req, res) => {
  try {
    const league = await League.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!league) {
      return res.status(404).json({ message: 'League not found' });
    }

    res.json(league);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/leagues/:id - Delete league
router.delete('/:id', async (req, res) => {
  try {
    const league = await League.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!league) {
      return res.status(404).json({ message: 'League not found' });
    }

    res.json({ message: 'League deactivated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;