import BottomNav from '@/components/BottomNav';

export default function TicketsPage() {
    return (
        <div className="min-h-screen pb-24 bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
            <header className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-black/5 dark:border-white/5 px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">My Tickets</h1>
            </header>

            <main className="p-4 flex flex-col gap-4">
                {/* Ticket Card */}
                <div className="bg-surface-dark border border-white/5 rounded-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                    <div className="p-5 pl-7">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-xs text-white/50 uppercase tracking-wider">Botola Pro</span>
                                <h3 className="text-lg font-bold">Raja CA vs Wydad AC</h3>
                            </div>
                            <div className="text-right">
                                <span className="block text-xl font-bold text-primary">20:00</span>
                                <span className="text-xs text-white/50">Today</span>
                            </div>
                        </div>

                        <div className="flex gap-4 border-t border-white/10 pt-4">
                            <div>
                                <span className="text-xs text-white/50 block">Gate</span>
                                <span className="font-bold">B4</span>
                            </div>
                            <div>
                                <span className="text-xs text-white/50 block">Row</span>
                                <span className="font-bold">12</span>
                            </div>
                            <div>
                                <span className="text-xs text-white/50 block">Seat</span>
                                <span className="font-bold">45</span>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-center">
                            <div className="bg-white p-2 rounded-lg">
                                {/* QR Code Placeholder */}
                                <div className="w-full h-8 flex items-center justify-center gap-1">
                                    <div className="w-1 h-8 bg-black"></div>
                                    <div className="w-2 h-8 bg-black"></div>
                                    <div className="w-1 h-8 bg-black"></div>
                                    <div className="w-3 h-8 bg-black"></div>
                                    <div className="w-1 h-8 bg-black"></div>
                                    <div className="w-2 h-8 bg-black"></div>
                                    <div className="w-1 h-8 bg-black"></div>
                                    <div className="w-3 h-8 bg-black"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Perforations */}
                    <div className="absolute top-1/2 -left-3 w-6 h-6 bg-background-dark rounded-full"></div>
                    <div className="absolute top-1/2 -right-3 w-6 h-6 bg-background-dark rounded-full"></div>
                </div>
            </main>

            <BottomNav activeTab="tickets" />
        </div>
    );
}
