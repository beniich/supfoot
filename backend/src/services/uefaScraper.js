// src/services/uefaScraper.js
const axios = require('axios');
const League = require('../models/League');
const Team = require('../models/Team');
const Match = require('../models/Match');

class UEFAScraper {
  constructor() {
    this.apiURL = 'https://match.uefa.com/v5/';
    this.client = axios.create({
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      },
    });
  }

  // ============================================================
  // SCRAPE CHAMPIONS LEAGUE
  // ============================================================

  async scrapeChampionsLeague(season = '2024') {
    try {
      console.log('🏆 Scraping Champions League...');

      const matchesURL = `${this.apiURL}matches?competitionId=1&seasonYear=${season}`;
      const response = await this.client.get(matchesURL);
      const matches = response.data;

      for (const match of matches) {
        await this.processUEFAMatch(match, 'Champions League');
      }

      console.log('✅ Champions League scraping completed');
    } catch (error) {
      console.error('❌ Champions League error:', error.message);
    }
  }

  // ============================================================
  // PROCESS UEFA MATCH
  // ============================================================

  async processUEFAMatch(matchData, leagueName) {
    try {
      const league = await League.findOneAndUpdate(
        { name: leagueName },
        {
          name: leagueName,
          type: 'Cup',
          country: {
            name: 'Europe',
            code: 'EU',
          },
          isFeatured: true,
          isActive: true,
          priority: 10,
        },
        { upsert: true, new: true }
      );

      const homeTeam = await this.processUEFATeam(matchData.homeTeam);
      const awayTeam = await this.processUEFATeam(matchData.awayTeam);

      await Match.findOneAndUpdate(
        { apiFootballId: matchData.id },
        {
          apiFootballId: matchData.id,
          league: league._id,
          season: matchData.season?.year || new Date().getFullYear(),
          round: matchData.round?.name || matchData.phase,

          homeTeam: {
            team: homeTeam._id,
            name: matchData.homeTeam.name,
            logo: matchData.homeTeam.logoUrl,
          },
          awayTeam: {
            team: awayTeam._id,
            name: matchData.awayTeam.name,
            logo: matchData.awayTeam.logoUrl,
          },

          matchDate: new Date(matchData.kickOffTime?.dateTime),

          venue: {
            name: matchData.stadium?.name,
            city: matchData.stadium?.city,
          },

          status: this.mapUEFAStatus(matchData.status),

          score: {
            fulltime: {
              home: matchData.score?.total?.home,
              away: matchData.score?.total?.away,
            },
          },

          lastSyncedAt: new Date(),
        },
        { upsert: true, new: true }
      );
    } catch (error) {
      console.error('Error processing UEFA match:', error.message);
    }
  }

  // ============================================================
  // PROCESS UEFA TEAM
  // ============================================================

  async processUEFATeam(teamData) {
    const team = await Team.findOneAndUpdate(
      { apiFootballId: teamData.id },
      {
        apiFootballId: teamData.id,
        name: teamData.name,
        logo: teamData.logoUrl,
        country: teamData.country?.name,
        lastSyncedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    return team;
  }

  // ============================================================
  // MAP UEFA STATUS
  // ============================================================

  mapUEFAStatus(status) {
    const statusMap = {
      'SCHEDULED': 'SCHEDULED',
      'PLAYING': 'LIVE',
      'FINISHED': 'FINISHED',
      'POSTPONED': 'POSTPONED',
      'CANCELLED': 'CANCELLED',
    };

    return statusMap[status] || 'SCHEDULED';
  }

  // ============================================================
  // FULL UEFA SYNC
  // ============================================================

  async fullUEFASync(season = '2024') {
    console.log('🚀 Starting full UEFA sync...');

    try {
      await this.scrapeChampionsLeague(season);
      console.log('✅ Full UEFA sync completed');
    } catch (error) {
      console.error('❌ Full UEFA sync error:', error);
    }
  }
}

module.exports = new UEFAScraper();