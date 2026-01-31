import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function WydadProfilePage() {
    return (
        <div className="bg-background-dark font-display text-white min-h-screen pb-32">
            {/* Top Navigation Bar */}
            <div className="fixed top-0 z-50 w-full bg-background-dark/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-white">arrow_back</span>
                </Link>
                <div className="flex flex-col items-center">
                    <h2 className="text-sm font-bold leading-tight tracking-tight">FootballHub+</h2>
                    <span className="text-[10px] text-red-600 font-bold uppercase tracking-widest">Premium Club</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-white">share</span>
                </div>
            </div>

            <main className="pt-0">
                {/* Hero Section */}
                <div className="relative h-[420px] w-full overflow-hidden bg-gradient-to-b from-red-900/20 to-black">
                    <div className="absolute bottom-12 left-0 w-full px-6 flex flex-col items-center">
                        <div className="w-24 h-24 mb-4 rounded-full bg-white p-2 border-2 border-red-600 shadow-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-red-600 text-5xl">shield</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-white italic">WYDAD AC</h1>
                        <p className="text-white/70 text-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs text-red-600">verified</span>
                            The Red Castle
                        </p>
                        <div className="flex gap-2 mt-4 w-full">
                            <button className="flex-1 bg-red-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-red-600/20">
                                <span className="material-symbols-outlined text-sm">person_add</span>
                                Follow Club
                            </button>
                            <button className="px-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold py-3 rounded-lg">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="flex gap-3 px-4 py-6 overflow-x-auto no-scrollbar">
                    <ClubStat label="Last Result" value="2-0" color="text-red-600" />
                    <ClubStat label="Top Scorer" value="12" />
                    <ClubStat label="Fan Members" value="50K+" />
                    <ClubStat label="Botola Pro" value="1st" />
                </div>

                {/* Fixtures Section */}
                <section className="px-4">
                    <div className="flex justify-between items-center pb-3">
                        <h2 className="text-xl font-bold tracking-tight">Upcoming Fixtures</h2>
                        <span className="text-red-600 text-sm font-medium">View All</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white/5 border border-white/10 p-4 shadow-sm">
                            <div className="flex flex-[2_2_0px] flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <p className="text-red-600 text-[11px] font-bold uppercase tracking-widest">Derby Casablanca</p>
                                    <p className="text-white/50 text-xs font-medium">Sunday, Oct 15 • 20:00</p>
                                    <p className="text-base font-bold leading-tight">Wydad AC vs Raja CA</p>
                                    <div className="flex items-center gap-1 text-white/50 text-xs">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        Stade Mohammed V
                                    </div>
                                </div>
                                <button className="flex min-w-[100px] items-center justify-center rounded-lg h-10 px-4 bg-red-600 text-white text-sm font-bold">
                                    Get Tickets
                                </button>
                            </div>
                            <div className="w-32 aspect-square bg-gray-700 rounded-xl border border-white/5"></div>
                        </div>
                    </div>
                </section>

                {/* Honors Grid */}
                <section className="mt-8 px-4 mb-8">
                    <h2 className="text-xl font-bold tracking-tight mb-4">Club Honors</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <HonorCard icon="emoji_events" count="22" label="Botola Pro" color="text-amber-500" />
                        <HonorCard icon="trophy" count="3" label="CAF Champions" color="text-amber-300" />
                        <HonorCard icon="military_tech" count="9" label="Throne Cup" color="text-slate-400" />
                        <HonorCard icon="workspace_premium" count="1" label="CAF Super Cup" color="text-amber-600" />
                    </div>
                </section>
            </main>

            <BottomNav activeTab="home" />
        </div>
    );
}

function ClubStat({ label, value, color }: { label: string, value: string, color?: string }) {
    return (
        <div className="flex min-w-[120px] flex-col gap-1 rounded-xl bg-white/5 border border-white/10 p-4 items-center text-center">
            <p className={`text-2xl font-bold leading-tight ${color || 'text-white'}`}>{value}</p>
            <p className="text-white/40 text-[11px] font-bold uppercase tracking-wider">{label}</p>
        </div>
    )
}

function HonorCard({ icon, count, label, color }: { icon: string, count: string, label: string, color: string }) {
    return (
        <div className="flex flex-col items-center p-4 bg-white/5 rounded-xl border border-white/10 text-center">
            <span className={`material-symbols-outlined ${color} text-4xl mb-2`}>{icon}</span>
            <p className="text-lg font-bold">{count}</p>
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">{label}</p>
        </div>
    )
}
