"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type FC } from "react";
import { Button } from "@nmd/ui";
import { useReducedMotionPreference } from "@nmd/animation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const ARTIST_IMAGE_FILES = [
  "01",
  "02",
  "05",
  "08",
  "10",
  "11",
  "13",
  "15",
  "18",
  "19",
  "21",
  "23",
] as const;

const ARTIST_PLACEHOLDERS = ARTIST_IMAGE_FILES.map((suffix, index) => ({
  id: `artist-${suffix}`,
  name: `Artist ${String(index + 1).padStart(2, "0")}`,
  blurb: "Placeholder bio copy for the collective member.",
  imageSrc: `/assets/artists/nmdfinal-${suffix}.jpg`,
}));

/**
 * Horizontal artist gallery with GSAP ScrollTrigger.
 * Falls back to grid when reduced motion preference is enabled.
 */
let scrollTriggerRegistered = false;

export const ArtistsSection: FC = () => {
  const prefersReducedMotion = useReducedMotionPreference();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [sidePadding, setSidePadding] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    if (typeof window === "undefined") {
      return;
    }
    if (!scrollTriggerRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerRegistered = true;
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    if (typeof window === "undefined") {
      return;
    }

    const updateMetrics = () => {
      const section = sectionRef.current;
      const viewportWidth = section?.offsetWidth ?? window.innerWidth;
      const desiredCardWidth = Math.min(420, viewportWidth * 0.85);
      const padding = Math.max(0, (viewportWidth - desiredCardWidth) / 2);
      setSidePadding(padding);
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) {
      return;
    }
    if (typeof window === "undefined") {
      return;
    }
    if (!scrollTriggerRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerRegistered = true;
    }
    if (!ScrollTrigger) {
      return;
    }

    const containerWidth = section.offsetWidth;
    const visibleWidth = Math.max(0, containerWidth - sidePadding * 2);
    const totalScrollWidth = track.scrollWidth;
    const horizontalDistance = Math.max(0, totalScrollWidth - visibleWidth);

    if (horizontalDistance === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -horizontalDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${horizontalDistance + window.innerHeight * 0.6}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      ScrollTrigger.refresh();
    }, section);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion, sidePadding]);

  const artistCards = useMemo(() => {
    const widthClasses = prefersReducedMotion
      ? "w-full"
      : "w-[min(420px,85vw)] flex-shrink-0";
    return ARTIST_PLACEHOLDERS.map((artist) => (
      <article
        key={artist.id}
        className={`group relative flex h-[min(460px,80vh)] ${widthClasses} flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40 backdrop-blur`}
      >
        <div className="relative h-full">
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
          <Button variant="secondary" className="w-auto px-5">
            View Profile
          </Button>
        </div>
      </article>
    ));
  }, [prefersReducedMotion]);

  return (
    <section
      id="artists"
      aria-label="Artists gallery"
      className="relative flex min-h-screen flex-col overflow-hidden bg-black text-neutral-50"
      ref={sectionRef}
    >
      <div className="z-10 w-full px-6 pt-12 md:px-12">
        <div className="mx-auto max-w-6xl space-y-2">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">
            The Collective
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Meet the 12 artists powering Project Web NMD.
          </h2>
          <p className="text-neutral-300">
            Scroll sideways through the lineup. Upcoming iterations will add
            parallax layers, particles, and overlay interactions sourced from
            the CMS.
          </p>
        </div>
      </div>

      {prefersReducedMotion ? (
        <div className="mx-auto flex w-full flex-1 items-center px-6 pb-12 md:px-12">
          <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {artistCards}
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex h-full w-max items-center gap-8"
            aria-hidden={false}
            style={{
              paddingLeft: `${sidePadding}px`,
              paddingRight: `${sidePadding}px`,
            }}
          >
            {artistCards}
          </div>
        </div>
      )}
    </section>
  );
};
