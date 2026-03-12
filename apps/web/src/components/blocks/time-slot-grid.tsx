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
  isMobile?: boolean;
  mobileStep?: "date" | "time";
}

export function TimeSlotGrid({ onNext, isMobile, mobileStep = "date" }: TimeSlotGridProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  const { data: availableSlots = [], isLoading, isError, error } = useBookingSlots(date);

  useEffect(() => {
    if (isError) {
      sileo.error({ title: error instanceof Error ? error.message : "Error al obtener disponibilidad" });
    }
  }, [isError, error]);

  return (
    <div className="flex flex-col gap-8 md:gap-6 md:flex-row md:items-start p-0 md:p-8 w-full bg-transparent text-white">
      {(!isMobile || mobileStep === "date") && (
        <div className="w-full shrink-0 h-max md:flex-1 md:min-w-[300px] animate-in slide-in-from-left-4 fade-in duration-300">
        <h3 className="text-xl md:text-2xl font-sans font-black uppercase tracking-widest text-[#FF4D00] mb-4 md:mb-6">
          SELECCIONA FECHA
        </h3>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="mb-4 md:mb-0"
          locale={es}
          disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
        />
        {isMobile && mobileStep === "date" && (
          <motion.button
            disabled={!date}
            onClick={() => date && onNext(date, "")}
            className={cn(
              "w-full mt-4 py-4 text-lg font-sans font-black uppercase tracking-widest transition-all border-4 rounded-none",
              date 
                ? "bg-[#FF4D00] text-white border-[#FF4D00] shadow-[6px_6px_0_0_#000000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                : "bg-black text-white/40 border-white/20 shadow-none cursor-not-allowed"
            )}
          >
            CONTINUAR AL HORARIO
          </motion.button>
        )}
      </div>
      )}

      {(!isMobile || mobileStep === "time") && (
      <div className={cn(
        "w-full md:flex-1 flex flex-col gap-4 transition-opacity duration-300 animate-in slide-in-from-right-4 fade-in", 
        (!date && !isMobile) ? "opacity-30 pointer-events-none" : "opacity-100"
      )}>
        <div className="flex justify-between items-center mb-0 md:mb-2 border-t-4 border-white md:border-t-0 pt-6 md:pt-0">
          <h3 className="text-xl md:text-2xl font-sans font-black uppercase tracking-widest text-[#FF4D00]">
            {date ? format(date, "EEEE d 'de' MMMM", { locale: es }) : "DÍA"}
          </h3>
        </div>
        <p className="text-xs font-mono uppercase tracking-widest text-white/60">SELECCIONA_BLOQUE_[3H]</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative min-h-[250px]">
          {isLoading && (
            <div data-testid="loading-spinner" className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-10">
              <div className="w-8 h-8 bg-[#FF4D00] animate-spin"></div>
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
                className={cn(
                  "px-4 py-6 rounded-none text-center font-sans font-black text-xl transition-all border-4 relative overflow-hidden focus-visible:outline-none border-white",
                  !isAvailable && "opacity-50 cursor-not-allowed bg-white/5 text-white/40 border-white/20",
                  isAvailable && !isSelected && "bg-black text-white hover:bg-white hover:text-black shadow-[6px_6px_0_0_#000000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]",
                  isSelected && "bg-[#FF4D00] text-white border-[#FF4D00] shadow-none translate-x-[4px] translate-y-[4px]"
                )}
              >
                {slot}
              </motion.button>
            );
          })}
        </div>
      </div>
      )}
    </div>
  );
}
