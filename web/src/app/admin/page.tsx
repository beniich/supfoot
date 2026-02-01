'use client';

import React, { useState, useEffect } from 'react';
import {
    Users, Ticket, ShoppingBag, DollarSign,
    Download, RefreshCw, Calendar, Activity
} from 'lucide-react';
import { StatsCard } from '@/components/admin/StatsCard';
import { RevenueChart } from '@/components/admin/RevenueChart';
import { UserChart } from '@/components/admin/UserChart';
import { RecentActivity } from '@/components/admin/RecentActivity';
import { TopProducts } from '@/components/admin/TopProducts';
import { ExportButton } from '@/components/admin/ExportButton';
import { apiClient } from '@/services/api';

interface DashboardStats {
    totalMembers: number;
    totalTickets: number;
    totalRevenue: number;
    totalOrders: number;
    activeEvents: number;
    todayScans: number;
    growthRate: {
        members: number;
        revenue: number;
        tickets: number;
    };
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchDashboardData();

        // Auto-refresh every 60 seconds
        const interval = setInterval(fetchDashboardData, 60000);
        return () => clearInterval(interval);
    }, []);

    const fetchDashboardData = async () => {
        try {
            setRefreshing(true);
            const response = await apiClient.get('/admin/dashboard/stats');
            if (response.data.success) {
                setStats(response.data.stats);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary animate-pulse italic">
                    Initialisation du centre de contrôle...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic flex items-center gap-3">
                        <span className="h-2 w-10 bg-primary rounded-full inline-block"></span>
                        Dashboard <span className="text-primary">Admin</span>
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#bab59c] opacity-60 mt-2">
                        Vue d&apos;ensemble de FootballHub+ • Temps Réel
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchDashboardData}
                        disabled={refreshing}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-[#bab59c] rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-[10px] font-black uppercase tracking-widest"
                    >
                        <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
                        <span>{refreshing ? 'Actualisation...' : 'Actualiser'}</span>
                    </button>

                    <ExportButton
                        endpoint="/admin/dashboard/export"
                        filename={`dashboard-report-${new Date().toISOString().split('T')[0]}`}
                        label="Rapport Complet"
                    />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Membres Totaux"
                    value={stats?.totalMembers?.toLocaleString() || 0}
                    change={stats?.growthRate.members || 0}
                    icon={Users}
                    color="blue"
                />

                <StatsCard
                    title="Billets Vendus"
                    value={stats?.totalTickets?.toLocaleString() || 0}
                    change={stats?.growthRate.tickets || 0}
                    icon={Ticket}
                    color="green"
                />

                <StatsCard
                    title="Revenus Totaux"
                    value={`${stats?.totalRevenue?.toLocaleString() || 0} DH`}
                    change={stats?.growthRate.revenue || 0}
                    icon={DollarSign}
                    color="yellow"
                />

                <StatsCard
                    title="Commandes Boutique"
                    value={stats?.totalOrders?.toLocaleString() || 0}
                    change={12.4}
                    icon={ShoppingBag}
                    color="purple"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#121214] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-700"></div>
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#bab59c] opacity-60">
                            Analyse des Revenus (30j)
                        </h3>
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Activity size={16} className="text-primary" />
                        </div>
                    </div>
                    <RevenueChart />
                </div>

                <div className="bg-[#121214] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 h-32 w-32 bg-blue-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-all duration-700"></div>
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#bab59c] opacity-60">
                            Nouveaux Membres (30j)
                        </h3>
                        <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Users size={16} className="text-blue-500" />
                        </div>
                    </div>
                    <UserChart />
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <RecentActivity />
                </div>

                <div>
                    <TopProducts />
                </div>
            </div>
        </div>
    );
}
