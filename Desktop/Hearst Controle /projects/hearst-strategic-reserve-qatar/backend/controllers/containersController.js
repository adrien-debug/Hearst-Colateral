const supabase = require('../utils/supabase');

// Get all containers
exports.getAllContainers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('containers')
      .select('*')
      .order('name');

    if (error) throw error;

    res.json({ containers: data, total: data.length });
  } catch (error) {
    console.error('Error fetching containers:', error);
    res.status(500).json({ error: 'Failed to fetch containers' });
  }
};

// Get container by ID
exports.getContainerById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('containers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Container not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching container:', error);
    res.status(500).json({ error: 'Failed to fetch container' });
  }
};

// Get container stats
exports.getContainerStats = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('containers')
      .select('status');

    if (error) throw error;

    const stats = {
      total: data.length,
      operational: data.filter(c => c.status === 'operational').length,
      maintenance: data.filter(c => c.status === 'maintenance').length,
      offline: data.filter(c => c.status === 'offline').length
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

// Create container
exports.createContainer = async (req, res) => {
  try {
    const { name, location, model, capacity } = req.body;

    const { data, error } = await supabase
      .from('containers')
      .insert([{ name, location, model, capacity, status: 'operational' }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating container:', error);
    res.status(500).json({ error: 'Failed to create container' });
  }
};

// Update container
exports.updateContainer = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('containers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error updating container:', error);
    res.status(500).json({ error: 'Failed to update container' });
  }
};

// Delete container
exports.deleteContainer = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('containers')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Container deleted successfully' });
  } catch (error) {
    console.error('Error deleting container:', error);
    res.status(500).json({ error: 'Failed to delete container' });
  }
};

