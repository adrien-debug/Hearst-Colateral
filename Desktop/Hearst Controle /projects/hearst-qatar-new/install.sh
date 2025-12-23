#!/bin/bash

###############################################################################
# 📦 INSTALL - Installation complète autonome
# Qatar Dashboard - Hearst Mining
#
# Installation de toutes les dépendances backend et frontend
###############################################################################

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════╗"
echo "║                                          ║"
echo "║     📦 INSTALLATION AUTONOME 📦        ║"
echo "║                                          ║"
echo "╚══════════════════════════════════════════╝"
echo -e "${NC}\n"

PROJECT_DIR="/Users/adrienbeyondcrypto/Desktop/Hearst Control /Qatar-Dashboard"
cd "$PROJECT_DIR"

# ================================
# VÉRIFICATION NODE.JS
# ================================
echo -e "${BLUE}🔍 Vérification Node.js...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    echo -e "${YELLOW}📥 Installation recommandée : https://nodejs.org/${NC}"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js ${NODE_VERSION} détecté${NC}\n"

# ================================
# INSTALLATION BACKEND
# ================================
if [ -d "backend" ]; then
    echo -e "${BLUE}📦 Installation backend...${NC}"
    cd backend
    
    # Nettoyer node_modules si existe
    if [ -d "node_modules" ]; then
        echo -e "${YELLOW}🗑️  Nettoyage node_modules...${NC}"
        rm -rf node_modules package-lock.json
    fi
    
    # Installer
    npm install
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Backend installé avec succès${NC}\n"
    else
        echo -e "${RED}❌ Erreur installation backend${NC}"
        exit 1
    fi
    
    cd ..
fi

# ================================
# INSTALLATION FRONTEND
# ================================
if [ -d "frontend" ]; then
    echo -e "${BLUE}📦 Installation frontend...${NC}"
    cd frontend
    
    # Nettoyer node_modules si existe
    if [ -d "node_modules" ]; then
        echo -e "${YELLOW}🗑️  Nettoyage node_modules...${NC}"
        rm -rf node_modules package-lock.json
    fi
    
    # Installer
    npm install
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Frontend installé avec succès${NC}\n"
    else
        echo -e "${RED}❌ Erreur installation frontend${NC}"
        exit 1
    fi
    
    cd ..
fi

# ================================
# CRÉATION DOSSIERS
# ================================
echo -e "${BLUE}📁 Création des dossiers...${NC}"
mkdir -p logs backups exports/zotto
echo -e "${GREEN}✅ Dossiers créés${NC}\n"

# ================================
# VÉRIFICATION .ENV
# ================================
echo -e "${BLUE}⚙️  Vérification fichiers .env...${NC}"

if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  backend/.env manquant${NC}"
    if [ -f "backend/.env.example" ]; then
        cp backend/.env.example backend/.env
        echo -e "${GREEN}✅ backend/.env créé depuis .env.example${NC}"
    fi
fi

if [ ! -f "frontend/.env.local" ]; then
    echo -e "${YELLOW}⚠️  frontend/.env.local manquant${NC}"
    if [ -f "frontend/.env.local.example" ]; then
        cp frontend/.env.local.example frontend/.env.local
        echo -e "${GREEN}✅ frontend/.env.local créé depuis .env.local.example${NC}"
    fi
fi

echo ""

# ================================
# RÉSUMÉ
# ================================
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ INSTALLATION TERMINÉE AVEC SUCCÈS !${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}📋 Prochaines étapes :${NC}"
echo ""
echo -e "  1. ${YELLOW}Configurer Supabase${NC} (si pas déjà fait)"
echo "     → Consultez SETUP_RAPIDE.md (5 minutes)"
echo ""
echo -e "  2. ${YELLOW}Lancer le dashboard${NC}"
echo "     → ./start-all.sh"
echo ""
echo -e "${BLUE}🚀 Pour un lancement automatique ultra-rapide :${NC}"
echo "     → ./ULTRA_AUTO.sh"
echo ""
