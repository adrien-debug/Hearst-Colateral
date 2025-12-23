/**
 * HEARST CONTROL - Routes de gestion des utilisateurs
 */

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { createAuthMiddleware, requireRole } = require('../../core/middleware/authMiddleware');

const authMiddleware = createAuthMiddleware(process.env.JWT_SECRET);

// Liste tous les utilisateurs (admin seulement)
router.get('/', authMiddleware, requireRole('admin'), usersController.getAll);

// Récupère un utilisateur par ID
router.get('/:id', authMiddleware, usersController.getById);

// Crée un nouvel utilisateur (admin seulement)
router.post('/', authMiddleware, requireRole('admin'), usersController.create);

// Met à jour un utilisateur
router.put('/:id', authMiddleware, usersController.update);

// Supprime un utilisateur (admin seulement)
router.delete('/:id', authMiddleware, requireRole('admin'), usersController.delete);

// Gère l'accès aux projets
router.post('/:id/projects', authMiddleware, requireRole('admin'), usersController.grantProjectAccess);
router.delete('/:id/projects/:projectId', authMiddleware, requireRole('admin'), usersController.revokeProjectAccess);

module.exports = router;

