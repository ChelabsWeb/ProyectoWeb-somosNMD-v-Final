"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShopCategory } from "../../lib/shop-types";

interface ShopHeaderProps {
    activeCategory: ShopCategory;
    onCategoryChange: (category: ShopCategory) => void;
    cartCount: number;
    onCartOpen: () => void;
}

export const ShopHeader: FC<ShopHeaderProps> = ({
    activeCategory,
    onCategoryChange,
    cartCount,
    onCartOpen
}) => {
    return (
        <header className="fixed top-0 left-0 z-[120] w-full border-b border-white/10 bg-black/60 backdrop-blur-md font-mono text-[10px] uppercase tracking-[0.3em]">
            <div className="flex h-[54px] items-center justify-between px-6">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <Image src="/assets/logo/logoNMD.svg" alt="NMD" width={18} height={18} className="invert opacity-60 group-hover:opacity-100 transition-opacity" />
                        <span className="hidden sm:inline border-l border-white/20 pl-4 text-white/40 group-hover:text-white transition-colors cursor-pointer">
                            [ RETURN_TO_CORE ]
                        </span>
                    </Link>
                </div>

                <nav className="flex items-center gap-8">
                    {(["merch", "furniture", "beats"] as ShopCategory[]).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            className={`relative transition-colors hover:text-white ${activeCategory === cat ? "text-white" : "text-white/40"}`}
                        >
                            {cat}
                            {activeCategory === cat && (
                                <div className="absolute -bottom-2 left-0 h-[1px] w-full bg-white animate-pulse" />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <button
                        onClick={onCartOpen}
                        className="group flex items-center gap-3 border border-white/10 px-4 py-2 hover:bg-white hover:text-black transition-all"
                    >
                        <span>[ CART_SYS ]</span>
                        <div className="flex items-center justify-center bg-white/10 px-1.5 group-hover:bg-black group-hover:text-white min-w-[20px]">
                            {cartCount}
                        </div>
                    </button>
                </div>
            </div>

            {/* Status Bar */}
            <div className="flex h-[24px] items-center px-6 border-b border-white/5 bg-white/5 text-[8px] text-white/20 gap-8">
                <div className="flex items-center gap-2">
                    <div className="h-1 w-1 bg-green-500 rounded-full animate-pulse" />
                    <span>SHOP_TRANSCEIVER: ACTIVE</span>
                </div>
                <div className="hidden md:block">SEGMENT: {activeCategory.toUpperCase()}</div>
                <div className="hidden lg:block">SYNC: LOCAL_BUFFER_01</div>
            </div>
        </header>
    );
};
