import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contacto | NMD",
  description: "Ponete en contacto con NMD.",
};

export default function ContactoPage() {
  return (
    <main className="min-h-dvh bg-black px-6 py-24 font-mono text-white md:px-12 lg:px-24">
      <div className="mx-auto max-w-xl">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-xs uppercase tracking-widest opacity-50 transition-opacity hover:opacity-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <h1 className="mb-4 font-sans text-4xl font-black uppercase tracking-tight md:text-5xl">
          Contacto
        </h1>
        <p className="mb-12 text-sm opacity-60">
          Dejanos tu mensaje y te respondemos lo antes posible.
        </p>

        <ContactForm />
      </div>
    </main>
  );
}
