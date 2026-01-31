// src/routes/standings.js
const express = require('express');
const router = express.Router();
const Standing = require('../models/Standing');

// GET /api/standings/:leagueId/:season - Get standings
router.get('/:leagueId/:season', async (req, res) => {
  try {
    const standing = await Standing.findOne({
      league: req.params.leagueId,
      season: req.params.season,
    })
      .populate('league', 'name logo')
      .populate('rankings.team', 'name logo');

    if (!standing) {
      return res.status(404).json({ message: 'Standings not found' });
    }

    res.json(standing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/standings/sync/:leagueId/:season - Sync standings
router.post('/sync/:leagueId/:season', async (req, res) => {
  try {
    const footballApi = require('../services/footballApi');
    await footballApi.syncStandingsByLeague(
      req.params.leagueId,
      req.params.season
    );

    res.json({ message: 'Standings sync started' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/standings - Create/Update standings
router.post('/', async (req, res) => {
  try {
    const { league, season, rankings } = req.body;

    const standing = await Standing.findOneAndUpdate(
      { league, season },
      { league, season, rankings, lastSyncedAt: new Date() },
      { upsert: true, new: true }
    );

    res.status(201).json(standing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;