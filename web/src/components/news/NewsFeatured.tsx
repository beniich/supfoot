import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface NewsFeaturedProps {
    news: Array<{
        _id: string;
        title: string;
        excerpt: string;
        image: string;
        category: string;
        publishedAt: string;
    }>;
}

export const NewsFeatured: React.FC<NewsFeaturedProps> = ({ news }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!news || news.length === 0) return null;

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % news.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
    };

    const currentArticle = news[currentIndex];

    return (
        <div className="relative h-[500px] rounded-2xl overflow-hidden group">
            {/* Background Image */}
            <img
                src={currentArticle.image || 'https://via.placeholder.com/1200x500'}
                alt={currentArticle.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                {/* Category Badge */}
                <div className="mb-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-full text-sm font-bold">
                        <TrendingUp size={16} />
                        {currentArticle.category}
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
                    {currentArticle.title}
                </h2>

                {/* Excerpt */}
                <p className="text-white/90 text-lg mb-6 max-w-2xl line-clamp-2">
                    {currentArticle.excerpt}
                </p>

                {/* Meta & CTA */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/80">
                        <Clock size={16} />
                        <span className="text-sm">
                            {format(new Date(currentArticle.publishedAt), 'PPP', { locale: fr })}
                        </span>
                    </div>

                    <Link
                        href={`/news/${currentArticle._id}`}
                        className="px-6 py-3 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl transition-colors"
                    >
                        Lire l'article
                    </Link>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {news.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all ${index === currentIndex
                                ? 'w-8 bg-primary'
                                : 'w-2 bg-white/50 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
