"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, type FC, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useReducedMotionPreference } from "@nmd/animation";
import { trackEvent } from "../../lib/analytics";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const HERO_IMAGE_SRC = "/assets/hero/nmdfinal-25.jpg";
const HERO_LOGO_MASK = "/assets/logo/logoNMD.svg";
const INITIAL_LOGO_SCALE = 80;
const FINAL_LOGO_SCALE = 0.15;

// ✅ Nueva forma de definir el desplazamiento Y del logo
const INITIAL_LOGO_Y_OFFSET = 0; // Comienza un poco arriba
const FINAL_LOGO_Y_OFFSET = 200; // Termina centrado

type MaskOverlayProps = {
  overlayRectRef: RefObject<SVGRectElement | null>;
  logoGroupRef: RefObject<SVGGElement | null>;
};

export const HeroSection: FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const overlayRectRef = useRef<SVGRectElement | null>(null);
  const logoGroupRef = useRef<SVGGElement | null>(null);
  const fadeOutRef = useRef<HTMLDivElement | null>(null);
  const hasTrackedCompletionRef = useRef(false);
  const prefersReducedMotion = useReducedMotionPreference();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heroImage = heroImageRef.current;
    const overlayRect = overlayRectRef.current;
    const logoGroup = logoGroupRef.current;
    const fadeOut = fadeOutRef.current;

    if (!section || !heroImage || !overlayRect || !logoGroup || !fadeOut) return;

    if (prefersReducedMotion) {
      gsap.set(heroImage, { scale: 1 });
      gsap.set(overlayRect, { opacity: 1 });
      gsap.set(logoGroup, {
        scale: FINAL_LOGO_SCALE,
        y: FINAL_LOGO_Y_OFFSET,
        transformOrigin: "50% 50%",
        attr: { "transform-box": "fill-box" },
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(overlayRect, { opacity: 1 });
      gsap.set(logoGroup, {
        transformOrigin: "50% 50%",
        y: INITIAL_LOGO_Y_OFFSET,
        attr: { "transform-box": "fill-box" },
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=160%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onLeave: () => {
            if (!hasTrackedCompletionRef.current) {
              trackEvent("hero_scroll_complete");
              hasTrackedCompletionRef.current = true;
            }
          },
        },
      });

      // Imagen del hero (leve zoom-out)
      timeline.to(
        heroImage,
        { scale: 0.85, transformOrigin: "50% 50%", duration: 0.5, ease: "power2.inOut" },
        1.0
      );

      // Animación del logo (de gigante a centrado)
      timeline.fromTo(
        logoGroup,
        { scale: INITIAL_LOGO_SCALE, y: INITIAL_LOGO_Y_OFFSET },
        { scale: FINAL_LOGO_SCALE, y: FINAL_LOGO_Y_OFFSET, duration: 1.2, ease: "expo.inOut" },
        0
      );

      // Suaviza la transición final a negro
      timeline.to(fadeOut, { autoAlpha: 1, duration: 0.5 }, "-=0.5");
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="hero" aria-label="Hero scene" className="hero-mask-section">
      <div className="hero-mask-sticky">
        <div
          ref={heroImageRef}
          className="hero-mask-image"
          style={{ backgroundImage: `url(${HERO_IMAGE_SRC})` }}
        />

        <MaskOverlay overlayRectRef={overlayRectRef} logoGroupRef={logoGroupRef} />

        <div ref={fadeOutRef} className="absolute inset-0 bg-black opacity-0" />

        <div className="relative z-10 flex min-h-screen flex-col justify-end text-neutral-50">
          {/* HUD Frame Elements */}
          <div className="pointer-events-none absolute inset-0 z-20">
            {/* Grid Overlay Dots */}
            <div className="absolute inset-0 opacity-[0.15]"
              style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Corners Crosshairs */}
            <div className="absolute left-6 top-6 h-6 w-6 border-l border-t border-white/30" />
            <div className="absolute right-6 top-6 h-6 w-6 border-r border-t border-white/30" />
            <div className="absolute bottom-6 left-6 h-6 w-6 border-l border-b border-white/30" />
            <div className="absolute right-6 bottom-6 h-6 w-6 border-r border-b border-white/30" />

            {/* Left Technical Bar */}
            <div className="absolute left-6 top-1/2 h-64 w-px -translate-y-1/2 bg-white/10">
              <div className="absolute top-0 left-0 h-8 w-1 bg-white/40" />
              <div className="absolute bottom-0 left-0 h-8 w-1 bg-white/40" />
            </div>

            {/* Data Scanning Label */}
            <div className="absolute left-[34px] top-[20%] font-mono text-[8px] tracking-[0.6em] text-white/40 uppercase vertical-text">
              SYS_SCAN: DATA_STREAM_STABLE...
            </div>
          </div>

          {/* Integrated System Bar - Top */}
          <div className="absolute left-0 top-0 z-30 w-full border-b border-white/10 bg-black/40 p-0 font-mono text-[9px] tracking-[0.4em] text-white/30 uppercase flex justify-between backdrop-blur-sm h-[44px]">
            <div className="flex items-center">
              {/* Logo Integrated */}
              <div className="px-6 border-r border-white/10 flex items-center h-full">
                <Image
                  src="/assets/logo/logoNMD.svg"
                  alt="NMD"
                  width={20}
                  height={20}
                  className="invert opacity-80"
                />
              </div>
              <div className="px-6 flex items-center gap-12 h-full">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span>SYS_ACTIVE</span>
                </div>
                <span className="hidden lg:inline text-white/20">LOC_ Montevideo, UY</span>
                <span className="hidden xl:inline text-white/20">COORDS_ 34.9064 S / 56.1861 W</span>
              </div>
            </div>

            <div className="flex items-center px-6">
              <span className="hidden sm:inline">UNIT_PROTO_v2.0</span>
            </div>
          </div>

          {/* NOMADES Text - Archival Style */}
          <div className="pointer-events-none p-0 border-t border-white/10 bg-black/20 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-end w-full">
              <h1
                className="text-[15vw] font-bold leading-[0.75] tracking-tighter text-white uppercase px-2 py-4"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                NOMADES
              </h1>
              <div className="hidden md:flex flex-1 justify-end border-l border-white/10 p-6 self-stretch items-center">
                <p className="font-mono text-[10px] text-white/30 tracking-[0.2em] max-w-[200px] leading-relaxed uppercase">
                  Colectivo musical independiente basado en Montevideo.
                  Acceso autorizado_2024.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function MaskOverlay({ overlayRectRef, logoGroupRef }: MaskOverlayProps) {
  return (
    <div className="hero-mask-overlay pointer-events-none" aria-hidden="true">
      <svg className="hero-mask-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <mask
            id="heroMaskCutout"
            x="0"
            y="0"
            width="100%"
            height="100%"
            maskUnits="userSpaceOnUse"
            mask-type="luminance"
          >
            <rect x="0" y="0" width="1920" height="1080" fill="white" />
            <g ref={logoGroupRef} id="hero-mask-logo" transform="translate(960 540)">
              <g transform="translate(-387 -396.51)">
                <image
                  href={HERO_LOGO_MASK}
                  width="774"
                  height="793.02"
                  preserveAspectRatio="xMidYMid meet"
                />
              </g>
            </g>
          </mask>
        </defs>

        <rect
          ref={overlayRectRef}
          className="mask-rect"
          x="0"
          y="0"
          width="1920"
          height="1080"
          fill="black"
          mask="url(#heroMaskCutout)"
          opacity="1"
        />
      </svg>
    </div>
  );
}
