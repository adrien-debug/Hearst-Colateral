# 🚀 Qatar Dashboard - Hearst Mining

Dashboard de monitoring et gestion pour le projet Hearst Qatar Mining - 58 containers ANTSPACE HD5, 17,864 mineurs S21XP Hydro, 8.45 EH/s.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.17.0-green.svg)
![Next.js](https://img.shields.io/badge/next.js-14.0-black.svg)
![License](https://img.shields.io/badge/license-Private-red.svg)

---

## 📋 Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Caractéristiques](#caractéristiques)
- [Démarrage Rapide](#démarrage-rapide)
- [Architecture](#architecture)
- [Documentation](#documentation)
- [Support](#support)

---

## 🎯 Vue d'ensemble

Le Qatar Dashboard est une application web full-stack moderne pour le monitoring en temps réel du site minier Hearst Qatar. Il permet de surveiller :

- **58 containers** ANTSPACE HD5
- **17,864 mineurs** S21XP Hydro (473 TH/s chacun)
- **Hashrate total** de 8.45 EH/s
- **Consommation** de 102.37 MW
- **Métriques en temps réel** (température, efficacité, uptime)

### Technologies

**Backend:**
- Node.js 18+ / Express.js
- Supabase (PostgreSQL)
- JWT Authentication
- RESTful API

**Frontend:**
- Next.js 14 (App Router)
- React 18 / TypeScript
- Tailwind CSS
- Axios + React Hooks

**Infrastructure:**
- PM2 (Process Manager)
- Docker / Docker Compose
- Nginx (Reverse Proxy)
- Vercel (Frontend déployé)

---

## ✨ Caractéristiques

### 🔐 Authentification Sécurisée
- JWT tokens avec expiration
- Gestion des rôles (admin, manager, operator, viewer)
- Protection des routes API et frontend
- Session persistante

### 📊 Dashboard Temps Réel
- Vue d'ensemble du site complet
- Statistiques globales (containers, mineurs, hashrate, power)
- Auto-refresh toutes les 10 secondes
- Métriques historiques

### 📦 Gestion Containers
- Liste complète des 58 containers
- Statut en temps réel (operational, maintenance, offline)
- Métriques par container (hashrate, température, consommation)
- Détails mineurs par container

### ⚡ Monitoring Mineurs
- 17,864 mineurs S21XP Hydro
- Status individuel et agrégé
- Performance et efficacité
- Alertes automatiques

### 📈 Métriques Avancées
- Historique hashrate
- Historique consommation
- Graphiques en temps réel
- Statistiques agrégées
- Export de données

### 🔧 Administration
- CRUD containers et mineurs
- Gestion utilisateurs
- Configuration système
- Logs et audits

---

## ⚡ Démarrage Rapide

### Option 1 : Mode Ultra-Autonome (Recommandé)

```bash
cd "/Users/adrienbeyondcrypto/Desktop/Hearst Control /Qatar-Dashboard"
./ULTRA_AUTO.sh
```

✅ **Ce script fait TOUT automatiquement :**
1. Installe les dépendances
2. Configure les fichiers .env
3. Vérifie Supabase
4. **Surveille en continu** (5 secondes)
5. **Lance automatiquement** dès que prêt
6. Ouvre le navigateur

**Résultat** : ZÉRO commande manuelle !

### Option 2 : One-Liner Rapide

```bash
./GO.sh
```

Installation + Lancement en une seule commande.

### Option 3 : Manuel (Contrôle Total)

```bash
# 1. Installation
npm install
cd frontend && npm install && cd ..

# 2. Configuration (voir SETUP_RAPIDE.md)
cp .env.example .env
# Éditer .env avec credentials Supabase

# 3. Démarrage
./start-all.sh
```

### Accès

```
🌐 Frontend : http://localhost:3000
🔧 Backend  : http://localhost:3001

🔑 Login    : admin@hearstmining.com
🔒 Password : Admin123!Hearst
```

---

## 🏗️ Architecture

### Structure du Projet

```
Qatar-Dashboard/
├── backend/                    # API Express.js
│   ├── controllers/           # Logique métier (4 controllers)
│   ├── routes/                # Routes API (32 endpoints)
│   ├── scripts/               # Scripts automation
│   ├── utils/                 # Utilitaires (Supabase client)
│   └── server.js              # Point d'entrée backend
│
├── frontend/                   # Application Next.js
│   ├── src/
│   │   ├── app/               # Pages (App Router)
│   │   ├── components/        # Composants React
│   │   ├── contexts/          # AuthContext
│   │   ├── hooks/             # Custom hooks
│   │   └── lib/               # API client
│   └── public/                # Assets statiques
│
├── database/                   # Schéma SQL
├── docs/                       # Documentation
├── logs/                       # Fichiers logs
├── backups/                    # Backups database
│
├── *.sh                        # Scripts shell (4 scripts)
├── ecosystem.config.js         # Configuration PM2
├── docker-compose.yml          # Orchestration Docker
├── DEPLOYMENT_GUIDE.md         # Guide déploiement complet
└── README.md                   # Ce fichier
```

### API Endpoints

**Authentication:**
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/verify` - Vérifier token
- `POST /api/auth/refresh` - Refresh token

**Containers:**
- `GET /api/containers` - Liste tous les containers
- `GET /api/containers/stats` - Statistiques
- `GET /api/containers/:id` - Détails container
- `PUT /api/containers/:id` - Modifier
- `POST /api/containers` - Créer
- `DELETE /api/containers/:id` - Supprimer

**Metrics:**
- `GET /api/metrics/current` - Métriques actuelles
- `GET /api/metrics/period` - Par période
- `GET /api/metrics/stats` - Statistiques
- `GET /api/metrics/hashrate/history` - Historique hashrate
- `GET /api/metrics/power/history` - Historique consommation

**Miners:**
- `GET /api/miners` - Liste mineurs
- `GET /api/miners/stats` - Statistiques
- `GET /api/miners/container/:id` - Mineurs d'un container
- `POST /api/miners/:id/restart` - Redémarrer

🔒 Toutes les routes sont protégées par authentification JWT.

---

## 📚 Documentation

### Guides de Démarrage

| Document | Description | Temps |
|----------|-------------|-------|
| **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** | Guide complet de déploiement | 30 min |
| **[SETUP_RAPIDE.md](./SETUP_RAPIDE.md)** | Configuration rapide (10 min) | 10 min |
| **[QUICK_START.txt](./QUICK_START.txt)** | Commandes essentielles | 2 min |

### Documentation Technique

| Document | Description |
|----------|-------------|
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | Architecture détaillée |
| **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** | Documentation API complète |
| **[TODO_REMAINING.md](./TODO_REMAINING.md)** | Tâches restantes |
| **[STATUS_FINAL.md](./STATUS_FINAL.md)** | État final du projet |

### Scripts Disponibles

| Script | Description | Autonomie |
|--------|-------------|-----------|
| `./ULTRA_AUTO.sh` | **Mode ultra-autonome absolu** | ⭐⭐⭐⭐⭐ |
| `./GO.sh` | One-liner install + launch | ⭐⭐⭐⭐ |
| `./start-all.sh` | Démarrage complet | ⭐⭐⭐ |
| `./stop-all.sh` | Arrêt de tous les services | ⭐⭐⭐ |

---

## 🛠️ Configuration

### Variables d'Environnement

**Backend (.env):**
```bash
NODE_ENV=development
PORT=3001
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...
JWT_SECRET=your_secret_here
CORS_ORIGIN=http://localhost:3000
```

**Frontend (.env.local):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_METRICS_REFRESH_INTERVAL=10000
```

Voir `.env.example` pour la liste complète.

---

## 🔒 Sécurité

- ✅ Authentification JWT avec expiration
- ✅ Tokens stockés dans cookies HttpOnly
- ✅ Protection CSRF
- ✅ Rate limiting (100 req/15min)
- ✅ Validation des entrées
- ✅ Gestion des permissions par rôle
- ✅ HTTPS en production
- ✅ Secrets chiffrés

---

## 📊 Monitoring

### Logs

```bash
# Logs backend
tail -f logs/backend.log

# Logs frontend
tail -f logs/frontend.log

# Logs erreurs
tail -f logs/backend-error.log
```

### Health Checks

```bash
# Backend health
curl http://localhost:3001/health

# Frontend
curl http://localhost:3000/
```

---

## 🐛 Troubleshooting

### Ports Occupés

```bash
# Libérer les ports
./stop-all.sh

# Ou manuellement
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### Supabase Connection Failed

```bash
# Tester connexion
node test-supabase.js

# Vérifier .env
cat backend/.env | grep SUPABASE
```

### Tout Réinstaller

```bash
# Nettoyage complet
rm -rf node_modules backend/node_modules frontend/node_modules
rm -rf package-lock.json backend/package-lock.json frontend/package-lock.json

# Réinstallation
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

Voir **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** pour plus de solutions.

---

## 🚀 Déploiement Production

### Backend (VPS/Cloud)

```bash
# PM2 production
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

### Frontend (Vercel)

```bash
cd frontend
vercel --prod
```

Voir **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** pour le guide complet.

---

## 🧪 Tests

```bash
# Tests backend
npm test

# Tests frontend
cd frontend && npm test

# Tests E2E (si configurés)
npm run test:e2e
```

---

## 📝 Scripts NPM

**Backend:**
```bash
npm run dev          # Dev mode avec nodemon
npm start            # Production mode
npm test             # Jest tests
npm run lint         # ESLint
```

**Frontend:**
```bash
npm run dev          # Dev mode (port 3000)
npm run build        # Build production
npm start            # Start production build
npm run lint         # Next.js lint
```

---

## 🤝 Contributing

Ce projet est privé. Pour toute contribution :

1. Créer une branche depuis `develop`
2. Commits conventionnels : `feat:`, `fix:`, `docs:`, etc.
3. Tests passants requis
4. Pull Request avec description détaillée

---

## 📞 Support

### En cas de problème

1. Consulter **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** (section Troubleshooting)
2. Vérifier les logs : `tail -f logs/*.log`
3. Tester Supabase : `node test-supabase.js`
4. Réinstaller : `./GO.sh`

### Documentation

- **Guide déploiement** : [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Setup rapide** : [SETUP_RAPIDE.md](./SETUP_RAPIDE.md)
- **Architecture** : [ARCHITECTURE.md](./ARCHITECTURE.md)
- **API** : [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 📈 Statistiques Projet

| Métrique | Valeur |
|----------|--------|
| **Lignes de code** | ~10,000+ |
| **Fichiers** | 93+ |
| **Controllers** | 4 (29 fonctions) |
| **Routes API** | 32 endpoints |
| **Pages frontend** | 3 (login, dashboard, home) |
| **Composants** | 5 réutilisables |
| **Scripts shell** | 4 automatisés |
| **Documentation** | 20 fichiers MD |
| **Tests** | Tests unitaires backend |

---

## 🏆 Fonctionnalités Clés

### ✅ Implémenté

- ✅ Authentification JWT complète
- ✅ Dashboard temps réel
- ✅ Gestion containers et mineurs
- ✅ Métriques et statistiques
- ✅ API RESTful sécurisée
- ✅ Auto-refresh intelligent
- ✅ Responsive design
- ✅ Scripts d'automatisation
- ✅ Documentation exhaustive
- ✅ Déploiement production-ready

### 🚧 À venir

- 🚧 WebSocket temps réel
- 🚧 Graphiques avancés (Chart.js/Recharts)
- 🚧 Système d'alertes
- 🚧 Export PDF/CSV
- 🚧 Dark mode
- 🚧 Notifications push
- 🚧 Mobile app

Voir **[TODO_REMAINING.md](./TODO_REMAINING.md)** pour la liste complète.

---

## 📄 License

Private - © 2025 Hearst Mining - Tous droits réservés

---

## 🎯 Résumé

Le Qatar Dashboard est une solution complète, moderne et sécurisée pour le monitoring du site minier Hearst Qatar. Avec son **mode ultra-autonome**, il s'installe, se configure et se lance **automatiquement** en quelques minutes.

### Démarrage en 30 secondes

```bash
./ULTRA_AUTO.sh
```

**C'est tout !** Le système fait le reste. 🔥

---

**Qatar Dashboard v1.0.0**  
**Hearst Mining - Qatar Project**  
**Décembre 2025**

