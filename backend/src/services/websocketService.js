const { Server } = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');
const redis = require('../config/redis');
const footballApi = require('./footballApiPro');
const logger = require('../utils/logger');

class WebSocketService {
  constructor(server) {
    if (!server) {
      throw new Error('WebSocketService requires an HTTP server instance');
    }

    // Configurer Socket.io avec CORS
    this.io = new Server(server, {
      path: '/ws', // Compatibilité avec configuration précédente
      cors: {
        origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
        methods: ['GET', 'POST'],
        credentials: true
      },
      pingTimeout: 60000,
    });

    // Configurer Redis Adapter pour le scaling horizontal
    const pubClient = redis.duplicate();
    const subClient = redis.duplicate();

    Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
      this.io.adapter(createAdapter(pubClient, subClient));
      logger.info('✅ Socket.io Redis Adapter connected');
    }).catch(err => {
      // En cas d'erreur de connexion Redis (si ioredis gère la co auto, .connect() peut être inutile selon version)
      // Mais avec ioredis v5, duplicate() ne connecte pas automatiquement si lazyConnect est true
      // On log juste l'erreur, ça ne doit pas crasher l'app si redis est down temporairement
      logger.error('❌ Socket.io Redis Adapter error:', err);
    });

    this.initializeNamespaces();
    this.startLiveBroadcast();

    logger.info('🔌 Socket.io Server initialized');
  }

  initializeNamespaces() {
    // Namespace général / par défaut
    this.io.on('connection', (socket) => {
      this.handleConnection(socket, 'General');
    });

    // Namespace Live Scores
    this.livescores = this.io.of('/livescores');
    this.livescores.on('connection', (socket) => {
      this.handleConnection(socket, 'LiveScores');

      socket.on('subscribe', (matchId) => {
        socket.join(`match:${matchId}`);
        logger.info(`Client ${socket.id} subscribed to match:${matchId}`);
      });

      socket.on('unsubscribe', (matchId) => {
        socket.leave(`match:${matchId}`);
      });
    });

    // Namespace Chat (pour plus tard)
    this.chat = this.io.of('/chat');
    this.chat.on('connection', (socket) => {
      this.handleConnection(socket, 'Chat');
      // Logique chat à implémenter
    });
  }

  handleConnection(socket, namespaceName) {
    logger.info(`✅ [${namespaceName}] Client connected: ${socket.id}`);

    socket.on('disconnect', () => {
      logger.info(`❌ [${namespaceName}] Client disconnected: ${socket.id}`);
    });

    socket.on('error', (err) => {
      logger.error(`WebSocket Error [${namespaceName}]:`, err);
    });
  }

  /**
   * Diffuse les scores en direct
   */
  async startLiveBroadcast() {
    // Diffuse toutes les 10 secondes (ou plus fréquent si match en cours)
    setInterval(async () => {
      try {
        const liveMatches = await footballApi.getLiveMatches();

        if (liveMatches && liveMatches.length > 0) {
          // Envoyer à tous les clients connectés au namespace livescores
          this.livescores.emit('live-matches', {
            matches: liveMatches,
            timestamp: new Date().toISOString()
          });

          // Envoyer des mises à jour spécifiques par match (pour ceux qui sont dans la room match:ID)
          liveMatches.forEach(match => {
            this.livescores.to(`match:${match.fixture.id}`).emit('match-update', match);
          });
        }
      } catch (error) {
        logger.error('Live broadcast error:', error);
      }
    }, 10000);
  }

  /**
   * Helper pour envoyer une notification à un utilisateur spécifique
   */
  sendToUser(userId, event, data) {
    // Nécessite que le socket soit joint à une room "user:ID" lors de l'auth
    this.io.to(`user:${userId}`).emit(event, data);
  }
}

module.exports = WebSocketService;