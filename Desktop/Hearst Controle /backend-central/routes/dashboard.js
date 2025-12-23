/**
 * HEARST CONTROL - Routes du dashboard central
 */

const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { createAuthMiddleware } = require('../../core/middleware/authMiddleware');

const authMiddleware = createAuthMiddleware(process.env.JWT_SECRET);

// Vue d'ensemble globale
router.get('/overview', authMiddleware, dashboardController.getOverview);

// Métriques globales
router.get('/metrics/global', authMiddleware, dashboardController.getGlobalMetrics);

// Métriques par projet
router.get('/metrics/projects', authMiddleware, dashboardController.getProjectsMetrics);

// Alertes actives
router.get('/alerts', authMiddleware, dashboardController.getActiveAlerts);

// Statistiques temps réel
router.get('/realtime', authMiddleware, dashboardController.getRealtimeStats);

module.exports = router;

