"use client";

import { motion } from "framer-motion";
import { type LucideIcon, Headphones, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export type SessionType = "solo" | "producer";

interface SessionTypeCardsProps {
  onNext: (type: SessionType) => void;
  selectedType?: SessionType | null;
}

const SESSION_OPTIONS: {
  id: SessionType;
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: "solo",
    title: "Solo Estudio",
    description: "Espacio totalmente equipado. Conectate y empezá a crear sin distracciones.",
    icon: Headphones,
  },
  {
    id: "producer",
    title: "Estudio + Productor",
    description: "Ingeniero de grabación y productor a tu disposición durante toda la sesión.",
    icon: SlidersHorizontal,
  }
];

export function SessionTypeCards({ onNext, selectedType }: SessionTypeCardsProps) {
  return (
    <div className="flex flex-col p-4 md:p-8 w-full h-full bg-transparent text-white">
      <h3 className="text-xl md:text-2xl font-sans font-black uppercase tracking-widest text-[#FF4D00] mb-2">
        SELECCIONA MODALIDAD
      </h3>
      <p className="text-xs font-mono uppercase tracking-widest text-white/60 mb-6">ELIGE CÓMO QUIERES TRABAJAR.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SESSION_OPTIONS.map((option) => {
          const isSelected = selectedType === option.id;
          
          return (
            <motion.button
              key={option.id}
              onClick={() => onNext(option.id as SessionType)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={isSelected}
              className={cn(
                "flex flex-col items-start p-6 md:p-10 text-left relative overflow-hidden min-h-[260px] md:min-h-[300px] transition-all border-4 border-white rounded-none group justify-between",
                isSelected 
                  ? "bg-[#FF4D00] text-white border-[#FF4D00] shadow-none translate-x-[4px] translate-y-[4px]" 
                  : "bg-black text-white shadow-[8px_8px_0_0_#000000] hover:bg-white hover:text-black hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] hover:border-white"
              )}
            >
              <div className="z-10 mb-6">
                <option.icon className={cn(
                  "w-12 h-12 md:w-16 md:h-16 mb-4 transition-colors",
                  isSelected ? "text-white" : "text-[#FF4D00] group-hover:text-black"
                )} strokeWidth={1.5} />
                <span className="block text-2xl md:text-3xl font-sans font-black uppercase tracking-widest mb-3">
                  {option.title}
                </span>
                <span className={cn(
                  "block font-mono text-sm uppercase tracking-wider leading-relaxed",
                  isSelected ? "text-white/90" : "text-white/70 group-hover:text-black/70"
                )}>
                  {option.description}
                </span>
              </div>

              {/* Decorative brutalist background element */}
              <div 
                className={cn(
                  "absolute -bottom-6 -right-6 w-24 h-24 transition-transform duration-300",
                  isSelected ? "bg-white/20 rotate-45" : "bg-white/10 opacity-0 group-hover:opacity-100"
                )}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
