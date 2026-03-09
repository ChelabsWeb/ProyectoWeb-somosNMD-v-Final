"use client";

import { LoaderSection } from "@/components/sections/LoaderSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ArtistsSection } from "@/components/sections/ArtistsSection";
import { BookingModalTrigger } from "@/components/sections/booking-modal-trigger";
import { AppReadySignal } from "@/components/system/AppReadySignal";
import { FooterSection } from "@/components/sections/FooterSection";


export default function Home() {
  return (
    <main className="flex flex-col relative w-full">
      <LoaderSection />
      <HeroSection />
      <ArtistsSection />

      <BookingModalTrigger />
      <FooterSection />
      <AppReadySignal />
    </main>
  );
}
