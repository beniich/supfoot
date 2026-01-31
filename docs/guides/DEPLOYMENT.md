# 🌐 Guide de Déploiement Production - FootballHub+

Ce document détaille l'infrastructure et les procédures pour déployer l'application en production.

## 🏗️ Architecture

L'application utilise une architecture conteneurisée orchestrée par Docker Compose :

*   **Load Balancer / Proxy** : Nginx (SSL, compression gzip, HTTP/2).
*   **Backend** : Node.js (Cluster Mode) via Docker.
*   **Frontend** : Next.js (Standalone Mode) via Docker.
*   **Base de Données** : MongoDB 7.
*   **Cache** : Redis 7 (Sessions & Cache API).

## 🚀 Déploiement Rapide (Docker)

1.  **Pré-requis** : Serveur Linux (Ubuntu 22.04 recommandé) avec Docker & Docker Compose.
2.  **Cloner le repo** :
    ```bash
    git clone https://github.com/votre-user/footballhub.git /var/www/footballhub
    cd /var/www/footballhub
    ```
3.  **Configurer l'environnement** :
    ```bash
    cp backend/.env.example backend/.env.production
    cp web/.env.example web/.env.production
    # Editer les variables (DB passwords, JWT, etc.)
    ```
4.  **Lancer la stack** :
    ```bash
    docker-compose -f docker-compose.prod.yml up -d --build
    ```
5.  **SSL (HTTPS)** :
    ```bash
    chmod +x scripts/setup-ssl.sh
    ./scripts/setup-ssl.sh
    ```

## 🔄 CI/CD (GitHub Actions)

Le fichier `.github/workflows/deploy.yml` automatise le déploiement.

**Secrets à configurer sur GitHub :**
*   `SERVER_HOST` : IP du serveur.
*   `SERVER_USER` : Utilisateur SSH (ex: root).
*   `SSH_PRIVATE_KEY` : Clé privée SSH.
*   `DOCKER_REGISTRY` : `ghcr.io` (par défaut).
*   `SLACK_WEBHOOK` : URL pour notifications (optionnel).

## 📊 Monitoring

### Sentry
*   **Backend** : Configurez `SENTRY_DSN` dans `backend/.env.production`.
*   **Frontend** : Configurez `NEXT_PUBLIC_SENTRY_DSN` dans `web/.env.production`.

### Logs
*   Logs Backend : `docker-compose -f docker-compose.prod.yml logs -f backend`
*   Logs Nginx : `docker-compose -f docker-compose.prod.yml logs -f nginx`

## 🛡️ Sécurité

*   **SSL** : Géré par Certbot (Docker) avec renouvellement automatique.
*   **Firewall** : N'ouvrez que les ports 80, 443 et 22.
*   **Rate Limiting** : Configuré dans Nginx (`10req/s` API, `5req/m` Login).
*   **Non-root** : Les conteneurs Node.js tournent avec un utilisateur non-privilégié.

---
*Généré automatiquement par l'assistant FootballHub+*
