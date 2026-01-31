import BottomNav from '@/components/BottomNav';
import MatchCard from '@/components/MatchCard';

export default function MatchesPage() {
    return (
        <div className="min-h-screen pb-24 bg-background-dark font-sans text-white">
            <header className="sticky top-0 z-30 bg-background-dark/95 backdrop-blur-md border-b border-white/5">
                {/* Top Bar */}
                <div className="flex items-center justify-between px-4 pt-4 pb-2">
                    <h1 className="text-2xl font-bold tracking-tight">Fixtures</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-white/40 uppercase tracking-wide">Favorites Only</span>
                        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/10">
                            <span className="inline-block h-4 w-4 translate-x-1 rounded-full bg-white transition" />
                        </div>
                    </div>
                </div>
                {/* Date Strip */}
                <div className="flex gap-3 overflow-x-auto px-4 py-3 no-scrollbar mt-1">
                    <DateItem day="Yest" date="11" />
                    <DateItem day="Today" date="12" active />
                    <DateItem day="Tom" date="13" />
                    <DateItem day="Mon" date="14" />
                    <DateItem day="Tue" date="15" />
                    <DateItem day="Wed" date="16" />
                </div>
            </header>

            <main className="flex flex-col gap-2 pt-2">
                <LeagueSection name="Botola Pro" />
                <div className="px-4 space-y-3">
                    <MatchCard
                        league="Botola Pro"
                        minute="82'"
                        homeTeam="Raja CA"
                        awayTeam="Wydad AC"
                        homeScore={2}
                        awayScore={1}
                        isLive={true}
                    />
                </div>

                <LeagueSection name="Premier League" />
                <div className="px-4 space-y-3">
                    <MatchCard
                        league="Premier League"
                        minute="16'"
                        homeTeam="Man City"
                        awayTeam="Liverpool"
                        homeScore={0}
                        awayScore={0}
                        isLive={true}
                    />
                    <MatchCard
                        league="Premier League"
                        time="15:00"
                        homeTeam="Arsenal"
                        awayTeam="Chelsea"
                        isLive={false}
                    />
                </div>

                <LeagueSection name="La Liga" />
                <div className="px-4 space-y-3">
                    <MatchCard
                        league="La Liga"
                        time="FT"
                        homeTeam="Real Madrid"
                        awayTeam="Getafe"
                        homeScore={3}
                        awayScore={0}
                        isLive={false}
                    />
                </div>
            </main>

            <BottomNav activeTab="matches" />
        </div>
    );
}

function DateItem({ day, date, active = false }: { day: string, date: string, active?: boolean }) {
    return (
        <button className={`flex flex-col items-center justify-center min-w-[64px] h-[76px] rounded-xl transition-all ${active ? 'bg-primary text-black' : 'bg-surface-dark border border-white/5 text-white/40'}`}>
            <span className="text-[11px] font-bold uppercase tracking-wider">{day}</span>
            <span className={`text-xl font-bold ${active ? 'text-black' : 'text-white/80'}`}>{date}</span>
        </button>
    )
}

function LeagueSection({ name }: { name: string }) {
    return (
        <div className="flex items-center gap-3 px-4 py-3 sticky top-[152px] z-20 bg-background-dark/95 backdrop-blur border-y border-white/5">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden p-1">
                <div className="w-full h-full bg-gray-200 rounded-full"></div>
            </div>
            <h3 className="text-lg font-bold flex-1">{name}</h3>
            <span className="material-symbols-outlined text-white/40">expand_less</span>
        </div>
    )
}
