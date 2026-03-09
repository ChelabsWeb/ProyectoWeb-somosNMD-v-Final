
"use client";

import type { FC, ReactNode } from "react";
import { Button } from "@nmd/ui";

type SocialPlatform =
  | "instagram"
  | "spotify"
  | "youtube"
  | "soundcloud"
  | "linkedin"
  | "tiktok";

const SOCIAL_ICONS: Record<SocialPlatform, ReactNode> = {
  instagram: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 stroke-current stroke-2 fill-none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  ),
  spotify: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 fill-current"
    >
      <path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm5.485 17.354a.75.75 0 0 1-1.036.263c-2.839-1.737-6.418-2.132-10.626-1.173a.75.75 0 0 1-.329-1.461c4.6-1.037 8.514-.577 11.648 1.287a.75.75 0 0 1 .343 1.084zm1.482-3.35a.9.9 0 0 1-1.242.315c-3.25-1.999-8.207-2.58-12.063-1.417a.9.9 0 1 1-.522-1.723c4.36-1.32 9.835-.676 13.523 1.527a.9.9 0 0 1 .304 1.298zm.123-3.511c-3.895-2.314-10.347-2.526-14.066-1.401a1.05 1.05 0 1 1-.608-2.01c4.293-1.3 11.395-1.054 15.8 1.572a1.05 1.05 0 1 1-1.126 1.839z" />
    </svg>
  ),
  youtube: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 fill-current"
    >
      <path d="M23.498 6.186a2.966 2.966 0 0 0-2.084-2.103C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.414.583A2.966 2.966 0 0 0 .502 6.186 31.516 31.516 0 0 0 0 12a31.516 31.516 0 0 0 .502 5.814 2.966 2.966 0 0 0 2.084 2.103C4.495 20.5 12 20.5 12 20.5s7.505 0 9.414-.583a2.966 2.966 0 0 0 2.084-2.103A31.516 31.516 0 0 0 24 12a31.516 31.516 0 0 0-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
    </svg>
  ),
  soundcloud: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 fill-current"
    >
      <path d="M17.1 9.3c-.5 0-1 .1-1.5.3-.3-2.1-2.1-3.8-4.2-3.8-.7 0-1.3.2-1.9.5-.2.1-.3.3-.3.5v9.4c0 .3.2.5.5.5h8.4c1.9 0 3.5-1.6 3.5-3.5S19 9.3 17.1 9.3zM3 9.8c-.3 0-.5.2-.5.5v6.1c0 .3.2.5.5.5s.5-.2.5-.5V10.3c0-.3-.2-.5-.5-.5zm2.1-1.5c-.3 0-.5.2-.5.5v8.1c0 .3.2.5.5.5s.5-.2.5-.5V8.8c0-.3-.2-.5-.5-.5zm2.1-1c-.3 0-.5.2-.5.5v9.1c0 .3.2.5.5.5s.5-.2.5-.5V7.8c0-.3-.2-.5-.5-.5zm2.1-.6c-.3 0-.5.2-.5.5v9.7c0 .3.2.5.5.5s.5-.2.5-.5V7.2c0-.3-.2-.5-.5-.5z" />
    </svg>
  ),
  linkedin: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 fill-current"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.038-1.852-3.038-1.853 0-2.136 1.447-2.136 2.942v5.665H9.351V9h3.414v1.561h.047c.476-.9 1.637-1.852 3.37-1.852 3.604 0 4.27 2.372 4.27 5.455v6.288zM5.337 7.433c-1.144 0-2.068-.926-2.068-2.068 0-1.143.924-2.068 2.068-2.068s2.068.925 2.068 2.068c0 1.142-.924 2.068-2.068 2.068zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
    </svg>
  ),
  tiktok: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 fill-current"
    >
      <path d="M21 7.5c-.7.007-1.381-.179-1.983-.54a5.7 5.7 0 0 1-1.717-1.612v6.706c0 2.986-2.382 5.394-5.337 5.394A5.342 5.342 0 0 1 6.63 12.11c0-2.956 2.408-5.338 5.333-5.338.272 0 .541.021.808.063V9.91a3.087 3.087 0 0 0-.808-.108 2.199 2.199 0 0 0-2.191 2.2 2.198 2.198 0 0 0 2.191 2.195 2.206 2.206 0 0 0 2.207-2.195V0h2.6c.228 1.11.806 2.116 1.66 2.892.851.773 1.949 1.247 3.077 1.304V7.5z" />
    </svg>
  ),
};

const getSocialIcon = (platform: string): ReactNode => {
  const key = platform.toLowerCase() as SocialPlatform;
  if (key in SOCIAL_ICONS) {
    return SOCIAL_ICONS[key];
  }

  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs uppercase">
      {platform.slice(0, 2)}
    </span>
  );
};

import { type ArtistEntry } from "@/data/artists";

type ArtistOverlayProps = {
  artist: ArtistEntry | null;
  onClose: () => void;
};

export const ArtistOverlay: FC<ArtistOverlayProps> = ({ artist, onClose }) => {
  if (!artist) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8" onClick={onClose}>
      <div className="relative bg-white border-4 border-black rounded-none max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-12 shadow-[16px_16px_0_0_rgba(0,0,0,1)] flex flex-col pt-16 md:pt-12" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Bar for Mobile */}
        <div className="absolute top-0 left-0 right-0 border-b-4 border-black bg-black text-white p-3 flex justify-between items-center md:hidden">
            <span className="font-mono text-xs font-bold uppercase tracking-widest">[ PERFIL DE ARTISTA ]</span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-2 md:top-6 md:right-6 h-10 w-10 md:h-12 md:w-12 flex items-center justify-center bg-white text-black hover:bg-black hover:text-white z-20 card-brutalist-sm transition-colors cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none border-black md:border-[3px]"
          aria-label="Cerrar perfil"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current stroke-[3]">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-2 md:mt-0">
          
          {/* Image Container - Reduced size on mobile */}
          <div className="w-full md:w-[40%] aspect-square md:aspect-[3/4] relative overflow-hidden bg-black card-brutalist border-4 border-black flex-shrink-0 hover:translate-y-0 hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] max-h-[40vh] md:max-h-none">
            <img src={artist.imageSrc} alt={artist.name} className="absolute inset-0 h-full w-full object-cover grayscale-0 opacity-100 lg:grayscale lg:opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
            
            {/* Overlay label */}
            <div className="absolute bottom-4 left-4 right-4 hidden md:block">
              <div className="bg-white p-2 inline-flex card-brutalist-sm border-black">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">REGISTRO_NMD</span>
              </div>
            </div>
          </div>

          {/* Content Container */}
          <div className="w-full md:w-[60%] flex flex-col justify-start md:py-4">
            
            <div className="flex flex-col border-b-4 border-black pb-4 md:pb-6 mb-4 md:mb-6">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-mono text-black/60 font-black mb-2 md:mb-3">
                // Miembro del Colectivo
              </p>
              <h2 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter text-black uppercase leading-none mb-3">
                {artist.name}
              </h2>

              {/* Disciplines tags explicitly visible in modal now */}
              {artist.disciplines && artist.disciplines.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {artist.disciplines.map((tag, idx) => (
                    <span key={idx} className="font-mono text-[10px] md:text-xs text-black border-2 border-black bg-white px-2 py-1 uppercase tracking-widest font-bold">
                      [ {tag} ]
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex-grow space-y-4">
              <p className="text-base md:text-xl text-black font-bold leading-relaxed font-sans">
                {artist.blurb}
              </p>
              
              {/* Added Bio which is in the data but wasn't displayed previously */}
              {artist.bio && (
                  <p className="text-sm md:text-lg text-black/80 leading-relaxed font-sans">
                    {artist.bio}
                  </p>
              )}
            </div>

            <div className="mt-6 md:mt-8 pt-6 border-t-4 border-black border-dashed md:border-solid">
              <h3 className="text-xs md:text-sm uppercase tracking-[0.2em] text-black font-black mb-4 md:mb-6">
                Redes & Contacto ::
              </h3>
              <div className="flex flex-wrap gap-3 md:gap-4 pb-8 md:pb-0">
                {artist.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${artist.name} en ${social.name}`}
                    className="h-12 w-12 md:h-14 md:w-14 flex items-center justify-center bg-white text-black hover:bg-black hover:text-white btn-brutalist border-[3px] md:border-black active:translate-x-[2px] active:translate-y-[2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:shadow-none p-0"
                  >
                    <span className="sr-only">{social.name}</span>
                    <div className="scale-90 md:scale-110">
                      {getSocialIcon(social.name)}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
