"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FC } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotionPreference } from "@nmd/animation";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE_SRC = "/assets/hero/nmdfinal-25.jpg";

export const HeroIntroSection: FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();
  const [isPinned, setIsPinned] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsPinned(false);
      return;
    }
    const section = sectionRef.current;
    const mask = maskRef.current;
    if (!section || !mask) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(section, { height: "140vh" });
      gsap.set(mask, {
        scale: 1.8,
        opacity: 0.45,
        filter: "blur(18px)",
        transformOrigin: "50% 50%",
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onEnterBack: () => setIsPinned(true),
          onLeave: () => setIsPinned(false),
        },
      })
        .to(section, { height: "100vh", ease: "power2.out" }, 0)
        .to(mask, { scale: 1, ease: "power2.out" }, 0)
        .to(mask, { opacity: 0.95, ease: "power2.out" }, 0)
        .to(mask, { filter: "blur(0px)", ease: "power2.out" }, 0);
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="hero-intro flex items-center justify-center bg-black text-neutral-50"
      aria-hidden
    >
      <div className="hero-intro-background" aria-hidden />
      <div
        ref={maskRef}
        className="hero-intro-mask"
        role="presentation"
        style={{
          backgroundImage: `url(${HERO_IMAGE_SRC})`,
          willChange: isPinned ? "transform, filter, opacity" : undefined,
        }}
      />
    </section>
  );
};

