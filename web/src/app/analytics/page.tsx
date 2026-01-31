import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function AnalyticsPage() {
    return (
        <div className="bg-background-dark text-white min-h-screen pb-32 font-display">
            {/* Top App Bar */}
            <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center p-4 justify-between max-w-md mx-auto">
                    <Link href="/" className="text-primary cursor-pointer">
                        <span className="material-symbols-outlined">arrow_back_ios</span>
                    </Link>
                    <h1 className="text-lg font-bold tracking-tight">Player Analytics</h1>
                    <div className="flex gap-3">
                        <button className="text-yellow-500">
                            <span className="material-symbols-outlined">stars</span>
                        </button>
                        <button className="text-white">
                            <span className="material-symbols-outlined">share</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-md mx-auto">
                {/* Profile Header */}
                <section className="p-4">
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <div className="size-24 rounded-full border-2 border-primary p-1">
                                <div className="w-full h-full rounded-full bg-gray-700"></div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-background-dark">
                                PRO+
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <h2 className="text-2xl font-bold leading-tight">Erling Haaland</h2>
                            </div>
                            <p className="text-primary font-medium">Manchester City | Forward (ST)</p>
                            <div className="flex gap-3 mt-1">
                                <span className="text-white/40 text-sm">Age: 23</span>
                                <span className="text-white/40 text-sm">•</span>
                                <span className="text-white/40 text-sm">Value: €180.5M</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technical Radar Chart */}
                <section className="px-4 py-2">
                    <div className="bg-surface-dark rounded-xl border border-white/5 p-5">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold">Technical Radar</h3>
                            <div className="flex flex-col items-end">
                                <div className="flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-primary"></span>
                                    <span className="text-[10px] text-white/70 uppercase">Player</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-white/20"></span>
                                    <span className="text-[10px] text-white/70 uppercase">League Avg</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full aspect-square flex items-center justify-center">
                            <svg className="w-full h-full max-w-[260px]" viewBox="0 0 200 200">
                                <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeOpacity="0.1" />
                                <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeOpacity="0.1" />
                                <circle cx="100" cy="100" r="40" fill="none" stroke="white" strokeOpacity="0.1" />
                                <polygon points="100,25 170,75 140,165 60,165 30,75" fill="rgba(242, 204, 13, 0.2)" stroke="#f2cc0d" strokeWidth="2" />
                                <text fill="white" fillOpacity="0.4" fontSize="8" fontWeight="bold" textAnchor="middle" x="100" y="20">PACE</text>
                                <text fill="white" fillOpacity="0.4" fontSize="8" fontWeight="bold" textAnchor="middle" x="185" y="85">SHOT</text>
                                <text fill="white" fillOpacity="0.4" fontSize="8" fontWeight="bold" textAnchor="middle" x="150" y="180">PASS</text>
                                <text fill="white" fillOpacity="0.4" fontSize="8" fontWeight="bold" textAnchor="middle" x="50" y="180">DRIB</text>
                                <text fill="white" fillOpacity="0.4" fontSize="8" fontWeight="bold" textAnchor="middle" x="15" y="85">PHYS</text>
                            </svg>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                <p className="text-yellow-500 text-2xl font-black">94</p>
                                <p className="text-[8px] text-white/50 tracking-widest uppercase">Overall</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* In-Depth Stats */}
                <section className="px-4 pb-6 mt-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold tracking-tight">In-Depth Stats</h2>
                        <button className="text-primary text-xs font-bold flex items-center gap-1 uppercase">
                            Full Report <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </button>
                    </div>
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 mb-2 text-yellow-500">
                            <span className="material-symbols-outlined text-lg">bolt</span>
                            <h4 className="text-sm font-bold uppercase tracking-widest">Attacking</h4>
                        </div>
                        <StatBar label="Expected Goals (xG)" value="0.98" sub="/90min" trend="+0.12" progress={92} />
                        <StatBar label="Shot Accuracy" value="64.2%" trend="Top 1%" progress={99} isPercentile />
                    </div>
                </section>
            </main>

            <BottomNav activeTab="hub" />
        </div>
    );
}

function StatBar({ label, value, sub, trend, progress, isPercentile = false }: { label: string, value: string, sub?: string, trend: string, progress: number, isPercentile?: boolean }) {
    return (
        <div className="bg-surface-dark p-4 rounded-xl border-l-4 border-yellow-500">
            <div className="flex justify-between items-end mb-1">
                <div>
                    <p className="text-white/60 text-xs">{label}</p>
                    <p className="text-lg font-bold">{value} {sub && <span className="text-[10px] text-white/40">{sub}</span>}</p>
                </div>
                <div className="text-right">
                    <span className="text-green-500 text-xs font-bold">{trend}</span>
                    <p className="text-[10px] text-white/40 uppercase">{isPercentile ? 'Percentile' : 'vs Avg'}</p>
                </div>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    )
}
