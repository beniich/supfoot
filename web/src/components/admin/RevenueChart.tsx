'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const RevenueChart = () => {
    const data = [
        { name: 'Jan', revenue: 4000 },
        { name: 'Feb', revenue: 3000 },
        { name: 'Mar', revenue: 2000 },
        { name: 'Apr', revenue: 2780 },
        { name: 'May', revenue: 1890 },
        { name: 'Jun', revenue: 2390 },
        { name: 'Jul', revenue: 3490 },
    ];

    return (
        <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f2b90d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#f2b90d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#bab59c" opacity={0.3} fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#bab59c" opacity={0.3} fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1A1915', border: '1px solid #333', borderRadius: '12px' }}
                        labelStyle={{ color: '#fff' }}
                        itemStyle={{ color: '#f2b90d' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#f2b90d" fillOpacity={1} fill="url(#colorRevenue)" dot={{ fill: '#f2b90d', r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
