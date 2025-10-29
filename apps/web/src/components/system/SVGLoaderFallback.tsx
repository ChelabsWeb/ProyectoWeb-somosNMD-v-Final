"use client";

import Image from "next/image";
import { useEffect, useRef, type FC } from "react";
import gsap from "gsap";

type SVGLoaderFallbackProps = {
  prefersReducedMotion: boolean;
};

export const SVGLoaderFallback: FC<SVGLoaderFallbackProps> = ({
  prefersReducedMotion,
}) => {
  const logoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!logoRef.current || prefersReducedMotion) {
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

  return (
    <div
      ref={logoRef}
      className="flex h-48 w-48 items-center justify-center md:h-64 md:w-64"
    >
      <Image
        src="/assets/logo/logoNMD.svg"
        alt="Project Web NMD logo"
        width={192}
        height={192}
        priority
        className="brightness-0 invert"
      />
    </div>
  );
};
