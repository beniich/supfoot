'use client';

import React, { useEffect, useState } from 'react';
import apiService from '@/services/apiService';

const StatCard = ({ title, value, change, icon, color, loading }: { title: string, value: string, change: string, icon: string, color: string, loading?: boolean }) => (
    <div className="relative overflow-hidden rounded-3xl bg-[#121214] border border-white/5 p-6 group hover:border-primary/20 transition-all duration-500">
        <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-10 blur-2xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-150`} style={{ backgroundColor: color }}></div>

        <div className="flex justify-between items-start mb-4">
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center bg-white/5 group-hover:bg-primary/10 transition-colors`}>
                <span className="material-symbols-outlined text-primary text-3xl filled">{icon}</span>
            </div>
            {!loading && change && (
                <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-green-500 italic">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    {change}
                </div>
            )}
        </div>

        <div className="flex flex-col">
            {loading ? (
                <div className="h-9 w-24 bg-white/5 animate-pulse rounded-lg mb-1"></div>
            ) : (
                <span className="text-3xl font-black tracking-tighter mb-1">{value}</span>
            )}
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#bab59c] opacity-60">{title}</span>
        </div>
    </div>
);

const ActivityItem = ({ title, time, user, icon }: { title: string, time: string, user: string, icon: string }) => (
    <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group">
        <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined text-xl text-[#bab59c] group-hover:text-primary transition-colors">{icon}</span>
        </div>
        <div className="flex-1">
            <p className="text-xs font-bold text-white uppercase tracking-tight">{title}</p>
            <p className="text-[10px] text-[#bab59c] opacity-60 uppercase tracking-widest">{user}</p>
        </div>
        <span className="text-[9px] font-black text-[#bab59c] opacity-40 uppercase italic">{time}</span>
    </div>
);

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState<any[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, activityRes] = await Promise.all([
                    apiService.admin.getStats(),
                    apiService.admin.getTicketLogs(5)
                ]);

                if (statsRes.success) setStats(statsRes.data);
                if (activityRes.success && Array.isArray(activityRes.data)) {
                    setActivities(activityRes.data);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic">
                        Vue <span className="text-primary italic">d&apos;ensemble</span>
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#bab59c] opacity-60 mt-2">
                        Bienvenue dans le centre de contrôle FootballHub+
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="h-11 px-6 rounded-xl border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                        <span className="material-symbols-outlined text-sm">download</span>
                        Exporter
                    </button>
                    <button className="h-11 px-6 rounded-xl bg-primary text-background-dark shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest italic">
                        <span className="material-symbols-outlined text-sm filled">add</span>
                        Nouveau Match
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Membres Actifs"
                    value={stats?.users?.toLocaleString() || "0"}
                    change={stats?.usersChange}
                    icon="group"
                    color="#f2cc0d"
                    loading={loading}
                />
                <StatCard
                    title="Billets Vendus"
                    value={stats?.tickets?.toLocaleString() || "0"}
                    change={stats?.ticketsChange}
                    icon="confirmation_number"
                    color="#3B82F6"
                    loading={loading}
                />
                <StatCard
                    title="Revenus (MAD)"
                    value={stats?.revenue?.toLocaleString() || "0"}
                    change={stats?.revenueChange}
                    icon="payments"
                    color="#10B981"
                    loading={loading}
                />
                <StatCard
                    title="Scanner Actifs"
                    value={stats?.scanners?.toString() || "0"}
                    change=""
                    icon="qr_code_scanner"
                    color="#F59E0B"
                    loading={loading}
                />
            </div>

            {/* Content Mid Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-1 rounded-3xl bg-[#121214] border border-white/5 p-8 h-full">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#bab59c] opacity-60 mb-6 flex items-center justify-between">
                        Activité Récente
                        <span className="material-symbols-outlined text-sm">blur_on</span>
                    </h3>
                    <div className="space-y-2">
                        {loading ? (
                            Array(5).fill(0).map((_, i) => (
                                <div key={i} className="h-16 bg-white/5 animate-pulse rounded-2xl"></div>
                            ))
                        ) : activities.length > 0 ? (
                            activities.map((act: any, idx: number) => (
                                <ActivityItem
                                    key={idx}
                                    title={act.action}
                                    user={act.details}
                                    time={act.time}
                                    icon={act.icon || "info"}
                                />
                            ))
                        ) : (
                            <p className="text-[10px] uppercase font-black text-white/20 text-center py-8 italic tracking-widest">Aucune activité récente</p>
                        )}
                    </div>
                </div>

                {/* Popular Matches / Quick Stats */}
                <div className="lg:col-span-2 rounded-3xl bg-[#121214] border border-white/5 p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#bab59c] opacity-60 mb-6">Prochains Événements Majeurs</h3>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-white/5">
                                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-[#bab59c]">
                                    <th className="py-4">Événement</th>
                                    <th className="py-4">Date</th>
                                    <th className="py-4">Ventes</th>
                                    <th className="py-4">Status</th>
                                    <th className="py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    Array(4).fill(0).map((_, i) => (
                                        <tr key={i}><td colSpan={5} className="py-5 h-12 bg-white/5 animate-pulse"></td></tr>
                                    ))
                                ) : (
                                    [
                                        { match: 'Raja vs Wydad', date: '15 Fév, 20:00', sales: '92%', status: 'Bientôt Complet', color: 'text-orange-400' },
                                        { match: 'FAR vs FUS', date: '12 Fév, 18:00', sales: '45%', status: 'En Vente', color: 'text-green-400' },
                                        { match: 'MAS vs RSB', date: '18 Fév, 20:45', sales: '12%', status: 'En Vente', color: 'text-green-400' },
                                        { match: 'HUSA vs MAT', date: '20 Fév, 19:00', sales: '05%', status: 'Nouveau', color: 'text-blue-400' }
                                    ].map((row, idx) => (
                                        <tr key={idx} className="group/row hover:bg-white/[0.02] transition-colors">
                                            <td className="py-5 font-bold text-sm italic uppercase tracking-tight">{row.match}</td>
                                            <td className="py-5 text-xs text-[#bab59c] opacity-80">{row.date}</td>
                                            <td className="py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary" style={{ width: row.sales }}></div>
                                                    </div>
                                                    <span className="text-[10px] font-black">{row.sales}</span>
                                                </div>
                                            </td>
                                            <td className={`py-5 text-[10px] font-black uppercase tracking-widest ${row.color}`}>{row.status}</td>
                                            <td className="py-5 text-right">
                                                <button className="material-symbols-outlined text-[#bab59c] hover:text-primary transition-colors cursor-pointer">more_vert</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
