import React from 'react';
import { Clock, Eye, ChevronRight, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

interface NewsCardProps {
    article: {
        _id: string;
        title: string;
        excerpt: string;
        image: string;
        author: string;
        publishedAt: string;
        category: string;
        views: number;
        league?: {
            name: string;
            logo: string;
        };
    };
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            Transfers: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
            Injuries: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
            Matches: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
            Interviews: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
            Rumors: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
            General: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
        };
        return colors[category] || colors.General;
    };

    const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
        addSuffix: true,
        locale: fr,
    });

    return (
        <article className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={article.image || 'https://via.placeholder.com/400x300/1A1915/F9D406?text=FootballHub+'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(article.category)}`}>
                        {article.category}
                    </span>
                </div>

                {/* League Badge */}
                {article.league && (
                    <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                        {article.league.logo && (
                            <img
                                src={article.league.logo}
                                alt={article.league.name}
                                className="w-5 h-5 object-contain"
                            />
                        )}
                        <span className="text-xs font-medium text-gray-900 dark:text-white">
                            {article.league.name}
                        </span>
                    </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{timeAgo}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{article.views.toLocaleString()} vues</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {article.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        Par {article.author}
                    </span>

                    <Link
                        href={`/news/${article._id}`}
                        className="flex items-center gap-1 text-primary hover:gap-2 transition-all text-sm font-medium"
                    >
                        Lire plus
                        <ChevronRight size={16} />
                    </Link>
                </div>
            </div>
        </article>
    );
};
