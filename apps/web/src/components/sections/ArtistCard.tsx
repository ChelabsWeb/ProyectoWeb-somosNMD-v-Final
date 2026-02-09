import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";
import { type ArtistEntry } from "@/data/artists";

interface ArtistCardProps {
  artist: ArtistEntry;
  onSelect: () => void;
}

export const ArtistCard: FC<ArtistCardProps> = ({ artist, onSelect }) => {
  return (
    <Link
      href={`/artists/${artist.id}`}
      className="group relative flex h-full w-[320px] md:w-[480px] flex-shrink-0 flex-col border-r border-white/10 bg-black cursor-pointer overflow-hidden transition-colors hover:bg-neutral-900/40"
    >
      {/* Dynamic ID Tape - Top Right Override style */}
      <div className="absolute right-4 top-4 z-20 bg-white p-1 px-2 font-mono text-[8px] font-bold text-black uppercase tracking-tighter">
        ID_{artist.id.toUpperCase()}
      </div>

      {/* Image Area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 ease-expo">
        <Image
          src={artist.imageSrc}
          alt={artist.name}
          fill
          sizes="(min-width: 768px) 480px, 320px"
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      </div>

      {/* Info Area */}
      <div className="flex-1 p-6 space-y-4 border-t border-white/10 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-white uppercase transform transition-transform duration-700 group-hover:translate-x-1">
              {artist.name}
            </h3>
            <span className="font-mono text-[8px] text-white/20">FILE_REF_001</span>
          </div>

          <p className="font-mono text-[10px] leading-relaxed text-white/40 uppercase">
            {artist.blurb}
          </p>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <span className="font-mono text-[9px] tracking-[0.4em] text-white/20 group-hover:text-white transition-colors uppercase">
            [ EXPLORAR_DATA ]
          </span>
          <div className="h-px flex-1 bg-white/10 ml-4 group-hover:bg-white/40 transition-all" />
        </div>
      </div>
    </Link>
  );
};
