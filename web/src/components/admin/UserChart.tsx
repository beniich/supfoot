'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const UserChart = () => {
    const data = [
        { name: 'Mon', active: 400 },
        { name: 'Tue', active: 300 },
        { name: 'Wed', active: 200 },
        { name: 'Thu', active: 278 },
        { name: 'Fri', active: 189 },
        { name: 'Sat', active: 239 },
        { name: 'Sun', active: 349 },
    ];

    return (
        <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#bab59c" opacity={0.3} fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#bab59c" opacity={0.3} fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1A1915', border: '1px solid #333', borderRadius: '12px' }}
                        labelStyle={{ color: '#fff' }}
                        itemStyle={{ color: '#3b82f6' }}
                    />
                    <Area type="monotone" dataKey="active" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsers)" dot={{ fill: '#3b82f6', r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
