// ============================================
// Date & Time Formatting Utilities
// ============================================

export const formatDate = {
    // Format: "31 Jan 2026"
    short: (date: string | Date): string => {
        const d = new Date(date);
        return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    },

    // Format: "31 Janvier 2026"
    long: (date: string | Date): string => {
        const d = new Date(date);
        return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    },

    // Format: "31/01/2026"
    numeric: (date: string | Date): string => {
        const d = new Date(date);
        return d.toLocaleDateString('fr-FR');
    },

    // Format: "17:45"
    time: (date: string | Date): string => {
        const d = new Date(date);
        return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    },

    // Format: "31 Jan, 17:45"
    dateTime: (date: string | Date): string => {
        return `${formatDate.short(date)}, ${formatDate.time(date)}`;
    },

    // Relative time: "Il y a 2 heures", "Dans 3 jours"
    relative: (date: string | Date): string => {
        const d = new Date(date);
        const now = new Date();
        const diffMs = d.getTime() - now.getTime();
        const diffSec = Math.floor(Math.abs(diffMs) / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);
        const isPast = diffMs < 0;

        if (diffSec < 60) {
            return isPast ? 'À l\'instant' : 'Dans quelques secondes';
        } else if (diffMin < 60) {
            return isPast ? `Il y a ${diffMin} min` : `Dans ${diffMin} min`;
        } else if (diffHour < 24) {
            return isPast ? `Il y a ${diffHour}h` : `Dans ${diffHour}h`;
        } else if (diffDay < 7) {
            return isPast ? `Il y a ${diffDay}j` : `Dans ${diffDay}j`;
        } else {
            return formatDate.short(date);
        }
    },

    // Check if date is today
    isToday: (date: string | Date): boolean => {
        const d = new Date(date);
        const today = new Date();
        return d.toDateString() === today.toDateString();
    },

    // Check if date is tomorrow
    isTomorrow: (date: string | Date): boolean => {
        const d = new Date(date);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return d.toDateString() === tomorrow.toDateString();
    },
};

// ============================================
// Number Formatting Utilities
// ============================================

export const formatNumber = {
    // Format: "1,234,567"
    withCommas: (num: number): string => {
        return num.toLocaleString('fr-FR');
    },

    // Format: "1.2M", "45K"
    compact: (num: number): string => {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        } else if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toString();
    },

    // Format: "1 234 567,89 MAD"
    currency: (amount: number, currency = 'MAD'): string => {
        return `${amount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
    },

    // Format: "45%"
    percentage: (value: number, decimals = 0): string => {
        return `${value.toFixed(decimals)}%`;
    },

    // Format: "3.5" (for ratings)
    rating: (value: number): string => {
        return value.toFixed(1);
    },
};

// ============================================
// String Formatting Utilities
// ============================================

export const formatString = {
    // Capitalize first letter
    capitalize: (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    // Title case: "hello world" -> "Hello World"
    titleCase: (str: string): string => {
        return str
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },

    // Truncate with ellipsis
    truncate: (str: string, maxLength: number): string => {
        if (str.length <= maxLength) return str;
        return `${str.slice(0, maxLength)}...`;
    },

    // Remove accents
    removeAccents: (str: string): string => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    },

    // Slugify: "Hello World!" -> "hello-world"
    slugify: (str: string): string => {
        return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },

    // Format phone number
    phone: (phone: string): string => {
        // Remove all non-digits
        const cleaned = phone.replace(/\D/g, '');

        // Format as: +212 6XX-XXXXXX
        if (cleaned.startsWith('212')) {
            return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        }

        // Format as: 06XX-XXXXXX
        if (cleaned.startsWith('0')) {
            return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
        }

        return phone;
    },
};

// ============================================
// Match/Score Formatting
// ============================================

export const formatMatch = {
    // Format score: "2-1"
    score: (homeScore: number, awayScore: number): string => {
        return `${homeScore}-${awayScore}`;
    },

    // Format match status
    status: (status: 'scheduled' | 'live' | 'finished'): string => {
        const statusMap = {
            scheduled: 'À venir',
            live: 'En direct',
            finished: 'Terminé',
        };
        return statusMap[status];
    },

    // Format match time (e.g., "45'+2")
    matchTime: (minute: number, addedTime = 0): string => {
        if (addedTime > 0) {
            return `${minute}'+${addedTime}`;
        }
        return `${minute}'`;
    },
};

// ============================================
// File Size Formatting
// ============================================

export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// ============================================
// Color Utilities
// ============================================

export const colorUtils = {
    // Convert hex to RGB
    hexToRgb: (hex: string): { r: number; g: number; b: number } | null => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : null;
    },

    // Get contrast color (black or white)
    getContrastColor: (hex: string): string => {
        const rgb = colorUtils.hexToRgb(hex);
        if (!rgb) return '#000000';

        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        return brightness > 128 ? '#000000' : '#FFFFFF';
    },
};

// ============================================
// Array Utilities
// ============================================

export const arrayUtils = {
    // Shuffle array
    shuffle: <T>(array: T[]): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    // Get unique items
    unique: <T>(array: T[]): T[] => {
        return Array.from(new Set(array));
    },

    // Group by key
    groupBy: <T>(array: T[], key: keyof T): Record<string, T[]> => {
        return array.reduce((result, item) => {
            const groupKey = String(item[key]);
            if (!result[groupKey]) {
                result[groupKey] = [];
            }
            result[groupKey].push(item);
            return result;
        }, {} as Record<string, T[]>);
    },

    // Chunk array
    chunk: <T>(array: T[], size: number): T[][] => {
        const chunks: T[][] = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    },
};

// ============================================
// URL Utilities
// ============================================

export const urlUtils = {
    // Build query string
    buildQueryString: (params: Record<string, string | number | boolean>): string => {
        const query = Object.entries(params)
            .filter(([, value]) => value !== undefined && value !== null && value !== '')
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
            .join('&');
        return query ? `?${query}` : '';
    },

    // Parse query string
    parseQueryString: (queryString: string): Record<string, string> => {
        const params: Record<string, string> = {};
        const query = queryString.startsWith('?') ? queryString.slice(1) : queryString;

        query.split('&').forEach((param) => {
            const [key, value] = param.split('=');
            if (key) {
                params[decodeURIComponent(key)] = decodeURIComponent(value || '');
            }
        });

        return params;
    },
};

// ============================================
// Export all utilities
// ============================================

export default {
    formatDate,
    formatNumber,
    formatString,
    formatMatch,
    formatFileSize,
    colorUtils,
    arrayUtils,
    urlUtils,
};
