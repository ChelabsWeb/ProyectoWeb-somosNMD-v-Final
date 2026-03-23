# Plan — SomosNMD
_Última actualización: 2026-03-17_

## Estado actual

SomosNMD es la web oficial del colectivo musical **NMD (Nomades)**, un grupo de 12 artistas uruguayos. El proyecto es un **monorepo Turborepo** con una app Next.js 16 en `apps/web`, más los paquetes compartidos `packages/ui` y `packages/config`. El diseño sigue una estética brutalista oscura con acentos naranja (#FF4D00).

### Lo que está construido y funciona

- **Homepage**: loader animado, hero fullscreen con logo 3D (Three.js + React Three Fiber), sección de artistas con overlay expandible, footer con animación GSAP letra a letra.
- **Sistema de reservas**: flujo multi-paso completo (4 pasos desktop / 5 pasos mobile) con Framer Motion. Integración real con Google Calendar (via Service Account) y Resend para emails transaccionales. Webhook de admin en `/api/webhooks/resend` con tokens HMAC-SHA256, verificación de concurrencia y expiración de 7 días.
- **Perfiles de artistas**: rutas dinámicas `/artists/[id]` con SSG para los 12 artistas. Datos en `apps/web/src/data/artists.ts`.
- **Shop**: UI completa con grid de merch/furniture, BeatList con player global, CartOverlay y CartContext persistente. Datos 100% mock — no hay backend de e-commerce ni payment processor.
- **Sistema de emails**: 3 plantillas React Email (solicitud al admin, confirmación al usuario, rechazo al usuario), enviadas con Resend.
- **Infraestructura**: Vercel Analytics, Speed Insights, TanStack Query, Framer Motion, GSAP ScrollTrigger, Lenis smooth scroll, cursor personalizado, partículas tsParticles, suite de tests Vitest + Testing Library + Playwright.

### Lo que está incompleto o falta

- **Seguridad**: `.env.local` no tiene `WEBHOOK_SECRET` — el sistema HMAC usa un fallback hardcodeado público. Cualquiera que lea el código puede forjar tokens de confirm/reject.
- **Seguridad**: `NEXT_PUBLIC_APP_URL` no está configurado — en producción, el servicio de email lanza un error explícito que rompe el flujo de booking.
- **Páginas faltantes**: `/contacto`, `/terminos`, `/privacidad` están linkeadas en el footer y el hero pero no existen como rutas, dando 404.
- **Contenido placeholder**: Las 12 bios de artistas son idénticas ("integrante de nmd por el momento") y todos los Spotify links apuntan a `#`.
- **Shop sin datos reales**: Solo 2 beats (CARDO, FARDO) y 3 productos (tee, hoodie, mesa). El checkout no conecta a ningún sistema de pago.
- **Galería de artistas vacía**: Las 4 cajas del grid en `/artists/[id]` son placeholders visuales sin imágenes.
- **Metadata de producción faltante**: `layout.tsx` tiene title "Proyecto Web NMD" y description "Bienvenido a la pagina web de nmd lokitaaa".
- **Email de contacto inconsistente**: el footer usa `hola@nomades.uy`, el sistema de reservas usa `nmd.wav@gmail.com`.
- **Error de logging serverless**: `booking.ts` escribe en `error-log.txt` via `require('fs')` — no funciona en Vercel (filesystem read-only).
- **SoloPolvoSection**: el componente existe pero no está montado en `app/page.tsx`.
- **Dominio de Resend**: actualmente usa `onboarding@resend.dev` (sandbox). Requiere dominio verificado para producción.

## Próximos pasos (ordenados por prioridad)

1. **[CRÍTICO - Seguridad]** Configurar `WEBHOOK_SECRET` y `NEXT_PUBLIC_APP_URL` en `.env.local` y en Vercel. Sin esto el booking está roto en producción y los tokens son falsificables.
2. **[CRÍTICO - UX]** Crear las páginas `/contacto`, `/terminos` y `/privacidad`. Son 404 activos linkeados desde múltiples lugares.
3. **[Contenido blocker]** Completar bios y URLs de Spotify de los 12 artistas en `apps/web/src/data/artists.ts`.
4. **[Contenido blocker]** Actualizar metadata SEO en `apps/web/src/app/layout.tsx` (title, description, og:image reales).
5. **[E-commerce]** Definir e integrar payment processor para el shop (Stripe o MercadoPago) o remover/ocultar `/shop` hasta que esté listo para producción.
6. **[Producción]** Verificar dominio propio en Resend para salir del modo sandbox.
7. **[Contenido]** Completar galería de fotos en el detail de artistas — reemplazar los 4 placeholders con imágenes reales.
8. **[Consistencia]** Unificar el email de contacto del proyecto (decidir entre `hola@nomades.uy` y `nmd.wav@gmail.com`).
9. **[Bug]** Reemplazar el `require('fs').appendFileSync` en `booking.ts` con `console.error` o Sentry.
10. **[Decisión pendiente]** Evaluar si montar `SoloPolvoSection` en la homepage y si agregar persistencia de bookings (Supabase/Neon).
