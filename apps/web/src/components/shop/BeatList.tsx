"use client";

import { FC } from "react";
import Image from "next/image";
import { useAudio } from "@/context/AudioProvider";
import { useCart } from "@/context/CartContext";
import { Beat } from "@/lib/shop-types";

interface BeatItemProps {
    beat: Beat;
}

export const BeatItem: FC<BeatItemProps> = ({ beat }) => {
    const { play, stop, nowPlaying, isPlaying } = useAudio();
    const { addToCart } = useCart();
    const isCurrent = nowPlaying === beat.previewUrl;

    const handleTogglePlay = () => {
        if (isCurrent && isPlaying) {
            stop();
        } else {
            play(beat.previewUrl);
        }
    };

    const handleAddToCart = () => {
        addToCart({
            id: beat.id,
            uniqueId: `${beat.id}-basic`,
            title: beat.title,
            price: beat.priceTiers[0].price,
            image: beat.artworkUrl,
            type: "digital",
            quantity: 1,
            category: "beats",
            priceTierSelection: "Basic"
        });
    };

    return (
        <div className="group flex items-center gap-6 p-4 border border-white/5 bg-black/40 hover:bg-white/5 transition-all">
            {/* Artwork & Play Button */}
            <div className="relative h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden border border-white/10" onClick={handleTogglePlay}>
                <Image src={beat.artworkUrl || "/assets/shop/placeholder-beat.jpg"} alt={beat.title} fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    {isCurrent && isPlaying ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                    )}
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold uppercase tracking-tight truncate">{beat.title}</h4>
                <div className="flex items-center gap-3 font-mono text-[10px] text-white/40 uppercase">
                    <span>{beat.producer}</span>
                    <span className="h-1 w-1 bg-white/20 rounded-full" />
                    <span>{beat.bpm} BPM</span>
                    <span className="h-1 w-1 bg-white/20 rounded-full" />
                    <span>{beat.key}</span>
                </div>
            </div>

            {/* Tags (Desktop only) */}
            <div className="hidden lg:flex items-center gap-2 flex-1 overflow-hidden">
                {beat.tags.map((tag: string) => (
                    <span key={tag} className="px-2 py-0.5 border border-white/10 text-[9px] font-mono text-white/30 uppercase flex items-center gap-1">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l4.58-4.58c.94-.94.94-2.48 0-3.42L12 2z" /><path d="M7 7h.01" /></svg> {tag}
                    </span>
                ))}
            </div>

            {/* Pricing & Add to Cart */}
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <span className="block font-mono text-[10px] text-white/30 truncate">STARTS_AT</span>
                    <span className="font-bold text-lg">${beat.priceTiers[0].price}</span>
                </div>
                <button
                    onClick={handleAddToCart}
                    className="h-10 w-10 flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                </button>
            </div>
        </div>
    );
};

export const BeatList: FC<{ beats: Beat[] }> = ({ beats }) => {
    return (
        <div className="flex flex-col gap-2">
            {beats.map((beat: Beat) => (
                <BeatItem key={beat.id} beat={beat} />
            ))}
        </div>
    );
};
