import React from 'react';

export const RecentActivity = () => {
    return (
        <div className="bg-[#121214] border border-white/5 rounded-3xl p-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#bab59c] opacity-60 mb-8">Activité Récente</h3>
            <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4 group">
                        <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-primary/30 transition-all">
                            <span className="material-symbols-outlined text-primary text-sm">person</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-black text-white italic">Nouvelle inscription : Utilisateur #{i}04</p>
                            <p className="text-[10px] text-[#bab59c] opacity-40 font-bold uppercase tracking-widest">Il y a {i * 2} minutes • Casablanca, MA</p>
                        </div>
                        <div className="size-2 rounded-full bg-primary/40 animate-pulse"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
