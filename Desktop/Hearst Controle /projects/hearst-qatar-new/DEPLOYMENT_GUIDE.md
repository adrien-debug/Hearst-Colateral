# 🚀 GUIDE DE DÉPLOIEMENT - QATAR DASHBOARD

Guide complet de déploiement pour le Dashboard Hearst Qatar Project Mining avec mode ultra-autonome.

**Version** : 1.0.0  
**Date** : 24 Décembre 2025  
**Niveau d'autonomie** : 🔥 100% ULTRA-AUTONOME 🔥

---

## 📋 TABLE DES MATIÈRES

1. [Prérequis](#prérequis)
2. [Déploiement Local](#déploiement-local)
3. [Déploiement Staging](#déploiement-staging)
4. [Déploiement Production](#déploiement-production)
5. [Configuration Supabase](#configuration-supabase)
6. [Scripts d'Automatisation](#scripts-dautomatisation)
7. [Monitoring & Logs](#monitoring--logs)
8. [Troubleshooting](#troubleshooting)
9. [Rollback & Backup](#rollback--backup)

---

## 🎯 PRÉREQUIS

### Système

```bash
✅ Node.js >= 18.17.0
✅ npm >= 9.0.0
✅ Git >= 2.40.0
✅ PM2 (global) - npm install -g pm2
✅ PostgreSQL client (optionnel pour debug)
```

### Comptes & Services

```bash
✅ Compte Supabase (https://supabase.com)
✅ Projet Supabase créé
✅ Compte Vercel (optionnel pour frontend)
✅ Domaine configuré (optionnel)
```

### Vérification Rapide

```bash
node --version    # v18.17.0 ou supérieur
npm --version     # 9.0.0 ou supérieur
pm2 --version     # 5.x ou supérieur
git --version     # 2.40.0 ou supérieur
```

---

## 🏠 DÉPLOIEMENT LOCAL (Mode Ultra-Autonome)

### Option 1 : MODE ULTRA AUTO (Recommandé - ZÉRO EFFORT)

```bash
cd "/Users/adrienbeyondcrypto/Desktop/Hearst Control /Qatar Project-Dashboard"

# Lancement ultra-autonome avec surveillance continue
./ULTRA_AUTO.sh
```

**Ce qui se passe automatiquement** :
1. 🧹 Nettoyage complet (ports, processus)
2. 📦 Installation forcée (backend + frontend)
3. ⚙️ Configuration automatique (.env créés)
4. 🔍 Vérification Supabase
5. 📂 Ouverture onglets Supabase si nécessaire
6. 📋 SQL copié dans presse-papier
7. 🔄 **SURVEILLANCE CONTINUE** (toutes les 5 secondes)
8. 🚀 **LANCEMENT AUTOMATIQUE** dès que Supabase est prêt
9. 🌐 Ouverture navigateur sur http://localhost:3000

**Résultat** : ZÉRO commande manuelle, le système se lance tout seul !

---

### Option 2 : MODE GO (One-Liner Rapide)

```bash
# Installation + Lancement en une seule commande
./GO.sh
```

**Étapes automatiques** :
- ✅ Installation dépendances
- ✅ Vérification .env
- ✅ Test Supabase
- ✅ Libération ports
- ✅ Démarrage backend + frontend
- ✅ Ouverture navigateur

**Temps** : 2-3 minutes si Supabase configuré

---

### Option 3 : MODE CLI (Interface Interactive)

```bash
# Menu complet avec 18 options
./CLI.sh
```

**Options disponibles** :
1. 🚀 Démarrer tout (backend + frontend)
2. 🛑 Tout arrêter
3. 📦 Réinstaller dépendances
4. 🔍 Vérifier configuration
5. 🔧 Réparer automatiquement
6. 📊 Monitoring temps réel
7. 📋 Afficher logs
8. Et 11 autres options...

---

### Option 4 : MODE MANUEL (Contrôle Total)

```bash
# 1. Installation
npm install
cd frontend && npm install && cd ..

# 2. Configuration
cp .env.example .env
# Éditer .env avec vos credentials Supabase

# 3. Vérification Supabase
node test-supabase.js

# 4. Initialisation Database
node init-database.js
# Suivre les instructions pour créer les tables

# 5. Démarrage
npm run dev
# Ou séparément :
# Terminal 1 : npm run dev:backend
# Terminal 2 : npm run dev:frontend
```

**URLs** :
- Frontend : http://localhost:3000
- Backend : http://localhost:3001
- Health Check : http://localhost:3001/health
- API Docs : http://localhost:3001/api-docs

---

## 🔧 CONFIGURATION SUPABASE (5 Minutes)

### Étape 1 : Créer le Projet

```bash
# 1. Aller sur https://supabase.com/dashboard
# 2. Cliquer "New Project"
# 3. Nom : "hearst-qatar" (ou autre)
# 4. Région : choisir la plus proche (ex: Europe West)
# 5. Password : générer un mot de passe fort
# 6. Attendre 2-3 minutes (création database)
```

### Étape 2 : Récupérer les Credentials

```bash
# 1. Aller dans Settings → API
# 2. Copier :
#    - Project URL : https://xxx.supabase.co
#    - anon public : eyJhbGc...
#    - service_role : eyJhbGc... (cliquer "Reveal")
```

### Étape 3 : Configurer .env

```bash
# Éditer backend/.env
SUPABASE_URL=https://tnnsfheflydiuhiduntn.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (votre anon key)
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (votre service_role key)

# Éditer frontend/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://tnnsfheflydiuhiduntn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (même anon key)
```

### Étape 4 : Créer les Tables

```bash
# Option A : Via Dashboard (RECOMMANDÉ)
# 1. Aller sur https://supabase.com/dashboard/project/xxx/sql
# 2. Cliquer "New query"
# 3. Copier TOUT le contenu de supabase-init-multi-projects.sql
# 4. Coller dans l'éditeur SQL
# 5. Cliquer "Run" en bas à droite
# 6. Attendre "Success" (~20 secondes)

# Option B : Via pbcopy (Mac uniquement)
pbcopy < supabase-init-multi-projects.sql
# Puis Cmd+V dans SQL Editor et Run

# Option C : Via psql
psql "postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres" \
     -f supabase-init-multi-projects.sql
```

### Étape 5 : Désactiver RLS (Row Level Security)

```bash
# Dans SQL Editor, exécuter :
pbcopy < disable-rls.sql
# Coller et Run dans Supabase SQL Editor

# Ou manuellement copier le contenu de disable-rls.sql
```

### Étape 6 : Créer l'Utilisateur Admin

```bash
# 1. Aller dans Authentication → Users
# 2. Cliquer "Add user" (bouton vert)
# 3. Email : admin@hearstmining.com
# 4. Password : Admin123!Hearst
# 5. Cocher "Auto Confirm User"
# 6. Cliquer "Create user"
```

### Étape 7 : Vérifier

```bash
# Tester la connexion
node test-supabase.js

# Résultat attendu :
# ✅ Connexion Supabase OK
# ✅ Tables créées : containers, miners, metrics, ...
# ✅ Données chargées : 58 containers
```

---

## 🌐 DÉPLOIEMENT STAGING

### 1. Environnement Staging

```bash
# Créer branche staging
git checkout -b staging

# Variables d'environnement staging
cp .env .env.staging

# Modifier .env.staging :
NODE_ENV=staging
SUPABASE_URL=https://staging-xxx.supabase.co
# ... autres variables staging
```

### 2. Déploiement Backend (Staging)

```bash
# Option A : PM2 avec ecosystem staging
pm2 start ecosystem.config.js --env staging

# Option B : Docker
docker-compose -f docker-compose.staging.yml up -d

# Vérifier
pm2 status
curl http://staging.hearstmining.com/health
```

### 3. Déploiement Frontend (Vercel Staging)

```bash
# Via Vercel CLI
cd frontend
vercel --prod --env-file .env.staging

# Ou via GitHub (auto-deploy)
git push origin staging
# Vercel détecte et déploie automatiquement
```

---

## 🚀 DÉPLOIEMENT PRODUCTION

### 1. Prérequis Production

```bash
✅ Database backups configurés
✅ Monitoring configuré (PM2 Plus, Sentry)
✅ Domain name configuré (hearstmining.com)
✅ SSL certificat (Let's Encrypt)
✅ CDN configuré (optionnel)
✅ Tests E2E passés
```

### 2. Backend Production (PM2)

```bash
# 1. Cloner sur serveur production
git clone https://github.com/hearst/qatar-dashboard.git
cd qatar-dashboard

# 2. Configuration production
cp .env.example .env
# Éditer .env avec credentials production

# 3. Installation
npm ci --production
cd frontend && npm ci --production && cd ..

# 4. Build frontend
cd frontend && npm run build && cd ..

# 5. Démarrage PM2
pm2 start ecosystem.config.js --env production

# 6. Save PM2 config
pm2 save
pm2 startup

# 7. Vérifier
pm2 status
pm2 logs
```

### 3. Frontend Production (Vercel)

```bash
# Via Vercel Dashboard
# 1. Aller sur https://vercel.com/dashboard
# 2. Import Git Repository
# 3. Choisir le repo qatar-dashboard
# 4. Framework : Next.js
# 5. Root Directory : frontend
# 6. Environment Variables :
#    NEXT_PUBLIC_SUPABASE_URL=...
#    NEXT_PUBLIC_SUPABASE_ANON_KEY=...
#    NEXT_PUBLIC_API_URL=https://api.hearstmining.com
# 7. Deploy

# Ou via CLI
cd frontend
vercel --prod
```

### 4. Configuration Nginx (Reverse Proxy)

```nginx
# /etc/nginx/sites-available/qatar-dashboard

upstream backend {
    server localhost:3001;
}

server {
    listen 80;
    server_name api.hearstmining.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.hearstmining.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/hearstmining.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/hearstmining.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    
    # Proxy to backend
    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Health check
    location /health {
        access_log off;
        proxy_pass http://backend/health;
    }
}
```

```bash
# Activer config
sudo ln -s /etc/nginx/sites-available/qatar-dashboard /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL avec Certbot
sudo certbot --nginx -d api.hearstmining.com
```

### 5. Configuration DNS

```bash
# Ajouter ces enregistrements DNS :
A     api.hearstmining.com     → <IP_SERVEUR>
CNAME www.hearstmining.com     → cname.vercel-dns.com
```

---

## 📊 SCRIPTS D'AUTOMATISATION

Le projet inclut 10+ scripts d'automatisation pour gérer le cycle de vie complet.

### Scripts Principaux

```bash
# 1. ULTRA_AUTO.sh - Mode ultra-autonome absolu
./ULTRA_AUTO.sh
# → Installe, configure, surveille, lance automatiquement

# 2. GO.sh - One-liner rapide
./GO.sh
# → Install + Launch en une commande

# 3. CLI.sh - Interface interactive
./CLI.sh
# → Menu complet 18 options

# 4. install.sh - Installation autonome
./install.sh
# → Installe tout sans intervention

# 5. start-all.sh - Démarrage complet
./start-all.sh
# → Lance backend + frontend + ouvre navigateur

# 6. stop-all.sh - Arrêt complet
./stop-all.sh
# → Arrête tous les services proprement

# 7. auto-fix.sh - Réparation automatique
./auto-fix.sh
# → Diagnostique et répare automatiquement

# 8. verify-setup.sh - Vérification complète
./verify-setup.sh
# → Vérifie que tout est OK

# 9. watch.sh - Monitoring temps réel
./watch.sh
# → Affiche statut en continu (5s refresh)

# 10. LANCE_MAINTENANT.sh - Lancement immédiat
./LANCE_MAINTENANT.sh
# → Alias de ULTRA_AUTO.sh
```

### Scripts Node.js

```bash
# Test connexion Supabase
node test-supabase.js

# Instructions initialisation database
node init-database.js

# Check si Supabase est prêt
node check-supabase-ready.js

# Population automatique des données
node auto-populate-data.js

# Backup automatique
node backend/scripts/backup.js

# Watcher temps réel (30s)
node backend/scripts/refreshWatcher.js

# Tests système Ensemble
node backend/scripts/testEnsemble.js

# Export format zotto
node backend/scripts/zottoSave.js
```

---

## 📈 MONITORING & LOGS

### PM2 Monitoring

```bash
# Status temps réel
pm2 status

# Logs en direct (tous les processus)
pm2 logs

# Logs d'un seul processus
pm2 logs qatar-backend
pm2 logs qatar-frontend

# Monitoring détaillé
pm2 monit

# Restart automatique si crash
pm2 save
pm2 startup
```

### PM2 Plus (Monitoring Web)

```bash
# 1. Créer compte sur https://app.pm2.io
# 2. Lier serveur
pm2 link <secret_key> <public_key>

# 3. Accéder dashboard web
# → Métriques temps réel
# → Alertes automatiques
# → Logs centralisés
```

### Logs Applicatifs

```bash
# Backend logs
tail -f logs/backend.log
tail -f logs/backend-error.log

# Frontend logs
tail -f logs/frontend.log
tail -f logs/frontend-error.log

# Combined logs
tail -f logs/combined.log

# Watcher logs
tail -f logs/watcher.log
```

### Watcher Automatique

```bash
# Lancer le watcher (monitoring continu)
./watch.sh

# Affiche :
# ✅/❌ Status backend
# ✅/❌ Status frontend
# ✅/❌ Supabase connection
# 📊 Containers count
# 📊 Miners count
# 📊 Latest metrics
# 🔄 Auto-refresh 5s
```

---

## 🔍 TROUBLESHOOTING

### Problème 1 : Ports Occupés

**Symptôme** : `Error: listen EADDRINUSE :::3000`

```bash
# Solution automatique
./auto-fix.sh

# Ou manuellement
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9

# Relancer
npm run dev
```

### Problème 2 : Supabase Connection Failed

**Symptôme** : `Error: Invalid API key`

```bash
# 1. Vérifier credentials
node test-supabase.js

# 2. Vérifier .env
cat backend/.env | grep SUPABASE

# 3. Régénérer API keys
# Supabase Dashboard → Settings → API → "Reset API keys"

# 4. Mettre à jour .env
nano backend/.env
```

### Problème 3 : Tables Manquantes

**Symptôme** : `Error: relation "containers" does not exist`

```bash
# Solution
node init-database.js
# Suivre les instructions pour créer tables
```

### Problème 4 : node_modules Corrompus

**Symptôme** : `Error: Cannot find module 'express'`

```bash
# Réinstallation forcée
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
npm install
cd frontend && npm install && cd ..
```

### Problème 5 : Frontend Build Failed

**Symptôme** : `Error: Build failed`

```bash
# 1. Nettoyer cache Next.js
cd frontend
rm -rf .next

# 2. Réinstaller dépendances
rm -rf node_modules package-lock.json
npm install

# 3. Rebuild
npm run build

# 4. Tester
npm run dev
```

### Problème 6 : JWT Token Invalid

**Symptôme** : `Error: jwt malformed`

```bash
# 1. Vérifier JWT_SECRET dans .env
# 2. Régénérer secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# 3. Mettre à jour .env
JWT_SECRET=<nouveau_secret>

# 4. Restart
pm2 restart all
```

### Diagnostic Complet

```bash
# Script de diagnostic automatique
./auto-fix.sh

# Affiche :
# ✅/❌ Node.js version
# ✅/❌ npm version
# ✅/❌ Ports disponibles
# ✅/❌ Fichiers .env
# ✅/❌ node_modules
# ✅/❌ Supabase connection
# ✅/❌ Tables database
# 🔧 Réparation automatique si problème
```

---

## 💾 ROLLBACK & BACKUP

### Backup Automatique

```bash
# Script de backup (exécute automatiquement)
node backend/scripts/backup.js

# Backups stockés dans :
backups/
├── backup-2025-12-24-00-00.sql
├── backup-2025-12-24-06-00.sql
├── backup-2025-12-24-12-00.sql
└── backup-2025-12-24-18-00.sql
```

### Backup Manuel

```bash
# Backup database Supabase
pg_dump "postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres" \
        > backup-$(date +%Y%m%d-%H%M%S).sql

# Backup fichiers config
tar -czf config-backup-$(date +%Y%m%d).tar.gz \
    backend/.env \
    frontend/.env.local \
    ecosystem.config.js

# Backup code
git tag -a v1.0.0 -m "Production release"
git push origin v1.0.0
```

### Restore Database

```bash
# Restore depuis backup
psql "postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres" \
     < backup-20251224-120000.sql
```

### Rollback Git

```bash
# Liste des versions
git tag -l

# Rollback à version précédente
git checkout v1.0.0

# Redéployer
pm2 restart all

# Ou reset complet
git reset --hard v1.0.0
npm install
cd frontend && npm install && cd ..
pm2 restart all
```

### Rollback PM2

```bash
# Voir historique déploiements
pm2 list

# Rollback processus
pm2 reload ecosystem.config.js --update-env
```

---

## 🔒 SÉCURITÉ

### Variables d'Environnement

```bash
# NE JAMAIS commiter .env dans Git !
# Utiliser .env.example comme template

# Production : stocker secrets de manière sécurisée
# Option 1 : Fichier .env avec permissions restreintes
chmod 600 backend/.env

# Option 2 : Variables système
export SUPABASE_SERVICE_KEY="..."
export JWT_SECRET="..."

# Option 3 : PM2 secrets
pm2 set pm2:secret_key "..."
```

### Firewall

```bash
# Autoriser seulement ports nécessaires
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable

# Backend doit être accessible uniquement via Nginx
# Pas d'accès direct au port 3001 depuis internet
```

### Rate Limiting

```bash
# Déjà configuré dans backend/server.js
# - 100 requêtes / 15 minutes par IP
# - Protection DDoS basique
```

---

## 📊 PERFORMANCE

### Optimisations Backend

```bash
# 1. Redis cache (optionnel)
npm install redis
# Configurer dans backend/utils/cache.js

# 2. Compression activée (déjà fait)
# express-compression dans server.js

# 3. PM2 Cluster Mode
pm2 start ecosystem.config.js --env production -i max
```

### Optimisations Frontend

```bash
# 1. Build production optimisé
cd frontend
npm run build

# 2. Analyse bundle
npm run analyze

# 3. CDN pour assets statiques (Vercel automatique)
```

---

## ✅ CHECKLIST DÉPLOIEMENT

### Avant Déploiement

- [ ] Tests unitaires passent (`npm test`)
- [ ] Tests E2E passent (si configurés)
- [ ] Linter passe (`npm run lint`)
- [ ] Build frontend OK (`npm run build`)
- [ ] .env configuré correctement
- [ ] Database initialisée
- [ ] Backup récent existant
- [ ] Documentation à jour

### Déploiement

- [ ] Code deployé sur serveur
- [ ] Dependencies installées
- [ ] .env production configuré
- [ ] PM2 démarré et sauvegardé
- [ ] Nginx configuré
- [ ] SSL certificat actif
- [ ] DNS configuré
- [ ] Monitoring actif

### Après Déploiement

- [ ] Health check OK (`/health`)
- [ ] Frontend accessible
- [ ] API répond correctement
- [ ] Login fonctionne
- [ ] Dashboard affiche les données
- [ ] Logs propres (pas d'erreurs)
- [ ] Performance OK (< 2s chargement)

---

## 🎯 RÉSUMÉ COMMANDES RAPIDES

```bash
# DÉVELOPPEMENT LOCAL
./ULTRA_AUTO.sh              # Mode ultra-autonome absolu
./GO.sh                      # One-liner rapide
npm run dev                  # Dev manuel

# VÉRIFICATION
node test-supabase.js        # Test Supabase
./verify-setup.sh            # Vérification complète
./watch.sh                   # Monitoring temps réel

# PRODUCTION
pm2 start ecosystem.config.js --env production
pm2 save && pm2 startup
pm2 status && pm2 logs

# MAINTENANCE
./auto-fix.sh                # Réparation auto
node backend/scripts/backup.js  # Backup manuel
pm2 restart all              # Restart services
```

---

## 📞 SUPPORT

### Documentation

- **SETUP_RAPIDE.md** - Guide 10 minutes
- **TODO_REMAINING.md** - Tâches restantes
- **ARCHITECTURE.md** - Architecture détaillée
- **API_DOCUMENTATION.md** - Documentation API
- **DEPLOYMENT_GUIDE.md** - Ce fichier

### Logs & Debug

```bash
# Logs complets
pm2 logs

# Debug Supabase
node test-supabase.js

# Status système
./verify-setup.sh
```

---

## 🎉 CONCLUSION

Le système de déploiement Qatar Project Dashboard est conçu pour être **100% autonome** :

✅ **Mode Ultra-Auto** : Lance TOUT automatiquement  
✅ **Scripts d'automatisation** : 10+ scripts disponibles  
✅ **Monitoring temps réel** : Surveillance continue  
✅ **Auto-réparation** : Détecte et corrige les problèmes  
✅ **Documentation exhaustive** : Guides complets  

**Prochaine étape** : Lancer `./ULTRA_AUTO.sh` et le système s'occupe de TOUT ! 🔥

---

**Qatar Project Dashboard v1.0.0**  
**Deployment Guide**  
**24 Décembre 2025**  
**🚀 READY TO DEPLOY**

