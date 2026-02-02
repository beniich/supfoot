'use client';

import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';

export default function ShopPage() {
    const { addItem, getTotalItems } = useCartStore();
    const router = useRouter();

    const categories = [
        { id: 'jerseys', label: 'Jerseys', icon: 'checkroom' },
        { id: 'training', label: 'Training', icon: 'fitness_center' },
        { id: 'equipment', label: 'Equipment', icon: 'sports_soccer' },
        { id: 'accessories', label: 'Accessories', icon: 'local_mall' },
        { id: 'tickets', label: 'Tickets', icon: 'confirmation_number' },
    ];

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShopProducts = async () => {
            try {
                const res = await api.get('/products'); // Fetch all products
                const data = Array.isArray(res.data) ? res.data : (res.data.products || []);
                setProducts(data);
            } catch (err) {
                console.error("Failed to fetch shop products", err);
            } finally {
                setLoading(false);
            }
        };
        fetchShopProducts();
    }, []);

    const cartCount = getTotalItems();

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
                            {cartCount > 0 && (
                                <div className="absolute top-2 right-1 w-2.5 h-2.5 bg-primary rounded-full border border-background-dark"></div>
                            )}
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
                        {loading ? <div className="col-span-2 text-center py-10 text-gray-500">Loading store...</div> : products.map((product) => (
                            <div key={product._id || product.id} className="bg-surface-dark rounded-xl p-3 border border-white/5 hover:border-primary/30 transition-all group">
                                <Link href="/shop/product">
                                    <div className="relative aspect-[4/5] bg-background-dark rounded-lg overflow-hidden mb-3">
                                        <img alt={product.name} className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500`} src={product.image || 'https://via.placeholder.com/300'} />
                                        {/* Optional badges based on data */}
                                        {product.isFeatured && (
                                            <div className="absolute top-2 right-2 bg-primary text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">Hot</div>
                                        )}
                                    </div>
                                </Link>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1 text-primary text-[10px]">
                                        <span className="material-symbols-outlined text-[12px] filled">star</span>
                                        <span className="font-bold">4.8</span>
                                        <span className="text-gray-500">(12)</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-white leading-tight min-h-[2.5rem] line-clamp-2">{product.name}</h4>
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex flex-col leading-none">
                                            <span className="text-primary font-bold text-lg">{product.price} <span className="text-[10px] font-normal text-gray-400">MAD</span></span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                addItem({
                                                    _id: product._id,
                                                    name: product.name,
                                                    price: product.price,
                                                    image: product.image || 'https://via.placeholder.com/300'
                                                });
                                                router.push('/shop/cart');
                                            }}
                                            className="size-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary transition-colors shadow-lg active:scale-95"
                                        >
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
