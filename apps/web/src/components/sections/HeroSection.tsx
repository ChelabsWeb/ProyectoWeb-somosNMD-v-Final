"use client";

import { type FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThreeDLogoViewer } from "./ThreeDLogoViewer";


const HERO_IMAGE_SRC = "/assets/hero/nmdfinal-25.jpg";

export const HeroSection: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <section id="hero" aria-label="Hero scene" className="relative min-h-screen bg-background overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE_SRC}
          alt="NOMADES Hero Background"
          fill
          priority
          quality={100}
          sizes="(max-width: 768px) 250vw, 100vw" // Pide una imagen mucho más grande en mobile para compensar el object-cover
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

        {/* Centered Brutalist Navigation (Desktop Only) */}
        <nav aria-label="Navegación principal" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 hidden md:flex gap-4 pointer-events-auto flex-wrap justify-center w-[90vw] md:w-auto">
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

        {/* Mobile Hamburger Button */}
        <button
          className={`absolute top-6 right-6 z-[60] md:hidden flex items-center justify-center p-3 bg-black text-white border-2 border-white pointer-events-auto transition-transform ${isMobileMenuOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={isMobileMenuOpen}
        >
          <Menu size={28} strokeWidth={2.5} />
        </button>

        {/* Mobile Fullscreen Menu - Creative Brutalist Design */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-[70] flex flex-col bg-black md:hidden pointer-events-auto border-l-8 border-white overflow-hidden text-white"
            >
              {/* Noise Background Pattern */}
              <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                  <filter id="menuNoise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#menuNoise)" />
                </svg>
              </div>

              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b-4 border-white/20 relative z-10 shrink-0">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#FF4D00]">NMD_OS_V2.0</span>
                  <span className="font-mono text-xs tracking-widest uppercase">SELECCIONAR RUTA</span>
                </div>
                <button
                  className="flex items-center justify-center p-3 bg-white text-black border-2 border-white hover:bg-black hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Cerrar menú"
                >
                  <X size={28} strokeWidth={2.5} />
                </button>
              </div>

              {/* Navigation Links Area */}
              <nav className="flex flex-col flex-1 relative z-10" aria-label="Navegación móvil">
                {[
                  { href: "#hero", label: "01_INICIO" },
                  { href: "#artists", label: "02_ARTISTAS" },
                  { href: "#contacto", label: "03_CONTACTO" }
                ].map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 flex items-center px-6 border-b-4 border-white/10 hover:bg-[#FF4D00] hover:text-black transition-all group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out mix-blend-difference" />
                    
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                      className="w-full flex justify-between items-end relative z-10"
                    >
                      <span className="text-5xl sm:text-6xl font-black uppercase tracking-tighter group-hover:pl-4 transition-all duration-300">
                        {item.label.split('_')[1]}
                      </span>
                      <span className="font-mono text-sm tracking-widest opacity-40 group-hover:opacity-100 mb-2">
                        {item.label.split('_')[0]}
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </nav>

              {/* Status Footer */}
              <div className="p-6 bg-[#FF4D00] text-black relative z-10 shrink-0 border-t-8 border-white flex justify-between items-center">
                <span className="font-mono text-xs font-bold uppercase tracking-widest">SISTEMA_LISTO</span>
                <span className="font-mono text-[10px] uppercase font-bold tracking-[0.3em]">
                  © 2026 Nomades
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
