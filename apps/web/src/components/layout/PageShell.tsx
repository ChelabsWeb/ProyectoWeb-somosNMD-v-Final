"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState, type FC, type ReactNode } from "react";
import { CustomCursor } from "@/components/system/CustomCursor";
import { LenisProvider } from "@/context/LenisContext";

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

    const handleLenisScroll = ({ scroll }: { scroll: number }) => {
      currentScroll = scroll;
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
      <div className="relative min-h-screen w-full overflow-x-hidden bg-neutral-950 text-neutral-50">
        {children}
        <CustomCursor />
      </div>
    </LenisProvider>
  );
};
