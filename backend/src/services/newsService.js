const sportmonks = require('../config/sportmonks');
const News = require('../models/News');
const logger = require('../utils/logger');

class NewsService {
    /**
     * Sync news from SportMonks to database
     */
    async syncNews(seasonId = null, limit = 50) {
        try {
            logger.info('Syncing news from SportMonks...');

            let newsData;
            if (seasonId) {
                newsData = await sportmonks.getNewsBySeason(seasonId, { per_page: limit });
            } else {
                newsData = await sportmonks.getLatestNews({ per_page: limit });
            }

            if (!newsData.data || newsData.data.length === 0) {
                logger.warn('No news data received from SportMonks');
                return { synced: 0 };
            }

            let syncedCount = 0;

            for (const article of newsData.data) {
                // Check if article already exists
                const exists = await News.findOne({ externalId: article.id });

                if (!exists) {
                    await News.create({
                        externalId: article.id,
                        title: article.title,
                        content: article.description || '',
                        excerpt: this.generateExcerpt(article.description),
                        author: article.author || 'SportMonks',
                        source: 'SportMonks',
                        sourceUrl: article.url,
                        image: article.image_path || null,
                        category: this.determineCategory(article),
                        tags: this.extractTags(article),
                        publishedAt: new Date(article.published_at),
                        league: article.season_id || null,
                        teams: article.team_id ? [article.team_id] : [],
                        featured: false,
                        status: 'Published',
                    });

                    syncedCount++;
                }
            }

            logger.info(`✅ Synced ${syncedCount} news articles`);

            return { synced: syncedCount, total: newsData.data.length };
        } catch (error) {
            logger.error('News sync error:', error);
            throw error;
        }
    }

    /**
     * Generate excerpt from content
     */
    generateExcerpt(content, length = 150) {
        if (!content) return '';

        const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
        return text.length > length
            ? text.substring(0, length) + '...'
            : text;
    }

    /**
     * Determine article category
     */
    determineCategory(article) {
        const title = article.title.toLowerCase();

        if (title.includes('transfer') || title.includes('signing')) return 'Transfers';
        if (title.includes('injury') || title.includes('injured')) return 'Injuries';
        if (title.includes('match') || title.includes('game')) return 'Matches';
        if (title.includes('interview') || title.includes('says')) return 'Interviews';
        if (title.includes('rumor') || title.includes('rumour')) return 'Rumors';

        return 'General';
    }

    /**
     * Extract tags from article
     */
    extractTags(article) {
        const tags = [];

        if (article.season_id) tags.push('season');
        if (article.team_id) tags.push('team');
        if (article.title.includes('goal')) tags.push('goals');
        if (article.title.includes('win')) tags.push('wins');

        return tags;
    }

    /**
     * Get featured news
     */
    async getFeaturedNews(limit = 5) {
        return await News.find({
            status: 'Published',
            featured: true,
        })
            .sort({ publishedAt: -1 })
            .limit(limit)
            .populate('league teams');
    }

    /**
     * Get news by league
     */
    async getNewsByLeague(leagueId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        const [news, total] = await Promise.all([
            News.find({ league: leagueId, status: 'Published' })
                .sort({ publishedAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('league teams'),
            News.countDocuments({ league: leagueId, status: 'Published' }),
        ]);

        return {
            news,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Get news by team
     */
    async getNewsByTeam(teamId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        const [news, total] = await Promise.all([
            News.find({ teams: teamId, status: 'Published' })
                .sort({ publishedAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('league teams'),
            News.countDocuments({ teams: teamId, status: 'Published' }),
        ]);

        return {
            news,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Get news by category
     */
    async getNewsByCategory(category, page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        const [news, total] = await Promise.all([
            News.find({ category, status: 'Published' })
                .sort({ publishedAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('league teams'),
            News.countDocuments({ category, status: 'Published' }),
        ]);

        return {
            news,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Search news
     */
    async searchNews(query, page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        const searchQuery = {
            status: 'Published',
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } },
                { tags: { $in: [query.toLowerCase()] } },
            ],
        };

        const [news, total] = await Promise.all([
            News.find(searchQuery)
                .sort({ publishedAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('league teams'),
            News.countDocuments(searchQuery),
        ]);

        return {
            news,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        };
    }
}

module.exports = new NewsService();
