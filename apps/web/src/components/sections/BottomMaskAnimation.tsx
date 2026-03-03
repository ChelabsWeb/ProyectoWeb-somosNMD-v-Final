"use client";

import { useLayoutEffect, useRef, type FC, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotionPreference } from "@nmd/animation";
import { trackEvent } from "../../lib/analytics";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HERO_LOGO_MASK = "/assets/logo/logoNMD.svg";
const INITIAL_LOGO_SCALE = 80;
const FINAL_LOGO_SCALE = 0.15;
const INITIAL_LOGO_Y_OFFSET = 0;
const FINAL_LOGO_Y_OFFSET = 200;

type MaskOverlayProps = {
  overlayRectRef: RefObject<SVGRectElement | null>;
  logoGroupRef: RefObject<SVGGElement | null>;
};

export const BottomMaskAnimation: FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayRectRef = useRef<SVGRectElement | null>(null);
  const logoGroupRef = useRef<SVGGElement | null>(null);
  const fadeOutRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const overlayRect = overlayRectRef.current;
    const logoGroup = logoGroupRef.current;
    const fadeOut = fadeOutRef.current;

    if (!section || !overlayRect || !logoGroup || !fadeOut) return;

    if (prefersReducedMotion) {
      gsap.set(overlayRect, { opacity: 1 });
      gsap.set(logoGroup, {
        scale: FINAL_LOGO_SCALE,
        y: FINAL_LOGO_Y_OFFSET,
        transformOrigin: "50% 50%",
        attr: { "transform-box": "fill-box" },
      });
      gsap.set(textRef.current, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(overlayRect, { opacity: 1 });
      gsap.set(logoGroup, {
        transformOrigin: "50% 50%",
        y: INITIAL_LOGO_Y_OFFSET,
        attr: { "transform-box": "fill-box" },
      });
      gsap.set(textRef.current, {
        y: 150,
        opacity: 0,
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
        },
      });

      timeline.fromTo(
        logoGroup,
        { scale: INITIAL_LOGO_SCALE, y: INITIAL_LOGO_Y_OFFSET },
        { scale: FINAL_LOGO_SCALE, y: FINAL_LOGO_Y_OFFSET, duration: 1.2, ease: "expo.inOut" },
        0
      );

      timeline.to(
        textRef.current,
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        0.4
      );

      timeline.to(fadeOut, { autoAlpha: 1, duration: 0.5 }, "-=0.5");
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="hero-mask-section bg-background" aria-label="End mask animation">
      <div className="hero-mask-sticky">
        <div ref={containerRef} className="hero-mask-image bg-black" />

        <MaskOverlay overlayRectRef={overlayRectRef} logoGroupRef={logoGroupRef} />

        <div ref={fadeOutRef} className="absolute inset-0 bg-black opacity-0 z-50 pointer-events-none" />

        <div className="relative z-10 flex min-h-screen flex-col justify-center items-center text-white pointer-events-none">
          <div className="pointer-events-none w-full z-30 mb-10 px-8 mix-blend-difference flex justify-center overflow-hidden">
            <h1
              ref={textRef}
              className="text-[14vw] sm:text-[14.5vw] lg:text-[13.5vw] xl:text-[13vw] font-black leading-[0.75] tracking-tight uppercase max-w-full"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              NOMADES
            </h1>
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
            id="bottomMaskCutout"
            x="0"
            y="0"
            width="100%"
            height="100%"
            maskUnits="userSpaceOnUse"
            mask-type="luminance"
          >
            <rect x="0" y="0" width="1920" height="1080" fill="white" />
            <g ref={logoGroupRef} transform="translate(960 540)">
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
          fill="var(--background)"
          mask="url(#bottomMaskCutout)"
          opacity="1"
        />
      </svg>
    </div>
  );
}
