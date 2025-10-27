import { LoaderSection } from "@/components/sections/LoaderSection";
import { HeroIntroSection } from "@/components/sections/HeroIntroSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ArtistsSection } from "@/components/sections/ArtistsSection";
import { MusicSection } from "@/components/sections/MusicSection";
import { MerchSection } from "@/components/sections/MerchSection";
import { TeaserSection } from "@/components/sections/TeaserSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { AppReadySignal } from "@/components/system/AppReadySignal";

export default function Home() {
  return (
    <main className="flex flex-col">
      <LoaderSection />
      <HeroIntroSection />
      <HeroSection />
      <ArtistsSection />
      <MusicSection />
      <MerchSection />
      <TeaserSection />
      <ContactSection />
      <AppReadySignal />
    </main>
  );
}
