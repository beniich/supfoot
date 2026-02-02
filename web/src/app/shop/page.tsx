'use client';

import React from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function ShopPage() {
    const categories = [
        { id: 'jerseys', label: 'Jerseys', icon: 'checkroom' },
        { id: 'training', label: 'Training', icon: 'fitness_center' },
        { id: 'equipment', label: 'Equipment', icon: 'sports_soccer' },
        { id: 'accessories', label: 'Accessories', icon: 'local_mall' },
        { id: 'tickets', label: 'Tickets', icon: 'confirmation_number' },
    ];

    const products = [
        {
            id: 'national-jersey-home',
            name: 'National Team Home Jersey 2024',
            price: '799 MAD',
            rating: '4.9',
            reviews: '128',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH9-exm_S8PEJDBO-h6Ujn3vPKkzG0r52aGTDzqowHlUmAyNXmPUshTBZTz7QdJgm9223w_PmZKgwWFUxVnssg6FFwqpOJ9ED3CjoG1AAeak1kCdaFgqMTdlIgZROins3AbmB_Fuxn6GiHgqryJtcNHnXlZ7oDpWfonMyN0yHltiChXw9DmrTDzc8nMbYwszcjuonyVrQlGaVVUvoXRCM4gMUg7H6bJRS6ZXB8zslMvoi7I_vECNGarLtMKn9k0zlg7jz3ZjWeYvA',
            isFavorite: true
        },
        {
            id: 'pro-ball',
            name: 'Pro Match Official Ball',
            price: '1,200 MAD',
            rating: '5.0',
            reviews: '84',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPRhDGBF89Br4tPuAZqd-L805aknU75XS_YDMPxbR1Vt3V6sCgIqH1jKog_Nj9NqgjwNkMNs6yd58tOtBFD9dBu3Vk83HA0AZJpBIDvJJDDiblDQ9TwIPQeqPRg6kn1TEW_Ae-vcrZp9vGLlUkHA8c0rg8uWa8lt_mvuk_ID6ubNx7_-epbIj5sE_kp9g4qBBFft1eV6a2nxpCmUbeCF-VhROn5d-ouztbM7RVHscgHh9u5-sX9R3Rrj3aPBlUaLlyGZpAUiTBSno',
            isBestSeller: true
        },
        {
            id: 'training-top',
            name: 'Elite Training Drill Top',
            price: '450 MAD',
            rating: '4.7',
            reviews: '45',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA67FQfvOwSI6jnPF4TEW79kZgXzfxO2R7f88LXLwOBJNQsncB0Fc44XbqOAwnWauGcOSdd7Vx0LG_PUG-Jqk1GlYjbvg1lGEjc3CNSg3BX8sqF0wQR9Pw5RwergDDG8N0ojEM211KjzuXP2MFdVdE3gmQPENkwFiltFyohxUehmgiPbFDcHSsr3Pvtv8U-SQ0QCtMiMj96xF8IVY1h1JWGzkUKadkYDmqdQAN0q-SaBYoOlcPQi8MjWiUo3aCJjLOocsnFOuR0hqA'
        },
        {
            id: 'national-jersey-away',
            name: 'National Team Away Jersey',
            price: '799 MAD',
            oldPrice: '900 MAD',
            rating: '4.8',
            reviews: '210',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGapCnIUGF7PWdBNcYpLtg6VrZHBY_ADYCYVTkF9_20CKZjA1n2v-KIjxpyhb8JgX014Q94X99raYt1tkWCT07r6CvkD4PSWg24MTjpfOtZx1Jn--_SGXAqn_CN5akzYfOmAgEJTRg6TASz5-qBj_H4h9J9kW76Yj72P3_iE2d3kt3ceehab3130FL7PArm5YUjE9wszlMSQxhzz84ALszYQ9xbjLzimjoluQvcvAhaoh_r_TI_1seLjktrxE4Dyf3flTj0W3MxD0',
            isOnSale: true
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-white overflow-x-hidden selection:bg-primary selection:text-black">
            {/* Top Navigation */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/10">
                <div className="flex items-center p-4 pb-2 justify-between max-w-md mx-auto w-full">
                    <Link href="/" className="text-white flex size-10 shrink-0 items-center justify-center hover:bg-white/10 rounded-full transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back</span>
                    </Link>
                    <h2 className="text-white text-lg font-bold leading-tight tracking-tight">FootballHub+ Store</h2>
                    <div className="flex items-center gap-1">
                        <Link href="/shop/results" className="text-white flex size-10 shrink-0 items-center justify-center hover:bg-white/10 rounded-full transition-colors">
                            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>search</span>
                        </Link>
                        <div className="relative">
                            <Link href="/shop/cart" className="text-white flex size-10 shrink-0 items-center justify-center hover:bg-white/10 rounded-full transition-colors">
                                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>shopping_bag</span>
                            </Link>
                            <div className="absolute top-2 right-1 w-2.5 h-2.5 bg-primary rounded-full border border-background-dark"></div>
                        </div>
                    </div>

                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-md mx-auto pt-[70px] pb-32 px-4 space-y-6">
                {/* Hero Banner */}
                <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer mt-4">
                    <img alt="New Arrivals Jersey" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEpkFLww_HNWxfjmNBKXBqKJyBLV96Fwd7w3Z3zxCrRqK0NZzxEoivrJmNOP7BTRomNNqtc4WJxvJENnPAqYUrZ0PbtMHcgMCN4SwjhHb9f35uMT3LXz-R5Q8FyE2NlKOT5PdsDndaylZXZ7Qn9LoLcyE5NpEL8kjb1FIWJNrOtmuRhr3B8rzsAxg5LQ3pJ1gozzVMQ1zNMOsGO6X_LtYEYCMqg-isGrnPshURgk_Awh1mDXgBeM_xWHEz-bOusjZyf39L1_vGwoQ" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-5 w-full">
                        <div className="inline-block px-2 py-1 bg-primary text-black text-[10px] font-bold uppercase tracking-wider rounded mb-2">New Season</div>
                        <h1 className="text-2xl font-bold text-white mb-1">National Team Kit 2024</h1>
                        <p className="text-gray-300 text-sm font-body mb-3">Engineered for victory. Worn by legends.</p>
                        <div className="flex items-center text-primary font-bold text-sm">
                            Shop Collection <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold">Categories</h3>
                        <Link href="/shop/results" className="text-xs text-primary font-medium">See All</Link>
                    </div>
                    <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar -mx-4 px-4">
                        {categories.map((cat) => (
                            <Link href="/shop/results" key={cat.id} className="flex flex-col items-center gap-2 min-w-[72px] group">
                                <div className="w-16 h-16 rounded-2xl bg-surface-dark border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors shadow-lg">
                                    <span className={`material-symbols-outlined text-3xl ${cat.id === 'jerseys' ? 'text-primary' : 'text-gray-300'}`}>{cat.icon}</span>
                                </div>
                                <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{cat.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>


                {/* Featured Products */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold">Featured Products</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {products.map((product) => (
                            <div key={product.id} className="bg-surface-dark rounded-xl p-3 border border-white/5 hover:border-primary/30 transition-all group">
                                <Link href="/shop/product">
                                    <div className="relative aspect-[4/5] bg-background-dark rounded-lg overflow-hidden mb-3">
                                        <img alt={product.name} className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500`} src={product.image} />
                                        {product.isFavorite && (
                                            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm p-1.5 rounded-full">
                                                <span className="material-symbols-outlined text-white text-[16px] filled">favorite</span>
                                            </div>
                                        )}
                                        {product.isBestSeller && (
                                            <div className="absolute top-2 left-2 bg-primary text-black text-[10px] font-bold px-2 py-0.5 rounded">
                                                Best Seller
                                            </div>
                                        )}
                                        {product.isOnSale && (
                                            <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                                Sale
                                            </div>
                                        )}
                                    </div>
                                </Link>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1 text-primary text-[10px]">
                                        <span className="material-symbols-outlined text-[12px] filled">star</span>
                                        <span className="font-bold">{product.rating}</span>
                                        <span className="text-gray-500">({product.reviews})</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-white leading-tight min-h-[2.5rem] line-clamp-2">{product.name}</h4>
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex flex-col leading-none">
                                            {product.oldPrice && (
                                                <span className="text-gray-500 text-[10px] line-through decoration-red-500 decoration-1 mb-0.5">{product.oldPrice}</span>
                                            )}
                                            <span className="text-primary font-bold text-lg">{product.price}</span>
                                        </div>
                                        <button className="size-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary transition-colors shadow-lg active:scale-95">
                                            <span className="material-symbols-outlined text-lg">add</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <BottomNav activeTab="shop" />
        </div>
    );
}
