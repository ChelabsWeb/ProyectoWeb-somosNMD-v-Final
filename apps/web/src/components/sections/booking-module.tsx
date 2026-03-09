"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useBookingFlow } from "@/hooks/useBookingFlow";

import { TimeSlotGrid } from "@/components/blocks/time-slot-grid";
import { SessionTypeCards } from "@/components/blocks/session-type-cards";
import { BookingDataForm } from "@/components/blocks/booking-data-form";
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
  const {
    step,
    direction,
    bookingData,
    handleNext,
    handleBack,
    handleReset,
    handleSubmit,
    isSubmitting,
  } = useBookingFlow();

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <TimeSlotGrid 
            onNext={(date, slot) => handleNext({ date, timeSlot: slot })} 
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
            isPending={isSubmitting}
            bookingData={{
              date: bookingData.date,
              slot: bookingData.timeSlot,
              sessionType: bookingData.sessionType
            }}
          />
        );
      case 4:
        return <BookingSuccessStep onReset={handleReset} />;
      default:
        return null;
    }
  };

  return (
    <section className="relative w-full h-full bg-transparent">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
        <h2 className="text-3xl sm:text-4xl font-sans font-black uppercase tracking-widest text-white drop-shadow-[4px_4px_0_#FF4D00]">
          SISTEMA DE RESERVAS
        </h2>
        
        {step < 4 && (
          <div className="flex items-center gap-4">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="text-sm font-sans font-black uppercase tracking-widest bg-black text-white px-4 py-2 border-4 border-white hover:bg-[#FF4D00] hover:text-white transition-colors shadow-[4px_4px_0_0_#000000]"
              >
                VOLVER
              </button>
            )}
            <div className="px-4 py-2 bg-[#FF4D00] text-white font-sans font-black text-base border-4 border-white shadow-[6px_6px_0_0_#000000]">
              PASO {step} / 3
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
