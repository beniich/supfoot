// src/services/footballApi.js
const axios = require('axios');
const League = require('../models/League');
const Team = require('../models/Team');
const Match = require('../models/Match');
const Player = require('../models/Player');
const Standing = require('../models/Standing');

class FootballApiService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://api-football-v1.p.rapidapi.com/v3',
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
      },
    });
  }

  // ============================================================
  // SYNC LEAGUES
  // ============================================================

  async syncLeagues() {
    try {
      console.log('🔄 Syncing leagues from API-Football...');

      // Featured leagues to sync
      const featuredLeagues = [
        { id: 39, name: 'Premier League', priority: 10 },
        { id: 140, name: 'La Liga', priority: 9 },
        { id: 78, name: 'Bundesliga', priority: 8 },
        { id: 135, name: 'Serie A', priority: 7 },
        { id: 61, name: 'Ligue 1', priority: 6 },
        { id: 2, name: 'Champions League', priority: 10 },
        { id: 3, name: 'Europa League', priority: 7 },
        { id: 200, name: 'Botola Pro', priority: 9 },
      ];

      for (const leagueInfo of featuredLeagues) {
        try {
          const response = await this.apiClient.get('/leagues', {
            params: { id: leagueInfo.id },
          });

          const apiLeague = response.data.response[0];
          if (!apiLeague) continue;

          await League.findOneAndUpdate(
            { apiFootballId: leagueInfo.id },
            {
              apiFootballId: leagueInfo.id,
              name: apiLeague.league.name,
              type: apiLeague.league.type,
              logo: apiLeague.league.logo,
              country: {
                name: apiLeague.country.name,
                code: apiLeague.country.code,
                flag: apiLeague.country.flag,
              },
              currentSeason: {
                year: apiLeague.seasons[0]?.year,
                start: apiLeague.seasons[0]?.start,
                end: apiLeague.seasons[0]?.end,
                current: apiLeague.seasons[0]?.current,
              },
              isFeatured: true,
              isActive: true,
              priority: leagueInfo.priority,
              lastSyncedAt: new Date(),
            },
            { upsert: true, new: true }
          );

          console.log(`✅ Synced: ${apiLeague.league.name}`);

          // Rate limiting
          await this.sleep(6000);
        } catch (error) {
          console.error(`❌ Error syncing league ${leagueInfo.name}:`, error.message);
        }
      }

      console.log('✅ Leagues sync completed');
    } catch (error) {
      console.error('❌ Leagues sync error:', error.message);
      throw error;
    }
  }

  // ============================================================
  // GET LEAGUE BY ID
  // ============================================================

  async getLeagueById(leagueId) {
    try {
      const response = await this.apiClient.get('/leagues', {
        params: { id: leagueId },
      });

      return response.data.response[0];
    } catch (error) {
      console.error('Error fetching league:', error.message);
      return null;
    }
  }

  // ============================================================
  // SYNC TEAMS BY LEAGUE
  // ============================================================

  async syncTeamsByLeague(leagueId, season) {
    try {
      console.log(`🔄 Syncing teams for league ${leagueId}, season ${season}...`);

      const response = await this.apiClient.get('/teams', {
        params: { league: leagueId, season },
      });

      const teams = response.data.response;

      for (const teamData of teams) {
        await Team.findOneAndUpdate(
          { apiFootballId: teamData.team.id },
          {
            apiFootballId: teamData.team.id,
            name: teamData.team.name,
            code: teamData.team.code,
            country: teamData.team.country,
            founded: teamData.team.founded,
            logo: teamData.team.logo,
            venue: {
              name: teamData.venue.name,
              address: teamData.venue.address,
              city: teamData.venue.city,
              capacity: teamData.venue.capacity,
              surface: teamData.venue.surface,
              image: teamData.venue.image,
            },
            lastSyncedAt: new Date(),
          },
          { upsert: true, new: true }
        );
      }

      console.log(`✅ Synced ${teams.length} teams`);
    } catch (error) {
      console.error('Teams sync error:', error.message);
    }
  }

  // ============================================================
  // SYNC FIXTURES BY LEAGUE
  // ============================================================

  async syncFixturesByLeague(leagueId, season) {
    try {
      console.log(`🔄 Syncing fixtures for league ${leagueId}, season ${season}...`);

      const response = await this.apiClient.get('/fixtures', {
        params: { league: leagueId, season },
      });

      const fixtures = response.data.response;
      const dbLeague = await League.findOne({ apiFootballId: leagueId });

      if (!dbLeague) {
        console.log('League not found in database');
        return;
      }

      for (const fixtureData of fixtures) {
        // Find or create teams
        const homeTeam = await Team.findOne({
          apiFootballId: fixtureData.teams.home.id,
        });
        const awayTeam = await Team.findOne({
          apiFootballId: fixtureData.teams.away.id,
        });

        await Match.findOneAndUpdate(
          { apiFootballId: fixtureData.fixture.id },
          {
            apiFootballId: fixtureData.fixture.id,
            league: dbLeague._id,
            season: fixtureData.league.season,
            round: fixtureData.league.round,

            homeTeam: {
              team: homeTeam?._id,
              name: fixtureData.teams.home.name,
              logo: fixtureData.teams.home.logo,
            },
            awayTeam: {
              team: awayTeam?._id,
              name: fixtureData.teams.away.name,
              logo: fixtureData.teams.away.logo,
            },

            matchDate: new Date(fixtureData.fixture.date),
            venue: {
              name: fixtureData.fixture.venue?.name,
              city: fixtureData.fixture.venue?.city,
            },

            status: this.mapFixtureStatus(fixtureData.fixture.status.short),
            elapsed: fixtureData.fixture.status.elapsed,

            score: {
              halftime: {
                home: fixtureData.score.halftime?.home,
                away: fixtureData.score.halftime?.away,
              },
              fulltime: {
                home: fixtureData.score.fulltime?.home,
                away: fixtureData.score.fulltime?.away,
              },
            },

            goals: fixtureData.events
              ?.filter((e) => e.type === 'Goal')
              .map((e) => ({
                team: e.team.name,
                player: e.player.name,
                minute: e.time.elapsed,
                type: e.detail,
              })) || [],

            lastSyncedAt: new Date(),
          },
          { upsert: true, new: true }
        );
      }

      console.log(`✅ Synced ${fixtures.length} fixtures`);
    } catch (error) {
      console.error('Fixtures sync error:', error.message);
    }
  }

  // ============================================================
  // GET LIVE MATCHES
  // ============================================================

  async getLiveMatches() {
    try {
      const response = await this.apiClient.get('/fixtures', {
        params: { live: 'all' },
      });

      return response.data.response;
    } catch (error) {
      console.error('Live matches error:', error.message);
      return [];
    }
  }

  // ============================================================
  // SYNC STANDINGS BY LEAGUE
  // ============================================================

  async syncStandingsByLeague(leagueId, season) {
    try {
      console.log(`🔄 Syncing standings for league ${leagueId}, season ${season}...`);

      const response = await this.apiClient.get('/standings', {
        params: { league: leagueId, season },
      });

      const standingsData = response.data.response[0];
      if (!standingsData) return;

      const dbLeague = await League.findOne({ apiFootballId: leagueId });
      if (!dbLeague) return;

      const rankings = [];

      for (const standing of standingsData.league.standings[0]) {
        const team = await Team.findOne({ apiFootballId: standing.team.id });

        rankings.push({
          rank: standing.rank,
          team: team?._id,
          teamName: standing.team.name,
          teamLogo: standing.team.logo,
          played: standing.all.played,
          win: standing.all.win,
          draw: standing.all.draw,
          lose: standing.all.lose,
          goals: {
            for: standing.all.goals.for,
            against: standing.all.goals.against,
            diff: standing.goalsDiff,
          },
          points: standing.points,
          form: standing.form,
          status: standing.status,
          description: standing.description,
        });
      }

      await Standing.findOneAndUpdate(
        { league: dbLeague._id, season },
        {
          league: dbLeague._id,
          season,
          rankings,
          lastSyncedAt: new Date(),
        },
        { upsert: true, new: true }
      );

      console.log('✅ Standings synced successfully');
    } catch (error) {
      console.error('Standings sync error:', error.message);
    }
  }

  // ============================================================
  // HELPERS
  // ============================================================

  mapFixtureStatus(statusCode) {
    const statusMap = {
      TBD: 'SCHEDULED',
      NS: 'SCHEDULED',
      '1H': 'LIVE',
      HT: 'LIVE',
      '2H': 'LIVE',
      ET: 'LIVE',
      P: 'LIVE',
      FT: 'FINISHED',
      AET: 'FINISHED',
      PEN: 'FINISHED',
      PST: 'POSTPONED',
      CANC: 'CANCELLED',
      ABD: 'CANCELLED',
      AWD: 'FINISHED',
      WO: 'FINISHED',
    };

    return statusMap[statusCode] || 'SCHEDULED';
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

module.exports = new FootballApiService();