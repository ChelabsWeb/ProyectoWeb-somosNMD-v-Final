"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingModule } from "@/components/sections/BookingModule";

export function BookingModalTrigger() {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <button className="inline-block whitespace-nowrap border-4 border-white bg-[#FF4D00] px-8 py-4 text-sm font-black text-white shadow-[6px_6px_0_0_#000000] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-white hover:text-black hover:shadow-none uppercase tracking-widest cursor-pointer">
          RESERVAR SESIÓN
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 flex items-center justify-center p-0 sm:p-4" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-[100] grid w-full translate-x-[-50%] translate-y-[-50%] bg-zinc-800 p-0 duration-200",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-1/2 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-1/2",
            "h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-4xl overflow-y-auto",
            "border-0 sm:border-4 sm:border-foreground sm:shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-none"
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            Sistema de Reservas
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Flujo de reserva de sesiones NMD.
          </DialogPrimitive.Description>

          <div className="w-full h-full p-4 sm:p-6 bg-transparent">
            <BookingModule
              closeButton={
                <DialogPrimitive.Close className="p-2 bg-zinc-800 border-2 border-foreground shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background shrink-0">
                  <X className="h-5 w-5 stroke-[3] text-foreground" />
                  <span className="sr-only">Cerrar Pop-up</span>
                </DialogPrimitive.Close>
              }
            />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
