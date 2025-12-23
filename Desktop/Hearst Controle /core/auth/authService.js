/**
 * HEARST CONTROL - Core Authentication Service
 * Service d'authentification centralisé pour tous les projets
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class AuthService {
  constructor(supabaseClient, jwtSecret) {
    this.supabase = supabaseClient;
    this.jwtSecret = jwtSecret;
  }

  /**
   * Authentifie un utilisateur
   * @param {string} email 
   * @param {string} password 
   * @param {string} projectId - ID du projet (ex: "QATAR-001")
   * @returns {Promise<{token: string, user: object}>}
   */
  async login(email, password, projectId = null) {
    try {
      // Récupérer l'utilisateur
      const { data: user, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !user) {
        throw new Error('Invalid credentials');
      }

      // Vérifier le mot de passe
      const isValid = await bcrypt.compare(password, user.password_hash);
      if (!isValid) {
        throw new Error('Invalid credentials');
      }

      // Vérifier l'accès au projet si spécifié
      let projectAccess = [];
      if (projectId) {
        const { data: access } = await this.supabase
          .from('user_project_access')
          .select('*')
          .eq('user_id', user.id)
          .eq('project_id', projectId);
        
        if (!access || access.length === 0) {
          throw new Error('No access to this project');
        }
        projectAccess = access;
      } else {
        // Récupérer tous les accès projets
        const { data: access } = await this.supabase
          .from('user_project_access')
          .select('*')
          .eq('user_id', user.id);
        
        projectAccess = access || [];
      }

      // Générer le token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          projects: projectAccess.map(p => ({
            id: p.project_id,
            role: p.role
          }))
        },
        this.jwtSecret,
        { expiresIn: '24h' }
      );

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          projects: projectAccess
        }
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Vérifie un token JWT
   * @param {string} token 
   * @returns {object} Decoded token
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  /**
   * Vérifie si l'utilisateur a accès à un projet
   * @param {string} userId 
   * @param {string} projectId 
   * @returns {Promise<boolean>}
   */
  async hasProjectAccess(userId, projectId) {
    const { data, error } = await this.supabase
      .from('user_project_access')
      .select('*')
      .eq('user_id', userId)
      .eq('project_id', projectId);

    return !error && data && data.length > 0;
  }

  /**
   * Récupère les projets accessibles par l'utilisateur
   * @param {string} userId 
   * @returns {Promise<Array>}
   */
  async getUserProjects(userId) {
    const { data, error } = await this.supabase
      .from('user_project_access')
      .select('*, projects(*)')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  }

  /**
   * Hash un mot de passe
   * @param {string} password 
   * @returns {Promise<string>}
   */
  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  /**
   * Compare un mot de passe avec son hash
   * @param {string} password 
   * @param {string} hash 
   * @returns {Promise<boolean>}
   */
  async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}

module.exports = AuthService;

