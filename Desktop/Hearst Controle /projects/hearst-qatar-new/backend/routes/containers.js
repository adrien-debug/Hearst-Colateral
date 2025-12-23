const express = require('express');
const router = express.Router();
const containersController = require('../controllers/containersController');
const authMiddleware = require('../middleware/auth');

// All routes are protected
router.use(authMiddleware);

// GET routes
router.get('/', containersController.getAllContainers);
router.get('/stats', containersController.getContainerStats);
router.get('/:id', containersController.getContainerById);

// POST routes
router.post('/', containersController.createContainer);

// PUT routes
router.put('/:id', containersController.updateContainer);

// DELETE routes
router.delete('/:id', containersController.deleteContainer);

module.exports = router;

