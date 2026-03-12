"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FC } from "react";
import gsap from "gsap";
import { useReducedMotionPreference } from "@nmd/animation";
import { appReadyEventName, markLoaderHidden } from "@/lib/app-ready";

const FALLBACK_TIMEOUT_MS = 7000;
const PROGRESS_DURATION = 3000;

/**
 * Cinematic loader placeholder with animated logo + progress simulation.
 * Will hook into real asset loading once data pipeline lands.
 */
export const LoaderSection: FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const maskLogoRef = useRef<SVGGElement | null>(null);
  const whiteLogoRef = useRef<SVGGElement | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();
  const [isBlockingScroll, setIsBlockingScroll] = useState(true);
  const animationStartRef = useRef<number>(0);
  const hasNotifiedHiddenRef = useRef(false);
  const scrollRestorationRef = useRef<History["scrollRestoration"] | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      scrollRestorationRef.current = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return () => {
      if (scrollRestorationRef.current !== null && "scrollRestoration" in window.history) {
        window.history.scrollRestoration = scrollRestorationRef.current;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !maskLogoRef.current || !whiteLogoRef.current) return;
    const originalOverflow = document.body.style.overflow;
    let fallbackTimeout: number | null = null;
    let finishTimeout: number | null = null;
    let loaderDone = false;

    const duration = prefersReducedMotion ? 800 : PROGRESS_DURATION;
    const INIT_SCALE = 0.124;

    const ctx = gsap.context(() => {
      // Set initial scale
      gsap.set([maskLogoRef.current, whiteLogoRef.current], { 
        scale: INIT_SCALE,
        transformOrigin: "50% 50%" // translate handles positioning, scale from center of the logo group
      });
      
      // Pulse animation
      if (!prefersReducedMotion) {
        gsap.to([maskLogoRef.current, whiteLogoRef.current], {
          scale: INIT_SCALE * 1.08,
          duration: 0.9,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.to(whiteLogoRef.current, {
          filter: "drop-shadow(0 0 16px rgba(255,255,255,0.35))",
          duration: 1.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      const finalize = () => {
        if (loaderDone) return;
        loaderDone = true;
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        if (containerRef.current) containerRef.current.style.pointerEvents = "none";
        
        if (!hasNotifiedHiddenRef.current) {
          hasNotifiedHiddenRef.current = true;
          requestAnimationFrame(() => markLoaderHidden());
        }

        // Kill pulse
        gsap.killTweensOf([maskLogoRef.current, whiteLogoRef.current]);

        const tl = gsap.timeline({
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.style.display = "none";
              containerRef.current.setAttribute("aria-hidden", "true");
            }
            document.body.style.overflow = originalOverflow || "";
            setIsBlockingScroll(false);
          }
        });

        if (prefersReducedMotion) {
          tl.to(containerRef.current, { autoAlpha: 0, duration: 0.4 });
        } else {
          // Instantly fade white logo to reveal HeroSection through the hole
          tl.to(whiteLogoRef.current, { opacity: 0, duration: 0.2 }, 0);
          // Expand the mask hole massively
          tl.to(maskLogoRef.current, { scale: 12, duration: 1.6, ease: "expo.inOut" }, 0.1);
          // Fade everything out at the end so it doesn't leave an invisible overlay
          tl.to(containerRef.current, { autoAlpha: 0, duration: 0.4 }, 1.3);
        }
      };

      const scheduleFinalize = () => {
        const elapsed = performance.now() - animationStartRef.current;
        const remaining = Math.max(0, duration - elapsed);
        if (finishTimeout) window.clearTimeout(finishTimeout);
        finishTimeout = window.setTimeout(finalize, remaining);
      };

      const showLoader = (reason: "init" | "restore" = "init") => {
        animationStartRef.current = performance.now();
        loaderDone = false;
        if (containerRef.current) {
          containerRef.current.style.display = "flex";
          containerRef.current.removeAttribute("aria-hidden");
          gsap.set(containerRef.current, { autoAlpha: 1 });
        }
        document.body.style.overflow = "hidden";
        setIsBlockingScroll(true);

        if (fallbackTimeout) window.clearTimeout(fallbackTimeout);
        fallbackTimeout = window.setTimeout(scheduleFinalize, FALLBACK_TIMEOUT_MS);

        if (reason === "restore") scheduleFinalize();
      };

      const handleAppReady = () => scheduleFinalize();
      const handlePageShow = (event: PageTransitionEvent) => {
        if (event.persisted) showLoader("restore");
      };

      showLoader("init");
      window.addEventListener(appReadyEventName, handleAppReady as EventListener);
      window.addEventListener("load", handleAppReady);
      window.addEventListener("pageshow", handlePageShow);
      fallbackTimeout = window.setTimeout(scheduleFinalize, FALLBACK_TIMEOUT_MS);

      return () => {
        if (fallbackTimeout) clearTimeout(fallbackTimeout);
        if (finishTimeout) clearTimeout(finishTimeout);
        window.removeEventListener(appReadyEventName, handleAppReady as EventListener);
        window.removeEventListener("load", handleAppReady);
        window.removeEventListener("pageshow", handlePageShow);
        document.body.style.overflow = originalOverflow || "";
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        setIsBlockingScroll(false);
      };
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="loader"
      aria-label="Immersive loader"
      role="status"
      aria-live="polite"
      aria-busy={isBlockingScroll}
      ref={containerRef}
      className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-transparent pointer-events-none"
      style={{ pointerEvents: isBlockingScroll ? "auto" : "none" }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1920 1080">
        <defs>
          <filter id="white-filter" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
          </filter>
          <filter id="black-filter" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
          </filter>
          <mask id="loader-reveal-mask" x="0" y="0" width="100%" height="100%" maskUnits="userSpaceOnUse" mask-type="luminance">
            <rect width="1920" height="1080" fill="white" />
            <g transform="translate(960 540)">
              <g ref={maskLogoRef} style={{ transformOrigin: "50% 50%", transform: "scale(0.124)" }}>
                <image href="/assets/logo/logoNMD.svg" width="774" height="793.02" x="-387" y="-396.51" filter="url(#black-filter)" />
              </g>
            </g>
          </mask>
        </defs>

        <rect width="1920" height="1080" fill="var(--background)" mask="url(#loader-reveal-mask)" />

        <g transform="translate(960 540)">
          <g ref={whiteLogoRef} style={{ transformOrigin: "50% 50%", transform: "scale(0.124)" }}>
            <image href="/assets/logo/logoNMD.svg" width="774" height="793.02" x="-387" y="-396.51" filter="url(#white-filter)" />
          </g>
        </g>
      </svg>
    </section>
  );
};

