"use client";

import { useState, type FC } from "react";
import { ArtistCard } from "./ArtistCard";
import { ArtistOverlay } from "./ArtistOverlay";
import { trackEvent } from "../../lib/analytics";
import { ARTISTS, type ArtistEntry } from "@/data/artists";
import { StaticThreeDLogo } from "./StaticThreeDLogo";

export const ArtistsSection: FC = () => {
  const [selectedArtist, setSelectedArtist] = useState<ArtistEntry | null>(null);

  const rows = [];
  for (let i = 0; i < ARTISTS.length; i += 2) {
    rows.push(ARTISTS.slice(i, i + 2));
  }

  return (
    <section
      id="artists"
      className="relative w-full bg-[#EAE9E4] text-[#1a1a1a]"
    >
      {/* Sticky Background Elements (Typography & Logo) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-start z-0 pointer-events-none overflow-hidden">
        
        {/* Top Navigation-like Micro Elements */}
        <div className="hidden lg:flex justify-between w-full px-12 py-8 font-mono text-[10px] uppercase tracking-widest text-black/60">
          <div className="flex gap-16">
            <span>INFO@SOMOSNMD.COM</span>
            <span>MVD,UY_00:00:00</span>
          </div>
          <div className="flex text-center opacity-70 leading-none">
            N<br/>M<br/>D
          </div>
          <div className="flex gap-16">
            <span>ES / EN</span>
          </div>
        </div>

        {/* Plus icon on left */}
        <div className="hidden lg:block absolute left-12 top-32 text-black/40 text-4xl font-light">
          +
        </div>

        {/* Big Typography matching the requested substitution */}
        <div className="w-full px-6 md:px-24 pt-32 lg:pt-0 max-w-full lg:max-w-none 2xl:max-w-[1800px] mx-auto">
          <h2 className="font-sans font-black uppercase tracking-tighter text-[#1a1a1a] leading-[0.85] md:leading-[0.8] whitespace-nowrap overflow-hidden">
            <span className="block text-[22vw] sm:text-[18vw] lg:text-[13vw] ml-[2vw] lg:ml-[8vw]">ART IS</span>
            <span className="block text-[22vw] sm:text-[18vw] lg:text-[13vw] ml-[15vw] lg:ml-[25vw]">TA´s_</span>
          </h2>
        </div>

        {/* Center 3D Logo (Static) hidden on mobile */}
        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-auto">
          <StaticThreeDLogo />
        </div>

        {/* Micro Elements: Side coordinates */}
        <div className="hidden xl:block absolute right-6 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase rotate-90 origin-right text-black/60 tracking-widest">
          0050 Y 0730 H
        </div>
        <div className="hidden xl:block absolute left-6 bottom-12 font-mono text-[9px] uppercase text-black/60 tracking-widest">
          0000 X 1536 W
        </div>
        <div className="hidden xl:block absolute right-6 bottom-12 font-mono text-[9px] uppercase text-black/60 tracking-widest">
          © 2026
        </div>
      </div>

      {/* Grid of Artists (Scrolling over the sticky background) */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 xl:px-32 flex flex-col gap-24 md:gap-40 lg:gap-48 -mt-[100vh] pt-[50vh] md:pt-[40vh] pb-64">
        {rows.map((row, idx) => (
          <div key={idx} className="flex flex-col md:flex-row justify-between w-full items-center md:items-start max-w-none mx-0">
            
            {/* Left Artist - Centered on mobile, explicitly pushed to left on desktop */}
            <div className="w-full md:w-[45%] lg:w-[40%] xl:w-[35%] flex justify-center md:justify-start mb-16 md:mb-0">
              {row[0] && (
                <ArtistCard
                  artist={row[0]}
                  align="left"
                  onSelect={() => {
                    setSelectedArtist(row[0]);
                    trackEvent("artist_profile_view", { artist_id: row[0].id });
                  }}
                />
              )}
            </div>

            {/* Middle explicit empty space to force the "medio vacio" concept in code */}
            <div className="hidden md:block flex-1 min-w-[200px]" />

            {/* Right Artist - Centered on mobile, explicitly pushed to right on desktop */}
            <div className="w-full md:w-[45%] lg:w-[40%] xl:w-[35%] flex justify-center md:justify-end">
              {row[1] && (
                <ArtistCard
                  artist={row[1]}
                  align="right"
                  onSelect={() => {
                    setSelectedArtist(row[1]);
                    trackEvent("artist_profile_view", { artist_id: row[1].id });
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <ArtistOverlay artist={selectedArtist} onClose={() => setSelectedArtist(null)} />
    </section>
  );
};
