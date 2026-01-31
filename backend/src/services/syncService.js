// src/services/syncService.js
const footballApi = require('./footballApi');
const Match = require('../models/Match');
const League = require('../models/League');

class SyncService {
  constructor() {
    this.syncInProgress = false;
    this.lastSyncTimes = {
      leagues: null,
      matches: null,
      standings: null,
      liveMatches: null,
    };
  }

  // ============================================================
  // SYNC FEATURED LEAGUES
  // ============================================================

  async syncFeaturedLeagues() {
    if (this.syncInProgress) {
      console.log('⏸️  Sync already in progress');
      return;
    }

    try {
      this.syncInProgress = true;
      console.log('🔄 Starting featured leagues sync...');

      await footballApi.syncLeagues();

      this.lastSyncTimes.leagues = new Date();
      console.log('✅ Featured leagues sync completed');
    } catch (error) {
      console.error('❌ Featured leagues sync error:', error);
    } finally {
      this.syncInProgress = false;
    }
  }

  // ============================================================
  // SYNC FEATURED MATCHES
  // ============================================================

  async syncFeaturedMatches() {
    try {
      console.log('🔄 Starting featured matches sync...');

      const featuredLeagues = await League.find({
        isFeatured: true,
        isActive: true,
      });

      const currentYear = new Date().getFullYear();

      for (const league of featuredLeagues) {
        if (!league.apiFootballId) continue;

        try {
          console.log(`Syncing matches for ${league.name}...`);

          await footballApi.syncFixturesByLeague(
            league.apiFootballId,
            currentYear
          );

          console.log(`✅ Synced matches for ${league.name}`);

          // Rate limiting
          await this.sleep(6000);
        } catch (error) {
          console.error(`❌ Error syncing matches for ${league.name}:`, error.message);
        }
      }

      this.lastSyncTimes.matches = new Date();
      console.log('✅ Featured matches sync completed');
    } catch (error) {
      console.error('❌ Featured matches sync error:', error);
    }
  }

  // ============================================================
  // SYNC LIVE MATCHES
  // ============================================================

  async syncLiveMatches() {
    try {
      console.log('⚡ Syncing live matches...');

      const liveFixtures = await footballApi.getLiveMatches();
      let syncedCount = 0;

      for (const fixtureData of liveFixtures) {
        try {
          const dbLeague = await League.findOne({
            apiFootballId: fixtureData.league.id,
          });

          if (!dbLeague) continue;

          await Match.findOneAndUpdate(
            { apiFootballId: fixtureData.fixture.id },
            {
              status: footballApi.mapFixtureStatus(fixtureData.fixture.status.short),
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
              lastSyncedAt: new Date(),
            },
            { upsert: false }
          );

          syncedCount++;
        } catch (error) {
          console.error('Error updating live match:', error.message);
        }
      }

      this.lastSyncTimes.liveMatches = new Date();
      console.log(`✅ Synced ${syncedCount} live matches`);

      return syncedCount;
    } catch (error) {
      console.error('❌ Live matches sync error:', error);
      return 0;
    }
  }

  // ============================================================
  // SYNC STANDINGS
  // ============================================================

  async syncFeaturedStandings() {
    try {
      console.log('🔄 Starting standings sync...');

      const featuredLeagues = await League.find({
        isFeatured: true,
        isActive: true,
      });

      const currentYear = new Date().getFullYear();

      for (const league of featuredLeagues) {
        if (!league.apiFootballId) continue;

        try {
          console.log(`Syncing standings for ${league.name}...`);

          await footballApi.syncStandingsByLeague(
            league.apiFootballId,
            currentYear
          );

          console.log(`✅ Synced standings for ${league.name}`);

          // Rate limiting
          await this.sleep(6000);
        } catch (error) {
          console.error(`❌ Error syncing standings for ${league.name}:`, error.message);
        }
      }

      this.lastSyncTimes.standings = new Date();
      console.log('✅ Standings sync completed');
    } catch (error) {
      console.error('❌ Standings sync error:', error);
    }
  }

  // ============================================================
  // FULL SYNC
  // ============================================================

  async fullSync() {
    console.log('🚀 Starting FULL SYNC...');

    try {
      await this.syncFeaturedLeagues();
      await this.sleep(5000);

      await this.syncFeaturedMatches();
      await this.sleep(5000);

      await this.syncFeaturedStandings();

      console.log('✅ FULL SYNC completed successfully');
    } catch (error) {
      console.error('❌ FULL SYNC error:', error);
    }
  }

  // ============================================================
  // HELPERS
  // ============================================================

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getLastSyncTimes() {
    return this.lastSyncTimes;
  }

  getSyncStatus() {
    return {
      inProgress: this.syncInProgress,
      lastSyncTimes: this.lastSyncTimes,
    };
  }
}

module.exports = new SyncService();