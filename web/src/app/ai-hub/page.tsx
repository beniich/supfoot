import BottomNav from '@/components/BottomNav';

export default function AIHubPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-20 min-h-screen">
            {/* Top App Bar */}
            <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-primary/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button className="flex items-center justify-center text-slate-900 dark:text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold tracking-tight leading-none uppercase">
                            FootballHub<span className="text-primary">+</span>
                        </h1>
                        <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Premium</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center size-10 rounded-full bg-surface-dark/50 text-white">
                        <span className="material-symbols-outlined text-primary">notifications</span>
                    </button>
                    <div className="size-8 rounded-full bg-gradient-to-tr from-primary to-orange-400 overflow-hidden border-2 border-primary/20">
                        <div className="w-full h-full bg-gray-700"></div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex flex-col gap-6 p-4">
                {/* Hero: Featured Match Analysis */}
                <section className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold tracking-wide uppercase">Featured Match Analysis</h2>
                        <span className="text-xs font-medium text-white/50 bg-white/5 px-2 py-1 rounded">LIVE ODDS</span>
                    </div>

                    {/* Match Card & Chart */}
                    <div className="relative overflow-hidden rounded-xl bg-surface-dark border border-white/5 p-6 shadow-xl">
                        {/* Background decorative element */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

                        {/* Match Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-center w-1/3">
                                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold text-lg mb-2 shadow-lg shadow-blue-500/20">
                                    MC
                                </div>
                                <p className="text-sm font-bold uppercase">Man City</p>
                            </div>
                            <div className="text-center w-1/3 flex flex-col items-center">
                                <span className="text-xs text-white/40 font-mono mb-1">19:45 GMT</span>
                                <div className="text-2xl font-bold font-mono bg-black/20 px-3 py-1 rounded text-primary border border-primary/20">
                                    VS
                                </div>
                            </div>
                            <div className="text-center w-1/3">
                                <div className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center text-red-900 font-bold text-lg mb-2 shadow-lg shadow-red-500/20">
                                    ARS
                                </div>
                                <p className="text-sm font-bold uppercase">Arsenal</p>
                            </div>
                        </div>

                        {/* Win Probability Gauge */}
                        <div className="flex flex-col items-center justify-center relative py-2">
                            <div className="relative size-48">
                                <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                                    {/* Background Circle */}
                                    <circle className="text-white/5 stroke-current" cx="50" cy="50" fill="none" r="40" strokeWidth="12"></circle>
                                    {/* Man City (45%) */}
                                    <circle
                                        className="text-primary stroke-current drop-shadow-[0_0_8px_rgba(242,204,13,0.4)]"
                                        cx="50"
                                        cy="50"
                                        fill="none"
                                        r="40"
                                        strokeDasharray="113 251"
                                        strokeDashoffset="0"
                                        strokeLinecap="butt"
                                        strokeWidth="12"
                                    ></circle>
                                    {/* Draw (20%) */}
                                    <circle
                                        className="text-white/20 stroke-current"
                                        cx="50"
                                        cy="50"
                                        fill="none"
                                        r="40"
                                        strokeDasharray="50 251"
                                        strokeDashoffset="-115"
                                        strokeLinecap="butt"
                                        strokeWidth="12"
                                    ></circle>
                                    {/* Arsenal (35%) */}
                                    <circle
                                        className="text-white/50 stroke-current"
                                        cx="50"
                                        cy="50"
                                        fill="none"
                                        r="40"
                                        strokeDasharray="88 251"
                                        strokeDashoffset="-167"
                                        strokeLinecap="butt"
                                        strokeWidth="12"
                                    ></circle>
                                </svg>
                                {/* Center Text */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-xs text-white/50 uppercase tracking-widest">Home Win</span>
                                    <span className="text-4xl font-bold text-primary neon-text">45%</span>
                                    <span className="text-[10px] text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full mt-1">
                                        AI CONFIDENCE
                                    </span>
                                </div>
                            </div>
                            {/* Legend */}
                            <div className="flex justify-center gap-6 mt-4 w-full">
                                <div className="flex items-center gap-2">
                                    <div className="size-3 rounded-full bg-primary shadow-[0_0_8px_rgba(242,204,13,0.4)]"></div>
                                    <span className="text-xs font-medium">City</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="size-3 rounded-full bg-white/20"></div>
                                    <span className="text-xs font-medium text-white/60">Draw</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="size-3 rounded-full bg-white/50"></div>
                                    <span className="text-xs font-medium text-white/80">Arsenal</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Smart Insights */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold tracking-wide uppercase flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">auto_awesome</span>
                        Smart Insights
                    </h2>
                    <div className="bg-gradient-to-br from-surface-dark to-background-dark border border-primary/30 rounded-xl p-5 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-yellow-500/20 text-yellow-500 p-1.5 rounded-md">
                                    <span className="material-symbols-outlined text-[20px]">warning</span>
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm leading-relaxed">
                                        Haaland is doubtful (Ankle) for the upcoming fixture. City's xG drops by 0.8 without him.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full h-px bg-white/5"></div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-green-500/20 text-green-500 p-1.5 rounded-md">
                                    <span className="material-symbols-outlined text-[20px]">trending_up</span>
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm leading-relaxed">
                                        Arsenal is unbeaten in their last 5 away games, averaging 2.1 goals per match.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-3 flex justify-end">
                            <button className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1 hover:text-white transition-colors">
                                View Full Report <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Upcoming Predictions */}
                <section className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold tracking-wide uppercase">Upcoming Predictions</h2>
                        <button className="text-primary text-sm font-bold">See All</button>
                    </div>
                    <div className="flex flex-col gap-3">
                        <PredictionCard
                            time="Tomorrow, 20:00"
                            league="PL"
                            homeTeam="Liverpool"
                            awayTeam="Chelsea"
                            homeAbbr="LIV"
                            awayAbbr="CHE"
                            prediction="3 - 1"
                            probability={85}
                            confidence="High"
                        />
                        <PredictionCard
                            time="Sun, 19:00"
                            league="LL"
                            homeTeam="Real Madrid"
                            awayTeam="Barcelona"
                            homeAbbr="RMA"
                            awayAbbr="FCB"
                            prediction="2 - 2"
                            probability={60}
                            confidence="Med"
                        />
                    </div>
                </section>
            </main>

            <BottomNav activeTab="ai-hub" />
        </div>
    );
}

function PredictionCard({
    time,
    league,
    homeTeam,
    awayTeam,
    homeAbbr,
    awayAbbr,
    prediction,
    probability,
    confidence,
}: {
    time: string;
    league: string;
    homeTeam: string;
    awayTeam: string;
    homeAbbr: string;
    awayAbbr: string;
    prediction: string;
    probability: number;
    confidence: string;
}) {
    const isHighConfidence = confidence === 'High';
    return (
        <div className="bg-surface-dark rounded-lg p-4 border border-white/5 hover:border-primary/20 transition-all cursor-pointer">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                    <span className="text-xs text-white/40 font-mono">{time}</span>
                    <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/70">{league}</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className={`text-[10px] font-bold uppercase ${isHighConfidence ? 'text-primary' : 'text-yellow-600'}`}>
                        {confidence} Confidence
                    </span>
                    {isHighConfidence && <span className="material-symbols-outlined text-primary text-[14px]">verified</span>}
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2 flex-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="size-6 rounded-full bg-red-800 flex items-center justify-center text-[10px] font-bold">
                                {homeAbbr}
                            </div>
                            <span className="font-bold">{homeTeam}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="size-6 rounded-full bg-blue-700 flex items-center justify-center text-[10px] font-bold">
                                {awayAbbr}
                            </div>
                            <span className="font-bold">{awayTeam}</span>
                        </div>
                    </div>
                </div>
                {/* Prediction Score */}
                <div className="flex flex-col items-end pl-6 border-l border-white/10 ml-4">
                    <span className="text-[10px] uppercase text-white/40 mb-1">Projected</span>
                    <div className={`text-2xl font-bold font-mono tracking-tighter ${isHighConfidence ? 'text-primary neon-text' : 'text-white'}`}>
                        {prediction}
                    </div>
                    <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                        <div
                            className={`h-full ${isHighConfidence ? 'bg-primary shadow-[0_0_5px_rgba(242,204,13,0.5)]' : 'bg-yellow-600'}`}
                            style={{ width: `${probability}%` }}
                        ></div>
                    </div>
                    <span className={`text-[10px] mt-1 ${isHighConfidence ? 'text-primary' : 'text-yellow-600'}`}>
                        {probability}% Prob
                    </span>
                </div>
            </div>
        </div>
    );
}
