'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

export default function AssociationRegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState({ street: '', city: '', country: '' });
    const [logo, setLogo] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setEmail(parsedUser.email || '');
            if (parsedUser.associationId) {
                router.push('/admin/association');
            }
        } else {
            router.push('/login?redirect=/association/register');
        }
    }, [router]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // First create the association
            const response = await api.post('/associations', {
                name,
                description,
                email,
                phone,
                address
            });

            const association = response.data.data;

            // If logo exists, we would upload it here (omitted for brevity, or implemented as a separate step)
            // if (logo) {
            //     const formData = new FormData();
            //     formData.append('logo', logo);
            //     await api.patch(`/associations/me/logo`, formData);
            // }

            // Update local user data
            const updatedUser = { ...user, associationId: association._id, role: 'admin' };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            router.push('/admin/association');
        } catch (err) {
            const error = err as { response?: { data?: { message?: string } } };
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-sans antialiased text-slate-900 dark:text-white transition-colors duration-200">
            <div className="relative z-10 flex min-h-screen w-full flex-col overflow-hidden max-w-2xl mx-auto px-6">
                {/* Header */}
                <header className="flex items-center py-8 justify-between">
                    <Link href="/" className="flex size-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all shadow-lg text-slate-900 dark:text-white">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <div className="text-center">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Partner Program</h2>
                        <h1 className="text-2xl font-black uppercase italic tracking-tighter">Register Your Association</h1>
                    </div>
                    <div className="size-10"></div>
                </header>

                <main className="flex-1 pb-12">
                    {/* Progress Bar */}
                    <div className="flex items-center gap-4 mb-10 px-4">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex-1 flex flex-col gap-2">
                                <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-primary shadow-glow-sm' : 'bg-slate-200 dark:bg-white/10'}`}></div>
                                <span className={`text-[10px] font-black uppercase tracking-widest text-center ${step >= s ? 'text-primary' : 'text-gray-400'}`}>
                                    {s === 1 ? 'Details' : s === 2 ? 'Subscription' : 'Logo'}
                                </span>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleRegister} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest p-4 rounded-xl text-center">
                                {error}
                            </div>
                        )}

                        {step === 1 && (
                            <div className="space-y-6">
                                <InputGroup label="Association Name" icon="handshake" placeholder="E.g. Real Madrid Foundation" value={name} onChange={setName} />
                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 dark:text-[#bab59c] mb-2 uppercase tracking-[0.2em] ml-1">Description</label>
                                    <textarea
                                        className="w-full bg-slate-50 dark:bg-surface-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/10 font-bold text-sm border border-slate-200 dark:border-white/5 rounded-2xl py-4 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-xl min-h-[120px]"
                                        placeholder="Tell us about your organization..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputGroup label="Public Email" icon="mail" type="email" placeholder="contact@association.com" value={email} onChange={setEmail} />
                                    <InputGroup label="Phone Number" icon="call" placeholder="+212 600-000000" value={phone} onChange={setPhone} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <InputGroup label="Street" icon="location_on" placeholder="123 Sport St" value={address.street} onChange={(v) => setAddress({ ...address, street: v })} />
                                    <InputGroup label="City" icon="city" placeholder="Casablanca" value={address.city} onChange={(v) => setAddress({ ...address, city: v })} />
                                    <InputGroup label="Country" icon="public" placeholder="Morocco" value={address.country} onChange={(v) => setAddress({ ...address, country: v })} />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="w-full bg-primary text-background-dark font-black text-lg h-16 rounded-2xl shadow-glow transition-all flex items-center justify-center uppercase tracking-tighter italic"
                                >
                                    Select Subscription Plan
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-4">
                                    <PlanCard
                                        name="Free"
                                        price="0€"
                                        features={['Up to 50 members', 'Digital Badges', 'Basic Analytics']}
                                        selected={true}
                                        onSelect={() => { }}
                                    />
                                    <PlanCard
                                        name="Premium"
                                        price="29€/mo"
                                        features={['Unlimited members', 'Custom Badge Templates', 'Advanced Stats', 'Priority Support']}
                                        selected={false}
                                        onSelect={() => { }}
                                        popular
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="flex-1 bg-white/5 text-white font-black text-lg h-16 rounded-2xl border border-white/10 transition-all flex items-center justify-center uppercase tracking-tighter italic"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStep(3)}
                                        className="flex-1 bg-primary text-background-dark font-black text-lg h-16 rounded-2xl shadow-glow transition-all flex items-center justify-center uppercase tracking-tighter italic"
                                    >
                                        Upload Logo
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group" onClick={() => document.getElementById('logo-upload')?.click()}>
                                    <input
                                        type="file"
                                        id="logo-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => setLogo(e.target.files?.[0] || null)}
                                    />
                                    <span className="material-symbols-outlined text-6xl text-primary mb-4 group-hover:scale-110 transition-transform">cloud_upload</span>
                                    <p className="text-sm font-black uppercase tracking-widest text-center">
                                        {logo ? logo.name : 'Upload Association Logo'}
                                    </p>
                                    <p className="text-[10px] text-gray-400 mt-2 uppercase">PNG, JPG up to 5MB</p>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="flex-1 bg-white/5 text-white font-black text-lg h-16 rounded-2xl border border-white/10 transition-all flex items-center justify-center uppercase tracking-tighter italic"
                                    >
                                        Back
                                    </button>
                                    <button
                                        disabled={loading}
                                        className="flex-1 bg-primary text-background-dark font-black text-lg h-16 rounded-2xl shadow-glow transition-all flex items-center justify-center uppercase tracking-tighter italic disabled:opacity-50"
                                        type="submit"
                                    >
                                        {loading ? 'Creating...' : 'Create Association'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </main>
            </div>

            {/* Background Decor */}
            <div className="fixed top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
            <div className="fixed bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none -z-10"></div>
        </div>
    );
}

function InputGroup({ label, icon, placeholder, value, onChange, type = "text" }: any) {
    return (
        <div className="group">
            <label className="block text-[10px] font-black text-gray-400 dark:text-[#bab59c] mb-2 uppercase tracking-[0.2em] ml-1">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-gray-400 dark:text-white/20 transition-colors group-focus-within:text-primary" style={{ fontSize: '20px' }}>{icon}</span>
                </div>
                <input
                    className="w-full bg-slate-50 dark:bg-surface-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/10 font-bold text-sm border border-slate-200 dark:border-white/5 rounded-2xl py-4 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-xl"
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required
                />
            </div>
        </div>
    );
}

function PlanCard({ name, price, features, selected, onSelect, popular }: any) {
    return (
        <div
            onClick={onSelect}
            className={`relative p-6 rounded-3xl border-2 transition-all cursor-pointer ${selected ? 'border-primary bg-primary/5 shadow-glow-sm' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
        >
            {popular && (
                <div className="absolute -top-3 right-6 bg-primary text-background-dark text-[10px] font-black px-3 py-1 rounded-full uppercase italic">Most Popular</div>
            )}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-black italic uppercase tracking-tighter">{name}</h3>
                <span className="text-2xl font-black text-primary">{price}</span>
            </div>
            <ul className="space-y-2">
                {features.map((f: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                        {f}
                    </li>
                ))}
            </ul>
        </div>
    );
}
