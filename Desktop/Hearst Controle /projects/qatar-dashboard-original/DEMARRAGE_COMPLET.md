# 🚀 GUIDE DE DÉMARRAGE COMPLET - HEARST CONTROL

## 🎯 Vue d'Ensemble

**HEARST CONTROL** est une plateforme centralisée de monitoring pour **TOUS** les projets miniers Hearst avec **authentification unique**.

```
┌─────────────────────────────────────────────┐
│  1️⃣  LOGIN PAGE                              │
│      👤 Email + Password                    │
│             ↓                               │
│  2️⃣  AUTHENTICATION                          │
│      ✅ Token JWT                            │
│             ↓                               │
│  3️⃣  MULTI-PROJECTS DASHBOARD               │
│      📊 Vue Globale                         │
│      🎯 Projet Qatar (QATAR-001)            │
│      🎯 Projet Aquahash (AQUA-001)          │
│      🎯 Projets futurs...                   │
│             ↓                               │
│  4️⃣  NAVIGATION                              │
│      Accès fluide entre tous les projets   │
│      avec le même token                    │
└─────────────────────────────────────────────┘
```

---

## ⚡ Installation Complète (15 minutes)

### ÉTAPE 1 : Créer les Tables Supabase (5 min)

#### 1.1 Ouvrir le SQL Editor

👉 **https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/sql**

#### 1.2 Exécuter le Script Multi-Projets

- Ouvrir le fichier **`supabase-init-multi-projects.sql`**
- Sélectionner TOUT (Cmd+A / Ctrl+A)
- Copier (Cmd+C / Ctrl+C)
- Coller dans le SQL Editor
- Cliquer sur **RUN** ▶️

**✅ Tables créées :**
- `projects` - Projets Hearst
- `user_project_access` - Permissions par utilisateur
- `containers` - Containers par projet
- `miners` - Mineurs par container
- `metrics` - Métriques historiques
- `alerts` - Système d'alertes
- `activity_logs` - Logs d'activité
- `auth_logs` - Logs d'authentification

#### 1.3 Désactiver RLS (Développement)

```sql
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_project_access DISABLE ROW LEVEL SECURITY;
ALTER TABLE containers DISABLE ROW LEVEL SECURITY;
ALTER TABLE miners DISABLE ROW LEVEL SECURITY;
ALTER TABLE metrics DISABLE ROW LEVEL SECURITY;
ALTER TABLE alerts DISABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE auth_logs DISABLE ROW LEVEL SECURITY;
```

---

### ÉTAPE 2 : Créer des Utilisateurs Supabase (3 min)

#### 2.1 Via Supabase Dashboard

1. Aller sur : **https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/auth/users**
2. Cliquer sur **"Add User"**
3. Créer un utilisateur admin :
   - Email: `admin@hearstmining.com`
   - Password: `Admin123!Hearst`
   - Confirm Email: ✅ (cocher)

#### 2.2 Assigner des Permissions

Retourner au SQL Editor et exécuter :

```sql
-- Récupérer l'ID de l'utilisateur créé
SELECT id, email FROM auth.users WHERE email = 'admin@hearstmining.com';

-- Copier l'UUID, puis exécuter (remplacer YOUR-USER-UUID):
INSERT INTO user_project_access (user_id, project_id, access_level, can_view, can_edit, can_delete, can_manage_users)
VALUES 
  ('YOUR-USER-UUID', 'QATAR-001', 'admin', TRUE, TRUE, TRUE, TRUE),
  ('YOUR-USER-UUID', 'AQUA-001', 'admin', TRUE, TRUE, TRUE, TRUE);
```

**Exemple :**
```sql
-- Si l'UUID est: a1b2c3d4-e5f6-7890-abcd-ef1234567890
INSERT INTO user_project_access (user_id, project_id, access_level, can_view, can_edit, can_delete, can_manage_users)
VALUES 
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'QATAR-001', 'admin', TRUE, TRUE, TRUE, TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'AQUA-001', 'admin', TRUE, TRUE, TRUE, TRUE);
```

---

### ÉTAPE 3 : Tester la Connexion (2 min)

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst\ Control\ /Qatar-Dashboard
node test-supabase-connection.js
```

**Résultat attendu :**
```
✅ CONNEXION SUPABASE RÉUSSIE !
📊 Containers: 58 / 58 attendus
📦 Projects: 2
🎉 Base de données correctement initialisée !
```

---

### ÉTAPE 4 : Lancer la Plateforme (5 min)

#### 4.1 Backend

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst\ Control\ /Qatar-Dashboard/backend
npm install
npm start
```

**Attendez de voir :**
```
🚀 Serveur démarré sur le port 3001
✅ Connexion Supabase : OK
📡 API Routes:
   POST   /api/auth/login
   GET    /api/auth/me
   GET    /api/projects
   GET    /api/projects/:id
```

#### 4.2 Frontend

```bash
# Dans un NOUVEAU terminal
cd /Users/adrienbeyondcrypto/Desktop/Hearst\ Control\ /Qatar-Dashboard/frontend
npm install
npm run dev
```

**Puis ouvrir :**

👉 **http://localhost:3000**

---

## 🎨 Interface Utilisateur

### Page 1 : Login

```
┌────────────────────────────────────────┐
│                                        │
│        🏢 HEARST CONTROL              │
│     Multi-Projects Control Platform    │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │                                  │  │
│  │  📧 Email                        │  │
│  │  ┌────────────────────────────┐  │  │
│  │  │ admin@hearstmining.com     │  │  │
│  │  └────────────────────────────┘  │  │
│  │                                  │  │
│  │  🔐 Password                     │  │
│  │  ┌────────────────────────────┐  │  │
│  │  │ ••••••••••••••             │  │  │
│  │  └────────────────────────────┘  │  │
│  │                                  │  │
│  │  ┌────────────────────────────┐  │  │
│  │  │    🔓 Se connecter         │  │  │
│  │  └────────────────────────────┘  │  │
│  │                                  │  │
│  └──────────────────────────────────┘  │
│                                        │
└────────────────────────────────────────┘
```

### Page 2 : Dashboard Multi-Projets

```
┌────────────────────────────────────────────────────┐
│ 🏢 HEARST CONTROL        👤 Admin  [Logout]      │
├────────────────────────────────────────────────────┤
│                                                    │
│  📊 GLOBAL OVERVIEW                                │
│  ┌─────────────┬──────────────┬──────────────┐    │
│  │ 2 Projects  │ 8.45 EH/s    │ 102.37 MW    │    │
│  │ 1 Active    │ Total Hash   │ Total Power  │    │
│  └─────────────┴──────────────┴──────────────┘    │
│                                                    │
│  🎯 YOUR PROJECTS                                  │
│                                                    │
│  ┌──────────────────────────────────────────┐     │
│  │ ✅ Hearst Qatar (QATAR-001)              │     │
│  │    📍 Qatar                              │     │
│  │    58 containers │ 17,864 miners        │     │
│  │    8.45 EH/s     │ 102.37 MW            │     │
│  │    Status: Active  ⚡ 99.2% Uptime      │     │
│  │    [View Dashboard →]  [Manage →]       │     │
│  └──────────────────────────────────────────┘     │
│                                                    │
│  ┌──────────────────────────────────────────┐     │
│  │ 🔜 Hearst Aquahash (AQUA-001)            │     │
│  │    📍 TBD                                │     │
│  │    Status: Planned (Q2 2025)             │     │
│  │    [Configure Project →]                 │     │
│  └──────────────────────────────────────────┘     │
│                                                    │
│  🚨 ACTIVE ALERTS (0)                             │
│  ✅ All systems operational                        │
│                                                    │
│  📈 RECENT ACTIVITY                               │
│  • 12:34 - Container QATAR-C12 temperature normal │
│  • 12:30 - User admin@hearstmining.com logged in  │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Page 3 : Projet Détaillé (ex: Qatar)

```
┌────────────────────────────────────────────────────┐
│ 🏢 HEARST CONTROL > Qatar (QATAR-001)            │
│ [← Back to Dashboard]      👤 Admin  [Logout]     │
├────────────────────────────────────────────────────┤
│                                                    │
│  📊 PROJECT METRICS                                │
│  ┌─────────────┬──────────────┬──────────────┐    │
│  │ 58/58       │ 8.42 EH/s    │ 101.5 MW     │    │
│  │ Containers  │ Hashrate     │ Power        │    │
│  └─────────────┴──────────────┴──────────────┘    │
│                                                    │
│  🏭 CONTAINERS STATUS                             │
│  [Grid 58 containers avec couleurs status]       │
│  ✅ Active: 56  ⚠️  Warning: 2  ❌ Offline: 0     │
│                                                    │
│  📈 PERFORMANCE CHART (24H)                        │
│  [Graphique hashrate + température]               │
│                                                    │
│  ⚡ MINERS STATUS                                  │
│  Active: 17,650 / 17,864 (98.8%)                  │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## 🔐 Système d'Authentification

### Flux Complet

1. **Login** : Email + Password
2. **Token JWT** : Stocké dans localStorage
3. **Accès Projets** : Tous les projets autorisés
4. **Navigation** : Pas de reconnexion
5. **Logout** : Clear token

### Test de Connexion

#### Via cURL

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hearstmining.com",
    "password": "Admin123!Hearst"
  }'

# Copier le access_token retourné

# Tester l'accès aux projets
curl http://localhost:3001/api/projects \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

#### Via Interface

1. Ouvrir http://localhost:3000
2. Se connecter avec :
   - Email: `admin@hearstmining.com`
   - Password: `Admin123!Hearst`
3. ✅ Accès au dashboard multi-projets !

---

## 👥 Créer Plus d'Utilisateurs

### Manager Qatar (Accès à Qatar uniquement)

```sql
-- 1. Créer dans Supabase Dashboard → Auth → Add User
-- Email: manager.qatar@hearstmining.com
-- Password: Manager123!

-- 2. Assigner permissions (remplacer UUID)
INSERT INTO user_project_access (user_id, project_id, access_level, can_view, can_edit)
VALUES ('MANAGER-UUID', 'QATAR-001', 'manager', TRUE, TRUE);
```

### Operator Global (Lecture seule tous projets)

```sql
-- 1. Créer dans Supabase Dashboard
-- Email: operator@hearstmining.com
-- Password: Operator123!

-- 2. Assigner permissions
INSERT INTO user_project_access (user_id, project_id, access_level, can_view)
VALUES 
  ('OPERATOR-UUID', 'QATAR-001', 'operator', TRUE),
  ('OPERATOR-UUID', 'AQUA-001', 'operator', TRUE);
```

---

## 📊 Vérifications

### 1. Vérifier les Tables

```sql
-- Compter les données
SELECT 
  'projects' as table_name, COUNT(*) as count FROM projects
UNION ALL
SELECT 'containers', COUNT(*) FROM containers
UNION ALL
SELECT 'miners', COUNT(*) FROM miners
UNION ALL
SELECT 'metrics', COUNT(*) FROM metrics
UNION ALL
SELECT 'alerts', COUNT(*) FROM alerts
UNION ALL
SELECT 'user_project_access', COUNT(*) FROM user_project_access;
```

**Résultat attendu :**
```
projects              | 2
containers            | 58
miners                | 0
metrics               | 48
alerts                | 0
user_project_access   | 2+
```

### 2. Vérifier les Permissions

```sql
-- Voir les permissions
SELECT 
  u.email,
  p.name as project_name,
  upa.access_level,
  upa.can_view,
  upa.can_edit
FROM user_project_access upa
JOIN auth.users u ON upa.user_id = u.id
JOIN projects p ON upa.project_id = p.project_id
ORDER BY u.email, p.name;
```

### 3. Tester l'API

```bash
# Health check
curl http://localhost:3001/health

# Test endpoint
curl http://localhost:3001/api/test

# Projects (nécessite auth)
curl http://localhost:3001/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🎯 Projets Configurés

### ✅ Projet 1 : Hearst Qatar (QATAR-001)

- **Status** : Active
- **Containers** : 58 (QATAR-C01 → QATAR-C58)
- **Mineurs** : 17,864 (308/container)
- **Hashrate** : 8.45 EH/s
- **Power** : 102.37 MW

### 🔜 Projet 2 : Hearst Aquahash (AQUA-001)

- **Status** : Planned
- **Timeline** : Q2 2025
- **Type** : Refroidissement immersion

---

## ✅ Checklist Finale

### Configuration
- [ ] Tables créées dans Supabase
- [ ] RLS désactivé (dev) ou configuré (prod)
- [ ] Utilisateur admin créé
- [ ] Permissions assignées
- [ ] Fichiers .env vérifiés

### Test
- [ ] Test connexion réussi (`node test-supabase-connection.js`)
- [ ] Backend démarré (port 3001)
- [ ] Frontend démarré (port 3000)
- [ ] Login fonctionnel
- [ ] Dashboard visible
- [ ] Projets accessibles

---

## 📚 Documentation

| Fichier | Description |
|---------|-------------|
| `FLUX_AUTHENTIFICATION.md` | Flux d'auth complet |
| `HEARST_CONTROL_ARCHITECTURE.md` | Architecture multi-projets |
| `INSTALLATION_MULTI_PROJETS.md` | Guide installation |
| `RESUMÉ_INTEGRATION.md` | Résumé de tout |

---

## 🎉 Félicitations !

Vous avez maintenant **HEARST CONTROL** opérationnel avec :

✅ **Authentification centralisée**  
✅ **Multi-projets** (Qatar + Aquahash)  
✅ **Permissions par utilisateur**  
✅ **Dashboard unifié**  
✅ **Navigation fluide**

**Une seule connexion → Tous les projets → Maximum d'efficacité ! 🚀**

---

**Hearst Control v2.0** - Plateforme Centralisée Multi-Projets  
**Date** : Décembre 2024

