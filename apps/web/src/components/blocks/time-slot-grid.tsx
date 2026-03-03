"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useBookingSlots } from "@/hooks/use-booking";
import { sileo } from "sileo";
import { motion } from "framer-motion";

const TIME_SLOTS = [
  "09:00 - 12:00",
  "12:00 - 15:00",
  "15:00 - 18:00",
  "18:00 - 21:00",
];

interface TimeSlotGridProps {
  onNext: (date: Date, slot: string) => void;
}

export function TimeSlotGrid({ onNext }: TimeSlotGridProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  const { data: availableSlots = [], isLoading, isError, error } = useBookingSlots(date);

  useEffect(() => {
    if (isError) {
      sileo.error({ title: error instanceof Error ? error.message : "Error al obtener disponibilidad" });
    }
  }, [isError, error]);

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start p-4 md:p-8 bg-white border-2 border-border border-t-0 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
      <div className="flex-1 min-w-[300px]">
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest text-foreground mb-6">
          SELECCIONA FECHA
        </h3>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-none border-2 border-border bg-background text-foreground p-4 font-mono w-full shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
          locale={es}
          disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </div>
      
      <div className="flex-1 flex flex-col gap-4 min-w-[300px]">
        <div>
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest text-primary mb-2">
            {date ? format(date, "EEEE d 'de' MMMM", { locale: es }) : "DÍA"}
          </h3>
          <p className="text-xs font-mono uppercase tracking-widest text-foreground/60">SELECCIONA_BLOQUE_[3H]</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative min-h-[250px]">
          {isLoading && (
            <div data-testid="loading-spinner" className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10 border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <div className="w-8 h-8 bg-primary animate-spin"></div>
            </div>
          )}
          {TIME_SLOTS.map((slot) => {
            const isAvailable = availableSlots.includes(slot);
            const isSelected = selectedSlot === slot;
            
            return (
              <motion.button
                key={slot}
                disabled={!isAvailable || !date || isLoading}
                aria-label={`${slot}, ${isAvailable ? "Disponible" : "Ocupado"}`}
                aria-pressed={isSelected}
                onClick={() => {
                  if (date) {
                    setSelectedSlot(slot);
                    onNext(date, slot);
                  }
                }}
                whileHover={isAvailable && !isSelected ? { scale: 1.02, y: -2 } : {}}
                whileTap={isAvailable ? { scale: 0.95 } : {}}
                className={cn(
                  "px-4 py-6 rounded-none text-center font-mono font-bold transition-all border-2 relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  !isAvailable && "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-300",
                  isAvailable && !isSelected && "bg-white text-foreground hover:bg-black hover:border-black hover:text-white border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)]",
                  isSelected && "bg-primary text-primary-foreground border-primary shadow-[4px_4px_0_0_rgba(230,48,38,0.5)]"
                )}
              >
                {slot}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
