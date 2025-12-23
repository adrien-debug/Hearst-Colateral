/**
 * HEARST CONTROL - Routes d'authentification centrale
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { createAuthMiddleware } = require('../../core/middleware/authMiddleware');

const authMiddleware = createAuthMiddleware(process.env.JWT_SECRET);

// Login centralisé
router.post('/login', authController.login);

// Vérifier token
router.get('/verify', authMiddleware, authController.verify);

// Logout
router.post('/logout', authMiddleware, authController.logout);

// Refresh token
router.post('/refresh', authMiddleware, authController.refresh);

module.exports = router;

