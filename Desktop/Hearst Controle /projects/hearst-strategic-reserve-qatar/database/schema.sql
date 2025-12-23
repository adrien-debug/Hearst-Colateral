-- ============================================
-- HEARST STRATEGIC-RESERVE-QATAR PROJECT - DATABASE SCHEMA
-- 58 Containers | 17,864 Miners | 8.45 EH/s
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: users
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'viewer' CHECK (role IN ('admin', 'manager', 'operator', 'viewer')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index on email for fast lookups
CREATE INDEX idx_users_email ON users(email);

-- ============================================
-- TABLE: containers
-- ANTSPACE HD5 Containers
-- ============================================
CREATE TABLE IF NOT EXISTS containers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  model VARCHAR(100) DEFAULT 'ANTSPACE HD5',
  location VARCHAR(255),
  capacity INT DEFAULT 308, -- 308 mineurs par container
  max_power_kw DECIMAL(10, 2) DEFAULT 1765, -- 1765 kW max par container
  status VARCHAR(50) DEFAULT 'operational' CHECK (status IN ('operational', 'maintenance', 'offline')),
  temperature DECIMAL(5, 2), -- Température en Celsius
  humidity DECIMAL(5, 2), -- Humidité en %
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index on status for filtering
CREATE INDEX idx_containers_status ON containers(status);

-- ============================================
-- TABLE: miners
-- S21XP Hydro Miners (473 TH/s, 5676 W)
-- ============================================
CREATE TABLE IF NOT EXISTS miners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  container_id UUID REFERENCES containers(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  model VARCHAR(100) DEFAULT 'S21XP Hydro',
  serial_number VARCHAR(100) UNIQUE,
  hashrate DECIMAL(10, 2) DEFAULT 473, -- 473 TH/s
  power_consumption INT DEFAULT 5676, -- 5676 W
  temperature DECIMAL(5, 2),
  fan_speed INT, -- RPM
  status VARCHAR(50) DEFAULT 'online' CHECK (status IN ('online', 'offline', 'maintenance', 'restarting')),
  uptime BIGINT DEFAULT 0, -- en secondes
  last_seen TIMESTAMP DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_miners_container_id ON miners(container_id);
CREATE INDEX idx_miners_status ON miners(status);
CREATE INDEX idx_miners_last_seen ON miners(last_seen);

-- ============================================
-- TABLE: metrics
-- Global site metrics
-- ============================================
CREATE TABLE IF NOT EXISTS metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  timestamp TIMESTAMP DEFAULT NOW(),
  total_containers INT,
  operational_containers INT,
  total_miners INT,
  online_miners INT,
  total_hashrate DECIMAL(15, 2), -- Total EH/s
  total_power_consumption DECIMAL(15, 2), -- Total MW
  average_temperature DECIMAL(5, 2),
  efficiency DECIMAL(5, 2), -- W/TH
  uptime_percentage DECIMAL(5, 2),
  notes TEXT
);

-- Index on timestamp for time-series queries
CREATE INDEX idx_metrics_timestamp ON metrics(timestamp DESC);

-- ============================================
-- TABLE: alerts
-- System alerts and notifications
-- ============================================
CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(50) CHECK (type IN ('info', 'warning', 'error', 'critical')),
  source VARCHAR(100), -- container_id, miner_id, or 'system'
  message TEXT NOT NULL,
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMP,
  resolved_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for unresolved alerts
CREATE INDEX idx_alerts_unresolved ON alerts(resolved) WHERE resolved = FALSE;
CREATE INDEX idx_alerts_created_at ON alerts(created_at DESC);

-- ============================================
-- TABLE: maintenance_logs
-- Maintenance history
-- ============================================
CREATE TABLE IF NOT EXISTS maintenance_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  target_type VARCHAR(50) CHECK (target_type IN ('container', 'miner')),
  target_id UUID NOT NULL,
  performed_by UUID REFERENCES users(id),
  maintenance_type VARCHAR(100),
  description TEXT,
  duration_minutes INT,
  cost DECIMAL(10, 2),
  status VARCHAR(50) CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  scheduled_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_maintenance_target ON maintenance_logs(target_type, target_id);
CREATE INDEX idx_maintenance_status ON maintenance_logs(status);

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

CREATE TRIGGER update_containers_updated_at BEFORE UPDATE ON containers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_miners_updated_at BEFORE UPDATE ON miners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INITIAL DATA
-- Default admin user (password: Admin123!Hearst)
-- ============================================
INSERT INTO users (email, password_hash, name, role) VALUES
('admin@hearstmining.com', '$2a$10$rFKwEzYhQ6xqVz.iyKV8YOxfXRp.KNJKZy9QsT8H4ggO5YPQXvPea', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Sample containers (vous pouvez générer les 58)
INSERT INTO containers (name, model, location, capacity, max_power_kw, status) VALUES
('ANTSPACE-HD5-001', 'ANTSPACE HD5', 'Qatar Site A - Row 1', 308, 1765, 'operational'),
('ANTSPACE-HD5-002', 'ANTSPACE HD5', 'Qatar Site A - Row 1', 308, 1765, 'operational'),
('ANTSPACE-HD5-003', 'ANTSPACE HD5', 'Qatar Site A - Row 1', 308, 1765, 'operational'),
('ANTSPACE-HD5-004', 'ANTSPACE HD5', 'Qatar Site A - Row 2', 308, 1765, 'operational'),
('ANTSPACE-HD5-005', 'ANTSPACE HD5', 'Qatar Site A - Row 2', 308, 1765, 'operational')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- VIEWS
-- ============================================

-- View: Container summary with miner counts
CREATE OR REPLACE VIEW container_summary AS
SELECT 
    c.id,
    c.name,
    c.model,
    c.location,
    c.status,
    c.capacity,
    c.max_power_kw,
    COUNT(m.id) as miner_count,
    COUNT(m.id) FILTER (WHERE m.status = 'online') as online_miners,
    SUM(m.hashrate) as total_hashrate,
    SUM(m.power_consumption) as total_power_consumption,
    c.temperature,
    c.created_at,
    c.updated_at
FROM containers c
LEFT JOIN miners m ON m.container_id = c.id
GROUP BY c.id;

-- View: Site overview
CREATE OR REPLACE VIEW site_overview AS
SELECT 
    (SELECT COUNT(*) FROM containers) as total_containers,
    (SELECT COUNT(*) FROM containers WHERE status = 'operational') as operational_containers,
    (SELECT COUNT(*) FROM miners) as total_miners,
    (SELECT COUNT(*) FROM miners WHERE status = 'online') as online_miners,
    (SELECT SUM(hashrate) FROM miners WHERE status = 'online') as total_hashrate_ths,
    (SELECT SUM(power_consumption) FROM miners WHERE status = 'online') as total_power_w,
    (SELECT AVG(temperature) FROM miners WHERE status = 'online') as avg_temperature,
    (SELECT COUNT(*) FROM alerts WHERE resolved = FALSE) as active_alerts;

-- ============================================
-- COMMENTS
-- ============================================
COMMENT ON TABLE containers IS 'ANTSPACE HD5 containers - 58 total, 308 miners each';
COMMENT ON TABLE miners IS 'S21XP Hydro miners - 17,864 total, 473 TH/s each, 5676 W';
COMMENT ON TABLE metrics IS 'Global site metrics - time series data';
COMMENT ON COLUMN containers.max_power_kw IS 'Maximum power per container: 1765 kW (cooling included)';
COMMENT ON COLUMN miners.hashrate IS 'Hashrate in TH/s (terahash per second)';
COMMENT ON COLUMN miners.power_consumption IS 'Power consumption in Watts';

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '✅ Qatar Project Database Schema Created Successfully!';
    RAISE NOTICE '📦 58 ANTSPACE HD5 Containers';
    RAISE NOTICE '⚡ 17,864 S21XP Hydro Miners (473 TH/s each)';
    RAISE NOTICE '🔋 8.45 EH/s Total Hashrate';
    RAISE NOTICE '💡 102.37 MW Maximum Power';
    RAISE NOTICE '';
    RAISE NOTICE '🔑 Default Admin Login:';
    RAISE NOTICE '   Email: admin@hearstmining.com';
    RAISE NOTICE '   Password: Admin123!Hearst';
END $$;

