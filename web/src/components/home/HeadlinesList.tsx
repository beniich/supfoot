// src/components/home/HeadlinesList.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ChevronRight } from 'lucide-react';

const headlines = [
    {
        id: 1,
        category: 'Live Updates',
        title: 'Road to Budapest: Full bracket for the 2024 final revealed',
        time: '2h ago',
        image: 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?w=200&q=80'
    },
    {
        id: 2,
        category: 'Transfer News',
        title: 'Exclusive: Why Mbappe chose the biggest stage for his return',
        time: '5h ago',
        image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=200&q=80'
    }
];

export default function HeadlinesList() {
    return (
        <section className="px-4 py-4 bg-background-light dark:bg-ucl-midnight pb-24">
            <div className="flex justify-between items-end mb-4">
                <h3 className="text-2xl font-bold dark:text-white">Headlines</h3>
                <Link href="/news" className="text-ucl-accent text-xs font-bold uppercase flex items-center gap-1 hover:gap-2 transition-all">
                    View All <ChevronRight size={14} />
                </Link>
            </div>

            <div className="space-y-4">
                {headlines.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-white dark:bg-white/5 p-3 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800 relative">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div className="flex flex-col justify-center flex-1">
                            <span className="text-ucl-accent text-[10px] font-bold uppercase mb-1.5 tracking-wider">
                                {item.category}
                            </span>
                            <h4 className="font-bold text-sm leading-snug dark:text-white mb-2 line-clamp-2">
                                {item.title}
                            </h4>
                            <div className="flex items-center text-[10px] text-gray-500 dark:text-white/40 font-medium">
                                <Clock size={12} className="mr-1" /> {item.time}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
