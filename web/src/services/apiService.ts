import api from './api';
import type {
    ApiResponse,
    PaginatedResponse,
    Match,
    League,
    Team,
    Product,
    Order,
    User
} from '@/types/components';

// ============================================
// Authentication API
// ============================================

export const authApi = {
    login: async (email: string, password: string): Promise<ApiResponse<{ token: string; user: User }>> => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    register: async (userData: { name: string; email: string; password: string }): Promise<ApiResponse<{ token: string; user: User }>> => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    logout: async (): Promise<ApiResponse> => {
        const response = await api.post('/auth/logout');
        return response.data;
    },

    getCurrentUser: async (): Promise<ApiResponse<User>> => {
        const response = await api.get('/auth/me');
        return response.data;
    },
};

// ============================================
// Matches API
// ============================================

export const matchesApi = {
    getAll: async (params?: {
        league?: string;
        date?: string;
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<Match>> => {
        const response = await api.get('/matches', { params });
        return response.data;
    },

    getById: async (id: string): Promise<ApiResponse<Match>> => {
        const response = await api.get(`/matches/${id}`);
        return response.data;
    },

    getLive: async (): Promise<ApiResponse<Match[]>> => {
        const response = await api.get('/matches/live');
        return response.data;
    },

    getUpcoming: async (limit = 10): Promise<ApiResponse<Match[]>> => {
        const response = await api.get('/matches/upcoming', { params: { limit } });
        return response.data;
    },
};

// ============================================
// Leagues API
// ============================================

export const leaguesApi = {
    getAll: async (): Promise<ApiResponse<League[]>> => {
        const response = await api.get('/leagues');
        return response.data;
    },

    getById: async (id: string): Promise<ApiResponse<League>> => {
        const response = await api.get(`/leagues/${id}`);
        return response.data;
    },

    getStandings: async (leagueId: string): Promise<ApiResponse> => {
        const response = await api.get(`/leagues/${leagueId}/standings`);
        return response.data;
    },
};

// ============================================
// Teams API
// ============================================

export const teamsApi = {
    getAll: async (): Promise<ApiResponse<Team[]>> => {
        const response = await api.get('/teams');
        return response.data;
    },

    getById: async (id: string): Promise<ApiResponse<Team>> => {
        const response = await api.get(`/teams/${id}`);
        return response.data;
    },

    getMatches: async (teamId: string): Promise<ApiResponse<Match[]>> => {
        const response = await api.get(`/teams/${teamId}/matches`);
        return response.data;
    },
};

// ============================================
// Products API (E-commerce)
// ============================================

export const productsApi = {
    getAll: async (params?: {
        category?: string;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<Product>> => {
        const response = await api.get('/products', { params });
        return response.data;
    },

    getById: async (id: string): Promise<ApiResponse<Product>> => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    getFeatured: async (): Promise<ApiResponse<Product[]>> => {
        const response = await api.get('/products/featured');
        return response.data;
    },
};

// ============================================
// Orders API
// ============================================

export const ordersApi = {
    create: async (orderData: Partial<Order>): Promise<ApiResponse<Order>> => {
        const response = await api.post('/orders', orderData);
        return response.data;
    },

    getAll: async (): Promise<ApiResponse<Order[]>> => {
        const response = await api.get('/orders');
        return response.data;
    },

    getById: async (id: string): Promise<ApiResponse<Order>> => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },

    updateStatus: async (id: string, status: Order['status']): Promise<ApiResponse<Order>> => {
        const response = await api.patch(`/orders/${id}/status`, { status });
        return response.data;
    },
};

// ============================================
// User/Profile API
// ============================================

export const userApi = {
    getProfile: async (): Promise<ApiResponse<User>> => {
        const response = await api.get('/user/profile');
        return response.data;
    },

    updateProfile: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
        const response = await api.patch('/user/profile', userData);
        return response.data;
    },

    getFavorites: async (): Promise<ApiResponse<{ teams: Team[]; leagues: League[] }>> => {
        const response = await api.get('/user/favorites');
        return response.data;
    },

    addFavoriteTeam: async (teamId: string): Promise<ApiResponse> => {
        const response = await api.post('/user/favorites/teams', { teamId });
        return response.data;
    },

    removeFavoriteTeam: async (teamId: string): Promise<ApiResponse> => {
        const response = await api.delete(`/user/favorites/teams/${teamId}`);
        return response.data;
    },

    addFavoriteLeague: async (leagueId: string): Promise<ApiResponse> => {
        const response = await api.post('/user/favorites/leagues', { leagueId });
        return response.data;
    },

    removeFavoriteLeague: async (leagueId: string): Promise<ApiResponse> => {
        const response = await api.delete(`/user/favorites/leagues/${leagueId}`);
        return response.data;
    },
};

// ============================================
// Notifications API
// ============================================

export const notificationsApi = {
    getAll: async (): Promise<ApiResponse> => {
        const response = await api.get('/notifications');
        return response.data;
    },

    markAsRead: async (id: string): Promise<ApiResponse> => {
        const response = await api.patch(`/notifications/${id}/read`);
        return response.data;
    },

    markAllAsRead: async (): Promise<ApiResponse> => {
        const response = await api.patch('/notifications/read-all');
        return response.data;
    },
};

// ============================================
// Tickets API
// ============================================

export const ticketsApi = {
    getMyTickets: async (): Promise<ApiResponse> => {
        const response = await api.get('/tickets/my-tickets');
        return response.data;
    },

    getById: async (id: string): Promise<ApiResponse> => {
        const response = await api.get(`/tickets/${id}`);
        return response.data;
    },

    validateTicket: async (qrCode: string): Promise<ApiResponse> => {
        const response = await api.post('/tickets/validate', { qrCode });
        return response.data;
    },
};

// ============================================
// Admin API
// ============================================

export const adminApi = {
    getStats: async (): Promise<ApiResponse<{
        users: number;
        tickets: number;
        revenue: number;
        scanners: number;
        revenueChange: string;
        usersChange: string;
        ticketsChange: string;
    }>> => {
        const response = await api.get('/admin/stats');
        return response.data;
    },

    getUsers: async (params?: { page?: number; limit?: number; search?: string }): Promise<PaginatedResponse<User>> => {
        const response = await api.get('/admin/users', { params });
        return response.data;
    },

    getTicketLogs: async (limit = 10): Promise<ApiResponse> => {
        const response = await api.get('/admin/tickets/logs', { params: { limit } });
        return response.data;
    },

    updateUserRole: async (userId: string, role: string): Promise<ApiResponse> => {
        const response = await api.patch(`/admin/users/${userId}/role`, { role });
        return response.data;
    },
};

// Export all APIs
export default {
    auth: authApi,
    matches: matchesApi,
    leagues: leaguesApi,
    teams: teamsApi,
    products: productsApi,
    orders: ordersApi,
    user: userApi,
    notifications: notificationsApi,
    tickets: ticketsApi,
    admin: adminApi,
};
