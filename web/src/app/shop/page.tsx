import BottomNav from '@/components/BottomNav';

export default function ShopPage() {
    return (
        <div className="min-h-screen pb-24 bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
            <header className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-black/5 dark:border-white/5 px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">Official Store</h1>
                <button className="p-2 relative rounded-full hover:bg-black/5 dark:hover:bg-white/10">
                    <span className="material-symbols-outlined">shopping_cart</span>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                </button>
            </header>

            <main className="p-4 grid grid-cols-2 gap-4">
                {/* Product 1 */}
                <div className="bg-surface-dark border border-white/5 rounded-xl overflow-hidden group">
                    <div className="aspect-square bg-white/5 relative">
                        <div className="absolute top-2 left-2 bg-primary text-black text-[10px] font-bold px-2 py-1 rounded">NEW</div>
                    </div>
                    <div className="p-3">
                        <h3 className="font-bold text-sm mb-1 truncate">Home Kit 24/25</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-primary font-bold">$89.99</span>
                            <button className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-colors">
                                <span className="material-symbols-outlined text-[14px]">add</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product 2 */}
                <div className="bg-surface-dark border border-white/5 rounded-xl overflow-hidden group">
                    <div className="aspect-square bg-white/5 relative">
                    </div>
                    <div className="p-3">
                        <h3 className="font-bold text-sm mb-1 truncate">Training Top</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-primary font-bold">$54.99</span>
                            <button className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-colors">
                                <span className="material-symbols-outlined text-[14px]">add</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <BottomNav activeTab="shop" />
        </div>
    );
}
