import BottomNav from '@/components/BottomNav';
import Image from 'next/image';

export default function CommunityPage() {
    return (
        <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto shadow-2xl overflow-hidden pb-20">
            {/* Top App Bar */}
            <header className="sticky top-0 z-50 flex items-center bg-background-dark/95 backdrop-blur-md px-4 py-3 justify-between border-b border-white/5">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-dark border border-white/10">
                    <span className="material-symbols-outlined text-white text-xl">menu</span>
                </div>
                <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">
                    Community Hub
                </h2>
                <div className="flex w-10 items-center justify-end">
                    <button className="flex items-center justify-center rounded-full w-10 h-10 bg-surface-dark border border-white/10 text-primary">
                        <span className="material-symbols-outlined text-xl">search</span>
                    </button>
                </div>
            </header>

            {/* Trending Forums Section */}
            <section className="mt-6">
                <div className="flex items-center justify-between px-5 mb-3">
                    <h3 className="text-white text-lg font-bold leading-tight">Trending Forums</h3>
                    <span className="text-xs font-medium text-primary cursor-pointer">View All</span>
                </div>
                <div className="flex w-full overflow-x-auto no-scrollbar px-5 py-2 gap-4">
                    {/* Forum Cards */}
                    <ForumCard
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuCbtvAuH_8DiZ6pnL20TnDtVeTuE7GDsNNHUH6OKALx56hefav5-e72-fOAUPKxgZrFZMwY8fTJTn2JAMcWJabrwx-JZg9Ilcc9Sf_wdIzei8HUyom6p3N628062AaDyvcNawfyhLolLFLee7hCq5F0NyAnf7teMjMmzBx8J2ViMcFsBKjksM1t3hIQkKUwYZZyMZ4taIz6l8UfyvnxFiHKafVFxOKuzRnJ5tedYZXt19pbK9oKs9gvHYmQyvK2E_Fq11e0TQumq78"
                        title="Botola Pro Race"
                        online="2.4k"
                        isHot
                    />
                    <ForumCard
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuBO4B9gQxTmviWPx37aaW5YIKYxD1_Y_vBNo8ptsAmNkpJU-IH0XuBxu5OUZEm1JXG-iohp6n3jskrBatqtDWGIc5KTtb9EdTduO0AbJEeTH_2Qy-YyZWTIqNSO040cn0lgtMEHysAe8-9r1-dm3uFYhfe_4SSCEqHGv3aTd-qB8bGZTMfJG4QSEsxL_abiJrRvBfurzY4TtupP0yHuPznyujw7sSJoAVCA5hHYncDfGQVcECEEsT6u0_Cy8ddANi7QYBZpvcP34Lc"
                        title="WC Qualifiers"
                        online="5k"
                    />
                    <ForumCard
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuBciPRYQmiYlxtvfyqPKUVqbHlTlyYrthb33giN2cANVg-r1yek3Zt9SOZwqXCXQz0mJYwaT73Lob75N3E3YzsY3YIUFHuO5JATGoImpJTrQZHPPElzQYWi6310dEuasg3syKVoD_YAh7Ph3-g8-BM4Ya1r_sMpoNrSrzCYJws3c2tYtcWs9I323fnpKMzPmQWp6-90Bq928gsWLzJKwrdAHBhxO8iBQhXys2GW_1h0BMyVYrTFGxcTVSAAG_PEBso3aChZBtM4v-0"
                        title="Fantasy League"
                        online="1.2k"
                    />
                </div>
            </section>

            {/* Active Fan Groups Section */}
            <section className="mt-8">
                <h3 className="text-white text-lg font-bold leading-tight px-5 mb-4">Active Fan Groups</h3>
                <div className="flex flex-col gap-1 px-3">
                    <FanGroupItem
                        logo="https://lh3.googleusercontent.com/aida-public/AB6AXuAgrsE4XHLTwiPHwsprUksZQXxu7qISGqLCG4Y5oPRWBwvzStz5iIPuDKwbxGYGtEubCllH97TgCzTDNqq3WcaYle_HH3Cl73IAKI9RhMycWL52xG3_fIzOiOFp9z2hg0bK13jbWSHCOjJaUirA86JCJFGPb3qawvisOb8NwYkmbBWnKNtOGqyRmu4hshs-kzpn18zTwUDLwstgCSh9rBRKuBdjAb6QxqtCaY6sqCXfYAosu_GJNbQLpHWSAuxPzmdJYHwpZGQeoyI"
                        name="Green Boys Hub"
                        team="Raja CA"
                        members="42k Ultras"
                        rank="#1"
                        buttonText="Join"
                        buttonVariant="primary"
                    />
                    <FanGroupItem
                        logo="https://lh3.googleusercontent.com/aida-public/AB6AXuBWRvgzKy1nog3D6GbXQM87Ov6jzOYMJT-eZWmfrkiNpnCCrMnO2nR0723h2f-_Yuww9TQYD9qATUpk-yDyuMe31DYfUOJPTDNDm8HFNaXaT6zl7xyszO3cksDKpN25B-rsX1pxOUX2EBccrwPfeH0_qquQceaUY3XCV94n5v7frbLJzARXAN9RViooa4y3yVYDdVyluG-sAorNZCWjMuYz3FIjCcPrZExjon9xZYFqHz_Rt8dGOhYxOmp8Kx8FC7SCR8xeC3p3cXY"
                        name="Winners 2005"
                        team="Wydad AC"
                        members="38k Members"
                        buttonText="View"
                        buttonVariant="secondary"
                    />
                </div>
            </section>

            {/* Global Fan Wall */}
            <section className="mt-8 mb-4">
                <div className="flex items-center justify-between px-5 mb-4 sticky top-[72px] z-30 py-2 bg-background-dark/95 backdrop-blur-sm">
                    <h3 className="text-white text-lg font-bold leading-tight">Global Fan Wall</h3>
                    <div className="flex gap-3 text-sm">
                        <span className="text-primary font-bold border-b-2 border-primary pb-0.5">Live</span>
                        <span className="text-gray-500 font-medium">Following</span>
                    </div>
                </div>
                <div className="flex flex-col gap-6 px-3 pb-6">
                    {/* Posts would go here */}
                    <div className="bg-surface-dark rounded-xl p-4 border border-white/5 text-center text-white/40">
                        <p>Posts loading...</p>
                    </div>
                </div>
            </section>

            <BottomNav activeTab="hub" />
        </div>
    );
}

function ForumCard({ image, title, online, isHot = false }: { image: string; title: string; online: string; isHot?: boolean }) {
    return (
        <div className="relative shrink-0 w-36 h-48 rounded-xl overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                <Image src={image} alt={title} fill className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3">
                {isHot && (
                    <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-bold bg-primary text-black rounded uppercase tracking-wider">
                        Hot
                    </span>
                )}
                <p className="text-white text-sm font-bold leading-tight">{title}</p>
                <p className="text-gray-300 text-[10px] mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {online} online
                </p>
            </div>
        </div>
    );
}

function FanGroupItem({
    logo,
    name,
    team,
    members,
    rank,
    buttonText,
    buttonVariant,
}: {
    logo: string;
    name: string;
    team: string;
    members: string;
    rank?: string;
    buttonText: string;
    buttonVariant: 'primary' | 'secondary';
}) {
    return (
        <div className="flex items-center gap-4 bg-surface-dark/50 p-3 rounded-xl border border-white/5 active:scale-[0.98] transition-transform">
            <div className="shrink-0 relative">
                <div className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 border-2 border-primary/20 relative">
                    <Image src={logo} alt={name} fill className="object-cover rounded-full" />
                </div>
                {rank && (
                    <div className="absolute -bottom-1 -right-1 bg-primary text-black text-[10px] font-bold px-1.5 rounded-full border border-background-dark">
                        {rank}
                    </div>
                )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
                <p className="text-white text-sm font-bold truncate">{name}</p>
                <p className="text-gray-400 text-xs truncate">
                    {team} • {members}
                </p>
            </div>
            <button
                className={`shrink-0 text-xs font-bold px-4 py-2 rounded-lg transition-colors ${buttonVariant === 'primary'
                        ? 'bg-primary hover:bg-primary/90 text-black'
                        : 'bg-surface-highlight hover:bg-white/10 text-white border border-white/10'
                    }`}
            >
                {buttonText}
            </button>
        </div>
    );
}
