"use client";

import { useEffect, useRef, useState, type FC } from "react";
import { ArtistCard } from "./ArtistCard";
import { useReducedMotionPreference } from "@nmd/animation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArtistOverlay } from "./ArtistOverlay";
import { ParticleBackground } from "@/components/system/ParticleBackground";
import { trackEvent } from "../../lib/analytics";

type ArtistEntry = {
  id: string;
  name: string;
  blurb: string;
  imageSrc: string;
  socials: { name: string; url: string }[];
};

const ARTIST_PLACEHOLDERS: ArtistEntry[] = [
  {
    id: "artist-caba",
    name: "Caba",
    blurb: "Director creativo y storyteller visual del colectivo.",
    imageSrc: "/assets/artists/Caba.jpg",
    socials: [
      { name: "Instagram", url: "#" },
      { name: "Spotify", url: "#" },
      { name: "YouTube", url: "#" },
    ],
  },
  {
    id: "artist-gervi",
    name: "Gervi",
    blurb: "Beatmaker experimental y arquitecto sonoro.",
    imageSrc: "/assets/artists/Gervi.jpg",
    socials: [
      { name: "Instagram", url: "#" },
      { name: "Spotify", url: "#" },
      { name: "SoundCloud", url: "#" },
    ],
  },
  {
    id: "artist-izquierdo",
    name: "Izquierdo",
    blurb: "MC y letrista con barras cinematográficas.",
    imageSrc: "/assets/artists/Izquierdo.jpg",
    socials: [
      { name: "Instagram", url: "#" },
      { name: "Spotify", url: "#" },
      { name: "YouTube", url: "#" },
    ],
  },
  {
    id: "artist-juanma",
    name: "JuanMa",
    blurb: "Voz principal y compositor del universo NMD.",
    imageSrc: "/assets/artists/JuanMa.jpg",
    socials: [
      { name: "Instagram", url: "#" },
      { name: "Spotify", url: "#" },
      { name: "YouTube", url: "#" },
    ],
  },
  {
    id: "artist-justino",
    name: "Justino",
    blurb: "Productor ejecutivo y guardian del sonido final.",
    imageSrc: "/assets/artists/Justino.jpg",
    socials: [
      { name: "Instagram", url: "#" },
      { name: "Spotify", url: "#" },
      { name: "LinkedIn", url: "#" },
    ],
  },
  {
    id: "artist-kenma",
    name: "Kenma",
    blurb: "Productor y beatmaker con ADN trap futurista.",
    imageSrc: "/assets/artists/Kenma.jpg",
    socials: [
      { name: "Instagram", url: "#" },
      { name: "Spotify", url: "#" },
      { name: "SoundCloud", url: "#" },
    ],
  },
  {
    id: "artist-letie",
    name: "Letie",
    blurb: "Cantante neo-soul y curadora de armonías.",
    imageSrc: "/assets/artists/Letie.jpg",
    socials: [
      { name: "Instagram", url: "#" },
      { name: "Spotify", url: "#" },
      { name: "TikTok", url: "#" },
    ],
  },
  {
    id: "artist-luccio",
    name: "Luccio",
    blurb: "Compositor híbrido entre r&b y electrónica.",
    imageSrc: "/assets/artists/Luccio.jpg",
    socials: [
      { name: "Instagram", url: "#" },
      { name: "Spotify", url: "#" },
      { name: "YouTube", url: "#" },
    ],
  },
  {
    id: "artist-luquilla",
    name: "Luquilla",
    blurb: "Diseñadora vocal y exploradora de texturas.",
    imageSrc: "/assets/artists/Luquilla.jpg",
    socials: [
      { name: "Instagram", url: "#" },
      { name: "Spotify", url: "#" },
      { name: "TikTok", url: "#" },
    ],
  },
  {
    id: "artist-nacht",
    name: "Nacht",
    blurb: "DJ y compositor de atmósferas nocturnas.",
    imageSrc: "/assets/artists/Nacht.jpg",
    socials: [
      { name: "Instagram", url: "#" },
      { name: "Spotify", url: "#" },
      { name: "SoundCloud", url: "#" },
    ],
  },
  {
    id: "artist-nei",
    name: "Nei",
    blurb: "Productora audiovisual y arquitecta del live set.",
    imageSrc: "/assets/artists/Nei.jpg",
    socials: [
      { name: "Instagram", url: "#" },
      { name: "Vimeo", url: "#" },
      { name: "YouTube", url: "#" },
    ],
  },
  {
    id: "artist-quei",
    name: "Quei",
    blurb: "Lyricist y curadora de storytelling urbano.",
    imageSrc: "/assets/artists/Quei.jpg",
    socials: [
      { name: "Instagram", url: "#" },
      { name: "Spotify", url: "#" },
      { name: "Twitter", url: "#" },
    ],
  },
] ;


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
      <div className="relative z-10 w-full px-6 pt-12 md:px-12" />

      {prefersReducedMotion ? (
        <div className="relative z-10 mx-auto flex w-full flex-1 items-center px-6 pb-12 md:px-12">
          <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARTIST_PLACEHOLDERS.map((artist) => (
              <div key={artist.id} className="artist-card-batch">
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
        <div className="relative z-10 flex flex-1 items-center overflow-hidden">
          <div
            ref={trackRef}
            id="artists-track"
            className="flex h-full w-max items-center gap-8"
            aria-hidden={false}
            style={{
              paddingLeft: `${sidePadding}px`,
              paddingRight: `${sidePadding}px`,
            }}
          >
            {ARTIST_PLACEHOLDERS.map((artist) => (
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
