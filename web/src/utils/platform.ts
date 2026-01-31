import { Capacitor } from '@capacitor/core';

export const Platform = {
    isNative: () => Capacitor.isNativePlatform(),
    isWeb: () => !Capacitor.isNativePlatform(),
    isAndroid: () => Capacitor.getPlatform() === 'android',
    isIOS: () => Capacitor.getPlatform() === 'ios',
    getPlatform: () => Capacitor.getPlatform(),
};

export const { isNative, isWeb, isAndroid, isIOS, getPlatform } = Platform;
