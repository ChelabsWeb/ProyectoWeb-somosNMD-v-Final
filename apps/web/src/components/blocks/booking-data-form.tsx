"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { bookingFormSchema, type BookingFormData } from "@/lib/validations/booking";
import type { SessionType } from "@/components/blocks/session-type-cards";

interface BookingDataFormProps {
  onSubmit: (data: BookingFormData) => void;
  isPending: boolean;
  bookingData?: {
    date?: Date;
    slot?: string;
    sessionType?: SessionType;
  };
}

export function BookingDataForm({ onSubmit, isPending, bookingData }: BookingDataFormProps) {
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
    mode: "onChange",
  });

  return (
    <div className="flex flex-col p-4 md:p-8 w-full h-full bg-transparent text-white">
      <h3 className="text-2xl md:text-3xl font-sans font-black uppercase tracking-widest text-[#FF4D00] mb-2">
        TUS DATOS
      </h3>
      <p className="text-xs font-mono uppercase tracking-widest text-white/60 mb-6 max-w-xs">
        INGRESÁ TU NOMBRE Y EMAIL PARA SOLICITAR LA RESERVA.
      </p>

      {bookingData && (
        <div className="mb-8 p-6 border-4 border-white shadow-[6px_6px_0_0_#000000] bg-black">
          <h4 className="text-base font-sans font-black uppercase tracking-widest mb-4 pb-2 border-b-4 border-white text-white">RESUMEN DE RESERVA</h4>
          <div className="flex flex-col space-y-4 text-sm font-mono uppercase">
            <div className="flex justify-between items-center border-b-2 border-white/20 pb-2">
              <span className="text-white/60 font-black">FECHA:</span>
              <span className="font-bold text-right text-white">{bookingData.date ? new Intl.DateTimeFormat('es-UY', { weekday: 'long', day: 'numeric', month: 'long' }).format(bookingData.date) : "NO SELECCIONADA"}</span>
            </div>
            <div className="flex justify-between items-center border-b-2 border-white/20 pb-2">
              <span className="text-white/60 font-black">HORA:</span>
              <span className="font-bold text-right text-white">{bookingData.slot || "NO SELECCIONADA"}</span>
            </div>
            <div className="flex justify-between items-center border-b-2 border-white/20 pb-2">
              <span className="text-white/60 font-black">MODALIDAD:</span>
              <span className="font-sans font-black text-right text-[#FF4D00]">{bookingData.sessionType === "solo" ? "SOLO ESTUDIO" : bookingData.sessionType === "producer" ? "ESTUDIO + PRODUCTOR" : "NO SELECCIONADA"}</span>
            </div>
            <div className="flex justify-between items-center pb-1">
              <span className="text-white/60 font-black">UBICACIÓN:</span>
              <span className="font-bold text-right text-white">JUAN PAULLIER 1064</span>
            </div>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-[#FF4D00] font-sans font-black tracking-widest text-sm">
                  NOMBRE
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="JUAN PEREZ" 
                    {...field} 
                    className="bg-black border-4 border-white rounded-none px-4 text-xl font-sans font-black text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#FF4D00] shadow-[6px_6px_0_0_#000000] focus-visible:shadow-[6px_6px_0_0_#FF4D00] h-auto py-4 transition-colors uppercase"
                  />
                </FormControl>
                <FormMessage className="text-red-500 font-bold text-xs mt-2" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-[#FF4D00] font-sans font-black tracking-widest text-sm">
                  EMAIL
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="TU@EMAIL.COM" 
                    {...field} 
                    className="bg-black border-4 border-white rounded-none px-4 text-xl font-sans font-black text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#FF4D00] shadow-[6px_6px_0_0_#000000] focus-visible:shadow-[6px_6px_0_0_#FF4D00] h-auto py-4 transition-colors uppercase"
                  />
                </FormControl>
                <FormMessage className="text-red-500 font-bold text-xs mt-2" />
              </FormItem>
            )}
          />

          <motion.button
            type="submit"
            disabled={isPending || !form.formState.isValid}
            aria-busy={isPending}
            className={`w-full mt-8 py-6 text-xl font-sans font-black uppercase tracking-widest transition-all border-4 rounded-none ${
              form.formState.isValid && !isPending
                ? "bg-white text-black border-white shadow-[8px_8px_0_0_#FF4D00] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-[#FF4D00] hover:text-white hover:border-[#FF4D00]"
                : "bg-black text-white/40 border-white/20 cursor-not-allowed shadow-none"
            }`}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ENVIANDO...
              </>
            ) : (
              "SOLICITAR RESERVA"
            )}
          </motion.button>
        </form>
      </Form>
    </div>
  );
}
