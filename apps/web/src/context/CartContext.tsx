"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "@/lib/shop-types";

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (uniqueId: string) => void;
    updateQuantity: (uniqueId: string, delta: number) => void;
    clearCart: () => void;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        try {
            const saved = localStorage.getItem("nmd_cart");
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setCart(parsed);
                }
            }
        } catch (e) {
            console.error("Cart hydration failed:", e);
            localStorage.removeItem("nmd_cart");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("nmd_cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.uniqueId === item.uniqueId);
            if (existing) {
                return prev.map(i => i.uniqueId === item.uniqueId ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (uniqueId: string) => {
        setCart(prev => prev.filter(i => i.uniqueId !== uniqueId));
    };

    const updateQuantity = (uniqueId: string, delta: number) => {
        setCart(prev => prev.map(i => {
            if (i.uniqueId === uniqueId) {
                const newQty = Math.max(1, i.quantity + delta);
                return { ...i, quantity: newQty };
            }
            return i;
        }));
    };

    const clearCart = () => setCart([]);

    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
