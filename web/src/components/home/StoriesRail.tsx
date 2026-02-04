// src/components/home/StoriesRail.tsx
import Image from 'next/image';

const stories = [
    { id: 1, title: 'Goal of the Phase ⚽', image: 'https://images.unsplash.com/photo-1543326727-2a9ae637eb89?w=150&q=80', isSeen: false },
    { id: 2, title: 'MD8 in numbers 📊', image: 'https://images.unsplash.com/photo-1550953683-146312c3f7ce?w=150&q=80', isSeen: false },
    { id: 3, title: 'KOPO Draw ⚽', image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=150&q=80', isSeen: true },
    { id: 4, title: 'MD8 Unpacked 📈', image: 'https://images.unsplash.com/photo-1628891436181-e23f9b28a8d1?w=150&q=80', isSeen: false },
    { id: 5, title: 'Round of 16 💪', image: 'https://images.unsplash.com/photo-1434648957308-5e6a859697e8?w=150&q=80', isSeen: false },
];

export default function StoriesRail() {
    return (
        <section className="bg-ucl-midnight/95 py-6 px-4 border-b border-white/5">
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
                {stories.map((story) => (
                    <div key={story.id} className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer group">
                        <div className={`p-[2px] rounded-full ${story.isSeen ? 'bg-slate-700' : 'bg-gradient-to-tr from-ucl-accent via-ucl-blue to-ucl-accent'}`}>
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-800 border-2 border-ucl-midnight group-hover:scale-105 transition-transform">
                                <Image
                                    src={story.image}
                                    alt={story.title}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <span className="text-[10px] text-center font-bold text-white uppercase leading-tight">
                            {story.title}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
