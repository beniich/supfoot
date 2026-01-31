'use client';

import React from 'react';
import Link from 'next/link';

export default function MatchCenterPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-white overflow-x-hidden selection:bg-primary selection:text-black">
            {/* Top Navigation */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/10">
                <div className="flex items-center p-4 pb-2 justify-between max-w-md mx-auto w-full">
                    <Link href="/" className="text-white flex size-10 shrink-0 items-center justify-center hover:bg-white/10 rounded-full transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back</span>
                    </Link>
                    <h2 className="text-white text-lg font-bold leading-tight tracking-tight">Match Center</h2>
                    <div className="flex w-10 items-center justify-end">
                        <span className="material-symbols-outlined text-white" style={{ fontSize: '24px' }}>more_vert</span>
                    </div>
                </div>
            </div>

            {/* Main Scrollable Content */}
            <div className="flex-1 w-full max-w-md mx-auto pt-[60px] pb-24 relative">
                {/* Interactive Tactical Pitch */}
                <div className="relative w-full h-[380px] bg-field-green overflow-hidden shadow-2xl z-10">
                    {/* Field Markings */}
                    <div className="absolute inset-0 pitch-pattern opacity-100"></div>
                    {/* Center Circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white/20 rounded-full"></div>
                    {/* Center Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2"></div>
                    {/* Penalty Box Top */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 border-b-2 border-x-2 border-white/20 rounded-b-lg"></div>
                    {/* Penalty Box Bottom */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 border-t-2 border-x-2 border-white/20 rounded-t-lg"></div>

                    {/* Scoreboard Overlay */}
                    <div className="absolute top-4 left-0 right-0 px-4 z-20">
                        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/5">
                                    <div className="w-6 h-6 rounded-full bg-blue-400"></div>
                                </div>
                                <span className="font-bold text-xl">2</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xs font-medium text-primary uppercase tracking-wider bg-primary/20 px-2 py-0.5 rounded">Live • 64'</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-xl">1</span>
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/5">
                                    <div className="w-6 h-6 rounded-full bg-red-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Players (Home - Gold) (Formation 4-3-3) */}
                    {/* GK */}
                    <div className="player-node absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-black border-2 border-primary rounded-full flex items-center justify-center text-[10px] font-bold text-primary z-10 shadow-lg cursor-pointer">31</div>
                    {/* Defenders */}
                    <div className="player-node absolute bottom-[18%] left-[15%] w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">2</div>
                    <div className="player-node absolute bottom-[18%] left-[38%] w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">5</div>
                    <div className="player-node absolute bottom-[18%] left-[62%] w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">3</div>
                    <div className="player-node absolute bottom-[18%] right-[15%] w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">6</div>
                    {/* Midfielders */}
                    <div className="player-node absolute bottom-[32%] left-[30%] w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">16</div>
                    <div className="player-node absolute bottom-[32%] left-[50%] -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">8</div>
                    <div className="player-node absolute bottom-[32%] right-[30%] w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">17</div>
                    {/* Forwards */}
                    <div className="player-node absolute bottom-[45%] left-[20%] w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">47</div>
                    <div className="player-node absolute bottom-[48%] left-[50%] -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">9</div>
                    <div className="player-node absolute bottom-[45%] right-[20%] w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">20</div>

                    {/* Players (Away - White) (Formation 4-2-3-1) */}
                    {/* GK */}
                    <div className="player-node absolute top-4 left-1/2 -translate-x-1/2 w-7 h-7 bg-black border border-white/50 text-white rounded-full flex items-center justify-center text-[9px] font-bold z-10 opacity-90">1</div>
                    {/* Defenders */}
                    <div className="player-node absolute top-[15%] left-[15%] w-7 h-7 bg-white text-black rounded-full flex items-center justify-center text-[9px] font-bold z-10 opacity-90 shadow-md">4</div>
                    <div className="player-node absolute top-[15%] left-[38%] w-7 h-7 bg-white text-black rounded-full flex items-center justify-center text-[9px] font-bold z-10 opacity-90 shadow-md">6</div>
                    <div className="player-node absolute top-[15%] left-[62%] w-7 h-7 bg-white text-black rounded-full flex items-center justify-center text-[9px] font-bold z-10 opacity-90 shadow-md">2</div>
                    <div className="player-node absolute top-[15%] right-[15%] w-7 h-7 bg-white text-black rounded-full flex items-center justify-center text-[9px] font-bold z-10 opacity-90 shadow-md">18</div>
                </div>

                {/* Gradient Transition */}
                <div className="h-6 w-full bg-gradient-to-b from-field-green to-background-dark -mt-1 relative z-20"></div>

                {/* Tabs */}
                <div className="px-4 sticky top-[60px] z-30 bg-background-dark/95 backdrop-blur pt-2 pb-4">
                    <div className="flex items-center bg-surface-dark p-1 rounded-lg">
                        <button className="flex-1 py-2 text-sm font-bold rounded text-black bg-primary shadow-sm transition-all">Stats</button>
                        <button className="flex-1 py-2 text-sm font-bold rounded text-gray-400 hover:text-white transition-all">Lineups</button>
                        <button className="flex-1 py-2 text-sm font-bold rounded text-gray-400 hover:text-white transition-all">Timeline</button>
                    </div>
                </div>

                {/* Stats Content */}
                <div className="px-5 space-y-8 animate-fade-in">
                    {/* Possession */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                            <span>Man City</span>
                            <span>Possession</span>
                            <span>Arsenal</span>
                        </div>
                        <div className="flex items-center gap-4 h-8">
                            <span className="text-xl font-bold w-12 text-primary">64%</span>
                            <div className="flex-1 flex h-2 bg-surface-dark rounded-full overflow-hidden">
                                <div className="bg-primary w-[64%] h-full rounded-r-sm"></div>
                                <div className="bg-gray-600 w-[36%] h-full rounded-l-sm"></div>
                            </div>
                            <span className="text-xl font-bold w-12 text-right text-white">36%</span>
                        </div>
                    </div>

                    {/* Tug of War Stats Wrapper */}
                    <div className="space-y-6">
                        {/* Shots on Target */}
                        <div className="flex flex-col gap-2">
                            <div className="text-center text-sm font-medium text-gray-300 mb-1">Shots on Target</div>
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-lg font-bold w-6 text-primary">5</span>
                                <div className="flex-1 flex items-center gap-1 h-3">
                                    <div className="flex-1 flex justify-end bg-surface-dark rounded-l-full h-full overflow-hidden">
                                        <div className="bg-primary w-[71%] h-full"></div>
                                    </div>
                                    <div className="w-px h-4 bg-gray-700"></div> {/* Center Divider */}
                                    <div className="flex-1 flex justify-start bg-surface-dark rounded-r-full h-full overflow-hidden">
                                        <div className="bg-gray-500 w-[29%] h-full"></div>
                                    </div>
                                </div>
                                <span className="text-lg font-bold w-6 text-right text-white">2</span>
                            </div>
                        </div>

                        {/* Pass Accuracy */}
                        <div className="flex flex-col gap-2">
                            <div className="text-center text-sm font-medium text-gray-300 mb-1">Pass Accuracy</div>
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-lg font-bold w-6 text-primary">89<span className="text-xs">%</span></span>
                                <div className="flex-1 flex items-center gap-1 h-3">
                                    <div className="flex-1 flex justify-end bg-surface-dark rounded-l-full h-full overflow-hidden">
                                        <div className="bg-primary w-[89%] h-full"></div>
                                    </div>
                                    <div className="w-px h-4 bg-gray-700"></div>
                                    <div className="flex-1 flex justify-start bg-surface-dark rounded-r-full h-full overflow-hidden">
                                        <div className="bg-gray-500 w-[82%] h-full"></div>
                                    </div>
                                </div>
                                <span className="text-lg font-bold w-6 text-right text-white">82<span className="text-xs">%</span></span>
                            </div>
                        </div>

                        {/* Fouls */}
                        <div className="flex flex-col gap-2">
                            <div className="text-center text-sm font-medium text-gray-300 mb-1">Fouls</div>
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-lg font-bold w-6 text-primary">8</span>
                                <div className="flex-1 flex items-center gap-1 h-3">
                                    <div className="flex-1 flex justify-end bg-surface-dark rounded-l-full h-full overflow-hidden">
                                        <div className="bg-primary w-[40%] h-full"></div>
                                    </div>
                                    <div className="w-px h-4 bg-gray-700"></div>
                                    <div className="flex-1 flex justify-start bg-surface-dark rounded-r-full h-full overflow-hidden">
                                        <div className="bg-gray-500 w-[60%] h-full"></div>
                                    </div>
                                </div>
                                <span className="text-lg font-bold w-6 text-right text-white">12</span>
                            </div>
                        </div>
                    </div>

                    {/* Additional Detail Cards */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="bg-surface-dark p-4 rounded-xl border border-white/5">
                            <div className="flex items-start justify-between mb-2">
                                <span className="material-symbols-outlined text-primary text-xl">trending_up</span>
                                <span className="text-xs text-green-400 font-bold">+2.4</span>
                            </div>
                            <p className="text-gray-400 text-xs mb-1">xG (Expected Goals)</p>
                            <p className="text-2xl font-bold text-white">1.82</p>
                        </div>
                        <div className="bg-surface-dark p-4 rounded-xl border border-white/5">
                            <div className="flex items-start justify-between mb-2">
                                <span className="material-symbols-outlined text-gray-400 text-xl">timer</span>
                            </div>
                            <p className="text-gray-400 text-xs mb-1">Ball in Play</p>
                            <p className="text-2xl font-bold text-white">58<span className="text-sm font-normal text-gray-400 ml-1">mins</span></p>
                        </div>
                    </div>
                </div>

                {/* Floating E-commerce / Ticket Banner */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-dark via-background-dark to-transparent z-40 max-w-md mx-auto">
                    <Link href="/tickets/123" className="flex items-center justify-between bg-surface-dark border border-white/10 p-3 rounded-xl shadow-lg hover:border-primary/50 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/5 p-2 rounded-lg">
                                <span className="material-symbols-outlined text-primary group-hover:animate-bounce">local_activity</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white">Next Home Game</span>
                                <span className="text-xs text-gray-400">vs Liverpool • Oct 24</span>
                            </div>
                        </div>
                        <div className="bg-primary text-black text-xs font-bold px-3 py-1.5 rounded-lg flex items-center">
                            Buy <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
