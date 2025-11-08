"use client";

import { useRef, useLayoutEffect, type FC } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotionPreference } from "@nmd/animation";
import { ParticleText, type ParticleTextHandle } from "@/components/effects/ParticleText";
import { trackEvent } from "@/lib/analytics";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const SoloPolvoSection: FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const particleRef = useRef<ParticleTextHandle | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();

  useLayoutEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const section = sectionRef.current;
    const content = contentRef.current;

    // If user prefers reduced motion, set final states and exit
    if (prefersReducedMotion) {
      gsap.set(content, {
        opacity: 1,
      });
      // Set particles to formed state immediately
      particleRef.current?.setProgress(1);
      return;
    }

    // Create GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Progress object for particle formation
      const progressObj = { value: 0 };

      // Set initial states
      gsap.set(content, {
        opacity: 0,
      });

      // Main timeline for particle formation with scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",   // Start when section enters viewport
          end: "center center",  // Complete when section is centered in viewport
          scrub: 1,             // Direct scrubbing for responsive feel
          markers: false,       // Set to true to debug scroll positions
          onUpdate: (self) => {
            // Update particle formation progress
            const progress = self.progress;
            particleRef.current?.setProgress(progress);
            progressObj.value = progress;


            // Track milestones
            if (progress >= 0.25 && !self.vars.milestone25) {
              trackEvent("solo_polvo_formation_25");
              self.vars.milestone25 = true;
            }
            if (progress >= 0.5 && !self.vars.milestone50) {
              trackEvent("solo_polvo_formation_50");
              self.vars.milestone50 = true;
            }
            if (progress >= 0.75 && !self.vars.milestone75) {
              trackEvent("solo_polvo_formation_75");
              self.vars.milestone75 = true;
            }
          },
          onComplete: () => {
            trackEvent("solo_polvo_formation_complete");
          },
        },
      });

      // Fade in content while particles form
      tl.to(content, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }, 0);

      // Refresh ScrollTrigger after a small delay to ensure proper initialization
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
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

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full flex flex-col items-center justify-center"
      >
        <ParticleText
          ref={particleRef}
          text="SOLO POLVO..."
          className="w-full max-w-[1600px] h-[400px] md:h-[500px]"
        />
      </div>
    </section>
  );
};