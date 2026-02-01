'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MomentumChart } from '@/components/MomentumChart';
import { PlayerModal } from '@/components/PlayerModal';
import { TacticalHeatmap } from '@/components/TacticalHeatmap';
import { LoyaltyBadges } from '@/components/LoyaltyBadges';

export default function MatchCenterPage() {
    const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('stats');
    const [voteSubmitted, setVoteSubmitted] = useState(false);
    const [prediction, setPrediction] = useState('');
    const [showPredictionModal, setShowPredictionModal] = useState(false);

    // Mock data for players
    const players: Record<string, any> = {
        '31': { id: '31', number: '31', name: 'Ederson', position: 'Goalkeeper', stats: { goals: 0, assists: 0, passes: '82%', distance: '4.2km' } },
        '47': { id: '47', number: '47', name: 'Phil Foden', position: 'Midfielder', stats: { goals: 1, assists: 1, passes: '91%', distance: '10.5km' } },
        '9': { id: '9', number: '9', name: 'Erling Haaland', position: 'Forward', stats: { goals: 1, assists: 0, passes: '75%', distance: '8.1km' } },
        '17': { id: '17', number: '17', name: 'Kevin De Bruyne', position: 'Midfielder', stats: { goals: 0, assists: 1, passes: '88%', distance: '11.2km' } },
    };

    const handlePlayerClick = (number: string) => {
        const player = players[number] || {
            id: number,
            number,
            name: `Player ${number}`,
            position: 'Midfielder',
            stats: { goals: 0, assists: 0, passes: '85%', distance: '9.0km' }
        };
        setSelectedPlayer(player);
    };

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
                                <span className="text-xs font-medium text-primary uppercase tracking-wider bg-primary/20 px-2 py-0.5 rounded">Live • 82&apos;</span>
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
                    <div onClick={() => handlePlayerClick('31')} className="player-node absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-black border-2 border-primary rounded-full flex items-center justify-center text-[10px] font-bold text-primary z-10 shadow-lg cursor-pointer">31</div>
                    <div onClick={() => handlePlayerClick('2')} className="player-node absolute bottom-[18%] left-[15%] w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">2</div>
                    <div onClick={() => handlePlayerClick('5')} className="player-node absolute bottom-[18%] left-[38%] w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">5</div>
                    <div onClick={() => handlePlayerClick('3')} className="player-node absolute bottom-[18%] left-[62%] w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">3</div>
                    <div onClick={() => handlePlayerClick('6')} className="player-node absolute bottom-[18%] right-[15%] w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">6</div>
                    <div onClick={() => handlePlayerClick('16')} className="player-node absolute bottom-[32%] left-[30%] w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">16</div>
                    <div onClick={() => handlePlayerClick('8')} className="player-node absolute bottom-[32%] left-[50%] -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">8</div>
                    <div onClick={() => handlePlayerClick('17')} className="player-node absolute bottom-[32%] right-[30%] w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">17</div>
                    <div onClick={() => handlePlayerClick('47')} className="player-node absolute bottom-[45%] left-[20%] w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">47</div>
                    <div onClick={() => handlePlayerClick('9')} className="player-node absolute bottom-[48%] left-[50%] -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">9</div>
                    <div onClick={() => handlePlayerClick('20')} className="player-node absolute bottom-[45%] right-[20%] w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-glow z-10 cursor-pointer">20</div>
                </div>

                {/* Gradient Transition */}
                <div className="h-6 w-full bg-gradient-to-b from-field-green to-background-dark -mt-1 relative z-20"></div>

                {/* Tabs */}
                <div className="px-4 sticky top-[60px] z-30 bg-background-dark/95 backdrop-blur pt-2 pb-4">
                    <div className="flex items-center bg-surface-dark p-1 rounded-lg">
                        <button onClick={() => setActiveTab('stats')} className={`flex-1 py-2 text-sm font-bold rounded transition-all ${activeTab === 'stats' ? 'text-black bg-primary shadow-sm' : 'text-gray-400 hover:text-white'}`}>Stats</button>
                        <button onClick={() => setActiveTab('momentum')} className={`flex-1 py-2 text-sm font-bold rounded transition-all ${activeTab === 'momentum' ? 'text-black bg-primary shadow-sm' : 'text-gray-400 hover:text-white'}`}>Momentum</button>
                        <button onClick={() => setActiveTab('tactics')} className={`flex-1 py-2 text-sm font-bold rounded transition-all ${activeTab === 'tactics' ? 'text-black bg-primary shadow-sm' : 'text-gray-400 hover:text-white'}`}>Tactics</button>
                        <button onClick={() => setActiveTab('fan')} className={`flex-1 py-2 text-sm font-bold rounded transition-all ${activeTab === 'fan' ? 'text-black bg-primary shadow-sm' : 'text-gray-400 hover:text-white'}`}>Fan Zone</button>
                    </div>
                </div>

                {/* Dynamic Content based on Tabs */}
                <div className="px-5 pb-8 space-y-8 animate-fade-in">
                    {activeTab === 'stats' && (
                        <div className="space-y-8">
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

                            {/* Momentum Chart Quick View */}
                            <MomentumChart />

                            {/* Other Stats */}
                            <div className="space-y-6">
                                <StatBar label="Shots on Target" hValue={5} aValue={2} hPercent={71} aPercent={29} />
                                <StatBar label="Pass Accuracy" hValue="89%" aValue="82%" hPercent={89} aPercent={82} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'momentum' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-black uppercase italic tracking-tighter">Full Momentum Analysis</h3>
                            <MomentumChart />
                            <div className="bg-surface-dark border border-white/5 rounded-2xl p-4">
                                <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-3 italic">Tactical Insight</h4>
                                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                                    Man City has maintained a high intensity since the 45th minute, with a peak pressure of 75% at the 64th minute mark. Arsenal is struggling to transition from defense to attack.
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'tactics' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-black uppercase italic tracking-tighter">Tactical Heatmap</h3>
                            <TacticalHeatmap />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-surface-dark border border-white/5 p-4 rounded-2xl">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Average Position</p>
                                    <p className="text-white font-black italic uppercase">High-Press (4-3-3)</p>
                                </div>
                                <div className="bg-surface-dark border border-white/5 p-4 rounded-2xl">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Counter Attacks</p>
                                    <p className="text-white font-black italic uppercase">12 Registered</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'fan' && (
                        <div className="space-y-8 pb-12">
                            {/* MVP Voting */}
                            <div className="bg-gradient-to-br from-surface-dark to-black border border-primary/20 rounded-3xl p-6 shadow-glow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <span className="material-symbols-outlined text-6xl text-primary">emoji_events</span>
                                </div>
                                <h3 className="text-xl font-black uppercase italic tracking-tighter mb-2">Vote for MVP</h3>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">Voting open since 80'</p>

                                {voteSubmitted ? (
                                    <div className="bg-primary/10 border border-primary/30 p-4 rounded-xl text-center">
                                        <span className="text-primary font-black uppercase tracking-widest text-xs">Vote Recorded! Thank you.</span>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {['Phil Foden', 'Erling Haaland', 'Bukayo Saka'].map(name => (
                                            <button
                                                key={name}
                                                onClick={() => setVoteSubmitted(true)}
                                                className="w-full bg-white/5 hover:bg-primary hover:text-black border border-white/5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex justify-between px-6"
                                            >
                                                <span>{name}</span>
                                                <span className="material-symbols-outlined text-lg">check_circle</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Prediction Module */}
                            <div className="bg-surface-dark border border-white/5 rounded-3xl p-6">
                                <h3 className="text-xl font-black uppercase italic tracking-tighter mb-4">Final Score Prediction</h3>
                                <div className="flex gap-4 mb-6">
                                    <input
                                        type="text"
                                        placeholder="2-1"
                                        value={prediction}
                                        onChange={(e) => setPrediction(e.target.value)}
                                        className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-4 font-black text-center text-2xl focus:border-primary outline-none transition-all"
                                    />
                                    <button
                                        onClick={() => setPrediction('3-1')}
                                        className="bg-primary text-black font-black px-6 rounded-2xl uppercase tracking-widest text-xs"
                                    >
                                        Predict
                                    </button>
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] text-center">Community Trends: 64% Predict City Win</p>
                            </div>

                            {/* Loyalty Badges Section */}
                            <LoyaltyBadges />

                            {/* Live Chat Toggle */}
                            <button className="w-full bg-white/5 border border-white/10 py-6 rounded-3xl flex flex-col items-center gap-2 hover:bg-white/10 transition-all">
                                <span className="material-symbols-outlined text-primary text-3xl">forum</span>
                                <span className="text-xs font-black uppercase tracking-[0.2em]">Join the Live Conversation</span>
                                <span className="text-[10px] text-gray-500 font-bold">1,248 fans active</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Floating Footer Banner */}
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

            {/* Modals */}
            <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
        </div>
    );
}

function StatBar({ label, hValue, aValue, hPercent, aPercent }: any) {
    return (
        <div className="flex flex-col gap-2">
            <div className="text-center text-sm font-medium text-gray-300 mb-1">{label}</div>
            <div className="flex items-center justify-between gap-3">
                <span className="text-lg font-bold w-6 text-primary">{hValue}</span>
                <div className="flex-1 flex items-center gap-1 h-3">
                    <div className="flex-1 flex justify-end bg-surface-dark rounded-l-full h-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${hPercent}%` }}></div>
                    </div>
                    <div className="w-px h-4 bg-gray-700"></div>
                    <div className="flex-1 flex justify-start bg-surface-dark rounded-r-full h-full overflow-hidden">
                        <div className="bg-gray-500 h-full" style={{ width: `${aPercent}%` }}></div>
                    </div>
                </div>
                <span className="text-lg font-bold w-6 text-right text-white">{aValue}</span>
            </div>
        </div>
    );
}
