"use client";

import Lenis from "lenis";
import { useEffect, type FC, type ReactNode } from "react";
import { CustomCursor } from "@/components/system/CustomCursor";

type PageShellProps = {
  children: ReactNode;
};

/**
 * Shared page shell used across top-level routes.
 * Adds background gradient and nav spacing.
 */
export const PageShell: FC<PageShellProps> = ({ children }) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (prefersReducedMotion.matches) {
      return;
    }

    const lenis = new Lenis({
      // Slightly lower lerp and longer duration create a softer easing curve.
      lerp: 0.075,
      duration: 1.1,
      smoothWheel: true,
    });

    let animationFrameId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        lenis.stop();
        cancelAnimationFrame(animationFrameId);
      } else {
        lenis.start();
        animationFrameId = requestAnimationFrame(raf);
      }
    };

    prefersReducedMotion.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      prefersReducedMotion.removeEventListener(
        "change",
        handleMotionPreferenceChange,
      );
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-neutral-950 text-neutral-50">
      {children}
      <CustomCursor />
    </div>
  );
};
