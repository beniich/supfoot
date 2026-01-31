// ============================================
// Error Handling Utilities
// ============================================

export class AppError extends Error {
    constructor(
        message: string,
        public code?: string,
        public statusCode?: number,
        public details?: unknown
    ) {
        super(message);
        this.name = 'AppError';
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

// ============================================
// Error Messages
// ============================================

export const ERROR_MESSAGES = {
    // Network Errors
    NETWORK_ERROR: 'Erreur de connexion. Veuillez vérifier votre connexion internet.',
    TIMEOUT_ERROR: 'La requête a pris trop de temps. Veuillez réessayer.',
    SERVER_ERROR: 'Erreur serveur. Veuillez réessayer plus tard.',

    // Authentication Errors
    UNAUTHORIZED: 'Vous devez être connecté pour accéder à cette ressource.',
    FORBIDDEN: 'Vous n\'avez pas les permissions nécessaires.',
    INVALID_CREDENTIALS: 'Email ou mot de passe incorrect.',
    TOKEN_EXPIRED: 'Votre session a expiré. Veuillez vous reconnecter.',

    // Validation Errors
    REQUIRED_FIELD: 'Ce champ est requis.',
    INVALID_EMAIL: 'Adresse email invalide.',
    INVALID_PASSWORD: 'Le mot de passe doit contenir au moins 8 caractères.',
    PASSWORD_MISMATCH: 'Les mots de passe ne correspondent pas.',

    // Resource Errors
    NOT_FOUND: 'Ressource introuvable.',
    ALREADY_EXISTS: 'Cette ressource existe déjà.',

    // Payment Errors
    PAYMENT_FAILED: 'Le paiement a échoué. Veuillez réessayer.',
    INVALID_CARD: 'Carte bancaire invalide.',
    INSUFFICIENT_FUNDS: 'Fonds insuffisants.',

    // Generic
    UNKNOWN_ERROR: 'Une erreur inattendue s\'est produite.',
} as const;

// ============================================
// Error Handler Function
// ============================================

export function handleError(error: unknown): AppError {
    // If it's already an AppError, return it
    if (error instanceof AppError) {
        return error;
    }

    // If it's a standard Error
    if (error instanceof Error) {
        return new AppError(error.message);
    }

    // If it's an Axios error
    if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
            response?: {
                status: number;
                data?: { message?: string; error?: string };
            };
            message: string;
        };

        const status = axiosError.response?.status;
        const message = axiosError.response?.data?.message || axiosError.response?.data?.error;

        switch (status) {
            case 400:
                return new AppError(message || 'Requête invalide', 'BAD_REQUEST', 400);
            case 401:
                return new AppError(ERROR_MESSAGES.UNAUTHORIZED, 'UNAUTHORIZED', 401);
            case 403:
                return new AppError(ERROR_MESSAGES.FORBIDDEN, 'FORBIDDEN', 403);
            case 404:
                return new AppError(ERROR_MESSAGES.NOT_FOUND, 'NOT_FOUND', 404);
            case 409:
                return new AppError(ERROR_MESSAGES.ALREADY_EXISTS, 'CONFLICT', 409);
            case 500:
                return new AppError(ERROR_MESSAGES.SERVER_ERROR, 'SERVER_ERROR', 500);
            default:
                return new AppError(message || axiosError.message || ERROR_MESSAGES.UNKNOWN_ERROR);
        }
    }

    // Unknown error type
    return new AppError(ERROR_MESSAGES.UNKNOWN_ERROR);
}

// ============================================
// Error Display Helper
// ============================================

export function getErrorMessage(error: unknown): string {
    const appError = handleError(error);
    return appError.message;
}

// ============================================
// Validation Helpers
// ============================================

export const validators = {
    email: (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    password: (password: string): boolean => {
        return password.length >= 8;
    },

    required: (value: string | number | boolean | null | undefined): boolean => {
        if (typeof value === 'string') {
            return value.trim().length > 0;
        }
        return value !== null && value !== undefined;
    },

    phone: (phone: string): boolean => {
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
        return phoneRegex.test(phone);
    },

    url: (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },

    minLength: (value: string, min: number): boolean => {
        return value.length >= min;
    },

    maxLength: (value: string, max: number): boolean => {
        return value.length <= max;
    },

    match: (value1: string, value2: string): boolean => {
        return value1 === value2;
    },
};

// ============================================
// Form Validation Helper
// ============================================

export interface ValidationRule {
    validator: (value: string) => boolean;
    message: string;
}

export interface ValidationRules {
    [key: string]: ValidationRule[];
}

export interface ValidationErrors {
    [key: string]: string;
}

export function validateForm(
    data: Record<string, string>,
    rules: ValidationRules
): ValidationErrors {
    const errors: ValidationErrors = {};

    Object.keys(rules).forEach((field) => {
        const fieldRules = rules[field];
        const value = data[field] || '';

        for (const rule of fieldRules) {
            if (!rule.validator(value)) {
                errors[field] = rule.message;
                break; // Stop at first error for this field
            }
        }
    });

    return errors;
}

// ============================================
// Retry Helper
// ============================================

export async function retryAsync<T>(
    fn: () => Promise<T>,
    maxAttempts = 3,
    delay = 1000
): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error instanceof Error ? error : new Error('Unknown error');

            if (attempt < maxAttempts) {
                // Wait before retrying
                await new Promise((resolve) => setTimeout(resolve, delay * attempt));
            }
        }
    }

    throw lastError!;
}

// ============================================
// Safe JSON Parse
// ============================================

export function safeJsonParse<T>(json: string, fallback: T): T {
    try {
        return JSON.parse(json) as T;
    } catch {
        return fallback;
    }
}

// ============================================
// Logger Utility
// ============================================

export const logger = {
    info: (message: string, ...args: unknown[]) => {
        if (process.env.NODE_ENV !== 'production') {
            console.log(`[INFO] ${message}`, ...args);
        }
    },

    warn: (message: string, ...args: unknown[]) => {
        if (process.env.NODE_ENV !== 'production') {
            console.warn(`[WARN] ${message}`, ...args);
        }
    },

    error: (message: string, error?: unknown, ...args: unknown[]) => {
        console.error(`[ERROR] ${message}`, error, ...args);
    },

    debug: (message: string, ...args: unknown[]) => {
        if (process.env.NODE_ENV === 'development') {
            console.debug(`[DEBUG] ${message}`, ...args);
        }
    },
};
