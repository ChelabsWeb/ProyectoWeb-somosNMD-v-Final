import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Términos y Condiciones | NMD",
  description: "Términos y condiciones de uso de NMD.",
};

export default function TerminosPage() {
  return (
    <main className="min-h-dvh bg-black px-6 py-24 font-mono text-white md:px-12 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-xs uppercase tracking-widest opacity-50 transition-opacity hover:opacity-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <h1 className="mb-12 font-sans text-4xl font-black uppercase tracking-tight md:text-5xl">
          Términos y Condiciones
        </h1>

        <div className="space-y-8 text-sm leading-relaxed opacity-80">
          <section>
            <h2 className="mb-3 font-sans text-lg font-bold uppercase">
              Aceptación de los términos
            </h2>
            <p>
              Al acceder y utilizar este sitio web, aceptás estos términos y
              condiciones en su totalidad. Si no estás de acuerdo con alguna
              parte, te pedimos que no utilices el sitio.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-sans text-lg font-bold uppercase">
              Uso del sitio
            </h2>
            <p>
              Este sitio web es propiedad de NMD. El contenido publicado,
              incluyendo textos, imágenes, videos y música, está protegido por
              derechos de autor. No podés reproducir, distribuir ni modificar
              el contenido sin autorización previa.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-sans text-lg font-bold uppercase">
              Reservas y servicios
            </h2>
            <p>
              Las reservas realizadas a través del sitio están sujetas a
              disponibilidad. NMD se reserva el derecho de modificar o cancelar
              servicios según sea necesario, notificando a las partes
              involucradas.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-sans text-lg font-bold uppercase">
              Limitación de responsabilidad
            </h2>
            <p>
              NMD no se hace responsable por daños directos o indirectos que
              puedan surgir del uso de este sitio web. El contenido se
              proporciona &quot;tal cual&quot; sin garantías de ningún tipo.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-sans text-lg font-bold uppercase">
              Modificaciones
            </h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier
              momento. Los cambios serán efectivos desde su publicación en el
              sitio. Te recomendamos revisar esta página periódicamente.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-sans text-lg font-bold uppercase">
              Legislación aplicable
            </h2>
            <p>
              Estos términos se rigen por las leyes de la República Oriental
              del Uruguay.
            </p>
          </section>

          <p className="pt-4 text-xs opacity-50">
            Última actualización: Marzo 2026
          </p>
        </div>
      </div>
    </main>
  );
}
