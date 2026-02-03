#!/bin/bash

# Script de vérification de l'environnement cPanel
# Usage: ./check-environment.sh

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🔍 Vérification Environnement cPanel     ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""

# Fonction de vérification
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 est installé : $(command -v $1)"
        if [ "$1" == "node" ]; then
            echo -e "  Version: $(node --version)"
        elif [ "$1" == "npm" ]; then
            echo -e "  Version: $(npm --version)"
        elif [ "$1" == "git" ]; then
            echo -e "  Version: $(git --version)"
        elif [ "$1" == "pm2" ]; then
            echo -e "  Version: $(pm2 --version)"
        fi
        return 0
    else
        echo -e "${RED}✗${NC} $1 n'est pas installé"
        return 1
    fi
}

# Vérifications
echo -e "${BLUE}==> Vérification des outils requis${NC}"
check_command node
check_command npm
check_command git
check_command pm2 || echo -e "${YELLOW}⚠${NC} PM2 non installé. Installez avec: npm install -g pm2"

echo ""
echo -e "${BLUE}==> Vérification de l'IP publique${NC}"
IP=$(curl -s ifconfig.me)
echo -e "${GREEN}✓${NC} IP publique du serveur: ${YELLOW}$IP${NC}"
echo -e "  ${BLUE}→${NC} Ajoutez cette IP dans MongoDB Atlas: https://cloud.mongodb.com"

echo ""
echo -e "${BLUE}==> Vérification des ports${NC}"
if command -v netstat &> /dev/null; then
    echo -e "${GREEN}✓${NC} Ports en écoute:"
    netstat -tuln | grep -E ':(3000|5000|5001)' || echo -e "${YELLOW}⚠${NC} Aucun port 3000, 5000, ou 5001 en écoute"
else
    echo -e "${YELLOW}⚠${NC} netstat non disponible"
fi

echo ""
echo -e "${BLUE}==> Vérification de l'espace disque${NC}"
df -h ~ | tail -n 1 | awk '{print "  Disponible: " $4 " sur " $2 " (" $5 " utilisé)"}'

echo ""
echo -e "${BLUE}==> Vérification de la mémoire${NC}"
free -h | grep Mem | awk '{print "  Disponible: " $7 " sur " $2}'

echo ""
echo -e "${BLUE}==> Vérification du projet${NC}"
PROJECT_PATH="$HOME/repositories/supfootball"
if [ -d "$PROJECT_PATH" ]; then
    echo -e "${GREEN}✓${NC} Projet trouvé: $PROJECT_PATH"
    
    # Vérifier backend
    if [ -d "$PROJECT_PATH/backend" ]; then
        echo -e "${GREEN}✓${NC} Dossier backend trouvé"
        if [ -f "$PROJECT_PATH/backend/.env" ]; then
            echo -e "${GREEN}✓${NC} Fichier .env backend trouvé"
        else
            echo -e "${RED}✗${NC} Fichier .env backend manquant"
            echo -e "  ${BLUE}→${NC} Créez-le avec: cp backend/.env.example backend/.env"
        fi
    else
        echo -e "${RED}✗${NC} Dossier backend manquant"
    fi
    
    # Vérifier frontend
    if [ -d "$PROJECT_PATH/web" ]; then
        echo -e "${GREEN}✓${NC} Dossier web trouvé"
        if [ -f "$PROJECT_PATH/web/.env.local" ]; then
            echo -e "${GREEN}✓${NC} Fichier .env.local frontend trouvé"
        else
            echo -e "${RED}✗${NC} Fichier .env.local frontend manquant"
            echo -e "  ${BLUE}→${NC} Créez-le avec: cp web/.env.local.example web/.env.local"
        fi
    else
        echo -e "${RED}✗${NC} Dossier web manquant"
    fi
else
    echo -e "${RED}✗${NC} Projet non trouvé: $PROJECT_PATH"
    echo -e "  ${BLUE}→${NC} Clonez-le avec: git clone https://github.com/VOTRE_USERNAME/supfootball.git ~/repositories/supfootball"
fi

echo ""
echo -e "${BLUE}==> Vérification des services PM2${NC}"
if command -v pm2 &> /dev/null; then
    pm2 list
else
    echo -e "${YELLOW}⚠${NC} PM2 non installé"
fi

echo ""
echo -e "${BLUE}==> Test de connexion MongoDB${NC}"
if [ -f "$PROJECT_PATH/backend/.env" ]; then
    MONGO_URI=$(grep MONGODB_URI "$PROJECT_PATH/backend/.env" | cut -d '=' -f2)
    if [ -n "$MONGO_URI" ]; then
        echo -e "${GREEN}✓${NC} URI MongoDB trouvée dans .env"
        echo -e "  ${BLUE}→${NC} Testez la connexion en démarrant le backend"
    else
        echo -e "${RED}✗${NC} URI MongoDB non configurée"
    fi
else
    echo -e "${YELLOW}⚠${NC} Fichier .env non trouvé"
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✓ Vérification terminée                  ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════╝${NC}"

echo ""
echo -e "${BLUE}Prochaines étapes :${NC}"
echo -e "  1. Vérifiez que MongoDB Atlas autorise l'IP: ${YELLOW}$IP${NC}"
echo -e "  2. Configurez les fichiers .env si nécessaire"
echo -e "  3. Lancez le déploiement avec: ${YELLOW}./deploy.sh all${NC}"
