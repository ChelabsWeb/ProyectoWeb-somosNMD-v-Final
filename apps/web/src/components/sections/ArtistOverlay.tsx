
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
      className="h-6 w-6 fill-current"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.349 3.608 1.324.975.975 1.262 2.242 1.324 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.349 2.633-1.324 3.608-.975.975-2.242 1.262-3.608 1.324-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.349-3.608-1.324-.975-.975-1.262-2.242-1.324-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.349-2.633 1.324-3.608.975-.975 2.242-1.262 3.608-1.324C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.775.13 4.687.428 3.757 1.358c-.93.93-1.228 2.018-1.286 3.295C2.014 5.332 2 5.741 2 9s.014 3.668.072 4.948c.058 1.277.356 2.365 1.286 3.295.93.93 2.018 1.228 3.295 1.286C8.332 18.986 8.741 19 12 19s3.668-.014 4.948-.072c1.277-.058 2.365-.356 3.295-1.286.93-.93 1.228-2.018 1.286-3.295C21.986 12.668 22 12.259 22 9s-.014-3.668-.072-4.948c-.058-1.277-.356-2.365-1.286-3.295C19.712.428 18.624.13 17.348.072 16.068.014 15.659 0 12 0z" />
      <path d="M12 5.838A6.162 6.162 0 0 0 5.838 12c0 3.403 2.759 6.162 6.162 6.162S18.162 15.403 18.162 12 15.403 5.838 12 5.838zm0 10.162A3.999 3.999 0 1 1 16 12a3.999 3.999 0 0 1-4 3.999z" />
      <circle cx="18.406" cy="5.594" r="1.44" />
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

// This is a placeholder type. In a real application, this would be
// imported from a shared types package.
type Artist = {
  id: string;
  name: string;
  blurb: string;
  imageSrc: string;
  socials: { name: string; url: string }[];
};

type ArtistOverlayProps = {
  artist: Artist | null;
  onClose: () => void;
};

export const ArtistOverlay: FC<ArtistOverlayProps> = ({ artist, onClose }) => {
  if (!artist) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center" onClick={onClose}>
      <div className="relative bg-neutral-900 rounded-3xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-end">
          <Button onClick={onClose} variant="ghost" className="absolute top-4 right-4">
            Close
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img src={artist.imageSrc} alt={artist.name} className="rounded-2xl" />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-semibold">{artist.name}</h2>
            <p className="mt-4 text-neutral-300">{artist.blurb}</p>
            <div className="mt-6">
              <h3 className="font-semibold">Socials</h3>
              <div className="mt-2 flex flex-wrap gap-3">
                {artist.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${artist.name} on ${social.name}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 text-neutral-300 transition hover:border-neutral-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                  >
                    <span className="sr-only">{social.name}</span>
                    {getSocialIcon(social.name)}
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
