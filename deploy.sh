#!/bin/bash

# 🚀 Script de déploiement FootballHub+ sur cPanel
# Usage: ./deploy.sh [backend|frontend|all]

set -e  # Arrêter en cas d'erreur

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ROOT="$HOME/repositories/supfootball"
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/web"

# Fonction d'affichage
print_step() {
    echo -e "${BLUE}==>${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Fonction de déploiement du backend
deploy_backend() {
    print_step "Déploiement du Backend..."
    
    cd "$BACKEND_DIR" || exit 1
    
    # Pull les dernières modifications
    print_step "Récupération des dernières modifications..."
    git pull origin main || print_warning "Impossible de pull depuis Git"
    
    # Installation des dépendances
    print_step "Installation des dépendances..."
    npm install --production
    
    # Redémarrage avec PM2
    print_step "Redémarrage du service..."
    if pm2 describe footballhub-backend > /dev/null 2>&1; then
        pm2 restart footballhub-backend
    else
        pm2 start src/index.js --name footballhub-backend
        pm2 save
    fi
    
    print_success "Backend déployé avec succès"
}

# Fonction de déploiement du frontend
deploy_frontend() {
    print_step "Déploiement du Frontend..."
    
    cd "$FRONTEND_DIR" || exit 1
    
    # Pull les dernières modifications
    print_step "Récupération des dernières modifications..."
    git pull origin main || print_warning "Impossible de pull depuis Git"
    
    # Installation des dépendances
    print_step "Installation des dépendances..."
    npm install --legacy-peer-deps
    
    # Build de production
    print_step "Build de l'application..."
    npm run build
    
    # Redémarrage avec PM2
    print_step "Redémarrage du service..."
    if pm2 describe footballhub-frontend > /dev/null 2>&1; then
        pm2 restart footballhub-frontend
    else
        pm2 start npm --name footballhub-frontend -- start
        pm2 save
    fi
    
    print_success "Frontend déployé avec succès"
}

# Fonction de vérification
check_status() {
    print_step "Vérification des services..."
    pm2 status
    
    echo ""
    print_step "Logs récents du Backend:"
    pm2 logs footballhub-backend --lines 10 --nostream
    
    echo ""
    print_step "Logs récents du Frontend:"
    pm2 logs footballhub-frontend --lines 10 --nostream
}

# Menu principal
echo -e "${GREEN}"
echo "╔═══════════════════════════════════════╗"
echo "║  🚀 Déploiement FootballHub+ cPanel  ║"
echo "╚═══════════════════════════════════════╝"
echo -e "${NC}"

# Vérifier les arguments
DEPLOY_TARGET="${1:-all}"

case "$DEPLOY_TARGET" in
    backend)
        deploy_backend
        ;;
    frontend)
        deploy_frontend
        ;;
    all)
        deploy_backend
        echo ""
        deploy_frontend
        ;;
    *)
        print_error "Usage: $0 [backend|frontend|all]"
        exit 1
        ;;
esac

echo ""
check_status

echo ""
print_success "Déploiement terminé !"
echo -e "${BLUE}Visitez votre site :${NC} https://votre-domaine.com"
