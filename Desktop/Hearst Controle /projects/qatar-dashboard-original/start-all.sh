#!/bin/bash

###############################################################################
# ▶️  START ALL - Démarrage complet
# Qatar Dashboard - Hearst Mining
###############################################################################

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${GREEN}🚀 Démarrage Qatar Dashboard...${NC}\n"

PROJECT_DIR="/Users/adrienbeyondcrypto/Desktop/Hearst Control /Qatar-Dashboard"
cd "$PROJECT_DIR"

# Créer dossier logs
mkdir -p logs

# Démarrer backend
if [ -d "backend" ]; then
    echo -e "${BLUE}🔧 Démarrage backend (port 3001)...${NC}"
    cd backend
    npm run dev > ../logs/backend.log 2>&1 &
    echo $! > ../logs/backend.pid
    cd ..
    echo -e "${GREEN}✅ Backend lancé${NC}"
fi

sleep 3

# Démarrer frontend
if [ -d "frontend" ]; then
    echo -e "${BLUE}🎨 Démarrage frontend (port 3000)...${NC}"
    cd frontend
    npm run dev > ../logs/frontend.log 2>&1 &
    echo $! > ../logs/frontend.pid
    cd ..
    echo -e "${GREEN}✅ Frontend lancé${NC}"
fi

sleep 5

# Ouvrir navigateur
echo -e "${BLUE}🌐 Ouverture du navigateur...${NC}"
open "http://localhost:3000" 2>/dev/null || true

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Dashboard lancé avec succès !${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  Frontend : ${GREEN}http://localhost:3000${NC}"
echo -e "  Backend  : ${GREEN}http://localhost:3001${NC}"
echo ""
echo -e "  Login    : ${BLUE}admin@hearstmining.com / Admin123!Hearst${NC}"
echo ""
echo -e "  Logs     : ${BLUE}tail -f logs/backend.log${NC}"
echo ""
echo -e "  Arrêter  : ${BLUE}./stop-all.sh${NC}"
echo ""
