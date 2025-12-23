-- ============================================
-- ADD STRATEGIC RESERVE QATAR PROJECT
-- À exécuter dans Supabase après central-schema.sql
-- ============================================

-- Ajouter le projet Strategic Reserve Qatar
INSERT INTO projects (
  id, 
  name, 
  description, 
  location, 
  status,
  total_containers,
  total_miners,
  total_hashrate_ths,
  total_power_mw,
  container_model,
  miners_per_container,
  miner_model,
  miner_hashrate,
  miner_power_w,
  api_endpoint,
  frontend_url,
  start_date,
  notes
) VALUES (
  'SRQ-001',
  'Strategic Reserve Qatar',
  'Bitcoin mining infrastructure for Qatar national strategic Bitcoin reserve initiative',
  'Qatar',
  'planned',
  30,                    -- 30 containers prévus
  9240,                  -- 30 × 308 = 9,240 miners
  4369920,               -- 9,240 × 473 TH/s = 4,369,920 TH/s
  52.95,                 -- 30 × 1765 kW = 52.95 MW
  'ANTSPACE HD5',
  308,
  'S21XP Hydro',
  473,
  5676,
  'http://localhost:3002',
  'http://localhost:3100',
  '2025-03-01',
  'Strategic project for Qatar national Bitcoin reserve. Focus on energy efficiency and sovereignty.'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  total_containers = EXCLUDED.total_containers,
  total_miners = EXCLUDED.total_miners,
  total_hashrate_ths = EXCLUDED.total_hashrate_ths,
  total_power_mw = EXCLUDED.total_power_mw,
  updated_at = NOW();

-- Donner accès au super admin
INSERT INTO user_project_access (user_id, project_id, role, granted_by)
SELECT 
  u.id,
  'SRQ-001',
  'admin',
  u.id
FROM users u
WHERE u.email = 'admin@hearstmining.com'
ON CONFLICT (user_id, project_id) DO NOTHING;

-- Message de confirmation
DO $$
BEGIN
    RAISE NOTICE '✅ Strategic Reserve Qatar Project Added!';
    RAISE NOTICE '';
    RAISE NOTICE '📊 Project Details:';
    RAISE NOTICE '   ID: SRQ-001';
    RAISE NOTICE '   Name: Strategic Reserve Qatar';
    RAISE NOTICE '   Containers: 30 × ANTSPACE HD5';
    RAISE NOTICE '   Miners: 9,240 × S21XP Hydro';
    RAISE NOTICE '   Hashrate: 4.37 EH/s (4,369,920 TH/s)';
    RAISE NOTICE '   Power: 52.95 MW';
    RAISE NOTICE '   Backend: http://localhost:3002';
    RAISE NOTICE '   Frontend: http://localhost:3100';
    RAISE NOTICE '';
    RAISE NOTICE '🎯 Purpose: National Bitcoin Strategic Reserve';
END $$;

