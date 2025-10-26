"use client";

import type { FC } from "react";
import { Button } from "@nmd/ui";

const PROJECT_PLACEHOLDERS = [
  {
    id: "junta",
    title: "Junta",
    description: "Debut collective album with cinematic trap and neon R&B.",
  },
  {
    id: "midnight-is-close",
    title: "Midnight Is Close",
    description: "Teaser EP unlocking the GTA VI-inspired narrative arc.",
  },
];

/**
 * Placeholder music projects grid.
 */
export const MusicSection: FC = () => (
  <section
    id="music"
    aria-label="Music projects"
    className="bg-neutral-950 px-6 py-16 text-neutral-50 md:px-12"
  >
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
          Releases
        </p>
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Listen inside the living music video.
        </h2>
        <p className="text-neutral-300">
          This grid will evolve into animated cards with audio previews powered
          by GSAP timelines and shared hooks.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {PROJECT_PLACEHOLDERS.map((project) => (
          <article
            key={project.id}
            className="flex flex-col gap-4 rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur"
          >
            <div className="aspect-video rounded-2xl bg-neutral-800/50" />
            <div>
              <h3 className="text-xl font-medium">{project.title}</h3>
              <p className="mt-3 text-sm text-neutral-400">
                {project.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button>Play Preview</Button>
              <Button variant="secondary">Spotify</Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
