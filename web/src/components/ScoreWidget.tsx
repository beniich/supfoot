'use client';

import React from 'react';

export const ScoreWidget = () => {
    return (
        <div className="bg-surface-dark border border-white/10 rounded-3xl p-4 shadow-glow-sm w-full max-w-[200px] aspect-square flex flex-col justify-between">
            <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-primary italic">Live 82'</span>
                <div className="size-2 rounded-full bg-red-500 animate-pulse"></div>
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-blue-500"></div>
                        <span className="text-sm font-black text-white">MCI</span>
                    </div>
                    <span className="text-xl font-black text-white">2</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-red-500"></div>
                        <span className="text-sm font-black text-white">ARS</span>
                    </div>
                    <span className="text-xl font-black text-white">1</span>
                </div>
            </div>

            <div className="pt-2 border-t border-white/5">
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest text-center">Tap for details</p>
            </div>
        </div>
    );
};
