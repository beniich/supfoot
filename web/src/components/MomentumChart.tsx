'use client';

import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis, XAxis, Tooltip, ReferenceLine } from 'recharts';

interface MomentumPoint {
    minute: number;
    value: number; // Positive for Home, Negative for Away
}

const mockData: MomentumPoint[] = [
    { minute: 0, value: 0 },
    { minute: 5, value: 10 },
    { minute: 10, value: 25 },
    { minute: 15, value: 40 },
    { minute: 20, value: 15 },
    { minute: 25, value: -10 },
    { minute: 30, value: -30 },
    { minute: 35, value: -45 },
    { minute: 40, value: -20 },
    { minute: 45, value: 10 },
    { minute: 50, value: 30 },
    { minute: 55, value: 60 },
    { minute: 60, value: 50 },
    { minute: 64, value: 75 },
];

export const MomentumChart = () => {
    return (
        <div className="w-full bg-surface-dark/50 rounded-2xl p-4 border border-white/5 shadow-inner">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-white italic">Attack Momentum</h3>
                </div>
                <div className="flex gap-4 text-[10px] font-bold uppercase tracking-tighter">
                    <span className="text-primary">Home</span>
                    <span className="text-gray-500">vs</span>
                    <span className="text-white">Away</span>
                </div>
            </div>

            <div className="h-[120px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="momentumGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f2cc0d" stopOpacity={0.8} />
                                <stop offset="45%" stopColor="#f2cc0d" stopOpacity={0} />
                                <stop offset="55%" stopColor="#ffffff" stopOpacity={0} />
                                <stop offset="95%" stopColor="#ffffff" stopOpacity={0.3} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="minute" hide />
                        <YAxis hide domain={[-100, 100]} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                            labelStyle={{ color: '#aaa', fontWeight: 'bold' }}
                            itemStyle={{ color: '#f2cc0d' }}
                            formatter={(value: number) => [`${Math.abs(value)}% Pressure`, value > 0 ? 'Home' : 'Away']}
                        />
                        <ReferenceLine y={0} stroke="#333" strokeDasharray="3 3 transition-none" />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#f2cc0d"
                            fill="url(#momentumGradient)"
                            strokeWidth={2}
                            animationDuration={2000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-between mt-2 px-1">
                <span className="text-[9px] font-bold text-gray-600">0'</span>
                <span className="text-[9px] font-bold text-gray-600">15'</span>
                <span className="text-[9px] font-bold text-gray-600">30'</span>
                <span className="text-[9px] font-bold text-gray-600">HT</span>
                <span className="text-[9px] font-bold text-gray-600">60'</span>
                <span className="text-[9px] font-bold text-primary">LIVE</span>
            </div>
        </div>
    );
};
