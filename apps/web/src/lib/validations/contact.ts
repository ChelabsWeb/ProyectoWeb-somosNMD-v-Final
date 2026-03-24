import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  message: z
    .string()
    .min(10, { message: "El mensaje debe tener al menos 10 caracteres" })
    .max(1000, { message: "El mensaje no puede exceder los 1000 caracteres" }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
