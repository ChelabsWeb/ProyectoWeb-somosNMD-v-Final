"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type FC } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@nmd/ui";
import { useReducedMotionPreference } from "@nmd/animation";

const HERO_IMAGE_SRC = "/assets/hero/nmdfinal-25.jpg";
const MASK_MAX = 140;

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();
  const [ready, setReady] = useState(false);

  const overlayStyle = useMemo(
    () =>
      ({
        clipPath: "circle(var(--mask-progress, 0%) at 50% 50%)",
        WebkitClipPath: "circle(var(--mask-progress, 0%) at 50% 50%)",
      }) as CSSProperties,
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: prefersReducedMotion ? 0.3 : 0.8,
          ease: "power2.out",
          delay: 0.2,
          onComplete: () => setReady(true),
        },
      );
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    const contentEl = contentRef.current;
    if (!section || !overlay || !contentEl) {
      return;
    }

    if (prefersReducedMotion) {
      overlay.style.setProperty("--mask-progress", `${MASK_MAX}%`);
      Array.from(contentEl.children).forEach((child) => {
        const el = child as HTMLElement;
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(overlay, { "--mask-progress": "0%" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=60%",
          scrub: true,
        },
      });

      timeline.to(overlay, {
        duration: 1,
        ease: "power3.out",
        onUpdate: function () {
          const value = this.progress() * MASK_MAX + 10;
          overlay.style.setProperty(
            "--mask-progress",
            `${Math.min(value, MASK_MAX)}%`,
          );
        },
      });

      gsap.fromTo(
        contentEl.children,
        {
          y: 40,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.35,
        },
      );
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
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
      style={{ pointerEvents: ready ? "auto" : "none" }}
    >
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
          className="absolute inset-0 bg-neutral-950/85 transition-[clip-path]"
          style={overlayStyle}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 max-w-3xl space-y-6"
        aria-live="polite"
      >
        <p className="text-xs uppercase tracking-[0.5em] text-neutral-300/80">
          Midnight is Close
        </p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          Enter the living music video from the NMD collective.
        </h1>
        <p className="max-w-2xl text-base text-neutral-200/90 sm:text-lg">
          Scroll to peel back the city mask inspired by GTA VI. Motion, sound,
          and navigation markers sync so you instantly know where to dive next.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="primary"
            className="px-8 py-3 text-[11px] tracking-[0.4em]"
            onClick={() => handleScrollTo("music")}
          >
            Listen on Spotify
          </Button>
          <Button
            variant="secondary"
            className="px-8 py-3 text-[11px] tracking-[0.4em]"
            onClick={() => handleScrollTo("artists")}
          >
            Explore Artists
          </Button>
        </div>
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-400/80">
          Scroll to reveal
        </p>
      </div>
    </section>
  );
}
