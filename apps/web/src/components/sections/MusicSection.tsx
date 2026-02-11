"use client";

import { useEffect, useRef, type FC } from "react";

const ALBUMS = [
  {
    id: "junta",
    title: "JUNTA",
    embedUrl: "https://open.spotify.com/embed/album/0JfCrGbMDwV0FuQwqmpOde?utm_source=generator&theme=0",
  },
  {
    id: "egolatra",
    title: "EGOLATRA",
    embedUrl: "https://open.spotify.com/embed/album/7MlGv3nb7tM9jTQsuYHVMx?utm_source=generator&theme=0",
  },
];

const SafeSpotifyEmbed: FC<{ url: string; title: string }> = ({ url, title }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear and inject manually to bypass React traversal
    containerRef.current.innerHTML = "";
    const iframe = document.createElement("iframe");
    iframe.title = `Spotify - ${title}`;
    iframe.src = url;
    iframe.width = "100%";
    iframe.height = "600";
    iframe.style.borderRadius = "12px";
    iframe.style.border = "none";
    iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
    iframe.loading = "lazy";
    // CRITICAL: No allow-same-origin to maintain total isolation
    iframe.setAttribute("sandbox", "allow-forms allow-popups allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation");

    containerRef.current.appendChild(iframe);
  }, [url, title]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[600px] bg-neutral-900/20"
      data-safe-embed="true"
    />
  );
};

export const MusicSection: FC = () => (
  <section
    id="music"
    aria-label="Music projects"
    className="relative flex min-h-screen flex-col bg-black text-neutral-50"
  >
    <div className="sticky top-0 z-20 border-b border-white/10 bg-black/80 backdrop-blur-md px-6 py-4 md:px-12">
      <div className="flex justify-between items-baseline">
        <h2 className="text-sm font-mono tracking-[0.5em] text-white uppercase">Archive_02 / Discografía</h2>
        <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">Registros_Audio_NMD</span>
      </div>
    </div>

    <div className="flex-1 grid md:grid-cols-2 gap-px bg-white/10">
      {ALBUMS.map((album) => (
        <div key={album.id} className="bg-black flex flex-col items-center justify-center p-2 md:p-6">
          <SafeSpotifyEmbed url={album.embedUrl} title={album.title} />
        </div>
      ))}
    </div>
  </section>
);

