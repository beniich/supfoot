// ============================================
// Component Props Interfaces
// ============================================

// Common UI Components
export interface StatBarProps {
    label: string;
    value: string | number;
    color?: string;
    icon?: string;
}

export interface InfoRowProps {
    icon: string;
    label: string;
    value: string;
}

export interface ActionButtonProps {
    icon: string;
    label: string;
    onClick?: () => void;
}

export interface NavButtonProps {
    icon: string;
    label: string;
    href: string;
    active?: boolean;
}

// Referee Components
export interface MetricCardProps {
    icon: string;
    iconColor?: string;
    value: string;
    label: string;
    change?: string;
}

export interface RefereeCardProps {
    name: string;
    badge: string;
    score: string;
    image: string;
    games: string;
    cards: string;
    trend: number[];
}

export interface ChartCardProps {
    title: string;
    icon: string;
    children: React.ReactNode;
}

export interface MatchCardProps {
    league: string;
    date: string;
    rating: string;
    team1: string;
    team1Color: string;
    score: string;
    team2: string;
    team2Color: string;
    stats?: Array<{ color: string; text: string }>;
    fairness: string;
}

// Brand/Download Components
export interface DownloadButtonProps {
    platform: string;
    icon: string;
    badge: string;
    desc: string;
}

export interface SignInOptionProps {
    provider: string;
    icon: string;
    label: string;
}

// Video/Media Components
export interface RelatedVideoItemProps {
    title: string;
    author: string;
    time: string;
    duration: string;
    image: string;
}

// Comment Components
export interface CommentItemProps {
    user: string;
    time: string;
    content: string;
    votes: number;
    isStaff?: boolean;
    isReply?: boolean;
}

// ============================================
// Form Event Types
// ============================================

export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type TextAreaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}

// ============================================
// Data Models
// ============================================

export interface League {
    id: string;
    name: string;
    country: string;
    logo: string;
}

export interface Team {
    id: string;
    name: string;
    logo: string;
    shortName?: string;
}

export interface Match {
    id: string;
    homeTeam: Team;
    awayTeam: Team;
    date: string;
    time: string;
    venue?: string;
    league: League;
    status: 'scheduled' | 'live' | 'finished';
    score?: {
        home: number;
        away: number;
    };
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    membershipTier?: 'standard' | 'pro' | 'elite';
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    images: string[];
    category: string;
    sizes?: string[];
    colors?: Array<{ id: string; name: string; class: string }>;
    inStock: boolean;
}

export interface Order {
    id: string;
    userId: string;
    products: Array<{
        productId: string;
        quantity: number;
        size?: string;
        color?: string;
    }>;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}
