// src/routes/favorites.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware d'authentification
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// GET /api/favorites - Get user favorites
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('favoriteLeagues', 'name logo country')
      .populate('favoriteTeams', 'name logo country')
      .populate('favoritePlayers', 'firstName lastName photo position');

    res.json({
      leagues: user.favoriteLeagues,
      teams: user.favoriteTeams,
      players: user.favoritePlayers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/favorites/leagues/:id - Add league to favorites
router.post('/leagues/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user.favoriteLeagues.includes(req.params.id)) {
      return res.status(400).json({ message: 'Already in favorites' });
    }

    user.favoriteLeagues.push(req.params.id);
    await user.save();

    res.json({ message: 'League added to favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/favorites/leagues/:id - Remove league from favorites
router.delete('/leagues/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    user.favoriteLeagues = user.favoriteLeagues.filter(
      (l) => l.toString() !== req.params.id
    );

    await user.save();

    res.json({ message: 'League removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/favorites/teams/:id - Add team to favorites
router.post('/teams/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user.favoriteTeams.includes(req.params.id)) {
      return res.status(400).json({ message: 'Already in favorites' });
    }

    user.favoriteTeams.push(req.params.id);
    await user.save();

    res.json({ message: 'Team added to favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/favorites/teams/:id - Remove team from favorites
router.delete('/teams/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    user.favoriteTeams = user.favoriteTeams.filter(
      (t) => t.toString() !== req.params.id
    );

    await user.save();

    res.json({ message: 'Team removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/favorites/players/:id - Add player to favorites
router.post('/players/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user.favoritePlayers.includes(req.params.id)) {
      return res.status(400).json({ message: 'Already in favorites' });
    }

    user.favoritePlayers.push(req.params.id);
    await user.save();

    res.json({ message: 'Player added to favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/favorites/players/:id - Remove player from favorites
router.delete('/players/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    user.favoritePlayers = user.favoritePlayers.filter(
      (p) => p.toString() !== req.params.id
    );

    await user.save();

    res.json({ message: 'Player removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;