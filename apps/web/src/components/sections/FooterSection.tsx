"use client";

import type { FC } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const FooterSection: FC = () => {
  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="relative bg-[#e6e6e6] text-black border-t-2 border-black overflow-hidden uppercase font-mono"
    >
      {/* Top Border / Marquee style or small text */}
      <motion.div variants={itemVariants} className="border-b-2 border-black px-6 py-4 flex justify-between items-center text-xs md:text-sm tracking-widest">
        <span>NOMADES_MVD_UY</span>
        <span>© {new Date().getFullYear()} TODOS LOS DERECHOS RESERVADOS</span>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Left Column (Links) */}
        <div className="md:col-span-8 border-r-2 border-black">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-full">
            <motion.div variants={itemVariants} className="border-b-2 sm:border-r-2 border-black p-8 md:p-12 flex flex-col justify-between min-h-[250px]">
              <span className="text-xs mb-8 tracking-[0.2em] opacity-50 block">// REDES</span>
              <ul className="text-2xl md:text-3xl font-black space-y-4 font-sans tracking-tight">
                <li><Link href="https://instagram.com" className="hover:underline flex justify-between items-center">INSTAGRAM <ArrowUpRight className="w-6 h-6" /></Link></li>
                <li><Link href="https://twitter.com" className="hover:underline flex justify-between items-center">TWITTER <ArrowUpRight className="w-6 h-6" /></Link></li>
                <li><Link href="https://youtube.com" className="hover:underline flex justify-between items-center">YOUTUBE <ArrowUpRight className="w-6 h-6" /></Link></li>
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants} className="border-b-2 sm:border-r-2 border-black p-8 md:p-12 flex flex-col justify-between min-h-[250px]">
              <span className="text-xs mb-8 tracking-[0.2em] opacity-50 block">// EXPLORAR</span>
              <ul className="text-2xl md:text-3xl font-black space-y-4 font-sans tracking-tight">
                <li><Link href="#proyectos" className="hover:underline flex justify-between items-center">PROYECTOS <ArrowUpRight className="w-6 h-6" /></Link></li>
                <li><Link href="#equipo" className="hover:underline flex justify-between items-center">EL EQUIPO <ArrowUpRight className="w-6 h-6" /></Link></li>
                <li><Link href="#contacto" className="hover:underline flex justify-between items-center">CONTACTO <ArrowUpRight className="w-6 h-6" /></Link></li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="border-b-2 border-black sm:border-r-0 lg:border-r-0 p-8 md:p-12 flex flex-col justify-between min-h-[250px] col-span-1 sm:col-span-2 lg:col-span-1">
              <span className="text-xs mb-8 tracking-[0.2em] opacity-50 block">// LEGAL</span>
              <ul className="text-xl md:text-2xl font-black space-y-4 font-sans tracking-tight">
                <li><Link href="/terminos" className="hover:underline block">TÉRMINOS Y CONDICIONES</Link></li>
                <li><Link href="/privacidad" className="hover:underline block">POLÍTICA DE PRIVACIDAD</Link></li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Right Column (Big CTA / Email) */}
        <motion.div variants={itemVariants} className="md:col-span-4 p-8 md:p-12 flex flex-col justify-between border-b-2 border-black md:border-b-0">
          <span className="text-xs mb-8 tracking-[0.2em] opacity-50 block">// INICIAR PROPUESTA</span>
          <div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] font-sans tracking-tight mb-8">
              TRABAJEMOS<br/>JUNTOS.
            </h3>
            <a href="mailto:hola@nomades.uy" className="inline-block border-2 border-black px-8 py-4 text-sm font-bold tracking-widest hover:bg-black hover:text-white transition-colors">
              [ ENVIAR EMAIL ]
            </a>
          </div>
        </motion.div>
      </div>

      {/* Massive Bottom Text */}
      <motion.div variants={itemVariants} className="border-t-2 border-black overflow-hidden flex items-end justify-center pt-8 pb-4">
        <h2 
          className="text-[15vw] leading-[0.75] font-black tracking-tighter text-black"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          NOMADES
        </h2>
      </motion.div>
    </motion.footer>
  );
};
