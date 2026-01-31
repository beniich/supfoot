import { Capacitor } from '@capacitor/core';

export const API_CONFIG = {
    baseURL: Capacitor.isNativePlatform()
        ? 'https://api.footballhub.com/api' // Production API - TODO: Change this to real endpoint
        : 'http://localhost:5000/api',      // Development API

    timeout: 10000,

    headers: {
        'Content-Type': 'application/json',
    },
};

export const getApiUrl = () => API_CONFIG.baseURL;
