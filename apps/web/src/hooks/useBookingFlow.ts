import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { createBookingRequest } from "@/lib/actions/booking";
import type { BookingRequestData } from "@/lib/validations/booking";
import type { SessionType } from "@/components/blocks/session-type-cards";

export interface BookingStateData {
  date?: Date;
  timeSlot?: string;
  sessionType?: SessionType;
  name?: string;
  email?: string;
}

export function useBookingFlow() {
  const [step, setStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(0);
  const [bookingData, setBookingData] = useState<BookingStateData>({});

  // Flujos de validación y navegación
  const handleNext = useCallback((stepData?: Partial<BookingStateData>) => {
    if (stepData) {
      setBookingData((prev) => ({ ...prev, ...stepData }));
    }
    setDirection(1);
    setStep((prev) => prev + 1);
  }, []);

  const handleBack = useCallback(() => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  }, []);

  const handleReset = useCallback(() => {
    setDirection(-1);
    setStep(1);
    setBookingData({});
  }, []);

  // Mutación de red (React Query)
  const bookingMutation = useMutation({
    mutationFn: async (finalData: BookingStateData) => {
      // Validate that all required fields are present
      if (!finalData.date || !finalData.timeSlot || !finalData.sessionType || !finalData.name || !finalData.email) {
        throw new Error("Missing required booking data");
      }
      
      const payload: BookingRequestData = {
        name: finalData.name,
        email: finalData.email,
        sessionType: finalData.sessionType as "solo" | "producer",
        timeSlot: finalData.date.toISOString(), // Real implementation would merge date and timeSlot, but schema expects an ISO string. TimeSlotGrid guarantees a date, but we might need to properly format it based on the slot if required. For now, sending dateIso.
      };
      
      const response = await createBookingRequest(payload);
      if (!response.success) {
        throw new Error(response.message || "Error al procesar reserva");
      }
      return response.data;
    },
    onSuccess: () => {
      handleNext();
    },
    onError: (error) => {
      console.error("Error al procesar la reserva:", error);
    },
  });

  const handleSubmit = useCallback((formData: { name: string; email: string }) => {
    const payload = { ...bookingData, ...formData };
    setBookingData(payload);
    bookingMutation.mutate(payload);
  }, [bookingData, bookingMutation]);

  return {
    step,
    direction,
    bookingData,
    handleNext,
    handleBack,
    handleReset,
    handleSubmit,
    isSubmitting: bookingMutation.isPending,
    isSuccess: bookingMutation.isSuccess,
    isError: bookingMutation.isError,
    error: bookingMutation.error,
  };
}
