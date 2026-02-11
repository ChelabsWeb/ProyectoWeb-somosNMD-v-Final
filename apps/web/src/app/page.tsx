"use client";

import { LoaderSection } from "@/components/sections/LoaderSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SoloPolvoSection } from "@/components/sections/SoloPolvoSection";
import { ArtistsSection } from "@/components/sections/ArtistsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { AppReadySignal } from "@/components/system/AppReadySignal";
import dynamic from "next/dynamic";

const MusicSection = dynamic(() => import("@/components/sections/MusicSection").then(mod => mod.MusicSection), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-black" />
});

export default function Home() {
  return (
    <main className="flex flex-col">
      <LoaderSection />
      <HeroSection />
      <SoloPolvoSection />
      <ArtistsSection />
      <MusicSection />
      <ContactSection />
      <AppReadySignal />
    </main>
  );
}
