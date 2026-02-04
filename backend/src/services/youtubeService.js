const axios = require('axios');
const redis = require('../config/redis');
const logger = require('../utils/logger');

class YouTubeService {
    constructor() {
        this.apiKey = process.env.YOUTUBE_API_KEY;
        this.baseURL = 'https://www.googleapis.com/youtube/v3';
    }

    /**
     * Search videos by query
     */
    async searchVideos(query, maxResults = 10) {
        try {
            // Check cache
            const cacheKey = `youtube:search:${query}:${maxResults}`;
            const cached = await redis.get(cacheKey);

            if (cached) {
                return JSON.parse(cached);
            }

            // Check if API key is present
            if (!this.apiKey) {
                logger.warn('YOUTUBE_API_KEY not found');
                return [];
            }

            const response = await axios.get(`${this.baseURL}/search`, {
                params: {
                    key: this.apiKey,
                    q: query,
                    part: 'snippet',
                    type: 'video',
                    maxResults,
                    order: 'date',
                    videoDuration: 'any',
                    relevanceLanguage: 'fr',
                },
            });

            const videos = response.data.items.map(item => ({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.high.url,
                publishedAt: item.snippet.publishedAt,
                channelTitle: item.snippet.channelTitle,
                url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
            }));

            // Cache for 1 hour
            await redis.setex(cacheKey, 3600, JSON.stringify(videos));

            return videos;
        } catch (error) {
            logger.error('YouTube search error:', error?.response?.data || error.message);
            // Fallback empty to prevent crash
            return [];
        }
    }

    /**
     * Get related videos for news article
     */
    async getRelatedVideos(newsTitle, league = null, teams = []) {
        try {
            // Build search query
            let query = newsTitle;

            if (league) {
                query += ` ${league.name}`;
            }

            if (teams && teams.length > 0) {
                query += ` ${teams.map(t => t.name).join(' ')}`;
            }

            query += ' highlights goals';

            const videos = await this.searchVideos(query, 5);

            return videos;
        } catch (error) {
            logger.error('Get related videos error:', error);
            return [];
        }
    }

    /**
     * Get trending football videos
     */
    async getTrendingVideos() {
        try {
            const cacheKey = 'youtube:trending:football';
            const cached = await redis.get(cacheKey);

            if (cached) {
                return JSON.parse(cached);
            }

            if (!this.apiKey) return [];

            const response = await axios.get(`${this.baseURL}/videos`, {
                params: {
                    key: this.apiKey,
                    part: 'snippet,statistics',
                    chart: 'mostPopular',
                    videoCategoryId: '17', // Sports category
                    maxResults: 20,
                    regionCode: 'MA', // Morocco
                },
            });

            const videos = response.data.items
                .filter(item =>
                    item.snippet.title.toLowerCase().includes('football') ||
                    item.snippet.title.toLowerCase().includes('soccer')
                )
                .slice(0, 10)
                .map(item => ({
                    id: item.id,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnail: item.snippet.thumbnails.high.url,
                    publishedAt: item.snippet.publishedAt,
                    channelTitle: item.snippet.channelTitle,
                    viewCount: parseInt(item.statistics.viewCount),
                    likeCount: parseInt(item.statistics.likeCount),
                    url: `https://www.youtube.com/watch?v=${item.id}`,
                    embedUrl: `https://www.youtube.com/embed/${item.id}`,
                }));

            // Cache for 6 hours
            await redis.setex(cacheKey, 21600, JSON.stringify(videos));

            return videos;
        } catch (error) {
            logger.error('Get trending videos error:', error?.response?.data || error.message);
            return [];
        }
    }

    /**
     * Get video details
     */
    async getVideoDetails(videoId) {
        try {
            if (!this.apiKey) return null;

            const response = await axios.get(`${this.baseURL}/videos`, {
                params: {
                    key: this.apiKey,
                    part: 'snippet,statistics,contentDetails',
                    id: videoId,
                },
            });

            const item = response.data.items[0];

            if (!item) {
                return null;
            }

            return {
                id: item.id,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.high.url,
                publishedAt: item.snippet.publishedAt,
                channelTitle: item.snippet.channelTitle,
                duration: item.contentDetails.duration,
                viewCount: parseInt(item.statistics.viewCount),
                likeCount: parseInt(item.statistics.likeCount),
                commentCount: parseInt(item.statistics.commentCount),
                url: `https://www.youtube.com/watch?v=${item.id}`,
                embedUrl: `https://www.youtube.com/embed/${item.id}`,
            };
        } catch (error) {
            logger.error('Get video details error:', error);
            return null;
        }
    }
}

module.exports = new YouTubeService();
