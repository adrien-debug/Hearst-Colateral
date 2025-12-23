#!/bin/bash

# ================================
# 🎮 HEARST CONTROL - CLI INTERACTIVE
# ================================

PROJECT_DIR="/Users/adrienbeyondcrypto/Desktop/Hearst Control /Qatar-Dashboard"
cd "$PROJECT_DIR"

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

show_menu() {
    clear
    cat << "EOF"
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║           🎮 HEARST CONTROL - CLI INTERACTIVE 🎮           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
EOF
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}ACTIONS PRINCIPALES${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "  1) 🚀 Installation complète (./install.sh)"
    echo "  2) ▶️  Démarrer tout (./start-all.sh)"
    echo "  3) ⏹️  Arrêter tout (./stop-all.sh)"
    echo "  4) 🔄 Redémarrer tout"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}DIAGNOSTIC & RÉPARATION${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "  5) 🔍 Vérifier l'état complet (./verify-setup.sh)"
    echo "  6) 🔧 Auto-réparer (./auto-fix.sh)"
    echo "  7) 👁️  Monitoring temps réel (./watch.sh)"
    echo "  8) 🗄️  Check Supabase uniquement"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}SUPABASE${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "  9) 📋 Copier SQL dans presse-papier"
    echo " 10) 🌐 Ouvrir Supabase Dashboard"
    echo " 11) 📖 Guide configuration Supabase"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}LOGS & DEBUG${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo " 12) 📝 Voir logs backend (tail -f)"
    echo " 13) 📝 Voir logs frontend (tail -f)"
    echo " 14) 🗑️  Nettoyer tous les logs"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}GUIDES & DOCUMENTATION${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo " 15) 📖 START_HERE.md (guide principal)"
    echo " 16) 📖 QUICK_START.txt (résumé rapide)"
    echo " 17) 📖 Architecture multi-projets"
    echo " 18) 📖 Flux d'authentification"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "  0) ❌ Quitter"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -n "Votre choix : "
}

while true; do
    show_menu
    read choice
    
    case $choice in
        1)
            echo -e "\n${BLUE}🚀 Installation complète...${NC}\n"
            ./install.sh
            read -p "Appuyez sur Entrée pour continuer..."
            ;;
        2)
            echo -e "\n${BLUE}▶️  Démarrage...${NC}\n"
            ./start-all.sh
            ;;
        3)
            echo -e "\n${BLUE}⏹️  Arrêt...${NC}\n"
            ./stop-all.sh
            read -p "Appuyez sur Entrée pour continuer..."
            ;;
        4)
            echo -e "\n${BLUE}🔄 Redémarrage...${NC}\n"
            ./stop-all.sh
            sleep 2
            ./start-all.sh
            ;;
        5)
            echo -e "\n${BLUE}🔍 Vérification...${NC}\n"
            ./verify-setup.sh
            read -p "Appuyez sur Entrée pour continuer..."
            ;;
        6)
            echo -e "\n${BLUE}🔧 Auto-réparation...${NC}\n"
            ./auto-fix.sh
            read -p "Appuyez sur Entrée pour continuer..."
            ;;
        7)
            echo -e "\n${BLUE}👁️  Lancement du monitoring...${NC}\n"
            ./watch.sh
            ;;
        8)
            echo -e "\n${BLUE}🗄️  Test Supabase...${NC}\n"
            node check-supabase-ready.js
            read -p "Appuyez sur Entrée pour continuer..."
            ;;
        9)
            echo -e "\n${BLUE}📋 Copie du SQL...${NC}\n"
            pbcopy < supabase-init-multi-projects.sql
            echo -e "${GREEN}✅ SQL copié dans le presse-papier !${NC}"
            echo "Ouvrez Supabase SQL Editor et collez (Cmd+V)"
            read -p "Appuyez sur Entrée pour continuer..."
            ;;
        10)
            echo -e "\n${BLUE}🌐 Ouverture de Supabase...${NC}\n"
            open "https://supabase.com/dashboard/project/tnnsfheflydiuhiduntn"
            read -p "Appuyez sur Entrée pour continuer..."
            ;;
        11)
            echo -e "\n${BLUE}📖 Guide Supabase...${NC}\n"
            open START_HERE.md
            ;;
        12)
            echo -e "\n${BLUE}📝 Logs backend (Ctrl+C pour quitter)...${NC}\n"
            tail -f logs/combined.log 2>/dev/null || echo "Pas de logs disponibles"
            ;;
        13)
            echo -e "\n${BLUE}📝 Logs frontend (Ctrl+C pour quitter)...${NC}\n"
            tail -f logs/frontend.log 2>/dev/null || echo "Pas de logs disponibles"
            ;;
        14)
            echo -e "\n${BLUE}🗑️  Nettoyage des logs...${NC}\n"
            rm -rf logs/*.log 2>/dev/null
            echo -e "${GREEN}✅ Logs nettoyés${NC}"
            read -p "Appuyez sur Entrée pour continuer..."
            ;;
        15)
            echo -e "\n${BLUE}📖 Ouverture de START_HERE.md...${NC}\n"
            open START_HERE.md
            ;;
        16)
            echo -e "\n${BLUE}📖 QUICK_START.txt...${NC}\n"
            cat QUICK_START.txt
            read -p "Appuyez sur Entrée pour continuer..."
            ;;
        17)
            echo -e "\n${BLUE}📖 Architecture...${NC}\n"
            open HEARST_CONTROL_ARCHITECTURE.md
            ;;
        18)
            echo -e "\n${BLUE}📖 Flux authentification...${NC}\n"
            open FLUX_AUTHENTIFICATION.md
            ;;
        0)
            echo -e "\n${GREEN}👋 À bientôt !${NC}\n"
            exit 0
            ;;
        *)
            echo -e "\n${RED}❌ Choix invalide${NC}\n"
            sleep 1
            ;;
    esac
done

