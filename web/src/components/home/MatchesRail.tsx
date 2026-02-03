// src/components/home/MatchesRail.tsx
import React from 'react';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';

export default function MatchesRail() {
    return (
        <section className="bg-ucl-midnight py-6 border-b border-white/5">
            <div className="flex overflow-x-auto gap-3 px-4 no-scrollbar snap-x">
                {/* Match 1 */}
                <div className="min-w-[180px] snap-center bg-white/5 border border-white/10 rounded-xl p-3 relative hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-bold text-white/40 tracking-wider">FULL TIME</span>
                        <PlayCircle size={16} className="text-ucl-accent" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-[10px] font-bold text-white border border-white/20">B</div>
                                <span className="text-sm font-medium text-white">Barca</span>
                            </div>
                            <span className="text-sm font-bold text-white">4</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold border border-white/20">C</div>
                                <span className="text-sm font-medium text-white">Copen</span>
                            </div>
                            <span className="text-sm font-bold text-white">1</span>
                        </div>
                    </div>
                </div>

                {/* Match 2 */}
                <div className="min-w-[180px] snap-center bg-white/5 border border-white/10 rounded-xl p-3 relative hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-bold text-white/40 tracking-wider">FULL TIME</span>
                        <PlayCircle size={16} className="text-ucl-accent" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-yellow-400 text-black flex items-center justify-center text-[10px] font-bold border border-white/20">D</div>
                                <span className="text-sm font-medium text-white">Dortm</span>
                            </div>
                            <span className="text-sm font-bold text-white">0</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-blue-800 flex items-center justify-center text-[10px] font-bold text-white border border-white/20">I</div>
                                <span className="text-sm font-medium text-white">Inter</span>
                            </div>
                            <span className="text-sm font-bold text-white">2</span>
                        </div>
                    </div>
                </div>

                {/* Match 3 */}
                <div className="min-w-[180px] snap-center bg-white/5 border border-white/10 rounded-xl p-3 relative hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-bold text-ucl-accent tracking-wider animate-pulse">LIVE 78'</span>
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-red-700 flex items-center justify-center text-[10px] font-bold text-white border border-white/20">L</div>
                                <span className="text-sm font-medium text-white">L'pool</span>
                            </div>
                            <span className="text-sm font-bold text-ucl-accent">6</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-[10px] font-bold text-white border border-white/20">Q</div>
                                <span className="text-sm font-medium text-white">Qarab</span>
                            </div>
                            <span className="text-sm font-bold text-white">0</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
