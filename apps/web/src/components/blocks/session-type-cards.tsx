"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type SessionType = "solo" | "producer";

interface SessionTypeCardsProps {
  onNext: (type: SessionType) => void;
  selectedType?: SessionType | null;
}

const SESSION_OPTIONS = [
  {
    id: "solo",
    title: "Solo Estudio",
    description: "Espacio totalmente equipado. Conectate y empezá a crear sin distracciones.",
  },
  {
    id: "producer",
    title: "Estudio + Productor",
    description: "Ingeniero de grabación y productor a tu disposición durante toda la sesión.",
  }
];

export function SessionTypeCards({ onNext, selectedType }: SessionTypeCardsProps) {
  return (
    <div className="flex flex-col p-4 md:p-8 bg-white border-2 border-border border-t-0 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform w-full">
      <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest text-foreground mb-2">
        SELECCIONA MODALIDAD
      </h3>
      <p className="text-xs font-mono uppercase tracking-widest text-foreground/60 mb-6">ELIGE CÓMO QUIERES TRABAJAR.</p>
      
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
                "flex flex-col items-start p-6 md:p-8 rounded-none border-2 transition-all text-left relative overflow-hidden min-h-[180px]",
                isSelected 
                  ? "bg-primary text-primary-foreground border-primary shadow-[4px_4px_0_0_rgba(230,48,38,0.5)]" 
                  : "bg-background text-foreground border-border hover:bg-black hover:text-white hover:border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
              )}
            >
              <span className="text-2xl font-black uppercase tracking-widest mb-3 z-10">
                {option.title}
              </span>
              <span className={cn(
                "font-mono text-xs uppercase tracking-wider z-10 leading-relaxed",
                isSelected ? "text-primary-foreground/90" : "text-foreground/70 group-hover:text-white/70"
              )}>
                {option.description}
              </span>

              {/* Decorative brutalist background element */}
              <div 
                className={cn(
                  "absolute -bottom-6 -right-6 w-24 h-24 transition-transform duration-300",
                  isSelected ? "bg-white/20 rotate-45" : "bg-border opacity-0 group-hover:opacity-10"
                )}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
