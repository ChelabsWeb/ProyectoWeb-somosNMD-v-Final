
"use client";

import { useEffect, useMemo, useId, type FC } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadLinksPreset } from "@tsparticles/preset-links";
import { useReducedMotionPreference } from "@nmd/animation";

type ParticleBackgroundProps = {
  className?: string;
};

export const ParticleBackground: FC<ParticleBackgroundProps> = ({
  className = "",
}) => {
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadLinksPreset(engine);
    });
  }, []);

  const instanceId = useId();

  const options = useMemo(
    () => ({
      preset: "links",
      background: {
        color: {
          value: "transparent",
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.1,
          width: 1,
        },
        move: {
          direction: "none" as const,
          enable: true,
          outModes: {
            default: "bounce" as const,
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.1,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
      fullScreen: {
        enable: false,
        zIndex: -1,
      },
    }),
    []
  );

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
    >
      <Particles
        id={instanceId}
        options={options}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};
