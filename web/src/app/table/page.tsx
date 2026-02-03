'use client';

import React from 'react';
import Image from 'next/image';
import BottomNav from '@/components/BottomNav';
import { Search, User, Star, ChevronDown, UnfoldMore, ChevronsUpDown } from 'lucide-react';

export default function StandingsPage() {
    return (
        <div className="min-h-screen bg-ucl-midnight text-white font-display pb-24">
            <div className="h-12 w-full bg-ucl-midnight hidden md:block"></div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-ucl-midnight text-white px-4 py-3 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-ucl-blue rounded-full flex items-center justify-center border border-ucl-accent">
                        <Star className="text-ucl-accent fill-ucl-accent" size={16} />
                    </div>
                    <h1 className="font-extrabold tracking-tight text-lg italic">FootballHub+</h1>
                </div>
                <div className="flex items-center gap-4">
                    <Search size={24} />
                    <User size={24} />
                </div>
            </header>

            {/* Sub-Navigation */}
            <nav className="bg-ucl-midnight text-white/80 text-[13px] font-semibold py-2 px-4 flex gap-6 overflow-x-auto no-scrollbar border-b border-white/10">
                <a href="/matches" className="whitespace-nowrap hover:text-white transition-colors">Matches</a>
                <a href="/table" className="text-white border-b-2 border-ucl-accent pb-1 whitespace-nowrap">Table</a>
                <a href="#" className="whitespace-nowrap hover:text-white transition-colors">UEFA.tv</a>
                <a href="#" className="whitespace-nowrap hover:text-white transition-colors">Draws</a>
                <div className="flex items-center gap-1 whitespace-nowrap">Gaming <ChevronDown size={12} /></div>
                <div className="flex items-center gap-1 whitespace-nowrap">Stats <ChevronDown size={12} /></div>
            </nav>

            <main>
                <section className="px-4 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-extrabold uppercase tracking-tight">Standings</h2>
                        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                            <span className="text-xs font-bold text-ucl-accent">GROUP A</span>
                            <ChevronsUpDown size={14} />
                        </div>
                    </div>

                    <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
                        <button className="bg-ucl-blue text-white px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap">Group A</button>
                        <button className="bg-white/5 text-white/60 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border border-white/5">Group B</button>
                        <button className="bg-white/5 text-white/60 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border border-white/5">Group C</button>
                        <button className="bg-white/5 text-white/60 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border border-white/5">Group D</button>
                        <button className="bg-white/5 text-white/60 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border border-white/5">Group E</button>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                        <div className="grid grid-cols-[1fr_repeat(6,35px)] px-4 py-4 border-b border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-wider">
                            <div>Club</div>
                            <div className="text-center">P</div>
                            <div className="text-center">W</div>
                            <div className="text-center">D</div>
                            <div className="text-center">L</div>
                            <div className="text-center">GD</div>
                            <div className="text-center text-white">Pts</div>
                        </div>

                        {/* Row 1 */}
                        <div className="relative grid grid-cols-[1fr_repeat(6,35px)] items-center px-4 py-4 border-b border-white/5 bg-gradient-to-r from-[rgba(0,245,255,0.05)] to-transparent">
                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-ucl-accent to-ucl-blue"></div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-ucl-accent">1</span>
                                <div className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center p-1 relative overflow-hidden">
                                    {/* Placeholder for Real Madrid */}
                                    <Image src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" alt="Real Madrid" width={20} height={20} className="object-contain" />
                                </div>
                                <span className="text-[13px] font-bold truncate">Real Madrid</span>
                            </div>
                            <div className="text-xs font-medium text-center text-white/80">6</div>
                            <div className="text-xs font-medium text-center text-white/80">5</div>
                            <div className="text-xs font-medium text-center text-white/80">0</div>
                            <div className="text-xs font-medium text-center text-white/80">1</div>
                            <div className="text-xs font-medium text-center text-white/80">+12</div>
                            <div className="text-[13px] font-black text-center">15</div>
                        </div>

                        {/* Row 2 */}
                        <div className="relative grid grid-cols-[1fr_repeat(6,35px)] items-center px-4 py-4 border-b border-white/5 bg-gradient-to-r from-[rgba(0,245,255,0.05)] to-transparent">
                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-ucl-accent to-ucl-blue"></div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-ucl-accent">2</span>
                                <div className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center p-1 relative overflow-hidden">
                                    {/* Placeholder for PSG */}
                                    <Image src="https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_FC.svg" alt="Paris" width={20} height={20} className="object-contain" />
                                </div>
                                <span className="text-[13px] font-bold truncate">Paris</span>
                            </div>
                            <div className="text-xs font-medium text-center text-white/80">6</div>
                            <div className="text-xs font-medium text-center text-white/80">4</div>
                            <div className="text-xs font-medium text-center text-white/80">1</div>
                            <div className="text-xs font-medium text-center text-white/80">1</div>
                            <div className="text-xs font-medium text-center text-white/80">+8</div>
                            <div className="text-[13px] font-black text-center">13</div>
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-[1fr_repeat(6,35px)] items-center px-4 py-4 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-white/40 pl-1">3</span>
                                <div className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center p-1 relative overflow-hidden">
                                    {/* Placeholder for Dortmund */}
                                    <Image src="https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg" alt="Dortmund" width={20} height={20} className="object-contain" />
                                </div>
                                <span className="text-[13px] font-bold truncate">Dortmund</span>
                            </div>
                            <div className="text-xs font-medium text-center text-white/80">6</div>
                            <div className="text-xs font-medium text-center text-white/80">2</div>
                            <div className="text-xs font-medium text-center text-white/80">1</div>
                            <div className="text-xs font-medium text-center text-white/80">3</div>
                            <div className="text-xs font-medium text-center text-white/80">-2</div>
                            <div className="text-[13px] font-black text-center">7</div>
                        </div>

                        {/* Row 4 */}
                        <div className="grid grid-cols-[1fr_repeat(6,35px)] items-center px-4 py-4">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-white/40 pl-1">4</span>
                                <div className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center p-1 relative overflow-hidden">
                                    {/* Placeholder for Copenhagen */}
                                    <Image src="https://upload.wikimedia.org/wikipedia/en/9/93/FC_K%C3%B8benhavn.svg" alt="Copenhagen" width={20} height={20} className="object-contain" />
                                </div>
                                <span className="text-[13px] font-bold truncate">Copenhagen</span>
                            </div>
                            <div className="text-xs font-medium text-center text-white/80">6</div>
                            <div className="text-xs font-medium text-center text-white/80">0</div>
                            <div className="text-xs font-medium text-center text-white/80">0</div>
                            <div className="text-xs font-medium text-center text-white/80">6</div>
                            <div className="text-xs font-medium text-center text-white/80">-18</div>
                            <div className="text-[13px] font-black text-center">0</div>
                        </div>
                    </div>

                    <div className="mt-6 space-y-2 px-1">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-gradient-to-b from-ucl-accent to-ucl-blue rounded-full"></div>
                            <span className="text-[11px] font-medium text-white/60">Qualified for Round of 16</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-white/10 rounded-full"></div>
                            <span className="text-[11px] font-medium text-white/60">Eliminated from competition</span>
                        </div>
                    </div>
                </section>

                <section className="px-4 py-2">
                    <div className="bg-gradient-to-r from-ucl-blue to-ucl-midnight p-5 rounded-2xl border border-white/10 relative overflow-hidden">
                        <div
                            className="absolute right-0 top-0 w-32 h-full opacity-20 pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '15px 15px' }}
                        ></div>
                        <h3 className="text-lg font-black uppercase italic mb-1">Predictions</h3>
                        <p className="text-xs text-white/70 mb-4 leading-snug">Who will top Group B? Vote now in FootballHub+</p>
                        <button className="bg-ucl-accent text-ucl-midnight text-[11px] font-extrabold px-6 py-2 rounded-full uppercase tracking-wider hover:scale-105 transition-transform">Play Now</button>
                    </div>
                </section>
            </main>

            <BottomNav />
        </div>
    );
}
