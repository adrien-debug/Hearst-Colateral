#!/bin/bash

###############################################################################
# ✅ VERIFY SETUP - Vérification complète du système
# Qatar Dashboard - Hearst Mining
###############################################################################

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════╗"
echo "║                                          ║"
echo "║     ✅ VÉRIFICATION SYSTÈME ✅         ║"
echo "║                                          ║"
echo "╚══════════════════════════════════════════╝"
echo -e "${NC}\n"

PROJECT_DIR="/Users/adrienbeyondcrypto/Desktop/Hearst Control /Qatar-Dashboard"
cd "$PROJECT_DIR"

ERRORS=0

# ================================
# 1. NODE.JS
# ================================
echo -e "${BLUE}1. Vérification Node.js...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅ Node.js ${NODE_VERSION}${NC}"
else
    echo -e "${RED}❌ Node.js non installé${NC}"
    ((ERRORS++))
fi

# ================================
# 2. NPM
# ================================
echo -e "${BLUE}2. Vérification npm...${NC}"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✅ npm ${NPM_VERSION}${NC}"
else
    echo -e "${RED}❌ npm non installé${NC}"
    ((ERRORS++))
fi

# ================================
# 3. BACKEND NODE_MODULES
# ================================
echo -e "${BLUE}3. Vérification backend/node_modules...${NC}"
if [ -d "backend/node_modules" ]; then
    echo -e "${GREEN}✅ Backend installé${NC}"
else
    echo -e "${RED}❌ Backend node_modules manquant${NC}"
    echo -e "${YELLOW}   → Lancer: cd backend && npm install${NC}"
    ((ERRORS++))
fi

# ================================
# 4. FRONTEND NODE_MODULES
# ================================
echo -e "${BLUE}4. Vérification frontend/node_modules...${NC}"
if [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}✅ Frontend installé${NC}"
else
    echo -e "${RED}❌ Frontend node_modules manquant${NC}"
    echo -e "${YELLOW}   → Lancer: cd frontend && npm install${NC}"
    ((ERRORS++))
fi

# ================================
# 5. FICHIER .ENV BACKEND
# ================================
echo -e "${BLUE}5. Vérification backend/.env...${NC}"
if [ -f "backend/.env" ]; then
    echo -e "${GREEN}✅ backend/.env existe${NC}"
    
    # Vérifier variables critiques
    if grep -q "SUPABASE_URL=" backend/.env && \
       grep -q "SUPABASE_ANON_KEY=" backend/.env && \
       grep -q "JWT_SECRET=" backend/.env; then
        echo -e "${GREEN}   Variables critiques présentes${NC}"
    else
        echo -e "${YELLOW}⚠️  Certaines variables manquent${NC}"
    fi
else
    echo -e "${RED}❌ backend/.env manquant${NC}"
    echo -e "${YELLOW}   → Copier: cp backend/.env.example backend/.env${NC}"
    ((ERRORS++))
fi

# ================================
# 6. FICHIER .ENV.LOCAL FRONTEND
# ================================
echo -e "${BLUE}6. Vérification frontend/.env.local...${NC}"
if [ -f "frontend/.env.local" ]; then
    echo -e "${GREEN}✅ frontend/.env.local existe${NC}"
else
    echo -e "${YELLOW}⚠️  frontend/.env.local manquant (optionnel)${NC}"
fi

# ================================
# 7. DOSSIERS
# ================================
echo -e "${BLUE}7. Vérification dossiers...${NC}"
MISSING_DIRS=()
for dir in "logs" "backups" "exports"; do
    if [ ! -d "$dir" ]; then
        MISSING_DIRS+=("$dir")
    fi
done

if [ ${#MISSING_DIRS[@]} -eq 0 ]; then
    echo -e "${GREEN}✅ Tous les dossiers présents${NC}"
else
    echo -e "${YELLOW}⚠️  Dossiers manquants: ${MISSING_DIRS[*]}${NC}"
    echo -e "${YELLOW}   → Créer: mkdir -p logs backups exports${NC}"
fi

# ================================
# 8. PORTS DISPONIBLES
# ================================
echo -e "${BLUE}8. Vérification ports...${NC}"
PORT_3000_USED=$(lsof -ti:3000 2>/dev/null)
PORT_3001_USED=$(lsof -ti:3001 2>/dev/null)

if [ -z "$PORT_3000_USED" ]; then
    echo -e "${GREEN}✅ Port 3000 disponible (frontend)${NC}"
else
    echo -e "${YELLOW}⚠️  Port 3000 occupé (PID: $PORT_3000_USED)${NC}"
    echo -e "${YELLOW}   → Libérer: lsof -ti:3000 | xargs kill -9${NC}"
fi

if [ -z "$PORT_3001_USED" ]; then
    echo -e "${GREEN}✅ Port 3001 disponible (backend)${NC}"
else
    echo -e "${YELLOW}⚠️  Port 3001 occupé (PID: $PORT_3001_USED)${NC}"
    echo -e "${YELLOW}   → Libérer: lsof -ti:3001 | xargs kill -9${NC}"
fi

# ================================
# 9. SCRIPTS EXÉCUTABLES
# ================================
echo -e "${BLUE}9. Vérification scripts...${NC}"
SCRIPTS=("ULTRA_AUTO.sh" "GO.sh" "start-all.sh" "stop-all.sh" "install.sh")
MISSING_EXEC=()

for script in "${SCRIPTS[@]}"; do
    if [ ! -f "$script" ]; then
        MISSING_EXEC+=("$script (manquant)")
    elif [ ! -x "$script" ]; then
        MISSING_EXEC+=("$script (non exécutable)")
    fi
done

if [ ${#MISSING_EXEC[@]} -eq 0 ]; then
    echo -e "${GREEN}✅ Tous les scripts OK${NC}"
else
    echo -e "${YELLOW}⚠️  Scripts: ${MISSING_EXEC[*]}${NC}"
    echo -e "${YELLOW}   → Rendre exécutable: chmod +x *.sh${NC}"
fi

# ================================
# 10. SUPABASE
# ================================
echo -e "${BLUE}10. Test connexion Supabase...${NC}"
if [ -f "test-supabase.js" ]; then
    if node test-supabase.js 2>/dev/null; then
        echo -e "${GREEN}✅ Supabase connecté et configuré${NC}"
    else
        echo -e "${YELLOW}⚠️  Supabase non configuré ou erreur connexion${NC}"
        echo -e "${YELLOW}   → Voir SETUP_RAPIDE.md pour configuration${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Script test-supabase.js manquant${NC}"
fi

# ================================
# RÉSUMÉ
# ================================
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ SYSTÈME PRÊT - AUCUNE ERREUR${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${GREEN}🚀 Vous pouvez lancer le dashboard :${NC}"
    echo ""
    echo -e "  ${BLUE}./ULTRA_AUTO.sh${NC}   (mode ultra-autonome)"
    echo -e "  ${BLUE}./GO.sh${NC}           (one-liner rapide)"
    echo -e "  ${BLUE}./start-all.sh${NC}    (démarrage standard)"
    echo ""
else
    echo -e "${RED}❌ $ERRORS ERREUR(S) DÉTECTÉE(S)${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}📋 Actions recommandées :${NC}"
    echo ""
    echo -e "  1. Installer dépendances : ${BLUE}./install.sh${NC}"
    echo -e "  2. Configurer .env       : ${BLUE}cp backend/.env.example backend/.env${NC}"
    echo -e "  3. Configurer Supabase   : ${BLUE}Voir SETUP_RAPIDE.md${NC}"
    echo ""
fi
