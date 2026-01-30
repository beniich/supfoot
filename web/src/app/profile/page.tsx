import BottomNav from '@/components/BottomNav';
import Link from 'next/link';

export default function ProfilePage() {
    return (
        <div className="min-h-screen pb-24 bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
            <main>
                {/* Header Profile */}
                <div className="pt-8 pb-6 text-center px-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
                    <div className="relative inline-block">
                        <div className="w-24 h-24 rounded-full bg-surface-dark border-4 border-surface-dark overflow-hidden relative mb-3">
                            <div className="w-full h-full bg-gray-700"></div>
                        </div>
                        <button className="absolute bottom-3 right-0 bg-primary text-black rounded-full p-1.5 shadow-lg border-2 border-background-dark">
                            <span className="material-symbols-outlined text-[16px] block">edit</span>
                        </button>
                    </div>
                    <h2 className="text-xl font-bold">Yassine Bounou</h2>
                    <p className="text-white/50 text-sm">@yassine_b1</p>

                    <div className="flex justify-center gap-4 mt-4">
                        <div className="text-center">
                            <span className="block font-bold text-lg">158</span>
                            <span className="text-xs text-white/50">Points</span>
                        </div>
                        <div className="w-px h-10 bg-white/10"></div>
                        <div className="text-center">
                            <span className="block font-bold text-lg">12</span>
                            <span className="text-xs text-white/50">Tickets</span>
                        </div>
                        <div className="w-px h-10 bg-white/10"></div>
                        <div className="text-center">
                            <span className="block font-bold text-lg">Gold</span>
                            <span className="text-xs text-white/50">Member</span>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="px-4 flex flex-col gap-2">
                    <ProfileMenuItem icon="person" label="Personal Details" />
                    <ProfileMenuItem icon="account_balance_wallet" label="Payment Methods" />
                    <ProfileMenuItem icon="notifications" label="Notifications" toggle />
                    <ProfileMenuItem icon="language" label="Language" value="English" />
                    <ProfileMenuItem icon="help" label="Help & Support" />
                    <ProfileMenuItem icon="logout" label="Log Out" danger />
                </div>
            </main>

            <BottomNav activeTab="profile" />
        </div>
    );
}

function ProfileMenuItem({ icon, label, value, toggle, danger }: { icon: string, label: string, value?: string, toggle?: boolean, danger?: boolean }) {
    return (
        <button className={`flex items-center justify-between p-4 bg-surface-dark border border-white/5 rounded-xl active:scale-[0.99] transition-transform ${danger ? 'text-red-500' : 'text-white'}`}>
            <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">{icon}</span>
                <span className="font-medium">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                {value && <span className="text-white/50 text-sm">{value}</span>}
                {toggle ? (
                    <div className="w-10 h-6 bg-primary rounded-full relative">
                        <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                ) : (
                    <span className="material-symbols-outlined text-white/30">chevron_right</span>
                )}
            </div>
        </button>
    )
}
