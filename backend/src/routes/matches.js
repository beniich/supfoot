// src/routes/matches.js
const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const MatchLineup = require('../models/MatchLineup');

// GET /api/matches - Get all matches
router.get('/', async (req, res) => {
  try {
    const {
      league,
      team,
      status,
      date,
      live,
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};
    if (league) query.league = league;
    if (team) {
      query.$or = [{ 'homeTeam.team': team }, { 'awayTeam.team': team }];
    }
    if (status) query.status = status;
    if (live) query.status = 'LIVE';
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.matchDate = { $gte: startDate, $lte: endDate };
    }

    const matches = await Match.find(query)
      .sort({ matchDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('league', 'name logo');

    const count = await Match.countDocuments(query);

    res.json({
      matches,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/matches/live - Get live matches
router.get('/live', async (req, res) => {
  try {
    const matches = await Match.find({ status: 'LIVE' })
      .sort({ elapsed: -1 })
      .populate('league', 'name logo');

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/matches/upcoming - Get upcoming matches
router.get('/upcoming', async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const matches = await Match.find({
      status: 'SCHEDULED',
      matchDate: { $gte: new Date() },
    })
      .sort({ matchDate: 1 })
      .limit(parseInt(limit))
      .populate('league', 'name logo');

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/matches/:id - Get match by ID
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('league')
      .populate('homeTeam.team')
      .populate('awayTeam.team');

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/matches/:id/lineups - Get match lineups
router.get('/:id/lineups', async (req, res) => {
  try {
    const lineups = await MatchLineup.find({ match: req.params.id })
      .populate('team')
      .populate('startingEleven.player')
      .populate('substitutes.player');

    res.json(lineups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/matches - Create new match
router.post('/', async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json(match);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST /api/matches/sync/:leagueId/:season - Sync matches
router.post('/sync/:leagueId/:season', async (req, res) => {
  try {
    const footballApi = require('../services/footballApi');
    await footballApi.syncFixturesByLeague(
      req.params.leagueId,
      req.params.season
    );

    res.json({ message: 'Matches sync started' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /api/matches/:id - Update match
router.patch('/:id', async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    res.json(match);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/matches/:id - Delete match
router.delete('/:id', async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    res.json({ message: 'Match deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;