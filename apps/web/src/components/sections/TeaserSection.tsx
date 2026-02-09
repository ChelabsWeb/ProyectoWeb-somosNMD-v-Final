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
      className="relative flex min-h-screen flex-col bg-black text-neutral-50"
    >
      <div className="sticky top-0 z-20 border-b border-white/10 bg-black/80 backdrop-blur-md px-6 py-4 md:px-12">
        <div className="flex justify-between items-baseline">
          <h2 className="text-sm font-mono tracking-[0.5em] text-white uppercase">Archive_04 / Próximo Lanzamiento</h2>
          <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">Estado_Prioridad_Alta</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative">
        {!prefersReducedMotion && (
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
          </div>
        )}

        <div className="relative z-10 w-full max-w-4xl border border-white/10 bg-black p-8 md:p-16 space-y-12">
          <header className="space-y-6 text-center">
            <h3 className="text-5xl md:text-8xl font-bold tracking-tighter text-white uppercase italic">
              LA MEDIANOCHE SE ACERCA
            </h3>
            <p className="mx-auto max-w-xl font-mono text-[10px] text-white/40 uppercase leading-loose tracking-[0.4em]">
              Próximamente más novedades sobre el universo NOMADES. Prepárate para una
              experiencia sensorial única.
            </p>
          </header>

          <div className="flex flex-col items-center justify-center gap-8 mt-12 sm:flex-row">
            <button className="border border-white/10 px-12 py-5 font-mono text-[10px] tracking-[0.4em] text-white/40 uppercase transition-all hover:bg-white hover:text-black hover:border-white">
              [ NOTIFICAR_REGISTRO ]
            </button>
            <button className="font-mono text-[10px] tracking-[0.4em] text-white/20 uppercase hover:text-white transition-colors">
              [ VER_STORYBOARD ]
            </button>
          </div>

          <div className="pt-12 flex justify-center">
            <div className="flex gap-2">
              <div className="h-1 w-8 bg-white/40" />
              <div className="h-1 w-8 bg-white/20" />
              <div className="h-1 w-8 bg-white/10" />
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 p-4 font-mono text-[8px] tracking-[0.5em] text-white/10 italic text-right uppercase">
        NMD_SYS_MSG: ACCEDER_A_LA_DATA_BAJO_SU_PROPIO_RIESGO
      </footer>
    </section>
  );
};
