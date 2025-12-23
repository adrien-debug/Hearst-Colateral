#!/bin/bash

# ============================================
# HEARST CONTROL - Start All Projects
# Démarre le backend central + tous les projets actifs
# ============================================

set -e

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║       🏢 HEARST CONTROL - START ALL PROJECTS        ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# ============================================
# 1. Démarrer Backend Central
# ============================================

echo -e "${BLUE}📡 Starting Hearst Control Central Backend...${NC}"

cd "$ROOT_DIR/backend-central"

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  No .env file found. Creating from .env.example...${NC}"
    cp env.example .env
    echo -e "${YELLOW}⚠️  Please configure .env file before starting!${NC}"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🚀 Starting backend on port 4000..."
nohup npm start > ../logs/backend-central.log 2>&1 &
BACKEND_PID=$!
echo "$BACKEND_PID" > ../logs/backend-central.pid

echo -e "${GREEN}✅ Backend Central started (PID: $BACKEND_PID)${NC}"
echo ""

# Attendre que le backend démarre
sleep 3

# ============================================
# 2. Démarrer Projet Qatar
# ============================================

echo -e "${BLUE}🇶🇦 Starting Qatar Project...${NC}"

if [ -d "$ROOT_DIR/projects/hearst-qatar-new" ]; then
    cd "$ROOT_DIR/projects/hearst-qatar-new"
    
    # Backend Qatar (port 3001)
    if [ -d "backend" ]; then
        cd backend
        if [ ! -d "node_modules" ]; then
            npm install
        fi
        nohup npm start > ../../logs/qatar-backend.log 2>&1 &
        QATAR_BACKEND_PID=$!
        echo "$QATAR_BACKEND_PID" > ../../logs/qatar-backend.pid
        echo -e "${GREEN}  ✅ Qatar Backend started (PID: $QATAR_BACKEND_PID)${NC}"
        cd ..
    fi
    
    # Frontend Qatar (port 3000)
    if [ -d "frontend" ]; then
        cd frontend
        if [ ! -d "node_modules" ]; then
            npm install
        fi
        nohup npm run dev > ../../logs/qatar-frontend.log 2>&1 &
        QATAR_FRONTEND_PID=$!
        echo "$QATAR_FRONTEND_PID" > ../../logs/qatar-frontend.pid
        echo -e "${GREEN}  ✅ Qatar Frontend started (PID: $QATAR_FRONTEND_PID)${NC}"
        cd ..
    fi
else
    echo -e "${YELLOW}  ⚠️  Qatar project not found${NC}"
fi

echo ""

# ============================================
# 3. Démarrer Projet Aquahash (si existe)
# ============================================

echo -e "${BLUE}🌊 Checking Aquahash Project...${NC}"

if [ -d "$ROOT_DIR/projects/hearst-aquahash" ]; then
    echo "Starting Aquahash Project..."
    # À implémenter quand le projet Aquahash sera créé
    echo -e "${YELLOW}  ⚠️  Aquahash project found but not configured yet${NC}"
else
    echo -e "${YELLOW}  ⚠️  Aquahash project not found (planned)${NC}"
fi

echo ""

# ============================================
# Résumé
# ============================================

echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║               ✅ ALL SERVICES STARTED                ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo "🌐 Access URLs:"
echo ""
echo "   Central Backend:   http://localhost:4000"
echo "   Central Dashboard: http://localhost:4100 (to implement)"
echo ""
echo "   Qatar Backend:     http://localhost:3001"
echo "   Qatar Frontend:    http://localhost:3000"
echo ""
echo "📊 Logs:"
echo "   Central: tail -f logs/backend-central.log"
echo "   Qatar:   tail -f logs/qatar-backend.log"
echo ""
echo "🛑 To stop all services: ./scripts/stop-all.sh"
echo ""

