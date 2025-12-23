/**
 * HEARST CONTROL - Auth Controller
 * Authentification centralisée pour tous les projets
 */

const AuthService = require('../../core/auth/authService');
const { createSupabaseClientFromEnv } = require('../../core/database/supabaseClient');
const { logger } = require('../../core/shared-utils/logger');

const supabase = createSupabaseClientFromEnv();
const authService = new AuthService(supabase, process.env.JWT_SECRET);

exports.login = async (req, res) => {
  try {
    const { email, password, projectId } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    logger.info(`Login attempt for ${email}${projectId ? ` (project: ${projectId})` : ''}`);

    const result = await authService.login(email, password, projectId);

    logger.success(`User ${email} logged in successfully`);

    res.json(result);
  } catch (error) {
    logger.error('Login failed', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

exports.verify = async (req, res) => {
  try {
    res.json({ 
      valid: true, 
      user: req.user 
    });
  } catch (error) {
    logger.error('Token verification failed', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.logout = async (req, res) => {
  try {
    logger.info(`User ${req.user.email} logged out`);
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    logger.error('Logout error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.refresh = async (req, res) => {
  try {
    // Implémenter la logique de refresh token
    res.json({ message: 'Token refresh not implemented yet' });
  } catch (error) {
    logger.error('Token refresh error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

