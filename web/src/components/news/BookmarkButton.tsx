import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import { apiClient } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

interface BookmarkButtonProps {
    newsId: string;
    onToggle?: (isBookmarked: boolean) => void;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ newsId, onToggle }) => {
    const { isAuthenticated } = useAuth();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            checkBookmark();
        }
    }, [newsId, isAuthenticated]);

    const checkBookmark = async () => {
        try {
            const response = await apiClient.get(`/bookmarks/check/${newsId}`);
            setIsBookmarked(response.data.isBookmarked);
        } catch (error) {
            console.error('Check bookmark error:', error);
        }
    };

    const toggleBookmark = async () => {
        if (!isAuthenticated) {
            alert('Veuillez vous connecter pour sauvegarder des articles');
            return;
        }

        try {
            setLoading(true);

            if (isBookmarked) {
                await apiClient.delete(`/bookmarks/${newsId}`);
                setIsBookmarked(false);
                onToggle?.(false);
            } else {
                await apiClient.post('/bookmarks', { newsId });
                setIsBookmarked(true);
                onToggle?.(true);
            }
        } catch (error) {
            console.error('Toggle bookmark error:', error);
            alert('Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={toggleBookmark}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isBookmarked
                    ? 'bg-primary text-black'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                } disabled:opacity-50`}
        >
            <Bookmark size={18} className={isBookmarked ? 'fill-current' : ''} />
            <span>{isBookmarked ? 'Enregistré' : 'Enregistrer'}</span>
        </button>
    );
};
