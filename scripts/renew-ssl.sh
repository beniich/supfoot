#!/bin/bash
# scripts/renew-ssl.sh

# Renew certificate
docker-compose -f docker-compose.prod.yml run --rm certbot renew

# Reload Nginx
docker-compose -f docker-compose.prod.yml exec nginx nginx -s reload

echo "✅ SSL certificate renewed!"
