// ============================================================================
// UTILITAIRES CAPACITOR - DÉTECTION PLATEFORME & INITIALISATION
// ============================================================================

// ----------------------------------------------------------------------------
// src/utils/platform.ts
// ----------------------------------------------------------------------------

import { Capacitor } from '@capacitor/core';

export const Platform = {
  isNative: () => Capacitor.isNativePlatform(),
  isWeb: () => !Capacitor.isNativePlatform(),
  isAndroid: () => Capacitor.getPlatform() === 'android',
  isIOS: () => Capacitor.getPlatform() === 'ios',
  getPlatform: () => Capacitor.getPlatform(),
};

export const { isNative, isWeb, isAndroid, isIOS, getPlatform } = Platform;

// ----------------------------------------------------------------------------
// src/utils/capacitor-init.ts
// ----------------------------------------------------------------------------

import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Keyboard, KeyboardStyle } from '@capacitor/keyboard';
import { App } from '@capacitor/app';
import { Network } from '@capacitor/network';
import { isNative } from './platform';

export async function initializeCapacitor() {
  if (!isNative()) {
    console.log('Running on web, skipping native initialization');
    return;
  }

  try {
    console.log('🚀 Initializing Capacitor...');

    // Configure Status Bar
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#1A1915' });
    console.log('✅ Status Bar configured');

    // Configure Keyboard
    await Keyboard.setStyle({ style: KeyboardStyle.Dark });
    await Keyboard.setResizeMode({ mode: 'native' });
    console.log('✅ Keyboard configured');

    // Hide Splash Screen after initialization
    setTimeout(async () => {
      await SplashScreen.hide();
      console.log('✅ Splash Screen hidden');
    }, 1000);

    // App State Listener
    App.addListener('appStateChange', ({ isActive }) => {
      console.log('App state changed. Is active:', isActive);
      if (isActive) {
        // Refresh data when app comes to foreground
        window.dispatchEvent(new Event('app-active'));
      }
    });

    // Back Button Handler
    App.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        App.exitApp();
      } else {
        window.history.back();
      }
    });

    // Network Status Listener
    const networkStatus = await Network.getStatus();
    console.log('Network status:', networkStatus);

    Network.addListener('networkStatusChange', (status) => {
      console.log('Network status changed:', status);
      
      // Dispatch custom event for components to listen
      window.dispatchEvent(new CustomEvent('network-status-change', {
        detail: status
      }));

      if (!status.connected) {
        // Show offline notification
        showOfflineNotification();
      }
    });

    console.log('✅ Capacitor initialized successfully');
  } catch (error) {
    console.error('❌ Capacitor initialization error:', error);
  }
}

function showOfflineNotification() {
  // You can implement a toast/notification here
  console.warn('📡 No internet connection');
}

export async function checkNetworkStatus() {
  try {
    const status = await Network.getStatus();
    return status.connected;
  } catch (error) {
    console.error('Error checking network:', error);
    return true; // Assume connected on error
  }
}

// ----------------------------------------------------------------------------
// src/utils/haptics.ts
// ----------------------------------------------------------------------------

import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { isNative } from './platform';

export const hapticFeedback = {
  light: async () => {
    if (isNative()) {
      try {
        await Haptics.impact({ style: ImpactStyle.Light });
      } catch (error) {
        console.warn('Haptics not supported');
      }
    }
  },

  medium: async () => {
    if (isNative()) {
      try {
        await Haptics.impact({ style: ImpactStyle.Medium });
      } catch (error) {
        console.warn('Haptics not supported');
      }
    }
  },

  heavy: async () => {
    if (isNative()) {
      try {
        await Haptics.impact({ style: ImpactStyle.Heavy });
      } catch (error) {
        console.warn('Haptics not supported');
      }
    }
  },

  success: async () => {
    if (isNative()) {
      try {
        await Haptics.notification({ type: NotificationType.Success });
      } catch (error) {
        console.warn('Haptics not supported');
      }
    }
  },

  warning: async () => {
    if (isNative()) {
      try {
        await Haptics.notification({ type: NotificationType.Warning });
      } catch (error) {
        console.warn('Haptics not supported');
      }
    }
  },

  error: async () => {
    if (isNative()) {
      try {
        await Haptics.notification({ type: NotificationType.Error });
      } catch (error) {
        console.warn('Haptics not supported');
      }
    }
  },

  selection: async () => {
    if (isNative()) {
      try {
        await Haptics.selectionStart();
        setTimeout(async () => {
          await Haptics.selectionEnd();
        }, 100);
      } catch (error) {
        console.warn('Haptics not supported');
      }
    }
  },
};

// ----------------------------------------------------------------------------
// src/config/api.ts
// ----------------------------------------------------------------------------

import { Capacitor } from '@capacitor/core';

export const API_CONFIG = {
  baseURL: Capacitor.isNativePlatform()
    ? 'https://api.footballhub.com/api' // Production API
    : 'http://localhost:5000/api',      // Development API
  
  timeout: 10000,
  
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getApiUrl = () => API_CONFIG.baseURL;

// ----------------------------------------------------------------------------
// src/utils/push-notifications.ts
// ----------------------------------------------------------------------------

import { 
  PushNotifications,
  Token,
  PushNotificationSchema,
  ActionPerformed 
} from '@capacitor/push-notifications';
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
    PushNotifications.addListener('registrationError', (error: any) => {
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
