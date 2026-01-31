import React, { useState } from 'react';
import { ChevronLeft, Calendar, MapPin, QrCode, Ticket, ShoppingBag, Home, User, TrendingUp, Users, DollarSign, Bell, Menu, Search, Plus, X, Download, Share2, Camera } from 'lucide-react';

// ============================================================================
// FOOTBALLHUB+ - APPLICATION COMPLÈTE ORCHESTRÉE
// Design System Premium avec Navigation Harmonieuse
// ============================================================================

// Utilitaire de classes
const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
};

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Event {
    id: string;
    title: string;
    category: 'MATCH' | 'TOURNAMENT' | 'TRAINING' | 'SOCIAL';
    coverImage: string;
    startDate: string;
    venue: string;
    city: string;
    price: number;
    status: 'UPCOMING' | 'LIVE' | 'ENDED';
}

interface Ticket {
    id: string;
    ticketNumber: string;
    ticketType: 'VIP' | 'STANDARD' | 'EARLY_BIRD';
    qrCode: string;
    isValidated: boolean;
    event: Event;
}

interface Product {
    id: string;
    name: string;
    price: number;
    comparePrice?: number;
    images: string[];
    category: 'JERSEY' | 'TRAINING' | 'ACCESSORIES' | 'MEMORABILIA';
    stock: number;
    featured?: boolean;
}

// ============================================================================
// COMPOSANTS UI DE BASE
// ============================================================================

const Button: React.FC<{
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    className?: string;
    icon?: React.ReactNode;
}> = ({ children, variant = 'primary', size = 'md', onClick, className, icon }) => {
    const variants = {
        primary: 'bg-primary hover:bg-primary/90 text-black font-bold shadow-lg shadow-primary/20',
        secondary: 'bg-surface-card hover:bg-surface-elevated text-white border border-white/10',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-black',
        ghost: 'text-white hover:bg-white/10',
    };

    const sizes = {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 active:scale-95',
                variants[variant],
                sizes[size],
                className
            )}
        >
            {icon}
            {children}
        </button>
    );
};

const Card: React.FC<{
    children: React.ReactNode;
    variant?: 'default' | 'glass' | 'elevated';
    className?: string;
}> = ({ children, variant = 'default', className }) => {
    const variants = {
        default: 'bg-surface-dark border border-white/10',
        glass: 'bg-surface-dark/70 backdrop-blur-xl border border-white/10',
        elevated: 'bg-surface-card shadow-elevation-md',
    };

    return (
        <div className={cn('rounded-2xl overflow-hidden transition-all', variants[variant], className)}>
            {children}
        </div>
    );
};

const Badge: React.FC<{
    children: React.ReactNode;
    variant?: 'primary' | 'success' | 'warning';
}> = ({ children, variant = 'primary' }) => {
    const variants = {
        primary: 'bg-primary/20 text-primary border-primary/30',
        success: 'bg-green-500/20 text-green-400 border-green-500/30',
        warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    };

    return (
        <span className={cn('inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border', variants[variant])}>
            {children}
        </span>
    );
};

// ============================================================================
// HEADER COMPONENT
// ============================================================================

const Header: React.FC<{
    title: string;
    subtitle?: string;
    showBack?: boolean;
    onBack?: () => void;
    actions?: React.ReactNode;
}> = ({ title, subtitle, showBack, onBack, actions }) => {
    return (
        <header className="sticky top-0 z-40 bg-background-dark/95 backdrop-blur-xl border-b border-white/10">
            <div className="flex items-center justify-between px-6 py-4">
                {showBack ? (
                    <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                ) : (
                    <button className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
                        <Menu size={24} />
                    </button>
                )}

                <div className="flex flex-col items-center">
                    <h1 className="text-lg font-bold tracking-tight">{title}</h1>
                    {subtitle && <span className="text-xs text-primary/80 font-medium uppercase tracking-wide">{subtitle}</span>}
                </div>

                {actions || (
                    <button className="flex items-center justify-center size-10 rounded-full bg-primary/20 border border-primary/30">
                        <User size={20} className="text-primary" />
                    </button>
                )}
            </div>
        </header>
    );
};

// ============================================================================
// BOTTOM NAVIGATION
// ============================================================================

const BottomNav: React.FC<{
    currentPage: string;
    onNavigate: (page: string) => void;
}> = ({ currentPage, onNavigate }) => {
    const navItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'tickets', label: 'Tickets', icon: Ticket },
        { id: 'shop', label: 'Shop', icon: ShoppingBag },
        { id: 'profile', label: 'Profile', icon: User },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-dark/95 backdrop-blur-xl border-t border-white/10 pb-safe-bottom">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={cn(
                                'flex flex-col items-center gap-1 px-3 py-2 transition-colors min-w-[60px]',
                                isActive ? 'text-primary' : 'text-gray-400 hover:text-white'
                            )}
                        >
                            <Icon size={24} className={isActive ? 'scale-110 transition-transform' : ''} />
                            <span className={cn('text-[10px] font-medium uppercase tracking-wide', isActive && 'font-bold')}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

// ============================================================================
// PAGE: CLUB DASHBOARD (Admin)
// ============================================================================

const ClubDashboard: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-background-dark pb-20">
            <Header title="Dashboard" subtitle="Manager View" />

            <main className="flex flex-col gap-6 p-6">
                {/* Welcome */}
                <div className="flex flex-col gap-1 pt-2">
                    <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                    <p className="text-gray-400 text-sm">Here's what's happening at the club today.</p>
                </div>

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 gap-4">
                    {/* Total Members */}
                    <Card variant="glass" className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex flex-col gap-1">
                                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Members</p>
                                <h3 className="text-3xl font-bold text-white">1,245</h3>
                            </div>
                            <Badge variant="success">
                                <TrendingUp size={14} />
                                +12%
                            </Badge>
                        </div>
                        {/* Mini Chart */}
                        <div className="h-20 relative">
                            <svg className="w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#F2CC0D" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#F2CC0D" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M0 60 C40 60, 60 30, 100 35 C140 40, 160 20, 200 25 C240 30, 260 50, 300 45 C340 40, 360 15, 400 10 V 80 H 0 Z"
                                    fill="url(#chartGradient)"
                                />
                                <path
                                    d="M0 60 C40 60, 60 30, 100 35 C140 40, 160 20, 200 25 C240 30, 260 50, 300 45 C340 40, 360 15, 400 10"
                                    fill="none"
                                    stroke="#F2CC0D"
                                    strokeWidth="3"
                                />
                            </svg>
                        </div>
                    </Card>

                    {/* Revenue */}
                    <Card variant="glass" className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex flex-col gap-1">
                                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Ticket Revenue</p>
                                <h3 className="text-3xl font-bold text-white">$14,500</h3>
                            </div>
                            <Badge variant="success">
                                <TrendingUp size={14} />
                                +8.5%
                            </Badge>
                        </div>
                        <div className="h-20 relative">
                            <svg className="w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
                                <path
                                    d="M0 55 C50 55, 70 45, 100 50 C130 55, 150 30, 200 20 C250 10, 270 40, 320 30 C360 22, 380 10, 400 5"
                                    fill="none"
                                    stroke="#F2CC0D"
                                    strokeWidth="3"
                                />
                            </svg>
                        </div>
                    </Card>

                    {/* Active Events */}
                    <Card variant="glass" className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Active Events</p>
                                <h3 className="text-3xl font-bold text-white">3</h3>
                                <p className="text-green-400 text-xs font-medium mt-1 flex items-center gap-1">
                                    <Plus size={14} />
                                    +1 this week
                                </p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <Ticket size={24} />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Recent Activity */}
                <div className="flex flex-col gap-4 mt-2">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-lg font-bold text-white tracking-tight">Recent Activity</h3>
                        <button className="text-primary text-sm font-semibold hover:text-primary/80">View All</button>
                    </div>

                    <Card variant="default" className="divide-y divide-white/5">
                        {[
                            { icon: Users, color: 'bg-blue-500/20 text-blue-400', title: 'New Member Sign-up', desc: 'Sarah Jenkins joined the club', time: '2m ago' },
                            { icon: QrCode, color: 'bg-primary/20 text-primary', title: 'Ticket Validated', desc: 'Gate A - Section 104', time: '14m ago' },
                            { icon: Calendar, color: 'bg-purple-500/20 text-purple-400', title: 'Match Created', desc: 'vs. Northside Rivals FC', time: '1h ago' },
                        ].map((activity, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors">
                                <div className={cn('flex h-10 w-10 items-center justify-center rounded-full', activity.color)}>
                                    <activity.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-white">{activity.title}</p>
                                    <p className="text-xs text-gray-400">{activity.desc}</p>
                                </div>
                                <p className="text-xs font-medium text-gray-500">{activity.time}</p>
                            </div>
                        ))}
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                    <Button variant="primary">
                        <QrCode size={18} />
                        Scan Ticket
                    </Button>
                    <Button variant="outline">
                        <Plus size={18} />
                        New Event
                    </Button>
                </div>
            </main>
        </div>
    );
};

// ============================================================================
// PAGE: EVENTS DISCOVERY
// ============================================================================

const EventsPage: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');

    const events: Event[] = [
        {
            id: '1',
            title: 'FC Lions vs. Tigers',
            category: 'MATCH',
            coverImage: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800',
            startDate: '2024-10-12T19:00:00',
            venue: 'Main Stadium',
            city: 'Downtown',
            price: 45,
            status: 'UPCOMING',
        },
        {
            id: '2',
            title: 'U-18 Tournament Finals',
            category: 'TOURNAMENT',
            coverImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
            startDate: '2024-10-15T10:00:00',
            venue: 'Training Ground A',
            city: 'North District',
            price: 0,
            status: 'UPCOMING',
        },
    ];

    return (
        <div className="min-h-screen bg-background-dark pb-20">
            <Header title="Events" />

            {/* Search Bar */}
            <div className="px-6 py-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="w-full h-12 pl-10 pr-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-3 overflow-x-auto px-6 pb-4 scrollbar-hide">
                {['All', 'Matches', 'Tournaments', 'VIP', 'Training'].map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter.toLowerCase())}
                        className={cn(
                            'flex-shrink-0 h-9 px-5 rounded-full text-sm font-medium transition-all',
                            selectedFilter === filter.toLowerCase()
                                ? 'bg-primary text-black'
                                : 'bg-white/10 text-white/80 border border-white/10 hover:bg-white/20'
                        )}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Events Grid */}
            <main className="flex flex-col gap-6 p-6">
                {events.map((event) => (
                    <Card key={event.id} variant="glass" className="overflow-hidden group cursor-pointer hover:shadow-glow-md transition-all">
                        <div className="relative h-48">
                            <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />

                            <div className="absolute top-3 right-3">
                                <Badge variant="primary">{event.category}</Badge>
                            </div>

                            {/* Contenu */}
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-300">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={16} className="text-primary" />
                                        12 Oct, 19:00
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin size={16} className="text-primary" />
                                        {event.venue}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 border-t border-white/10 flex items-center justify-between">
                            <span className="text-2xl font-bold text-primary">${event.price.toFixed(2)}</span>
                            <Button variant="primary" size="sm">
                                <Ticket size={16} />
                                Buy Ticket
                            </Button>
                        </div>
                    </Card>
                ))}
            </main>
        </div>
    );
};

// ============================================================================
// PAGE: MY TICKETS
// ============================================================================

const TicketsPage: React.FC = () => {
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    const tickets: Ticket[] = [
        {
            id: '1',
            ticketNumber: 'TKT-ABC123',
            ticketType: 'VIP',
            qrCode: 'QR_CODE_DATA',
            isValidated: false,
            event: {
                id: '1',
                title: 'FC Lions vs. Tigers',
                category: 'MATCH',
                coverImage: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800',
                startDate: '2024-10-12T19:00:00',
                venue: 'Main Stadium',
                city: 'Downtown',
                price: 45,
                status: 'UPCOMING',
            },
        },
    ];

    return (
        <div className="min-h-screen bg-background-dark pb-20">
            <Header title="My Tickets" />

            <main className="flex flex-col gap-4 p-6">
                {tickets.map((ticket) => (
                    <Card key={ticket.id} variant="glass" className="overflow-hidden">
                        {/* Header avec gradient */}
                        <div className="h-2 bg-gradient-to-r from-yellow-500 to-primary" />

                        {/* Contenu */}
                        <div className="p-5 space-y-4">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">{ticket.event.title}</h3>
                                <p className="text-xs text-gray-400 font-mono">{ticket.ticketNumber}</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Calendar size={16} className="text-primary" />
                                    <span>12 Oct 2024, 19:00</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <MapPin size={16} className="text-primary" />
                                    <span>{ticket.event.venue}, {ticket.event.city}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <Button
                                    variant="primary"
                                    className="w-full"
                                    onClick={() => setSelectedTicket(ticket)}
                                    icon={<QrCode size={20} />}
                                >
                                    Show QR Code
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </main>

            {/* QR Modal */}
            {selectedTicket && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
                    <Card variant="glass" className="w-full max-w-md">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold">Your Ticket</h3>
                                <button onClick={() => setSelectedTicket(null)} className="p-2 hover:bg-white/10 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* QR Code */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="bg-white p-4 rounded-xl">
                                    <div className="w-64 h-64 bg-gray-200 flex items-center justify-center">
                                        <QrCode size={200} className="text-black" />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <p className="font-semibold">{selectedTicket.event.title}</p>
                                    <p className="text-sm text-gray-400">{selectedTicket.ticketNumber}</p>
                                </div>

                                <div className="flex gap-2 w-full">
                                    <Button variant="outline" className="flex-1" icon={<Download size={16} />}>
                                        Download
                                    </Button>
                                    <Button variant="outline" className="flex-1" icon={<Share2 size={16} />}>
                                        Share
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

// ============================================================================
// PAGE: SHOP
// ============================================================================

const ShopPage: React.FC = () => {
    const [cartCount, setCartCount] = useState(2);

    const products: Product[] = [
        {
            id: '1',
            name: '23/24 Home Jersey',
            price: 85,
            images: ['https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=500'],
            category: 'JERSEY',
            stock: 50,
        },
        {
            id: '2',
            name: 'Pro Training Top',
            price: 55,
            images: ['https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500'],
            category: 'TRAINING',
            stock: 30,
            featured: true,
        },
        {
            id: '3',
            name: 'Club Scarf',
            price: 20,
            images: ['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500'],
            category: 'ACCESSORIES',
            stock: 100,
        },
        {
            id: '4',
            name: 'Signed Football',
            price: 150,
            comparePrice: 200,
            images: ['https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500'],
            category: 'MEMORABILIA',
            stock: 5,
        },
    ];

    return (
        <div className="min-h-screen bg-background-dark pb-20">
            <Header title="Official Store" />

            {/* Search */}
            <div className="px-6 py-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search for kits, gifts..."
                        className="w-full h-12 pl-10 pr-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="flex gap-3 overflow-x-auto px-6 pb-4 scrollbar-hide">
                {['All', 'Jerseys', 'Training', 'Accessories', 'Memorabilia'].map((cat) => (
                    <button
                        key={cat}
                        className="flex-shrink-0 h-9 px-5 rounded-full text-sm font-medium bg-white/10 text-white/80 border border-white/10 hover:bg-white/20 transition-all first:bg-primary first:text-black first:border-transparent"
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <main className="p-6">
                <div className="grid grid-cols-2 gap-4">
                    {products.map((product) => (
                        <Card key={product.id} variant="elevated" className="group cursor-pointer hover:shadow-lg transition-all">
                            <div className="relative aspect-[4/5] overflow-hidden bg-gray-800">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {product.featured && (
                                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white">
                                        Best Seller
                                    </div>
                                )}
                                <button className="absolute bottom-3 right-3 h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-black transition-colors">
                                    <Plus size={20} />
                                </button>
                            </div>

                            <div className="p-3">
                                <h3 className="text-sm font-bold text-white line-clamp-2 mb-1">{product.name}</h3>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-primary font-bold">${product.price}</p>
                                    {product.comparePrice && (
                                        <p className="text-xs text-gray-500 line-through">${product.comparePrice}</p>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>

            {/* Floating Cart Button */}
            <button className="fixed bottom-24 right-6 z-30 flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold h-14 pl-4 pr-6 rounded-2xl shadow-lg shadow-primary/30 transition-all active:scale-95">
                <div className="relative">
                    <ShoppingBag size={24} />
                    <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                        {cartCount}
                    </span>
                </div>
                <span>Cart</span>
            </button>
        </div>
    );
};

// ============================================================================
// MAIN APP COMPONENT - ORCHESTRATION
// ============================================================================

export default function FootballHubApp() {
    const [currentPage, setCurrentPage] = useState('dashboard');

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <ClubDashboard onNavigate={setCurrentPage} />;
            case 'events':
                return <EventsPage />;
            case 'tickets':
                return <TicketsPage />;
            case 'shop':
                return <ShopPage />;
            default:
                return <ClubDashboard onNavigate={setCurrentPage} />;
        }
    };

    return (
        <div className="min-h-screen bg-background-dark text-white font-sans antialiased">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        :root {
          --primary: #F2CC0D;
          --primary-dark: #D4B20B;
          --background-dark: #1A1915;
          --surface-dark: #24221A;
          --surface-card: #2F2C1B;
        }
        
        body {
          font-family: 'Manrope', system-ui, sans-serif;
          background: var(--background-dark);
          color: white;
        }
        
        h1, h2, h3 {
          font-family: 'Space Grotesk', system-ui, sans-serif;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .bg-background-dark { background-color: var(--background-dark); }
        .bg-surface-dark { background-color: var(--surface-dark); }
        .bg-surface-card { background-color: var(--surface-card); }
        .bg-primary { background-color: var(--primary); }
        .text-primary { color: var(--primary); }
        .border-primary { border-color: var(--primary); }
      `}</style>

            {renderPage()}

            <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
        </div>
    );
}
