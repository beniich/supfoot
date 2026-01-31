'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            router.push('/');
        } catch (err) {
            const error = err as { response?: { data?: { message?: string } } };
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-hidden font-sans selection:bg-primary selection:text-black">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle at 50% 0%, #4a4525 0%, transparent 70%)' }}></div>

            {/* Main Content Container */}
            <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-12 w-full max-w-md mx-auto h-full">

                {/* Header Section */}
                <div className="flex flex-col items-center justify-center mb-10">
                    <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 border border-primary/20 backdrop-blur-xl shadow-glow transition-transform hover:scale-110 duration-500">
                        <span className="material-symbols-outlined text-5xl text-primary neon-text filled">sports_soccer</span>
                    </div>
                    <h1 className="text-white tracking-tighter text-[42px] font-black leading-none text-center uppercase italic">
                        Welcome <br /><span className="text-primary neon-text">Back Pro</span>
                    </h1>
                    <p className="text-[#bab59c] text-[10px] font-black uppercase tracking-[0.2em] pt-4 text-center max-w-xs opacity-60">
                        Sign in to access premium stats and exclusive insights.
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleLogin} className="w-full space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest p-4 rounded-xl text-center shadow-inner animate-pulse">
                            {error}
                        </div>
                    )}

                    <div className="group">
                        <label className="block text-[10px] font-black text-[#bab59c] mb-2 uppercase tracking-[0.2em] ml-1 opacity-60">Email Address</label>
                        <div className="relative">
                            <input
                                className="block w-full rounded-2xl border border-white/5 bg-white/5 py-5 pl-12 pr-4 text-white placeholder-white/10 focus:border-primary focus:bg-white/10 focus:ring-0 transition-all font-bold tracking-widest text-sm shadow-xl"
                                placeholder="user@example.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                                <span className="material-symbols-outlined text-white/20 transition-colors group-focus-within:text-primary">mail</span>
                            </div>
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-[10px] font-black text-[#bab59c] mb-2 uppercase tracking-[0.2em] ml-1 opacity-60">Password</label>
                        <div className="relative">
                            <input
                                className="block w-full rounded-2xl border border-white/5 bg-white/5 py-5 pl-12 pr-4 text-white placeholder-white/10 focus:border-primary focus:bg-white/10 focus:ring-0 transition-all font-bold tracking-widest text-sm shadow-xl"
                                placeholder="••••••••"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                                <span className="material-symbols-outlined text-white/20 transition-colors group-focus-within:text-primary">lock</span>
                            </div>
                        </div>
                        <div className="flex justify-end pt-3">
                            <Link href="#" className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline italic">Forgot Password?</Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-16 bg-primary hover:scale-[1.02] active:scale-[0.98] text-background-dark font-black text-xl rounded-2xl shadow-glow transition-all flex items-center justify-center uppercase tracking-tighter italic disabled:opacity-50 mt-4"
                    >
                        {loading ? 'Authenticating...' : 'Sign In Now'}
                    </button>

                    {/* Divider */}
                    <div className="relative flex py-4 items-center">
                        <div className="flex-grow border-t border-white/5"></div>
                        <span className="flex-shrink-0 mx-6 text-white/20 text-[9px] font-black uppercase tracking-[0.3em]">Or secure access</span>
                        <div className="flex-grow border-t border-white/5"></div>
                    </div>

                    {/* Biometric Login */}
                    <div className="grid grid-cols-2 gap-4">
                        <button type="button" className="flex items-center justify-center gap-3 rounded-2xl border border-white/5 bg-white/5 py-4 text-white hover:bg-white/10 transition-all active:scale-95 group">
                            <span className="material-symbols-outlined text-2xl group-hover:text-primary transition-colors">face</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">Face ID</span>
                        </button>
                        <button type="button" className="flex items-center justify-center gap-3 rounded-2xl border border-white/5 bg-white/5 py-4 text-white hover:bg-white/10 transition-all active:scale-95 group">
                            <span className="material-symbols-outlined text-2xl group-hover:text-primary transition-colors">fingerprint</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">Touch ID</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Footer */}
            <div className="relative z-10 w-full py-8 text-center border-t border-white/5 bg-background-dark/50 backdrop-blur-xl">
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.1em]">
                    New to FootballHub+?
                    <Link href="/register" className="text-primary font-black hover:underline ml-2 italic">Create an account</Link>
                </p>
            </div>

            {/* Decorative Bottom Image */}
            <div className="absolute bottom-0 left-0 right-0 h-1/4 z-0 overflow-hidden opacity-5 pointer-events-none grayscale">
                <div className="w-full h-full bg-cover bg-bottom" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000&auto=format&fit=crop')", maskImage: 'linear-gradient(to top, black, transparent)' }}></div>
            </div>
        </div>
    );
}
