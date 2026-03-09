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
    <div className="relative flex flex-col w-full h-full">
      
      {/* Floating Discipline tags - mostly visible on larger screens but relative to the parent bounds somewhat. We can't let it overflow and break grids reliably without knowing the parent. 
         Changing this to inset so it doesn't cause overflow. We can position them absolutely but INSIDE the card visual bounds if necessary, or just relative to the card wrapper without massive negative margins.
      */}
      <div 
        className={`hidden lg:flex absolute bottom-[15%] flex-col gap-2 font-mono text-[11px] text-black uppercase tracking-widest leading-relaxed z-10 
        ${align === 'left' ? 'right-4 text-left p-2 bg-white border-2 border-black' : 'left-4 text-right p-2 bg-white border-2 border-black'}`}
      >
        {tags.map((tag, idx) => (
          <span key={idx}>[ {tag.toUpperCase()} ]</span>
        ))}
      </div>

      <motion.button
        onClick={onSelect}
        className="group relative flex flex-col cursor-pointer bg-black p-4 text-white text-left transition-all duration-300 [-webkit-tap-highlight-color:transparent] border-4 border-white shadow-[10px_10px_0_0_#000000] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[14px_14px_0_0_#FF4D00] rounded-none"
      >
        {/* Floating tags (Mobile, inline) - REMOVED AS REQUESTED */}

        {/* Image Container with inner padding/bg or just raw image */}
        <div className="relative w-full aspect-[4/5] bg-[#EAE9E4] overflow-hidden mb-6 border-b-4 border-white">
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
            <h3 className="font-sans text-[1.5rem] lg:text-[1.75rem] font-bold uppercase tracking-tight text-white leading-none mb-1 group-hover:underline decoration-2 underline-offset-4 decoration-[#FF4D00]">
              {artist.name}
            </h3>
            <p className="font-mono text-[10px] xl:text-xs text-white/60 uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] xl:max-w-[280px]">
              {artist.blurb}
            </p>
          </div>
          <div className="w-8 h-8 shrink-0 flex items-center justify-center text-white font-black text-xl transition-colors group-hover:bg-[#FF4D00] group-hover:text-black pb-[2px] border-4 border-white group-hover:border-[#FF4D00]">
            +
          </div>
        </div>
      </motion.button>
    </div>
  );
};
