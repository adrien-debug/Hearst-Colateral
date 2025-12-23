/**
 * HEARST CONTROL - Projects Controller
 * Gestion des projets miniers
 */

const { createSupabaseClientFromEnv } = require('../../core/database/supabaseClient');
const { logger } = require('../../core/shared-utils/logger');

const supabase = createSupabaseClientFromEnv();

exports.getAll = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Filtrer selon les accès de l'utilisateur si non super_admin
    let projects = data;
    if (req.user.role !== 'super_admin') {
      const userProjectIds = req.user.projects.map(p => p.id);
      projects = data.filter(p => userProjectIds.includes(p.id));
    }

    res.json({ projects });
  } catch (error) {
    logger.error('Error fetching projects', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    // Vérifier l'accès
    if (req.user.role !== 'super_admin') {
      const hasAccess = req.user.projects.some(p => p.id === id);
      if (!hasAccess) {
        return res.status(403).json({ error: 'No access to this project' });
      }
    }

    res.json({ project: data });
  } catch (error) {
    logger.error(`Error fetching project ${req.params.id}`, error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const { id } = req.params;

    // Récupérer les métriques récentes du projet
    const { data, error } = await supabase
      .from('project_metrics')
      .select('*')
      .eq('project_id', id)
      .order('timestamp', { ascending: false })
      .limit(1);

    if (error) throw error;

    res.json({ stats: data[0] || null });
  } catch (error) {
    logger.error(`Error fetching project stats ${req.params.id}`, error);
    res.status(500).json({ error: 'Failed to fetch project stats' });
  }
};

exports.create = async (req, res) => {
  try {
    const projectData = req.body;

    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single();

    if (error) throw error;

    logger.success(`Project ${data.id} created successfully`);

    res.status(201).json({ project: data });
  } catch (error) {
    logger.error('Error creating project', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    logger.success(`Project ${id} updated successfully`);

    res.json({ project: data });
  } catch (error) {
    logger.error(`Error updating project ${req.params.id}`, error);
    res.status(500).json({ error: 'Failed to update project' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;

    logger.warning(`Project ${id} deleted`);

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting project ${req.params.id}`, error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

