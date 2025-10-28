
"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";

type AudioContextType = {
  play: (src: string) => void;
  stop: () => void;
  isPlaying: boolean;
  nowPlaying: string | null;
};

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);

  const play = (src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(src);
    audioRef.current = audio;
    audio.play();
    setIsPlaying(true);
    setNowPlaying(src);

    audio.onended = () => {
      setIsPlaying(false);
      setNowPlaying(null);
    };
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setNowPlaying(null);
    }
  };

  return (
    <AudioContext.Provider value={{ play, stop, isPlaying, nowPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};
