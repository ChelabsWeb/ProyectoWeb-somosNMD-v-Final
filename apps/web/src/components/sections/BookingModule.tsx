"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useBookingFlow } from "@/hooks/useBookingFlow";
import { useMediaQuery } from "@/hooks/use-media-query";

import { TimeSlotGrid } from "@/components/blocks/time-slot-grid";
import { SessionTypeCards } from "@/components/blocks/session-type-cards";
import { BookingDataForm } from "@/components/blocks/booking-data-form";
import { BookingSummaryStep } from "@/components/blocks/booking-summary-step";
import { BookingSuccessStep } from "@/components/blocks/booking-success-step";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

interface BookingModuleProps {
  closeButton?: React.ReactNode;
}

export function BookingModule({ closeButton }: BookingModuleProps) {
  const [mounted, setMounted] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const maxSteps = mounted && isMobile ? 5 : 4;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const {
    step,
    direction,
    bookingData,
    handleNext,
    handleBack,
    handleReset,
    handleSubmit,
    confirmBooking,
    isSubmitting,
  } = useBookingFlow({ maxSteps });

  const renderStep = () => {
    if (!mounted) return null;

    // Escenario Mobile: 5 pasos (Fecha, Hora, Modalidad, Datos, Resumen)
    if (isMobile) {
      switch (step) {
        case 1:
          return (
            <TimeSlotGrid
              onNext={(date) => handleNext({ date })}
              isMobile={true}
              mobileStep="date"
            />
          );
        case 2:
          return (
            <TimeSlotGrid
              onNext={(_date, slot) => handleNext({ timeSlot: slot })}
              isMobile={true}
              mobileStep="time"
            />
          );
        case 3:
          return (
            <SessionTypeCards
              onNext={(type) => handleNext({ sessionType: type })}
              selectedType={bookingData.sessionType}
            />
          );
        case 4:
          return (
            <BookingDataForm
              onSubmit={handleSubmit}
              isPending={false}
            />
          );
        case 5:
          return (
            <BookingSummaryStep
              bookingData={bookingData}
              onConfirm={confirmBooking}
              isPending={isSubmitting}
            />
          );
        case 6:
          return <BookingSuccessStep onReset={handleReset} />;
        default:
          return null;
      }
    }

    // Escenario Desktop: 4 pasos (Fecha+Hora, Modalidad, Datos, Resumen)
    switch (step) {
      case 1:
        return (
          <TimeSlotGrid
            onNext={(date, slot) => handleNext({ date, timeSlot: slot })}
            isMobile={false}
          />
        );
      case 2:
        return (
          <SessionTypeCards
            onNext={(type) => handleNext({ sessionType: type })}
            selectedType={bookingData.sessionType}
          />
        );
      case 3:
        return (
          <BookingDataForm
            onSubmit={handleSubmit}
            isPending={false}
          />
        );
      case 4:
        return (
          <BookingSummaryStep
            bookingData={bookingData}
            onConfirm={confirmBooking}
            isPending={isSubmitting}
          />
        );
      case 5:
        return <BookingSuccessStep onReset={handleReset} />;
      default:
        return null;
    }
  };

  return (
    <section className="relative w-full h-full bg-transparent flex flex-col">
      <header className="flex flex-col md:flex-row md:items-center mb-3 gap-2 md:gap-3">
        {/* Mobile: X arriba a la derecha */}
        {closeButton && (
          <div className="flex justify-end md:hidden">{closeButton}</div>
        )}

        <div className="flex flex-row items-center gap-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-sans font-black uppercase tracking-widest text-white [text-shadow:2px_2px_0_#FF4D00] md:[text-shadow:4px_4px_0_#FF4D00] leading-tight">
            RESERVAS
          </h2>

          {step <= maxSteps && (
            <div className="flex items-center gap-3">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="text-xs sm:text-sm font-sans font-black uppercase tracking-widest bg-black text-white px-3 py-2 border-4 border-white hover:bg-[#FF4D00] hover:text-white transition-colors shadow-[4px_4px_0_0_#000000] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  VOLVER
                </button>
              )}
              <div className="px-3 py-2 bg-[#FF4D00] text-white font-sans font-black text-sm sm:text-base border-4 border-white shadow-[6px_6px_0_0_#000000] whitespace-nowrap">
                PASO {step} / {maxSteps}
              </div>
            </div>
          )}
        </div>

        {/* Desktop: X al final de la fila */}
        {closeButton && (
          <div className="hidden md:flex ml-auto">{closeButton}</div>
        )}
      </header>

      <div className="relative min-h-0 w-full overflow-hidden md:overflow-visible">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full flex flex-col md:block"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
