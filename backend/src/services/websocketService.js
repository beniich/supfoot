// server/src/services/websocketService.js
const WebSocket = require('ws');
const redis = require('../config/redis');
const { createAdapter } = require('@socket.io/redis-adapter');
const footballApi = require('./footballApiPro');

class WebSocketService {
  constructor(server) {
    // Create WebSocket server with Redis adapter for multi-server support
    this.wss = new WebSocket.Server({
      server,
      path: '/ws',
    });

    this.clients = new Map();
    this.rooms = new Map();

    this.initializeServer();
    this.startLiveBroadcast();
  }

  initializeServer() {
    this.wss.on('connection', (ws, req) => {
      const clientId = this.generateClientId();

      console.log(`✅ Client connected: ${clientId}`);

      ws.clientId = clientId;
      this.clients.set(clientId, ws);

      // Handle messages
      ws.on('message', async (message) => {
        try {
          const data = JSON.parse(message);
          await this.handleMessage(ws, data);
        } catch (error) {
          console.error('WebSocket message error:', error);
        }
      });

      // Handle disconnect
      ws.on('close', () => {
        console.log(`❌ Client disconnected: ${clientId}`);
        this.clients.delete(clientId);

        // Remove from all rooms
        this.rooms.forEach((clients, room) => {
          clients.delete(clientId);
        });
      });

      // Send welcome message
      this.send(ws, {
        type: 'connected',
        clientId,
        timestamp: new Date().toISOString(),
      });
    });
  }

  async handleMessage(ws, data) {
    switch (data.type) {
      case 'subscribe':
        this.subscribeToRoom(ws, data.room);
        break;

      case 'unsubscribe':
        this.unsubscribeFromRoom(ws, data.room);
        break;

      case 'ping':
        this.send(ws, { type: 'pong' });
        break;

      default:
        console.warn('Unknown message type:', data.type);
    }
  }

  subscribeToRoom(ws, room) {
    if (!this.rooms.has(room)) {
      this.rooms.set(room, new Set());
    }

    this.rooms.get(room).add(ws.clientId);

    this.send(ws, {
      type: 'subscribed',
      room,
    });

    console.log(`📢 Client ${ws.clientId} subscribed to ${room}`);
  }

  unsubscribeFromRoom(ws, room) {
    if (this.rooms.has(room)) {
      this.rooms.get(room).delete(ws.clientId);
    }

    this.send(ws, {
      type: 'unsubscribed',
      room,
    });
  }

  broadcast(room, message) {
    if (!this.rooms.has(room)) return;

    const roomClients = this.rooms.get(room);

    roomClients.forEach((clientId) => {
      const client = this.clients.get(clientId);
      if (client && client.readyState === WebSocket.OPEN) {
        this.send(client, message);
      }
    });
  }

  send(ws, message) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  async startLiveBroadcast() {
    // Broadcast live scores every 10 seconds
    setInterval(async () => {
      try {
        const liveMatches = await footballApi.getLiveMatches();

        // Broadcast to subscribers
        this.broadcast('live-matches', {
          type: 'live-matches',
          data: liveMatches,
          timestamp: new Date().toISOString(),
        });

        // Also publish to Redis for other servers
        await redis.publish('live-matches', JSON.stringify({
          type: 'live-matches',
          data: liveMatches,
        }));
      } catch (error) {
        console.error('Live broadcast error:', error);
      }
    }, 10000);

    // Subscribe to Redis for updates from other servers
    const subscriber = redis.duplicate();
    subscriber.subscribe('live-matches', 'match-events');

    subscriber.on('message', (channel, message) => {
      const data = JSON.parse(message);
      this.broadcast(channel, data);
    });
  }

  generateClientId() {
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getStats() {
    return {
      totalClients: this.clients.size,
      rooms: Array.from(this.rooms.entries()).map(([room, clients]) => ({
        room,
        clients: clients.size,
      })),
    };
  }
}

module.exports = WebSocketService;