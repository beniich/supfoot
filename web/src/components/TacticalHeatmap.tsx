'use client';

import React from 'react';

export const TacticalHeatmap = () => {
    return (
        <div className="relative w-full aspect-[2/3] bg-[#1a4a1a] rounded-2xl overflow-hidden border border-white/10 shadow-inner">
            {/* Pitch Markings */}
            <div className="absolute inset-x-8 inset-y-8 border-2 border-white/20 rounded-sm"></div>
            <div className="absolute top-1/2 inset-x-0 h-0.5 bg-white/20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white/20 rounded-full"></div>

            {/* Heatmap Blobs (Representing dominance) */}
            <div className="absolute top-[20%] left-[20%] w-32 h-32 bg-primary/40 rounded-full blur-3xl"></div>
            <div className="absolute top-[40%] left-[60%] w-40 h-40 bg-orange-500/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[20%] left-[30%] w-36 h-36 bg-red-600/20 rounded-full blur-3xl"></div>
            <div className="absolute top-[10%] right-[10%] w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                    <div className="size-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Live Intensity Heatmap</span>
                </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-1.5 w-12 bg-gradient-to-r from-blue-500 via-green-500 to-primary rounded-full"></div>
                    <span className="text-[8px] font-black uppercase text-white/60">Activity Intensity</span>
                </div>
                <div className="bg-black/60 px-2 py-1 rounded text-[8px] font-black text-primary uppercase">Man City</div>
            </div>
        </div>
    );
};
