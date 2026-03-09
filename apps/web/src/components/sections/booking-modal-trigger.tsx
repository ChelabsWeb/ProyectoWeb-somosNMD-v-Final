"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingModule } from "@/components/sections/booking-module";

export function BookingModalTrigger() {
  return (
    <DialogPrimitive.Root>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 md:bottom-8 md:left-auto md:right-8 md:translate-x-0 z-[50]">
        <DialogPrimitive.Trigger asChild>
          <button className="btn-brutalist-primary bg-[#FF4D00] text-white font-black uppercase tracking-widest flex items-center justify-center px-6 py-3 md:px-8 md:py-4 border-4 border-foreground shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all active:translate-x-[8px] active:translate-y-[8px] active:shadow-none min-w-[180px] md:min-w-[200px] text-center hover:bg-white hover:text-black hover:border-black w-max">
            RESERVAR SESIÓN
          </button>
        </DialogPrimitive.Trigger>
      </div>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 flex items-center justify-center p-0 sm:p-4" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-[100] grid w-full translate-x-[-50%] translate-y-[-50%] bg-zinc-800 p-0 duration-200",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-1/2 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-1/2",
            // Ajustes de Modal Responsivo (Mobile: Full screen | Desktop: Flotante centrado)
            "h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-4xl overflow-y-auto",
            // Estética Brutalista impuesta sobre las clases base de Radix/Shadcn
            "border-0 sm:border-4 sm:border-foreground sm:shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-none"
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            Sistema de Reservas
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Flujo de reserva de sesiones NMD.
          </DialogPrimitive.Description>

          <DialogPrimitive.Close className="absolute right-4 top-4 z-50 p-2 bg-zinc-800 border-2 border-foreground shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background">
            <X className="h-6 w-6 stroke-[3] text-foreground" />
            <span className="sr-only">Cerrar Pop-up</span>
          </DialogPrimitive.Close>

          {/* Wrapper interno que inyecta la vista */}
          <div className="w-full h-full p-4 pt-20 sm:p-8 sm:pt-14 bg-transparent">
            <BookingModule />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
