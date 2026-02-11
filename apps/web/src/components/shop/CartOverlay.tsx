"use client";

import { FC } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

// Note: I'll use SVGs instead of lucide-react to be safe as per previous step learnings
const XIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>;
const PlusIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>;
const MinusIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /></svg>;
const TrashIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>;

interface CartOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartOverlay: FC<CartOverlayProps> = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-md bg-neutral-950 border-l border-white/10 h-full flex flex-col animate-in slide-in-from-right duration-500">
                <header className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">[ SHOP_CART ]</span>
                        <span className="bg-white/10 px-2 py-0.5 text-[10px] font-mono">{cart.length}</span>
                    </div>
                    <button onClick={onClose} className="hover:rotate-90 transition-transform text-white/60 hover:text-white">
                        <XIcon />
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center opacity-20 pointer-events-none">
                            <span className="text-4xl mb-4 font-mono">[!]</span>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-center">Your_Buffer_Is_Empty</span>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.uniqueId} className="flex gap-4 p-4 border border-white/5 bg-white/5 group">
                                <div className="relative h-16 w-16 bg-neutral-800 flex-shrink-0 border border-white/10 overflow-hidden">
                                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-bold uppercase tracking-tight truncate">{item.title}</h4>
                                    <div className="font-mono text-[8px] text-white/30 uppercase mt-1">
                                        {item.category} {item.variantSelection ? `// ${item.variantSelection}` : ""}
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-3 border border-white/10 px-2 py-1">
                                            <button onClick={() => updateQuantity(item.uniqueId, -1)} className="hover:text-white text-white/40"><MinusIcon /></button>
                                            <span className="font-mono text-[10px] min-w-[12px] text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.uniqueId, 1)} className="hover:text-white text-white/40"><PlusIcon /></button>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-mono text-xs">${item.price * item.quantity}</span>
                                            <button onClick={() => removeFromCart(item.uniqueId)} className="text-white/20 hover:text-red-500 transition-colors">
                                                <TrashIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <footer className="p-6 border-t border-white/10 bg-black/40">
                    <div className="flex items-center justify-between mb-6 font-mono">
                        <span className="text-[10px] uppercase tracking-widest text-white/40">GRAND_TOTAL</span>
                        <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
                    </div>
                    <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-[0.2em] text-sm hover:invert transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:invert-0" disabled={cart.length === 0}>
                        PROCEED_TO_CHECKOUT
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </footer>
                <div className="h-1 bg-white/5">
                    <div className="h-full bg-white/20 w-1/4 animate-pulse" />
                </div>
            </div>
        </div>
    );
};
