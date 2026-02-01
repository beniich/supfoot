'use client';

import React from 'react';

interface Badge {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    progress?: number;
}

const mockBadges: Badge[] = [
    { id: '1', title: 'Early Bird', description: 'Be among the first 100 to join!', icon: 'rocket', unlocked: true },
    { id: '2', title: 'Top Fan', description: 'Watch 10 live matches', icon: 'visibility', unlocked: false, progress: 60 },
    { id: '3', title: 'Predictor', description: 'Predict 5 correct scores', icon: 'query_stats', unlocked: false, progress: 20 },
    { id: '4', title: 'Social Star', description: 'Post 5 comments in live chat', icon: 'chat', unlocked: true },
];

export const LoyaltyBadges = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">Loyalty <span className="text-primary">Rewards</span></h3>
                <div className="bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
                    <span className="text-primary font-black text-xs">1,250 PTS</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {mockBadges.map(badge => (
                    <div key={badge.id} className={`p-4 rounded-[32px] border transition-all ${badge.unlocked ? 'bg-surface-dark border-primary/20' : 'bg-surface-dark/40 border-white/5 opacity-60 grayscale'}`}>
                        <div className={`size-12 rounded-2xl flex items-center justify-center mb-3 ${badge.unlocked ? 'bg-primary text-black' : 'bg-white/5 text-gray-500'}`}>
                            <span className="material-symbols-outlined text-2xl">{badge.icon}</span>
                        </div>
                        <h4 className="font-black uppercase tracking-tight text-white text-xs mb-1">{badge.title}</h4>
                        <p className="text-[9px] text-gray-400 font-bold uppercase leading-tight mb-3">{badge.description}</p>

                        {badge.progress !== undefined && !badge.unlocked && (
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="bg-primary h-full" style={{ width: `${badge.progress}%` }}></div>
                            </div>
                        )}

                        {badge.unlocked && (
                            <div className="inline-flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded text-[8px] font-black text-primary uppercase">
                                Unlocked
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
