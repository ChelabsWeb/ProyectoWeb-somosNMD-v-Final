"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FC } from "react";
import gsap from "gsap";
import { useReducedMotionPreference } from "@nmd/animation";
import { appReadyEventName } from "@/lib/app-ready";

const FALLBACK_TIMEOUT_MS = 7000;
const PROGRESS_DURATION = 3000;

/**
 * Cinematic loader placeholder with animated logo + progress simulation.
 * Will hook into real asset loading once data pipeline lands.
 */
export const LoaderSection: FC = () => {
  const logoRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();
  const [isBlockingScroll, setIsBlockingScroll] = useState(true);
  const animationStartRef = useRef<number>(0);
  const scrollRestorationRef =
    useRef<History["scrollRestoration"] | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if ("scrollRestoration" in window.history) {
      scrollRestorationRef.current = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return () => {
      if (
        scrollRestorationRef.current !== null &&
        "scrollRestoration" in window.history
      ) {
        window.history.scrollRestoration = scrollRestorationRef.current;
      }
    };
  }, []);

  useEffect(() => {
    if (!logoRef.current || prefersReducedMotion) {
      return;
    }

    const isCoarsePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;

    if (isCoarsePointer) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(logoRef.current, {
        scale: 1.08,
        duration: 0.9,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(logoRef.current, {
        filter: "drop-shadow(0 0 16px rgba(255,255,255,0.35))",
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, logoRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const section = containerRef.current;
    if (!section) {
      return;
    }

    const prefersCoarsePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;

    const originalOverflow = document.body.style.overflow;
    let fallbackTimeout: number | null = null;
    let finishTimeout: number | null = null;
    let loaderDone = false;

    const duration =
      prefersReducedMotion || prefersCoarsePointer ? 1200 : PROGRESS_DURATION;

    const finalize = () => {
      if (loaderDone) {
        return;
      }
      loaderDone = true;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      gsap.to(section, {
        autoAlpha: 0,
        duration: prefersReducedMotion ? 0.3 : 0.8,
        ease: "power2.out",
        onComplete: () => {
          section.style.display = "none";
          section.setAttribute("aria-hidden", "true");
          document.body.style.overflow = originalOverflow || "";
          setIsBlockingScroll(false);
        },
      });
    };

    const scheduleFinalize = () => {
      const elapsed = performance.now() - animationStartRef.current;
      const remaining = Math.max(0, duration - elapsed);
      if (finishTimeout) {
        window.clearTimeout(finishTimeout);
      }
      finishTimeout = window.setTimeout(finalize, remaining);
    };

    const showLoader = (reason: "init" | "restore" = "init") => {
      animationStartRef.current = performance.now();
      loaderDone = false;
      section.style.display = "flex";
      section.removeAttribute("aria-hidden");
      gsap.set(section, { autoAlpha: 1 });
      document.body.style.overflow = "hidden";

      setIsBlockingScroll(true);

      if (fallbackTimeout) {
        window.clearTimeout(fallbackTimeout);
      }
      fallbackTimeout = window.setTimeout(scheduleFinalize, FALLBACK_TIMEOUT_MS);

      if (reason === "restore") {
        scheduleFinalize();
      }
    };

    const handleAppReady = () => scheduleFinalize();
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        showLoader("restore");
      }
    };

    showLoader("init");
    window.addEventListener(appReadyEventName, handleAppReady as EventListener);
    window.addEventListener("load", handleAppReady);
    window.addEventListener("pageshow", handlePageShow);
    fallbackTimeout = window.setTimeout(scheduleFinalize, FALLBACK_TIMEOUT_MS);

    return () => {
      if (fallbackTimeout) {
        clearTimeout(fallbackTimeout);
      }
      if (finishTimeout) {
        clearTimeout(finishTimeout);
      }
      window.removeEventListener(
        appReadyEventName,
        handleAppReady as EventListener,
      );
      window.removeEventListener("load", handleAppReady);
      window.removeEventListener("pageshow", handlePageShow);
      document.body.style.overflow = originalOverflow || "";
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      setIsBlockingScroll(false);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="loader"
      aria-label="Immersive loader"
      role="status"
      aria-live="polite"
      aria-busy={isBlockingScroll}
      ref={containerRef}
      className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-neutral-950 text-neutral-100"
      style={{ pointerEvents: isBlockingScroll ? "auto" : "none" }}
    >
      <div
        ref={logoRef}
        className="mt-6 flex h-24 w-24 items-center justify-center"
      >
        <Image
          src="/assets/logo/logoNMD.svg"
          alt="Project Web NMD logo"
          width={96}
          height={96}
          priority
          className="brightness-0 invert"
        />
      </div>
    </section>
  );
};

