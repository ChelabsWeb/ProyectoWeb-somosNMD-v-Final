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
    <div className="flex flex-col p-4 md:p-8 bg-white border-2 border-border border-t-0 shadow-[8px_8px_0_0_rgba(0,0,0,1)] w-full">
      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-foreground mb-2">
        TUS DATOS
      </h3>
      <p className="text-xs font-mono uppercase tracking-widest text-foreground/60 mb-6 max-w-xs">
        INGRESÁ TU NOMBRE Y EMAIL PARA SOLICITAR LA RESERVA.
      </p>

      {bookingData && (
        <div className="mb-8 p-4 border-2 border-border bg-background shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none">
          <h4 className="text-sm font-black uppercase tracking-widest mb-4 pb-2 border-b-2 border-border text-primary">RESUMEN DE RESERVA</h4>
          <div className="flex flex-col space-y-3 text-sm font-mono uppercase">
            <div className="flex justify-between items-center border-b-2 border-border/30 pb-2">
              <span className="text-foreground/60 font-black">FECHA:</span>
              <span className="font-bold text-right">{bookingData.date ? new Intl.DateTimeFormat('es-UY', { weekday: 'long', day: 'numeric', month: 'long' }).format(bookingData.date) : "NO SELECCIONADA"}</span>
            </div>
            <div className="flex justify-between items-center border-b-2 border-border/30 pb-2">
              <span className="text-foreground/60 font-black">HORA:</span>
              <span className="font-bold text-right">{bookingData.slot || "NO SELECCIONADA"}</span>
            </div>
            <div className="flex justify-between items-center border-b-2 border-border/30 pb-2">
              <span className="text-foreground/60 font-black">MODALIDAD:</span>
              <span className="font-bold text-right text-primary">{bookingData.sessionType === "solo" ? "SOLO ESTUDIO" : bookingData.sessionType === "producer" ? "ESTUDIO + PRODUCTOR" : "NO SELECCIONADA"}</span>
            </div>
            <div className="flex justify-between items-center pb-1">
              <span className="text-foreground/60 font-black">UBICACIÓN:</span>
              <span className="font-bold text-right">JUAN PAULLIER 1064</span>
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
                <FormLabel className="uppercase text-primary font-black tracking-widest text-xs">
                  NOMBRE
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="JUAN PEREZ" 
                    {...field} 
                    className="bg-transparent border-0 border-b-2 border-border rounded-none px-0 text-xl font-bold text-foreground placeholder:text-foreground/30 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary h-auto py-2 transition-colors uppercase"
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs mt-2" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-primary font-black tracking-widest text-xs">
                  EMAIL
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="TU@EMAIL.COM" 
                    {...field} 
                    className="bg-transparent border-0 border-b-2 border-border rounded-none px-0 text-xl font-bold text-foreground placeholder:text-foreground/30 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary h-auto py-2 transition-colors uppercase"
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs mt-2" />
              </FormItem>
            )}
          />

          <motion.button
            type="submit"
            disabled={isPending || !form.formState.isValid}
            aria-busy={isPending}
            whileHover={{ scale: form.formState.isValid && !isPending ? 1.02 : 1 }}
            whileTap={{ scale: form.formState.isValid && !isPending ? 0.98 : 1 }}
            className={`w-full mt-8 py-6 flex items-center justify-center text-lg font-black uppercase tracking-widest transition-all border-2 rounded-none hover:-translate-y-1 shadow-[4px_4px_0_0_rgba(0,0,0,1)]
              ${
                form.formState.isValid && !isPending
                  ? "bg-primary text-primary-foreground border-border hover:bg-black hover:text-white hover:border-black hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
                  : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed shadow-none hover:translate-y-0"
              }
            `}
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
