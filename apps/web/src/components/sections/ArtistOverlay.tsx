
"use client";

import type { FC } from "react";
import { Button } from "@nmd/ui";

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
              <div className="flex gap-4 mt-2">
                {artist.socials.map((social) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white">
                    {social.name}
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
