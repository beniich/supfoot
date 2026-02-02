'use client';

import React, { useState, useEffect } from 'react';
import api from '@/services/api'; // Ensure this service is set up
import Image from 'next/image';

interface Product {
    _id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    image: string; // URL for the image
    isActive: boolean;
    isFeatured: boolean;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    // Fetch Products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await api.get('/products');
            // Check if response is array or paginated object
            const data = Array.isArray(res.data) ? res.data : (res.data.products || []);
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSave = async () => {
        try {
            if (currentProduct._id) {
                // Update
                await api.patch(`/products/${currentProduct._id}`, currentProduct);
            } else {
                // Create
                // Ensure required fields
                if (!currentProduct.name || !currentProduct.price) {
                    alert('Name and Price are required');
                    return;
                }
                await api.post('/products', { ...currentProduct, isActive: true });
            }
            setIsEditing(false);
            setCurrentProduct({});
            fetchProducts(); // Refresh list
        } catch (error) {
            console.error("Error saving product", error);
            alert('Failed to save product');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                console.error("Error deleting product", error);
                alert('Failed to delete product');
            }
        }
    };

    if (loading) return <div className="p-8 text-center">Loading Store...</div>;

    return (
        <div className="p-6 space-y-6 bg-[#0a0a0b] min-h-full text-white">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-black uppercase italic tracking-tighter">
                    Gestion <span className="text-primary">Boutique</span>
                </h1>
                <button
                    onClick={() => { setIsEditing(true); setCurrentProduct({}); }}
                    className="bg-primary text-background-dark px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                >
                    <span className="material-symbols-outlined">add</span>
                    Ajouter Produit
                </button>
            </div>

            {/* Product List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="bg-[#121214] border border-white/5 rounded-2xl p-4 flex flex-col gap-3 group hover:border-primary/30 transition-colors">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-3">
                                <div className="h-16 w-16 bg-white/5 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white/20">image</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
                                    <div className="flex gap-2 mt-1">
                                        <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                                            {product.category}
                                        </span>
                                        {product.isFeatured && (
                                            <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded uppercase tracking-wider font-bold flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[10px] filled">star</span>
                                                Mur
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:bg-red-500/10 p-1 rounded transition-colors">
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        </div>

                        <div className="flex justify-between items-center mt-auto pt-2 border-t border-white/5">
                            <div className="text-sm">
                                <span className="text-gray-400">Stock:</span> <span className="font-mono text-white font-bold">{product.stock}</span>
                            </div>
                            <span className="text-xl font-black text-white">{product.price} <span className="text-xs font-normal text-gray-400">MAD</span></span>
                        </div>

                        <button
                            onClick={() => { setIsEditing(true); setCurrentProduct(product); }}
                            className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-widest text-gray-300 transition-colors"
                        >
                            Modifier
                        </button>
                    </div>
                ))}
            </div>

            {/* Edit/Create Modal Overlay */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#121214] border border-white/10 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold uppercase italic">{currentProduct._id ? 'Modifier' : 'Nouveau'} Produit</h2>
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <label className="space-y-1">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Nom</span>
                                    <input
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-primary outline-none"
                                        value={currentProduct.name || ''}
                                        onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                    />
                                </label>
                                <label className="space-y-1">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Catégorie</span>
                                    <select
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-primary outline-none"
                                        value={currentProduct.category || 'Jersey'}
                                        onChange={e => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                                    >
                                        <option value="Jersey">Jersey</option>
                                        <option value="Training">Training</option>
                                        <option value="Accessories">Accessories</option>
                                    </select>
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <label className="space-y-1">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Prix (MAD)</span>
                                    <input
                                        type="number"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-primary outline-none font-mono"
                                        value={currentProduct.price || ''}
                                        onChange={e => setCurrentProduct({ ...currentProduct, price: Number(e.target.value) })}
                                    />
                                </label>
                                <label className="space-y-1">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Stock</span>
                                    <input
                                        type="number"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-primary outline-none font-mono"
                                        value={currentProduct.stock || ''}
                                        onChange={e => setCurrentProduct({ ...currentProduct, stock: Number(e.target.value) })}
                                    />
                                </label>
                            </div>

                            <label className="block space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase">Image URL</span>
                                <input
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-primary outline-none text-xs font-mono"
                                    value={currentProduct.image || ''}
                                    placeholder="https://..."
                                    onChange={e => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                                />
                            </label>

                            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setCurrentProduct({ ...currentProduct, isFeatured: !currentProduct.isFeatured })}>
                                <div className={`h-6 w-6 rounded-md border-2 flex items-center justify-center transition-colors ${currentProduct.isFeatured ? 'bg-primary border-primary' : 'border-gray-500'}`}>
                                    {currentProduct.isFeatured && <span className="material-symbols-outlined text-black text-sm font-bold">check</span>}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-white text-sm">Afficher sur le Mur</span>
                                    <span className="text-xs text-gray-400">Ce produit apparaîtra dans le fil d'actualité de l'app.</span>
                                </div>
                            </div>

                            <button
                                onClick={handleSave}
                                className="w-full bg-primary text-background-dark font-black uppercase tracking-wider py-4 rounded-xl mt-4 hover:scale-[1.02] transition-transform"
                            >
                                Enregistrer Produit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
