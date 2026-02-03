// server/src/config/sportmonks.js
const axios = require('axios');
const redis = require('./redis');
const logger = require('../utils/logger');

class SportMonksAPI {
    constructor() {
        this.baseURL = 'https://api.sportmonks.com/v3/football';
        this.apiToken = process.env.SPORTMONKS_API_TOKEN;

        this.client = axios.create({
            baseURL: this.baseURL,
            timeout: 10000,
            headers: {
                'Accept': 'application/json',
            },
        });

        // Add token to all requests
        this.client.interceptors.request.use((config) => {
            config.params = {
                ...config.params,
                api_token: this.apiToken,
            };
            return config;
        });

        // Add response interceptor for error handling
        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                logger.error('SportMonks API Error:', {
                    status: error.response?.status,
                    message: error.response?.data?.message,
                    endpoint: error.config?.url,
                });
                throw error;
            }
        );
    }

    /**
     * Make cached API request
     */
    async makeRequest(endpoint, params = {}, cacheTTL = 300) {
        const cacheKey = `sportmonks:${endpoint}:${JSON.stringify(params)}`;

        try {
            // Check cache first
            const cached = await redis.get(cacheKey);
            if (cached) {
                logger.info(`Cache hit: ${cacheKey}`);
                return JSON.parse(cached);
            }

            // Make API request
            logger.info(`API request: ${endpoint}`);
            const response = await this.client.get(endpoint, { params });

            const data = response.data;

            // Cache response
            await redis.setex(cacheKey, cacheTTL, JSON.stringify(data));

            return data;
        } catch (error) {
            logger.error('API request failed:', error.message);
            throw error;
        }
    }

    // ============================================================
    // NEWS ENDPOINTS
    // ============================================================

    /**
     * Get latest news (all leagues)
     */
    async getLatestNews(params = {}) {
        const defaultParams = {
            per_page: 20,
            page: 1,
            include: 'image',
            ...params,
        };

        return await this.makeRequest('/news/pre-match', defaultParams, 300); // 5 min cache
    }

    /**
     * Get news by season (league)
     */
    async getNewsBySeason(seasonId, params = {}) {
        const defaultParams = {
            per_page: 20,
            page: 1,
            include: 'image',
            ...params,
        };

        return await this.makeRequest(`/news/pre-match/seasons/${seasonId}`, defaultParams, 300);
    }

    /**
     * Get news by team
     */
    async getNewsByTeam(teamId, params = {}) {
        const defaultParams = {
            per_page: 20,
            page: 1,
            include: 'image',
            ...params,
        };

        return await this.makeRequest(`/news/pre-match/teams/${teamId}`, defaultParams, 300);
    }

    /**
     * Get post-match news
     */
    async getPostMatchNews(params = {}) {
        const defaultParams = {
            per_page: 20,
            page: 1,
            include: 'image',
            ...params,
        };

        return await this.makeRequest('/news/post-match', defaultParams, 300);
    }

    /**
     * Get upcoming fixtures news
     */
    async getUpcomingNews(params = {}) {
        const defaultParams = {
            per_page: 20,
            page: 1,
            include: 'image',
            ...params,
        };

        return await this.makeRequest('/news/upcoming', defaultParams, 300);
    }

    // ============================================================
    // LEAGUES & TEAMS
    // ============================================================

    /**
     * Get all leagues
     */
    async getLeagues() {
        return await this.makeRequest('/leagues', {
            include: 'country,season,currentSeason',
        }, 3600); // 1 hour cache
    }

    /**
     * Get league by ID
     */
    async getLeague(leagueId) {
        return await this.makeRequest(`/leagues/${leagueId}`, {
            include: 'country,season,currentSeason',
        }, 3600);
    }

    /**
     * Get teams by season
     */
    async getTeamsBySeason(seasonId) {
        return await this.makeRequest(`/teams/seasons/${seasonId}`, {
            include: 'country,venue',
        }, 3600);
    }

    /**
     * Get team details
     */
    async getTeam(teamId) {
        return await this.makeRequest(`/teams/${teamId}`, {
            include: 'country,venue,currentSeason',
        }, 3600);
    }

    // ============================================================
    // FIXTURES & STANDINGS
    // ============================================================

    /**
     * Get fixtures by date
     */
    async getFixturesByDate(date) {
        return await this.makeRequest('/fixtures/date/' + date, {
            include: 'league,teams,scores,venue',
        }, 300);
    }

    /**
     * Get live fixtures
     */
    async getLiveFixtures() {
        return await this.makeRequest('/livescores', {
            include: 'league,teams,scores,events',
        }, 30); // 30 seconds cache
    }

    /**
     * Get standings by season
     */
    async getStandings(seasonId) {
        return await this.makeRequest(`/standings/seasons/${seasonId}`, {
            include: 'team,league',
        }, 3600);
    }

    /**
     * Get top scorers by season
     */
    async getTopScorers(seasonId) {
        return await this.makeRequest(`/topscorers/seasons/${seasonId}`, {
            include: 'player,team',
        }, 3600);
    }

    // ============================================================
    // STATISTICS & PREDICTIONS
    // ============================================================

    /**
     * Get team statistics
     */
    async getTeamStatistics(teamId, seasonId) {
        return await this.makeRequest(`/statistics/teams/${teamId}/seasons/${seasonId}`, {}, 3600);
    }

    /**
     * Get head to head
     */
    async getHeadToHead(team1Id, team2Id) {
        return await this.makeRequest(`/fixtures/head-to-head/${team1Id}/${team2Id}`, {
            include: 'league,teams,scores',
        }, 3600);
    }

    /**
     * Get predictions (Premium feature)
     */
    async getPredictions(fixtureId) {
        return await this.makeRequest(`/predictions/fixtures/${fixtureId}`, {}, 3600);
    }
}

module.exports = new SportMonksAPI();
