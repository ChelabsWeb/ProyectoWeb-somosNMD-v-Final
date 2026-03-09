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

export function BookingModule() {
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
              onNext={(date) => handleNext({ date })} // We don't have slot yet
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
              isPending={false} // Form solo avanza aquí, submits en resumen
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
            isPending={false} // Submit pasa al paso final
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
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-black uppercase tracking-widest text-white drop-shadow-[4px_4px_0_#FF4D00] max-w-[80vw]">
          SISTEMA DE RESERVAS
        </h2>
        
        {step <= maxSteps && (
          <div className="flex flex-wrap items-center gap-3">
            {step > 1 && (
              <button
                onClick={handleBack}
                disabled={isSubmitting}
                className="text-sm font-sans font-black uppercase tracking-widest bg-black text-white px-4 py-2 border-4 border-white hover:bg-[#FF4D00] hover:text-white transition-colors shadow-[4px_4px_0_0_#000000] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                VOLVER
              </button>
            )}
            <div className="px-4 py-2 bg-[#FF4D00] text-white font-sans font-black text-base border-4 border-white shadow-[6px_6px_0_0_#000000]">
              PASO {step} / {maxSteps}
            </div>
          </div>
        )}
      </header>

      <div className="relative min-h-[500px] w-full overflow-hidden md:overflow-visible">
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
