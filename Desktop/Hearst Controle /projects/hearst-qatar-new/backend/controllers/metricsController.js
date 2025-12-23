const supabase = require('../utils/supabase');

// Get current metrics
exports.getCurrentMetrics = async (req, res) => {
  try {
    // Get latest metrics from last hour
    const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
    
    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .gte('timestamp', oneHourAgo)
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    res.json(data || {});
  } catch (error) {
    console.error('Error fetching current metrics:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
};

// Get metrics by period
exports.getMetricsByPeriod = async (req, res) => {
  try {
    const { period = '24h' } = req.query;
    
    let startTime;
    switch (period) {
      case '1h': startTime = new Date(Date.now() - 3600000); break;
      case '24h': startTime = new Date(Date.now() - 86400000); break;
      case '7d': startTime = new Date(Date.now() - 604800000); break;
      case '30d': startTime = new Date(Date.now() - 2592000000); break;
      default: startTime = new Date(Date.now() - 86400000);
    }

    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .gte('timestamp', startTime.toISOString())
      .order('timestamp');

    if (error) throw error;

    res.json({ metrics: data, period, total: data.length });
  } catch (error) {
    console.error('Error fetching metrics by period:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
};

// Get hashrate history
exports.getHashrateHistory = async (req, res) => {
  try {
    const { period = '24h' } = req.query;
    
    let startTime;
    switch (period) {
      case '1h': startTime = new Date(Date.now() - 3600000); break;
      case '24h': startTime = new Date(Date.now() - 86400000); break;
      case '7d': startTime = new Date(Date.now() - 604800000); break;
      default: startTime = new Date(Date.now() - 86400000);
    }

    const { data, error } = await supabase
      .from('metrics')
      .select('timestamp, total_hashrate')
      .gte('timestamp', startTime.toISOString())
      .order('timestamp');

    if (error) throw error;

    res.json({ data, period });
  } catch (error) {
    console.error('Error fetching hashrate history:', error);
    res.status(500).json({ error: 'Failed to fetch hashrate history' });
  }
};

// Get power consumption history
exports.getPowerHistory = async (req, res) => {
  try {
    const { period = '24h' } = req.query;
    
    let startTime;
    switch (period) {
      case '1h': startTime = new Date(Date.now() - 3600000); break;
      case '24h': startTime = new Date(Date.now() - 86400000); break;
      case '7d': startTime = new Date(Date.now() - 604800000); break;
      default: startTime = new Date(Date.now() - 86400000);
    }

    const { data, error } = await supabase
      .from('metrics')
      .select('timestamp, total_power_consumption')
      .gte('timestamp', startTime.toISOString())
      .order('timestamp');

    if (error) throw error;

    res.json({ data, period });
  } catch (error) {
    console.error('Error fetching power history:', error);
    res.status(500).json({ error: 'Failed to fetch power history' });
  }
};

// Get aggregated stats
exports.getAggregatedStats = async (req, res) => {
  try {
    // Get container stats
    const { data: containers } = await supabase.from('containers').select('status');
    
    // Get miner stats
    const { data: miners } = await supabase.from('miners').select('status, hashrate, power_consumption');
    
    // Get latest metrics
    const { data: latestMetric } = await supabase
      .from('metrics')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();

    const stats = {
      containers: {
        total: containers?.length || 0,
        operational: containers?.filter(c => c.status === 'operational').length || 0,
        maintenance: containers?.filter(c => c.status === 'maintenance').length || 0,
        offline: containers?.filter(c => c.status === 'offline').length || 0
      },
      miners: {
        total: miners?.length || 0,
        online: miners?.filter(m => m.status === 'online').length || 0,
        offline: miners?.filter(m => m.status === 'offline').length || 0,
        totalHashrate: miners?.reduce((sum, m) => sum + (m.hashrate || 0), 0) || 0,
        totalPower: miners?.reduce((sum, m) => sum + (m.power_consumption || 0), 0) || 0
      },
      latest: latestMetric || {}
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching aggregated stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

