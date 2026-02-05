import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Use environment variable for API URL with fallback
export const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance with secure configuration
const api = axios.create({
    baseURL: getApiUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
    withCredentials: true, // Important for CORS and Cookies
});

// Request interceptor to include auth token
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Only access localStorage on client side
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            // Add CSRF token if available (future proofing)
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            if (csrfToken && config.headers) {
                config.headers['X-CSRF-Token'] = csrfToken;
            }
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
        const originalRequest = (error as { config?: { _retry?: boolean } }).config;

        // Handle 401 Unauthorized
        if ((error as { response?: { status?: number } })?.response?.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            if (typeof window !== 'undefined') {
                // Token expired or invalid
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                // Redirect to login if not already there
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
            }
        }

        // Handle 429 Too Many Requests
        if ((error as { response?: { status?: number } })?.response?.status === 429) {
            console.error('Too many requests. Please try again later.');
        }

        return Promise.reject(error);
    }
);

export const apiClient = api; // Alias for new code
export default api; // Default for existing code
