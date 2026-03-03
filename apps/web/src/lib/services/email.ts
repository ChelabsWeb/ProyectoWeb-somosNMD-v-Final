import "server-only";
import { Resend } from "resend";
import { ReservationRequestEmail } from "@/components/emails/reservation-request";
import { ReservationSuccessEmail } from "@/components/emails/reservation-success";
import { ReservationRejectedEmail } from "@/components/emails/reservation-rejected";
import type { BookingRequestData } from "@/lib/validations/booking";
import { generateSecureToken } from "@/lib/services/security";

const SENDER_EMAIL = process.env.RESEND_FROM_EMAIL || "Reserva Estudio <onboarding@resend.dev>";

export async function sendReservationEmail(bookingData: BookingRequestData) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey && process.env.NODE_ENV !== "test") {
    console.error("Missing RESEND_API_KEY environment variable. Cannot send email.");
    return { success: false, error: "Missing API Key" };
  }

  // Initialize Resend inside the function to ensure the env var check happens
  const resend = new Resend(apiKey);

  const ADMIN_EMAIL = "nmd.wav@gmail.com";
  
  // Generate secure tokens for this booking
  // We'll use a timestamp-based ID for now until we have database integration
  const bookingId = `booking_${Date.now()}`;
  
  const tokenPayload = {
    bookingId,
    applicantName: bookingData.name,
    applicantEmail: bookingData.email,
    timeSlot: bookingData.timeSlot,
    sessionType: bookingData.sessionType,
  };
  
  const confirmToken = generateSecureToken({ ...tokenPayload, action: "confirm" });
  const rejectToken = generateSecureToken({ ...tokenPayload, action: "reject" });
  
  let baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!baseUrl) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Missing NEXT_PUBLIC_APP_URL environment variable in production");
    }
    baseUrl = "http://localhost:3000";
  }
  
  const confirmUrl = `${baseUrl}/api/webhooks/resend?token=${confirmToken}`;
  const rejectUrl = `${baseUrl}/api/webhooks/resend?token=${rejectToken}`;

  try {
    const { data, error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [ADMIN_EMAIL],
      subject: `Nueva Solicitud de Reserva: ${bookingData.name}`,
      react: ReservationRequestEmail({
        applicantName: bookingData.name,
        applicantEmail: bookingData.email,
        timeSlot: bookingData.timeSlot,
        sessionType: bookingData.sessionType,
        confirmUrl,
        rejectUrl,
      }),
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send reservation email:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown email error" 
    };
  }
}

export async function sendReservationSuccessEmail(
  applicantName: string,
  applicantEmail: string,
  timeSlot: string,
  sessionType: string
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey && process.env.NODE_ENV !== "test") {
    console.error("Missing RESEND_API_KEY environment variable. Cannot send email.");
    return { success: false, error: "Missing API Key" };
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [applicantEmail],
      subject: `¡Reserva Confirmada para ${timeSlot}!`,
      react: ReservationSuccessEmail({
        applicantName,
        timeSlot,
        sessionType,
      }),
    });

    if (error) {
      console.error("Resend API Error (Success Email):", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send reservation success email:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown email error" 
    };
  }
}

export async function sendReservationRejectedEmail(
  applicantName: string,
  applicantEmail: string,
  timeSlot: string,
  sessionType?: string
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey && process.env.NODE_ENV !== "test") {
    console.error("Missing RESEND_API_KEY environment variable. Cannot send email.");
    return { success: false, error: "Missing API Key" };
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [applicantEmail],
      subject: `Actualización sobre tu reserva para ${timeSlot}`,
      react: ReservationRejectedEmail({
        applicantName,
        timeSlot,
        sessionType
      }),
    });

    if (error) {
      console.error("Resend API Error (Rejected Email):", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send reservation rejected email:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown email error" 
    };
  }
}
