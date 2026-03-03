import { NextResponse } from "next/server";
import { verifySecureToken } from "@/lib/services/security";
import { createCalendarEvent, fetchCalendarEvents } from "@/lib/services/calendar";
import { sendReservationSuccessEmail, sendReservationRejectedEmail } from "@/lib/services/email";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Missing token parameter" },
        { status: 400 }
      );
    }

    // Verify the secure token 
    const payload = verifySecureToken(token) as { bookingId: string, action: string, applicantName: string, applicantEmail: string, sessionType: string, timeSlot: string } | null;

    if (!payload) {
      const errorUrl = new URL("/booking/confirmation", request.url);
      errorUrl.searchParams.set("status", "error");
      errorUrl.searchParams.set("message", "El enlace de verificación ha expirado o es inválido.");
      return NextResponse.redirect(errorUrl);
    }

    const { bookingId, action, applicantName, applicantEmail, sessionType, timeSlot } = payload;

    if (action === "confirm") {
        // 1. Check for concurrency conflicts and parse date safely
        const requestedTimeMs = new Date(timeSlot).getTime();
        
        if (isNaN(requestedTimeMs)) {
          console.error(`[Webhook] Invalid timeSlot format for booking ${bookingId}`);
          const errorUrl = new URL("/booking/confirmation", request.url);
          errorUrl.searchParams.set("status", "error");
          errorUrl.searchParams.set("message", "El formato del horario reservado es inválido.");
          return NextResponse.redirect(errorUrl);
        }

        const events = await fetchCalendarEvents(timeSlot);
        const isSlotOccupied = events.some(e => {
          if (!e.start) return false;
          const eventTimeMs = new Date(e.start).getTime();
          // Since Google API returns true ISO strings 
          // We evaluate equality to see if this EXACT block is taken
          // A wider interval check could be an enhancement
          return !isNaN(eventTimeMs) && eventTimeMs === requestedTimeMs;
        });

        if (isSlotOccupied) {
          console.warn(`[Webhook] Concurrency conflict: Slot ${timeSlot} already taken. Rejecting booking ${bookingId}.`);
          
          // Notify the applicant of the rejection, passing sessionType for context
          await sendReservationRejectedEmail(applicantName, applicantEmail, timeSlot, sessionType);

          const errorUrl = new URL("/booking/confirmation", request.url);
          errorUrl.searchParams.set("status", "error");
          errorUrl.searchParams.set("message", "Este horario ya fue reservado por alguien más y no puede ser confirmado.");
          return NextResponse.redirect(errorUrl);
        }

        // 2. If available, create the event
        const calendarRes = await createCalendarEvent(timeSlot, {
          name: applicantName,
          email: applicantEmail,
          sessionType: sessionType,
        });

        if (!calendarRes.success) {
          console.error(`[Webhook] Calendar error for booking ${bookingId}:`, calendarRes.message);
          const errorUrl = new URL("/booking/confirmation", request.url);
          errorUrl.searchParams.set("status", "error");
          errorUrl.searchParams.set("message", "Error al sincronizar la reserva con Google Calendar.");
          return NextResponse.redirect(errorUrl);
        }

      // 3. Notify the approved applicant
      await sendReservationSuccessEmail(applicantName, applicantEmail, timeSlot, sessionType);
    }

    console.log(`[Webhook] Booking ${bookingId} marked as ${action}`);

    const successUrl = new URL("/booking/confirmation", request.url);
    successUrl.searchParams.set("status", "success");
    successUrl.searchParams.set("action", action);
    
    return NextResponse.redirect(successUrl);
  } catch (error) {
    console.error(`[Webhook] Unhandled error:`, error);
    const errorUrl = new URL("/booking/confirmation", request.url);
    errorUrl.searchParams.set("status", "error");
    errorUrl.searchParams.set("message", "Ha ocurrido un error inesperado al procesar la solicitud.");
    return NextResponse.redirect(errorUrl);
  }
}
