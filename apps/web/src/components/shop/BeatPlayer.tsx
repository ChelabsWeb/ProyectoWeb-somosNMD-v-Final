"use client";

import { FC } from "react";
import { useAudio } from "@/context/AudioProvider";

export const BeatPlayer: FC = () => {
    const { isPlaying, nowPlaying, stop, play } = useAudio();

    if (!nowPlaying) return null;

    return (
        <div className="fixed bottom-0 left-0 z-[150] w-full border-t border-white/10 bg-black/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between animate-in slide-in-from-bottom duration-500">
            {/* Beat Info */}
            <div className="hidden sm:flex items-center gap-4 w-1/3">
                <div className="h-10 w-10 bg-white/10 border border-white/10" />
                <div>
                    <div className="font-mono text-[8px] text-white/30 tracking-widest uppercase mb-1">NOW_PREVIEWING</div>
                    <div className="text-xs font-bold uppercase tracking-tight">Segment_Buffer_Active</div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-2 flex-1">
                <div className="flex items-center gap-6">
                    <button className="text-white/40 hover:text-white transition-colors">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20" /><line x1="5" y1="19" x2="5" y2="5" /></svg>
                    </button>
                    <button
                        onClick={() => isPlaying ? stop() : play(nowPlaying)}
                        className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                    >
                        {isPlaying ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                        )}
                    </button>
                    <button className="text-white/40 hover:text-white transition-colors">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" /></svg>
                    </button>
                </div>

                {/* Progress Bar (Fake for now) */}
                <div className="w-full max-w-md h-1 bg-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-white w-1/3 animate-pulse" />
                </div>
            </div>

            {/* Actions */}
            <div className="hidden sm:flex items-center justify-end gap-6 w-1/3">
                <div className="flex items-center gap-2 text-white/30">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
                    <div className="w-20 h-1 bg-white/20 rounded-full" />
                </div>
                <button className="px-4 py-2 border border-white/10 font-mono text-[9px] uppercase hover:bg-white hover:text-black transition-all">
                    [ LICENSE_NOW ]
                </button>
            </div>
        </div>
    );
};
