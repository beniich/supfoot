# Guide d'Installation Firebase pour FootballHub+

## 1. Créer un Projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Ajouter un projet"
3. Nommez votre projet (ex: "supfootball")
4. Activez Google Analytics (optionnel)
5. Créez le projet

## 2. Configurer l'Application Web

1. Dans la console Firebase, cliquez sur l'icône Web `</>`
2. Enregistrez votre application (ex: "FootballHub+ Web")
3. Copiez les informations de configuration

## 3. Activer les Services Firebase

### Authentication
1. Allez dans **Authentication** > **Get Started**
2. Activez les méthodes de connexion souhaitées :
   - Email/Password
   - Google
   - Facebook (optionnel)

### Firestore Database
1. Allez dans **Firestore Database** > **Create Database**
2. Choisissez le mode **Production** ou **Test**
3. Sélectionnez une région (europe-west1 pour l'Europe)

### Cloud Storage
1. Allez dans **Storage** > **Get Started**
2. Configurez les règles de sécurité

### Cloud Messaging (Notifications Push)
1. Allez dans **Project Settings** > **Cloud Messaging**
2. Sous "Web Push certificates", cliquez sur **Generate key pair**
3. Copiez la clé VAPID générée

## 4. Configurer les Variables d'Environnement

Copiez `.env.local.example` vers `.env.local` et remplissez :

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=votre_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre-projet.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre-projet-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre-projet.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=votre_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FIREBASE_VAPID_KEY=votre_vapid_key
```

## 5. Mettre à Jour le Service Worker

Éditez `public/firebase-messaging-sw.js` et remplacez les valeurs de configuration par les vôtres.

## 6. Règles de Sécurité Firestore

Exemple de règles pour commencer :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Règle pour les utilisateurs
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Règle pour les notifications
    match /notifications/{notificationId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }
  }
}
```

## 7. Règles de Sécurité Storage

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 8. Tester les Notifications

Pour tester les notifications push :

```typescript
import { requestNotificationPermission } from '@/utils/notifications';

// Dans votre composant
const handleEnableNotifications = async () => {
  const token = await requestNotificationPermission();
  if (token) {
    console.log('Token FCM:', token);
    // Enregistrer le token dans votre backend
  }
};
```

## 9. Déploiement

### Vercel
Ajoutez toutes les variables d'environnement Firebase dans :
**Settings** > **Environment Variables**

### cPanel
Ajoutez les variables dans votre fichier `.env` sur le serveur.

## Ressources Utiles

- [Documentation Firebase](https://firebase.google.com/docs)
- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
