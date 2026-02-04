import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import logger from '../utils/logger.js';

/**
 * 🕷️ Scraper pour UEFA.com
 * Récupère les données de la Ligue des Champions
 */
class UEFAScraper {
  constructor() {
    this.baseUrl = process.env.UEFA_BASE_URL || 'https://www.uefa.com';
    this.userAgent = process.env.USER_AGENT || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
    this.delay = parseInt(process.env.SCRAPING_DELAY_MS) || 2000;
    this.timeout = parseInt(process.env.SCRAPING_TIMEOUT_MS) || 30000;
    this.browser = null;
  }

  /**
   * Initialiser le navigateur Puppeteer
   */
  async initBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: process.env.PUPPETEER_HEADLESS !== 'false',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu'
        ]
      });
      logger.info('✅ Puppeteer browser initialized');
    }
    return this.browser;
  }

  /**
   * Fermer le navigateur
   */
  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      logger.info('🔒 Puppeteer browser closed');
    }
  }

  /**
   * Créer une nouvelle page avec configuration
   */
  async createPage() {
    const browser = await this.initBrowser();
    const page = await browser.newPage();
    
    await page.setUserAgent(this.userAgent);
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Bloquer les ressources inutiles pour accélérer
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const resourceType = request.resourceType();
      if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
        request.abort();
      } else {
        request.continue();
      }
    });
    
    return page;
  }

  /**
   * Attendre un délai pour être respectueux
   */
  async wait() {
    await new Promise(resolve => setTimeout(resolve, this.delay));
  }

  /**
   * Scraper le classement de la phase de groupes
   */
  async scrapeStandings(season = '2024') {
    let page;
    try {
      logger.info(`Scraping UCL standings for season ${season}...`);
      
      page = await this.createPage();
      const url = `${this.baseUrl}/uefachampionsleague/standings/`;
      
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: this.timeout
      });
      
      // Attendre que les données se chargent
      await page.waitForSelector('.standings-table, table, .league-table', {
        timeout: 10000
      }).catch(() => {
        logger.warn('No standings table found, trying alternative selectors');
      });
      
      const html = await page.content();
      const $ = cheerio.load(html);
      
      const standings = [];
      
      // Adapter les sélecteurs selon la structure réelle du site
      $('table tbody tr, .standings-table tbody tr').each((i, row) => {
        const $row = $(row);
        
        const position = $row.find('td:nth-child(1), .position').text().trim();
        const team = $row.find('td:nth-child(2) .team-name, .team-name, td:nth-child(2) a').text().trim();
        const played = parseInt($row.find('td:nth-child(3), .played').text().trim()) || 0;
        const won = parseInt($row.find('td:nth-child(4), .won').text().trim()) || 0;
        const drawn = parseInt($row.find('td:nth-child(5), .drawn').text().trim()) || 0;
        const lost = parseInt($row.find('td:nth-child(6), .lost').text().trim()) || 0;
        const points = parseInt($row.find('td:nth-child(10), .points').text().trim()) || 0;
        
        if (team && played > 0) {
          standings.push({
            position: parseInt(position) || i + 1,
            team,
            played,
            won,
            drawn,
            lost,
            goalsFor: parseInt($row.find('td:nth-child(7)').text().trim()) || 0,
            goalsAgainst: parseInt($row.find('td:nth-child(8)').text().trim()) || 0,
            goalDifference: parseInt($row.find('td:nth-child(9)').text().trim()) || 0,
            points
          });
        }
      });
      
      logger.info(`✅ Scraped ${standings.length} teams from standings`);
      
      await this.wait();
      return {
        season,
        standings,
        scrapedAt: new Date(),
        source: 'uefa.com'
      };
      
    } catch (error) {
      logger.error('Failed to scrape standings:', error);
      throw error;
    } finally {
      if (page) await page.close();
    }
  }

  /**
   * Scraper les détails d'un match
   */
  async scrapeMatchDetails(matchId) {
    let page;
    try {
      logger.info(`Scraping match details: ${matchId}`);
      
      page = await this.createPage();
      const url = `${this.baseUrl}/uefachampionsleague/match/${matchId}/`;
      
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: this.timeout
      });
      
      const html = await page.content();
      const $ = cheerio.load(html);
      
      // Extraire les informations du match
      const homeTeam = $('.home-team .team-name, .match-team--home .team-name').first().text().trim();
      const awayTeam = $('.away-team .team-name, .match-team--away .team-name').first().text().trim();
      
      const homeScore = parseInt($('.home-team .score, .match-team--home .score').first().text().trim()) || null;
      const awayScore = parseInt($('.away-team .score, .match-team--away .score').first().text().trim()) || null;
      
      const date = $('.match-date, .fixture-date').first().text().trim();
      const venue = $('.match-venue, .stadium').first().text().trim();
      
      // Statistiques du match
      const stats = {};
      $('.match-stats .stat-item, .statistics-item').each((i, stat) => {
        const $stat = $(stat);
        const label = $stat.find('.stat-label, .label').text().trim();
        const homeValue = $stat.find('.stat-home, .home-value').text().trim();
        const awayValue = $stat.find('.stat-away, .away-value').text().trim();
        
        if (label) {
          stats[this.normalizeStatLabel(label)] = {
            home: homeValue,
            away: awayValue
          };
        }
      });
      
      // Événements du match (buts, cartons, etc.)
      const events = [];
      $('.match-event, .timeline-item').each((i, event) => {
        const $event = $(event);
        const minute = $event.find('.event-minute, .minute').text().trim();
        const type = $event.find('.event-type, .icon').attr('class') || '';
        const player = $event.find('.event-player, .player-name').text().trim();
        const team = $event.find('.event-team').text().trim();
        
        if (player) {
          events.push({
            minute: parseInt(minute) || 0,
            type: this.normalizeEventType(type),
            player,
            team
          });
        }
      });
      
      logger.info(`✅ Scraped match: ${homeTeam} vs ${awayTeam}`);
      
      await this.wait();
      return {
        matchId,
        homeTeam,
        awayTeam,
        score: homeScore !== null ? `${homeScore}-${awayScore}` : 'N/A',
        homeScore,
        awayScore,
        date,
        venue,
        statistics: stats,
        events,
        scrapedAt: new Date(),
        source: 'uefa.com'
      };
      
    } catch (error) {
      logger.error(`Failed to scrape match ${matchId}:`, error);
      throw error;
    } finally {
      if (page) await page.close();
    }
  }

  /**
   * Scraper les statistiques des joueurs
   */
  async scrapePlayerStats(playerId) {
    let page;
    try {
      logger.info(`Scraping player stats: ${playerId}`);
      
      page = await this.createPage();
      const url = `${this.baseUrl}/uefachampionsleague/clubs/players/${playerId}/`;
      
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: this.timeout
      });
      
      const html = await page.content();
      const $ = cheerio.load(html);
      
      const name = $('.player-name, .player-header h1').first().text().trim();
      const team = $('.player-team, .club-name').first().text().trim();
      const position = $('.player-position, .position').first().text().trim();
      const nationality = $('.player-nationality, .nationality').first().text().trim();
      
      const stats = {
        appearances: 0,
        goals: 0,
        assists: 0,
        minutesPlayed: 0
      };
      
      $('.player-stat-item, .stat-row').each((i, stat) => {
        const $stat = $(stat);
        const label = $stat.find('.stat-label, .label').text().trim().toLowerCase();
        const value = parseInt($stat.find('.stat-value, .value').text().trim()) || 0;
        
        if (label.includes('appearances') || label.includes('matches')) {
          stats.appearances = value;
        } else if (label.includes('goals')) {
          stats.goals = value;
        } else if (label.includes('assists')) {
          stats.assists = value;
        } else if (label.includes('minutes')) {
          stats.minutesPlayed = value;
        }
      });
      
      logger.info(`✅ Scraped stats for ${name}`);
      
      await this.wait();
      return {
        playerId,
        name,
        team,
        position,
        nationality,
        stats,
        scrapedAt: new Date(),
        source: 'uefa.com'
      };
      
    } catch (error) {
      logger.error(`Failed to scrape player ${playerId}:`, error);
      throw error;
    } finally {
      if (page) await page.close();
    }
  }

  /**
   * Scraper les prochains matchs
   */
  async scrapeUpcomingMatches() {
    let page;
    try {
      logger.info('Scraping upcoming UCL matches...');
      
      page = await this.createPage();
      const url = `${this.baseUrl}/uefachampionsleague/fixtures-results/`;
      
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: this.timeout
      });
      
      const html = await page.content();
      const $ = cheerio.load(html);
      
      const matches = [];
      
      $('.fixture-item, .match-item, .fixture').each((i, match) => {
        const $match = $(match);
        
        const homeTeam = $match.find('.home-team .team-name, .team-home').text().trim();
        const awayTeam = $match.find('.away-team .team-name, .team-away').text().trim();
        const date = $match.find('.match-date, .date').text().trim();
        const time = $match.find('.match-time, .time').text().trim();
        const matchId = $match.find('a').attr('href')?.match(/\/(\d+)\//)?.[1];
        
        if (homeTeam && awayTeam) {
          matches.push({
            matchId,
            homeTeam,
            awayTeam,
            date,
            time,
            kickoff: `${date} ${time}`,
            status: 'scheduled'
          });
        }
      });
      
      logger.info(`✅ Scraped ${matches.length} upcoming matches`);
      
      await this.wait();
      return {
        matches,
        scrapedAt: new Date(),
        source: 'uefa.com'
      };
      
    } catch (error) {
      logger.error('Failed to scrape upcoming matches:', error);
      throw error;
    } finally {
      if (page) await page.close();
    }
  }

  /**
   * Normaliser les labels de statistiques
   */
  normalizeStatLabel(label) {
    const normalized = label.toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');
    
    return normalized;
  }

  /**
   * Normaliser le type d'événement
   */
  normalizeEventType(className) {
    if (className.includes('goal')) return 'goal';
    if (className.includes('yellow')) return 'yellow_card';
    if (className.includes('red')) return 'red_card';
    if (className.includes('substitution')) return 'substitution';
    return 'other';
  }

  /**
   * Vérifier la santé du scraper
   */
  async healthCheck() {
    try {
      const browser = await this.initBrowser();
      const isHealthy = browser.isConnected();
      
      return {
        status: isHealthy ? 'healthy' : 'unhealthy',
        browser: isHealthy
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message
      };
    }
  }
}

export default UEFAScraper;
