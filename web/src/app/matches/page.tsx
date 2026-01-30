import BottomNav from '@/components/BottomNav';
import MatchCard from '@/components/MatchCard';

export default function MatchesPage() {
    return (
        <div className="min-h-screen pb-24 bg-background-light dark:bg-background-dark">
            <header className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-black/5 dark:border-white/5 px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Matches</h1>
                <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10">
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">calendar_today</span>
                </button>
            </header>

            <main className="flex flex-col gap-6 p-4">
                <section>
                    <h2 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">Live Now</h2>
                    <div className="flex flex-col gap-4">
                        <MatchCard
                            league="Botola Pro"
                            minute="82'"
                            homeTeam="Raja CA"
                            awayTeam="Wydad AC"
                            homeScore={2}
                            awayScore={1}
                            isLive={true}
                        />
                        <MatchCard
                            league="Premier League"
                            minute="16'"
                            homeTeam="Man City"
                            awayTeam="Liverpool"
                            homeScore={0}
                            awayScore={0}
                            isLive={true}
                        />
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">Upcoming</h2>
                    <div className="flex flex-col gap-4">
                        <MatchCard
                            league="Serie A"
                            time="20:45"
                            homeTeam="Inter"
                            awayTeam="Milan"
                            isLive={false}
                        />
                        <MatchCard
                            league="La Liga"
                            time="Tomorrow"
                            homeTeam="Real Madrid"
                            awayTeam="Barcelona"
                            isLive={false}
                        />
                    </div>
                </section>
            </main>

            <BottomNav activeTab="matches" />
        </div>
    );
}
