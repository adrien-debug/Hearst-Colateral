# 🚀 GUIDE NOUVEAU PROJET CLIENT - HEARST CONTROL

**Date** : 24 Décembre 2025  
**Version** : 1.0.0

---

## 🎯 QUESTION CLÉ

> **"Que faut-il mettre en place pour qu'un nouveau client commence à développer son infrastructure ? Est-ce qu'on doit tout redévelopper ?"**

### ✅ RÉPONSE COURTE

**NON**, vous ne devez **PAS tout redévelopper** ! 

L'architecture Hearst Control est conçue pour :
- ✅ **Réutiliser 70-80%** du code existant (Qatar Dashboard)
- ✅ **Personnaliser 20-30%** selon les specs du client
- ✅ **Livrer en 2-4 semaines** au lieu de 8-12 semaines

---

## 📊 CE QUI PEUT ÊTRE RÉUTILISÉ VS REDÉVELOPPÉ

### ✅ RÉUTILISABLE À 100% (Template Qatar Dashboard)

| Composant | Détails | Action |
|-----------|---------|--------|
| **Architecture Backend** | Express.js, structure MVC | ✅ Copier tel quel |
| **Architecture Frontend** | Next.js 14, React 18, TypeScript | ✅ Copier tel quel |
| **Authentification** | JWT, middleware auth, gestion rôles | ✅ Copier tel quel |
| **Base de données** | Structure Supabase, schéma SQL | ⚠️ Adapter schéma |
| **API Structure** | Routes, controllers, middleware | ✅ Copier structure |
| **Scripts Automation** | PM2, Docker, CI/CD | ✅ Copier tel quel |
| **Documentation** | Templates MD (20 fichiers) | ⚠️ Adapter contenu |
| **Configuration** | .env, ecosystem.config.js | ⚠️ Adapter valeurs |
| **Tests** | Jest, structure tests | ✅ Copier structure |
| **UI Components** | Composants React réutilisables | ✅ Copier + adapter |

### ⚠️ À PERSONNALISER (20-30% du travail)

| Composant | Ce qui change | Effort |
|-----------|---------------|--------|
| **Modèle de données** | Tables spécifiques au client | Moyen |
| **Logique métier** | Controllers adaptés aux besoins | Moyen |
| **UI/UX** | Design, branding, fonctionnalités | Moyen |
| **Variables d'env** | Credentials, configs, ports | Faible |
| **Documentation** | Contenu spécifique au projet | Faible |
| **Tests** | Tests métier spécifiques | Moyen |

### ❌ JAMAIS REDÉVELOPPER

- ❌ **Système d'authentification** (déjà production-ready)
- ❌ **Structure de projet** (déjà optimisée)
- ❌ **Scripts d'automatisation** (déjà testés)
- ❌ **Configuration PM2/Docker** (déjà optimisée)
- ❌ **CI/CD pipeline** (déjà fonctionnel)

---

## 🏗️ PROCESSUS DE CRÉATION NOUVEAU PROJET

### Phase 1 : Découverte Client (1 semaine)

#### 1.1 Collecte d'informations
```markdown
Client : [Nom du client]
Projet : [Nom du projet]
Industrie : [Mining / Autre]

📊 SPECS TECHNIQUES :
- Nombre de containers : [X]
- Nombre d'équipements : [X]
- Type d'équipements : [Modèle]
- Hashrate total : [X EH/s] (si mining)
- Puissance : [X MW]
- Location : [Pays/Ville]

📋 FONCTIONNALITÉS REQUISES :
- [ ] Dashboard temps réel
- [ ] Gestion containers
- [ ] Gestion équipements
- [ ] Métriques historiques
- [ ] Alertes
- [ ] Export rapports
- [ ] Mobile responsive
- [ ] Multi-utilisateurs
- [ ] Autres : [...]

🔐 SÉCURITÉ :
- [ ] Authentication (JWT / OAuth / SAML)
- [ ] Rôles : [admin, manager, operator, viewer]
- [ ] 2FA requis ?
- [ ] SSO requis ?
- [ ] Audit logs ?

📈 PERFORMANCE :
- Nombre d'utilisateurs simultanés : [X]
- Fréquence refresh : [X secondes]
- Volume de données : [X GB/jour]
```

#### 1.2 Validation Budget/Timeline
```markdown
Budget : [X]
Timeline : [X semaines]
Niveau service : Bronze / Silver / Gold

Bronze  : 2-4 semaines  (MVP rapide)
Silver  : 6-8 semaines  (Professionnel)
Gold    : 10-12 semaines (Enterprise)
```

---

### Phase 2 : Setup Initial (1-2 jours)

#### 2.1 Créer la structure projet

```bash
# 1. Créer le dossier du nouveau projet
PROJECT_NAME="hearst-nouveau-client"  # Adapter
cd "/Users/adrienbeyondcrypto/Desktop/Hearst Controle "
mkdir -p "projects/$PROJECT_NAME"

# 2. Copier le template depuis Qatar Dashboard
cp -R "Qatar-Dashboard/" "projects/$PROJECT_NAME/"

# 3. Nettoyer les données Qatar
cd "projects/$PROJECT_NAME"
rm -rf logs/* backups/* node_modules/ frontend/node_modules/
rm -rf frontend/.next frontend/out

# 4. Renommer le projet
# Modifier tous les fichiers pour remplacer "Qatar" par le nouveau nom
```

#### 2.2 Configurer les variables

**Backend (.env)**
```bash
# Copier le template
cp backend/.env.example backend/.env

# Éditer avec les valeurs du client
nano backend/.env
```

Personnaliser :
```env
# Application
NODE_ENV=development
PORT=3001                                    # ⚠️ Peut changer si multi-projets
PROJECT_NAME=hearst-nouveau-client           # ⚠️ NOUVEAU

# Supabase (créer nouveau projet Supabase)
SUPABASE_URL=https://[projet-client].supabase.co     # ⚠️ NOUVEAU
SUPABASE_ANON_KEY=eyJ...                              # ⚠️ NOUVEAU
SUPABASE_SERVICE_KEY=eyJ...                           # ⚠️ NOUVEAU

# JWT (générer nouveau secret)
JWT_SECRET=[nouveau-secret-unique]                    # ⚠️ NOUVEAU

# CORS
CORS_ORIGIN=http://localhost:3000            # ⚠️ Adapter selon frontend
```

**Frontend (.env.local)**
```bash
cp frontend/.env.example frontend/.env.local
nano frontend/.env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:3001    # ⚠️ Adapter
NEXT_PUBLIC_PROJECT_NAME=nouveau-client      # ⚠️ NOUVEAU
NEXT_PUBLIC_SUPABASE_URL=https://[...].supabase.co   # ⚠️ NOUVEAU
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...         # ⚠️ NOUVEAU
```

#### 2.3 Configurer Supabase

```bash
# 1. Créer nouveau projet Supabase
# → https://supabase.com/dashboard

# 2. Copier le schéma SQL depuis Qatar
cat database/init.sql

# 3. Adapter le schéma au client
# - Modifier table "containers" si le client gère autre chose
# - Modifier table "miners" selon l'équipement du client
# - Adapter les métriques

# 4. Exécuter le schéma dans Supabase
# → SQL Editor dans Supabase Dashboard
```

---

### Phase 3 : Personnalisation (1-3 semaines)

#### 3.1 Modèle de données

**Ce qui doit changer** :
```sql
-- Exemple : Si le client gère des serveurs au lieu de mineurs

-- Qatar Dashboard avait :
CREATE TABLE miners (
  id UUID PRIMARY KEY,
  container_id UUID,
  model VARCHAR(50),  -- "S21XP Hydro"
  hashrate DECIMAL,
  power_consumption DECIMAL,
  ...
);

-- Nouveau client (serveurs) :
CREATE TABLE servers (
  id UUID PRIMARY KEY,
  rack_id UUID,           -- Équivalent de container_id
  model VARCHAR(50),      -- "Dell PowerEdge R750"
  cpu_usage DECIMAL,      -- Remplace hashrate
  memory_usage DECIMAL,
  disk_usage DECIMAL,
  ...
);
```

#### 3.2 Backend - Adapter les Controllers

**Fichiers à modifier** :
```
backend/
├── controllers/
│   ├── containersController.js  → ⚠️ Adapter logique métier
│   ├── minersController.js      → ⚠️ Renommer + adapter
│   ├── metricsController.js     → ⚠️ Adapter métriques
│   └── authController.js        → ✅ Garder tel quel
```

**Exemple d'adaptation** :
```javascript
// Qatar Dashboard (miners)
exports.getAllMiners = async (req, res) => {
  const { data, error } = await supabase
    .from('miners')
    .select('*');
  // ...
};

// Nouveau client (servers)
exports.getAllServers = async (req, res) => {
  const { data, error } = await supabase
    .from('servers')
    .select('*');
  // ...
};
```

#### 3.3 Frontend - Adapter les Composants

**Fichiers à modifier** :
```
frontend/src/
├── app/
│   ├── dashboard/page.tsx      → ⚠️ Adapter métriques
│   └── login/page.tsx          → ✅ Garder tel quel
├── components/
│   ├── ContainerCard.tsx       → ⚠️ Adapter UI
│   ├── MinersList.tsx          → ⚠️ Renommer + adapter
│   └── Navbar.tsx              → ⚠️ Adapter branding
```

**Exemple d'adaptation** :
```typescript
// Qatar Dashboard
const MinerCard = ({ miner }) => (
  <div>
    <h3>{miner.model}</h3>
    <p>Hashrate: {miner.hashrate} TH/s</p>
    <p>Power: {miner.power_consumption} W</p>
  </div>
);

// Nouveau client
const ServerCard = ({ server }) => (
  <div>
    <h3>{server.model}</h3>
    <p>CPU: {server.cpu_usage}%</p>
    <p>Memory: {server.memory_usage}%</p>
  </div>
);
```

#### 3.4 Documentation - Mettre à jour

**Fichiers à personnaliser** :
```markdown
README.md                    → ⚠️ Remplacer specs Qatar par nouveau client
ARCHITECTURE.md             → ⚠️ Adapter diagrammes et descriptions
API_DOCUMENTATION.md        → ⚠️ Adapter endpoints (miners → servers)
DEPLOYMENT_GUIDE.md         → ⚠️ Adapter configs spécifiques
SETUP_RAPIDE.md            → ⚠️ Vérifier steps (généralement OK)
```

**Script de remplacement rapide** :
```bash
# Remplacer toutes les occurrences
find . -type f -name "*.md" -exec sed -i '' 's/Qatar/NouveauClient/g' {} +
find . -type f -name "*.md" -exec sed -i '' 's/miners/servers/g' {} +
find . -type f -name "*.md" -exec sed -i '' 's/S21XP Hydro/Dell PowerEdge/g' {} +
```

---

### Phase 4 : Tests & Validation (3-5 jours)

#### 4.1 Tests Backend
```bash
cd backend

# Tests unitaires
npm test

# Tests endpoints
npm run test:api

# Tests Supabase
node scripts/testSupabase.js
```

#### 4.2 Tests Frontend
```bash
cd frontend

# Tests composants
npm test

# Build production
npm run build

# Vérifier pas d'erreurs
```

#### 4.3 Tests E2E
```bash
# Lancer le projet
./start-all.sh

# Tester manuellement :
# - Login : http://localhost:3000
# - Dashboard : Vérifier toutes les métriques
# - CRUD : Créer/modifier/supprimer équipements
# - API : Tester tous les endpoints
```

---

### Phase 5 : Déploiement (2-3 jours)

#### 5.1 Préparer Production

**Backend (.env.production)**
```env
NODE_ENV=production
PORT=3001
SUPABASE_URL=https://[prod].supabase.co
SUPABASE_SERVICE_KEY=[prod-key]
JWT_SECRET=[prod-secret-securise]
CORS_ORIGIN=https://client.com
```

**Frontend (.env.production)**
```env
NEXT_PUBLIC_API_URL=https://api.client.com
NEXT_PUBLIC_SUPABASE_URL=https://[prod].supabase.co
```

#### 5.2 Déployer

**Option 1 : VPS (Hetzner, DigitalOcean, AWS)**
```bash
# 1. Copier le projet sur le serveur
scp -r projects/hearst-nouveau-client user@server:/var/www/

# 2. SSH sur le serveur
ssh user@server

# 3. Installer dépendances
cd /var/www/hearst-nouveau-client
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# 4. Lancer avec PM2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

**Option 2 : Docker**
```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Lancer
docker-compose -f docker-compose.prod.yml up -d
```

**Option 3 : Vercel (Frontend) + Railway/Render (Backend)**
```bash
# Frontend
cd frontend
vercel --prod

# Backend
# Connecter le repo à Railway/Render
# Configurer les variables d'environnement
# Déployer
```

---

## 📦 STRUCTURE FINALE DU PROJET CLIENT

```
Hearst Control/
│
├── projects/                                    ← TOUS LES PROJETS CLIENTS
│   │
│   ├── hearst-qatar/                           ← Projet #1 (template)
│   │   ├── backend/
│   │   ├── frontend/
│   │   ├── database/
│   │   ├── docs/
│   │   └── README.md
│   │
│   ├── hearst-nouveau-client/                  ← Projet #2 (nouveau)
│   │   ├── backend/
│   │   │   ├── controllers/
│   │   │   │   ├── authController.js          ✅ Réutilisé
│   │   │   │   ├── serversController.js       ⚠️ Adapté (était minersController)
│   │   │   │   ├── racksController.js         ⚠️ Adapté (était containersController)
│   │   │   │   └── metricsController.js       ⚠️ Adapté
│   │   │   ├── routes/                        ⚠️ Adaptées
│   │   │   ├── middleware/                    ✅ Réutilisés
│   │   │   ├── utils/                         ✅ Réutilisés
│   │   │   └── server.js                      ✅ Réutilisé
│   │   │
│   │   ├── frontend/
│   │   │   ├── src/
│   │   │   │   ├── app/
│   │   │   │   │   ├── dashboard/             ⚠️ Adapté
│   │   │   │   │   └── login/                 ✅ Réutilisé
│   │   │   │   ├── components/
│   │   │   │   │   ├── ServerCard.tsx         ⚠️ Adapté (était MinerCard)
│   │   │   │   │   ├── RacksList.tsx          ⚠️ Adapté (était ContainersList)
│   │   │   │   │   └── Navbar.tsx             ⚠️ Adapté (branding)
│   │   │   │   ├── contexts/                  ✅ Réutilisés
│   │   │   │   ├── hooks/                     ✅ Réutilisés
│   │   │   │   └── lib/                       ✅ Réutilisés
│   │   │
│   │   ├── database/
│   │   │   └── init.sql                       ⚠️ Adapté schéma
│   │   │
│   │   ├── docs/
│   │   │   ├── README.md                      ⚠️ Personnalisé
│   │   │   ├── ARCHITECTURE.md                ⚠️ Adapté
│   │   │   ├── API_DOCUMENTATION.md           ⚠️ Adapté
│   │   │   └── DEPLOYMENT_GUIDE.md            ⚠️ Adapté
│   │   │
│   │   ├── .env.example                       ⚠️ Adapté
│   │   ├── ecosystem.config.js                ✅ Réutilisé
│   │   ├── docker-compose.yml                 ✅ Réutilisé
│   │   └── package.json                       ✅ Réutilisé
│   │
│   └── hearst-client-3/                        ← Projet #3 (futur)
│       └── ...
│
└── core/                                       ← CODE COMMUN (futur)
    ├── auth/                                   ← Auth partagée
    ├── monitoring/                             ← Monitoring partagé
    └── components/                             ← UI components partagés
```

---

## ⏱️ ESTIMATION TEMPS PAR PHASE

| Phase | Description | Temps | Effort |
|-------|-------------|-------|--------|
| **Phase 1** | Découverte client | 3-5 jours | Faible |
| **Phase 2** | Setup initial | 1-2 jours | Faible |
| **Phase 3** | Personnalisation | 7-15 jours | **Moyen-Élevé** |
| **Phase 4** | Tests & validation | 3-5 jours | Moyen |
| **Phase 5** | Déploiement | 2-3 jours | Moyen |
| **TOTAL** | | **3-6 semaines** | |

### Comparaison

| Scénario | Temps | Effort |
|----------|-------|--------|
| **Développement from scratch** | 8-12 semaines | 100% |
| **Avec template Qatar** | 3-6 semaines | **30-40%** |
| **Gain de temps** | **50-60%** | **Économie massive** |

---

## 🎯 CHECKLIST LIVRAISON CLIENT

### Documentation (10 fichiers minimum)
- [ ] **README.md** - Adapté au client
- [ ] **ARCHITECTURE.md** - Diagrammes personnalisés
- [ ] **SETUP.md** - Guide installation
- [ ] **SETUP_RAPIDE.md** - Quick start
- [ ] **API_DOCUMENTATION.md** - Endpoints adaptés
- [ ] **DEPLOYMENT_GUIDE.md** - Guide déploiement
- [ ] **SECURITY.md** - Guide sécurité
- [ ] **CONTRIBUTING.md** - Standards
- [ ] **CHANGELOG.md** - Versions
- [ ] **TODO.md** - Roadmap

### Code
- [ ] **Backend** - Controllers adaptés
- [ ] **Frontend** - UI personnalisée
- [ ] **Database** - Schéma adapté
- [ ] **Tests** - Tests fonctionnels
- [ ] **Scripts** - Automation

### Configuration
- [ ] **.env.example** - Variables documentées
- [ ] **ecosystem.config.js** - PM2 configuré
- [ ] **Dockerfile** - Image optimisée
- [ ] **docker-compose.yml** - Stack complète
- [ ] **.eslintrc.json** - Linting
- [ ] **.prettierrc** - Formatting

### Infrastructure
- [ ] **CI/CD** - Pipeline configuré
- [ ] **Logs** - Structure créée
- [ ] **Backups** - Scripts automatiques
- [ ] **Monitoring** - Health checks

### Sécurité
- [ ] **Authentication** - JWT configuré
- [ ] **Authorization** - Rôles adaptés
- [ ] **HTTPS** - Certificats configurés
- [ ] **Rate limiting** - Protection API
- [ ] **Secrets** - Gestion sécurisée

### Déploiement
- [ ] **Production** - Environnement configuré
- [ ] **Staging** - Environnement de test
- [ ] **CI/CD** - Déploiement automatisé
- [ ] **Monitoring** - Alertes configurées

### Formation
- [ ] **Documentation** - Complète et claire
- [ ] **Training session** - Équipe client formée
- [ ] **Handover** - Code et infrastructure transférés

---

## 💡 BONNES PRATIQUES

### 1. Ne jamais redévelopper ce qui existe
```bash
✅ Copier le template Qatar Dashboard
✅ Adapter les 20-30% qui changent
✅ Garder l'architecture éprouvée
❌ Réécrire l'authentification
❌ Refaire la structure de projet
❌ Réinventer les scripts automation
```

### 2. Utiliser un naming cohérent
```javascript
// Mauvais
const data = getData();
const stuff = processStuff();

// Bon
const servers = getServers();
const processedMetrics = processServerMetrics(servers);
```

### 3. Documenter les changements
```markdown
# CHANGELOG.md

## v1.0.0 - [Date]
### Adapté depuis Qatar Dashboard
- ✅ Remplacé "miners" par "servers"
- ✅ Adapté métriques (hashrate → CPU usage)
- ✅ Personnalisé branding client
```

### 4. Tester avant de livrer
```bash
# Tests critiques
npm test                    # Tests unitaires
npm run test:api           # Tests API
npm run build              # Build production
./start-all.sh             # Test complet
```

---

## 📊 RÉSUMÉ : CE QUI CHANGE VS CE QUI NE CHANGE PAS

### ✅ NE CHANGE JAMAIS (Copier tel quel)

| Composant | Détails |
|-----------|---------|
| **Architecture** | Structure MVC, organisation dossiers |
| **Authentication** | JWT, middleware, gestion sessions |
| **Scripts** | PM2, Docker, CI/CD, automation |
| **Utils** | Helpers, formatters, validators |
| **Middleware** | Auth, logs, errors, validation |
| **Configuration structure** | .env, ecosystem.config.js, docker-compose.yml |
| **Frontend structure** | App Router, hooks, contexts, services |
| **Tests structure** | Jest config, test helpers |

### ⚠️ TOUJOURS ADAPTÉ (Personnaliser)

| Composant | Ce qui change |
|-----------|---------------|
| **Modèle de données** | Tables, colonnes, relations selon métier client |
| **Controllers** | Logique métier spécifique |
| **Routes** | Endpoints adaptés au domaine |
| **UI Components** | Affichage des données du client |
| **Documentation** | Contenu spécifique au projet |
| **Variables d'env** | Credentials, URLs, configs |
| **Branding** | Logo, couleurs, nom du projet |

### 🔄 PARFOIS ADAPTÉ (Selon besoins)

| Composant | Quand adapter |
|-----------|---------------|
| **Métriques** | Si KPIs différents (CPU vs hashrate) |
| **Permissions** | Si rôles différents |
| **API endpoints** | Si fonctionnalités supplémentaires |
| **Frontend pages** | Si workflows différents |
| **Tests** | Si logique métier complexe |

---

## 🚀 COMMANDES RAPIDES

### Créer nouveau projet depuis template

```bash
#!/bin/bash
# create-new-project.sh

PROJECT_NAME=$1
CLIENT_NAME=$2

# Valider les arguments
if [ -z "$PROJECT_NAME" ]; then
  echo "❌ Usage: ./create-new-project.sh <project-name> <client-name>"
  exit 1
fi

echo "🚀 Création du projet $PROJECT_NAME pour $CLIENT_NAME..."

# 1. Créer structure
mkdir -p "projects/$PROJECT_NAME"

# 2. Copier template
cp -R "Qatar-Dashboard/" "projects/$PROJECT_NAME/"

# 3. Nettoyer
cd "projects/$PROJECT_NAME"
rm -rf logs/* backups/* node_modules/ frontend/node_modules/
rm -rf frontend/.next frontend/out

# 4. Renommer dans les fichiers
find . -type f -name "*.md" -exec sed -i '' "s/Qatar/$CLIENT_NAME/g" {} +
find . -type f -name "*.json" -exec sed -i '' "s/Qatar/$CLIENT_NAME/g" {} +

# 5. Créer .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

echo "✅ Projet créé dans projects/$PROJECT_NAME"
echo "📝 Prochaines étapes :"
echo "  1. Éditer backend/.env avec credentials Supabase"
echo "  2. Éditer frontend/.env.local"
echo "  3. Adapter database/init.sql"
echo "  4. Personnaliser les controllers et UI"
```

**Usage** :
```bash
chmod +x create-new-project.sh
./create-new-project.sh hearst-nouveau-client "Nouveau Client"
```

---

## 📞 SUPPORT

### Questions fréquentes

**Q : Dois-je créer un nouveau projet Supabase ?**  
✅ Oui, un projet Supabase séparé par client pour isolation complète.

**Q : Puis-je réutiliser le même JWT secret ?**  
❌ Non, générer un nouveau secret unique par projet pour sécurité.

**Q : Les ports 3000/3001 sont déjà pris, que faire ?**  
✅ Changer les ports dans .env : `PORT=3003` (backend), `NEXT_PORT=3002` (frontend)

**Q : Comment gérer plusieurs projets sur un même serveur ?**  
✅ Utiliser un reverse proxy (Nginx) avec virtual hosts.

**Q : Faut-il vraiment copier tout le code ?**  
✅ Oui pour l'instant. À terme, extraire le code commun dans `core/`.

---

## 🎯 CONCLUSION

### ✅ CE QU'IL FAUT RETENIR

1. **Ne redéveloppez PAS tout** - Utilisez le template Qatar Dashboard
2. **70-80% du code est réutilisable** - Seuls 20-30% à adapter
3. **Gain de temps massif** - 3-6 semaines au lieu de 8-12 semaines
4. **Architecture éprouvée** - Production-ready, testée, documentée
5. **Process standardisé** - Même qualité pour tous les clients

### 📦 LIVRABLES STANDARDS

Chaque nouveau projet client inclut :
- ✅ Code source complet (backend + frontend)
- ✅ Documentation exhaustive (10+ fichiers MD)
- ✅ Configuration production (PM2, Docker, CI/CD)
- ✅ Database schema adapté
- ✅ Tests automatisés
- ✅ Scripts d'automatisation
- ✅ Formation équipe client
- ✅ Support post-livraison

### 🚀 PROCHAINES ÉTAPES

1. **Identifier le nouveau client** - Collecter specs et besoins
2. **Exécuter le script de création** - `./create-new-project.sh`
3. **Adapter le code** - Personnaliser les 20-30%
4. **Tester** - Validation complète
5. **Déployer** - Production ready
6. **Former** - Handover au client

---

**Hearst Control - Guide Nouveau Projet Client**  
**Version 1.0.0 - 24 Décembre 2025**

**Questions ? Besoin d'aide ?**  
Consulter : `HEARST_CLIENT_PACKAGE.md` et `ARCHITECTURE_GLOBALE.md`

