# 🚀 HEARST CONTROL - Installation Multi-Projets

## 🎯 Ce que Vous Installez

**HEARST CONTROL** - Plateforme centralisée de monitoring pour **TOUS** les projets miniers Hearst :

- ✅ **Hearst Qatar Project** (QATAR-001) - 58 containers, 17,864 mineurs
- 🔜 **Hearst Aquahash** (AQUA-001) - En planification
- 🚀 **Projets futurs** - Ajoutez-les facilement

**Une seule installation. Tous les projets. Un seul dashboard.**

---

## ⚡ Installation Rapide (10 minutes)

### Étape 1 : Créer les Tables Supabase ⭐

#### 1.1 Ouvrir le SQL Editor

👉 **https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/sql**

#### 1.2 Exécuter le Script Multi-Projets

- Ouvrir le fichier **`supabase-init-multi-projects.sql`**
- Sélectionner TOUT (Cmd+A / Ctrl+A)
- Copier (Cmd+C / Ctrl+C)
- Coller dans le SQL Editor
- Cliquer sur **RUN** ▶️

#### 1.3 Vérifier

Vous devriez voir :

```
projects     | 2   (Qatar Project + Aquahash)
containers   | 58  (Qatar Project uniquement)
miners       | 0   (à peupler)
metrics      | 48  (24h × 2 scopes)
alerts       | 0
```

#### 1.4 Désactiver RLS (Développement)

Copier-coller et exécuter :

```sql
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE containers DISABLE ROW LEVEL SECURITY;
ALTER TABLE miners DISABLE ROW LEVEL SECURITY;
ALTER TABLE metrics DISABLE ROW LEVEL SECURITY;
ALTER TABLE alerts DISABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE auth_logs DISABLE ROW LEVEL SECURITY;
```

---

### Étape 2 : Configurer les Variables d'Environnement

Les fichiers `.env` sont déjà créés avec vos credentials :

✅ `backend/.env` - Backend configuré  
✅ `frontend/.env.local` - Frontend configuré

---

### Étape 3 : Tester la Connexion

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst\ Control\ /Qatar Project-Dashboard
node test-supabase-connection.js
```

**Résultat attendu :**

```
✅ CONNEXION SUPABASE RÉUSSIE !
📊 Containers: 58 / 58 attendus
🎉 Base de données correctement initialisée !
```

---

### Étape 4 : Lancer la Plateforme

#### Terminal 1 : Backend

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst\ Control\ /Qatar Project-Dashboard/backend
npm install
npm start
```

**Attendez de voir :**

```
🚀 Serveur démarré sur le port 3001
✅ Connexion Supabase : OK
```

#### Terminal 2 : Frontend

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst\ Control\ /Qatar Project-Dashboard/frontend
npm install
npm run dev
```

**Puis ouvrir :**

👉 **http://localhost:3000**

---

## 🎨 Interface Utilisateur

### Vue d'Accueil - Dashboard Global

```
┌────────────────────────────────────────────────────┐
│ 🏢 HEARST CONTROL                                 │
│ Multi-Projects Monitoring Platform                 │
├────────────────────────────────────────────────────┤
│                                                    │
│ 📊 GLOBAL OVERVIEW                                 │
│ ┌──────────────┬──────────────┬──────────────┐    │
│ │ 2 Projects   │ 8.45 EH/s    │ 102.37 MW    │    │
│ │ 1 Active     │ Total Hash   │ Total Power  │    │
│ └──────────────┴──────────────┴──────────────┘    │
│                                                    │
│ 🎯 PROJETS                                         │
│                                                    │
│ ┌─────────────────────────────────────────────┐   │
│ │ ✅ Hearst Qatar Project (QATAR-001)                 │   │
│ │    📍 Qatar Project                                 │   │
│ │    58 containers │ 17,864 miners           │   │
│ │    8.45 EH/s     │ 102.37 MW               │   │
│ │    Status: Active                           │   │
│ │    [View Dashboard →]                       │   │
│ └─────────────────────────────────────────────┘   │
│                                                    │
│ ┌─────────────────────────────────────────────┐   │
│ │ 🔜 Hearst Aquahash (AQUA-001)               │   │
│ │    📍 TBD                                   │   │
│ │    Status: Planned (Q2 2025)                │   │
│ │    [Configure Project →]                    │   │
│ └─────────────────────────────────────────────┘   │
│                                                    │
│ 🚨 ALERTS (0 active)                              │
│ ✅ All systems operational                         │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Cliquer sur un Projet → Dashboard Détaillé

Voir les containers, mineurs, métriques temps réel du projet sélectionné.

---

## 📊 Données Initialisées

### Projet 1 : Hearst Qatar Project (QATAR-001)

- **Status** : ✅ Active
- **Location** : Qatar Project
- **Containers** : 58 (QATAR-C01 → QATAR-C58)
- **Mineurs** : 17,864 (308 par container)
- **Hashrate** : 8.45 EH/s
- **Power** : 102.37 MW
- **CAPEX** : $143.8M
- **Métriques** : 24h d'historique

### Projet 2 : Hearst Aquahash (AQUA-001)

- **Status** : 🔜 Planned
- **Location** : TBD
- **Timeline** : Q2 2025
- **Type** : Refroidissement immersion
- **Containers** : À définir

---

## ➕ Ajouter un Nouveau Projet

### Via SQL

```sql
INSERT INTO projects (
  project_id, 
  name, 
  type, 
  status, 
  location, 
  total_containers, 
  total_miners,
  target_hashrate_eh,
  target_power_mw
) VALUES (
  'USA-001',
  'Hearst USA Mining',
  'mining',
  'active',
  'Texas, USA',
  40,
  12320,
  5.83,
  70.00
);
```

### Puis Ajouter les Containers

```sql
INSERT INTO containers (container_id, project_id, container_type, status, hashrate_th, power_consumption_kw, miners_capacity, miners_active, location)
SELECT 
  'USA-C' || LPAD(generate_series::TEXT, 2, '0'),
  'USA-001',
  'ANTSPACE HD5',
  'active',
  308 * 473.0,
  1765,
  308,
  308,
  'Texas Facility'
FROM generate_series(1, 40);
```

### Le Frontend Détecte Automatiquement ✨

Pas de code à changer ! Le nouveau projet apparaît automatiquement dans le dashboard.

---

## 📈 Métriques Multi-Niveaux

### Global (Tous les Projets)

```javascript
GET /api/metrics/global
```

Retourne les métriques consolidées de TOUS les projets Hearst.

### Par Projet

```javascript
GET /api/metrics/project/QATAR-001
GET /api/metrics/project/AQUA-001
GET /api/metrics/project/USA-001
```

### Par Container

```javascript
GET /api/metrics/container/QATAR-C01
GET /api/metrics/container/USA-C15
```

---

## 🚨 Système d'Alertes

### Types d'Alertes Supportées

- **high_temperature** : Température excessive
- **low_hashrate** : Hashrate en baisse
- **miner_offline** : Mineur hors ligne
- **container_offline** : Container hors ligne
- **power_spike** : Consommation anormale
- **network_issue** : Problème réseau
- **maintenance_due** : Maintenance requise

### Sévérité

- **info** : Information
- **warning** : Avertissement
- **critical** : Critique
- **emergency** : Urgence

### Visualiser les Alertes

```sql
-- Toutes les alertes actives
SELECT * FROM active_alerts;

-- Alertes critiques d'un projet
SELECT * FROM alerts 
WHERE project_id = 'QATAR-001' 
  AND severity = 'critical' 
  AND status = 'active';
```

---

## 🔍 Vues SQL Utiles

### Vue Globale

```sql
SELECT * FROM global_overview;
```

Retourne :
- total_projects
- total_containers
- total_miners
- total_hashrate_eh
- total_power_mw
- avg_temperature_c
- avg_uptime_percent

### Vue Par Projet

```sql
SELECT * FROM project_overview;
```

Retourne une ligne par projet avec toutes ses métriques.

### Alertes Actives

```sql
SELECT * FROM active_alerts 
ORDER BY severity DESC, timestamp DESC;
```

---

## 🔧 API Endpoints

### Projets

```
GET    /api/projects                    # Liste tous les projets
GET    /api/projects/:projectId         # Détails d'un projet
GET    /api/projects/:projectId/stats   # Statistiques projet
POST   /api/projects                    # Créer projet
PUT    /api/projects/:projectId         # Modifier projet
DELETE /api/projects/:projectId         # Supprimer projet
```

### Containers

```
GET    /api/projects/:projectId/containers      # Containers d'un projet
GET    /api/containers/:containerId             # Détails container
PUT    /api/containers/:containerId             # Modifier container
GET    /api/containers/:containerId/miners      # Mineurs du container
```

### Métriques

```
GET    /api/metrics/global                      # Métriques globales
GET    /api/metrics/project/:projectId          # Métriques d'un projet
GET    /api/metrics/container/:containerId      # Métriques d'un container
POST   /api/metrics                             # Ajouter métrique
```

### Alertes

```
GET    /api/alerts                              # Toutes les alertes
GET    /api/alerts?project_id=QATAR-001         # Alertes d'un projet
GET    /api/alerts?severity=critical            # Alertes critiques
GET    /api/alerts?status=active                # Alertes actives
POST   /api/alerts/:id/acknowledge              # Acquitter alerte
POST   /api/alerts/:id/resolve                  # Résoudre alerte
```

---

## 📚 Documentation

### Guides

- **`HEARST_CONTROL_ARCHITECTURE.md`** - Architecture complète multi-projets
- **`SUPABASE_SETUP_GUIDE.md`** - Guide détaillé Supabase
- **`DEMARRAGE_RAPIDE.md`** - Guide de démarrage
- **`DEPLOYMENT_GUIDE.md`** - Guide de déploiement production

### API

- **`API_DOCUMENTATION.md`** - Documentation API complète
- **`backend/swagger.json`** - Spécification OpenAPI

---

## ✅ Checklist d'Installation

- [ ] Tables créées dans Supabase (supabase-init-multi-projects.sql)
- [ ] RLS désactivé (développement) ou configuré (production)
- [ ] Fichiers .env vérifiés (backend + frontend)
- [ ] Test connexion réussi (node test-supabase-connection.js)
- [ ] Backend démarré (port 3001)
- [ ] Frontend démarré (port 3000)
- [ ] Dashboard accessible (http://localhost:3000)
- [ ] Projet Qatar Project visible dans le dashboard
- [ ] Métriques affichées correctement

---

## 🎯 Prochaines Étapes

### Court Terme

1. ✅ Personnaliser le dashboard frontend
2. ✅ Configurer les alertes email/Slack
3. ✅ Ajouter l'authentification utilisateurs
4. ✅ Créer les graphiques de performance

### Moyen Terme

1. 🔜 Activer le projet Aquahash quand prêt
2. 🔜 Ajouter des projets supplémentaires
3. 🔜 Implémenter le système de maintenance
4. 🔜 Configurer les backups automatiques

### Long Terme

1. 🚀 Déployer en production
2. 🚀 Activer RLS et sécurité avancée
3. 🚀 Monitoring avancé (Sentry, DataDog)
4. 🚀 API publique pour intégrations tierces

---

## 🔐 Credentials Supabase

```
URL: https://tnnsfheflydiuhiduntn.supabase.co
ANON_KEY: sb_publishable_Szjcw1a4pnMl1UwqPsUFZQ_WXOtx8-u
```

**Dashboards :**
- 🏠 Projet : https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn
- 📝 SQL Editor : https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/sql
- 🗄️ Tables : https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/editor

---

## 🎉 Félicitations !

Vous avez maintenant une plateforme centralisée pour monitorer **TOUS** vos projets Hearst !

**Caractéristiques :**
- ✅ Multi-projets (Qatar Project + Aquahash + futurs)
- ✅ Évolutif (ajoutez des projets facilement)
- ✅ Centralisé (un seul dashboard)
- ✅ Sécurisé (isolation par projet)
- ✅ Performant (indexes optimisés)

---

**Questions ? Consultez** `HEARST_CONTROL_ARCHITECTURE.md` **pour plus de détails.**

**Hearst Control v2.0** - Multi-Projects Monitoring Platform

