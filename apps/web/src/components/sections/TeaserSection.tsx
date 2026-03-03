"use client";

import type { FC } from "react";
import { Button } from "@nmd/ui";
import { ParticleBackground } from "@/components/system/ParticleBackground";
import { useReducedMotionPreference } from "@nmd/animation";

export const TeaserSection: FC = () => {
  const prefersReducedMotion = useReducedMotionPreference();

  return (
    <section
      id="teaser"
      aria-label="Upcoming release teaser"
      className="relative flex min-h-screen flex-col bg-background text-foreground px-4 md:px-8 pb-12"
    >
      <div className="sticky top-0 z-20 bg-white border-b border-border px-6 py-5 md:px-12 mb-12">
        <div className="flex justify-between items-baseline">
          <h2 className="text-xl md:text-3xl font-black tracking-tight text-foreground uppercase">// PRÓXIMO LANZAMIENTO</h2>
          <span className="font-mono text-[10px] text-primary uppercase tracking-widest hidden sm:inline">ESTADO_PRIORIDAD_ALTA</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative w-full max-w-6xl mx-auto">
        {!prefersReducedMotion && (
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
          </div>
        )}

        {/* Central Display Container */}
        <div className="relative z-10 w-full border-2 border-border bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-none p-8 md:p-24 space-y-12 overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)]">

          <header className="space-y-8 text-center relative z-10">
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase leading-[0.9]">
              LA MEDIANOCHE
              <br />
              <span className="text-primary">SE ACERCA</span>
            </h3>
            <p className="mx-auto max-w-2xl font-mono text-xs md:text-sm text-foreground/70 uppercase leading-relaxed tracking-widest">
              PRÓXIMAMENTE MÁS NOVEDADES SOBRE EL UNIVERSO NOMADES. PREPÁRATE PARA UNA EXPERIENCIA SENSORIAL ÚNICA.
            </p>
          </header>

          <div className="flex flex-col items-center justify-center gap-6 mt-16 sm:flex-row relative z-10 w-full md:w-auto">
            <button className="relative border-2 border-border bg-black px-12 py-4 font-mono text-sm font-bold tracking-[0.2em] text-white uppercase overflow-hidden transition-all duration-300 hover:bg-primary w-full sm:w-auto">
               [ NOTIFICAR ]
            </button>
            <button className="relative border-2 border-border bg-white px-12 py-4 font-mono text-sm font-bold tracking-[0.2em] text-foreground uppercase overflow-hidden transition-all duration-300 hover:bg-gray-100 w-full sm:w-auto">
              [ VER STORYBOARD ]
            </button>
          </div>

          <div className="pt-16 flex justify-center relative z-10">
            <div className="flex gap-3">
              <div className="h-1 w-10 bg-[#FF4D00]/80 rounded-full shadow-[0_0_10px_#FF4D00]" />
              <div className="h-1 w-10 bg-[#eb2c75]/50 rounded-full" />
              <div className="h-1 w-6 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-8 border-t-2 border-border px-8 py-5 font-mono text-[9px] tracking-widest text-primary font-bold text-center uppercase bg-background w-full hidden md:block">
        NMD_SYS_MSG: ACCEDER_A_LA_DATA_BAJO_SU_PROPIO_RIESGO
      </footer>
    </section>
  );
};

