#!/bin/bash

# ============================================
# HEARST CONTROL - Deploy New Project
# Script pour déployer un nouveau projet
# ============================================

set -e

if [ -z "$1" ]; then
    echo "Usage: ./scripts/deploy-project.sh <project-name>"
    echo ""
    echo "Example: ./scripts/deploy-project.sh aquahash"
    echo ""
    exit 1
fi

PROJECT_NAME=$1
PROJECT_ID=$(echo "$PROJECT_NAME" | tr '[:lower:]' '[:upper:]')

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║       🚀 HEARST CONTROL - DEPLOY NEW PROJECT        ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo "📦 Project Name: $PROJECT_NAME"
echo "🆔 Project ID: $PROJECT_ID-001"
echo ""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_DIR="$ROOT_DIR/projects/hearst-$PROJECT_NAME"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# ============================================
# 1. Vérifier si le projet existe déjà
# ============================================

if [ -d "$PROJECT_DIR" ]; then
    echo -e "${YELLOW}⚠️  Project $PROJECT_NAME already exists!${NC}"
    read -p "Overwrite? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled."
        exit 0
    fi
    rm -rf "$PROJECT_DIR"
fi

# ============================================
# 2. Créer la structure du projet
# ============================================

echo -e "${BLUE}📁 Creating project structure...${NC}"

mkdir -p "$PROJECT_DIR"/{backend,frontend,database}

# Backend structure
mkdir -p "$PROJECT_DIR/backend"/{controllers,routes,middleware,utils,scripts}

# Frontend structure (Next.js)
mkdir -p "$PROJECT_DIR/frontend/src"/{app,components,lib}

echo -e "${GREEN}✅ Project structure created${NC}"

# ============================================
# 3. Copier les templates
# ============================================

echo -e "${BLUE}📋 Copying templates...${NC}"

# Copier le backend de référence (Qatar) et adapter
if [ -d "$ROOT_DIR/projects/hearst-qatar-new/backend" ]; then
    cp -r "$ROOT_DIR/projects/hearst-qatar-new/backend/." "$PROJECT_DIR/backend/"
    
    # Adapter les configs
    sed -i '' "s/QATAR/$PROJECT_ID/g" "$PROJECT_DIR/backend/env.example"
    sed -i '' "s/Qatar/$PROJECT_NAME/g" "$PROJECT_DIR/backend/package.json"
fi

# Copier le frontend de référence (Qatar) et adapter
if [ -d "$ROOT_DIR/projects/hearst-qatar-new/frontend" ]; then
    cp -r "$ROOT_DIR/projects/hearst-qatar-new/frontend/." "$PROJECT_DIR/frontend/"
    
    # Adapter les configs
    sed -i '' "s/Qatar/$PROJECT_NAME/g" "$PROJECT_DIR/frontend/package.json"
fi

# Copier le schéma de base de données
if [ -f "$ROOT_DIR/projects/hearst-qatar-new/database/schema.sql" ]; then
    cp "$ROOT_DIR/projects/hearst-qatar-new/database/schema.sql" "$PROJECT_DIR/database/"
    sed -i '' "s/QATAR PROJECT/$PROJECT_ID PROJECT/g" "$PROJECT_DIR/database/schema.sql"
fi

echo -e "${GREEN}✅ Templates copied and adapted${NC}"

# ============================================
# 4. Créer le README du projet
# ============================================

echo -e "${BLUE}📝 Creating project README...${NC}"

cat > "$PROJECT_DIR/README.md" << EOF
# 🏢 HEARST $PROJECT_ID PROJECT

**$PROJECT_NAME Mining Project - Hearst Control Platform**

---

## 📊 Project Information

- **Project ID**: $PROJECT_ID-001
- **Name**: Hearst $PROJECT_NAME
- **Status**: 🚧 In Development
- **Location**: TBD

---

## 🚀 Quick Start

### Backend

\`\`\`bash
cd backend
cp env.example .env
# Configure .env file
npm install
npm start
\`\`\`

Backend will run on **http://localhost:3002**

### Frontend

\`\`\`bash
cd frontend
cp env.example .env.local
# Configure .env.local file
npm install
npm run dev
\`\`\`

Frontend will run on **http://localhost:3100**

---

## 🗄️ Database Setup

\`\`\`bash
# Run the SQL schema in your Supabase project
psql -f database/schema.sql
\`\`\`

---

## 📚 Documentation

See main Hearst Control documentation in root folder.

---

**Hearst Control - $PROJECT_NAME Project**  
**Created: $(date +%Y-%m-%d)**
EOF

echo -e "${GREEN}✅ README created${NC}"

# ============================================
# 5. Instructions finales
# ============================================

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║           ✅ PROJECT DEPLOYED SUCCESSFULLY           ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo "📁 Project location: projects/hearst-$PROJECT_NAME"
echo ""
echo "📋 Next steps:"
echo ""
echo "  1. Configure backend/.env file"
echo "  2. Configure frontend/.env.local file"
echo "  3. Run database/schema.sql in Supabase"
echo "  4. Add project to database/central-schema.sql"
echo "  5. Install dependencies (npm install in backend and frontend)"
echo "  6. Start services with ./scripts/start-all.sh"
echo ""
echo "📖 See projects/hearst-$PROJECT_NAME/README.md for details"
echo ""

