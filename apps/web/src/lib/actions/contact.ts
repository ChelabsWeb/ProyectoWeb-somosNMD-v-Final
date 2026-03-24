"use server";

import { Resend } from "resend";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";

type ActionState = {
  success: boolean;
  message?: string;
  error?: string | Record<string, string[]>;
};

const SENDER_EMAIL = process.env.RESEND_FROM_EMAIL || "Contacto NMD <onboarding@resend.dev>";
const ADMIN_EMAIL = "nmd.wav@gmail.com";

export async function sendContactMessage(data: ContactFormData): Promise<ActionState> {
  const validated = contactFormSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      message: "Error de validación",
      error: validated.error.flatten().fieldErrors,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY environment variable.");
    return { success: false, message: "Error de configuración del servidor" };
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [ADMIN_EMAIL],
      replyTo: validated.data.email,
      subject: `Nuevo mensaje de contacto: ${validated.data.name}`,
      text: [
        `Nombre: ${validated.data.name}`,
        `Email: ${validated.data.email}`,
        ``,
        `Mensaje:`,
        validated.data.message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, message: "Error enviando el mensaje" };
    }

    return { success: true, message: "Mensaje enviado correctamente" };
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return { success: false, message: "Error enviando el mensaje" };
  }
}
