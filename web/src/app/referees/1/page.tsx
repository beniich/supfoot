'use client';

import React from 'react';
import Link from 'next/link';

export default function RefereeProfilePage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-white antialiased min-h-screen pb-24">
            {/* Top Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/80 backdrop-blur-md border-b border-black/5 dark:border-white/10">
                <div className="flex items-center p-4 justify-between max-w-md mx-auto">
                    <Link href="/referees" className="text-primary flex size-10 items-center justify-center cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-colors">
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </Link>
                    <h2 className="text-slate-900 dark:text-white text-lg font-black tracking-tighter uppercase italic">Referee Profile</h2>
                    <div className="flex size-10 items-center justify-end cursor-pointer text-primary hover:text-primary/80 transition-colors">
                        <span className="material-symbols-outlined">share</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-md mx-auto">
                {/* Profile Header */}
                <div className="flex p-6 flex-col gap-6 items-center">
                    <div className="flex gap-4 flex-col items-center w-full">
                        <div className="relative group">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 border-4 border-primary/20 shadow-glow-sm transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAlYFwK1LfTs8hCP52zdWkgusTw11C4zHs8qWm5oFkE-Ytm_gpBykMyia8GSD9Fl3sewEnA3LJOL50zyyRKNqtzutQyJQFftnRAlpF-UoDoL4lFl7QSwsnV39093KSeGs_3y2PKw45oER3jG_9goJFpARuok4u7q_Gm01PCK8_cEkynGNlxInylT37JpUUKCahyM1A_BtYxBRsQB2iX1zUz9oKITKsWZ1uZLAl4htzp4VfaYhosSBsbSw_w3A8PTWfd3bYoqzM-x6U")' }}>
                            </div>
                            <div className="absolute bottom-1 right-1 bg-primary text-black p-1 rounded-full border-2 border-background-light dark:border-background-dark shadow-sm">
                                <span className="material-symbols-outlined text-[18px] font-bold">verified</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-slate-900 dark:text-white text-2xl font-black tracking-tighter text-center uppercase italic">Redouane Jiyed</p>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-primary text-xs font-black uppercase tracking-widest">FIFA International</p>
                                <span className="text-gray-400">•</span>
                                <p className="text-gray-500 font-bold text-xs uppercase tracking-wide">Since 2009</p>
                            </div>
                            <p className="text-gray-400 text-xs mt-1 font-bold uppercase tracking-wide">Morocco • Elite Category Official</p>
                        </div>
                    </div>

                    <div className="flex gap-3 w-full">
                        <button className="flex-1 flex cursor-pointer items-center justify-center rounded-2xl h-12 bg-primary hover:bg-yellow-400 text-black text-sm font-black uppercase tracking-wide shadow-glow transition-all active:scale-95">
                            <span className="truncate">Follow Performance</span>
                        </button>
                        <button className="flex size-12 cursor-pointer items-center justify-center rounded-2xl bg-white dark:bg-surface-dark text-slate-900 dark:text-white border border-black/5 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/5 transition-all active:scale-95">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                    </div>
                </div>

                {/* Career Snapshot */}
                <div className="px-4">
                    <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-3 px-1">Career Snapshot</h3>
                    <div className="flex flex-wrap gap-3">
                        <SnapshotCard label="Total Matches" value="450+" />
                        <SnapshotCard label="Intl. Caps" value="22" />
                        <SnapshotCard label="Active Yrs" value="15" />
                    </div>
                </div>

                {/* Advanced Analytics Section */}
                <div className="mt-8 px-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-slate-900 dark:text-white text-xl font-black tracking-tighter uppercase italic">Advanced Analytics</h2>
                        <span className="text-primary text-[10px] font-black uppercase tracking-widest bg-primary/10 px-2 py-1 rounded-lg">PRO DATA</span>
                    </div>
                    <div className="space-y-4">
                        {/* Penalty Award Rate Chart */}
                        <div className="bg-white dark:bg-surface-dark rounded-[1.5rem] p-5 border border-black/5 dark:border-white/5 shadow-sm">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Penalty Award Rate</p>
                                    <p className="text-slate-900 dark:text-white text-3xl font-black tracking-tighter">0.32 <span className="text-xs text-gray-400 font-bold uppercase normal-case mx-1">/ game</span></p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-emerald-500 text-sm font-black flex items-center gap-0.5">
                                        <span className="material-symbols-outlined text-[18px]">trending_up</span>
                                        +33%
                                    </span>
                                    <p className="text-gray-400 text-[9px] uppercase font-black tracking-widest mt-1">vs League Avg (0.24)</p>
                                </div>
                            </div>
                            <div className="flex items-end gap-6 h-32 px-4 mb-2">
                                <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                                    <div className="w-full bg-primary rounded-t-lg shadow-glow-sm transition-all duration-1000 hover:opacity-90" style={{ height: '80%' }}></div>
                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Jiyed</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                                    <div className="w-full bg-gray-200 dark:bg-white/10 border-t border-black/5 dark:border-white/20 rounded-t-lg transition-all duration-1000" style={{ height: '50%' }}></div>
                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Average</span>
                                </div>
                            </div>
                        </div>

                        {/* Foul-to-Card Ratio */}
                        <div className="bg-white dark:bg-surface-dark rounded-[1.5rem] p-5 border border-black/5 dark:border-white/5 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Foul-to-Card Ratio</p>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <div className="size-2 bg-[#ffcc00] rounded-sm"></div>
                                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-black">4.2</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="size-2 bg-[#ff3b30] rounded-sm"></div>
                                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-black">0.18</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-3 bg-gray-100 dark:bg-black/20 rounded-full overflow-hidden flex">
                                <div className="h-full bg-[#ffcc00] shadow-[0_0_10px_rgba(255,204,0,0.3)]" style={{ width: '75%' }}></div>
                                <div className="h-full bg-[#ff3b30] shadow-[0_0_10px_rgba(255,59,48,0.3)]" style={{ width: '5%' }}></div>
                            </div>
                            <p className="text-gray-400 text-[10px] mt-2 font-bold uppercase tracking-wide">Strictness Index: <span className="text-slate-900 dark:text-white/80">Moderate (6.8/10)</span></p>
                        </div>

                        {/* VAR Intervention */}
                        <div className="bg-white dark:bg-surface-dark rounded-[1.5rem] p-5 border border-black/5 dark:border-white/5 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">VAR Frequency</p>
                                <p className="text-slate-900 dark:text-white text-xl font-black tracking-tight uppercase">Low <span className="text-[10px] font-bold text-gray-500 normal-case ml-1">(1 every 4 games)</span></p>
                            </div>
                            <div className="size-12 rounded-full border-4 border-emerald-500/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Matches */}
                <div className="mt-8 px-4">
                    <h2 className="text-slate-900 dark:text-white text-xl font-black tracking-tighter mb-4 uppercase italic">Recent Matches</h2>
                    <div className="space-y-3">
                        <MatchCard
                            league="CAF Champions League"
                            date="12 Oct"
                            rating="8.4"
                            team1="Al Ahly"
                            team1Color="bg-slate-400"
                            score="2 - 1"
                            team2="Wydad AC"
                            team2Color="bg-red-400"
                            stats={[
                                { color: 'bg-[#ffcc00]', text: '5 Yellows' },
                                { color: 'bg-primary', text: '1 Penalty' }
                            ]}
                            fairness="High"
                        />
                        <MatchCard
                            league="Botola Pro"
                            date="05 Oct"
                            rating="7.1"
                            team1="Raja CA"
                            team1Color="bg-green-400"
                            score="0 - 0"
                            team2="RS Berkane"
                            team2Color="bg-orange-400"
                            fairness="Medium"
                        />
                    </div>
                </div>

                {/* Footer Spacer */}
                <div className="h-10"></div>
            </main>

            {/* Bottom Navigation (Specific to this page) */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-black/5 dark:border-white/10 pb-4 md:pb-0">
                <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
                    <NavButton icon="home" label="Home" href="/" />
                    <NavButton icon="sports_soccer" label="Matches" href="#" />
                    <div className="flex flex-col items-center gap-1 -mt-8">
                        <div className="size-14 bg-primary rounded-full flex items-center justify-center shadow-glow border-4 border-background-light dark:border-background-dark transition-transform hover:scale-105">
                            <span className="material-symbols-outlined text-black font-black text-2xl">query_stats</span>
                        </div>
                        <span className="text-[10px] text-primary font-black uppercase tracking-wide">Analytics</span>
                    </div>
                    <NavButton icon="groups" label="Teams" href="#" />
                    <NavButton icon="person_search" label="Referees" href="/referees" />
                </div>
            </div>
        </div>
    );
}

function SnapshotCard({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex min-w-[100px] flex-1 flex-col gap-1 rounded-2xl p-4 bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5 shadow-sm">
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{label}</p>
            <p className="text-slate-900 dark:text-white text-2xl font-black tracking-tight">{value}</p>
        </div>
    );
}

interface MatchCardProps {
    league: string;
    date: string;
    rating: string;
    team1: string;
    team1Color: string;
    score: string;
    team2: string;
    team2Color: string;
    stats?: { color: string; text: string }[];
    fairness: string;
}

function MatchCard({ league, date, rating, team1, team1Color, score, team2, team2Color, stats, fairness }: MatchCardProps) {
    return (
        <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 border border-black/5 dark:border-white/5 shadow-sm hover:border-primary/20 transition-colors">
            <div className="flex justify-between items-center mb-3">
                <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest">{league} • {date}</p>
                <div className="flex items-center gap-1 bg-primary/10 dark:bg-white/5 px-2 py-0.5 rounded-lg border border-primary/10 dark:border-white/5">
                    <span className="text-primary dark:text-white/80 text-[10px] font-black">{rating}</span>
                    <span className="material-symbols-outlined text-primary dark:text-white/40 text-[12px] filled">star</span>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="size-8 bg-gray-100 dark:bg-black/20 rounded-xl flex items-center justify-center p-1.5 border border-black/5 dark:border-white/5">
                        <div className={`size-full ${team1Color} rounded-full`}></div>
                    </div>
                    <span className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-tight">{team1}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-gray-500 dark:text-white/40 text-[10px] font-black">{score}</span>
                    <div className="h-[1px] w-4 bg-black/10 dark:bg-white/10 my-1"></div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-tight">{team2}</span>
                    <div className="size-8 bg-gray-100 dark:bg-black/20 rounded-xl flex items-center justify-center p-1.5 border border-black/5 dark:border-white/5">
                        <div className={`size-full ${team2Color} rounded-full`}></div>
                    </div>
                </div>
            </div>
            <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                <div className="flex gap-3">
                    {stats && stats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-1">
                            <div className={`size-1.5 ${stat.color} rounded-full`}></div>
                            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wide">{stat.text}</span>
                        </div>
                    ))}
                    {!stats && <span className="text-[9px] text-gray-400 font-medium italic">No major incidents</span>}
                </div>
                <span className="text-[9px] text-primary/80 font-black uppercase tracking-wider">Fairness: {fairness}</span>
            </div>
        </div>
    );
}

function NavButton({ icon, label, href }: { icon: string; label: string; href: string }) {
    return (
        <Link href={href} className="flex flex-col items-center gap-1 group">
            <span className="material-symbols-outlined text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{icon}</span>
            <span className="text-[10px] text-gray-400 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{label}</span>
        </Link>
    );
}
