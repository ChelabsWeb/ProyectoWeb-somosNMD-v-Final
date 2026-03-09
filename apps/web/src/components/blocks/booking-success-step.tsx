"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface BookingSuccessStepProps {
  onReset: () => void;
}

export function BookingSuccessStep({ onReset }: BookingSuccessStepProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-16 w-full h-full bg-transparent text-white text-center min-h-[400px]">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <CheckCircle2 className="w-24 h-24 text-[#FF4D00] mb-6 mx-auto" strokeWidth={3} />
      </motion.div>
      
      <h3 className="text-3xl md:text-5xl font-sans font-black uppercase tracking-widest text-[#FF4D00] mb-4">
        ¡RESERVA SOLICITADA!
      </h3>
      
      <p className="text-sm md:text-base font-mono uppercase tracking-widest text-white/70 max-w-md mx-auto mb-12">
        HEMOS RECIBIDO TU SOLICITUD. TE ENVIAREMOS UN EMAIL DE CONFIRMACIÓN EN BREVE CON TODOS LOS DETALLES DE TU SESIÓN.
      </p>
      
      <motion.button
        onClick={onReset}
        className="bg-black text-white font-sans font-black uppercase tracking-widest border-4 border-black px-8 py-4 text-xl shadow-[8px_8px_0_0_#FF4D00] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all rounded-none"
      >
        NUEVA RESERVA
      </motion.button>
    </div>
  );
}
