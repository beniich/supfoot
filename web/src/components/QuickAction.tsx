import Link from 'next/link';

interface QuickActionProps {
    icon: string;
    label: string;
    badge?: string;
    href: string;
}

export default function QuickAction({ icon, label, badge, href }: QuickActionProps) {
    return (
        <Link href={href}>
            <button className="relative flex flex-col justify-between p-4 h-32 rounded-2xl bg-surface-dark border border-white/5 hover:border-primary/50 active:scale-95 transition-all group overflow-hidden w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
                <div className="text-left z-10">
                    <span className="block text-base font-bold leading-tight">{label}</span>
                    {badge && (
                        <span className="text-[10px] text-primary/70 font-medium">{badge}</span>
                    )}
                </div>
            </button>
        </Link>
    );
}
