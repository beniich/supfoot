import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/services/api';
import { User } from '@/types/components';

interface AuthState {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
}

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = useCallback(async () => {
        try {
            if (typeof window === 'undefined') return;

            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (!token) {
                setLoading(false);
                setIsAuthenticated(false);
                setUser(null);
                return;
            }

            // Optimistic update from local storage
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                } catch (e) {
                    console.error('Error parsing stored user', e);
                }
            }

            try {
                // Verify with backend
                const response = await apiClient.get('/auth/me'); // Using /auth based on new routes
                if (response.data.success) {
                    setUser(response.data.user);
                    setIsAuthenticated(true);
                    localStorage.setItem('user', JSON.stringify(response.data.user)); // Update fresh data
                }
            } catch (err) {
                // Determine if strict logout is needed
                // For now, if /me fails, we assume token is invalid
                console.error('Auth verification failed', err);
            }

        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const login = useCallback(async (email: string, password: string) => {
        try {
            const response = await apiClient.post('/auth/login', {
                email,
                password,
            });

            if (response.data.success) {
                const { token, user } = response.data;

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                setUser(user);
                setIsAuthenticated(true);

                return { success: true };
            }
            return { success: false, message: 'Invalid response' };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed',
            };
        }
    }, []);

    const register = useCallback(async (data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }) => {
        try {
            const response = await apiClient.post('/auth/register', data);

            if (response.data.success) {
                const { token, user } = response.data;

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                setUser(user);
                setIsAuthenticated(true);

                return { success: true };
            }
            return { success: false, message: 'Invalid response' };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed',
                errors: error.response?.data?.errors,
            };
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            setIsAuthenticated(false);
            window.location.href = '/login';
        }
    }, []);

    const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
        try {
            const response = await apiClient.post('/auth/change-password', {
                currentPassword,
                newPassword,
            });

            return {
                success: response.data.success,
                message: response.data.message,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to change password',
            };
        }
    }, []);

    return {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        changePassword,
    };
};
