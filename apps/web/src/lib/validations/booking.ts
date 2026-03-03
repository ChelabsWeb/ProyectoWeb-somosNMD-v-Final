import { z } from "zod";

export const getAvailableSlotsSchema = z.object({
  dateIso: z.string().datetime({ message: "Formato de fecha ISO inválido" }),
});

export const bookingFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
});

export const bookingRequestSchema = bookingFormSchema.extend({
  sessionType: z.enum(["solo", "producer"], { 
    message: "Tipo de sesión inválido"
  }),
  timeSlot: z.string().datetime({ message: "Horario inválido" }),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
export type BookingRequestData = z.infer<typeof bookingRequestSchema>;
