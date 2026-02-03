// src/components/home/HeroSection.tsx
import React from 'react';
import Image from 'next/image';

export default function HeroSection() {
    return (
        <section className="px-4 py-8 bg-ucl-midnight">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-[0_0_30px_rgba(0,51,153,0.3)] border border-white/10 group">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#020b1f] to-[#003399]"></div>

                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-10">
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-6 text-white text-shadow-lg">
                        Knockout Phase<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ucl-accent to-white">Play Off</span>
                    </h2>

                    <div className="flex items-center gap-8 mb-8">
                        <div className="flex flex-col items-center gap-2 group/team">
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border-2 border-ucl-accent shadow-lg shadow-ucl-accent/20 group-hover/team:scale-110 transition-transform duration-300">
                                {/* Placeholder for Monaco Logo */}
                                <div className="w-10 h-10 bg-red-600 rounded-full"></div>
                            </div>
                            <span className="text-xs font-bold text-white tracking-widest">MONACO</span>
                        </div>

                        <div className="text-3xl font-black text-ucl-accent italic relative">
                            VS
                            <div className="absolute -inset-4 bg-ucl-accent/20 blur-xl rounded-full -z-10"></div>
                        </div>

                        <div className="flex flex-col items-center gap-2 group/team">
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border-2 border-ucl-accent shadow-lg shadow-ucl-accent/20 group-hover/team:scale-110 transition-transform duration-300">
                                {/* Placeholder for PSG Logo */}
                                <div className="w-10 h-10 bg-blue-800 rounded-full"></div>
                            </div>
                            <span className="text-xs font-bold text-white tracking-widest">PARIS</span>
                        </div>
                    </div>

                    <button className="bg-ucl-accent text-ucl-midnight font-black px-8 py-3 rounded-full text-sm uppercase tracking-wider hover:scale-105 hover:bg-white transition-all shadow-lg shadow-ucl-accent/30">
                        Get Tickets
                    </button>
                </div>
            </div>
        </section>
    );
}
