import { messaging } from '@/config/firebase';
import { getToken, onMessage } from 'firebase/messaging';

/**
 * Demande la permission pour les notifications push
 * et récupère le token FCM
 */
export async function requestNotificationPermission(): Promise<string | null> {
    try {
        // Vérifier si le messaging est disponible
        if (!messaging) {
            console.warn('Firebase Messaging non supporté sur ce navigateur');
            return null;
        }

        // Demander la permission
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
            console.log('Permission de notification accordée');

            // Récupérer le token FCM
            const token = await getToken(messaging, {
                vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
            });

            console.log('Token FCM:', token);
            return token;
        } else {
            console.log('Permission de notification refusée');
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la demande de permission:', error);
        return null;
    }
}

/**
 * Écoute les messages en temps réel (quand l'app est ouverte)
 */
export function onMessageListener(callback: (payload: any) => void) {
    if (!messaging) {
        console.warn('Firebase Messaging non supporté');
        return;
    }

    onMessage(messaging, (payload) => {
        console.log('Message reçu:', payload);
        callback(payload);
    });
}

/**
 * Envoie le token FCM au backend pour l'enregistrer
 */
export async function saveFCMToken(token: string, userId: string): Promise<void> {
    try {
        const response = await fetch('/api/notifications/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, userId }),
        });

        if (!response.ok) {
            throw new Error('Échec de l\'enregistrement du token');
        }

        console.log('Token FCM enregistré avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du token:', error);
    }
}
