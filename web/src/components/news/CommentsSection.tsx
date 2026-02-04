import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Reply } from 'lucide-react';
import { apiClient } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Comment {
    _id: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        avatar?: string;
    };
    content: string;
    createdAt: string;
    edited: boolean;
    likes: string[];
    replyCount?: number;
}

export const CommentsSection: React.FC<{ newsId: string }> = ({ newsId }) => {
    const { user, isAuthenticated } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [replyTo, setReplyTo] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchComments();
    }, [newsId, page]);

    const fetchComments = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(`/comments/news/${newsId}`, {
                params: { page, limit: 10 },
            });

            setComments(response.data.comments);
            setTotalPages(response.data.pagination.pages);
        } catch (error) {
            console.error('Fetch comments error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated) {
            alert('Veuillez vous connecter pour commenter');
            return;
        }

        if (!newComment.trim()) return;

        try {
            await apiClient.post('/comments', {
                newsId,
                content: newComment,
                parentCommentId: replyTo,
            });

            setNewComment('');
            setReplyTo(null);
            fetchComments();
        } catch (error) {
            console.error('Submit comment error:', error);
            alert('Une erreur est survenue');
        }
    };

    const handleLike = async (commentId: string) => {
        if (!isAuthenticated) {
            alert('Veuillez vous connecter pour liker');
            return;
        }

        try {
            await apiClient.post(`/comments/${commentId}/like`);
            fetchComments();
        } catch (error) {
            console.error('Like comment error:', error);
        }
    };

    return (
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <MessageSquare size={24} />
                Commentaires ({comments.length})
            </h3>

            {/* Comment Form */}
            {isAuthenticated ? (
                <form onSubmit={handleSubmit} className="mb-8">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Ajouter un commentaire..."
                        className="w-full p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none text-gray-900 dark:text-white"
                        rows={3}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                        {replyTo && (
                            <button
                                type="button"
                                onClick={() => setReplyTo(null)}
                                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            >
                                Annuler
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={!newComment.trim()}
                            className="px-6 py-2 bg-primary text-black rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
                        >
                            {replyTo ? 'Répondre' : 'Commenter'}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        <a href="/login" className="text-primary hover:underline">
                            Connectez-vous
                        </a>{' '}
                        pour commenter
                    </p>
                </div>
            )}

            {/* Comments List */}
            {loading ? (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                                    <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : comments.length > 0 ? (
                <>
                    <div className="space-y-6">
                        {comments.map((comment) => (
                            <CommentItem
                                key={comment._id}
                                comment={comment}
                                onReply={() => setReplyTo(comment._id)}
                                onLike={() => handleLike(comment._id)}
                                currentUserId={user?._id}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex justify-center gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50"
                            >
                                Précédent
                            </button>
                            <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
                                Page {page} / {totalPages}
                            </span>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50"
                            >
                                Suivant
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-12">
                    <MessageSquare size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                        Soyez le premier à commenter !
                    </p>
                </div>
            )}
        </div>
    );
};

const CommentItem: React.FC<{
    comment: Comment;
    onReply: () => void;
    onLike: () => void;
    currentUserId?: string;
}> = ({ comment, onReply, onLike, currentUserId }) => {
    const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
        addSuffix: true,
        locale: fr,
    });

    const isLiked = currentUserId && comment.likes.includes(currentUserId);

    return (
        <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">
                    {comment.user.firstName[0]}{comment.user.lastName[0]}
                </span>
            </div>

            {/* Content */}
            <div className="flex-1">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <span className="font-medium text-gray-900 dark:text-white">
                                {comment.user.firstName} {comment.user.lastName}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                {timeAgo}
                                {comment.edited && ' (modifié)'}
                            </span>
                        </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300">
                        {comment.content}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 mt-2 text-sm">
                    <button
                        onClick={onLike}
                        className={`flex items-center gap-1 ${isLiked ? 'text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                    >
                        <ThumbsUp size={14} className={isLiked ? 'fill-current' : ''} />
                        <span>{comment.likes.length}</span>
                    </button>

                    <button
                        onClick={onReply}
                        className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                        <Reply size={14} />
                        <span>Répondre</span>
                    </button>

                    {comment.replyCount && comment.replyCount > 0 && (
                        <span className="text-gray-500 dark:text-gray-500">
                            {comment.replyCount} réponse{comment.replyCount > 1 ? 's' : ''}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
