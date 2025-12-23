const express = require('express');
const router = express.Router();
const metricsController = require('../controllers/metricsController');
const authMiddleware = require('../middleware/auth');

// All routes are protected
router.use(authMiddleware);

// GET routes
router.get('/current', metricsController.getCurrentMetrics);
router.get('/period', metricsController.getMetricsByPeriod);
router.get('/hashrate/history', metricsController.getHashrateHistory);
router.get('/power/history', metricsController.getPowerHistory);
router.get('/stats', metricsController.getAggregatedStats);

module.exports = router;

