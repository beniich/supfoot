const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const User = require('../models/User');
const Ticket = require('../models/Ticket'); // Supposant que ce modèle existe
const logger = require('../utils/logger');

// Middleware de protection globale pour toutes les routes admin
router.use(authenticateToken, requireAdmin);

/**
 * @route   GET /api/admin/stats
 * @desc    Obtenir les statistiques globales du dashboard
 * @access  Admin
 */
router.get('/stats', async (req, res) => {
    try {
        // En production, ces données seraient agrégées ou mises en cache
        const userCount = await User.countDocuments();
        const activeUsers = await User.countDocuments({ isActive: true });

        // Données fictives pour la démo si les modèles ne sont pas encore complets
        const stats = {
            users: userCount || 12845,
            usersChange: '+12.4%',
            tickets: 4210,
            ticketsChange: '+8.2%',
            revenue: 245500,
            revenueChange: '+24.1%',
            scanners: 142
        };

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        logger.error(`Admin Stats Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Erreur lors de la récupération des stats' });
    }
});

/**
 * @route   GET /api/admin/users
 * @desc    Liste des utilisateurs avec pagination
 * @access  Admin
 */
router.get('/users', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments();

        res.json({
            success: true,
            data: users,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        logger.error(`Admin Users Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Erreur lors de la récupération des utilisateurs' });
    }
});

/**
 * @route   GET /api/admin/tickets/logs
 * @desc    Flux d'activité récent (billets, scans)
 * @access  Admin
 */
router.get('/tickets/logs', async (req, res) => {
    try {
        // Simulation de logs d'activité pour l'accueil
        const logs = [
            { id: 1, action: 'Billet Validé', details: 'Tribune Nord - Porte A', time: '2 min', icon: 'check_circle' },
            { id: 2, action: 'Nouvel Utilisateur', details: 'Ahmed El Mansouri', time: '15 min', icon: 'person_add' },
            { id: 3, action: 'Paiement Reçu', details: '#ORD-5421 - 450 MAD', time: '45 min', icon: 'payments' },
            { id: 4, action: 'Alerte Scanner', details: 'Appareil #SCAN-09 Hors ligne', time: '1h', icon: 'warning' },
            { id: 5, action: 'Match Créé', details: 'Raja vs Wydad - 15/02', time: '3h', icon: 'event' }
        ];

        res.json({
            success: true,
            data: logs
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur lors de la récupération des logs' });
    }
});

module.exports = router;
