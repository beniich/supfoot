"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Brain, Zap, Trash2, Image as ImageIcon, ChevronDown } from 'lucide-react';
import { chatWithLLM, getConversations, LLMProvider, ChatMessage } from '@/lib/supabase-llm';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    model: LLMProvider;
    timestamp: Date;
}

const MODELS: { id: LLMProvider; name: string; icon: any; color: string; desc: string }[] = [
    {
        id: 'openai',
        name: 'GPT-4 Turbo',
        icon: Sparkles,
        color: 'text-emerald-400',
        desc: 'Le plus équilibré et précis'
    },
    {
        id: 'anthropic',
        name: 'Claude 3.5 Sonnet',
        icon: Brain,
        color: 'text-orange-400',
        desc: 'Excellent pour l\'analyse et le code'
    },
    {
        id: 'google',
        name: 'Gemini 2.0 Flash',
        icon: Zap,
        color: 'text-blue-400',
        desc: 'Ultra-rapide et multimodal'
    },
];

export default function AIHub() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [selectedModel, setSelectedModel] = useState<LLMProvider>('openai');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState<string | undefined>(undefined);
    const [showModelPicker, setShowModelPicker] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            model: selectedModel,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await chatWithLLM(selectedModel, input, conversationId);

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: result.response,
                model: selectedModel,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
            setConversationId(result.conversationId);
        } catch (error) {
            console.error('AI Error:', error);
            // Handle error UI here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[800px] w-full max-w-5xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/80">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/10 rounded-2xl">
                        <Bot className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">SupFootball AI Hub</h2>
                        <p className="text-sm text-slate-400">Assistant intelligent multi-moteurs</p>
                    </div>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setShowModelPicker(!showModelPicker)}
                        className="flex items-center gap-3 px-4 py-2 bg-slate-800 hover:bg-slate-700 transition-colors rounded-xl border border-slate-700 group"
                    >
                        {React.createElement(MODELS.find(m => m.id === selectedModel)?.icon, {
                            className: clsx("w-4 h-4", MODELS.find(m => m.id === selectedModel)?.color)
                        })}
                        <span className="text-sm font-medium text-slate-200">
                            {MODELS.find(m => m.id === selectedModel)?.name}
                        </span>
                        <ChevronDown className={clsx("w-4 h-4 text-slate-500 transition-transform", showModelPicker && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                        {showModelPicker && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute right-0 mt-2 w-72 p-2 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl z-50"
                            >
                                {MODELS.map((model) => (
                                    <button
                                        key={model.id}
                                        onClick={() => {
                                            setSelectedModel(model.id);
                                            setShowModelPicker(false);
                                        }}
                                        className={clsx(
                                            "flex items-start gap-3 w-full p-3 rounded-xl transition-all text-left mb-1 last:mb-0",
                                            selectedModel === model.id ? "bg-indigo-500/10 border border-indigo-500/20" : "hover:bg-slate-700/50"
                                        )}
                                    >
                                        <div className={clsx("p-2 rounded-lg bg-slate-900", model.color)}>
                                            {React.createElement(model.icon, { className: "w-4 h-4" })}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">{model.name}</div>
                                            <div className="text-xs text-slate-400 leading-tight">{model.desc}</div>
                                        </div>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                        <div className="p-6 bg-slate-800 rounded-full">
                            <Sparkles className="w-12 h-12 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Comment puis-je vous aider ?</h3>
                            <p className="text-slate-400 max-w-sm">Posez-moi des questions sur les tactiques, les joueurs ou les résultats historiques.</p>
                        </div>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <motion.div
                            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={msg.id}
                            className={clsx(
                                "flex gap-4",
                                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            <div className={clsx(
                                "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                                msg.role === 'user' ? "bg-indigo-600" : "bg-slate-800 border border-slate-700"
                            )}>
                                {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-indigo-400" />}
                            </div>

                            <div className={clsx(
                                "max-w-[80%] p-4 rounded-3xl",
                                msg.role === 'user'
                                    ? "bg-indigo-600/20 text-indigo-50 border border-indigo-500/20 rounded-tr-none"
                                    : "bg-slate-800/50 text-slate-200 border border-slate-700 rounded-tl-none"
                            )}>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                <div className="flex items-center gap-2 mt-2 opacity-40 text-[10px] font-mono">
                                    <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    {msg.role === 'assistant' && (
                                        <>
                                            <span>•</span>
                                            <span className="uppercase">{msg.model}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
                {isLoading && (
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center animate-pulse">
                            <Bot className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div className="bg-slate-800/30 p-4 rounded-3xl rounded-tl-none border border-slate-700/50 flex gap-1 items-center">
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 bg-slate-900/80 border-t border-slate-800">
                <div className="relative group">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder={`Demander à ${MODELS.find(m => m.id === selectedModel)?.name}...`}
                        className="w-full bg-slate-800 text-white border border-slate-700 rounded-2xl py-4 pl-4 pr-32 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none min-h-[60px] max-h-32 text-sm"
                        rows={1}
                    />
                    <div className="absolute right-2 bottom-2 flex items-center gap-1">
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-colors">
                            <ImageIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className={clsx(
                                "px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm transition-all",
                                input.trim() && !isLoading
                                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                                    : "bg-slate-700 text-slate-500 cursor-not-allowed"
                            )}
                        >
                            <span>Envoyer</span>
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <p className="text-[10px] text-center text-slate-500 mt-4">
                    L'IA peut faire des erreurs. Vérifiez les informations importantes.
                </p>
            </div>
        </div>
    );
}
