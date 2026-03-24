"use client";

import { LoaderSection } from "@/components/sections/LoaderSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ArtistsSection } from "@/components/sections/ArtistsSection";
import { AppReadySignal } from "@/components/system/AppReadySignal";
import { FooterSection } from "@/components/sections/FooterSection";
import Image from "next/image";


export default function Home() {
  return (
    <main className="flex flex-col relative w-full">
      <div className="fixed top-8 left-8 z-[45] pointer-events-none">
        <Image
          src="/assets/logo/logoNMD.svg"
          alt="NMD Logo"
          width={44}
          height={44}
          priority
        />
      </div>
      <LoaderSection />
      <HeroSection />
      <ArtistsSection />

      <FooterSection />
      <AppReadySignal />
    </main>
  );
}
