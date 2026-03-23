# Lessons Learned — SomosNMD

## [2026-03-17] — Auditoría completa del codebase

- **El proyecto es más avanzado de lo que indica el CLAUDE.md.** El CLAUDE.md lo describe como "In progress" con stack mínimo. En realidad tiene un sistema de booking completamente funcional con Google Calendar, Resend, tokens HMAC-SHA256 con expiración, webhook de admin con verificación de concurrencia, suite de tests, y un shop con carrito persistente y BeatPlayer global. Hubo sesiones de desarrollo intensas no documentadas.

- **Estructura: monorepo Turborepo con 3 paquetes.** `apps/web` (la app Next.js principal), `packages/ui` (componentes compartidos con design system brutalista), `packages/config` (ESLint, Prettier, TypeScript config compartida). Package manager: pnpm@10.19.0.

- **Stack real confirmado con versiones:** Next.js 16.0.7 | React 19.2.0 | TypeScript 5.x | Tailwind CSS 3.4.14 | Framer Motion 12.34.3 | GSAP 3.13.0 | Three.js 0.180.0 + React Three Fiber 9.4.0 | TanStack Query 5.x | Resend 6.9.3 | googleapis 171.4.0 | Zod 4.3.6 | React Hook Form 7.x | Vitest 4.x | Playwright 1.58.2.

- **El webhook de admin es la pieza más sofisticada del proyecto.** El handler `/api/webhooks/resend` implementa: verificación de token HMAC con `timingSafeEqual` para prevenir timing attacks, detección de concurrencia (re-chequea disponibilidad en Google Calendar antes de confirmar), creación del evento en calendario, y envío de email de confirmación/rechazo al solicitante. Arquitectura sólida para un proyecto "hobby".

- **Vulnerabilidad de seguridad activa: WEBHOOK_SECRET no configurado.** El archivo `.env.local` tiene `RESEND_API_KEY`, `GOOGLE_*` y `GOOGLE_CALENDAR_ID` configurados, pero falta `WEBHOOK_SECRET`. El fallback en `security.ts` es la string literal `"default_development_secret_key_change_me_in_prod!"` — pública y conocida. Esto permite que cualquiera con acceso al código fuente forje tokens de confirmación válidos.

- **Vulnerabilidad de producción: NEXT_PUBLIC_APP_URL no configurado.** El servicio de email lanza un error explícito: `throw new Error("Missing NEXT_PUBLIC_APP_URL environment variable in production")`. En local usa `http://localhost:3000` como fallback, pero en producción esto rompe todo el flujo de booking.

- **Páginas faltantes linkeadas desde el UI.** Las rutas `/contacto`, `/terminos` y `/privacidad` aparecen en el footer y en el hero de la homepage pero no existen como pages de Next.js. Son 404 activos visibles para el usuario final.

- **El shop es 100% real en UI y 100% mock en datos.** Los componentes ShopHeader, BeatList, BeatPlayer, CartOverlay, CartContext están completamente implementados y son production-ready. Solo faltan datos reales y la integración de pago. El catálogo actual: 2 beats (CARDO y FARDO, ambos por Caba a 144 y 140 BPM) y 3 productos (NMD Archive Tee $45, Ghost Hoodie $85, NMD Work Console $890).

- **Bug en logging de servidor: fs.appendFileSync no funciona en Vercel.** En `apps/web/src/lib/actions/booking.ts`, el bloque catch intenta escribir en `error-log.txt` usando `require('fs').appendFileSync`. El filesystem de Vercel es read-only en producción — esto silencia el error de logging sin romper la respuesta, pero los errores no quedan registrados. Reemplazar con `console.error` o Sentry.

- **Arquitectura de booking es optimista en el cliente.** La UI avanza al step de "éxito" antes de confirmar que el email fue enviado. La confirmación real llega al admin por email con URLs firmadas. Edge case: si el email falla (API key incorrecta), `createBookingRequest` retorna error pero el cliente ya mostró éxito. La reserva nunca llega al admin.

- **Identidad visual muy definida: respetar la estética al hacer cambios.** Fondo negro (#000), tipografía monospace uppercase con underscores en labels (SHOP_CART, NOW_PREVIEWING, GRAND_TOTAL), acentos naranja #FF4D00, tipografía Geist Sans/Mono. Consistente en UI, emails y código. Los cambios cosméticos deben mantener esta estética.

- **Los 12 artistas tienen contenido placeholder idéntico.** Todos tienen bio "integrante de nmd por el momento" y Spotify link "#". Es el blocker de contenido más visible para el lanzamiento. Los datos viven en `apps/web/src/data/artists.ts` — archivo simple de reemplazar.

- **SoloPolvoSection existe pero está desmontada.** El componente `apps/web/src/components/sections/SoloPolvoSection.tsx` existe pero no aparece en `apps/web/src/app/page.tsx`. Probablemente quedó en desarrollo o fue desmontado temporalmente — consultar con el cliente antes de eliminarlo.

- **Metadata del layout en estado de desarrollo.** `apps/web/src/app/layout.tsx` tiene `title: "Proyecto Web NMD"` y `description: "Bienvenido a la pagina web de nmd lokitaaa"`. Debe actualizarse antes del lanzamiento público.

- **Dominio de email de Resend en modo sandbox.** El `SENDER_EMAIL` usa `onboarding@resend.dev` como fallback. Para producción se necesita verificar un dominio propio en Resend y actualizar `RESEND_FROM_EMAIL` en las variables de entorno.
