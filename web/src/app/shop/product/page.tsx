'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductDetailPage() {
    const [selectedSize, setSelectedSize] = useState('MD');
    const [selectedColor, setSelectedColor] = useState('red');
    const [isFavorite, setIsFavorite] = useState(false);

    const sizes = ['SM', 'MD', 'LG', 'XL', '2XL'];
    const colors = [
        { id: 'red', class: 'bg-red-600' },
        { id: 'white', class: 'bg-white' },
        { id: 'black', class: 'bg-black' }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-white selection:bg-primary selection:text-black">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/10">
                <div className="flex items-center p-4 justify-between max-w-md mx-auto w-full">
                    <Link href="/shop" className="text-white flex size-10 items-center justify-center hover:bg-white/10 rounded-full transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="text-lg font-bold">Shop</h1>
                    <div className="relative size-10 flex items-center justify-center">
                        <span className="material-symbols-outlined">shopping_bag</span>
                        <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-black text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background-dark">1</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-md mx-auto pt-[72px] pb-[100px] px-6">
                {/* Product Image Section */}
                <div className="relative mb-6">
                    <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-surface-dark border border-white/5 shadow-2xl group">
                        <Image
                            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000&auto=format&fit=crop"
                            alt="National Team Jersey"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/50 transition-all"
                        >
                            <span className={`material-symbols-outlined text-2xl ${isFavorite ? 'filled text-red-500' : 'text-white'}`}>
                                favorite
                            </span>
                        </button>
                    </div>
                    {/* Carousel Indicators */}
                    <div className="flex justify-center gap-2 mt-4">
                        <div className="w-6 h-1.5 rounded-full bg-primary"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="mb-8">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-2xl font-bold leading-tight flex-1 mr-4">National Team Home Jersey 2024</h2>
                        <div className="flex flex-col items-end">
                            <span className="text-2xl font-bold text-primary">799 MAD</span>
                            <span className="text-sm text-gray-500 line-through">950 MAD</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="material-symbols-outlined text-sm filled text-primary">star</span>
                        ))}
                        <span className="text-xs text-gray-500 ml-2">(128 Reviews)</span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Engineered for performance on the biggest stage. This authentic jersey features moisture-wicking technology and the iconic national crest in gold.
                    </p>
                </div>

                {/* Size Selection */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider">Select Size</h3>
                        <button className="text-xs text-primary font-medium hover:underline">Size Guide</button>
                    </div>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`min-w-[56px] h-12 rounded-xl flex items-center justify-center font-bold transition-all border ${selectedSize === size
                                    ? 'bg-primary text-black border-primary shadow-glow'
                                    : 'bg-surface-dark border-white/5 text-gray-400 hover:border-primary/50'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Color Selection */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Color</h3>
                    <div className="flex gap-4">
                        {colors.map((color) => (
                            <button
                                key={color.id}
                                onClick={() => setSelectedColor(color.id)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all p-0.5 border-2 ${selectedColor === color.id ? 'border-primary' : 'border-transparent'
                                    }`}
                            >
                                <div className={`w-full h-full rounded-full border border-white/10 ${color.class}`}></div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Accordions */}
                <div className="space-y-4 border-t border-white/5 pt-6">
                    {['Product Details', 'Reviews', 'Shipping & Returns'].map((item) => (
                        <button key={item} className="w-full flex justify-between items-center py-2 group">
                            <span className="font-bold text-gray-300 group-hover:text-white transition-colors">{item}</span>
                            <span className="material-symbols-outlined text-gray-500 group-hover:text-white transition-colors">expand_more</span>
                        </button>
                    ))}
                </div>
            </main>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-dark via-background-dark to-transparent z-50 max-w-md mx-auto">
                <div className="bg-surface-dark/90 backdrop-blur-xl border border-white/10 p-4 rounded-[2rem] flex items-center justify-between shadow-2xl">
                    <div className="flex flex-col pl-2">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total Price</span>
                        <span className="text-xl font-bold">799 MAD</span>
                    </div>
                    <button className="bg-primary text-black font-bold h-14 px-8 rounded-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-glow">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
