
"use client";

import Image from "next/image";
import type { FC, ReactNode } from "react";
import { Button } from "@nmd/ui";

type SocialPlatform =
  | "instagram"
  | "spotify"
  | "youtube"
  | "soundcloud"
  | "linkedin"
  | "tiktok"
  | "twitter"
  | "discord"
  | "whatsapp";

const SOCIAL_ICONS: Record<SocialPlatform, ReactNode> = {
  instagram: (
    <svg
      viewBox="0 0 448 512"
      aria-hidden="true"
      className="h-6 w-6 fill-current"
    >
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.8 224.1 370.8 339 319.5 339 255.9 287.7 141 224.1 141zm0 188.6a73.7 73.7 0 1 1 73.7-73.7 73.8 73.8 0 0 1-73.7 73.7zm146.4-194.3a26.6 26.6 0 1 1-26.6-26.6 26.6 26.6 0 0 1 26.6 26.6zm76.1 27c-1.7-35.9-9.9-67.7-36.2-93.9s-58-34.4-93.9-36.2c-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.7 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2s34.4-58 36.2-93.9c2.1-37 2.1-147.8 0-184.9zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
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
  twitter: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 fill-current"
    >
      <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775a4.958 4.958 0 0 0 2.163-2.723 9.88 9.88 0 0 1-3.127 1.195 4.92 4.92 0 0 0-8.384 4.482A13.978 13.978 0 0 1 1.671 3.149a4.823 4.823 0 0 0 1.523 6.573 4.9 4.9 0 0 1-2.23-.616v.061a4.923 4.923 0 0 0 3.946 4.827 4.936 4.936 0 0 1-2.224.084 4.928 4.928 0 0 0 4.604 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.01-7.514 14.01-14.028 0-.213-.004-.425-.014-.636a10.012 10.012 0 0 0 2.41-2.519z" />
    </svg>
  ),
  discord: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 fill-current"
    >
      <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.249a18.626 18.626 0 0 0-5.517 0 12.64 12.64 0 0 0-.617-1.25.076.076 0 0 0-.079-.037A19.735 19.735 0 0 0 3.68 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.029 16.72 16.72 0 0 0 1.226-1.994.076.076 0 0 0-.041-.105 13.138 13.138 0 0 1-1.867-.89.077.077 0 0 1-.008-.128c.12-.096.247-.199.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.1.246.198.373.293a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.868.889.076.076 0 0 0-.04.106c.36.698.772 1.362 1.225 1.993a.077.077 0 0 0 .084.03 19.88 19.88 0 0 0 5.995-3.03.077.077 0 0 0 .03-.055c.5-5.177-.838-9.674-3.548-13.664a.06.06 0 0 0-.031-.03zM8.02 15.335c-1.182 0-2.155-1.086-2.155-2.419 0-1.332.955-2.418 2.155-2.418 1.21 0 2.173 1.095 2.155 2.418 0 1.333-.955 2.419-2.155 2.419zm7.974 0c-1.182 0-2.155-1.086-2.155-2.419 0-1.332.955-2.418 2.155-2.418 1.21 0 2.173 1.095 2.155 2.418 0 1.333-.945 2.419-2.155 2.419z" />
    </svg>
  ),
  whatsapp: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 fill-current"
    >
      <path d="M20.52 3.48A11.78 11.78 0 0 0 12.065 0C5.485 0 .124 5.333.122 11.884c0 2.095.547 4.142 1.588 5.934L0 24l6.356-1.666a11.86 11.86 0 0 0 5.688 1.449h.005c6.58 0 11.94-5.331 11.94-11.884a11.82 11.82 0 0 0-3.47-8.419zm-8.413 18.297h-.003a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.437-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.896 6.99c-.003 5.45-4.439 9.884-9.889 9.884zm5.785-7.395c-.297-.149-1.758-.867-2.03-.965-.273-.099-.472-.149-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.521.149-.173.198-.298.298-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.21-.242-.579-.486-.5-.669-.51h-.57c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    </svg>
  ),
};

const normalizeSocialPlatform = (platform: string): SocialPlatform | null => {
  const slug = platform.toLowerCase();
  switch (slug) {
    case "ig":
    case "instagram":
      return "instagram";
    case "spotify":
      return "spotify";
    case "youtube":
      return "youtube";
    case "yt":
      return "youtube";
    case "soundcloud":
      return "soundcloud";
    case "linkedin":
      return "linkedin";
    case "tiktok":
      return "tiktok";
    case "twitter":
    case "x":
      return "twitter";
    case "discord":
      return "discord";
    case "whatsapp":
      return "whatsapp";
    default:
      return null;
  }
};

const getSocialIcon = (platform: string): ReactNode => {
  const normalized = normalizeSocialPlatform(platform);
  if (normalized) {
    return SOCIAL_ICONS[normalized];
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
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
              <Image
                src={artist.imageSrc}
                alt={artist.name}
                fill
                sizes="(min-width: 768px) 240px, 60vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-semibold">{artist.name}</h2>
            <p className="mt-4 text-neutral-300">{artist.blurb}</p>
            <div className="mt-6">
              <h3 className="font-semibold">Socials</h3>
              <div className="mt-3 flex justify-center md:justify-start">
                <div className="social-links-card">
                  {artist.socials.map((social) => {
                    const platformSlug = normalizeSocialPlatform(social.name) ?? "default";
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${artist.name} on ${social.name}`}
                        data-platform={platformSlug}
                        className="social-links-card__link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                      >
                        <span className="sr-only">{social.name}</span>
                        {getSocialIcon(social.name)}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
