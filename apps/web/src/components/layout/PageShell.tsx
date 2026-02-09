"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState, type FC, type ReactNode } from "react";
import { CustomCursor } from "@/components/system/CustomCursor";
import { ParticleBackground } from "@/components/system/ParticleBackground";
import { LenisProvider } from "@/context/LenisContext";
import { AudioProvider } from "@/context/AudioProvider";
import { QuickNavMenu } from "./QuickNavMenu";

gsap.registerPlugin(ScrollTrigger);

type PageShellProps = {
  children: ReactNode;
};

/**
 * Shared page shell used across top-level routes.
 * Adds background gradient and nav spacing.
 */
export const PageShell: FC<PageShellProps> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (prefersReducedMotion.matches) {
      return;
    }

    const lenisInstance = new Lenis({
      // Slightly lower lerp and longer duration create a softer easing curve.
      lerp: 0.075,
      duration: 1.1,
      smoothWheel: true,
    });

    setLenis(lenisInstance);

    let animationFrameId: number;
    let currentScroll = 0;

    const raf = (time: number) => {
      lenisInstance.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    const handleLenisScroll = ({ scroll, limit, progress }: { scroll: number; limit: number; progress: number }) => {
      currentScroll = scroll;
      document.documentElement.style.setProperty('--scroll-progress', progress.toString());
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
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    const handleRefresh = () => {
      lenisInstance.resize();
    };

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
      prefersReducedMotion.removeEventListener(
        "change",
        handleMotionPreferenceChange,
      );
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value?: number) {
          if (typeof value === "number") {
            window.scrollTo(0, value);
          }
          return window.scrollY || window.pageYOffset;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
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
        <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-neutral-50 selection:bg-white selection:text-black">
          {/* Global Grain Texture */}
          <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] mix-blend-overlay">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
              <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
          </div>

          {/* Scroll Progress Indicator - Below System Bar */}
          <div className="fixed top-[44px] left-0 right-0 z-[110] h-[1px] origin-left bg-white/20" style={{ transform: 'scaleX(var(--scroll-progress, 0))' }} />

          <ParticleBackground />
          <QuickNavMenu />
          {children}
          <CustomCursor />
        </div>
      </AudioProvider>
    </LenisProvider>
  );
};
