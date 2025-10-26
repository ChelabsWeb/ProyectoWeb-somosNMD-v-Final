"use client";

import Image from "next/image";
import { useEffect, useRef, type FC } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotionPreference } from "@nmd/animation";

const HERO_IMAGE_SRC = "/assets/hero/nmdfinal-25.jpg";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    if (!section || !overlay) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(overlay, { autoAlpha: 0 });
      gsap.to(overlay, {
        autoAlpha: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=80%",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    el.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero scene"
      className="relative flex min-h-screen flex-col justify-end gap-6 overflow-hidden px-6 py-16 text-neutral-50 md:px-12"
    >
      <div className="pointer-events-none absolute left-6 top-6 z-20 md:left-12 md:top-10">
        <Image
          src="/assets/logo/logoNMD.svg"
          alt="Project Web NMD logo"
          width={72}
          height={72}
          priority
        />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <Image
          src={HERO_IMAGE_SRC}
          alt="Hero backdrop for Project Web NMD"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-neutral-950/85"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
      </div>

      <div className="relative z-10 flex w-full justify-start px-6 py-16 md:px-12">
        <div
          className="flex flex-col items-start gap-4 text-left"
          style={{
            fontFamily:
              '"Impact", "Haettenschweiler", "Arial Narrow Bold", sans-serif',
          }}
        >
          <button
            type="button"
            onClick={() => handleScrollTo("artists")}
            className="hero-nav-link text-left text-5xl uppercase tracking-[0.2em] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:text-6xl"
          >
            Artists
          </button>
          <button
            type="button"
            onClick={() => handleScrollTo("music")}
            className="hero-nav-link text-left text-5xl uppercase tracking-[0.2em] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:text-6xl"
          >
            Music
          </button>
          <button
            type="button"
            onClick={() => handleScrollTo("contact")}
            className="hero-nav-link text-left text-5xl uppercase tracking-[0.2em] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:text-6xl"
          >
            Contact
          </button>
        </div>
      </div>
    </section>
  );
}
