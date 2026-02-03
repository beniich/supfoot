#!/bin/bash

# Script de mise à jour de l'application sur cPanel
# Usage: ./update.sh [backend|frontend|all]

set -e

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
PROJECT_ROOT="$HOME/repositories/supfootball"

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🔄 Mise à jour FootballHub+          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Aller dans le dossier du projet
cd "$PROJECT_ROOT" || exit 1

# Pull les dernières modifications
echo -e "${BLUE}==>${NC} Récupération des dernières modifications depuis GitHub..."
git fetch origin
git pull origin main

# Afficher les changements
echo ""
echo -e "${GREEN}✓${NC} Derniers commits :"
git log -3 --oneline

echo ""
read -p "Voulez-vous continuer avec le déploiement ? (o/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Oo]$ ]]; then
    echo "Mise à jour annulée."
    exit 0
fi

# Déployer
echo ""
./deploy.sh ${1:-all}
