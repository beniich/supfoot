// server/src/config/firebase.js
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Initialize Firebase Admin
// Check if service account file exists, otherwise try to use environment variables or mock for build
let serviceAccount;
const serviceAccountPath = path.join(__dirname, '../../firebase-service-account.json');

if (fs.existsSync(serviceAccountPath)) {
    serviceAccount = require(serviceAccountPath);
} else {
    // Fallback or warning
    console.warn('⚠️ Firebase service account file not found at ' + serviceAccountPath);
    // You might want to handle this differently in production
    // For now, we'll assume it's set via env or proceed with warning
    // Creating a mock if not present to avoid crash during initial setup if not used immediately
    serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined
    };
}

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env.FIREBASE_DATABASE_URL,
        });
        console.log('✅ Firebase initialized');
    } catch (error) {
        console.error('❌ Firebase initialization error:', error.message);
    }
}

module.exports = admin;
