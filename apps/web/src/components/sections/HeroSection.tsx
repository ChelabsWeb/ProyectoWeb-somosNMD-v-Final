"use client";

import { type FC } from "react";
import { ThreeDLogoViewer } from "./ThreeDLogoViewer";


const HERO_IMAGE_SRC = "/assets/hero/nmdfinal-25.jpg";

export const HeroSection: FC = () => {
  return (
    <section id="hero" aria-label="Hero scene" className="relative min-h-screen bg-background overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE_SRC})` }}
        />

        {/* 3D Logo Viewer goes behind, acting as the striking visual element */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-80 mix-blend-multiply">
          <ThreeDLogoViewer />
        </div>

        {/* HUD Frame Elements - Updated for Brutalism */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {/* Brutalist Border Lines */}
          <div className="absolute left-6 top-6 bottom-6 w-px bg-border" />
          <div className="absolute right-6 top-6 bottom-6 w-px bg-border" />
          <div className="absolute top-6 left-6 right-6 h-px bg-border" />
          <div className="absolute bottom-6 left-6 right-6 h-px bg-border" />

          {/* Coordinates / Data Labels */}
          <div className="absolute right-[10px] top-[40%] font-mono text-[10px] !text-white uppercase vertical-text transform rotate-90 origin-right whitespace-nowrap">
            0200 Y 0710 H
          </div>
          <div className="absolute left-[34px] bottom-10 font-mono text-[10px] !text-white uppercase whitespace-nowrap">
            0200 X 1270 W
          </div>
        </div>

        {/* Centered Brutalist Navigation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex gap-1 pointer-events-auto flex-wrap justify-center w-[90vw] md:w-auto">
            <button className="bg-transparent text-white px-4 py-1 text-sm font-bold uppercase hover:bg-white hover:text-black transition-colors rounded-none whitespace-nowrap">
              [ PROYECTOS ]
            </button>
            <button className="bg-transparent text-white border border-white px-4 py-1 text-sm font-bold uppercase hover:bg-white hover:text-black transition-colors rounded-none whitespace-nowrap">
              NOSOTROS
            </button>
            <button className="bg-transparent text-white border border-white px-4 py-1 text-sm font-bold uppercase hover:bg-white hover:text-black transition-colors rounded-none whitespace-nowrap">
              EQUIPO
            </button>
            <button className="bg-transparent text-white border border-white px-4 py-1 text-sm font-bold uppercase hover:bg-[var(--primary)] hover:border-transparent transition-colors rounded-none whitespace-nowrap">
              CONTACTO
            </button>
        </div>

        {/* NOMADES Text - Brutalist Style */}
        <div className="absolute bottom-10 left-0 w-full z-30 px-8 mix-blend-difference text-white flex justify-center overflow-hidden pointer-events-none">
          <h1
            className="text-[14vw] sm:text-[14.5vw] lg:text-[13.5vw] xl:text-[13vw] font-black leading-[0.75] tracking-tight uppercase max-w-full"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            NOMADES
          </h1>
        </div>
      </div>
    </section>
  );
};
