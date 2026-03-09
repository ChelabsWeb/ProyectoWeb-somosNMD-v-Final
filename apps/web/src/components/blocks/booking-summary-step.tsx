"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import type { BookingStateData } from "@/hooks/useBookingFlow";

interface BookingSummaryStepProps {
  bookingData: BookingStateData;
  onConfirm: () => void;
  isPending: boolean;
}

export function BookingSummaryStep({
  bookingData,
  onConfirm,
  isPending,
}: BookingSummaryStepProps) {
  return (
    <div className="flex flex-col p-0 w-full h-full bg-transparent text-white">
      <h3 className="text-2xl md:text-3xl font-sans font-black uppercase tracking-widest text-[#FF4D00] mb-2">
        RESUMEN
      </h3>
      <p className="text-xs font-mono uppercase tracking-widest text-white/60 mb-6 max-w-sm">
        REVISA LOS DATOS DE TU RESERVA ANTES DE CONFIRMAR.
      </p>

      <div className="mb-8 p-6 border-4 border-white shadow-[8px_8px_0_0_#000000] bg-black">
        <h4 className="text-base font-sans font-black uppercase tracking-widest mb-4 pb-2 border-b-4 border-white text-white">
          DETALLES DE LA SESIÓN
        </h4>
        
        <div className="flex flex-col space-y-4 text-sm font-mono uppercase">
          <div className="flex justify-between items-center border-b-2 border-white/20 pb-2">
            <span className="text-white/60 font-black">NOMBRE:</span>
            <span className="font-bold text-right text-white max-w-[200px] truncate">{bookingData.name || "-"}</span>
          </div>

          <div className="flex justify-between items-center border-b-2 border-white/20 pb-2">
            <span className="text-white/60 font-black">EMAIL:</span>
            <span className="font-bold text-right text-white max-w-[200px] truncate">{bookingData.email || "-"}</span>
          </div>

          <div className="flex justify-between items-center border-b-2 border-white/20 pb-2">
            <span className="text-white/60 font-black">FECHA:</span>
            <span className="font-bold text-right text-white">
              {bookingData.date
                ? new Intl.DateTimeFormat("es-UY", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  }).format(bookingData.date)
                : "NO SELECCIONADA"}
            </span>
          </div>

          <div className="flex justify-between items-center border-b-2 border-white/20 pb-2">
            <span className="text-white/60 font-black">HORA:</span>
            <span className="font-bold text-right text-white">
              {bookingData.timeSlot || "NO SELECCIONADA"}
            </span>
          </div>

          <div className="flex justify-between items-center border-b-2 border-white/20 pb-2">
            <span className="text-white/60 font-black">MODALIDAD:</span>
            <span className="font-sans font-black text-right text-[#FF4D00]">
              {bookingData.sessionType === "solo"
                ? "SOLO ESTUDIO"
                : bookingData.sessionType === "producer"
                ? "ESTUDIO + PRODUCTOR"
                : "NO SELECCIONADA"}
            </span>
          </div>

          <div className="flex flex-col border-b-2 border-white/20 pb-2 gap-2">
            <span className="text-white/60 font-black">MOTIVO:</span>
            <span className="font-bold text-white text-xs leading-relaxed max-h-[80px] overflow-y-auto pr-2">
              {bookingData.reason || "-"}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-white/60 font-black">UBICACIÓN:</span>
            <span className="font-bold text-right text-white">
              JUAN PAULLIER 1064
            </span>
          </div>
        </div>
      </div>

      <motion.button
        onClick={onConfirm}
        disabled={isPending}
        aria-busy={isPending}
        className={`w-full py-6 text-xl font-sans font-black uppercase tracking-widest transition-all border-4 rounded-none ${
          !isPending
            ? "bg-[#FF4D00] text-white border-[#FF4D00] shadow-[8px_8px_0_0_#000000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-white hover:text-black hover:border-white"
            : "bg-black text-white/40 border-white/20 cursor-not-allowed shadow-none"
        }`}
      >
        {isPending ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            PROCESANDO...
          </div>
        ) : (
          "CONFIRMAR RESERVA"
        )}
      </motion.button>
    </div>
  );
}
