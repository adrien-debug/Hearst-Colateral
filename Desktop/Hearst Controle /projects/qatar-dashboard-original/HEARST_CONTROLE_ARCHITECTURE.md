# 🏢 HEARST CONTROL - Architecture Multi-Projets

## 🎯 Vision

**Hearst Control** est une plateforme centralisée de monitoring et contrôle pour **TOUS les projets miniers Hearst** :

- ✅ **Projet Hearst Qatar** - 58 containers, 17,864 mineurs, 8.45 EH/s
- 🔜 **Projet Hearst Aquahash** - En planification
- 🚀 **Projets futurs** - Architecture évolutive

---

## 📐 Architecture Système

```
┌─────────────────────────────────────────────────────────────┐
│              HEARST CONTROL - PLATFORM                      │
│         Monitoring Centralisé Multi-Projets                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
         ┌─────────────┴─────────────┐
         │                           │
    ┌────▼─────┐              ┌─────▼────┐
    │ QATAR-001│              │ AQUA-001 │
    │ (Active) │              │(Planned) │
    └────┬─────┘              └──────────┘
         │
    ┌────┴────┐
    │         │
┌───▼──┐  ┌──▼───┐
│C01-58│  │17,864│
│Conta │  │Miners│
└──────┘  └──────┘
```

---

## 🗄️ Architecture Base de Données

### Structure Hiérarchique

```sql
projects (Table Principale)
   ↓
   ├─→ containers (Par projet)
   │      ↓
   │      └─→ miners (Par container et projet)
   │
   ├─→ metrics (Historique par projet)
   ├─→ alerts (Alertes par projet)
   └─→ activity_logs (Logs par projet)
```

### Table `projects` ⭐ NOUVEAU

Gère tous les projets Hearst dans une seule base :

```sql
CREATE TABLE projects (
  project_id VARCHAR(20) PRIMARY KEY,  -- 'QATAR-001', 'AQUA-001'
  name VARCHAR(100),                    -- 'Hearst Qatar Mining'
  type VARCHAR(50),                     -- 'mining', 'hosting'
  status VARCHAR(20),                   -- 'active', 'planned', 'maintenance'
  location VARCHAR(100),                -- 'Qatar', 'USA', etc.
  
  -- Capacité
  total_containers INTEGER,
  total_miners INTEGER,
  target_hashrate_eh DECIMAL(10,2),
  target_power_mw DECIMAL(10,2),
  
  -- Financier
  capex_usd DECIMAL(15,2),
  opex_monthly_usd DECIMAL(12,2),
  
  -- Contacts
  project_manager VARCHAR(100),
  contact_email VARCHAR(255),
  
  metadata JSONB
);
```

### Table `containers` (Modifiée)

Chaque container est lié à un projet :

```sql
CREATE TABLE containers (
  container_id VARCHAR(20) PRIMARY KEY,  -- 'QATAR-C01', 'AQUA-C01'
  project_id VARCHAR(20) REFERENCES projects(project_id),
  
  status VARCHAR(20),
  hashrate_th DECIMAL(10,2),
  power_consumption_kw DECIMAL(10,2),
  miners_active INTEGER,
  ...
);
```

### Table `miners` (Modifiée)

Chaque mineur est lié à un container ET un projet :

```sql
CREATE TABLE miners (
  miner_id VARCHAR(30) PRIMARY KEY,      -- 'QATAR-C01-M001'
  container_id VARCHAR(20) REFERENCES containers(container_id),
  project_id VARCHAR(20) REFERENCES projects(project_id),
  
  status VARCHAR(20),
  hashrate_th DECIMAL(10,2),
  power_w DECIMAL(10,2),
  ...
);
```

### Table `metrics` (Améliorée)

Métriques avec 3 niveaux de granularité :

```sql
CREATE TABLE metrics (
  timestamp TIMESTAMP,
  project_id VARCHAR(20) REFERENCES projects(project_id),
  
  scope VARCHAR(20),  -- 'global', 'project', 'container'
  scope_id VARCHAR(20),
  
  hashrate_eh DECIMAL(10,2),
  power_mw DECIMAL(10,2),
  active_containers INTEGER,
  ...
);
```

**Exemples** :
- **Global** : Toutes les installations Hearst combinées
- **Projet** : Métriques du projet Qatar uniquement
- **Container** : Métriques d'un container spécifique

### Table `alerts` ⭐ NOUVEAU

Système d'alertes multi-projets :

```sql
CREATE TABLE alerts (
  timestamp TIMESTAMP,
  project_id VARCHAR(20) REFERENCES projects(project_id),
  
  alert_type VARCHAR(50),  -- 'high_temperature', 'miner_offline'
  severity VARCHAR(20),     -- 'info', 'warning', 'critical'
  target_type VARCHAR(50),  -- 'container', 'miner'
  target_id VARCHAR(50),
  
  message TEXT,
  status VARCHAR(20),       -- 'active', 'acknowledged', 'resolved'
  ...
);
```

---

## 🎨 Frontend - Interface Utilisateur

### Page d'Accueil - Vue Globale

```
┌────────────────────────────────────────────────────┐
│ 🏢 HEARST CONTROL - Multi-Projects Dashboard     │
├────────────────────────────────────────────────────┤
│                                                    │
│  📊 GLOBAL OVERVIEW                                │
│  ┌─────────────┬─────────────┬─────────────┐      │
│  │ 2 Projects  │ 8.45 EH/s   │ 102.37 MW   │      │
│  │ Active: 1   │ Hashrate    │ Power       │      │
│  └─────────────┴─────────────┴─────────────┘      │
│                                                    │
│  🎯 PROJECTS                                       │
│  ┌──────────────────────────────────────────┐     │
│  │ ✅ Qatar (QATAR-001)                     │     │
│  │    58 containers  │  17,864 miners       │     │
│  │    8.45 EH/s      │  102.37 MW           │     │
│  │    [View Details →]                      │     │
│  └──────────────────────────────────────────┘     │
│  ┌──────────────────────────────────────────┐     │
│  │ 🔜 Aquahash (AQUA-001)                   │     │
│  │    Planned - Q2 2025                     │     │
│  │    [Configure →]                         │     │
│  └──────────────────────────────────────────┘     │
│                                                    │
│  🚨 ACTIVE ALERTS (3)                             │
│  ⚠️  Qatar-C12: High temperature (78°C)           │
│  ℹ️  Qatar-C45-M203: Maintenance due              │
│  ℹ️  Global: Bitcoin price alert ($95k)           │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Page Projet - Vue Détaillée

```
┌────────────────────────────────────────────────────┐
│ 🏢 HEARST CONTROL > Qatar (QATAR-001)            │
├────────────────────────────────────────────────────┤
│                                                    │
│  📊 PROJECT METRICS                                │
│  ┌─────────────┬─────────────┬─────────────┐      │
│  │ 58/58       │ 8.42 EH/s   │ 101.5 MW    │      │
│  │ Containers  │ Hashrate    │ Power       │      │
│  └─────────────┴─────────────┴─────────────┘      │
│                                                    │
│  🏭 CONTAINERS STATUS                             │
│  [Grid de 58 containers C01-C58]                  │
│  ✅ Active: 56  ⚠️  Warning: 2  ❌ Offline: 0     │
│                                                    │
│  📈 PERFORMANCE CHART (24H)                        │
│  [Graphique hashrate + température]               │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## 🔄 Flux de Données

### 1. Ajout d'un Nouveau Projet

```sql
-- 1. Créer le projet
INSERT INTO projects (project_id, name, location, ...)
VALUES ('AQUA-001', 'Hearst Aquahash', 'USA', ...);

-- 2. Ajouter les containers
INSERT INTO containers (container_id, project_id, ...)
VALUES ('AQUA-C01', 'AQUA-001', ...);

-- 3. Ajouter les mineurs
INSERT INTO miners (miner_id, container_id, project_id, ...)
VALUES ('AQUA-C01-M001', 'AQUA-C01', 'AQUA-001', ...);

-- 4. Démarrer le monitoring
-- Les métriques seront automatiquement collectées
```

### 2. Monitoring Multi-Niveau

```javascript
// Métriques globales (tous projets)
GET /api/metrics/global

// Métriques d'un projet
GET /api/metrics/project/QATAR-001

// Métriques d'un container
GET /api/metrics/container/QATAR-C01
```

### 3. Alertes Centralisées

```javascript
// Toutes les alertes actives
GET /api/alerts?status=active

// Alertes d'un projet
GET /api/alerts?project_id=QATAR-001

// Alertes critiques
GET /api/alerts?severity=critical
```

---

## 📊 Vues SQL Utiles

### Vue Globale

```sql
CREATE VIEW global_overview AS
SELECT 
  COUNT(DISTINCT p.id) as total_projects,
  COUNT(DISTINCT c.id) as total_containers,
  SUM(c.miners_active) as total_miners,
  SUM(c.hashrate_th) / 1000000 as total_hashrate_eh,
  SUM(c.power_consumption_kw) / 1000 as total_power_mw
FROM projects p
LEFT JOIN containers c ON p.project_id = c.project_id
WHERE p.status = 'active';
```

### Vue Par Projet

```sql
CREATE VIEW project_overview AS
SELECT 
  p.project_id,
  p.name,
  COUNT(c.id) as containers_count,
  SUM(c.miners_active) as miners_active,
  SUM(c.hashrate_th) / 1000000 as hashrate_eh,
  SUM(c.power_consumption_kw) / 1000 as power_mw
FROM projects p
LEFT JOIN containers c ON p.project_id = c.project_id
GROUP BY p.id, p.project_id, p.name;
```

### Alertes Actives

```sql
CREATE VIEW active_alerts AS
SELECT 
  a.id,
  p.name as project_name,
  a.alert_type,
  a.severity,
  a.message,
  EXTRACT(EPOCH FROM (NOW() - a.timestamp))/3600 as hours_since
FROM alerts a
LEFT JOIN projects p ON a.project_id = p.project_id
WHERE a.status = 'active'
ORDER BY a.severity DESC;
```

---

## 🚀 Évolutivité

### Ajouter un Nouveau Projet

1. **Base de données** : INSERT INTO projects
2. **Containers** : INSERT INTO containers avec project_id
3. **Mineurs** : INSERT INTO miners
4. **Frontend** : Aucune modification nécessaire (détection automatique)

### Scalabilité

- ✅ Supporte des centaines de projets
- ✅ Millions de mineurs possibles
- ✅ Métriques historiques illimitées
- ✅ Isolation complète par projet
- ✅ Performance optimisée (indexes)

---

## 🔐 Sécurité Multi-Tenant

### Row Level Security (RLS)

```sql
-- Les utilisateurs ne voient que leurs projets
CREATE POLICY "Users see only their projects"
ON projects
FOR SELECT
USING (
  project_id IN (
    SELECT project_id FROM user_project_access 
    WHERE user_id = auth.uid()
  )
);
```

### Rôles Utilisateurs

- **Super Admin** : Tous les projets
- **Project Manager** : Un projet spécifique
- **Operator** : Lecture seule
- **Viewer** : Dashboard uniquement

---

## 📚 API Endpoints

### Projets

```
GET    /api/projects              # Liste des projets
GET    /api/projects/:id          # Détails projet
POST   /api/projects              # Créer projet
PUT    /api/projects/:id          # Modifier projet
DELETE /api/projects/:id          # Supprimer projet
```

### Containers (par projet)

```
GET    /api/projects/:projectId/containers
GET    /api/containers/:containerId
PUT    /api/containers/:containerId
```

### Métriques

```
GET    /api/metrics/global                    # Vue globale
GET    /api/metrics/project/:projectId        # Par projet
GET    /api/metrics/container/:containerId    # Par container
```

### Alertes

```
GET    /api/alerts                            # Toutes
GET    /api/alerts?project_id=QATAR-001       # Par projet
POST   /api/alerts/:id/acknowledge            # Acquitter
POST   /api/alerts/:id/resolve                # Résoudre
```

---

## 🎯 Projets Actuels

### Projet 1 : Hearst Qatar (QATAR-001)

**Status** : ✅ Active  
**Location** : Qatar  
**Infrastructure** :
- 58 containers ANTSPACE HD5
- 17,864 mineurs S21XP Hydro (308/container)
- 8.45 EH/s hashrate total
- 102.37 MW puissance max
- 29 transformateurs 3750 kVA

**Électrique** :
- Grid : 132 kV
- Transformateurs : 2×100 MVA (N+1)
- Distribution : 33 kV ring

**Financier** :
- CAPEX : $143.8M

### Projet 2 : Hearst Aquahash (AQUA-001)

**Status** : 🔜 Planned  
**Location** : TBD  
**Type** : Mining avec refroidissement immersion  
**Timeline** : Q2 2025

---

## ✅ Avantages Architecture Multi-Projets

1. **Centralisé** : Un seul dashboard pour tous les projets
2. **Évolutif** : Ajouter des projets sans restructurer
3. **Comparaison** : Comparer les performances entre projets
4. **Consolidé** : Métriques globales Hearst
5. **Efficace** : Partage du code backend/frontend
6. **Sécurisé** : Isolation par projet (RLS)
7. **Flexible** : Chaque projet peut avoir des specs différentes

---

## 🔄 Migration

### De l'ancienne structure (Qatar seul) vers multi-projets :

```sql
-- 1. Créer la table projects
CREATE TABLE projects (...);

-- 2. Migrer les données existantes
INSERT INTO projects (project_id, name, ...)
VALUES ('QATAR-001', 'Hearst Qatar Mining', ...);

-- 3. Ajouter project_id aux tables existantes
ALTER TABLE containers ADD COLUMN project_id VARCHAR(20);
UPDATE containers SET project_id = 'QATAR-001';

ALTER TABLE miners ADD COLUMN project_id VARCHAR(20);
UPDATE miners SET project_id = 'QATAR-001';

-- 4. Ajouter les contraintes
ALTER TABLE containers 
ADD CONSTRAINT fk_project 
FOREIGN KEY (project_id) REFERENCES projects(project_id);
```

---

**Hearst Control** - Plateforme Centralisée de Monitoring  
**Version** : 2.0.0 - Multi-Projets  
**Date** : Décembre 2024

