# 🏗️ PLAN DE STRUCTURATION - HEARST CONTROL

**Date** : 24 Décembre 2025  
**Objectif** : Structurer Hearst Control comme plateforme multi-projets centralisée

---

## 📊 SITUATION ACTUELLE

### Ce qui EXISTE :
- ✅ Documentation complète (ARCHITECTURE_GLOBALE.md, etc.)
- ✅ Swagger API (backend/swagger.json)
- ✅ Scripts bash (ULTRA_AUTO.sh, GO.sh, etc.)
- ✅ Système Ensemble documenté
- ✅ Base Supabase configurée (URL + clés)

### Ce qui N'existe PAS :
- ❌ Aucun code backend (juste swagger)
- ❌ Aucun code frontend
- ❌ Aucun fichier .env
- ❌ Aucune structure de dossiers core/
- ❌ Aucune structure projects/

### Fichiers vides :
- 📁 Qatar Project/ (vide - on laisse)

---

## 🎯 ARCHITECTURE CIBLE

```
Hearst Control/                        ← Racine de la plateforme
│
├── core/                              ← CODE COMMUN (À DÉVELOPPER)
│   ├── backend/                       ← API Gateway centrale
│   │   ├── src/
│   │   │   ├── auth/                  ← Auth centralisée JWT
│   │   │   ├── middleware/            ← Middlewares communs
│   │   │   ├── database/              ← Client Supabase
│   │   │   └── utils/                 ← Utilitaires
│   │   ├── package.json
│   │   ├── .env.example
│   │   └── server.js                  ← Serveur Express principal
│   │
│   ├── frontend/                      ← Dashboard CENTRAL
│   │   ├── src/
│   │   │   ├── components/            ← Composants réutilisables
│   │   │   ├── layouts/               ← Layouts communs
│   │   │   ├── pages/                 ← Pages globales
│   │   │   │   ├── index.tsx          ← Dashboard global
│   │   │   │   ├── projects.tsx       ← Liste projets
│   │   │   │   └── login.tsx          ← Login centralisé
│   │   │   └── lib/                   ← API client
│   │   ├── package.json
│   │   ├── .env.local.example
│   │   └── next.config.js
│   │
│   └── shared/                        ← CODE PARTAGÉ
│       ├── types/                     ← Types TypeScript
│       ├── constants/                 ← Constantes
│       └── utils/                     ← Utils partagés
│
├── projects/                          ← PROJETS ISOLÉS
│   │
│   ├── hearst-qatar/                  ← PROJET #1 (À DÉVELOPPER)
│   │   ├── backend/                   ← API spécifique Qatar
│   │   │   ├── src/
│   │   │   │   ├── routes/            ← Routes Qatar
│   │   │   │   ├── controllers/       ← Controllers Qatar
│   │   │   │   └── services/          ← Business logic
│   │   │   ├── package.json
│   │   │   ├── .env.example
│   │   │   └── server.js
│   │   │
│   │   ├── frontend/                  ← Dashboard spécifique Qatar
│   │   │   ├── src/
│   │   │   │   ├── components/        ← Composants Qatar
│   │   │   │   └── pages/             ← Pages Qatar
│   │   │   │       ├── containers.tsx ← Liste 58 containers
│   │   │   │       ├── miners.tsx     ← 17,864 mineurs
│   │   │   │       └── metrics.tsx    ← Métriques temps réel
│   │   │   ├── package.json
│   │   │   └── next.config.js
│   │   │
│   │   ├── config.json                ← Config projet Qatar
│   │   └── README.md                  ← Doc Qatar
│   │
│   ├── hearst-aquahash/               ← PROJET #2 (FUTUR - NE PAS DÉVELOPPER)
│   │   ├── config.json                ← Juste config
│   │   └── README.md                  ← Juste doc
│   │
│   └── hearst-texas/                  ← PROJET #3 (FUTUR - NE PAS DÉVELOPPER)
│       └── README.md
│
├── scripts/                           ← SCRIPTS ORCHESTRATION
│   ├── create-project.sh              ← Créer un nouveau projet
│   ├── start-all.sh                   ← Démarrer tous les projets
│   ├── stop-all.sh                    ← Arrêter tous
│   └── deploy.sh                      ← Déploiement
│
├── docs/                              ← DOCUMENTATION (DÉJÀ EXISTANTE)
│   ├── ARCHITECTURE_GLOBALE.md        ← ✅ Existe
│   ├── ENSEMBLE_GUIDE.md              ← ✅ Existe
│   └── API_DOCUMENTATION.md           ← À créer
│
├── .ensemble                          ← CONFIG SYSTÈME ENSEMBLE
├── package.json                       ← Root workspace
├── .gitignore
└── README.md                          ← ✅ Existe
```

---

## 🔥 CE QU'IL FAUT DÉVELOPPER (NOUVEAU)

### 1. **CORE BACKEND** (API Gateway + Auth) - PRIORITÉ 1

**Rôle** : API centrale qui route vers les projets

**Stack** :
- Node.js 18+
- Express.js
- JWT pour auth
- Supabase client

**À développer** :
```
core/backend/
├── src/
│   ├── server.js              ← Point d'entrée
│   ├── config/
│   │   └── supabase.js        ← Config Supabase
│   ├── auth/
│   │   ├── authController.js  ← Login, register, verify
│   │   ├── authMiddleware.js  ← JWT verification
│   │   └── authService.js     ← Business logic
│   ├── routes/
│   │   ├── index.js           ← Router principal
│   │   ├── projects.js        ← GET /api/projects
│   │   ├── auth.js            ← POST /api/auth/login
│   │   └── gateway.js         ← Proxy vers projets
│   └── middleware/
│       ├── errorHandler.js
│       ├── logger.js
│       └── cors.js
├── package.json
├── .env.example
└── README.md
```

**Endpoints à développer** :
- `POST /api/auth/login` - Login centralisé
- `POST /api/auth/register` - Inscription
- `GET /api/auth/verify` - Vérifier token
- `GET /api/projects` - Liste tous les projets
- `GET /api/projects/:id` - Détails projet
- `GET /api/metrics/global` - Métriques globales
- `/*` - Proxy vers projets (ex: /qatar/* → hearst-qatar backend)

**Temps estimé** : 2-3 jours

---

### 2. **CORE FRONTEND** (Dashboard Central) - PRIORITÉ 2

**Rôle** : Interface globale Hearst Control

**Stack** :
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Recharts pour graphiques

**À développer** :
```
core/frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx                   ← Dashboard global
│   │   ├── login/page.tsx             ← Login centralisé
│   │   ├── projects/page.tsx          ← Liste projets
│   │   ├── projects/[id]/page.tsx     ← Détails projet
│   │   └── layout.tsx                 ← Layout principal
│   ├── components/
│   │   ├── Header.tsx                 ← Header commun
│   │   ├── Sidebar.tsx                ← Navigation
│   │   ├── ProjectCard.tsx            ← Card projet
│   │   ├── MetricsOverview.tsx        ← Vue globale métriques
│   │   └── AlertsPanel.tsx            ← Panneau alertes
│   ├── lib/
│   │   ├── api.ts                     ← Client API
│   │   └── auth.ts                    ← Utils auth
│   └── styles/
│       └── globals.css
├── package.json
├── .env.local.example
├── next.config.js
└── tailwind.config.js
```

**Pages à développer** :
1. **Dashboard Global** (`/`) :
   - Total hashrate (tous projets)
   - Total power (tous projets)
   - Nombre projets actifs
   - Liste projets avec status
   - Alertes globales

2. **Login** (`/login`) :
   - Formulaire login
   - Auth JWT
   - Redirect après login

3. **Liste Projets** (`/projects`) :
   - Cards pour chaque projet
   - Status (actif/planifié/maintenance)
   - Métriques clés
   - Lien vers dashboard projet

4. **Détails Projet** (`/projects/qatar-001`) :
   - Iframe ou proxy vers dashboard projet

**Temps estimé** : 3-4 jours

---

### 3. **PROJECT QATAR BACKEND** - PRIORITÉ 3

**Rôle** : API spécifique au projet Qatar

**À développer** :
```
projects/hearst-qatar/backend/
├── src/
│   ├── server.js
│   ├── routes/
│   │   ├── containers.js      ← GET/PUT /api/containers
│   │   ├── miners.js          ← GET /api/miners
│   │   ├── metrics.js         ← GET /api/metrics
│   │   └── alerts.js          ← GET /api/alerts
│   ├── controllers/
│   │   ├── containerController.js
│   │   ├── minerController.js
│   │   └── metricsController.js
│   └── services/
│       ├── containerService.js
│       ├── minerService.js
│       └── metricsService.js
├── package.json
└── .env.example
```

**Endpoints à développer** (selon swagger.json) :
- `GET /api/containers` - Liste 58 containers
- `GET /api/containers/:id` - Détails container
- `PUT /api/containers/:id` - Update container
- `GET /api/miners` - Liste mineurs (pagination)
- `GET /api/metrics/latest` - Dernières métriques
- `GET /api/metrics/history` - Historique métriques

**Temps estimé** : 2-3 jours

---

### 4. **PROJECT QATAR FRONTEND** - PRIORITÉ 4

**Rôle** : Dashboard spécifique Qatar

**À développer** :
```
projects/hearst-qatar/frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx                   ← Overview Qatar
│   │   ├── containers/page.tsx        ← Liste 58 containers
│   │   ├── containers/[id]/page.tsx   ← Détails container
│   │   ├── miners/page.tsx            ← Liste mineurs
│   │   └── metrics/page.tsx           ← Métriques temps réel
│   ├── components/
│   │   ├── ContainerGrid.tsx          ← Grid 58 containers
│   │   ├── ContainerCard.tsx          ← Card container
│   │   ├── MinerTable.tsx             ← Table mineurs
│   │   ├── HashRateChart.tsx          ← Graphique hashrate
│   │   └── PowerChart.tsx             ← Graphique power
│   └── lib/
│       └── api.ts
├── package.json
└── next.config.js
```

**Pages à développer** :
1. **Overview** : Résumé Qatar (58 containers, 8.45 EH/s)
2. **Containers** : Grid des 58 containers avec status
3. **Miners** : Table des 17,864 mineurs (pagination)
4. **Metrics** : Graphiques temps réel

**Temps estimé** : 3-4 jours

---

### 5. **SCRIPTS ORCHESTRATION** - PRIORITÉ 5

**À développer** :
```bash
scripts/
├── start-all.sh           ← Démarrer tous les services
├── stop-all.sh            ← Arrêter tous
├── create-project.sh      ← Template nouveau projet
├── deploy.sh              ← Déploiement production
└── test-all.sh            ← Tests tous projets
```

**Temps estimé** : 1 jour

---

## ♻️ CE QU'IL NE FAUT PAS DÉVELOPPER (RÉUTILISER)

### 1. **Documentation** (✅ GARDER)
- `ARCHITECTURE_GLOBALE.md` - Excellent
- `ENSEMBLE_GUIDE.md` - Bon
- `README.md` - À jour
- `INSTALLATION_MULTI_PROJETS.md` - Utile
- Tous les autres .md

**Action** : Déplacer dans `docs/` et référencer

---

### 2. **Swagger API** (✅ RÉUTILISER)
- `backend/swagger.json` - Bien défini
- Utiliser comme référence pour développer l'API

**Action** : Copier dans `projects/hearst-qatar/backend/swagger.json`

---

### 3. **Scripts Bash Existants** (⚠️ ADAPTER)
- `ULTRA_AUTO.sh`, `GO.sh`, etc. sont spécifiques Qatar
- Adapter pour la nouvelle structure

**Action** : Migrer vers `scripts/` et adapter les chemins

---

### 4. **Système Ensemble** (✅ GARDER)
- Fichier `.ensemble` (s'il existe)
- Scripts `ensembleManager.js`, `testEnsemble.js`

**Action** : Garder à la racine, adapter la config

---

### 5. **Projets Futurs** (❌ NE PAS DÉVELOPPER)
- **hearst-aquahash/** : Juste créer la structure vide
- **hearst-texas/** : Juste créer la structure vide

**Action** : Créer README.md et config.json seulement

---

## 💾 STRATÉGIE BASE DE DONNÉES

### ✅ MÊME SUPABASE pour TOUS

**Réponse** : **OUI, on utilise LA MÊME base Supabase !**

**Pourquoi ?**
- ✅ Isolation par `project_id` dans les tables
- ✅ Auth centralisée
- ✅ Simplifie la gestion
- ✅ Pas de coûts multiples

### Architecture DB :

```sql
-- Table principale des projets
projects
  - project_id (PK)          ← "QATAR-001", "AQUA-001", "USA-001"
  - name
  - status                   ← "active", "planned", "maintenance"
  - ...

-- Isolation par project_id
containers
  - id (PK)
  - project_id (FK)          ← Lien vers projet
  - container_id             ← "QATAR-C01", "AQUA-C01"
  - ...

miners
  - id (PK)
  - project_id (FK)          ← Isolation
  - container_id (FK)
  - ...

metrics
  - id (PK)
  - project_id (FK)          ← Isolation
  - scope                    ← "global", "project", "container"
  - ...

alerts
  - id (PK)
  - project_id (FK)          ← Isolation
  - ...
```

### Requêtes par projet :

```sql
-- Containers du Qatar uniquement
SELECT * FROM containers WHERE project_id = 'QATAR-001';

-- Métriques Aquahash uniquement
SELECT * FROM metrics WHERE project_id = 'AQUA-001';

-- Métriques globales (tous projets)
SELECT 
  SUM(total_hashrate_eh) as global_hashrate,
  SUM(total_power_mw) as global_power
FROM project_overview;
```

### Variables d'environnement :

**Même Supabase pour tous** :
```bash
# core/backend/.env
SUPABASE_URL=https://tnnsfheflydiuhiduntn.supabase.co
SUPABASE_ANON_KEY=sb_publishable_Szjcw1a4pnMl1UwqPsUFZQ_WXOtx8-u

# projects/hearst-qatar/backend/.env
SUPABASE_URL=https://tnnsfheflydiuhiduntn.supabase.co  ← MÊME
SUPABASE_ANON_KEY=sb_publishable_Szjcw1a4pnMl1UwqPsUFZQ_WXOtx8-u  ← MÊME
PROJECT_ID=QATAR-001  ← DIFFÉRENT

# projects/hearst-aquahash/backend/.env
SUPABASE_URL=https://tnnsfheflydiuhiduntn.supabase.co  ← MÊME
SUPABASE_ANON_KEY=sb_publishable_Szjcw1a4pnMl1UwqPsUFZQ_WXOtx8-u  ← MÊME
PROJECT_ID=AQUA-001  ← DIFFÉRENT
```

---

## 📋 ORDRE DE DÉVELOPPEMENT

### Phase 1 : STRUCTURE (1-2h)
1. Créer la structure de dossiers
2. Déplacer les fichiers existants
3. Créer les fichiers de config (.env.example, package.json)

### Phase 2 : CORE BACKEND (2-3 jours)
1. Auth centralisée (JWT)
2. Routes projets
3. API Gateway
4. Connexion Supabase

### Phase 3 : CORE FRONTEND (3-4 jours)
1. Dashboard global
2. Login page
3. Liste projets
4. Composants réutilisables

### Phase 4 : QATAR BACKEND (2-3 jours)
1. Routes containers/miners/metrics
2. Controllers
3. Services
4. Tests

### Phase 5 : QATAR FRONTEND (3-4 jours)
1. Pages containers/miners/metrics
2. Composants Qatar
3. Graphiques
4. Tests

### Phase 6 : SCRIPTS & DEPLOY (1-2 jours)
1. Scripts orchestration
2. Documentation API
3. Tests end-to-end
4. Guide déploiement

**TOTAL ESTIMÉ** : 12-18 jours de développement

---

## 🎯 RÉSUMÉ

### À DÉVELOPPER (Nouveau) :
1. ✅ **core/backend/** - API Gateway + Auth (Node.js)
2. ✅ **core/frontend/** - Dashboard central (Next.js)
3. ✅ **projects/hearst-qatar/backend/** - API Qatar (Node.js)
4. ✅ **projects/hearst-qatar/frontend/** - Dashboard Qatar (Next.js)
5. ✅ **scripts/** - Scripts orchestration (Bash)

### À RÉUTILISER (Ne pas refaire) :
1. ♻️ Documentation (ARCHITECTURE_GLOBALE.md, etc.)
2. ♻️ Swagger.json (référence API)
3. ♻️ Scripts bash existants (adapter)
4. ♻️ Système Ensemble
5. ♻️ Specs projet Qatar (58 containers, etc.)

### BASE DE DONNÉES :
- **MÊME SUPABASE** pour tous les projets
- **Isolation** par `project_id`
- **URL** : `https://tnnsfheflydiuhiduntn.supabase.co`

### PROJETS FUTURS (Ne PAS développer maintenant) :
- ❌ hearst-aquahash (juste structure vide)
- ❌ hearst-texas (juste structure vide)

---

## 🚀 PROCHAINE ÉTAPE

**Voulez-vous que je commence par :**

1. **Créer la structure de dossiers** complète ?
2. **Développer le core/backend** (Auth + API Gateway) ?
3. **Développer le core/frontend** (Dashboard central) ?
4. **Tout faire dans l'ordre** (Phase 1 → Phase 6) ?

**Dites-moi et je commence immédiatement !** 🔥

