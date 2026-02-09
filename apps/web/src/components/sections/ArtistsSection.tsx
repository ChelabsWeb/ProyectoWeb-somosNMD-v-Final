"use client";

import { useEffect, useRef, useState, type FC } from "react";
import { ArtistCard } from "./ArtistCard";
import { useReducedMotionPreference } from "@nmd/animation";
import { ParticleBackground } from "@/components/system/ParticleBackground";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArtistOverlay } from "./ArtistOverlay";
import { trackEvent } from "../../lib/analytics";

import { ARTISTS, type ArtistEntry } from "@/data/artists";


/**
 * Horizontal artist gallery with GSAP ScrollTrigger.
 * Falls back to grid when reduced motion preference is enabled.
 */
let scrollTriggerRegistered = false;
const ARTISTS_SCROLL_TRIGGER_ID = "artists-horizontal-scroll";
export const ArtistsSection: FC = () => {
  const prefersReducedMotion = useReducedMotionPreference();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [sidePadding, setSidePadding] = useState(0);
  const [resetTick, setResetTick] = useState(0);
  const [selectedArtist, setSelectedArtist] = useState<ArtistEntry | null>(null);

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
    if (prefersReducedMotion) return;

    const updateMetrics = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const containerWidth = section.offsetWidth;
      const totalScrollWidth = track.scrollWidth;
      const horizontalDistance = Math.max(0, totalScrollWidth - containerWidth);

      const ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -horizontalDistance,
          ease: "none",
          scrollTrigger: {
            id: ARTISTS_SCROLL_TRIGGER_ID,
            trigger: section,
            start: "top top",
            end: () => `+=${horizontalDistance + window.innerHeight * 0.5}`,
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        ScrollTrigger.refresh();
      }, section);

      return ctx;
    };

    // Give it a small moment for children to mount and layout
    let ctx: gsap.Context | undefined;
    const timer = setTimeout(() => {
      ctx = updateMetrics();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, [prefersReducedMotion, resetTick, sidePadding]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    if (typeof window === "undefined") {
      return;
    }

    const handleReset = () => {
      setResetTick((tick) => tick + 1);
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    window.addEventListener("artists:reset", handleReset);

    return () => {
      window.removeEventListener("artists:reset", handleReset);
    };
  }, [prefersReducedMotion]);

  // ScrollTrigger batch animation for grid layout (reduced motion fallback)
  useEffect(() => {
    if (!prefersReducedMotion) {
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

    const section = sectionRef.current;
    if (!section) {
      return;
    }

    // Set initial state for all artist cards
    gsap.set(".artist-card-batch", { opacity: 0, y: 30 });

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".artist-card-batch", {
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
            overwrite: true,
          }),
        start: "top 85%",
        once: true,
      });

      ScrollTrigger.refresh();
    }, section);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);



  return (
    <section
      id="artists"
      aria-label="Artists gallery"
      className="relative flex min-h-screen flex-col overflow-hidden bg-black text-neutral-50"
      ref={sectionRef}
    >
      <ParticleBackground />
      <div className="relative z-20 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="flex justify-between items-center px-6 py-4 md:px-12">
          <div className="flex gap-12 items-baseline">
            <h2 className="text-sm font-mono tracking-[0.5em] text-white uppercase">Archive_01 / Artistas</h2>
            <span className="hidden md:block font-mono text-[9px] text-white/30 uppercase tracking-widest">Registros_Membresía_NMD</span>
          </div>
          <div className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
            Total_Expedientes: {ARTISTS.length}
          </div>
        </div>
      </div>

      {prefersReducedMotion ? (
        <div className="relative z-10 mx-auto w-full border-x border-white/10 bg-black">
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-white/10">
            {ARTISTS.map((artist) => (
              <div key={artist.id} className="artist-card-batch border-b border-r border-white/10">
                <ArtistCard
                  artist={artist}
                  onSelect={() => {
                    setSelectedArtist(artist);
                    trackEvent("artist_profile_view", { artist_id: artist.id });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex h-[70vh] items-center overflow-hidden border-x border-white/10">
          <div
            ref={trackRef}
            id="artists-track"
            key={resetTick}
            className="flex h-full w-max items-stretch gap-0 bg-transparent"
            aria-hidden={false}
          >
            {ARTISTS.map((artist) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onSelect={() => {
                  setSelectedArtist(artist);
                  trackEvent("artist_profile_view", { artist_id: artist.id });
                }}
              />
            ))}
          </div>
        </div>
      )}
      <ArtistOverlay artist={selectedArtist} onClose={() => setSelectedArtist(null)} />
    </section>
  );
};
