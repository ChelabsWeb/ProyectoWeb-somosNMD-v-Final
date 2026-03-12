"use client";

import { type FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThreeDLogoViewer } from "./ThreeDLogoViewer";


const HERO_IMAGE_SRC = "/assets/hero/nmdfinal-25.jpg";

export const HeroSection: FC = () => {
  return (
    <section id="hero" aria-label="Hero scene" className="relative min-h-screen bg-background overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE_SRC}
          alt="NOMADES Hero Background"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
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
        <nav aria-label="Navegación principal" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex gap-4 pointer-events-auto flex-wrap justify-center w-[90vw] md:w-auto">
            <Link href="#proyectos" className="bg-transparent text-white border-4 border-white px-6 py-2 text-sm font-black uppercase hover:bg-white hover:text-black transition-all shadow-[6px_6px_0_0_#000000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] rounded-none whitespace-nowrap">
              PROYECTOS
            </Link>
            <Link href="#nosotros" className="bg-transparent text-white border-4 border-white px-6 py-2 text-sm font-black uppercase hover:bg-white hover:text-black transition-all shadow-[6px_6px_0_0_#000000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] rounded-none whitespace-nowrap">
              NOSOTROS
            </Link>
            <Link href="#equipo" className="bg-transparent text-white border-4 border-white px-6 py-2 text-sm font-black uppercase hover:bg-white hover:text-black transition-all shadow-[6px_6px_0_0_#000000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] rounded-none whitespace-nowrap">
              EQUIPO
            </Link>
            <Link href="/contacto" className="bg-[#FF4D00] text-white border-4 border-white px-6 py-2 text-sm font-black uppercase hover:bg-white hover:text-black transition-all shadow-[6px_6px_0_0_#000000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] hover:border-white rounded-none whitespace-nowrap">
              CONTACTO
            </Link>
        </nav>

        {/* NOMADES Text - Brutalist Style */}
        <div className="absolute inset-0 md:inset-auto md:bottom-10 md:left-0 w-full h-full md:h-auto z-30 p-8 md:px-8 mix-blend-difference text-white flex justify-center items-center md:items-end overflow-hidden pointer-events-none">
          <h1
            className="text-[12vh] sm:text-[14vh] md:text-[14.5vw] lg:text-[13.5vw] xl:text-[13vw] font-black leading-[0.85] tracking-tight uppercase [writing-mode:vertical-rl] md:[writing-mode:horizontal-tb] rotate-180 md:rotate-0"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            NOMADES
          </h1>
        </div>
      </div>
    </section>
  );
};
