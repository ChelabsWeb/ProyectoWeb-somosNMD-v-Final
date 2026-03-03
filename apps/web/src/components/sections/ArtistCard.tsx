import Image from "next/image";
import { type FC } from "react";
import { type ArtistEntry } from "@/data/artists";
import { motion } from "framer-motion";

interface ArtistCardProps {
  artist: ArtistEntry;
  onSelect: () => void;
  align?: "left" | "right";
}

export const ArtistCard: FC<ArtistCardProps> = ({ artist, onSelect, align = "left" }) => {
  const tags = artist.disciplines || ["3D", "MOTION", "UX\\UI"];

  return (
    <div className="relative flex flex-col w-full max-w-[320px] lg:max-w-[400px]">
      
      {/* Floating Discipline tags - exactly positioned horizontally relative to the side, bottom aligned right above text */}
      <div 
        className={`hidden md:flex absolute bottom-[60px] flex-col gap-2 font-mono text-[11px] text-[#1a1a1a] uppercase tracking-widest leading-relaxed z-10 
        ${align === 'left' ? '-right-[100px] xl:-right-[140px] text-left' : '-left-[100px] xl:-left-[140px] text-right'}`}
      >
        {tags.map((tag, idx) => (
          <span key={idx}>[ {tag.toUpperCase()} ]</span>
        ))}
      </div>

      <motion.button
        onClick={onSelect}
        className="group relative flex flex-col cursor-pointer bg-transparent text-left transition-all duration-300 [-webkit-tap-highlight-color:transparent]"
      >
        {/* Floating tags (Mobile, inline) - REMOVED AS REQUESTED */}

        {/* Image Container with inner padding/bg or just raw image */}
        <div className="relative w-full aspect-[4/5] bg-[#EAE9E4] overflow-hidden mb-6">
          <Image
            src={artist.imageSrc}
            alt={artist.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-center grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
          />
        </div>

        {/* Bottom Content Row */}
        <div className="flex justify-between items-end w-full gap-4">
          <div className="flex flex-col">
            <h3 className="font-sans text-[1.5rem] lg:text-[1.75rem] font-bold uppercase tracking-tight text-[#1a1a1a] leading-none mb-1 group-hover:underline decoration-2 underline-offset-4">
              {artist.name}
            </h3>
            <p className="font-mono text-[10px] xl:text-xs text-[#1a1a1a]/60 uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] xl:max-w-[280px]">
              {artist.blurb}
            </p>
          </div>
          <div className="w-8 h-8 shrink-0 flex items-center justify-center text-[#1a1a1a]/50 font-light text-xl transition-colors group-hover:bg-[#1a1a1a] group-hover:text-white pb-[2px] border border-[#1a1a1a]/30">
            +
          </div>
        </div>
      </motion.button>
    </div>
  );
};
