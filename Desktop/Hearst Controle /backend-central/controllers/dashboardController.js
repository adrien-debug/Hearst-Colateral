/**
 * HEARST CONTROL - Dashboard Controller
 * Vue d'ensemble globale de tous les projets
 */

const { createSupabaseClientFromEnv } = require('../../core/database/supabaseClient');
const { logger } = require('../../core/shared-utils/logger');

const supabase = createSupabaseClientFromEnv();

exports.getOverview = async (req, res) => {
  try {
    // Vue d'ensemble depuis la view SQL
    const { data, error } = await supabase
      .from('global_overview')
      .select('*')
      .single();

    if (error) throw error;

    res.json({ overview: data });
  } catch (error) {
    logger.error('Error fetching global overview', error);
    res.status(500).json({ error: 'Failed to fetch overview' });
  }
};

exports.getGlobalMetrics = async (req, res) => {
  try {
    const { period = '24h' } = req.query;

    // Calculer le timestamp de début selon la période
    let startDate = new Date();
    switch (period) {
      case '1h':
        startDate.setHours(startDate.getHours() - 1);
        break;
      case '24h':
        startDate.setHours(startDate.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      default:
        startDate.setHours(startDate.getHours() - 24);
    }

    const { data, error } = await supabase
      .from('global_metrics')
      .select('*')
      .gte('timestamp', startDate.toISOString())
      .order('timestamp', { ascending: false });

    if (error) throw error;

    res.json({ metrics: data });
  } catch (error) {
    logger.error('Error fetching global metrics', error);
    res.status(500).json({ error: 'Failed to fetch global metrics' });
  }
};

exports.getProjectsMetrics = async (req, res) => {
  try {
    // Récupérer les dernières métriques de chaque projet
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, name, status');

    if (projectsError) throw projectsError;

    // Récupérer les métriques les plus récentes pour chaque projet
    const metricsPromises = projects.map(async (project) => {
      const { data } = await supabase
        .from('project_metrics')
        .select('*')
        .eq('project_id', project.id)
        .order('timestamp', { ascending: false })
        .limit(1);

      return {
        project,
        metrics: data && data.length > 0 ? data[0] : null
      };
    });

    const projectsMetrics = await Promise.all(metricsPromises);

    res.json({ projectsMetrics });
  } catch (error) {
    logger.error('Error fetching projects metrics', error);
    res.status(500).json({ error: 'Failed to fetch projects metrics' });
  }
};

exports.getActiveAlerts = async (req, res) => {
  try {
    const { limit = 50 } = req.query;

    const { data, error } = await supabase
      .from('global_alerts')
      .select('*, projects(name)')
      .eq('resolved', false)
      .order('created_at', { ascending: false })
      .limit(parseInt(limit));

    if (error) throw error;

    res.json({ alerts: data });
  } catch (error) {
    logger.error('Error fetching active alerts', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};

exports.getRealtimeStats = async (req, res) => {
  try {
    // Agrégation des stats de tous les projets actifs
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'active');

    if (error) throw error;

    const stats = {
      totalProjects: projects.length,
      totalContainers: projects.reduce((sum, p) => sum + (p.total_containers || 0), 0),
      totalMiners: projects.reduce((sum, p) => sum + (p.total_miners || 0), 0),
      totalHashrateThs: projects.reduce((sum, p) => sum + (parseFloat(p.total_hashrate_ths) || 0), 0),
      totalPowerMw: projects.reduce((sum, p) => sum + (parseFloat(p.total_power_mw) || 0), 0),
      projects: projects.map(p => ({
        id: p.id,
        name: p.name,
        containers: p.total_containers,
        miners: p.total_miners,
        hashrate: p.total_hashrate_ths,
        power: p.total_power_mw,
        status: p.status
      }))
    };

    // Convertir hashrate en EH/s
    stats.totalHashrateEhs = (stats.totalHashrateThs / 1000000).toFixed(2);

    res.json({ stats });
  } catch (error) {
    logger.error('Error fetching realtime stats', error);
    res.status(500).json({ error: 'Failed to fetch realtime stats' });
  }
};

