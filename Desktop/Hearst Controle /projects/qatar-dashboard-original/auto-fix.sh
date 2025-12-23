#!/bin/bash

# ================================
# 🔧 AUTO-FIX - RÉSOLUTION AUTONOME DES PROBLÈMES
# ================================

set -e

PROJECT_DIR="/Users/adrienbeyondcrypto/Desktop/Hearst Control /Qatar-Dashboard"
cd "$PROJECT_DIR"

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

clear

echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║      🔧 AUTO-FIX - Diagnostic et Réparation 🔧       ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

ISSUES=0

# ================================
# 1. VÉRIFIER ET RÉPARER LES DÉPENDANCES
# ================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Vérification des dépendances..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Backend
if [ ! -d "$PROJECT_DIR/backend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules backend manquant${NC}"
    echo "🔧 Installation..."
    cd "$PROJECT_DIR/backend"
    npm install --silent
    echo -e "${GREEN}✅ Backend réparé${NC}"
    ISSUES=$((ISSUES + 1))
else
    echo -e "${GREEN}✅ Backend node_modules OK${NC}"
fi

# Frontend
if [ ! -d "$PROJECT_DIR/frontend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules frontend manquant${NC}"
    echo "🔧 Installation..."
    cd "$PROJECT_DIR/frontend"
    npm install --silent
    echo -e "${GREEN}✅ Frontend réparé${NC}"
    ISSUES=$((ISSUES + 1))
else
    echo -e "${GREEN}✅ Frontend node_modules OK${NC}"
fi

cd "$PROJECT_DIR"

# ================================
# 2. VÉRIFIER ET RÉPARER LES FICHIERS .ENV
# ================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Vérification des fichiers de configuration..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Backend .env
if [ ! -f "$PROJECT_DIR/backend/.env" ]; then
    echo -e "${YELLOW}⚠️  backend/.env manquant${NC}"
    echo "🔧 Création..."
    cat > "$PROJECT_DIR/backend/.env" << 'EOF'
# Supabase Configuration
SUPABASE_URL=https://tnnsfheflydiuhiduntn.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRubnNmaGVmbHlkaXVoaWR1bnRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MDkxMDIsImV4cCI6MjA1MDQ4NTEwMn0.rGjd8lD3u4BmF0GlhPJjSGrDHQXTWKM7-mVJxiGfSgw

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000

# JWT Secret (Généré automatiquement)
JWT_SECRET=hearst-qatar-dashboard-secret-key-2024
EOF
    echo -e "${GREEN}✅ backend/.env créé${NC}"
    ISSUES=$((ISSUES + 1))
else
    echo -e "${GREEN}✅ backend/.env existe${NC}"
fi

# Frontend .env.local
if [ ! -f "$PROJECT_DIR/frontend/.env.local" ]; then
    echo -e "${YELLOW}⚠️  frontend/.env.local manquant${NC}"
    echo "🔧 Création..."
    cat > "$PROJECT_DIR/frontend/.env.local" << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://tnnsfheflydiuhiduntn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRubnNmaGVmbHlkaXVoaWR1bnRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MDkxMDIsImV4cCI6MjA1MDQ4NTEwMn0.rGjd8lD3u4BmF0GlhPJjSGrDHQXTWKM7-mVJxiGfSgw
NEXT_PUBLIC_API_URL=http://localhost:3001
EOF
    echo -e "${GREEN}✅ frontend/.env.local créé${NC}"
    ISSUES=$((ISSUES + 1))
else
    echo -e "${GREEN}✅ frontend/.env.local existe${NC}"
fi

# ================================
# 3. LIBÉRER LES PORTS SI NÉCESSAIRE
# ================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Vérification des ports..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Port 3001 (Backend)
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Port 3001 occupé${NC}"
    echo "🔧 Libération..."
    kill -9 $(lsof -ti:3001) 2>/dev/null
    sleep 1
    echo -e "${GREEN}✅ Port 3001 libéré${NC}"
    ISSUES=$((ISSUES + 1))
else
    echo -e "${GREEN}✅ Port 3001 disponible${NC}"
fi

# Port 3000 (Frontend)
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Port 3000 occupé${NC}"
    echo "🔧 Libération..."
    kill -9 $(lsof -ti:3000) 2>/dev/null
    sleep 1
    echo -e "${GREEN}✅ Port 3000 libéré${NC}"
    ISSUES=$((ISSUES + 1))
else
    echo -e "${GREEN}✅ Port 3000 disponible${NC}"
fi

# ================================
# 4. VÉRIFIER LES LOGS
# ================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Vérification des dossiers de logs..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ ! -d "$PROJECT_DIR/logs" ]; then
    echo -e "${YELLOW}⚠️  Dossier logs manquant${NC}"
    mkdir -p "$PROJECT_DIR/logs"
    echo -e "${GREEN}✅ Dossier logs créé${NC}"
    ISSUES=$((ISSUES + 1))
else
    echo -e "${GREEN}✅ Dossier logs existe${NC}"
fi

# ================================
# 5. TESTER SUPABASE
# ================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Test de connexion Supabase..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

node check-supabase-ready.js > /tmp/auto-fix-supabase.log 2>&1

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Supabase connecté et opérationnel${NC}"
else
    echo -e "${RED}❌ Supabase pas encore configuré${NC}"
    echo ""
    echo "📋 Configuration Supabase requise :"
    echo "   1. open https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/sql"
    echo "   2. Copier : pbcopy < supabase-init-multi-projects.sql"
    echo "   3. Coller et exécuter le SQL"
    echo "   4. Désactiver RLS"
    echo "   5. Créer l'admin"
    echo ""
    echo "Guide complet : open START_HERE.md"
fi

# ================================
# RÉSUMÉ
# ================================
echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║              ✅ AUTO-FIX TERMINÉ !                    ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}🎉 Aucun problème détecté ! Tout est OK !${NC}"
else
    echo -e "${YELLOW}🔧 $ISSUES problème(s) détecté(s) et réparé(s)${NC}"
fi

echo ""
echo "🚀 Prêt à lancer : ./start-all.sh"
echo ""

