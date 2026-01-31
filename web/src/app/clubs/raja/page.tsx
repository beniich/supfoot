import BottomNav from '@/components/BottomNav';
import Link from 'next/link';

export default function RajaProfilePage() {
    return (
        <div className="bg-background-dark font-display text-white min-h-screen pb-32">
            {/* Top Navigation Bar */}
            <div className="fixed top-0 z-50 w-full bg-background-dark/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-white">arrow_back_ios</span>
                </Link>
                <h2 className="text-sm font-bold tracking-widest uppercase text-primary">FootballHub+</h2>
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-white">share</span>
                    <span className="material-symbols-outlined text-white">notifications</span>
                </div>
            </div>

            <main className="pt-0">
                {/* Hero Section */}
                <div className="relative h-[420px] w-full overflow-hidden bg-gradient-to-b from-green-900/20 to-green-950">
                    <div className="absolute bottom-12 left-0 w-full px-6 flex flex-col items-center">
                        <div className="w-24 h-24 mb-4 rounded-full bg-black p-2 border-2 border-primary shadow-lg">
                            <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-5xl">shield</span>
                            </div>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-white italic">RAJA CA</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/30 tracking-widest uppercase">The People's Club</span>
                        </div>
                    </div>
                </div>

                {/* Floating Stats */}
                <div className="px-4 -mt-8 relative z-10">
                    <div className="bg-surface-dark border border-white/10 rounded-xl flex items-center justify-around py-5 px-2 shadow-2xl backdrop-blur-md">
                        <StatItem label="Rank" value="1st" color="text-primary" />
                        <div className="w-[1px] h-8 bg-white/10"></div>
                        <StatItem label="Next Match" value="vs Wydad" sub="Tomorrow 20:00" />
                        <div className="w-[1px] h-8 bg-white/10"></div>
                        <StatItem label="Trophies" value="12" color="text-yellow-500" />
                    </div>
                </div>

                {/* News Section */}
                <section className="mt-8 px-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold flex items-center gap-2">Latest News <span className="size-2 bg-primary rounded-full animate-pulse"></span></h2>
                        <span className="text-xs font-bold text-primary uppercase">See All</span>
                    </div>
                    <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
                        <NewsItem title="Preparation for the Casablanca Derby begins today." badge="Exclusive" />
                        <NewsItem title="New defensive signing arrives at the complex." badge="Transfer" />
                    </div>
                </section>

                {/* Squad Section */}
                <section className="mt-6 px-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Squad</h2>
                        <span className="text-xs font-bold text-primary uppercase">View Full List</span>
                    </div>
                    <div className="flex overflow-x-auto gap-6 pb-2 no-scrollbar">
                        <PlayerThumbnail name="Anas Zniti" pos="GK" num="1" />
                        <PlayerThumbnail name="M. Zrida" pos="MID" num="19" />
                        <PlayerThumbnail name="Y. Bouzok" pos="FW" num="11" />
                    </div>
                </section>

                {/* History Section */}
                <section className="mt-8 px-4">
                    <div className="bg-surface-dark p-6 rounded-2xl border border-white/5">
                        <h2 className="text-xl font-black text-primary uppercase mb-3">The People’s Club</h2>
                        <p className="text-white/70 text-sm leading-relaxed mb-4">
                            Founded in 1949 by Moroccan nationalist leaders, Raja Club Athletic is more than just a football club...
                        </p>
                        <button className="w-full py-3 bg-primary text-black font-black rounded-xl text-sm uppercase flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-base">history_edu</span>
                            Explore History
                        </button>
                    </div>
                </section>
            </main>

            <BottomNav activeTab="home" />
        </div>
    );
}

function StatItem({ label, value, sub, color }: { label: string, value: string, sub?: string, color?: string }) {
    return (
        <div className="flex flex-col items-center">
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">{label}</p>
            <p className={`text-xl font-bold ${color || 'text-white'}`}>{value}</p>
            {sub && <p className="text-[9px] text-primary/80 font-medium">{sub}</p>}
        </div>
    )
}

function NewsItem({ title, badge }: { title: string, badge: string }) {
    return (
        <div className="min-w-[280px] h-48 rounded-xl relative overflow-hidden flex-shrink-0 border border-white/10 bg-gray-800">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 p-4">
                <span className="bg-primary text-black text-[9px] font-black px-2 py-0.5 rounded uppercase mb-2 inline-block">{badge}</span>
                <h3 className="text-sm font-bold text-white leading-tight">{title}</h3>
            </div>
        </div>
    )
}

function PlayerThumbnail({ name, pos, num }: { name: string, pos: string, num: string }) {
    return (
        <div className="flex flex-col items-center min-w-[100px] group">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-surface-dark border-2 border-transparent group-hover:border-primary transition-all p-1">
                <div className="w-full h-full rounded-xl bg-gray-700"></div>
            </div>
            <p className="mt-2 text-xs font-bold text-white">{name}</p>
            <p className="text-[10px] text-white/50">{pos} • #{num}</p>
        </div>
    )
}
