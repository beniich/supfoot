import Link from 'next/link';
import Image from 'next/image';

interface MatchCardProps {
    league: string;
    minute?: string;
    time?: string;
    homeTeam: string;
    awayTeam: string;
    homeScore?: number;
    awayScore?: number;
    homeLogo?: string;
    awayLogo?: string;
    isLive: boolean;
}

export default function MatchCard({
    league,
    minute,
    time,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    homeLogo,
    awayLogo,
    isLive,
}: MatchCardProps) {
    return (
        <Link href="/match-center" className="block">
            <div className="min-w-[280px] snap-center bg-surface-dark border border-white/5 rounded-2xl p-4 shadow-lg relative overflow-hidden group hover:border-primary/30 transition-all">
                {/* Live Badge or Time */}
                <div className="absolute top-0 right-0 p-3">
                    {isLive ? (
                        <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-full px-2 py-0.5">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Live</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2 py-0.5">
                            <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">{time}</span>
                        </div>
                    )}
                </div>

                {/* League & Minute */}
                <div className="text-xs text-white/40 font-medium mb-4 uppercase tracking-wide">
                    {league} {minute && `• ${minute}`}
                </div>

                {/* Match Score */}
                <div className="flex items-center justify-between mb-2">
                    {/* Home Team */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-12 h-12 rounded-full bg-white/10 p-2 flex items-center justify-center border border-white/5">
                            {homeLogo ? (
                                <Image
                                    src={homeLogo}
                                    alt={`${homeTeam} logo`}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-contain opacity-80"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-blue-900/50"></div>
                            )}
                        </div>
                        <span className="text-sm font-semibold text-center">{homeTeam}</span>
                    </div>

                    {/* Score or VS */}
                    <div className="flex flex-col items-center px-4">
                        {isLive && homeScore !== undefined && awayScore !== undefined ? (
                            <div className={`text-3xl font-bold tabular-nums tracking-tighter ${homeScore > awayScore ? 'text-primary' : 'text-white'}`}>
                                {homeScore} - {awayScore}
                            </div>
                        ) : (
                            <div className="text-xl font-medium text-white/30 tracking-tight">VS</div>
                        )}
                    </div>

                    {/* Away Team */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-12 h-12 rounded-full bg-white/10 p-2 flex items-center justify-center border border-white/5">
                            {awayLogo ? (
                                <Image
                                    src={awayLogo}
                                    alt={`${awayTeam} logo`}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-contain opacity-80"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-red-900/50"></div>
                            )}
                        </div>
                        <span className="text-sm font-semibold text-center">{awayTeam}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
