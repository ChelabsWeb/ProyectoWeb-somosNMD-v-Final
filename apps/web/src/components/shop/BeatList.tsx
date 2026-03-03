"use client";

import { FC, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAudio } from "@/context/AudioProvider";
import { useCart } from "@/context/CartContext";
import { Beat } from "@/lib/shop-types";

interface BeatItemProps {
    beat: Beat;
}

export const BeatItem: FC<BeatItemProps> = ({ beat }) => {
    const { play, stop, nowPlaying, isPlaying, requestedLicenseId, clearLicenseRequest } = useAudio();
    const { cart, addToCart } = useCart();
    const [showLicenses, setShowLicenses] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);

    const isCurrent = nowPlaying === beat.previewUrl;
    const isAdded = cart.some(item => item.id === beat.id);

    // React to global license request
    useEffect(() => {
        if (requestedLicenseId === beat.id) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setShowLicenses(true);
            itemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            clearLicenseRequest();
        }
    }, [requestedLicenseId, beat.id, clearLicenseRequest]);

    const handleTogglePlay = () => {
        if (isCurrent && isPlaying) {
            stop();
        } else {
            play(beat.previewUrl, {
                id: beat.id,
                title: beat.title,
                artist: beat.producer,
                artwork: beat.artworkUrl
            });
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSelectLicense = (tier: any) => {
        addToCart({
            id: beat.id,
            uniqueId: `${beat.id}-${tier.name.toLowerCase()}`,
            title: `${beat.title} (${tier.name})`,
            price: tier.price,
            image: beat.artworkUrl,
            type: "digital",
            quantity: 1,
            category: "beats",
            priceTierSelection: tier.name
        });
        setShowLicenses(false);
    };

    return (
        <div ref={itemRef} className={`flex flex-col border transition-all overflow-hidden ${showLicenses ? 'border-white/20 bg-white/5' : 'border-white/5 bg-black/40 hover:bg-white/5'}`}>
            <div className="group flex items-center gap-6 p-4">
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
                        onClick={() => setShowLicenses(!showLicenses)}
                        disabled={isAdded}
                        className={`h-10 px-4 flex items-center justify-center border border-white/10 font-mono text-[10px] uppercase transition-all ${isAdded ? 'bg-green-500/20 text-green-500 border-green-500/20' : 'bg-white/5 hover:bg-white hover:text-black'}`}
                    >
                        {isAdded ? '[ IN_CART ]' : '[ ADD_LICENSE ]'}
                    </button>
                </div>
            </div>

            {/* License Selection Panel */}
            {showLicenses && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1 p-1 bg-white/5 border-t border-white/5 animate-in slide-in-from-top duration-300">
                    {beat.priceTiers.map(tier => (
                        <div key={tier.name} className="flex flex-col gap-2 p-4 bg-black/60 hover:bg-black/80 transition-colors">
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{tier.name}</span>
                                <span className="font-bold">${tier.price}</span>
                            </div>
                            <div className="flex-1 space-y-1">
                                {tier.features.map(f => (
                                    <div key={f} className="text-[8px] font-mono text-white/20 flex items-center gap-1 uppercase">
                                        <div className="h-0.5 w-1 bg-white/20" /> {f}
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => handleSelectLicense(tier)}
                                className="w-full py-2 bg-white/5 border border-white/10 text-[9px] font-mono uppercase hover:bg-white hover:text-black transition-all"
                            >
                                SELECT_LICENSE
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const BeatList: FC<{ beats: Beat[] }> = ({ beats }) => {
    const { setPlaylist, play, nowPlaying } = useAudio();

    // Register playlist
    useEffect(() => {
        setPlaylist(beats.map(b => b.previewUrl));
    }, [beats, setPlaylist]);

    // Handle skip events
    useEffect(() => {
        const handleNext = () => {
            const currentIndex = beats.findIndex(b => b.previewUrl === nowPlaying);
            const nextIndex = (currentIndex + 1) % beats.length;
            const nextBeat = beats[nextIndex];
            play(nextBeat.previewUrl, {
                id: nextBeat.id,
                title: nextBeat.title,
                artist: nextBeat.producer,
                artwork: nextBeat.artworkUrl
            });
        };

        const handlePrev = () => {
            const currentIndex = beats.findIndex(b => b.previewUrl === nowPlaying);
            const prevIndex = (currentIndex - 1 + beats.length) % beats.length;
            const prevBeat = beats[prevIndex];
            play(prevBeat.previewUrl, {
                id: prevBeat.id,
                title: prevBeat.title,
                artist: prevBeat.producer,
                artwork: prevBeat.artworkUrl
            });
        };

        window.addEventListener('nmd-audio-next', handleNext);
        window.addEventListener('nmd-audio-prev', handlePrev);

        return () => {
            window.removeEventListener('nmd-audio-next', handleNext);
            window.removeEventListener('nmd-audio-prev', handlePrev);
        };
    }, [beats, nowPlaying, play]);

    return (
        <div className="flex flex-col gap-2">
            {beats.map((beat: Beat) => (
                <BeatItem key={beat.id} beat={beat} />
            ))}
        </div>
    );
};
