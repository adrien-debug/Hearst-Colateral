#!/bin/bash

# ============================================
# HEARST CONTROL - Stop All Projects
# Arrête tous les services
# ============================================

set -e

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║       🛑 HEARST CONTROL - STOP ALL PROJECTS         ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
LOGS_DIR="$ROOT_DIR/logs"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# ============================================
# Fonction pour arrêter un service
# ============================================

stop_service() {
    local SERVICE_NAME=$1
    local PID_FILE=$2
    
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p $PID > /dev/null 2>&1; then
            echo -e "${YELLOW}Stopping $SERVICE_NAME (PID: $PID)...${NC}"
            kill $PID
            sleep 2
            # Force kill si nécessaire
            if ps -p $PID > /dev/null 2>&1; then
                echo -e "${RED}Force killing $SERVICE_NAME...${NC}"
                kill -9 $PID
            fi
            rm "$PID_FILE"
            echo -e "${GREEN}✅ $SERVICE_NAME stopped${NC}"
        else
            echo -e "${YELLOW}$SERVICE_NAME not running${NC}"
            rm "$PID_FILE"
        fi
    else
        echo -e "${YELLOW}$SERVICE_NAME PID file not found${NC}"
    fi
}

# ============================================
# Arrêter tous les services
# ============================================

if [ ! -d "$LOGS_DIR" ]; then
    echo "No logs directory found. No services to stop."
    exit 0
fi

cd "$LOGS_DIR"

# Backend Central
stop_service "Backend Central" "backend-central.pid"

# Qatar Backend
stop_service "Qatar Backend" "qatar-backend.pid"

# Qatar Frontend
stop_service "Qatar Frontend" "qatar-frontend.pid"

# Aquahash (si existe)
stop_service "Aquahash Backend" "aquahash-backend.pid"
stop_service "Aquahash Frontend" "aquahash-frontend.pid"

# Texas (si existe)
stop_service "Texas Backend" "texas-backend.pid"
stop_service "Texas Frontend" "texas-frontend.pid"

# ============================================
# Nettoyage final
# ============================================

echo ""
echo -e "${GREEN}Cleaning up remaining Node processes...${NC}"

# Tuer tous les processus Node sur les ports connus
lsof -ti:4000 | xargs kill -9 2>/dev/null || true
lsof -ti:4100 | xargs kill -9 2>/dev/null || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true
lsof -ti:3002 | xargs kill -9 2>/dev/null || true
lsof -ti:3003 | xargs kill -9 2>/dev/null || true

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║           ✅ ALL SERVICES STOPPED                    ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo "🚀 To start again: ./scripts/start-all.sh"
echo ""

