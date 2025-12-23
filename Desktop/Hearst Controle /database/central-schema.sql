-- ============================================
-- HEARST CONTROL - CENTRAL DATABASE SCHEMA
-- Plateforme Multi-Projets Centralisée
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: users
-- Utilisateurs centraux (accès à tous les projets)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'viewer' CHECK (role IN ('super_admin', 'admin', 'manager', 'operator', 'viewer')),
  phone VARCHAR(50),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index on email for fast lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================
-- TABLE: projects
-- Liste des projets miniers gérés
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(20) PRIMARY KEY, -- "QATAR-001", "AQUA-001", "TEXAS-001"
  name VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'planned', 'maintenance', 'inactive')),
  
  -- Specs techniques
  total_containers INT DEFAULT 0,
  total_miners INT DEFAULT 0,
  total_hashrate_ths DECIMAL(15, 2) DEFAULT 0, -- Total hashrate en TH/s
  total_power_mw DECIMAL(10, 3) DEFAULT 0, -- Total puissance en MW
  
  -- Container specs
  container_model VARCHAR(100), -- "ANTSPACE HD5"
  miners_per_container INT,
  
  -- Miner specs
  miner_model VARCHAR(100), -- "S21XP Hydro"
  miner_hashrate DECIMAL(10, 2), -- 473 TH/s
  miner_power_w INT, -- 5676 W
  
  -- Dates
  start_date DATE,
  end_date DATE,
  
  -- Config
  api_endpoint VARCHAR(255), -- URL du backend projet
  frontend_url VARCHAR(255), -- URL du frontend projet
  
  -- Métadonnées
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_projects_status ON projects(status);

-- ============================================
-- TABLE: user_project_access
-- Droits d'accès des utilisateurs aux projets
-- ============================================
CREATE TABLE IF NOT EXISTS user_project_access (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id VARCHAR(20) REFERENCES projects(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'viewer' CHECK (role IN ('admin', 'manager', 'operator', 'viewer')),
  granted_at TIMESTAMP DEFAULT NOW(),
  granted_by UUID REFERENCES users(id),
  expires_at TIMESTAMP,
  
  UNIQUE(user_id, project_id)
);

CREATE INDEX idx_user_project_access_user ON user_project_access(user_id);
CREATE INDEX idx_user_project_access_project ON user_project_access(project_id);

-- ============================================
-- TABLE: global_metrics
-- Métriques globales de tous les projets
-- ============================================
CREATE TABLE IF NOT EXISTS global_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  timestamp TIMESTAMP DEFAULT NOW(),
  
  -- Métriques agrégées
  total_projects INT,
  active_projects INT,
  total_containers INT,
  operational_containers INT,
  total_miners INT,
  online_miners INT,
  
  -- Performance
  total_hashrate_ths DECIMAL(15, 2), -- Total tous projets en TH/s
  total_hashrate_ehs DECIMAL(10, 3), -- Total tous projets en EH/s
  total_power_mw DECIMAL(10, 3), -- Total puissance en MW
  average_efficiency DECIMAL(5, 2), -- W/TH moyen
  
  -- Température moyenne globale
  average_temperature DECIMAL(5, 2),
  
  -- Disponibilité
  uptime_percentage DECIMAL(5, 2),
  
  notes TEXT
);

CREATE INDEX idx_global_metrics_timestamp ON global_metrics(timestamp DESC);

-- ============================================
-- TABLE: project_metrics
-- Métriques par projet (snapshot périodique)
-- ============================================
CREATE TABLE IF NOT EXISTS project_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id VARCHAR(20) REFERENCES projects(id) ON DELETE CASCADE,
  timestamp TIMESTAMP DEFAULT NOW(),
  
  -- Conteneurs
  total_containers INT,
  operational_containers INT,
  
  -- Mineurs
  total_miners INT,
  online_miners INT,
  offline_miners INT,
  
  -- Performance
  total_hashrate_ths DECIMAL(15, 2),
  total_hashrate_ehs DECIMAL(10, 3),
  total_power_kw DECIMAL(10, 2),
  total_power_mw DECIMAL(10, 3),
  average_temperature DECIMAL(5, 2),
  efficiency DECIMAL(5, 2), -- W/TH
  
  -- Disponibilité
  uptime_percentage DECIMAL(5, 2),
  
  notes TEXT
);

CREATE INDEX idx_project_metrics_project ON project_metrics(project_id);
CREATE INDEX idx_project_metrics_timestamp ON project_metrics(timestamp DESC);

-- ============================================
-- TABLE: global_alerts
-- Alertes centralisées de tous les projets
-- ============================================
CREATE TABLE IF NOT EXISTS global_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id VARCHAR(20) REFERENCES projects(id) ON DELETE CASCADE,
  type VARCHAR(50) CHECK (type IN ('info', 'warning', 'error', 'critical')),
  category VARCHAR(100), -- 'temperature', 'power', 'hashrate', 'connectivity', etc.
  source VARCHAR(100), -- container_id, miner_id, or 'system'
  message TEXT NOT NULL,
  details JSONB,
  
  -- Résolution
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMP,
  resolved_by UUID REFERENCES users(id),
  resolution_notes TEXT,
  
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_global_alerts_project ON global_alerts(project_id);
CREATE INDEX idx_global_alerts_unresolved ON global_alerts(resolved) WHERE resolved = FALSE;
CREATE INDEX idx_global_alerts_type ON global_alerts(type);
CREATE INDEX idx_global_alerts_created_at ON global_alerts(created_at DESC);

-- ============================================
-- TABLE: audit_log
-- Journal d'audit centralisé
-- ============================================
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  project_id VARCHAR(20) REFERENCES projects(id),
  action VARCHAR(100) NOT NULL, -- 'login', 'create', 'update', 'delete', etc.
  resource_type VARCHAR(100), -- 'container', 'miner', 'user', etc.
  resource_id VARCHAR(255),
  details JSONB,
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_log_user ON audit_log(user_id);
CREATE INDEX idx_audit_log_project ON audit_log(project_id);
CREATE INDEX idx_audit_log_action ON audit_log(action);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at DESC);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INITIAL DATA
-- ============================================

-- Super Admin (password: Admin123!Hearst)
INSERT INTO users (email, password_hash, name, role) VALUES
('admin@hearstmining.com', '$2a$10$rFKwEzYhQ6xqVz.iyKV8YOxfXRp.KNJKZy9QsT8H4ggO5YPQXvPea', 'Super Admin', 'super_admin')
ON CONFLICT (email) DO NOTHING;

-- Projets
INSERT INTO projects (id, name, description, location, status, 
  total_containers, total_miners, total_hashrate_ths, total_power_mw,
  container_model, miners_per_container,
  miner_model, miner_hashrate, miner_power_w,
  api_endpoint, frontend_url, start_date) VALUES

-- Projet Qatar (ACTIF)
('QATAR-001', 
 'Hearst Qatar Mining', 
 '58 containers ANTSPACE HD5 avec 17,864 mineurs S21XP Hydro', 
 'Qatar', 
 'active',
 58, 17864, 8445400, 102.37,
 'ANTSPACE HD5', 308,
 'S21XP Hydro', 473, 5676,
 'http://localhost:3001', 'http://localhost:3000', '2025-01-01'),

-- Projet Aquahash (PLANIFIÉ)
('AQUA-001', 
 'Hearst Aquahash', 
 '15 containers avec 4,620 mineurs', 
 'TBD', 
 'planned',
 15, 4620, 2185260, 26.37,
 'ANTSPACE HD5', 308,
 'S21XP Hydro', 473, 5676,
 'http://localhost:3002', 'http://localhost:3100', '2025-06-01'),

-- Projet Texas (FUTUR)
('TEXAS-001', 
 'Hearst Texas', 
 'Projet futur au Texas', 
 'Texas, USA', 
 'planned',
 0, 0, 0, 0,
 NULL, NULL,
 NULL, NULL, NULL,
 NULL, NULL, NULL)

ON CONFLICT (id) DO NOTHING;

-- Accès utilisateur admin à tous les projets
INSERT INTO user_project_access (user_id, project_id, role, granted_by)
SELECT 
  u.id,
  p.id,
  'admin',
  u.id
FROM users u
CROSS JOIN projects p
WHERE u.email = 'admin@hearstmining.com'
ON CONFLICT (user_id, project_id) DO NOTHING;

-- ============================================
-- VIEWS
-- ============================================

-- Vue: Résumé des projets avec métriques
CREATE OR REPLACE VIEW projects_summary AS
SELECT 
    p.*,
    COUNT(DISTINCT upa.user_id) as user_count,
    (SELECT COUNT(*) FROM global_alerts WHERE project_id = p.id AND resolved = FALSE) as active_alerts_count
FROM projects p
LEFT JOIN user_project_access upa ON upa.project_id = p.id
GROUP BY p.id;

-- Vue: Vue d'ensemble globale
CREATE OR REPLACE VIEW global_overview AS
SELECT 
    (SELECT COUNT(*) FROM projects) as total_projects,
    (SELECT COUNT(*) FROM projects WHERE status = 'active') as active_projects,
    (SELECT SUM(total_containers) FROM projects WHERE status = 'active') as total_containers,
    (SELECT SUM(total_miners) FROM projects WHERE status = 'active') as total_miners,
    (SELECT SUM(total_hashrate_ths) FROM projects WHERE status = 'active') as total_hashrate_ths,
    (SELECT SUM(total_hashrate_ths) / 1000000.0 FROM projects WHERE status = 'active') as total_hashrate_ehs,
    (SELECT SUM(total_power_mw) FROM projects WHERE status = 'active') as total_power_mw,
    (SELECT COUNT(*) FROM global_alerts WHERE resolved = FALSE) as active_alerts,
    (SELECT COUNT(*) FROM users WHERE is_active = TRUE) as active_users;

-- ============================================
-- COMMENTS
-- ============================================
COMMENT ON TABLE projects IS 'Liste des projets miniers gérés par Hearst Control';
COMMENT ON TABLE user_project_access IS 'Droits d''accès des utilisateurs aux projets';
COMMENT ON TABLE global_metrics IS 'Métriques agrégées de tous les projets';
COMMENT ON TABLE project_metrics IS 'Métriques historiques par projet';
COMMENT ON TABLE global_alerts IS 'Alertes centralisées de tous les projets';

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '✅ Hearst Control Central Database Created Successfully!';
    RAISE NOTICE '';
    RAISE NOTICE '🏢 HEARST CONTROL - Multi-Projects Platform';
    RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    RAISE NOTICE '📊 Projects Configured:';
    RAISE NOTICE '   • QATAR-001: 58 containers, 17,864 miners, 8.45 EH/s';
    RAISE NOTICE '   • AQUA-001:  15 containers, 4,620 miners, 2.18 EH/s (planned)';
    RAISE NOTICE '   • TEXAS-001: Future project';
    RAISE NOTICE '';
    RAISE NOTICE '🔑 Super Admin Login:';
    RAISE NOTICE '   Email: admin@hearstmining.com';
    RAISE NOTICE '   Password: Admin123!Hearst';
    RAISE NOTICE '';
    RAISE NOTICE '🎯 Total Capacity (Active):';
    RAISE NOTICE '   • 58 containers';
    RAISE NOTICE '   • 17,864 miners';
    RAISE NOTICE '   • 8.45 EH/s';
    RAISE NOTICE '   • 102.37 MW';
END $$;

