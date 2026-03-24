"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { ArrowUpRight, Loader2, CheckCircle2 } from "lucide-react";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";
import { sendContactMessage } from "@/lib/actions/contact";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  function onSubmit(data: ContactFormData) {
    setStatus("idle");
    startTransition(async () => {
      const result = await sendContactMessage(data);
      if (result.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setErrorMsg(result.message || "Error enviando el mensaje");
      }
    });
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-400" />
        <p className="font-sans text-2xl font-bold uppercase">Mensaje enviado</p>
        <p className="text-sm opacity-60">Te respondemos pronto.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs uppercase tracking-widest underline opacity-50 transition-opacity hover:opacity-100"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-widest opacity-50">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full border-b-2 border-white/30 bg-transparent px-0 py-3 font-sans text-lg text-white outline-none transition-colors placeholder:text-white/20 focus:border-white"
          placeholder="Tu nombre"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-widest opacity-50">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full border-b-2 border-white/30 bg-transparent px-0 py-3 font-sans text-lg text-white outline-none transition-colors placeholder:text-white/20 focus:border-white"
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-widest opacity-50">
          Mensaje
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className="w-full resize-none border-b-2 border-white/30 bg-transparent px-0 py-3 font-sans text-lg text-white outline-none transition-colors placeholder:text-white/20 focus:border-white"
          placeholder="Contanos en qué te podemos ayudar..."
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="group flex w-full items-center justify-center gap-2 border-4 border-white bg-white px-8 py-4 font-sans text-lg font-black uppercase tracking-tight text-black transition-all hover:bg-transparent hover:text-white disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            Enviar mensaje
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
