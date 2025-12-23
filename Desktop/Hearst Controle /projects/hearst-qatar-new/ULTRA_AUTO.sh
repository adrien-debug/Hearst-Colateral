#!/bin/bash

###############################################################################
# 🔥 ULTRA AUTO - Mode Ultra-Autonome Absolu
# Qatar Dashboard - Hearst Mining
#
# Ce script fait TOUT automatiquement :
# 1. Nettoyage complet
# 2. Installation forcée
# 3. Configuration automatique
# 4. Vérification Supabase
# 5. Surveillance continue
# 6. Lancement automatique dès que prêt
###############################################################################

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/Users/adrienbeyondcrypto/Desktop/Hearst Control /Qatar-Dashboard"
BACKEND_PORT=3001
FRONTEND_PORT=3000
CHECK_INTERVAL=5

echo -e "${PURPLE}"
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                                                                  ║"
echo "║      🔥🔥🔥 ULTRA AUTO - MODE ULTRA-AUTONOME 🔥🔥🔥            ║"
echo "║                                                                  ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

cd "$PROJECT_DIR"

# ================================
# ÉTAPE 1 : NETTOYAGE COMPLET
# ================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}📋 ÉTAPE 1/6 : Nettoyage complet${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Arrêter processus existants
echo -e "${BLUE}🛑 Arrêt des processus existants...${NC}"
pkill -f "node.*backend" || true
pkill -f "next dev" || true
pkill -f "npm run dev" || true

# Libérer les ports
echo -e "${BLUE}🔓 Libération des ports $BACKEND_PORT et $FRONTEND_PORT...${NC}"
lsof -ti:$BACKEND_PORT | xargs kill -9 2>/dev/null || true
lsof -ti:$FRONTEND_PORT | xargs kill -9 2>/dev/null || true

sleep 2
echo -e "${GREEN}✅ Nettoyage terminé${NC}\n"

# ================================
# ÉTAPE 2 : INSTALLATION FORCÉE
# ================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}📋 ÉTAPE 2/6 : Installation forcée${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Backend
if [ -d "backend" ]; then
    echo -e "${BLUE}📦 Installation backend...${NC}"
    cd backend
    npm install --silent
    cd ..
    echo -e "${GREEN}✅ Backend installé${NC}"
fi

# Frontend
if [ -d "frontend" ]; then
    echo -e "${BLUE}📦 Installation frontend...${NC}"
    cd frontend
    npm install --silent
    cd ..
    echo -e "${GREEN}✅ Frontend installé${NC}"
fi

echo ""

# ================================
# ÉTAPE 3 : CONFIGURATION FORCÉE
# ================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}📋 ÉTAPE 3/6 : Configuration automatique${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Créer backend/.env si n'existe pas
if [ ! -f "backend/.env" ]; then
    echo -e "${BLUE}⚙️  Création backend/.env...${NC}"
    cat > backend/.env << 'EOF'
# Qatar Dashboard Backend - Environment Variables
NODE_ENV=development
PORT=3001
SUPABASE_URL=https://tnnsfheflydiuhiduntn.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_key_here
JWT_SECRET=your_jwt_secret_here_change_in_production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
EOF
    echo -e "${GREEN}✅ backend/.env créé${NC}"
else
    echo -e "${GREEN}✅ backend/.env existe déjà${NC}"
fi

# Créer frontend/.env.local si n'existe pas
if [ ! -f "frontend/.env.local" ]; then
    echo -e "${BLUE}⚙️  Création frontend/.env.local...${NC}"
    cat > frontend/.env.local << 'EOF'
# Qatar Dashboard Frontend - Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=https://tnnsfheflydiuhiduntn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_APP_NAME=Hearst Qatar Dashboard
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_METRICS_REFRESH_INTERVAL=10000
NEXT_PUBLIC_CONTAINERS_REFRESH_INTERVAL=30000
EOF
    echo -e "${GREEN}✅ frontend/.env.local créé${NC}"
else
    echo -e "${GREEN}✅ frontend/.env.local existe déjà${NC}"
fi

# Créer dossiers logs si n'existent pas
mkdir -p logs backups

echo ""

# ================================
# ÉTAPE 4 : VÉRIFICATION SUPABASE
# ================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}📋 ÉTAPE 4/6 : Vérification Supabase${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Test connexion Supabase si script existe
if [ -f "test-supabase.js" ]; then
    echo -e "${BLUE}🔍 Test connexion Supabase...${NC}"
    if node test-supabase.js 2>/dev/null; then
        SUPABASE_READY=true
        echo -e "${GREEN}✅ Supabase est prêt !${NC}\n"
    else
        SUPABASE_READY=false
        echo -e "${YELLOW}⚠️  Supabase pas encore configuré${NC}\n"
    fi
else
    SUPABASE_READY=false
    echo -e "${YELLOW}⚠️  Script test-supabase.js non trouvé${NC}\n"
fi

# ================================
# ÉTAPE 5 : SI SUPABASE PAS PRÊT
# ================================
if [ "$SUPABASE_READY" = false ]; then
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}📋 ÉTAPE 5/6 : Configuration Supabase requise${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    echo -e "${YELLOW}⏳ Supabase n'est pas encore configuré !${NC}"
    echo ""
    echo -e "${BLUE}📂 Ouverture des onglets Supabase...${NC}"
    
    # Ouvrir onglets Supabase
    open "https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/sql" 2>/dev/null || true
    open "https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/auth/users" 2>/dev/null || true
    open "https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/settings/api" 2>/dev/null || true
    
    sleep 2
    
    # Copier SQL dans presse-papier
    if [ -f "supabase-init-multi-projects.sql" ]; then
        echo -e "${BLUE}📋 Copie du SQL dans le presse-papier...${NC}"
        pbcopy < supabase-init-multi-projects.sql
        echo -e "${GREEN}✅ SQL copié ! Utilisez Cmd+V pour coller${NC}"
    fi
    
    echo ""
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}📝 ACTIONS RAPIDES (5 minutes) :${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${BLUE}1️⃣  Onglet SQL Editor :${NC}"
    echo "   • Cmd+V (coller le SQL)"
    echo "   • Cliquer RUN ▶️"
    echo ""
    echo -e "${BLUE}2️⃣  Désactiver RLS :${NC}"
    echo "   • Terminal : pbcopy < disable-rls.sql"
    echo "   • SQL Editor : Cmd+V + RUN"
    echo ""
    echo -e "${BLUE}3️⃣  Onglet Authentication :${NC}"
    echo "   • Cliquer 'Add user'"
    echo "   • Email : admin@hearstmining.com"
    echo "   • Password : Admin123!Hearst"
    echo ""
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    # ================================
    # ÉTAPE 6 : SURVEILLANCE CONTINUE
    # ================================
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}📋 ÉTAPE 6/6 : Surveillance continue activée${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${GREEN}🤖 Le script surveille Supabase toutes les $CHECK_INTERVAL secondes${NC}"
    echo -e "${GREEN}🚀 Il lancera AUTOMATIQUEMENT le dashboard dès que prêt !${NC}"
    echo ""
    echo -e "${YELLOW}⏸  Appuyez sur Ctrl+C pour arrêter la surveillance${NC}"
    echo ""
    
    # Boucle de surveillance
    while true; do
        sleep $CHECK_INTERVAL
        
        echo -e "${BLUE}🔍 Vérification Supabase... ($(date +%H:%M:%S))${NC}"
        
        if [ -f "test-supabase.js" ] && node test-supabase.js 2>/dev/null; then
            echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo -e "${GREEN}✅ SUPABASE DÉTECTÉ COMME PRÊT !${NC}"
            echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo ""
            SUPABASE_READY=true
            break
        fi
    done
fi

# ================================
# LANCEMENT AUTOMATIQUE
# ================================
if [ "$SUPABASE_READY" = true ]; then
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}🚀 LANCEMENT AUTOMATIQUE${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    # Lancer backend
    if [ -d "backend" ]; then
        echo -e "${BLUE}🚀 Démarrage backend (port $BACKEND_PORT)...${NC}"
        cd backend
        npm run dev > ../logs/backend.log 2>&1 &
        BACKEND_PID=$!
        cd ..
        echo -e "${GREEN}✅ Backend lancé (PID: $BACKEND_PID)${NC}"
    fi
    
    sleep 3
    
    # Lancer frontend
    if [ -d "frontend" ]; then
        echo -e "${BLUE}🚀 Démarrage frontend (port $FRONTEND_PORT)...${NC}"
        cd frontend
        npm run dev > ../logs/frontend.log 2>&1 &
        FRONTEND_PID=$!
        cd ..
        echo -e "${GREEN}✅ Frontend lancé (PID: $FRONTEND_PID)${NC}"
    fi
    
    sleep 5
    
    # Ouvrir navigateur
    echo -e "${BLUE}🌐 Ouverture du navigateur...${NC}"
    open "http://localhost:$FRONTEND_PORT" 2>/dev/null || true
    
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ DASHBOARD LANCÉ AVEC SUCCÈS !${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${CYAN}🌐 URLs :${NC}"
    echo -e "   Frontend : ${GREEN}http://localhost:$FRONTEND_PORT${NC}"
    echo -e "   Backend  : ${GREEN}http://localhost:$BACKEND_PORT${NC}"
    echo ""
    echo -e "${CYAN}🔑 Login :${NC}"
    echo "   Email    : admin@hearstmining.com"
    echo "   Password : Admin123!Hearst"
    echo ""
    echo -e "${CYAN}📊 Logs :${NC}"
    echo "   Backend  : tail -f logs/backend.log"
    echo "   Frontend : tail -f logs/frontend.log"
    echo ""
    echo -e "${YELLOW}⏸  Appuyez sur Ctrl+C pour arrêter${NC}"
    echo ""
    
    # Attendre
    wait
fi
