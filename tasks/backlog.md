# Backlog — SomosNMD

## Alta prioridad

- [ ] Agregar `WEBHOOK_SECRET` al `.env.local` y a Vercel — sin este valor el sistema de tokens HMAC es inseguro (usa fallback público hardcodeado en `security.ts`)
- [ ] Agregar `NEXT_PUBLIC_APP_URL` al `.env.local` y a Vercel — su ausencia en producción rompe el flujo de booking con un error explícito en `email.ts`
- [ ] Crear página `/contacto` — está linkeada desde el hero (desktop nav) y desde el footer
- [ ] Crear página `/terminos` — linkeada desde el footer como "TÉRMINOS Y CONDICIONES"
- [ ] Crear página `/privacidad` — linkeada desde el footer como "POLÍTICA DE PRIVACIDAD"
- [ ] Reemplazar bios placeholder ("integrante de nmd por el momento") con texto real para los 12 artistas en `apps/web/src/data/artists.ts`
- [ ] Reemplazar links de Spotify `#` con URLs reales para cada artista
- [ ] Actualizar metadata en `apps/web/src/app/layout.tsx`: title real, description real para producción

## Media prioridad

- [ ] Verificar dominio propio en Resend y actualizar `RESEND_FROM_EMAIL` — actualmente en modo sandbox con `onboarding@resend.dev`
- [ ] Conectar el checkout del shop a un payment processor real (Stripe o MercadoPago)
- [ ] Poblar `MOCK_BEATS` en `apps/web/src/data/shop-data.ts` con beats reales (archivos WAV/MP3 en `/public/assets/audio/samples/` + artwork)
- [ ] Poblar `MOCK_PRODUCTS` con fotos y stock real del merch (confirmar que los assets existen en `/public/assets/shop/`)
- [ ] Implementar galería de artworks en `/artists/[id]` — los 4 boxes del grid son placeholders vacíos
- [ ] Unificar el email de contacto: decidir entre `hola@nomades.uy` (footer) y `nmd.wav@gmail.com` (sistema de reservas)
- [ ] Reemplazar `require('fs').appendFileSync` en `apps/web/src/lib/actions/booking.ts` con `console.error` o un logger compatible con serverless (Sentry)
- [ ] Confirmar que los archivos de audio del shop existen en `public/assets/audio/samples/cardo_144_caba.wav` y `fardo_140_caba.wav`
- [ ] Revisar que el modelo 3D del logo existe en `public/` y que ThreeDLogoViewer / StaticThreeDLogo no tienen errores WebGL en producción
- [ ] Añadir variant selection (talle) al flujo de carrito — actualmente los productos físicos se agregan sin seleccionar variante

## Baja prioridad

- [ ] Decidir si montar `SoloPolvoSection` en la homepage (`app/page.tsx`) — el componente existe pero está sin usar
- [ ] Considerar persistencia de bookings en base de datos (Supabase o Neon) — actualmente la reserva no se persiste; si el email falla, se pierde
- [ ] Añadir rate limiting al endpoint `/api/webhooks/resend` para prevenir abuso de tokens
- [ ] Agregar Open Graph y Twitter Card tags a las páginas `/artists/[id]` para sharing en redes
- [ ] Agregar `robots.txt` y `sitemap.xml` para SEO
- [ ] Revisar accesibilidad: agregar `aria-label` a botones SVG del BeatPlayer y BeatList
- [ ] Definir convención de idioma — el contenido mezcla español e inglés en labels (SHOP_CART en inglés, "RESERVAR SESIÓN" en español)
- [ ] Evaluar si el `"use client"` en `apps/web/src/app/page.tsx` es necesario o si las secciones pueden ser Server Components
- [ ] Agregar paginación o filtros al catálogo de beats si crece más de 10 items
- [ ] Documentar el flujo de aprobación de reservas para el admin (cómo funciona el email con botones confirm/reject)
