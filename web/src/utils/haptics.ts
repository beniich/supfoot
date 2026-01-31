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
