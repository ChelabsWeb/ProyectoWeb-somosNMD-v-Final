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
import { Textarea } from "@/components/ui/textarea";
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
      reason: "",
    },
    mode: "onChange",
  });

  return (
    <div className="flex flex-col p-0 w-full h-full bg-transparent text-white">
      <h3 className="text-2xl md:text-3xl font-sans font-black uppercase tracking-widest text-[#FF4D00] mb-2">
        TUS DATOS
      </h3>
      <p className="text-xs font-mono uppercase tracking-widest text-white/60 mb-8 max-w-sm">
        INGRESÁ TU NOMBRE, EMAIL Y QUÉ VAS A GRABAR PARA SOLICITAR LA RESERVA.
      </p>

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
              "REVISAR RESERVA"
            )}
          </motion.button>
        </form>
      </Form>
    </div>
  );
}
