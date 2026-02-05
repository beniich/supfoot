import {
  PushNotifications,
  Token,
  PushNotificationSchema,
  ActionPerformed
} from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { isNative } from './platform';
import { getApiUrl } from '../config/api';

export async function initPushNotifications() {
  if (!isNative()) {
    console.log('Push notifications only available on native platforms');
    return;
  }

  try {
    // Check permissions
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      console.log('Push notification permission denied');
      return;
    }

    // Register for push notifications
    await PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token:', token.value);
      sendTokenToBackend(token.value);
    });

    // Some issue with push notification setup
    PushNotifications.addListener('registrationError', (error: unknown) => {
      console.error('Error on registration:', error);
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received:', notification);
        // You can show a local notification or toast here
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed:', notification);
        handleNotificationClick(notification);
      }
    );

    console.log('✅ Push notifications initialized');
  } catch (error) {
    console.error('❌ Push notifications error:', error);
  }
}

async function sendTokenToBackend(token: string) {
  try {
    const response = await fetch(`${getApiUrl()}/push/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add auth token if needed
      },
      body: JSON.stringify({
        token,
        platform: Capacitor.getPlatform()
      }),
    });

    if (response.ok) {
      console.log('Push token sent to backend');
    }
  } catch (error) {
    console.error('Error sending push token:', error);
  }
}

function handleNotificationClick(notification: ActionPerformed) {
  const data = notification.notification.data;

  // Navigate based on notification type
  if (data.type === 'ticket') {
    window.location.href = `/tickets/${data.ticketId}`;
  } else if (data.type === 'event') {
    window.location.href = `/events/${data.eventId}`;
  } else if (data.type === 'order') {
    window.location.href = `/shop/orders/${data.orderId}`;
  }
}
