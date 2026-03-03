
"use client";

import { createContext, useContext, useRef, useState, useEffect, type ReactNode } from "react";

type AudioMetadata = {
  id?: string;
  title: string;
  artist: string;
  artwork?: string;
};

type AudioContextType = {
  play: (src: string, metadata?: AudioMetadata) => void;
  stop: () => void;
  isPlaying: boolean;
  nowPlaying: string | null;
  metadata: AudioMetadata | null;
  progress: number;
  duration: number;
  seek: (time: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
  next: () => void;
  previous: () => void;
  playlist: string[];
  setPlaylist: (urls: string[]) => void;
  requestLicense: (id: string) => void;
  requestedLicenseId: string | null;
  clearLicenseRequest: () => void;
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
  const [metadata, setMetadata] = useState<AudioMetadata | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [requestedLicenseId, setRequestedLicenseId] = useState<string | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setNowPlaying(null);
      setProgress(0);
      next(); // Auto-play next
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", () => setIsPlaying(true));
      audio.removeEventListener("pause", () => setIsPlaying(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowPlaying, playlist]);

  const play = (src: string, meta?: AudioMetadata) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
    }

    if (nowPlaying === src) {
      audioRef.current.play();
      return;
    }

    audioRef.current.src = src;
    audioRef.current.load();
    audioRef.current.play();
    setNowPlaying(src);
    if (meta) setMetadata(meta);
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const setVolume = (v: number) => {
    setVolumeState(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  };

  function next() {
    if (playlist.length === 0 || !nowPlaying) return;
    const currentIndex = playlist.indexOf(nowPlaying);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const nextIndex = (currentIndex + 1) % playlist.length;
    // Note: This only works if we have access to metadata for the next one.
    // For now, let's just trigger a custom event or rely on BeatList to update.
    // Better: dispatch an event that BeatList listens to to trigger play on the next item.
    window.dispatchEvent(new CustomEvent("nmd-audio-next"));
  };

  function previous() {
    if (playlist.length === 0 || !nowPlaying) return;
    const currentIndex = playlist.indexOf(nowPlaying);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    window.dispatchEvent(new CustomEvent("nmd-audio-prev"));
  };

  const requestLicense = (id: string) => {
    setRequestedLicenseId(id);
    // Auto-scroll to beat list or use signaling
  };

  const clearLicenseRequest = () => setRequestedLicenseId(null);

  return (
    <AudioContext.Provider value={{
      play, stop, isPlaying, nowPlaying, metadata, progress, duration, seek,
      volume, setVolume, next, previous, playlist, setPlaylist,
      requestLicense, requestedLicenseId, clearLicenseRequest
    }}>
      {children}
    </AudioContext.Provider>
  );
};
