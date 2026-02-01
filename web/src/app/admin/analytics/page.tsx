'use client';

import React, { useState, useEffect } from 'react';
import {
    TrendingUp, TrendingDown, DollarSign, Users,
    BarChart2, PieChart, Calendar, ChevronDown
} from 'lucide-react';
import { RevenueChart } from '@/components/admin/RevenueChart';
import { UserChart } from '@/components/admin/UserChart';
import { apiClient } from '@/services/api';

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState('30');

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic flex items-center gap-3">
                        <BarChart2 size={32} className="text-primary" />
                        Visions <span className="text-primary italic">Analytiques</span>
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#bab59c] opacity-60 mt-2">
                        Intelligence de données • Performance Business
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="appearance-none pl-6 pr-12 py-3 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary focus:outline-none focus:border-primary/30 transition-all cursor-pointer hover:bg-white/10 italic"
                        >
                            <option value="7">7 Derniers Jours</option>
                            <option value="30">30 Derniers Jours</option>
                            <option value="90">3 Derniers Mois</option>
                            <option value="365">12 Derniers Mois</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <ChevronDown size={14} className="text-primary" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Analytics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#121214] border border-white/5 rounded-3xl p-8 group hover:border-primary/20 transition-all duration-500">
                    <div className="flex justify-between items-start mb-6">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <DollarSign size={24} className="text-primary" />
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-black text-green-500 italic">
                            <TrendingUp size={14} />
                            +18.2%
                        </div>
                    </div>
                    <p className="text-3xl font-black tracking-tighter text-white mb-1">124,500 DH</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#bab59c] opacity-40">Volume de Vente</p>
                </div>

                <div className="bg-[#121214] border border-white/5 rounded-3xl p-8 group hover:border-blue-500/20 transition-all duration-500">
                    <div className="flex justify-between items-start mb-6">
                        <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                            <Users size={24} className="text-blue-500" />
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-black text-green-500 italic">
                            <TrendingUp size={14} />
                            +5.4%
                        </div>
                    </div>
                    <p className="text-3xl font-black tracking-tighter text-white mb-1">2,420</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#bab59c] opacity-40">Rétention Utilisateurs</p>
                </div>

                <div className="bg-[#121214] border border-white/5 rounded-3xl p-8 group hover:border-purple-500/20 transition-all duration-500">
                    <div className="flex justify-between items-start mb-6">
                        <div className="h-12 w-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                            <PieChart size={24} className="text-purple-500" />
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-black text-red-500 italic">
                            <TrendingDown size={14} />
                            -2.1%
                        </div>
                    </div>
                    <p className="text-3xl font-black tracking-tighter text-white mb-1">45.2%</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#bab59c] opacity-40">Taux de Conversion</p>
                </div>
            </div>

            {/* Full Charts */}
            <div className="grid grid-cols-1 gap-8">
                <div className="bg-[#121214] border border-white/5 rounded-3xl p-10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#bab59c] opacity-60 mb-10">Détails des Flux Financiers</h3>
                    <RevenueChart />
                </div>

                <div className="bg-[#121214] border border-white/5 rounded-3xl p-10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#bab59c] opacity-60 mb-10">Acquisition & Croissance</h3>
                    <UserChart />
                </div>
            </div>
        </div>
    );
}
