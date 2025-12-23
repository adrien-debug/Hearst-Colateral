const express = require('express');
const router = express.Router();
const minersController = require('../controllers/minersController');
const authMiddleware = require('../middleware/auth');

// All routes are protected
router.use(authMiddleware);

// GET routes
router.get('/', minersController.getAllMiners);
router.get('/stats', minersController.getMinerStats);
router.get('/container/:containerId', minersController.getMinersByContainer);

// PUT routes
router.put('/:id', minersController.updateMiner);

// POST routes
router.post('/:id/restart', minersController.restartMiner);

module.exports = router;

