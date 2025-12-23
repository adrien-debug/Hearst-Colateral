#!/bin/bash

# 🚀 Script de création automatique d'un nouveau projet client
# Basé sur le template Qatar Dashboard
# Hearst Control - Version 1.0.0

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════╗"
echo "║      HEARST CONTROL - NOUVEAU PROJET CLIENT          ║"
echo "║      Création automatique depuis template Qatar      ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Vérifier les arguments
if [ $# -lt 2 ]; then
  echo -e "${RED}❌ Usage: ./create-new-project.sh <project-name> <client-name>${NC}"
  echo ""
  echo "Exemples :"
  echo "  ./create-new-project.sh hearst-aquahash \"Aquahash Mining\""
  echo "  ./create-new-project.sh hearst-texas \"Texas Datacenter\""
  echo ""
  exit 1
fi

PROJECT_NAME=$1
CLIENT_NAME=$2

echo -e "${YELLOW}📋 Configuration :${NC}"
echo "  Project Name : $PROJECT_NAME"
echo "  Client Name  : $CLIENT_NAME"
echo ""

# Confirmation
read -p "Continuer ? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo -e "${RED}❌ Annulé par l'utilisateur${NC}"
  exit 1
fi

# Étape 1 : Créer la structure
echo -e "${BLUE}[1/8] Création de la structure...${NC}"
mkdir -p "projects/$PROJECT_NAME"

if [ ! -d "projects/$PROJECT_NAME" ]; then
  echo -e "${RED}❌ Erreur : Impossible de créer le dossier${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Structure créée${NC}"

# Étape 2 : Copier le template
echo -e "${BLUE}[2/8] Copie du template Qatar Dashboard...${NC}"
if [ ! -d "Qatar-Dashboard" ]; then
  echo -e "${RED}❌ Erreur : Qatar-Dashboard introuvable${NC}"
  exit 1
fi

cp -R "Qatar-Dashboard/"* "projects/$PROJECT_NAME/" 2>/dev/null
cp -R "Qatar-Dashboard/".* "projects/$PROJECT_NAME/" 2>/dev/null || true

echo -e "${GREEN}✅ Template copié${NC}"

# Étape 3 : Nettoyer les données
echo -e "${BLUE}[3/8] Nettoyage des données...${NC}"
cd "projects/$PROJECT_NAME"

# Supprimer logs, caches, modules
rm -rf logs/* backups/* node_modules/ frontend/node_modules/ 2>/dev/null
rm -rf frontend/.next frontend/out frontend/.turbo 2>/dev/null
rm -rf backend/.cache backend/dist 2>/dev/null

echo -e "${GREEN}✅ Données nettoyées${NC}"

# Étape 4 : Renommer dans les fichiers Markdown
echo -e "${BLUE}[4/8] Personnalisation de la documentation...${NC}"

# Remplacer "Qatar" par le nom du client dans tous les MD
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  find . -type f -name "*.md" -exec sed -i '' "s/Qatar/$CLIENT_NAME/g" {} + 2>/dev/null
  find . -type f -name "*.json" -not -path "*/node_modules/*" -exec sed -i '' "s/Qatar/$CLIENT_NAME/g" {} + 2>/dev/null
  find . -type f -name "*.json" -not -path "*/node_modules/*" -exec sed -i '' "s/qatar/$PROJECT_NAME/g" {} + 2>/dev/null
else
  # Linux
  find . -type f -name "*.md" -exec sed -i "s/Qatar/$CLIENT_NAME/g" {} + 2>/dev/null
  find . -type f -name "*.json" -not -path "*/node_modules/*" -exec sed -i "s/Qatar/$CLIENT_NAME/g" {} + 2>/dev/null
  find . -type f -name "*.json" -not -path "*/node_modules/*" -exec sed -i "s/qatar/$PROJECT_NAME/g" {} + 2>/dev/null
fi

echo -e "${GREEN}✅ Documentation personnalisée${NC}"

# Étape 5 : Créer les fichiers .env
echo -e "${BLUE}[5/8] Création des fichiers .env...${NC}"

# Backend .env
if [ -f "backend/.env.example" ]; then
  cp "backend/.env.example" "backend/.env"
  echo -e "${GREEN}✅ backend/.env créé${NC}"
else
  echo -e "${YELLOW}⚠️  backend/.env.example introuvable${NC}"
fi

# Frontend .env.local
if [ -f "frontend/.env.example" ]; then
  cp "frontend/.env.example" "frontend/.env.local"
  echo -e "${GREEN}✅ frontend/.env.local créé${NC}"
else
  echo -e "${YELLOW}⚠️  frontend/.env.example introuvable${NC}"
fi

# Étape 6 : Créer un README personnalisé
echo -e "${BLUE}[6/8] Création du README personnalisé...${NC}"

cat > "README.md" << EOF
# 🚀 $CLIENT_NAME - Dashboard

Dashboard de monitoring et gestion pour le projet $CLIENT_NAME.

**Créé depuis le template Hearst Control - Qatar Dashboard**

---

## 🎯 Vue d'ensemble

Ce projet a été généré automatiquement à partir du template Qatar Dashboard.

### Technologies

**Backend:**
- Node.js 18+ / Express.js
- Supabase (PostgreSQL)
- JWT Authentication

**Frontend:**
- Next.js 14 (App Router)
- React 18 / TypeScript
- Tailwind CSS

---

## ⚡ Démarrage Rapide

### Prérequis

1. Node.js 18+
2. npm ou yarn
3. Compte Supabase

### Installation

\`\`\`bash
# 1. Installer les dépendances
npm install
cd frontend && npm install && cd ..

# 2. Configurer Supabase
# Éditer backend/.env avec vos credentials Supabase
nano backend/.env

# Éditer frontend/.env.local
nano frontend/.env.local

# 3. Initialiser la base de données
# Copier le contenu de database/init.sql dans Supabase SQL Editor
# Adapter le schéma selon vos besoins

# 4. Lancer le projet
./start-all.sh
\`\`\`

### Accès

\`\`\`
🌐 Frontend : http://localhost:3000
🔧 Backend  : http://localhost:3001

🔑 Login    : admin@hearstmining.com
🔒 Password : Admin123!Hearst
\`\`\`

---

## 📝 Configuration

### Backend (.env)

\`\`\`bash
NODE_ENV=development
PORT=3001
SUPABASE_URL=https://[your-project].supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...
JWT_SECRET=[generate-new-secret]
CORS_ORIGIN=http://localhost:3000
\`\`\`

### Frontend (.env.local)

\`\`\`bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_PROJECT_NAME=$PROJECT_NAME
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
\`\`\`

---

## 🔧 Personnalisation

### Étapes suivantes

1. **Adapter le schéma de base de données** : \`database/init.sql\`
2. **Personnaliser les controllers** : \`backend/controllers/\`
3. **Adapter l'UI** : \`frontend/src/components/\`
4. **Mettre à jour la documentation** : Tous les fichiers \`.md\`
5. **Configurer le déploiement** : \`ecosystem.config.js\`, \`docker-compose.yml\`

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **README.md** | Ce fichier (vue d'ensemble) |
| **DEPLOYMENT_GUIDE.md** | Guide de déploiement complet |
| **API_DOCUMENTATION.md** | Documentation API |
| **ARCHITECTURE.md** | Architecture technique |

---

## 🚀 Déploiement

Voir **DEPLOYMENT_GUIDE.md** pour les instructions complètes.

---

**$CLIENT_NAME Dashboard**  
**Généré automatiquement par Hearst Control**  
**$(date +%Y-%m-%d)**
EOF

echo -e "${GREEN}✅ README personnalisé créé${NC}"

# Étape 7 : Créer un fichier de configuration projet
echo -e "${BLUE}[7/8] Création du fichier de configuration...${NC}"

cat > "PROJECT_CONFIG.json" << EOF
{
  "project": {
    "name": "$PROJECT_NAME",
    "client": "$CLIENT_NAME",
    "createdFrom": "Qatar-Dashboard",
    "createdAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "version": "1.0.0"
  },
  "specs": {
    "containers": 0,
    "equipment": 0,
    "hashrate": "TBD",
    "power": "TBD",
    "location": "TBD"
  },
  "status": "setup",
  "notes": [
    "Projet créé automatiquement depuis template Qatar Dashboard",
    "TODO: Configurer Supabase (backend/.env)",
    "TODO: Adapter le schéma database/init.sql",
    "TODO: Personnaliser les controllers backend/controllers/",
    "TODO: Adapter l'UI frontend/src/components/",
    "TODO: Mettre à jour la documentation"
  ]
}
EOF

echo -e "${GREEN}✅ Configuration créée${NC}"

# Étape 8 : Créer un fichier TODO
echo -e "${BLUE}[8/8] Création du TODO...${NC}"

cat > "TODO_SETUP.md" << EOF
# ✅ TODO - Setup $CLIENT_NAME

**Projet créé le** : $(date +%Y-%m-%d)

---

## 🔧 Configuration Initiale

### 1. Supabase

- [ ] Créer un nouveau projet Supabase : https://supabase.com/dashboard
- [ ] Copier l'URL et les clés API
- [ ] Éditer \`backend/.env\` avec les credentials
- [ ] Éditer \`frontend/.env.local\` avec les credentials

### 2. Base de Données

- [ ] Ouvrir Supabase SQL Editor
- [ ] Copier le contenu de \`database/init.sql\`
- [ ] **ADAPTER** le schéma selon les besoins du client
- [ ] Exécuter le script SQL

### 3. Variables d'Environnement

- [ ] Générer un nouveau JWT_SECRET : \`openssl rand -base64 32\`
- [ ] Éditer \`backend/.env\` avec le nouveau secret
- [ ] Vérifier toutes les variables dans les deux .env

---

## 🎨 Personnalisation

### 4. Backend

- [ ] Adapter \`backend/controllers/containersController.js\` (ou renommer)
- [ ] Adapter \`backend/controllers/minersController.js\` (ou renommer)
- [ ] Adapter \`backend/controllers/metricsController.js\`
- [ ] Mettre à jour les routes dans \`backend/routes/\`

### 5. Frontend

- [ ] Adapter le dashboard : \`frontend/src/app/dashboard/page.tsx\`
- [ ] Personnaliser les composants : \`frontend/src/components/\`
- [ ] Adapter le branding (logo, couleurs, nom)
- [ ] Mettre à jour la navbar

### 6. Documentation

- [ ] Mettre à jour \`README.md\` avec specs du client
- [ ] Adapter \`ARCHITECTURE.md\`
- [ ] Adapter \`API_DOCUMENTATION.md\`
- [ ] Vérifier tous les fichiers .md

---

## 🧪 Tests

### 7. Tests Locaux

- [ ] Installer les dépendances : \`npm install\`
- [ ] Lancer le backend : \`cd backend && npm run dev\`
- [ ] Lancer le frontend : \`cd frontend && npm run dev\`
- [ ] Tester le login
- [ ] Tester le dashboard
- [ ] Tester toutes les fonctionnalités

### 8. Tests API

- [ ] Tester tous les endpoints avec Postman/Insomnia
- [ ] Vérifier l'authentification
- [ ] Vérifier les permissions

---

## 🚀 Déploiement

### 9. Préparation Production

- [ ] Créer un projet Supabase production séparé
- [ ] Configurer les variables d'environnement de production
- [ ] Tester le build : \`npm run build\`

### 10. Déploiement

- [ ] Choisir la plateforme (VPS, Docker, Vercel, etc.)
- [ ] Déployer le backend
- [ ] Déployer le frontend
- [ ] Configurer le domaine et SSL/HTTPS

---

## 📝 Documentation

### 11. Finalisation

- [ ] Mettre à jour CHANGELOG.md
- [ ] Compléter PROJECT_CONFIG.json avec les specs finales
- [ ] Créer un guide utilisateur si nécessaire

---

## ✅ Validation Finale

- [ ] Tous les tests passent
- [ ] Documentation complète
- [ ] Backend déployé et fonctionnel
- [ ] Frontend déployé et fonctionnel
- [ ] Client formé sur l'utilisation

---

**Bon courage ! 🚀**
EOF

echo -e "${GREEN}✅ TODO créé${NC}"

# Retour à la racine
cd ../..

# Résumé final
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║              ✅ PROJET CRÉÉ AVEC SUCCÈS !              ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}📁 Projet créé dans :${NC} projects/$PROJECT_NAME"
echo ""
echo -e "${BLUE}📝 PROCHAINES ÉTAPES :${NC}"
echo ""
echo "1️⃣  Configurer Supabase"
echo "   cd \"projects/$PROJECT_NAME\""
echo "   nano backend/.env"
echo ""
echo "2️⃣  Adapter la base de données"
echo "   Ouvrir database/init.sql et personnaliser le schéma"
echo ""
echo "3️⃣  Personnaliser le code"
echo "   Adapter les controllers, UI, documentation"
echo ""
echo "4️⃣  Tester"
echo "   npm install"
echo "   ./start-all.sh"
echo ""
echo "5️⃣  Consulter le TODO"
echo "   cat TODO_SETUP.md"
echo ""
echo -e "${YELLOW}📚 Documentation :${NC}"
echo "   - projects/$PROJECT_NAME/README.md"
echo "   - projects/$PROJECT_NAME/TODO_SETUP.md"
echo "   - projects/$PROJECT_NAME/PROJECT_CONFIG.json"
echo ""
echo -e "${GREEN}🎉 Bon développement !${NC}"
echo ""

