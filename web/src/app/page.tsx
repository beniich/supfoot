import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import MatchCard from '@/components/MatchCard';
import QuickAction from '@/components/QuickAction';
import NewsCard from '@/components/NewsCard';

export default function DashboardPage() {
    return (
        <div className="min-h-screen pb-24">
            {/* Top AppBar */}
            <header className="sticky top-0 z-40 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-black/5 dark:border-white/5 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Logo Icon */}
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-background-dark font-bold">
                        <span className="material-symbols-outlined text-[20px]">sports_soccer</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">
                        FootballHub<span className="text-primary">+</span>
                    </h1>
                </div>
                <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl">notifications</span>
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background-light dark:border-background-dark"></span>
                </button>
            </header>

            {/* Main Content */}
            <main className="flex flex-col w-full">
                {/* Live Matches Section */}
                <section className="mt-4">
                    <div className="px-4 mb-3 flex items-center justify-between">
                        <h2 className="text-lg font-bold">Live Matches</h2>
                        <Link href="/matches" className="text-sm text-primary font-medium hover:opacity-80">
                            See All
                        </Link>
                    </div>
                    <div className="flex overflow-x-auto no-scrollbar gap-4 px-4 pb-4 snap-x">
                        <MatchCard
                            league="Botola Pro"
                            minute="78'"
                            homeTeam="Raja CA"
                            awayTeam="Wydad AC"
                            homeScore={2}
                            awayScore={1}
                            homeLogo="https://lh3.googleusercontent.com/aida-public/AB6AXuCsCcxwHbA-W9401vq2sLt_-Mvut42eu_OHgxoHK_LkWYjgzWAB7PO15DZBpD3qSfmNIJrfHTmCC9E1nx2jGuBd1xCq8c82o1wreHscpuYaZE7V51CdgYVAG096WV1w0Z99g8WqI6xUmBJlL2kymB_4ZOpa82k17Q6weop4ynx81M6NpOA8T3Ag0d286VWEebUic6Nut9t-VluWhwS6oJ3GwZfhpPS73rB3a82InNQcCX7WnteyP_sHd22ZLOkK4ND2RDrFcDBXbWM"
                            awayLogo="https://lh3.googleusercontent.com/aida-public/AB6AXuD51OqMXHufEUdKwXCEFId94m_UCWrTgsvXjt-ytN9-7irMMRln233qKwqwLh2rvS52_CJD1yDZOf-1gdwWS-mgddrOuAcyKHeR_NZNFVAJjXla1RaaEZewfZA9kBGFYQGw9Pm9dy1UmSL8yvHEWpNGDQ4wMqybOcuB12FBqa79-L8x0Etsb_VPAviIi5hPstWb3Aeg72p1J6BhZzLcPpryUr-9YN9M9zNiqU3Sb5LOi2AlYZzoPJB9hWC22tW5qvWqLgpqGofcTMk"
                            isLive={true}
                        />
                        <MatchCard
                            league="Premier League"
                            minute="12'"
                            homeTeam="Man City"
                            awayTeam="Liverpool"
                            homeScore={0}
                            awayScore={0}
                            homeLogo="https://lh3.googleusercontent.com/aida-public/AB6AXuDFQla9FAUHcpxYdq0vrAVNSCubh6CyJTMXPtuLFf4xih_sOjvO8IZIWqVUsYkwaPSDg4EaRW9z38AITUzzGF60cKbmPMcX57Bok3aL49jjvUOyVBvdbDI_PsRVPuNLRvFPsEph4AIXl8AV49HRYhrT-Obj0H5EbLD8BCr69ceBNJIqnxo2kMjSYMgC8gVgzhnMz7_RbiGPMsLsZ1TFCfkh9_eFe25r04_z97dWjEEU-CTexsR0tlwsIR8t0DsQL5XwmmnVinqujj0"
                            awayLogo="https://lh3.googleusercontent.com/aida-public/AB6AXuAUW7PO_s-OaMo2JC6roYAbAtgHQ7T_eay60Iej5C21LbecMp8SwoWuy0rT-DFdWUnbPIem2ugNjYy884nZA-HlMgCqcf1cy0msG5djf9qkDp-L0mD07cmqQ8qDeB8rZN5wBYiWNoGKUQ8sL4_wwFJwejNM13LDyuGdClIkvuyl9qhZH6bf3nrh3kyxvzDoSniPBnyJUQIcXEesZK50fuxyl7krgDbsbNV1AFwmfEFDW2IFnPcAZPLD-l1kt7J9LWNYnT2mplgB5jE"
                            isLive={true}
                        />
                        <MatchCard
                            league="Serie A"
                            time="20:45"
                            homeTeam="Inter"
                            awayTeam="Milan"
                            isLive={false}
                        />
                    </div>
                </section>

                {/* Quick Actions Grid */}
                <section className="mt-2">
                    <h3 className="text-lg font-bold px-4 mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3 px-4">
                        <QuickAction icon="confirmation_number" label="Buy Tickets" href="/tickets" />
                        <QuickAction icon="shopping_bag" label="Shop Store" href="/shop" />
                        <QuickAction icon="emoji_events" label="Fantasy" href="/fantasy" />
                        <QuickAction icon="psychology" label="AI Tips" badge="Coming Soon" href="/ai-hub" />
                    </div>
                </section>

                {/* Featured News */}
                <section className="mt-6 mb-4">
                    <h3 className="text-lg font-bold px-4 mb-3">Trending News</h3>
                    <div className="flex flex-col gap-4 px-4">
                        <NewsCard
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDtkCxfhAnjRnWdFToMUXGnkMePw56xZxHgsZxadhNauHs3QfgMCwrjSamBpkEDdVTdhKYdy_QAcmwtDMViSmC1Z_dl9HMamQol8xsjveBkZ9ohesngAiEc-DXY9U9fbZLhgPkFGk1MtbZ0zbH6RU0ZCayAySltt8AV8DQNNGfcED6DRas__az9XpZ-GEbKlxyIMpauqOtrcHTbwBtkm3ymvY4NVD_VsXsrEb7PwY_4aa_lHIOMR4yVmGOIudII5jQ0SAyaDeF-EL4"
                            badge="Breaking"
                            time="2h ago"
                            title="Mbappé's Hat-trick Secures Historic Victory in Paris"
                            description="The French superstar continues his incredible form this season."
                        />
                        <NewsCard
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDRLpS2Ew-GRoN4aZZLPfkiR-JZzW1uMmGxmls6rVA6JgHmnAehEZ6wnqU-ulPSe7KEs8SZD53QHwOSOWJWZMgjNm8Y2qVnU0Xd7UhH3Ip39ZU3axagwAXO5uP2hu3xI9k4r_tRv2A6kostVKDqQTMioaOmFYdLCSxGhySR_Gv-TPwVGid7UNbgeaYsm9s8kfiAgFzhfmu10HcB3T8N45Akj69pYDal8MF-XfYe4BxIX_AtggtZSnXSGzadffNN6AHEJ2Jegi4qvAA"
                            badge="Transfer Market"
                            badgeVariant="secondary"
                            time="4h ago"
                            title="Summer Transfer Window: Top 10 Moves to Watch"
                        />
                    </div>
                </section>
            </main>

            <BottomNav activeTab="home" />
        </div>
    );
}
