// server/src/routes/matches.js
const express = require('express');
const router = express.Router();
const { cache, invalidateCache } = require('../middleware/cache');
const footballApi = require('../services/footballApiPro');

// Get live matches (cache 30 seconds)
router.get('/live', cache(30), async (req, res) => {
  try {
    const matches = await footballApi.getLiveMatches();

    res.json({
      success: true,
      matches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get standings (cache 1 hour)
router.get('/standings/:leagueId/:season', cache(3600), async (req, res) => {
  try {
    const { leagueId, season } = req.params;
    const standings = await footballApi.getStandings(leagueId, season);

    res.json({
      success: true,
      standings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Invalidate cache when match ends (webhook)
router.post('/webhook/match-ended', async (req, res) => {
  const { leagueId, season } = req.body;

  // Invalidate standings cache
  await invalidateCache(`cache:GET:/api/matches/standings/${leagueId}/${season}`);

  res.json({ success: true });
});

module.exports = router;