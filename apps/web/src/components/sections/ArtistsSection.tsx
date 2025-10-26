"use client";

import type { FC } from "react";
import { Button } from "@nmd/ui";

const ARTIST_PLACEHOLDERS = Array.from({ length: 4 }, (_, index) => ({
  id: `artist-${index + 1}`,
  name: `Artist ${index + 1}`,
  blurb: "Placeholder bio copy for the collective member.",
}));

/**
 * Placeholder artist gallery. Future tasks will swap for horizontal parallax.
 */
export const ArtistsSection: FC = () => (
  <section
    id="artists"
    aria-label="Artists gallery"
    className="bg-black px-6 py-16 text-neutral-50 md:px-12"
  >
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">
          The Collective
        </p>
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Meet the 12 artists powering Project Web NMD.
        </h2>
        <p className="text-neutral-300">
          Placeholder layout for the artist gallery. Replace with horizontal
          parallax cards, motion layers, and overlay interactions.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {ARTIST_PLACEHOLDERS.map((artist) => (
          <article
            key={artist.id}
            className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur"
          >
            <h3 className="text-xl font-medium">{artist.name}</h3>
            <p className="mt-3 text-sm text-neutral-400">{artist.blurb}</p>
            <Button variant="secondary" className="mt-6">
              View Profile
            </Button>
          </article>
        ))}
      </div>
    </div>
  </section>
);
