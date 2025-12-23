/**
 * HEARST CONTROL - Routes de gestion des projets
 */

const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');
const { createAuthMiddleware, requireRole } = require('../../core/middleware/authMiddleware');

const authMiddleware = createAuthMiddleware(process.env.JWT_SECRET);

// Liste tous les projets
router.get('/', authMiddleware, projectsController.getAll);

// Récupère un projet par ID
router.get('/:id', authMiddleware, projectsController.getById);

// Récupère les statistiques d'un projet
router.get('/:id/stats', authMiddleware, projectsController.getStats);

// Crée un nouveau projet (admin seulement)
router.post('/', authMiddleware, requireRole('admin'), projectsController.create);

// Met à jour un projet (admin seulement)
router.put('/:id', authMiddleware, requireRole('admin'), projectsController.update);

// Supprime un projet (super_admin seulement)
router.delete('/:id', authMiddleware, requireRole('super_admin'), projectsController.delete);

module.exports = router;

