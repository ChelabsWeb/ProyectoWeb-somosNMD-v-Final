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
      
      <motion.button
        onClick={onSelect}
        className="group relative flex flex-col cursor-pointer bg-black p-4 text-white text-left transition-all duration-300 [-webkit-tap-highlight-color:transparent] border-4 border-white shadow-[10px_10px_0_0_#000000] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[14px_14px_0_0_#FF4D00] rounded-none"
      >
        {/* Image Container with inner padding/bg or just raw image */}
        <div className="relative w-full aspect-[4/5] bg-[#EAE9E4] overflow-hidden mb-6 border-b-4 border-white">
          <Image
            src={artist.imageSrc}
            alt={artist.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-center grayscale-0 opacity-100 lg:grayscale lg:opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
          />
          
          {/* Desktop tags - Snapped perfectly to corners */}
          {tags.map((tag, idx) => {
            const cornerClasses = [
              "top-0 left-0 border-r-4 border-b-4",     // Top Left
              "top-0 right-0 border-l-4 border-b-4",    // Top Right
              "bottom-0 left-0 border-r-4 border-t-4",  // Bottom Left
              "bottom-0 right-0 border-l-4 border-t-4"  // Bottom Right
            ][idx % 4];

            return (
              <span 
                key={idx} 
                className={`hidden lg:inline-flex absolute z-10 bg-white text-black font-mono text-[9px] xl:text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 border-black transition-opacity duration-300 opacity-90 group-hover:opacity-100 ${cornerClasses}`}
              >
                {tag}
              </span>
            );
          })}
        </div>

        {/* Bottom Content Row */}
        <div className="flex justify-between items-end w-full gap-4">
          <div className="flex flex-col text-left">
            <h3 className="font-sans text-[1.5rem] lg:text-[1.75rem] font-bold uppercase tracking-tight text-white leading-none mb-1 group-hover:underline decoration-2 underline-offset-4 decoration-[#FF4D00]">
              {artist.name}
            </h3>
            
            {/* Mobile tags (visible only on small screens to ensure data is accessible) */}
            <div className="flex lg:hidden flex-wrap gap-1.5 mb-2 mt-1">
              {tags.map((tag, idx) => (
                <span key={idx} className="font-mono text-[9px] text-black bg-white/90 px-1 py-0.5 uppercase tracking-widest font-bold">
                  {tag}
                </span>
              ))}
            </div>

            <p className="font-mono text-[10px] xl:text-xs text-white/60 uppercase tracking-widest whitespace-normal lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis max-w-full lg:max-w-[200px] xl:max-w-[280px]">
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
