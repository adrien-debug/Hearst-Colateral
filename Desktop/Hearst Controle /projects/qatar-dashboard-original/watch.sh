#!/bin/bash

# ================================
# 👁️ WATCH - SURVEILLANCE TEMPS RÉEL
# ================================

PROJECT_DIR="/Users/adrienbeyondcrypto/Desktop/Hearst Control /Qatar-Dashboard"
cd "$PROJECT_DIR"

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

clear

cat << "EOF"
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║        👁️  HEARST CONTROL - MONITORING LIVE 👁️         ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
EOF

echo ""
echo -e "${BLUE}Surveillance temps réel activée...${NC}"
echo -e "${YELLOW}Appuyez sur Ctrl+C pour arrêter${NC}"
echo ""

# Fonction d'affichage du statut
display_status() {
    clear
    
    echo "╔══════════════════════════════════════════════════════════╗"
    echo "║       👁️  HEARST CONTROL - MONITORING $(date '+%H:%M:%S')        ║"
    echo "╚══════════════════════════════════════════════════════════╝"
    echo ""
    
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    # BACKEND
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🔧 BACKEND (Port 3001)"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${GREEN}✅ Statut : ACTIF${NC}"
        BACKEND_PID=$(lsof -ti:3001)
        echo "   PID : $BACKEND_PID"
        
        # Tester l'endpoint
        if curl -s http://localhost:3001/api/health >/dev/null 2>&1; then
            echo -e "${GREEN}   API : Répondant${NC}"
        else
            echo -e "${YELLOW}   API : Démarrage...${NC}"
        fi
    else
        echo -e "${RED}❌ Statut : ARRÊTÉ${NC}"
    fi
    
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    # FRONTEND
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🎨 FRONTEND (Port 3000)"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${GREEN}✅ Statut : ACTIF${NC}"
        FRONTEND_PID=$(lsof -ti:3000)
        echo "   PID : $FRONTEND_PID"
        
        # Tester l'accès
        if curl -s http://localhost:3000 >/dev/null 2>&1; then
            echo -e "${GREEN}   Page : Accessible${NC}"
        else
            echo -e "${YELLOW}   Page : Compilation...${NC}"
        fi
    else
        echo -e "${RED}❌ Statut : ARRÊTÉ${NC}"
    fi
    
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    # SUPABASE
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🗄️  SUPABASE"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Test rapide de connexion
    node check-supabase-ready.js > /tmp/watch-supabase.log 2>&1
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Connexion : OK${NC}"
        
        # Compter les lignes dans les tables principales
        PROJECTS_COUNT=$(cat /tmp/watch-supabase.log | grep "projects:" | grep -o "[0-9]* rows" | awk '{print $1}')
        CONTAINERS_COUNT=$(cat /tmp/watch-supabase.log | grep "containers:" | grep -o "[0-9]* rows" | awk '{print $1}')
        
        echo "   Projets : ${PROJECTS_COUNT:-0}"
        echo "   Containers : ${CONTAINERS_COUNT:-0}"
    else
        echo -e "${RED}❌ Connexion : Échec${NC}"
        echo "   Configurer Supabase : open START_HERE.md"
    fi
    
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    # LOGS RÉCENTS
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📋 LOGS RÉCENTS (5 dernières lignes)"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    if [ -f "$PROJECT_DIR/logs/combined.log" ]; then
        tail -5 "$PROJECT_DIR/logs/combined.log" 2>/dev/null || echo "Aucun log disponible"
    else
        echo "Fichier de log non créé encore"
    fi
    
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${BLUE}Mise à jour dans 5 secondes... (Ctrl+C pour arrêter)${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

# Boucle de surveillance
while true; do
    display_status
    sleep 5
done

