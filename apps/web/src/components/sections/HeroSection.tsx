"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, type FC, type RefObject, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useLenis } from "@/context/LenisContext";
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
  const lenis = useLenis();
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

  const handleScrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el || !lenis) return;

      const distance = Math.abs(el.offsetTop - lenis.scroll);
      const velocity = 1500; // pixels per second
      const duration = distance / velocity;

      trackEvent("hero_cta_click", { target: id });
      lenis.scrollTo(el, { duration: duration, easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) });
    },
    [lenis, prefersReducedMotion],
  );

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

        <div className="relative z-10 flex min-h-screen flex-col justify-end gap-6 px-6 py-16 text-neutral-50 md:px-12">
          <div className="pointer-events-none absolute left-6 top-6 z-20 md:left-12 md:top-10">
            <Image
              src="/assets/logo/logoNMD.svg"
              alt="Project Web NMD logo"
              width={72}
              height={72}
              priority
            />
          </div>

          <div
            className="flex flex-col items-start gap-4 text-left"
            style={{
              fontFamily:
                '"Impact", "Haettenschweiler", "Arial Narrow Bold", sans-serif',
            }}
          >
            <button onClick={() => handleScrollTo("artists")} className="hero-nav-link text-left text-5xl uppercase tracking-[0.2em] text-white md:text-6xl">
              Artists
            </button>
            <button onClick={() => handleScrollTo("music")} className="hero-nav-link text-left text-5xl uppercase tracking-[0.2em] text-white md:text-6xl">
              Music
            </button>
            <button onClick={() => handleScrollTo("contact")} className="hero-nav-link text-left text-5xl uppercase tracking-[0.2em] text-white md:text-6xl">
              Contact
            </button>
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
