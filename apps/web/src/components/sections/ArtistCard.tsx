"use client";

import { useLayoutEffect, useRef, type FC } from "react";
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
        y: "-6%",
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
    <article className="group relative aspect-[3/4] w-[min(380px,80vw)] flex-shrink-0 overflow-hidden rounded-3xl border border-neutral-800 bg-black transition-transform duration-500 hover:border-neutral-700">
      <div ref={imageRef} className="absolute inset-0 h-[110%]">
        <Image
          src={artist.imageSrc}
          alt={`${artist.name} portrait`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 40vw, 80vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6">
        <h3 className="text-lg font-semibold text-white">{artist.name}</h3>
        <div className="flex justify-center">
          <Button
            variant="secondary"
            className="pointer-events-auto rounded-2xl px-5 py-2 text-[10px] tracking-[0.28em]"
            onClick={onSelect}
          >
            View Profile
          </Button>
        </div>
      </div>
    </article>
  );
};
