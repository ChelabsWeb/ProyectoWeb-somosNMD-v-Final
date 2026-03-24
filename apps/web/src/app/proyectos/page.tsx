import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Proyectos | NMD",
  description: "Proyectos de NMD — próximamente.",
};

export default function ProyectosPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-black px-6 font-mono text-white">
      <Link
        href="/"
        className="absolute left-6 top-24 inline-flex items-center gap-2 text-xs uppercase tracking-widest opacity-50 transition-opacity hover:opacity-100 md:left-12"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Link>

      <p className="mb-4 text-xs uppercase tracking-[0.3em] opacity-40">
        // PROYECTOS
      </p>
      <h1
        className="text-center font-sans text-5xl font-black uppercase tracking-tight md:text-7xl lg:text-8xl"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        Coming
        <br />
        Soon
      </h1>
      <div className="mt-6 h-1 w-16 bg-white" />
    </main>
  );
}
