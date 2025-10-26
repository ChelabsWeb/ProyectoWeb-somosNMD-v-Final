"use client";

import Image from "next/image";
import type { FC } from "react";

const NAV_ITEMS = [
  { href: "#loader", label: "Loader" },
  { href: "#hero", label: "Hero" },
  { href: "#artists", label: "Artists" },
  { href: "#music", label: "Music" },
  { href: "#merch", label: "Merch" },
  { href: "#teaser", label: "Teaser" },
  { href: "#contact", label: "Contact" },
];

export const PrimaryNav: FC = () => (
  <nav
    aria-label="Primary"
    className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/60 backdrop-blur md:top-1/2 md:right-8 md:bottom-auto md:left-auto md:-translate-y-1/2 md:translate-x-0 md:flex-col md:px-3"
  >
    <a
      href="#hero"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      aria-label="Go to hero"
    >
      <Image
        src="/assets/logo/logoNMD.svg"
        alt="Project Web NMD logo"
        width={32}
        height={32}
      />
    </a>
    {NAV_ITEMS.map((item) => (
      <a
        key={item.href}
        href={item.href}
        className="rounded-full px-3 py-2 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        {item.label}
      </a>
    ))}
  </nav>
);
