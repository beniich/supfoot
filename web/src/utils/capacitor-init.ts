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
