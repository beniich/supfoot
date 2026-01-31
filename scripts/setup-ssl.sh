#!/bin/bash
# scripts/setup-ssl.sh

DOMAIN="footballhub.ma"
EMAIL="admin@footballhub.ma"

# Create directories
mkdir -p certbot/conf
mkdir -p certbot/www

# Get SSL certificate
docker-compose -f docker-compose.prod.yml run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email \
  -d $DOMAIN \
  -d www.$DOMAIN

# Reload Nginx
docker-compose -f docker-compose.prod.yml exec nginx nginx -s reload

echo "✅ SSL certificate installed successfully!"
