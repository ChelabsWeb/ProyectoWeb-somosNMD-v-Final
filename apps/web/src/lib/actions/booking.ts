"use server";

import { fetchCalendarEvents } from "@/lib/services/calendar";
import { getAvailableSlotsSchema, bookingRequestSchema, type BookingRequestData } from "@/lib/validations/booking";
import { sendReservationEmail } from "@/lib/services/email";

export type ActionState<T = any> = {
  success: boolean;
  message?: string;
  error?: string | Record<string, string[]>;
  data?: T;
};

export async function getAvailableSlots(dateIso: string): Promise<ActionState<string[]>> {
  try {
    const validatedFields = getAvailableSlotsSchema.safeParse({ dateIso });
    
    if (!validatedFields.success) {
      return {
        success: false,
        message: "Error de validación",
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const events = await fetchCalendarEvents(validatedFields.data.dateIso);
    
    // Total predefined blocks
    const PREDEFINED_BLOCKS = [
      "09:00 - 12:00",
      "12:00 - 15:00",
      "15:00 - 18:00",
      "18:00 - 21:00",
    ];

    // Check for overlap with any scheduled event
    const availableSlots = PREDEFINED_BLOCKS.filter(block => {
      const [startStr, endStr] = block.split(' - ');
      const [startHour] = startStr.split(':').map(Number);
      const [endHour] = endStr.split(':').map(Number);
      
      // Calculate UTC timestamps for this block (offsetting for America/Montevideo UTC-3)
      const blockStart = new Date(validatedFields.data.dateIso);
      blockStart.setUTCHours(startHour + 3, 0, 0, 0);
      
      const blockEnd = new Date(validatedFields.data.dateIso);
      blockEnd.setUTCHours(endHour + 3, 0, 0, 0);

      const isOccupied = events.some(event => {
        const eventStart = new Date(event.start).getTime();
        const eventEnd = new Date(event.end).getTime();
        
        // Standard overlap condition: max(eventStart, blockStart) < min(eventEnd, blockEnd)
        return eventStart < blockEnd.getTime() && eventEnd > blockStart.getTime();
      });

      return !isOccupied;
    });

    return {
      success: true,
      data: availableSlots
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: "Google Calendar Sync Error",
      error: err instanceof Error ? err.message : "Unknown error"
    };
  }
}

export async function createBookingRequest(data: BookingRequestData): Promise<ActionState<null>> {
  try {
    const validatedData = bookingRequestSchema.safeParse(data);
    
    if (!validatedData.success) {
      return {
        success: false,
        message: "Error de validación",
        error: validatedData.error.flatten().fieldErrors,
      };
    }

    // In a real scenario, this would persist to a database or trigger Google Calendar APIs
    // and send confirmation emails using Resend.
    // For now, we simulate success for the optimistic UI as requested.
    // Simulate network latency for other parts of the process
    await new Promise(resolve => setTimeout(resolve, 800));

    // Await the email send to ensure it completes in serverless environments
    const emailResult = await sendReservationEmail(validatedData.data);
    if (!emailResult.success) {
      console.error("Warning: Booking recorded but email failed to send", emailResult.error);
      // We still return success: true to the user so the optimistic UI succeeds,
      // but we might log this to an error tracking system in production.
    }

    return {
      success: true,
      message: "Reserva solicitada correctamente",
      data: null
    };

  } catch (error: unknown) {
    return {
      success: false,
      message: "Error procesando la solicitud",
      error: error instanceof Error ? error.message : "Unknown server error",
    };
  }
}
