#!/bin/bash

###############################################################################
# ⏹️  STOP ALL - Arrêt complet
# Qatar Dashboard - Hearst Mining
###############################################################################

RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🛑 Arrêt Qatar Dashboard...${NC}\n"

PROJECT_DIR="/Users/adrienbeyondcrypto/Desktop/Hearst Control /Qatar-Dashboard"
cd "$PROJECT_DIR"

# Arrêter backend via PID
if [ -f "logs/backend.pid" ]; then
    BACKEND_PID=$(cat logs/backend.pid)
    if kill -0 $BACKEND_PID 2>/dev/null; then
        kill $BACKEND_PID
        echo -e "${RED}✅ Backend arrêté (PID: $BACKEND_PID)${NC}"
    fi
    rm -f logs/backend.pid
fi

# Arrêter frontend via PID
if [ -f "logs/frontend.pid" ]; then
    FRONTEND_PID=$(cat logs/frontend.pid)
    if kill -0 $FRONTEND_PID 2>/dev/null; then
        kill $FRONTEND_PID
        echo -e "${RED}✅ Frontend arrêté (PID: $FRONTEND_PID)${NC}"
    fi
    rm -f logs/frontend.pid
fi

# Forcer arrêt via nom processus
pkill -f "node.*backend" || true
pkill -f "next dev" || true
pkill -f "npm run dev" || true

# Libérer les ports
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

echo ""
echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${RED}✅ Tous les services sont arrêtés${NC}"
echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
