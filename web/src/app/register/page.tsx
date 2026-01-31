'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

export default function RegisterPage() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [agreed, setAgreed] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreed) return;
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/register', {
                email,
                password,
                firstName,
                lastName
            });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            router.push('/onboarding');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-sans antialiased text-slate-900 dark:text-white transition-colors duration-200 selection:bg-primary selection:text-black">
            <div className="relative z-10 flex min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto">
                {/* Header */}
                <div className="flex items-center p-4 justify-between sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md">
                    <Link href="/login" className="flex size-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95 shadow-lg">
                        <span className="material-symbols-outlined text-slate-900 dark:text-white" style={{ fontSize: '24px' }}>arrow_back</span>
                    </Link>
                    <Link href="/login" className="text-gray-500 dark:text-[#bab59c] text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">Log in</Link>
                </div>

                {/* Main Content */}
                <main className="flex-1 flex flex-col px-6 pb-12 pt-4">
                    {/* Headline */}
                    <div className="mb-8">
                        <h1 className="text-slate-900 dark:text-white tracking-tighter text-[40px] font-black leading-none mb-3 uppercase italic">
                            Join the <br /><span className="text-primary neon-text">Elite Club</span>
                        </h1>
                        <p className="text-gray-500 dark:text-[#bab59c] text-sm font-bold uppercase tracking-tight max-w-[80%]">Unlock premium stats, elite training content, and join a community of pros.</p>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <SocialButton provider="Apple" icon={<path d="M17.5 12.6c0-2.3 1.9-3.4 2-3.4-.9-1.3-2.3-1.5-2.8-1.5-1.2-.1-2.3.7-2.9.7-.6 0-1.5-.7-2.5-.7-1.3 0-2.5.8-3.1 1.9-1.3 2.3-.3 5.7 1 7.6.6 1 1.4 2 2.3 2 .9 0 1.3-.6 2.4-.6 1.1 0 1.5.6 2.4.6.9 0 1.5-.8 2.1-1.8.7-1 1-2.4 1-2.4-.1 0-1.9-.7-1.9-2.4zM15 5.5c.5-.7.9-1.6.8-2.5-.8 0-1.7.4-2.2 1-.5.6-.9 1.5-.8 2.4.8.1 1.7-.3 2.2-.9z" fill="currentColor" />} />
                        <SocialButton provider="Google" icon={<><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></>} isSVG />
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-[1px] flex-1 bg-slate-200 dark:bg-[#393628]"></div>
                        <span className="text-gray-500 dark:text-[#bab59c] text-[10px] font-black uppercase tracking-[0.2em]">or via email</span>
                        <div className="h-[1px] flex-1 bg-slate-200 dark:bg-[#393628]"></div>
                    </div>

                    {/* Email Form */}
                    <form onSubmit={handleRegister} className="space-y-6 flex-1">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest p-4 rounded-xl text-center shadow-inner">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <InputGroup label="First Name" icon="person" placeholder="Yassine" value={firstName} onChange={setFirstName} />
                            <InputGroup label="Last Name" icon="person" placeholder="Bounou" value={lastName} onChange={setLastName} />
                        </div>

                        <InputGroup label="Email Address" icon="mail" type="email" placeholder="coach@footballhub.com" value={email} onChange={setEmail} />
                        <InputGroup label="Password" icon="lock" type="password" placeholder="••••••••" value={password} onChange={setPassword} showPasswordToggle />

                        <div className="flex items-start gap-4 pt-2">
                            <button
                                type="button"
                                onClick={() => setAgreed(!agreed)}
                                className={`flex-shrink-0 size-6 rounded-lg border-2 flex items-center justify-center transition-all ${agreed ? 'bg-primary border-primary shadow-glow-sm' : 'bg-transparent border-gray-300 dark:border-white/10'}`}
                            >
                                {agreed && <span className="material-symbols-outlined text-background-dark text-lg font-black">check</span>}
                            </button>
                            <label className="text-[10px] font-bold text-gray-500 dark:text-[#bab59c] leading-tight uppercase tracking-widest cursor-pointer" onClick={() => setAgreed(!agreed)}>
                                I agree to the <span className="text-primary hover:underline">Terms</span> and <span className="text-primary hover:underline">Privacy Policy</span>.
                            </label>
                        </div>

                        <div className="pt-4">
                            <button
                                disabled={loading || !agreed}
                                className="w-full bg-primary hover:scale-[1.02] active:scale-[0.98] text-background-dark font-black text-xl h-16 rounded-2xl shadow-glow transition-all flex items-center justify-between px-8 uppercase tracking-tighter italic disabled:opacity-50 disabled:grayscale"
                                type="submit"
                            >
                                <span>{loading ? 'Creating...' : 'Join Now'}</span>
                                <span className="material-symbols-outlined font-black">arrow_forward</span>
                            </button>
                        </div>
                    </form>
                </main>
            </div>

            {/* Decorative background elements */}
            <div className="fixed top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none z-0"></div>
        </div>
    );
}

function SocialButton({ provider, icon, isSVG = false }: { provider: string, icon: React.ReactNode, isSVG?: boolean }) {
    return (
        <button type="button" className="flex items-center justify-center rounded-2xl h-16 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-900 dark:text-white transition-all active:scale-95 shadow-xl group">
            <div className="size-6 flex items-center justify-center">
                {isSVG ? <svg className="w-full h-full" viewBox="0 0 24 24">{icon}</svg> : <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">{icon}</svg>}
            </div>
            {/* <span className="text-sm font-black uppercase tracking-widest">{provider}</span> */}
        </button>
    );
}

function InputGroup({ label, icon, placeholder, value, onChange, type = "text", showPasswordToggle = false }: {
    label: string, icon: string, placeholder: string, value: string, onChange: (val: string) => void, type?: string, showPasswordToggle?: boolean
}) {
    const [isVisible, setIsVisible] = useState(false);
    const inputType = showPasswordToggle ? (isVisible ? 'text' : 'password') : type;

    return (
        <div className="group">
            <label className="block text-[10px] font-black text-gray-400 dark:text-[#bab59c] mb-2 uppercase tracking-[0.2em] ml-1">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-gray-400 dark:text-white/20 transition-colors group-focus-within:text-primary" style={{ fontSize: '20px' }}>{icon}</span>
                </div>
                <input
                    className="w-full bg-slate-50 dark:bg-surface-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/10 font-bold text-sm tracking-widest border border-slate-200 dark:border-white/5 rounded-2xl py-4 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-xl"
                    placeholder={placeholder}
                    type={inputType}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required
                />
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setIsVisible(!isVisible)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{isVisible ? 'visibility_off' : 'visibility'}</span>
                    </button>
                )}
            </div>
        </div>
    );
}
