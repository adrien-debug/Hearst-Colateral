#!/bin/bash

###############################################################################
# 🚀 GO - One-Liner Ultime
# Qatar Dashboard - Hearst Mining
#
# Installation + Lancement en une seule commande
###############################################################################

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}"
echo "╔══════════════════════════════════════════╗"
echo "║                                          ║"
echo "║     🚀 GO - ONE-LINER ULTIME 🚀        ║"
echo "║                                          ║"
echo "╚══════════════════════════════════════════╝"
echo -e "${NC}\n"

PROJECT_DIR="/Users/adrienbeyondcrypto/Desktop/Hearst Control /Qatar-Dashboard"
cd "$PROJECT_DIR"

# Installation
echo -e "${BLUE}📦 Installation des dépendances...${NC}"
[ -d "backend" ] && (cd backend && npm install --silent)
[ -d "frontend" ] && (cd frontend && npm install --silent)

# Vérification Supabase
echo -e "${BLUE}🔍 Vérification Supabase...${NC}"
if [ -f "test-supabase.js" ] && node test-supabase.js 2>/dev/null; then
    echo -e "${GREEN}✅ Supabase OK${NC}\n"
    
    # Lancement
    echo -e "${GREEN}🚀 Lancement du dashboard...${NC}\n"
    ./start-all.sh
else
    echo -e "${YELLOW}⚠️  Supabase pas configuré${NC}"
    echo -e "${YELLOW}📖 Consultez SETUP_RAPIDE.md pour la configuration${NC}\n"
fi
