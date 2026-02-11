"use client";

import { FC, useState } from "react";
import { useAudio } from "@/context/AudioProvider";

export const BeatPlayer: FC = () => {
    const {
        isPlaying, nowPlaying, stop, play, progress, duration, seek, metadata,
        volume, setVolume, next, previous, requestLicense
    } = useAudio();

    if (!nowPlaying) return null;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const pct = x / rect.width;
        seek(pct * duration);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseFloat(e.target.value));
    };

    return (
        <div className="fixed bottom-0 left-0 z-[150] w-full border-t border-white/10 bg-black/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between animate-in slide-in-from-bottom duration-500">
            {/* Beat Info */}
            <div className="hidden sm:flex items-center gap-4 w-1/3">
                <div className="h-10 w-10 bg-neutral-900 border border-white/10 relative overflow-hidden">
                    {metadata?.artwork && (
                        <img src={metadata.artwork} alt="" className="object-cover w-full h-full" />
                    )}
                </div>
                <div className="min-w-0">
                    <div className="font-mono text-[8px] text-white/30 tracking-widest uppercase mb-1 truncate">NOW_PREVIEWING</div>
                    <div className="text-xs font-bold uppercase tracking-tight truncate">{metadata?.title || "Unknown Beat"}</div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-2 flex-1 max-w-xl px-4">
                <div className="flex items-center gap-6">
                    <button
                        onClick={previous}
                        className="text-white/40 hover:text-white transition-colors"
                    >
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
                    <button
                        onClick={next}
                        className="text-white/40 hover:text-white transition-colors"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" /></svg>
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full flex items-center gap-3">
                    <span className="font-mono text-[8px] text-white/40 w-8">{formatTime(progress)}</span>
                    <div
                        className="flex-1 h-1 bg-white/10 relative cursor-pointer group"
                        onClick={handleProgressClick}
                    >
                        <div
                            className="absolute top-0 left-0 h-full bg-white transition-all duration-100"
                            style={{ width: `${(progress / (duration || 1)) * 100}%` }}
                        />
                        <div className="absolute top-1/2 -mt-1 h-2 w-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ left: `${(progress / (duration || 1)) * 100}%`, transform: 'translateX(-50%)' }} />
                    </div>
                    <span className="font-mono text-[8px] text-white/40 w-8 text-right">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="hidden sm:flex items-center justify-end gap-6 w-1/3">
                <div className="flex items-center gap-3 group/volume">
                    <svg className="text-white/30 group-hover/volume:text-white transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
                    <div className="w-24 h-1 bg-white/10 relative overflow-hidden flex items-center">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="absolute top-0 left-0 h-full bg-white/40" style={{ width: `${volume * 100}%` }} />
                    </div>
                </div>
                <button
                    onClick={() => metadata?.id && requestLicense(metadata.id)}
                    className="px-4 py-2 border border-white/10 font-mono text-[9px] uppercase hover:bg-white hover:text-black transition-all"
                >
                    [ LICENSE_NOW ]
                </button>
            </div>
        </div>
    );
};
