"use client";

import { useState } from "react";
import Image from "next/image";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { BeatList } from "@/components/shop/BeatList";
import { BeatPlayer } from "@/components/shop/BeatPlayer";
import { CartOverlay } from "@/components/shop/CartOverlay";
import { ShopCategory, Product } from "@/lib/shop-types";
import { MOCK_PRODUCTS, MOCK_BEATS } from "@/data/shop-data";
import { useCart } from "@/context/CartContext";

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState<ShopCategory>("merch");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cart, addToCart } = useCart();

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handleAddToCart = (product: Product) => {
        addToCart({
            id: product.id,
            uniqueId: product.id, // simple for mvp
            title: product.title,
            price: product.price,
            image: product.images[0],
            type: "physical",
            quantity: 1,
            category: product.category
        });
        setIsCartOpen(true);
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
            <ShopHeader
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                cartCount={cartCount}
                onCartOpen={() => setIsCartOpen(true)}
            />

            <div className="pt-[100px] px-6 pb-32">
                <section className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-2">
                            {activeCategory}
                        </h1>
                        <div className="flex items-center gap-4 text-white/30 font-mono text-xs uppercase tracking-widest">
                            <span>NMD_SHOP_V2.0</span>
                            <div className="h-px w-20 bg-white/10" />
                            <span>BPM_READY</span>
                        </div>
                    </div>

                    {/* Content will go here based on category */}
                    {activeCategory !== "beats" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            {MOCK_PRODUCTS.filter(p => p.category === activeCategory).map(product => (
                                <div key={product.id} className="group relative border border-white/10 aspect-[3/4] overflow-hidden bg-neutral-900">
                                    {/* Image Layer */}
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src={product.images[0]}
                                            alt={product.title}
                                            fill
                                            priority
                                            unoptimized
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>

                                    {/* Overlay Layer */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

                                    {/* UI Layer */}
                                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                                        <div className="absolute top-6 right-6 font-mono text-[10px] px-2 py-1 bg-black/60 border border-white/10 uppercase text-white/60">
                                            {product.stockStatus.replace("-", "_")}
                                        </div>

                                        <h3 className="text-2xl font-bold uppercase tracking-tighter mb-1">{product.title}</h3>
                                        <div className="flex items-center justify-between font-mono text-sm">
                                            <span className="text-white/40">${product.price}</span>
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className="px-4 py-1 border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-all"
                                            >
                                                [ ADD_TO_CART ]
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <BeatList beats={MOCK_BEATS} />
                        </div>
                    )}
                </section>
            </div>

            <BeatPlayer />
            <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            {/* Minimal Background Effects */}
            <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_ center,_var(--tw-gradient-stops))] from-neutral-800 via-black to-black" />
            </div>
        </main>
    );
}
