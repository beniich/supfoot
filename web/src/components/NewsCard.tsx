import Image from 'next/image';

interface NewsCardProps {
    image: string;
    badge: string;
    badgeVariant?: 'primary' | 'secondary';
    time: string;
    title: string;
    description?: string;
}

export default function NewsCard({
    image,
    badge,
    badgeVariant = 'primary',
    time,
    title,
    description,
}: NewsCardProps) {
    return (
        <article className="relative h-56 w-full rounded-2xl overflow-hidden group cursor-pointer">
            {/* Background Image */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-4 w-full">
                <div className="flex items-center gap-2 mb-2">
                    {badgeVariant === 'primary' ? (
                        <span className="bg-primary text-background-dark text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                            {badge}
                        </span>
                    ) : (
                        <span className="bg-white/10 text-white border border-white/20 text-[10px] font-bold px-2 py-0.5 rounded uppercase backdrop-blur-sm">
                            {badge}
                        </span>
                    )}
                    <span className="text-xs text-gray-300">{time}</span>
                </div>
                <h4 className="text-xl font-bold leading-tight text-white mb-1">{title}</h4>
                {description && (
                    <p className="text-sm text-gray-300 line-clamp-1">{description}</p>
                )}
            </div>
        </article>
    );
}
