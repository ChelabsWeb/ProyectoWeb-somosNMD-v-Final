"use client";

import { useState } from "react";
import { ARTISTS, type ArtistEntry } from "@/data/artists";
import { ArtistCard } from "./ArtistCard";
import { ArtistOverlay } from "./ArtistOverlay";
import { trackEvent } from "@/lib/analytics";
import { BentoCard } from "@/components/blocks/bento-card";
import { ParticleBackground } from "@/components/system/ParticleBackground";
import { cn } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
    },
  }),
};

export function ArtistsGrid() {
  const [selectedArtist, setSelectedArtist] = useState<ArtistEntry | null>(null);

  return (
    <section
      id="artists"
      aria-label="Artists gallery"
      className="relative flex min-h-screen flex-col overflow-hidden bg-transparent text-foreground px-4 pt-12 pb-24 font-sans"
    >
      <ParticleBackground />
      
      {/* Sileo Style Minimalist Title Bar */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        custom={0}
        className="relative z-20 w-full max-w-[1280px] mx-auto mb-16 px-4 md:px-0 mt-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-black/10 pb-6">
          <div className="space-y-2">
            <span className="text-[#333333] text-sm uppercase tracking-widest font-semibold font-sans">
              Archive_01
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-sans">
              El Colectivo
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-black/5 border border-black/10 px-4 py-2 rounded-full backdrop-blur-md">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="font-sans text-xs text-foreground/70 font-medium">
              {ARTISTS.length} Expedientes Activos
            </span>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 md:px-0">
        {/* Uniform Bento Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[300px] md:auto-rows-[350px] gap-4 md:gap-6 w-full">
          {ARTISTS.map((artist, index) => {
            return (
              <motion.div
                key={artist.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUpVariant}
                custom={index + 1}
                className="w-full h-full"
              >
                <BentoCard className="w-full h-full">
                  <ArtistCard
                    artist={artist}
                    onSelect={() => {
                      setSelectedArtist(artist);
                      trackEvent("artist_profile_view", { artist_id: artist.id });
                    }}
                  />
                </BentoCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ArtistOverlay artist={selectedArtist} onClose={() => setSelectedArtist(null)} />
    </section>
  );
}

