'use client';

import React from 'react';
import Link from 'next/link';

export default function RefereeHubPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-gray-900 dark:text-white antialiased min-h-screen pb-24">
            {/* Top Navigation Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-black/5 dark:border-white/5">
                <div className="flex items-center p-4 pb-2 justify-between max-w-md mx-auto">
                    <Link href="/" className="text-primary flex size-10 shrink-0 items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">
                        <span className="material-symbols-outlined">analytics</span>
                    </Link>
                    <h2 className="text-gray-900 dark:text-white text-lg font-black leading-tight tracking-tighter flex-1 text-center uppercase italic">Referee Hub</h2>
                    <div className="flex w-10 items-center justify-end">
                        <button className="flex size-10 items-center justify-center rounded-full bg-surface-dark/20 dark:bg-white/10 text-primary hover:bg-primary/20 transition-colors">
                            <span className="material-symbols-outlined">account_circle</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="pt-16 max-w-md mx-auto">
                {/* Search Section */}
                <div className="px-4 py-3">
                    <label className="flex flex-col h-12 w-full">
                        <div className="flex w-full flex-1 items-stretch rounded-2xl shadow-sm border border-black/5 dark:border-white/5 bg-white dark:bg-surface-dark overflow-hidden">
                            <div className="text-gray-400 flex border-none bg-transparent items-center justify-center pl-4 rounded-l-xl">
                                <span className="material-symbols-outlined">search</span>
                            </div>
                            <input
                                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-gray-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-gray-400 px-4 pl-2 text-base font-medium"
                                placeholder="Search officials..."
                            />
                        </div>
                    </label>
                </div>

                {/* Featured Referee: Referee of the Month */}
                <div className="p-4">
                    <Link href="/referees/1" className="block relative overflow-hidden flex flex-col items-stretch justify-start rounded-[1.5rem] shadow-xl bg-surface-dark border border-primary/20 group">
                        <div className="absolute top-3 right-3 z-10 bg-primary px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                            <span className="material-symbols-outlined text-[16px] text-black">workspace_premium</span>
                            <span className="text-black text-[10px] font-black uppercase tracking-wider">Gold Badge</span>
                        </div>
                        <div className="w-full bg-center bg-top bg-no-repeat aspect-[16/9] bg-cover transform group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAeSNPJPJA3Ub_XCadDUKUQiWJ-cU2vmem2SkY-mCURODaWvBPCZYzXZvOaBqW1iTEjLJ_WZnBmUybz8zGf2c0AIM7zW8cWnrxZF4kcfdFPduzOkY3ISg4G232I3CyLfRJE32epsld4wzTnfGW03pcMef6Pt8RbSkhMOHCWY8LlWGVP77fZBsNWl9Ougxp2AYEijD-ppeUVX5HtPwYH73XXIUWgMLnGF0p47a-gcoe_bktgHPjfgdOaCJgWwjpD0FBhV8DnLwmr1Ik")' }}>
                            <div className="w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                        </div>
                        <div className="flex w-full grow flex-col items-stretch justify-center gap-1 py-4 px-5 -mt-12 relative z-10">
                            <p className="text-primary text-[10px] font-black leading-normal tracking-widest uppercase">Referee of the Month</p>
                            <p className="text-white text-2xl font-black leading-tight tracking-tighter uppercase italic">Victor Gomes</p>
                            <div className="flex items-center gap-3 justify-between mt-2">
                                <div className="flex flex-col gap-0.5">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-primary font-black text-lg">98.5%</span>
                                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-tight">Fairness & Accuracy</p>
                                    </div>
                                    <p className="text-gray-500 text-[10px] uppercase font-bold">Top performer in Premier League (Oct)</p>
                                </div>
                                <button className="flex h-9 px-4 bg-primary hover:bg-yellow-400 text-black rounded-xl items-center justify-center font-black text-xs uppercase tracking-wide shadow-glow transition-all active:scale-95">
                                    Details
                                </button>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* League Averages Section */}
                <div className="mt-2">
                    <h3 className="text-gray-900 dark:text-white text-sm font-black leading-tight tracking-tight uppercase italic px-4 pb-2">League Metrics</h3>
                    <div className="flex gap-3 px-4 pb-4 overflow-x-auto no-scrollbar">
                        <MetricCard icon="square" iconColor="text-yellow-400" value="3.2" label="/gm" />
                        <MetricCard icon="square" iconColor="text-red-500" value="0.15" label="/gm" />
                        <MetricCard icon="video_settings" iconColor="text-primary" value="12%" label="VAR Corr" />
                        <MetricCard icon="sports_handball" iconColor="text-green-400" value="0.4" label="Pens" />
                    </div>
                </div>

                {/* Detailed List Header */}
                <div className="flex items-center justify-between px-4 pt-4 pb-2">
                    <h3 className="text-gray-900 dark:text-white text-sm font-black leading-tight tracking-tight uppercase italic">Performance Rankings</h3>
                    <button className="text-primary text-xs font-black uppercase tracking-wide flex items-center gap-1 hover:text-primary/80 transition-colors">
                        Filters <span className="material-symbols-outlined text-[14px]">filter_list</span>
                    </button>
                </div>

                {/* Referee List */}
                <div className="flex flex-col gap-3 px-4 pb-8">
                    <RefereeCard
                        name="Szymon Marciniak"
                        badge="UEFA Elite Referee"
                        score="98.2%"
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuB3VCBQpgu_NG1bBIL3Z2M5M5HveoO6uui5nfI0Q6iPYtemiETez9kZOIMyDtfxoDPELcuKCfGRScz2Ibu71II77RqpY4p8cChMHfXFjFqx5ECMS8hXcB_dzuIqzvND9IQGaJUlivjtUDN5VU2_8XjXaYYZQuJGDhrEKRe16uUDHq3n9vQwOH3CtuFQwwmPWEkvhAbfoDUgouDbbguxe2Rzwwcnrct2h70t-Dxa9kFKMwK4DC-7OybKHzdO8Ev8eNwB2vmR9o19V54"
                        games="18"
                        cards="4.1"
                        trend={[1, 2, 1, 4, 3]}
                    />
                    <RefereeCard
                        name="Michael Oliver"
                        badge="Premier League"
                        score="94.8%"
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuDTE7c8ZsXUekHx--1eBqgXMDbskNqwTh4HE4Mi9VqxZv25J2CU9AI5Vt_E87VnYp69alON8XxTQiUpXCezQVOeebTEqRMTQREpznixMYoFXvMrtB3io1qrVG2QN3M7unApkSITWzUuakDTKD_P8p49D7CcCitwz2Ruh20GUuW2ZUc2wfSyV4vzgvnl9STjOtzW1pCvk4u-SykaVEZTARSlV924BvdGp6sIPbhw28HKEGHg5omk15E5OIuT3FxcKzmrBAaBPhUMZrc"
                        games="22"
                        cards="3.8"
                        trend={[4, 3, 3.5, 2, 2.5]}
                    />
                    <RefereeCard
                        name="Stephanie Frappart"
                        badge="Ligue 1"
                        score="96.1%"
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuDFF19O8bVBZIdesl0JoSzC8PPXpPh8ctjq3zG_Kg62-U_raVF_xvkSN3WDiZFlAx3gGZnBWoGqBx2LQfB_fQ9iKlzihe8E7XiCKu9SsKrXWWinXquT38-2J1C-iIpm2EvPQZuBvMCiPvedsJchs9xZuZYTBztRCSkdaGZBtOOBmDVYTvuKNV6VV0oOpaNQbTsNq4UbuUo8LIrPDw_BLENb9rtxWm8ST7y2RE7xfgP3pE2M6y_dxvbqutQJxuW0YjKDlp4LxUgLKlc"
                        games="15"
                        cards="4.5"
                        trend={[2, 2.5, 3, 3.5, 4]}
                    />
                </div>
            </main>

            {/* Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-black/5 dark:border-white/5 pb-4 md:pb-0">
                <div className="flex items-center justify-around h-16 max-w-md mx-auto">
                    <NavButton icon="home" label="Home" href="/" />
                    <NavButton icon="sports" label="Referees" active href="/referees" />
                    <NavButton icon="leaderboard" label="Stats" href="#" />
                    <NavButton icon="notifications" label="Alerts" href="#" />
                </div>
            </div>
        </div>
    );
}

function MetricCard({ icon, iconColor, value, label }: any) {
    return (
        <div className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-2xl bg-white dark:bg-surface-dark px-4 border border-black/5 dark:border-white/5 shadow-sm">
            <span className={`material-symbols-outlined ${iconColor} text-lg`}>{icon}</span>
            <p className="text-gray-900 dark:text-white text-sm font-bold leading-normal whitespace-nowrap">
                {value} <span className="text-gray-500 dark:text-white/50 text-xs font-normal">{label}</span>
            </p>
        </div>
    );
}

function RefereeCard({ name, badge, score, image, games, cards, trend }: any) {
    return (
        <Link href="/referees/1" className="bg-white dark:bg-surface-dark rounded-2xl p-4 border border-black/5 dark:border-white/5 flex flex-col gap-3 shadow-sm hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="size-12 rounded-full bg-center bg-cover bg-gray-100 dark:bg-surface-dark ring-2 ring-primary/20" style={{ backgroundImage: `url('${image}')` }}></div>
                    <div>
                        <p className="text-gray-900 dark:text-white font-black text-sm uppercase tracking-tight">{name}</p>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wide">{badge}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-primary font-black text-lg leading-none">{score}</p>
                    <p className="text-gray-400 text-[10px] uppercase font-black tracking-wider">VAR Acc.</p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
                <StatBox label="Games" value={games} />
                <StatBox label="Cards/gm" value={cards} />
                <div className="bg-gray-50 dark:bg-black/20 rounded-xl p-2 flex flex-col items-center overflow-hidden">
                    <p className="text-[9px] text-gray-400 uppercase font-black tracking-wider">Trend</p>
                    <div className="w-full h-4 mt-1 flex items-end justify-center gap-0.5">
                        {trend.map((h: number, i: number) => (
                            <div key={i} className={`w-1.5 rounded-t-sm ${i === 4 ? 'bg-primary' : 'bg-primary/40'}`} style={{ height: `${h * 20}%` }}></div>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}

function StatBox({ label, value }: { label: string, value: string }) {
    return (
        <div className="bg-gray-50 dark:bg-black/20 rounded-xl p-2 flex flex-col items-center">
            <p className="text-[9px] text-gray-400 uppercase font-black tracking-wider">{label}</p>
            <p className="text-gray-900 dark:text-white font-black text-sm">{value}</p>
        </div>
    );
}

function NavButton({ icon, label, href, active }: any) {
    return (
        <Link href={href} className="flex flex-col items-center gap-1">
            <span className={`material-symbols-outlined ${active ? 'text-primary filled' : 'text-gray-400'}`}>{icon}</span>
            <span className={`text-[10px] ${active ? 'font-black text-primary' : 'font-medium text-gray-400'}`}>{label}</span>
        </Link>
    );
}
