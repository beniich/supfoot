import React from 'react';

interface StatsCardProps {
    title: string;
    value: string;
    icon: any;
    change?: number;
    color?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, change, color }) => {
    return (
        <div className="bg-[#121214] border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#bab59c] opacity-60">{title}</span>
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center bg-${color}-500/10`}>
                    <Icon size={20} className={`text-${color}-500`} />
                </div>
            </div>
            <div className="flex items-end justify-between">
                <span className="text-3xl font-black text-white italic tracking-tighter">{value}</span>
                {change !== undefined && (
                    <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${change >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {change >= 0 ? '+' : ''}{change}%
                    </span>
                )}
            </div>
        </div>
    );
};
