/**
 * HEARST CONTROL - Core Supabase Client
 * Client Supabase réutilisable pour tous les projets
 */

const { createClient } = require('@supabase/supabase-js');

/**
 * Crée un client Supabase
 * @param {string} supabaseUrl 
 * @param {string} supabaseKey 
 * @returns {object} Supabase client
 */
const createSupabaseClient = (supabaseUrl, supabaseKey) => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Key are required');
  }

  return createClient(supabaseUrl, supabaseKey);
};

/**
 * Crée un client Supabase depuis les variables d'environnement
 * @returns {object} Supabase client
 */
const createSupabaseClientFromEnv = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in environment variables');
    console.error('   Required: SUPABASE_URL and SUPABASE_SERVICE_KEY');
    throw new Error('Supabase credentials missing');
  }

  console.log('✅ Supabase client created successfully');
  return createClient(supabaseUrl, supabaseKey);
};

/**
 * Teste la connexion Supabase
 * @param {object} supabase - Supabase client
 * @returns {Promise<boolean>}
 */
const testSupabaseConnection = async (supabase) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (error) throw error;
    
    console.log('✅ Supabase connection test successful');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection test failed:', error.message);
    return false;
  }
};

module.exports = {
  createSupabaseClient,
  createSupabaseClientFromEnv,
  testSupabaseConnection
};

