#!/bin/bash

# ================================
# 🔥 FULL AUTO - MODE AUTONOME ABSOLU
# ================================

set -e

clear

cat << "EOF"
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║          🔥 MODE FULL AUTONOME - ON NE S'ARRÊTE PAS 🔥      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
EOF

PROJECT_DIR="/Users/adrienbeyondcrypto/Desktop/Hearst Control /Qatar-Dashboard"
cd "$PROJECT_DIR"

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}🚀 PHASE 1 : INSTALLATION AUTONOME${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Installation silencieuse
./install.sh 2>&1 | grep -E "(✅|❌|⚠️)" || true

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}🔍 PHASE 2 : VÉRIFICATION SUPABASE${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

node check-supabase-ready.js > /tmp/full-auto-check.log 2>&1
SUPABASE_STATUS=$?

if [ $SUPABASE_STATUS -eq 0 ]; then
    echo -e "${GREEN}✅ SUPABASE CONFIGURÉ ET PRÊT !${NC}"
    echo ""
    
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}🚀 PHASE 3 : LANCEMENT AUTOMATIQUE${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    sleep 2
    exec ./start-all.sh
    
else
    echo -e "${YELLOW}⚠️  SUPABASE PAS ENCORE CONFIGURÉ${NC}"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}🔧 PHASE 3 : CONFIGURATION ASSISTÉE${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    echo "📋 Copie du SQL dans le presse-papier..."
    pbcopy < supabase-init-multi-projects.sql
    echo -e "${GREEN}✅ SQL copié !${NC}"
    echo ""
    
    echo "🌐 Ouverture automatique de Supabase..."
    open "https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/sql/new" 2>/dev/null
    sleep 2
    open "https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn/auth/users" 2>/dev/null
    echo -e "${GREEN}✅ Onglets ouverts !${NC}"
    echo ""
    
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}📋 ACTIONS REQUISES (5 MINUTES) :${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "1️⃣  Dans l'onglet SQL Editor :"
    echo "   → Cmd+V (SQL déjà copié)"
    echo "   → Cliquer RUN ▶️"
    echo "   → Attendre Success (20 secondes)"
    echo ""
    echo "2️⃣  Désactiver RLS :"
    echo "   → Taper : pbcopy < disable-rls.sql"
    echo "   → Coller et RUN"
    echo ""
    echo "3️⃣  Dans l'onglet Authentication :"
    echo "   → Add user"
    echo "   → Email : admin@hearstmining.com"
    echo "   → Password : Admin123!Hearst"
    echo "   → Cocher Auto Confirm"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${GREEN}Puis relancez : ./FULL_AUTO.sh${NC}"
    echo ""
    echo "Ou manuel : ./start-all.sh"
    echo ""
    
    # Surveillance automatique en arrière-plan
    echo -e "${BLUE}🤖 Surveillance automatique activée...${NC}"
    echo "Le système vérifie Supabase toutes les 10 secondes"
    echo "et lancera AUTOMATIQUEMENT dès que vous aurez fini !"
    echo ""
    echo -e "${YELLOW}Appuyez sur Ctrl+C pour arrêter la surveillance${NC}"
    echo ""
    
    # Boucle de surveillance
    while true; do
        sleep 10
        node check-supabase-ready.js > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo ""
            echo -e "${GREEN}🎉 SUPABASE DÉTECTÉ COMME CONFIGURÉ !${NC}"
            echo ""
            echo "🚀 LANCEMENT AUTOMATIQUE dans 3 secondes..."
            sleep 3
            exec ./start-all.sh
        fi
        echo -n "."
    done
fi

