"use client";

import * as React from "react";
import { useMediaQuery } from "../../hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { TimeSlotGrid } from "@/components/blocks/time-slot-grid";
import { SessionTypeCards, type SessionType } from "@/components/blocks/session-type-cards";
import { AnimatePresence, motion } from "framer-motion";
import { MoveLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMutation } from "@tanstack/react-query";
import { sileo } from "sileo";
import { createBookingRequest } from "@/lib/actions/booking";
import { BookingDataForm } from "@/components/blocks/booking-data-form";
import type { BookingFormData, BookingRequestData } from "@/lib/validations/booking";

// This will wrap the main booking flows
export function BookingModule() {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [direction, setDirection] = React.useState(1);
  const [bookingData, setBookingData] = React.useState<{
    date?: Date;
    slot?: string;
    sessionType?: SessionType;
  }>({});

  // Detects desktop/tablet vs mobile. lg breakpoint in tailwind is 1024px
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Reset state when modal closes
  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(1);
        setBookingData({});
        setDirection(1);
      }, 300);
    }
  }, [open]);

  const handleTimeSlotSelect = (date: Date, slot: string) => {
    setBookingData((prev) => ({ ...prev, date, slot }));
    setDirection(1);
    setStep(2);
  };

  const handleSessionTypeSelect = (type: SessionType) => {
    setBookingData((prev) => ({ ...prev, sessionType: type }));
    setDirection(1);
    setStep(3);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1) as any);
  };

  const { mutate: submitBooking, isPending } = useMutation({
    mutationFn: async (data: BookingFormData) => {
      let finalDate = bookingData.date ? new Date(bookingData.date) : new Date();
      if (bookingData.slot) {
        const [startHourStr] = bookingData.slot.split(" - ");
        const [hour, minute] = startHourStr.split(":");
        if (hour && minute) {
          finalDate.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);
        }
      }

      const payload: BookingRequestData = {
        name: data.name,
        email: data.email,
        sessionType: bookingData.sessionType!,
        timeSlot: finalDate.toISOString(),
      };
      
      const res = await createBookingRequest(payload);
      if (!res.success) {
        throw new Error(res.message || "Error al solicitar reserva");
      }
      return res;
    },
    onMutate: () => {
      sileo.success({
        title: "¡Reserva solicitada!",
        description: "Te contactaremos a la brevedad."
      });
      setOpen(false);
    },
    onError: (err) => {
      sileo.error({
        title: "Error",
        description: err.message
      });
    }
  });

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      position: "absolute" as const,
    }),
  };

  const content = (
    <div className="flex flex-col p-2 sm:p-6 w-full max-w-[800px] mx-auto min-h-[400px] md:min-h-[450px] relative overflow-hidden">
      {step > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="self-start mb-4 text-gray-400 hover:text-white hover:bg-white/5 z-10"
        >
          <MoveLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
      )}

      <div className="relative flex-1 w-full h-full">
        <AnimatePresence initial={false} custom={direction}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full"
            >
              <TimeSlotGrid onNext={handleTimeSlotSelect} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full"
            >
              <SessionTypeCards 
                onNext={handleSessionTypeSelect} 
                selectedType={bookingData.sessionType} 
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full"
            >
              <BookingDataForm 
                onSubmit={submitBooking} 
                isPending={isPending} 
                bookingData={bookingData}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-8 right-8 z-50 rounded-none border-2 border-border shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-primary text-primary-foreground hover:bg-black hover:text-white px-8 py-6 text-lg font-black tracking-widest uppercase transition-all duration-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none"
            size="lg"
          >
            [ RESERVAR ]
          </Button>
        </DialogTrigger>
        {/* Brutalist Styling */}
        <DialogContent className="sm:max-w-[700px] md:max-w-[800px] bg-white border-2 border-border rounded-none p-0 overflow-hidden shadow-[16px_16px_0_0_rgba(0,0,0,1)]">
          <DialogHeader className="p-6 pb-0 border-b-2 border-border bg-background">
            <DialogTitle className="text-foreground text-2xl font-black uppercase tracking-widest">
              RESERVA TU SESIÓN
            </DialogTitle>
            <DialogDescription className="text-foreground/70 font-mono uppercase tracking-widest text-xs">
              SELECCIONA UN HORARIO DISPONIBLE.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-white">
            {content}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="fixed bottom-6 right-1/2 translate-x-1/2 z-50 rounded-none border-2 border-border shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-primary text-primary-foreground hover:bg-black hover:text-white px-10 py-6 text-xl font-black tracking-widest uppercase transition-all duration-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none"
          size="lg"
        >
          [ RESERVAR ]
        </Button>
      </DrawerTrigger>
      {/* Brutalist styling for mobile drawer */}
      <DrawerContent className="bg-white border-2 border-border rounded-none max-h-[90vh]">
        <DrawerHeader className="text-left p-6 pb-0 border-b-2 border-border bg-background">
          <DrawerTitle className="text-foreground text-2xl font-black uppercase tracking-widest">
            RESERVA TU SESIÓN
          </DrawerTitle>
          <DrawerDescription className="text-foreground/70 font-mono uppercase tracking-widest text-xs">
            SELECCIONA UN HORARIO DISPONIBLE.
          </DrawerDescription>
        </DrawerHeader>
        <div className="bg-white">
          {content}
        </div>
        <DrawerFooter className="pt-2 border-t-2 border-border bg-background">
          <DrawerClose asChild>
            <Button variant="outline" className="border-2 border-border text-foreground hover:bg-gray-100 rounded-none font-bold uppercase tracking-widest">
              CANCELAR
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
