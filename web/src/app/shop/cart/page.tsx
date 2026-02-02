'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
    const [cartItems, setCartItems] = useState([
        {
            id: '1',
            name: 'National Team Home Jersey 2024',
            price: 799,
            size: 'MD',
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000'
        },
        {
            id: '2',
            name: 'Pro Official Match Ball',
            price: 450,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1614632546411-305616e92d33?q=80&w=2000'
        }
    ]);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 50;
    const total = subtotal + shipping;

    const [isCheckout, setIsCheckout] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');


    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#0a0a0b] text-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-4xl opacity-50">shopping_bag</span>
                </div>
                <h2 className="text-xl font-bold mb-2">Your Cart is Empty</h2>
                <p className="text-gray-400 mb-6 max-w-xs">Looks like you haven&apos;t added any gear yet. Check out our latest collection.</p>
                <Link href="/shop" className="bg-primary text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white font-display pb-32">

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0b]/80 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center p-4 justify-between max-w-md mx-auto w-full">
                    {isCheckout ? (
                        <button onClick={() => setIsCheckout(false)} className="text-white flex size-10 items-center justify-center hover:bg-white/10 rounded-full transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                    ) : (
                        <Link href="/shop" className="text-white flex size-10 items-center justify-center hover:bg-white/10 rounded-full transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                    )}
                    <h1 className="text-lg font-bold">{isCheckout ? 'Checkout' : 'My Cart'} <span className="text-gray-500">({cartItems.length})</span></h1>
                    <div className="w-10"></div>
                </div>
            </header>

            <main className="max-w-md mx-auto pt-20 px-4">
                {!isCheckout ? (
                    // CART VIEW
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-[#121214] border border-white/5 rounded-2xl p-3 flex gap-4 items-center">
                                <div className="relative w-24 h-24 bg-white/5 rounded-xl overflow-hidden shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-sm leading-tight truncate pr-4">{item.name}</h3>
                                        <button className="text-gray-500 hover:text-red-500">
                                            <span className="material-symbols-outlined text-[18px]">close</span>
                                        </button>
                                    </div>
                                    {item.size && <span className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded mr-2">Size: {item.size}</span>}
                                    <div className="flex justify-between items-end mt-3">
                                        <span className="font-bold text-primary">{item.price} MAD</span>
                                        <div className="flex items-center gap-3 bg-black rounded-lg px-2 py-1">
                                            <button className="text-gray-400 hover:text-white">-</button>
                                            <span className="text-sm font-bold min-w-[1ch] text-center">{item.quantity}</span>
                                            <button className="text-gray-400 hover:text-white">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // CHECKOUT VIEW
                    <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">

                        {/* Shipping Address */}
                        <section className="bg-[#121214] border border-white/5 rounded-2xl p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">location_on</span>
                                    Shipping Address
                                </h3>
                                <button className="text-xs text-primary font-bold uppercase tracking-wider">Edit</button>
                            </div>
                            <div className="pl-8 text-sm text-gray-400 space-y-1">
                                <p className="text-white font-bold">John Doe</p>
                                <p>123 Football Avenu</p>
                                <p>Casablanca, 20000</p>
                                <p>Morocco</p>
                            </div>
                        </section>

                        {/* Payment Method */}
                        <section className="bg-[#121214] border border-white/5 rounded-2xl p-4">
                            <h3 className="font-bold flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-primary">payments</span>
                                Payment Method
                            </h3>

                            <div className="space-y-3">
                                {/* Credit Card (Stripe) */}
                                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'card' ? 'bg-primary/10 border-primary' : 'bg-black/20 border-white/5 hover:border-white/20'}`}>
                                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-primary w-5 h-5" />
                                    <div className="flex-1 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined">credit_card</span>
                                            <span className="font-bold text-sm">Credit Card</span>
                                        </div>
                                        <div className="flex gap-1 opacity-50">
                                            <div className="w-8 h-5 bg-white rounded"></div>
                                            <div className="w-8 h-5 bg-white rounded"></div>
                                        </div>
                                    </div>
                                </label>

                                {/* PayPal */}
                                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'bg-blue-500/10 border-blue-500' : 'bg-black/20 border-white/5 hover:border-white/20'}`}>
                                    <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="accent-blue-500 w-5 h-5" />
                                    <div className="flex-1 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm">PayPal</span>
                                        </div>
                                        <span className="material-symbols-outlined text-blue-400">account_balance_wallet</span>
                                    </div>
                                </label>

                                {/* Apple Pay / Google Pay */}
                                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'wallet' ? 'bg-white/10 border-white' : 'bg-black/20 border-white/5 hover:border-white/20'}`}>
                                    <input type="radio" name="payment" value="wallet" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} className="accent-white w-5 h-5" />
                                    <div className="flex-1 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm">Apple Pay</span>
                                        </div>
                                        <span className="material-symbols-outlined">phone_iphone</span>
                                    </div>
                                </label>
                            </div>
                        </section>
                    </div>
                )}
            </main>

            {/* Bottom Summary Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0b] border-t border-white/10 p-6 pb-8 z-50">
                <div className="max-w-md mx-auto space-y-4">
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-400">
                            <span>Subtotal</span>
                            <span>{subtotal} MAD</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>Shipping</span>
                            <span>{shipping} MAD</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/10">
                            <span>Total</span>
                            <span>{total} MAD</span>
                        </div>
                    </div>

                    {!isCheckout ? (
                        <button onClick={() => setIsCheckout(true)} className="w-full bg-primary text-black font-black uppercase tracking-wider py-4 rounded-xl shadow-glow hover:scale-[1.02] active:scale-95 transition-all text-sm">
                            Proceed to Checkout
                        </button>
                    ) : (
                        <button className="w-full bg-primary text-black font-black uppercase tracking-wider py-4 rounded-xl shadow-glow hover:scale-[1.02] active:scale-95 transition-all text-sm flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined">lock</span>
                            Pay {total} MAD Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
