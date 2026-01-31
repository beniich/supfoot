'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ShopResultsPage() {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Jerseys', 'Training', 'Lifestyle', 'Accessories'];

    const results = [
        { id: 1, name: 'Stadium Home Jersey', price: '850 Dhs', category: 'Jerseys', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300', isNew: true },
        { id: 2, name: 'Training Drill Top', price: '450 Dhs', category: 'Training', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300', isNew: false },
        { id: 3, name: 'Fan Scarf - Red Edition', price: '120 Dhs', category: 'Accessories', image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=300', isNew: false },
        { id: 4, name: 'Lifestyle Bomber Jacket', price: '1,200 Dhs', category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=300', isNew: true },
        { id: 5, name: 'Away Match Jersey', price: '850 Dhs', category: 'Jerseys', image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&q=80&w=300', isNew: false },
        { id: 6, name: 'Pro Training Shorts', price: '250 Dhs', category: 'Training', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=300', isNew: false },
    ];

    const filteredResults = activeFilter === 'All' ? results : results.filter(r => r.category === activeFilter);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-white min-h-screen pb-24">
            <div className="max-w-md mx-auto flex flex-col min-h-screen shadow-2xl overflow-x-hidden bg-background-light dark:bg-background-dark">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-4 flex flex-col gap-4 border-b border-white/5">
                    <div className="flex items-center justify-between w-full">
                        <Link href="/shop" className="size-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <div className="flex-1 px-4">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 text-sm">search</span>
                                <input
                                    type="text"
                                    placeholder="Search gear..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs font-bold focus:outline-none focus:border-primary transition-all placeholder-gray-600"
                                    defaultValue="Jerseys"
                                />
                            </div>
                        </div>
                        <button className="size-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10">
                            <span className="material-symbols-outlined text-gray-400">tune</span>
                        </button>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex overflow-x-auto no-scrollbar gap-2 px-1">
                        {filters.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === filter ? 'bg-primary text-background-dark shadow-glow-sm' : 'bg-surface-dark text-gray-400 border border-white/5'}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </header>

                <main className="flex-1 p-4">
                    {/* Results Count */}
                    <div className="flex items-center justify-between mb-6 px-2">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{filteredResults.length} Results Found</p>
                        <div className="flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-widest cursor-pointer">
                            Sort by: Popular <span className="material-symbols-outlined text-[14px]">expand_more</span>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {filteredResults.map(item => (
                            <Link href="/shop/product" key={item.id} className="group">
                                <div className="flex flex-col bg-surface-dark rounded-[1.5rem] overflow-hidden border border-white/5 shadow-lg transition-all hover:border-primary/30">
                                    <div className="relative aspect-[3/4] overflow-hidden bg-black/20">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        {item.isNew && (
                                            <div className="absolute top-3 left-3 bg-primary text-background-dark text-[8px] font-black px-2 py-0.5 rounded shadow-glow-sm uppercase">New</div>
                                        )}
                                        <button className="absolute top-3 right-3 size-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 text-white/40 hover:text-red-500 transition-colors">
                                            <span className="material-symbols-outlined text-[16px]">favorite</span>
                                        </button>
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <p className="text-[9px] font-black text-primary uppercase tracking-widest">{item.category}</p>
                                        <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-primary transition-colors">{item.name}</h4>
                                        <div className="flex items-center justify-between pt-1">
                                            <span className="text-base font-black text-white">{item.price}</span>
                                            <div className="size-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-primary group-hover:text-background-dark transition-all">
                                                <span className="material-symbols-outlined text-sm">add</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Bottom Info */}
                    <div className="mt-12 text-center opacity-20">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-sm">verified</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Official FootballHub+ Store</span>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
