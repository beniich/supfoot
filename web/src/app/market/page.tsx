import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function TransferMarketPage() {
    return (
        <div className="bg-background-dark text-white min-h-screen pb-32 font-display">
            {/* Top App Bar */}
            <div className="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-md border-b border-white/10">
                <div className="flex items-center p-4 justify-between">
                    <div className="text-primary flex size-10 shrink-0 items-center justify-center">
                        <span className="material-symbols-outlined text-[28px]">sports_soccer</span>
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 px-2">Transfer Market</h2>
                    <div className="flex gap-2">
                        <button className="flex items-center justify-center rounded-full h-10 w-10 bg-white/10">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                        <button className="flex items-center justify-center rounded-full h-10 w-10 bg-white/10">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-md mx-auto">
                {/* Breaking News */}
                <div className="mt-2 px-4 py-2">
                    <div className="relative bg-gradient-to-t from-black to-transparent rounded-xl min-h-64 shadow-2xl flex flex-col justify-end overflow-hidden">
                        <div className="absolute top-4 left-4 bg-primary text-black text-[10px] font-black uppercase px-2 py-1 rounded tracking-wider flex items-center gap-1">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                            </span>
                            Breaking
                        </div>
                        <div className="p-5 relative z-10">
                            <p className="text-2xl font-black leading-tight mb-1">DONE DEAL: Mbappé Signs 5-Year Contract with Real Madrid</p>
                            <p className="text-primary text-sm font-medium">Verified by Fabrizio Romano • 2m ago</p>
                        </div>
                        <div className="absolute inset-0 bg-gray-800 opacity-20"></div>
                    </div>
                </div>

                {/* Transfer Tracker */}
                <div className="px-4 pt-6 pb-2">
                    <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">published_with_changes</span>
                        Transfer Tracker
                    </h2>
                </div>
                <div className="space-y-1 px-2">
                    <TransferItem name="Declan Rice" from="West Ham" to="Arsenal" fee="€105M" status="Confirmed" />
                    <TransferItem name="Jude Bellingham" from="Dortmund" to="Real Madrid" fee="€103M" status="Confirmed" />
                </div>

                {/* Rumor Mill */}
                <div className="px-4 pt-8 pb-3">
                    <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">dynamic_feed</span>
                        Rumor Mill
                    </h2>
                </div>
                <div className="px-4 space-y-4">
                    <RumorCard name="Harry Kane" from="Tottenham" to="FC Bayern" probability={85} source="TIER 1 SOURCE" quote="Personal terms agreed. Final fee structure being negotiated." />
                    <RumorCard name="Neymar Jr" from="PSG" to="Al-Hilal" probability={42} source="SPECULATION" />
                </div>
            </main>

            <BottomNav activeTab="market" />
        </div>
    );
}

function TransferItem({ name, from, to, fee, status }: { name: string, from: string, to: string, fee: string, status: string }) {
    return (
        <div className="flex items-center gap-4 bg-surface-dark rounded-xl px-4 py-3 justify-between border border-white/5 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">person</span>
                </div>
                <div className="flex flex-col">
                    <p className="text-base font-bold leading-none mb-1">{name}</p>
                    <p className="text-white/40 text-xs font-medium uppercase tracking-tighter">
                        {from} <span className="material-symbols-outlined text-[10px] align-middle">arrow_forward</span> {to}
                    </p>
                </div>
            </div>
            <div className="shrink-0 text-right">
                <p className="text-primary text-lg font-black leading-none">{fee}</p>
                <p className="text-white/40 text-[10px] uppercase font-bold">{status}</p>
            </div>
        </div>
    )
}

function RumorCard({ name, from, to, probability, source, quote }: { name: string, from: string, to: string, probability: number, source: string, quote?: string }) {
    return (
        <div className="bg-surface-dark rounded-xl p-4 border border-white/5 shadow-lg">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                        <span className="material-symbols-outlined text-white/40">person</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">{name}</h3>
                        <p className="text-white/40 text-[10px] uppercase font-bold tracking-wider">
                            {from} <span className="material-symbols-outlined text-[8px] align-middle">trending_flat</span> {to}
                        </p>
                    </div>
                </div>
                <div className="bg-primary/10 text-primary text-[10px] font-black px-2 py-1 rounded">{source}</div>
            </div>
            <div className="space-y-1.5">
                <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Probability</span>
                    <span className="text-primary text-sm font-black tracking-tighter">{probability}%</span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${probability}%` }}></div>
                </div>
            </div>
            {quote && <p className="mt-3 text-[11px] leading-relaxed text-white/60 italic">"{quote}"</p>}
        </div>
    )
}
