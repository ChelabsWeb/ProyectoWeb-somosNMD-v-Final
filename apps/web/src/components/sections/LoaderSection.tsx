"use client";

import type { FC } from "react";

/**
 * Placeholder for the cinematic loader scene.
 * Replaces with 3D/GSAP implementation in future stories.
 */
export const LoaderSection: FC = () => (
  <section
    id="loader"
    aria-label="Immersive loader"
    className="flex min-h-[50vh] flex-col items-center justify-center bg-neutral-950 text-neutral-100"
  >
    <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">
      Loading NMD Universe
    </p>
    <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Project Web NMD</h1>
  </section>
);
