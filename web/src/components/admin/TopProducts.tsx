import React from 'react';

export const TopProducts = () => {
    return (
        <div className="bg-[#121214] border border-white/5 rounded-3xl p-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#bab59c] opacity-60 mb-8">Top Boutique</h3>
            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="size-12 bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent"></div>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-black text-white italic">Jersey Wydad AC 24/25</p>
                            <p className="text-[10px] text-[#bab59c] opacity-40 font-bold uppercase tracking-widest">{150 - i * 10} Ventes</p>
                        </div>
                        <span className="text-sm font-black text-primary italic">650 DH</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
