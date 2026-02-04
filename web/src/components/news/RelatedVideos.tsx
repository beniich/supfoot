import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { apiClient } from '@/services/api';

interface Video {
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
    viewCount?: number;
    embedUrl: string;
}

export const RelatedVideos: React.FC<{ newsId: string }> = ({ newsId }) => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    useEffect(() => {
        fetchVideos();
    }, [newsId]);

    const fetchVideos = async () => {
        try {
            const response = await apiClient.get(`/youtube/news/${newsId}/related`);
            setVideos(response.data.videos);
        } catch (error) {
            console.error('Fetch videos error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading || videos.length === 0) return null;

    return (
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                🎥 Vidéos Associées
            </h3>

            {selectedVideo ? (
                <div className="mb-6">
                    <div className="aspect-video rounded-xl overflow-hidden bg-black">
                        <iframe
                            src={selectedVideo.embedUrl}
                            className="w-full h-full"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            title={selectedVideo.title}
                        />
                    </div>
                    <button
                        onClick={() => setSelectedVideo(null)}
                        className="mt-4 text-primary hover:underline font-medium"
                    >
                        ← Retour aux vidéos
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {videos.map((video) => (
                        <button
                            key={video.id}
                            onClick={() => setSelectedVideo(video)}
                            className="group relative aspect-video rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left"
                        >
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />

                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                                <Play size={48} className="text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                                <p className="text-white text-sm font-medium line-clamp-2 leading-snug">
                                    {video.title}
                                </p>
                                <p className="text-white/70 text-xs mt-1">
                                    {video.channelTitle}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
