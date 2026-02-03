// server/src/services/footballApiPro.js
const axios = require('axios');
const redis = require('../config/redis');
const { RateLimiterMemory } = require('rate-limiter-flexible');

// Rate limiter (API-Football limite à 100 req/jour en free tier)
const rateLimiter = new RateLimiterMemory({
    points: 100, // 100 requests
    duration: 86400, // per day
});

class FootballApiService {
    constructor() {
        this.client = axios.create({
            baseURL: 'https://v3.football.api-sports.io',
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host': 'v3.football.api-sports.io',
            },
            timeout: 10000,
        });
    }

    // Rate limited API call
    async makeRequest(endpoint, params = {}) {
        try {
            // Check rate limit (only for external calls, check cache primarily first)
            const cacheKey = `football-api:${endpoint}:${JSON.stringify(params)}`;
            const cached = await redis.get(cacheKey);

            if (cached) {
                console.log('✅ Cache hit:', endpoint);
                return JSON.parse(cached);
            }

            // Check rate limit before calling API
            try {
                await rateLimiter.consume('api-football', 1);
            } catch (rateLimitError) {
                console.error('⚠️ Rate limit exceeded (Memory)', rateLimitError);
                // Try to return stale data if available or throw
                throw new Error('API rate limit exceeded. Please try again later.');
            }

            // Make API request
            console.log('📡 API request:', endpoint);
            const response = await this.client.get(endpoint, { params });

            // Cache response (5 minutes for live data, 1 hour for static)
            // Dynamic TTL based on content could be improved
            const ttl = endpoint.includes('live') ? 300 : 3600;
            await redis.setex(cacheKey, ttl, JSON.stringify(response.data));

            return response.data;
        } catch (error) {
            if (error instanceof Error && error.message.includes('rate limit')) {
                console.error('⚠️ Rate limit exceeded');
                throw new Error('API rate limit exceeded. Please try again later.');
            }

            console.error('API-Football error:', error.response?.data || error.message);
            throw error;
        }
    }

    // Get live matches
    async getLiveMatches() {
        const data = await this.makeRequest('/fixtures', {
            live: 'all',
        });

        return data.response;
    }

    // Get fixtures by league and date
    async getFixtures(leagueId, season, date) {
        const data = await this.makeRequest('/fixtures', {
            league: leagueId,
            season: season,
            date: date, // YYYY-MM-DD
        });

        return data.response;
    }

    // Get fixture details with lineups and statistics
    async getFixtureDetails(fixtureId) {
        try {
            const [fixture, lineups, statistics, events] = await Promise.all([
                this.makeRequest('/fixtures', { id: fixtureId }),
                this.makeRequest('/fixtures/lineups', { fixture: fixtureId }),
                this.makeRequest('/fixtures/statistics', { fixture: fixtureId }),
                this.makeRequest('/fixtures/events', { fixture: fixtureId }),
            ]);

            return {
                fixture: fixture.response[0],
                lineups: lineups.response,
                statistics: statistics.response,
                events: events.response,
            };
        } catch (error) {
            console.error("Error fetching fixture details:", error);
            throw error;
        }
    }

    // Get league standings
    async getStandings(leagueId, season) {
        const data = await this.makeRequest('/standings', {
            league: leagueId,
            season: season,
        });

        return data.response[0]?.league?.standings[0] || [];
    }

    // Get team information
    async getTeam(teamId) {
        const data = await this.makeRequest('/teams', {
            id: teamId,
        });

        return data.response[0];
    }

    // Get top scorers
    async getTopScorers(leagueId, season) {
        const data = await this.makeRequest('/players/topscorers', {
            league: leagueId,
            season: season,
        });

        return data.response;
    }

    // Get player statistics
    async getPlayerStats(playerId, season) {
        const data = await this.makeRequest('/players', {
            id: playerId,
            season: season,
        });

        return data.response[0];
    }

    // Get head to head
    async getHeadToHead(team1Id, team2Id) {
        const data = await this.makeRequest('/fixtures/headtohead', {
            h2h: `${team1Id}-${team2Id}`,
            last: 10,
        });

        return data.response;
    }

    // Get predictions
    async getPredictions(fixtureId) {
        const data = await this.makeRequest('/predictions', {
            fixture: fixtureId,
        });

        return data.response[0];
    }
}

module.exports = new FootballApiService();
