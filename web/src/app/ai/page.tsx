"use client";

import AIHub from '@/components/ai/AIHub';
import { motion } from 'framer-motion';

export default function AIPage() {
    return (
        <main className="min-h-screen bg-[#0a0c10] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="px-4 py-1.5 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest rounded-full border border-indigo-500/20">
                            Intelligence Artificielle
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-white tracking-tight"
                    >
                        Le Cœur de <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">SupFootball</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-slate-400 text-lg max-w-2xl mx-auto"
                    >
                        Accédez à la puissance combinée des meilleurs modèles d'IA au monde pour analyser vos matchs, vos joueurs et vos stratégies.
                    </motion.p>
                </div>

                {/* Chat Component */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative"
                >
                    {/* Decorative background glow */}
                    <div className="absolute -inset-4 bg-indigo-500/5 blur-3xl rounded-[3rem] -z-10" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/2 blur-[120px] -z-10" />

                    <AIHub />
                </motion.div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
                    {[
                        {
                            title: "Analyse Tactique",
                            desc: "Claude 3.5 analyse vos compositions et propose des ajustements stratégiques basés sur les données.",
                            icon: "📊"
                        },
                        {
                            title: "Prédictions de Match",
                            desc: "GPT-4 utilise l'historique des rencontres pour évaluer les probabilités de victoire.",
                            icon: "⚽"
                        },
                        {
                            title: "Traitement Multimodal",
                            desc: "Gemini peut analyser des captures d'écran de statistiques ou des photos de terrain en un clin d'œil.",
                            icon: "👁️"
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-indigo-500/30 transition-all group"
                        >
                            <div className="text-3xl mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
