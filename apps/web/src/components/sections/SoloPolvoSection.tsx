"use client";

import { useRef, useLayoutEffect, type FC } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotionPreference } from "@nmd/animation";
import { ParticleText } from "@/components/effects/ParticleText";
import { trackEvent } from "@/lib/analytics";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const SoloPolvoSection: FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();

  useLayoutEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const section = sectionRef.current;
    const content = contentRef.current;

    // If user prefers reduced motion, set final states and exit
    if (prefersReducedMotion) {
      gsap.set(content, {
        opacity: 1,
        scale: 1,
        y: 0,
      });
      return;
    }

    // Create GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(content, {
        opacity: 0,
        scale: 0.8,
        y: 50,
      });

      // Main timeline for section entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          onComplete: () => {
            trackEvent("solo_polvo_section_viewed");
          },
        },
      });

      // Animate content entrance
      tl.to(content, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
      });

      // Add a subtle floating animation that plays continuously
      gsap.to(content, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1,
      });

      // Optional: Add parallax effect for the background gradient
      gsap.to(".solo-polvo-gradient", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    // Cleanup
    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="solo-polvo"
      aria-label="Solo Polvo section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Black and white gradient background */}
      <div className="absolute inset-0 solo-polvo-gradient">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

        {/* Subtle white gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8"
      >
        <ParticleText
          text="SOLO POLVO..."
          className="w-full h-[400px] md:h-[500px]"
        />

        {/* Optional subtitle or additional text */}
        <div className="mt-8 text-center opacity-60">
          <p className="text-xl md:text-2xl text-white/80 font-light tracking-wider">
            Un viaje sonoro que trasciende
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>

      <style jsx>{`
        @keyframes delay-1000 {
          0% {
            animation-delay: 1s;
          }
        }
      `}</style>
    </section>
  );
};