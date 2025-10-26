"use client";

import type { FC } from "react";
import { Button } from "@nmd/ui";
import { useReducedMotionPreference } from "@nmd/animation";

export const TeaserSection: FC = () => {
  const prefersReducedMotion = useReducedMotionPreference();

  return (
    <section
      id="teaser"
      aria-label="Upcoming release teaser"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-purple-700 via-fuchsia-600 to-black px-6 py-20 text-neutral-50 md:px-12"
    >
      {!prefersReducedMotion && (
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="animate-pulse-slow absolute -top-24 left-1/3 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="animate-pulse-slow absolute top-1/3 right-0 h-48 w-48 rounded-full bg-pink-400/40 blur-3xl" />
        </div>
      )}

      <div className="relative mx-auto flex max-w-4xl flex-col gap-6 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-white/60">
          Upcoming Release
        </p>
        <h2 className="text-4xl font-semibold sm:text-5xl">
          Midnight Is Close
        </h2>
        <p className="text-base text-white/70 sm:text-lg">
          Placeholder for the distortion and parallax animation system. Upcoming
          stories will replace this with GSAP+Three orchestration and reduced
          motion fallbacks.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button className="text-purple-700" variant="primary">
            Notify Me
          </Button>
          <Button variant="secondary">View Storyboard</Button>
        </div>
      </div>
    </section>
  );
};
