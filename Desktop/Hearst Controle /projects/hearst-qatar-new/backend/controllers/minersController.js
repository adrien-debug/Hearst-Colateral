const supabase = require('../utils/supabase');

// Get all miners
exports.getAllMiners = async (req, res) => {
  try {
    const { container_id, status } = req.query;
    
    let query = supabase.from('miners').select('*');
    
    if (container_id) query = query.eq('container_id', container_id);
    if (status) query = query.eq('status', status);
    
    const { data, error} = await query.order('name');

    if (error) throw error;

    res.json({ miners: data, total: data.length });
  } catch (error) {
    console.error('Error fetching miners:', error);
    res.status(500).json({ error: 'Failed to fetch miners' });
  }
};

// Get miners by container
exports.getMinersByContainer = async (req, res) => {
  try {
    const { containerId } = req.params;

    const { data, error } = await supabase
      .from('miners')
      .select('*')
      .eq('container_id', containerId)
      .order('name');

    if (error) throw error;

    res.json({ miners: data, total: data.length });
  } catch (error) {
    console.error('Error fetching miners:', error);
    res.status(500).json({ error: 'Failed to fetch miners' });
  }
};

// Get miner stats
exports.getMinerStats = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('miners')
      .select('status, hashrate, power_consumption');

    if (error) throw error;

    const stats = {
      total: data.length,
      online: data.filter(m => m.status === 'online').length,
      offline: data.filter(m => m.status === 'offline').length,
      maintenance: data.filter(m => m.status === 'maintenance').length,
      totalHashrate: data.reduce((sum, m) => sum + (m.hashrate || 0), 0),
      totalPower: data.reduce((sum, m) => sum + (m.power_consumption || 0), 0)
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching miner stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

// Update miner
exports.updateMiner = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('miners')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error updating miner:', error);
    res.status(500).json({ error: 'Failed to update miner' });
  }
};

// Restart miner
exports.restartMiner = async (req, res) => {
  try {
    const { id } = req.params;

    // In real app, this would trigger hardware restart
    const { data, error } = await supabase
      .from('miners')
      .update({ status: 'restarting', updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({ message: 'Miner restart initiated', miner: data });
  } catch (error) {
    console.error('Error restarting miner:', error);
    res.status(500).json({ error: 'Failed to restart miner' });
  }
};

