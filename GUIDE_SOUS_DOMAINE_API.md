# Configuration Sous-domaine API sur cPanel

## 📋 Objectif

Configurer un sous-domaine `api.votre-domaine.com` pour pointer vers votre backend Node.js sur cPanel.

---

## 🚀 Méthode 1 : Via l'interface cPanel (Recommandé)

### Étape 1 : Créer le sous-domaine

1. Connectez-vous à **cPanel**
2. Allez dans **Domaines** → **Sous-domaines**
3. Créez un nouveau sous-domaine :
   - **Sous-domaine** : `api`
   - **Domaine** : `votre-domaine.com`
   - **Racine du document** : `/home/username/public_html/api`
4. Cliquez sur **Créer**

### Étape 2 : Configurer le reverse proxy

1. Allez dans le dossier du sous-domaine :
   ```bash
   cd ~/public_html/api
   ```

2. Créez un fichier `.htaccess` :
   ```bash
   nano .htaccess
   ```

3. Ajoutez le contenu suivant :
   ```apache
   RewriteEngine On
   
   # Redirection HTTPS
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   
   # Reverse proxy vers le backend Node.js
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ http://localhost:5000/$1 [P,L]
   
   # Support WebSocket
   RewriteCond %{HTTP:Upgrade} websocket [NC]
   RewriteCond %{HTTP:Connection} upgrade [NC]
   RewriteRule ^(.*)$ ws://localhost:5000/$1 [P,L]
   
   # Headers CORS
   Header set Access-Control-Allow-Origin "*"
   Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
   Header set Access-Control-Allow-Headers "Content-Type, Authorization"
   ```

4. Sauvegardez : `Ctrl+O` → `Entrée` → `Ctrl+X`

### Étape 3 : Activer SSL pour le sous-domaine

1. Dans cPanel, allez dans **Sécurité** → **SSL/TLS Status**
2. Trouvez `api.votre-domaine.com`
3. Cliquez sur **Run AutoSSL**
4. Attendez que le certificat soit installé

### Étape 4 : Tester

```bash
# Tester l'API
curl https://api.votre-domaine.com/api/health
```

---

## 🚀 Méthode 2 : Via le terminal SSH

### Étape 1 : Créer le dossier

```bash
mkdir -p ~/public_html/api
cd ~/public_html/api
```

### Étape 2 : Créer le .htaccess

```bash
cat > .htaccess << 'EOF'
RewriteEngine On

# Redirection HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Reverse proxy vers le backend Node.js
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:5000/$1 [P,L]

# Support WebSocket
RewriteCond %{HTTP:Upgrade} websocket [NC]
RewriteCond %{HTTP:Connection} upgrade [NC]
RewriteRule ^(.*)$ ws://localhost:5000/$1 [P,L]

# Headers CORS
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header set Access-Control-Allow-Headers "Content-Type, Authorization"
EOF
```

### Étape 3 : Ajouter le sous-domaine via cPanel

Vous devez toujours créer le sous-domaine via l'interface cPanel (voir Méthode 1, Étape 1).

---

## 🚀 Méthode 3 : Configuration avec Node.js App (Alternative)

Si votre hébergeur supporte **Setup Node.js App** :

1. Ouvrez **Setup Node.js App** dans cPanel
2. Créez une nouvelle application :
   - **Node.js version** : 18.x ou supérieur
   - **Application mode** : Production
   - **Application root** : `repositories/supfootball/backend`
   - **Application URL** : `api.votre-domaine.com`
   - **Application startup file** : `src/index.js`
   - **Port** : 5000
3. Ajoutez les variables d'environnement
4. Cliquez sur **Create**

---

## 🔧 Configuration DNS (si nécessaire)

Si le sous-domaine ne fonctionne pas immédiatement :

1. Allez dans **Zone Editor** dans cPanel
2. Vérifiez qu'il existe un enregistrement A pour `api.votre-domaine.com`
3. Si absent, ajoutez :
   - **Type** : A
   - **Nom** : `api.votre-domaine.com`
   - **Adresse** : IP de votre serveur
   - **TTL** : 14400

---

## 🧪 Tests de vérification

### Test 1 : Vérifier que le sous-domaine existe

```bash
ping api.votre-domaine.com
```

### Test 2 : Vérifier le certificat SSL

```bash
curl -I https://api.votre-domaine.com
```

### Test 3 : Tester l'API

```bash
# Test de santé
curl https://api.votre-domaine.com/api/health

# Test avec authentification
curl -X POST https://api.votre-domaine.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

### Test 4 : Tester les WebSockets

Utilisez un client WebSocket ou testez depuis votre frontend.

---

## 🔒 Sécurité CORS

Pour une configuration CORS plus sécurisée en production, modifiez le backend :

```javascript
// backend/src/index.js ou middleware/cors.js
const corsOptions = {
  origin: [
    'https://votre-domaine.com',
    'https://www.votre-domaine.com'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

Et dans `.htaccess`, remplacez :
```apache
Header set Access-Control-Allow-Origin "*"
```

Par :
```apache
Header set Access-Control-Allow-Origin "https://votre-domaine.com"
```

---

## 🆘 Dépannage

### Problème : 404 Not Found

**Solution :**
- Vérifiez que le backend tourne : `pm2 status`
- Vérifiez le port dans `.htaccess` (doit correspondre au PORT dans `.env`)

### Problème : 502 Bad Gateway

**Solution :**
```bash
# Redémarrer le backend
pm2 restart footballhub-backend

# Vérifier les logs
pm2 logs footballhub-backend
```

### Problème : CORS Error

**Solution :**
- Vérifiez les headers CORS dans `.htaccess`
- Vérifiez la configuration CORS dans le backend
- Assurez-vous que `CORS_ORIGIN` dans `.env` inclut votre domaine frontend

### Problème : SSL Certificate Error

**Solution :**
1. Allez dans **SSL/TLS Status** dans cPanel
2. Exécutez AutoSSL pour `api.votre-domaine.com`
3. Attendez quelques minutes pour la propagation

---

## 📊 Checklist

- [ ] Sous-domaine `api.votre-domaine.com` créé
- [ ] Fichier `.htaccess` configuré
- [ ] SSL activé pour le sous-domaine
- [ ] Backend tourne sur le port 5000
- [ ] Test API réussi
- [ ] CORS configuré correctement
- [ ] WebSockets fonctionnels

---

## 🎉 Résultat final

Une fois configuré, vous aurez :
- **Frontend** : https://votre-domaine.com
- **API** : https://api.votre-domaine.com
- **WebSocket** : wss://api.votre-domaine.com

---

**Note** : Remplacez `votre-domaine.com` par votre vrai nom de domaine et `username` par votre nom d'utilisateur cPanel.
