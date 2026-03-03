"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState, type FC, type ReactNode } from "react";
import { CustomCursor } from "@/components/system/CustomCursor";
import { ParticleBackground } from "@/components/system/ParticleBackground";
import { LenisProvider } from "@/context/LenisContext";
import { AudioProvider } from "@/context/AudioProvider";

gsap.registerPlugin(ScrollTrigger);

type PageShellProps = {
  children: ReactNode;
};

/**
 * Shared page shell used across top-level routes.
 * Integrates Awwwards-style Lenis smooth scrolling and global layout features.
 */
export const PageShell: FC<PageShellProps> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion.matches) return;

    // Awwwards-style ultra-smooth config for Lenis
    const lenisInstance = new Lenis({
      lerp: 0.05,       // Lower lerp for more buttery, trailing momentum
      duration: 1.2,    // Slightly longer duration for perceived elegance
      smoothWheel: true,
      orientation: "vertical",
    });
    requestAnimationFrame(() => {
       
      setLenis(lenisInstance);
    });
    let animationFrameId: number;
    let currentScroll = 0;

    const raf = (time: number) => {
      lenisInstance.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };
    animationFrameId = requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleLenisScroll = (e: any) => {
      currentScroll = e.scroll;
      // Update global CSS variable for custom progress bars or reveals
      document.documentElement.style.setProperty('--scroll-progress', e.progress.toString());
      ScrollTrigger.update();
    };

    lenisInstance.on("scroll", handleLenisScroll);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (typeof value === "number") {
          lenisInstance.scrollTo(value, { immediate: true });
        }
        return currentScroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    const handleRefresh = () => lenisInstance.resize();
    ScrollTrigger.addEventListener("refresh", handleRefresh);
    ScrollTrigger.refresh();

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        lenisInstance.stop();
        cancelAnimationFrame(animationFrameId);
      } else {
        lenisInstance.start();
        animationFrameId = requestAnimationFrame(raf);
      }
    };
    prefersReducedMotion.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenisInstance.off("scroll", handleLenisScroll);
      prefersReducedMotion.removeEventListener("change", handleMotionPreferenceChange);
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
      
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value?: number) {
          if (typeof value === "number") {
             window.scrollTo(0, value);
          }
          return window.scrollY || window.pageYOffset;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: "fixed",
      });
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisProvider value={lenis}>
      <AudioProvider>
        {/* Foundation of the "Tron x Renaissance" Aesthetic: Pure black space, high contrast selection */}
        <div className="relative min-h-screen w-full overflow-x-clip bg-background text-foreground selection:bg-[#FF4D00] selection:text-black">
          
          {/* Global Texture / Cyber-Noise Overlay for depth */}
          <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.035] mix-blend-overlay">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
              <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
          </div>



          <ParticleBackground />
          
          {/* Main content insertion */}
          <main className="relative z-10">
            {children}
          </main>
          
          <CustomCursor />
        </div>
      </AudioProvider>
    </LenisProvider>
  );
};
