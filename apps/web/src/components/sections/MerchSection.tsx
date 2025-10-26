"use client";

import type { FC } from "react";
import { Button } from "@nmd/ui";

const MERCH_PLACEHOLDERS = [
  {
    id: "neon-hoodie",
    title: "Neon Pulse Hoodie",
    price: "$120",
  },
  {
    id: "aurora-cap",
    title: "Aurora Haze Cap",
    price: "$48",
  },
  {
    id: "signal-poster",
    title: "Signal Distortion Poster",
    price: "$35",
  },
];

export const MerchSection: FC = () => (
  <section
    id="merch"
    aria-label="Merch shop teaser"
    className="bg-black px-6 py-16 text-neutral-50 md:px-12"
  >
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">
          Merch Drop
        </p>
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Shop the immersive collection.
        </h2>
        <p className="text-neutral-300">
          The full commerce experience will arrive in Epic 4. For now, this
          section acts as a visual placeholder for featured products and cart
          interactions.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {MERCH_PLACEHOLDERS.map((item) => (
          <article
            key={item.id}
            className="flex flex-col gap-3 rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur"
          >
            <div className="aspect-square rounded-2xl bg-neutral-800/60" />
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="text-sm text-neutral-400">{item.price}</p>
            <Button variant="secondary" className="mt-auto">
              Add to Cart
            </Button>
          </article>
        ))}
      </div>
    </div>
  </section>
);
