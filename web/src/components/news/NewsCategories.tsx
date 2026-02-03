// src/components/news/NewsCategories.tsx
import React from 'react';
import {
    TrendingUp, Heart, AlertCircle, Trophy,
    MessageSquare, Zap, Users
} from 'lucide-react';

interface NewsCategoriesProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const categories = [
    { id: 'all', label: 'Tout', icon: TrendingUp, color: 'text-primary' },
    { id: 'Transfers', label: 'Transferts', icon: Users, color: 'text-blue-500' },
    { id: 'Matches', label: 'Matchs', icon: Trophy, color: 'text-green-500' },
    { id: 'Injuries', label: 'Blessures', icon: AlertCircle, color: 'text-red-500' },
    { id: 'Interviews', label: 'Interviews', icon: MessageSquare, color: 'text-purple-500' },
    { id: 'Rumors', label: 'Rumeurs', icon: Zap, color: 'text-yellow-500' },
];

export const NewsCategories: React.FC<NewsCategoriesProps> = ({
    activeCategory,
    onCategoryChange,
}) => {
    return (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;

                return (
                    <button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${isActive
                                ? 'bg-primary text-black shadow-lg scale-105'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        <Icon size={18} className={!isActive ? category.color : ''} />
                        <span>{category.label}</span>
                    </button>
                );
            })}
        </div>
    );
};
