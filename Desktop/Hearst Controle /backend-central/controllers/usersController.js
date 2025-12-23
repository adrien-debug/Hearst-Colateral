/**
 * HEARST CONTROL - Users Controller
 * Gestion des utilisateurs
 */

const { createSupabaseClientFromEnv } = require('../../core/database/supabaseClient');
const { logger } = require('../../core/shared-utils/logger');
const bcrypt = require('bcryptjs');

const supabase = createSupabaseClientFromEnv();

exports.getAll = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, name, role, is_active, last_login, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ users: data });
  } catch (error) {
    logger.error('Error fetching users', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier que l'utilisateur a le droit de voir ce profil
    if (req.user.id !== id && req.user.role !== 'admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { data, error } = await supabase
      .from('users')
      .select('id, email, name, role, phone, avatar_url, is_active, last_login, created_at')
      .eq('id', id)
      .single();

    if (error) throw error;

    // Récupérer les accès projets
    const { data: projects } = await supabase
      .from('user_project_access')
      .select('*, projects(*)')
      .eq('user_id', id);

    res.json({ user: { ...data, projects } });
  } catch (error) {
    logger.error(`Error fetching user ${req.params.id}`, error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

exports.create = async (req, res) => {
  try {
    const { email, password, name, role, phone } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password_hash, name, role, phone }])
      .select('id, email, name, role, created_at')
      .single();

    if (error) throw error;

    logger.success(`User ${email} created successfully`);

    res.status(201).json({ user: data });
  } catch (error) {
    logger.error('Error creating user', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // Vérifier que l'utilisateur peut modifier ce profil
    if (req.user.id !== id && req.user.role !== 'admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Ne pas permettre de modifier le mot de passe par cette route
    delete updates.password;
    delete updates.password_hash;

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select('id, email, name, role, phone, avatar_url, is_active')
      .single();

    if (error) throw error;

    logger.success(`User ${id} updated successfully`);

    res.json({ user: data });
  } catch (error) {
    logger.error(`Error updating user ${req.params.id}`, error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw error;

    logger.warning(`User ${id} deleted`);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting user ${req.params.id}`, error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

exports.grantProjectAccess = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectId, role } = req.body;

    if (!projectId || !role) {
      return res.status(400).json({ error: 'projectId and role are required' });
    }

    const { data, error } = await supabase
      .from('user_project_access')
      .insert([{
        user_id: id,
        project_id: projectId,
        role,
        granted_by: req.user.id
      }])
      .select()
      .single();

    if (error) throw error;

    logger.success(`User ${id} granted ${role} access to project ${projectId}`);

    res.json({ access: data });
  } catch (error) {
    logger.error('Error granting project access', error);
    res.status(500).json({ error: 'Failed to grant project access' });
  }
};

exports.revokeProjectAccess = async (req, res) => {
  try {
    const { id, projectId } = req.params;

    const { error } = await supabase
      .from('user_project_access')
      .delete()
      .eq('user_id', id)
      .eq('project_id', projectId);

    if (error) throw error;

    logger.warning(`User ${id} access to project ${projectId} revoked`);

    res.json({ message: 'Project access revoked successfully' });
  } catch (error) {
    logger.error('Error revoking project access', error);
    res.status(500).json({ error: 'Failed to revoke project access' });
  }
};

