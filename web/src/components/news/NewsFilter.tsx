// src/components/news/NewsFilter.tsx
import React from 'react';
import { Filter } from 'lucide-react';

export const NewsFilter = () => {
    return (
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-gray-700">
            <Filter size={18} />
            <span>Filtres</span>
        </button>
    );
};
