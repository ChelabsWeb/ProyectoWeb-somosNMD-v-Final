"use client";

import type { FC } from "react";
import { Button } from "@nmd/ui";

export const ContactSection: FC = () => (
  <section
    id="contact"
    aria-label="Collaboration inquiries"
    className="relative flex min-h-screen flex-col bg-black text-neutral-50"
  >
    <div className="sticky top-0 z-20 border-b border-white/10 bg-black/80 backdrop-blur-md px-6 py-4 md:px-12">
      <div className="flex justify-between items-baseline">
        <h2 className="text-sm font-mono tracking-[0.5em] text-white uppercase">Archive_03 / Contacto</h2>
        <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">Canal_Comunicación_NMD</span>
      </div>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-4xl border border-white/10 bg-black">
        {/* Form Header */}
        <div className="border-b border-white/10 p-4 font-mono text-[9px] tracking-[0.3em] text-white/30 uppercase flex justify-between">
          <span>Form_Ref: COLLAB_2024</span>
          <span className="hidden sm:inline">Waiting_For_Input...</span>
        </div>

        <div className="p-8 md:p-12 space-y-12">
          <header className="space-y-4 text-left border-l border-white/20 pl-6">
            <h3 className="text-4xl font-bold tracking-tighter sm:text-6xl text-white uppercase">
              Vamos a crear algo juntos.
            </h3>
            <p className="max-w-xl font-mono text-[10px] text-white/40 uppercase leading-loose tracking-widest">
              Estamos construyendo el futuro del colectivo. Contáctanos para colaboraciones,
              proyectos o simplemente para decir hola.
            </p>
          </header>

          <form className="grid gap-0 border border-white/10">
            <div className="grid md:grid-cols-2 border-b border-white/10">
              <div className="p-6 space-y-2 border-b md:border-b-0 md:border-r border-white/10 group">
                <label className="font-mono text-[9px] text-white/20 uppercase tracking-[0.3em] group-focus-within:text-white transition-colors">
                  01_NOMBRE
                </label>
                <input
                  disabled
                  placeholder="NOMADES_USR"
                  className="w-full bg-transparent font-mono text-sm text-white/40 placeholder:text-white/10 focus:outline-none py-2 uppercase"
                />
              </div>
              <div className="p-6 space-y-2 group">
                <label className="font-mono text-[9px] text-white/20 uppercase tracking-[0.3em] group-focus-within:text-white transition-colors">
                  02_EMAIL
                </label>
                <input
                  disabled
                  placeholder="HOLA@NMD.WORLD"
                  className="w-full bg-transparent font-mono text-sm text-white/40 placeholder:text-white/10 focus:outline-none py-2 uppercase"
                />
              </div>
            </div>
            <div className="p-6 space-y-2 group">
              <label className="font-mono text-[9px] text-white/20 uppercase tracking-[0.3em] group-focus-within:text-white transition-colors">
                03_MENSAJE
              </label>
              <textarea
                disabled
                rows={4}
                placeholder="REGISTRA TU VISIÓN AQUÍ..."
                className="w-full bg-transparent font-mono text-sm text-white/40 placeholder:text-white/10 focus:outline-none py-2 uppercase resize-none"
              />
            </div>
          </form>

          <div className="flex justify-start">
            <button
              disabled
              className="group relative border border-white/10 px-12 py-5 font-mono text-[10px] tracking-[0.4em] text-white/20 uppercase transition-all hover:bg-white hover:text-black hover:border-white disabled:cursor-not-allowed"
            >
              [ ENVIAR_REGISTRO ]
              {/* Optional scanning effect line */}
              <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-white group-hover:w-full transition-all duration-700" />
            </button>
          </div>
        </div>

        {/* Form Footer */}
        <div className="border-t border-white/10 p-4 font-mono text-[8px] tracking-[0.3em] text-white/20 uppercase text-center">
          System_Note: Formulario actualmente en fase de despliegue_NMD_OS
        </div>
      </div>
    </div>
  </section>
);
