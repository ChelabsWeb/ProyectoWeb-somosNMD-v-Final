"use client";

import type { FC } from "react";

/**
 * Placeholder hero that will evolve into scroll-mask reveal.
 */
export const HeroSection: FC = () => (
  <section
    id="hero"
    aria-label="Hero scene"
    className="flex min-h-[80vh] flex-col justify-end gap-6 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black px-6 py-16 text-neutral-50 md:px-12"
  >
    <div className="max-w-2xl space-y-4">
      <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">
        Midnight is Close
      </p>
      <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
        Enter the living music video experience for the NMD collective.
      </h2>
      <p className="text-base text-neutral-300 sm:text-lg">
        This is a stub hero. Upcoming stories will replace it with the scroll
        mask reveal, 3D logo transition, and motion-controlled audio entry.
      </p>
    </div>
  </section>
);

