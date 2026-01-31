import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.footballhub.app',
    appName: 'FootballHub+',
    webDir: 'out',
    server: {
        androidScheme: 'https',
        // Uncomment for development with live reload:
        // url: 'http://192.168.1.X:3000',
        // cleartext: true
    },
    plugins: {
        SplashScreen: {
            launchShowDuration: 2000,
            backgroundColor: '#1A1915',
            androidSplashResourceName: 'splash',
            androidScaleType: 'CENTER_CROP',
            showSpinner: false,
            androidSpinnerStyle: 'small',
            iosSpinnerStyle: 'small',
            spinnerColor: '#F9D406',
            splashFullScreen: true,
            splashImmersive: true,
        },
        StatusBar: {
            style: 'DARK',
            backgroundColor: '#1A1915',
        },
        Keyboard: {
            resize: 'native',
            style: 'DARK',
            resizeOnFullScreen: true,
        },
        PushNotifications: {
            presentationOptions: ['badge', 'sound', 'alert'],
        },
    },
};

export default config;
