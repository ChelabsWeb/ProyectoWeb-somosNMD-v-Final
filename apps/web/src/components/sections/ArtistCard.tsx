
"use client";

import { useRef, useLayoutEffect, type FC } from "react";
import Image from "next/image";
import { Button } from "@nmd/ui";
import gsap from "gsap";
import { useReducedMotionPreference } from "@nmd/animation";

type Artist = {
  id: string;
  name: string;
  blurb: string;
  imageSrc: string;
};

type ArtistCardProps = {
  artist: Artist;
  onSelect: () => void;
};

export const ArtistCard: FC<ArtistCardProps> = ({ artist, onSelect }) => {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const image = imageRef.current;
    if (!image) return;

    const ctx = gsap.context(() => {
      gsap.to(image, {
        y: "-10%",
        ease: "none",
        scrollTrigger: {
          trigger: image,
          containerAnimation: gsap.getTweensOf("#artists-track")[0],
          start: "left right",
          end: "right left",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <article
      className={`group relative flex h-[min(460px,80vh)] w-[min(420px,85vw)] flex-shrink-0 flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40 backdrop-blur`}
    >
      <div ref={imageRef} className="relative h-full">
        <Image
          src={artist.imageSrc}
          alt={`${artist.name} portrait`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 40vw, 80vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6">
        <h3 className="text-xl font-semibold">{artist.name}</h3>
        <p className="text-sm text-neutral-300">{artist.blurb}</p>
      </div>
      <div className="pointer-events-auto absolute inset-x-0 bottom-6 flex justify-center">
        <Button variant="secondary" className="w-auto px-5" onClick={onSelect}>
          View Profile
        </Button>
      </div>
    </article>
  );
};
