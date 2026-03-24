import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidad | NMD",
  description: "Política de privacidad de NMD.",
};

export default function PrivacidadPage() {
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
          Política de Privacidad
        </h1>

        <div className="space-y-8 text-sm leading-relaxed opacity-80">
          <section>
            <h2 className="mb-3 font-sans text-lg font-bold uppercase">
              Información que recopilamos
            </h2>
            <p>
              Cuando utilizás nuestro sitio web, podemos recopilar información
              básica como tu nombre y correo electrónico si decidís contactarnos
              o realizar una reserva. No recopilamos información personal sin tu
              consentimiento.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-sans text-lg font-bold uppercase">
              Uso de la información
            </h2>
            <p>
              La información que recopilamos se utiliza únicamente para
              responder a tus consultas, gestionar reservas y mejorar nuestros
              servicios. No vendemos ni compartimos tu información personal con
              terceros.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-sans text-lg font-bold uppercase">
              Cookies
            </h2>
            <p>
              Este sitio puede utilizar cookies para mejorar la experiencia de
              navegación. Podés configurar tu navegador para rechazar cookies si
              lo preferís.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-sans text-lg font-bold uppercase">
              Servicios de terceros
            </h2>
            <p>
              Utilizamos servicios de análisis (como Vercel Analytics) que
              pueden recopilar datos anónimos sobre el uso del sitio. Estos
              servicios tienen sus propias políticas de privacidad.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-sans text-lg font-bold uppercase">
              Contacto
            </h2>
            <p>
              Si tenés preguntas sobre esta política de privacidad, podés
              contactarnos a través de nuestras redes sociales o el formulario
              de contacto del sitio.
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
