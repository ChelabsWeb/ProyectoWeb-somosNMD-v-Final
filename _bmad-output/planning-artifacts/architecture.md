---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments: ["c:\\Users\\Estudiante UCU\\Desktop\\ProyectoWeb-somosNMD-v-Final\\_bmad-output\\planning-artifacts\\ux-design-specification.md"]
workflowType: 'architecture'
lastStep: 8
status: 'complete'
project_name: 'ProyectoWeb-somosNMD-v-Final'
user_name: 'NMD'
date: '2026-02-27T15:24:00Z'
completedAt: '2026-02-27'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
- **Landing Page & Portfolio:** Presentación fluida de 12 perfiles de artistas organizados en grillas asimétricas con visualización de portfolio (fotografías, lanzamientos).
- **Studio Booking System:** Un módulo integral de reservas de 3 horas que incluye:
  - Selector interactivo de bloques de tiempo en un calendario.
  - Selección de modalidad (Estudio Solo vs. Con Productor).
  - Captura simplificada de datos (Nombre y Email).
- **Administrative Booking Management:**
  - Envío de solicitudes vía email al administrador (nmd.wav@gmail.com).
  - Webhooks integrados en el email (Botones Confirmar/Rechazar).
  - Auto-cancelación de solicitudes concurrentes solapadas al confirmar una.
  - Generación automática del evento en Google Calendar tras la confirmación.

**Non-Functional Requirements:**
- **Performance (Velocidad como Feature):** Las interacciones deben sentirse instantáneas ("Optimistic UI"), especialmente al reservar. Las fotografías pesadas requieren Lazy-loading. Las animaciones (GSAP / Framer Motion) deben correr a 60fps sin *jankiness* en móvil.
- **Resilience:** Manejo de estado resiliente frente a conexiones móviles inestables (3G throttling protection).
- **Accessibility:** Cumplimiento mínimo de WCAG Nivel AA (Manejo correcto de focus, ARIA tags para animaciones y contrastes severos).

**Scale & Complexity:**
Este MVP maneja un volumen de datos bajo pero requiere una orquestación de servicios de terceros (Resend, Google Calendar) muy precisa para evitar dobles reservas, además de un frontend altamente animado y customizado.

- Primary domain: Web (Full-stack Serverless)
- Complexity level: Medium (Alta en orquestación UI/UX, Baja en esquema de Base de Datos).
- Estimated architectural components: ~4 Core (Frontend App, Server Actions/API, Email Provider, Calendar Integration).

### Technical Constraints & Dependencies

- **Design System Constraint:** Adopción obligatoria de filosofía "Brutalista Elegante" (Tailwind CSS puro para utilidades masivas, override manual de ShadcnUI eliminando bordes estándar en favor de radius `12px-16px` y sombras sólidas).
- **Motion Constraint:** Uso mandatario de `GSAP` para la animación del Logo Post-Hero y `framer-motion` para transiciones de componentes y el Wizard en el Bottom Sheet. Notificaciones nativas delegadas a la librería `sileo`.
- **Infrastructure:** Arquitectura Serverless recomendada (Server Actions en Next.js) para reducir la sobrecarga de un backend separado e integrar directamente Zod para la validación de formularios. Mantenimiento del ecosistema React/Next.js.

### Cross-Cutting Concerns Identified

- **State Management & Optimistic UI:** La UI debe reflejar éxito inmediato de cara al usuario en el móvil mientras el backend resuelve el encolamiento de las peticiones vía Server Actions.
- **Responsive Navigation State:** El cambio drástico del UI entre Mobile (Bottom Sheet / Drawer) y Desktop (Dialog Modal centrado) requiere un componente responsivo híbrido utilizando hooks (`useMediaQuery`).

## Starter Template Evaluation

### Primary Technology Domain

**Full-stack Web (Serverless Focus)** based on project requirements analysis. La necesidad de Server Actions para los envíos de correos (Resend) y el control absoluto del SSR (Server-Side Rendering) apuntan nativamente a Next.js.

### Starter Options Considered

1.  **EthanL06/nextjs-shadcn-tailwind-framer-firebase-starter:** Muy completo (incluye Framer Motion y Shadcn pre-instalados), pero trae Firebase por defecto, lo cual viola nuestra restricción de mantener el backend lean (solo necesitamos Server Actions y APIs de terceros, no una base de datos pesada como Firebase).
2.  **Mainline Next.js template (con MDX y Tailwind v4):** Excelente base moderna, pero trae configuraciones documentales (MDX) que añaden "ruido" al repositorio para un MVP puramente transaccional/visual.
3.  **Official `create-next-app@latest`:** El estándar de la industria. Permite iniciar un proyecto React 19 / Next 15 completamente limpio con Tailwind CSS configurado por defecto, dejándonos el lienzo en blanco exacto para instalar Shadcn UI a nuestra medida (sin bordes pre-estilizados corporativos) e inyectar GSAP manualmente.

### Selected Starter: Official Next.js CLI (`create-next-app`)

**Rationale for Selection:**
Para lograr la estética **Brutalista Elegante**, no nos sirve un starter que ya traiga componentes de diseño muy opinables (plantillas pre-hechas). Necesitamos la infraestructura de ruteo y styling más robusta posible (Next.js App Router + Tailwind CSS inicial), sobre la cual instalaremos selectivamente los bloques atómicos de ShadcnUI y las librerías de animación (`sileo`, `GSAP`, `framer-motion`). Usar el starter oficial nos asegura evitar vulnerabilidades tempranas y "vendor lock-in" de templates comunitarios abandonados.

**Initialization Command:**

```bash
npx create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```
*(Se ejecuta en el directorio raíz del proyecto)*

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript estricto habilitado por defecto.
- Entorno de ejecución de Node.js / Vercel Edge compatible (React 19, Next 15).

**Styling Solution:**
- Tailwind CSS configurado de fábrica (PostCSS), listo para sobreescribir las directivas globales con nuestros variables Brutalistas (Midnight Blue, Tron Orange).

**Build Tooling:**
- Next.js Compiler integrado (SWC / Turbopack opcional para desarrollo rápido). Compilación optimizada out-of-the-box.

**Testing Framework:**
- El CLI oficial *no* impone un framework de testing. (Elegiremos explícitamente Vitest/Playwright en el próximo paso basado en esta decisión limpia).

**Code Organization:**
- Enrutamiento basado en archivos (App Router - `src/app/`).
- Convención de carpetas estricta: `src/components`, `src/lib`, etc. (Gracias a la flag `--src-dir`).

**Development Experience:**
- ESLint (Strict Next.js core-web-vitals) ya configurado.
- Hot Module Replacement (HMR) extremadamente rápido mediante el servidor de desarrollo nativo.

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- **Hosting / Deployment Strategy:** Vercel (Requerido para soporte óptimo de Server Actions y el App Router de Next.js sin configurar infraestructura personalizada).
- **Email Infrastructure:** Resend API (Node SDK `resend` v4.x o superior) para enviar correos transaccionales con React Email y recibir webhooks determinísticos.
- **Form Validation:** Zod (v4.3.x estable) validando esquemas tanto en el cliente (React Hook Form) como en el servidor (Server Actions).

**Important Decisions (Shape Architecture):**
- **Animation Orchestration:** GSAP (ScrollTrigger para el Logo post-hero) coexistiendo con Framer Motion (para micro-interacciones de la grilla Bento y el Bottom Sheet `layoutId`).
- **Calendar Integration:** Google Calendar API (v3) autenticado vía Service Account (JWT) para inyectar los eventos al backend de manera invisible al cliente.

**Deferred Decisions (Post-MVP):**
- **Persistent Database:** Diferido. El MVP no requerirá guardar el historial de reservas en una base de datos propia (ej. PostgreSQL/Prisma). El estado real de ocupación se derivará leyendo directamente los eventos existentes en el Google Calendar, manteniendo la arquitectura 100% Serverless y lean.

### Data Architecture

- **Category:** Caching & State
- **Decision:** React Query (TanStack Query v5) + Next.js fetch cache.
- **Rationale:** Necesitamos "Optimistic UI" para que el formulario sienta que responde en milisegundos. TanStack Query manejará el estado de la mutación de la reserva y el estado de carga de la disponibilidad horaria con extrema resiliencia a redes 3G lentas.
- **Affects:** Booking Flow (TimeSlotGrid, Booking Form).

### Authentication & Security

- **Category:** Authorization Patterns
- **Decision:** No auth para usuarios finales (Landing). Autenticación basada en Webhooks verificados/Firmas criptográficas para los enlaces de "Confirmar/Rechazar" enviados por correo al administrador.
- **Rationale:** Simplifica el MVP inmensamente. El artista llena sus datos libremente. El admin (NMD) decide si aprueba el slot dando click a un link seguro en su correo.
- **Affects:** Resend Integration, Server Actions Endpoint.

### API & Communication Patterns

- **Category:** Server-Client Sync
- **Decision:** Next.js Server Actions exclusivas (Sin endpoints `pages/api/` tradicionales).
- **Rationale:** Minimiza el código puente y mejora los tiempos de desarrollo al permitir llamar a funciones de backend (`enviarReserva`) directamente desde los formularios del cliente, con type-safety total gracias a Zod.
- **Affects:** Forms, Email Dispatcher.

### Frontend Architecture

- **Category:** Component State & UI Pattern
- **Decision:** ShadcnUI fuertemente modeado (headless Radix UI bajo el capó) + `sileo` para Toasts interactivos.
- **Rationale:** Requerido por la especificación de UX "Brutalismo Elegante". Shadcn nos da la accesibilidad y el control de los Modals/Bottom Sheets, mientras que Tailwind nos permitirá implementar el look "Bento box" (16px radius, sombras fuertes) sin depender de librerías de componentes rígidas.
- **Affects:** Global UI Component Library (`src/components/ui/*`).

### Infrastructure & Deployment

- **Category:** Hosting Strategy
- **Decision:** Vercel.
- **Rationale:** El proyecto exige Server Actions, Edge caching y un despliegue sin fricciones (CI/CD directo desde GitHub) para Next.js 15. Es la ruta de menor resistencia para MVPs de alta performance.
- **Affects:** CI/CD Workflow.

### Decision Impact Analysis

**Implementation Sequence:**
1. Configuración de Hosting (Vercel) e integración con GitHub.
2. Setup base (Next.js CLI, Tailwind variables "Midnight Blue/Tron Orange", Shadcn primitivos).
3. GSAP Logo Animation & Hero Section (Validar impacto visual).
4. Integración Resend + React Email (Testear envío y parseo de webhooks confirmatorios).
5. Integración Google Calendar (Lectura de slots disponibles y escritura).
6. Construcción del Booking Workflow (Framer motion UI + TanStack Query + Zod Server Actions).

**Cross-Component Dependencies:**
- El **Booking Workflow** (Frontend) está estrictamente acoplado al éxito del **Zod Schema** (Shared) y a las precondiciones de **Google Calendar** (si la API falla devolviendo vacíos, la UI debe caer elegantemente).
- La convivencia de **GSAP** (ScrollTrigger) y **Framer Motion** requiere cuidado para no solapar listeners de scroll en el documento principal, reservando GSAP estrictamente para el Hero/Logo sequence y Framer para layouts locales.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
Hemos identificado 4 áreas críticas donde los agentes de IA podrían divergir e introducir bugs o romper la estética del "Brutalismo Elegante" en este MVP Next.js:
1. Enrutamiento y manejo de estado (Server Actions vs Route Handlers).
2. Nomenclatura Brutalista de CSS (Tailwind overrides vs Shadcn defaults).
3. Organización de estado de animaciones compartidas (GSAP vs Framer).
4. Manejo de Errores transaccionales en Server Actions.

### Naming Patterns

**API & Server Actions Naming:*
- Los Server Actions se nombrarán siguiendo el patrón *verboAcción* en camelCase. Ej: `createBooking`, `confirmBookingWebhook`.
- Evitaremos crear la carpeta tradicional `pages/api` o `app/api` a menos que sea estrictamente necesario para el Webhook de Resend. El webhook se llamará explícitamente `/api/webhooks/resend`.

**Code & Component Naming:**
- Todos los Componentes React usarán PascalCase estricto. Ej: `BookingBentoCard.tsx`, `TimeSlotGrid.tsx`.
- Los archivos en Next.js App Router (páginas, layouts) mantendrán el estándar lowercase: `page.tsx`, `layout.tsx`.
- Las variables de Tailwind CSS para el "Brutalismo Elegante" se accederán usando *kebab-case*, reflejando estatus: `bg-nmd-midnight`, `text-nmd-orange`.

### Structure Patterns

**Project Organization:**
- Se usará la convención impuesta por Next.js `src/`:
  - `src/app/`: Estrictamente para rutas.
  - `src/components/ui/`: Componentes atómicos base de ShadcnUI.
  - `src/components/sections/`: Componentes complejos organizados por área de la Landing Page (Hero, ArtistsGrid).
  - `src/lib/actions/`: Todos los Server Actions centralizados aquí, aislados de los componentes visuales para reusabilidad.

**File Structure Patterns:**
- Las definiciones de tipos de TypeScript y schemas de Zod compartirán archivo cuando modelan un dominio directo. Ej: `src/lib/validations/booking.ts`.
- Los hooks custom que orquestan animaciones irán a `src/hooks/use-gsap-sequence.ts`.

### Format Patterns

**Data Exchange Formats:**
- Todos los datos de intercambio en Server Actions deben parsearse primero a través de **Zod**.
- La respuesta unificada obligatoria para cualquier Server Action retornará un objeto estructurado para *ActionState*: 
  `{ success: boolean, message?: string, error?: Record<string, string[]> | string, data?: T }`.
- JSON field naming: **camelCase** estrictamente en el backend TS para mapear naturalmente con React.

### Communication Patterns

**State Management Patterns:**
- Las mutaciones complejas (como la Reserva de Estudio) se invocarán mediante **TanStack Query** (`useMutation`), pasando la Server Action como la función asíncrona. Esto estandariza la captura del estado `isPending` y `isError` sin llenar el componente de variables `useState`.
- **Zustand** o contexto global no está permitido temporalmente a menos que el carrito de reservas crezca. Mantendremos el estado local en el `Bottom Sheet` / `Modal`.

### Process Patterns

**Error Handling Patterns:**
- **No silenciar bloqueos.** Si Google Calendar falla, el Server Action debe atrapar la excepción y retornar la estructura coherente: `{ success: false, message: 'Google Calendar Sync Error' }`.
- En el frontend, React Query escuchará el `success: false` artificial y derivará en invocar un **Sileo Toast Rojo vibrante** (`toast.error('Ocurrió un error...')`), nunca una alerta de navegador nativa.

**Loading State Patterns:**
- **Nunca bloquear toda la pantalla.** El patrón dictamina "Optimistic UI": el botón de reservar solo mostrará un micro-spinner interior (o un estado deshabilitado parcial) manteniendo el contexto visible mientras viaja el evento Sileo local de confirmación.

### Enforcement Guidelines

**All AI Agents MUST:**
- Preferir validación **Zod** nativa para todo Input y nunca confiar en validaciones HTML crudas.
- Dejar las transiciones base a `framer-motion` (ej. `layoutId` para mover las Bento Cards) pero NO usarlo para la animación inicial compleja de carga del logo (GSAP mandatorio ahí).
- Jamás usar estilos *Inline* en los componentes. Todas las marcas "Brutalistas" deben inyectarse mediante tailwind clases o `tailwind-merge` (`cn`).

### Pattern Examples

**Good Examples:**
```tsx
// Correct Server Action Pattern
export async function createBookingRequest(data: BookingData) {
  const validatedFields = bookingSchema.safeParse(data);
  if (!validatedFields.success) {
    return { success: false, error: validatedFields.error.flatten().fieldErrors };
  }
  // Procesar...
  return { success: true, message: "Enviado a revisión" };
}
```

**Anti-Patterns:**
```tsx
// Anti-Pattern: Componente suelto haciendo throw de error no estructurado, rompiendo la UI en móviles
export async function submit(data: any) {
    const res = await fetch('/api/booking', { body: data });
    if (!res.ok) throw new Error("Fallo la api");
    return res.json();
}
```

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
ProyectoWeb-somosNMD-v-Final/
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json             # Configuración CLI de ShadcnUI
├── .env.local                  # Claves de Google Calendar y Resend
├── .gitignore
├── src/
│   ├── app/
│   │   ├── globals.css         # Reset Brutalista y tokens Tailwind
│   │   ├── layout.tsx          # Root Layout (Fuentes, Metadata, QueryProvider)
│   │   ├── page.tsx            # Landing Page Principal
│   │   ├── not-found.tsx       # Página 404 personalizada "En Construcción"
│   │   └── api/
│   │       └── webhooks/
│   │           └── resend/
│   │               └── route.ts # Endpoint para recibir aprobaciones de reservas por email
│   ├── components/
│   │   ├── ui/                 # ShadcnUI Components generados automáticamente
│   │   │   ├── button.tsx
│   │   │   ├── sheet.tsx
│   │   │   └── form.tsx
│   │   ├── blocks/             # Componentes Custom "Brutalismo Elegante"
│   │   │   ├── bento-card.tsx
│   │   │   └── time-slot-grid.tsx
│   │   ├── sections/           # Secciones Mayores de la Landing Page
│   │   │   ├── hero.tsx
│   │   │   ├── logo-sequence.tsx
│   │   │   ├── artists-grid.tsx
│   │   │   └── booking-module.tsx
│   │   └── emails/             # Plantillas React Email
│   │       └── reservation-request.tsx
│   ├── lib/
│   │   ├── actions/            # Server Actions para backend logic (Next.js)
│   │   │   └── booking.ts      # createBookingRequest, confirmBookingWebhook
│   │   ├── services/           # Interacción con APIs Externas
│   │   │   ├── calendar.ts     # Wrapper Google Calendar API
│   │   │   └── email.ts        # Wrapper Resend API
│   │   ├── validations/        # Zod Schemas compartidos (Frontend/Backend)
│   │   │   └── booking.ts
│   │   └── utils.ts            # Utilidades generales y tailwind-merge (cn)
│   ├── hooks/
│   │   ├── use-booking.ts      # React Query mutaciones de reserva
│   │   └── use-gsap-sequence.ts # Controladores de animación
│   └── types/
│       └── index.ts            # Tipos TS globales
├── public/                     # Assets estáticos reales preexistentes (Fotos, SVGs)
│   ├── images/
│   │   └── artists/
│   └── fonts/                  # Fuentes locales si no usamos next/font
└── docs/                       # Documentación del proyecto y guías AI
```

### Architectural Boundaries

**API Boundaries:**
- El único endpoint tradicional expuesto será `src/app/api/webhooks/resend/route.ts`. Este actuará como el límite de seguridad (verificando firmas/tokens) para aceptar respuestas desde el correo del administrador. Toda otra interacción API cliente-servidor se cursará mediante Server Actions ubicadas en `src/lib/actions/`.

**Component Boundaries:**
- Los componentes visuales puros (`src/components/blocks/` y `src/components/ui/`) **no pueden** ejecutar Server Actions ni realizar *data fetching* directamente; deben recibir sus *props* o handlers desde las Secciones superiores.
- Los componentes aglutinadores de Feature (`src/components/sections/booking-module.tsx`) son responsables de invocar a los *hooks* de React Query (`use-booking`), manteniendo separada la UI del estado asíncrono.

**Service Boundaries:**
- Los Server Actions (`src/lib/actions/booking.ts`) actúan como orquestadores. Tienen prohibido el contacto directo con la red; la lógica pesada de las integraciones se delega a `src/lib/services/calendar.ts` y `src/lib/services/email.ts`.

### Requirements to Structure Mapping

**Feature/Epic Mapping:**
- **Epic: Landing Page & Portfolio Muestral:**
  - Componentes: `src/components/sections/hero.tsx`, `artists-grid.tsx`
  - Animación Base: `src/components/sections/logo-sequence.tsx`
  - Estilos Globales: `src/app/globals.css`, `tailwind.config.ts`

- **Epic: Studio Booking System (Transaccional):**
  - Componentes UI: `src/components/blocks/time-slot-grid.tsx`, `src/components/sections/booking-module.tsx` (que encapsula el *Bottom Sheet/Modal*).
  - Estado: `src/hooks/use-booking.ts` (TanStack Query)
  - Validación: `src/lib/validations/booking.ts`
  - Orquestación Central: `src/lib/actions/booking.ts`

- **Epic: Administrative Backend (Resend + Google Calendar):**
  - API (Webhook receptor): `src/app/api/webhooks/resend/route.ts`
  - Plantilla Vista Coreo: `src/components/emails/reservation-request.tsx`
  - Lógica Conectores: `src/lib/services/email.ts`, `src/lib/services/calendar.ts`

### Integration Points

**Internal Communication:**
- El **Frontend** invoca los Server Actions mediante *TanStack Query mutations*, capturando las promesas para actualizar su UI optimista.
- Las validaciones **Zod** cruzan la frontera siendo importadas tanto en el cliente (resolver de React Hook Form) como al inicio del Server Action en backend, asegurando tipo de dato y formato.

**External Integrations:**
- **Google Calendar API (v3):** Llamada desde Backend (`services/calendar.ts`) vía Google OAuth2 JWT para listar slots libres y encolar la reserva aprobada. La lectura alimenta el `TimeSlotGrid`.
- **Resend API:** Llamada desde Backend (`services/email.ts`) enviando el template de React renderizado como string al Admin. Recibe eventos asíncronos vía Webhooks en su ruta preestablecida.

### File Organization Patterns

**Source Organization:**
Adoptamos la agrupación por dominio técnico impuesta amablemente por Next.js App Router, pero separamos fuertemente `components/ui/` (código de librería externa autogenerada a ignorar) de `components/blocks/` (nuestro core de diseño brutalista hecho a mano).

**Asset Organization:**
Los assets provistos fotográficos y visuales de los 12 artistas residirán dentro de la carpeta `public/images/artists/`. Todos los componentes React consumirán estas imágenes forzosamente utilizando el componente optimizado `<Image />` de `next/image`.

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
Todas las decisiones tecnológicas (Next.js App Router, Server Actions, React Hook Form + Zod, TanStack Query) provienen del mismo ecosistema moderno de React, asegurando máxima compatibilidad sin dependencias huérfanas o *conflictos de runtime*. El *vendor lock-in* con Vercel está justificado por la necesidad de Server Actions de primera clase y configuración cero.

**Pattern Consistency:**
Los patrones impuestos de nombramiento transversal (kebab-case para variables de Tailwind, camelCase estricto del JSON a TS) garantizan una legibilidad constante. Aislar GSAP para la carga inicial y Framer para layouts de UI previene la superposición de listeners de scroll en el documento.

**Structure Alignment:**
La estructura basada en Next.js App Router (`src/`) mapea perfectamente con el límite estricto que fijamos entre Cliente (Hooks de TanStack en componentes visuales) y Servidor (Logica escondida en `/lib/actions` y `/lib/services`).

### Requirements Coverage Validation ✅

**Epic/Feature Coverage:**
Las tres grandes vertientes están cubiertas:
- Landing Visual: Soportada por la arquitectura de frontend Tailwind/GSAP.
- Sistema de Reservas: Soportado por Hooks + Server Actions orgánicas.
- Admin Backend de baja fricción: Cubierto íntegramente por Resend Webhooks hacia un solo endpoint API, logrando evitar un Dashboard entero.

**Functional Requirements Coverage:**
Se integró satisfactoriamente Google Calendar como fuente de verdad para el sistema de disponibilidades, satisfaciendo la FR de "No duplicar reservas" sin incurrir en costos de BDD.

**Non-Functional Requirements Coverage:**
El *Optimistic UI* diseñado a través de TanStack Query cubre la NFR de resiliencia ante redes lentas (3G). Next.js SSG/ISR ayudará con los LCP (*Largest Contentful Paint*) para la distribución de imágenes pesadas.

### Implementation Readiness Validation ✅

**Decision Completeness:**
Versiones críticas bloqueadas (Zod v4.3, Next v15, Resend v4). SDKs y librerías elegidas conscientemente para evitar fricciones.

**Structure Completeness:**
Árbol validado en todas sus ramas: configuración superficial, assets estáticos, lógica pura (actions/services) y visuales aglutinadas por dominio (blocks/sections/ui).

**Pattern Completeness:**
Contratos de intercambio de Backend-Frontend explícitamente dictaminados: `{ success, data, error, message }` para todo *Server Action*.

### Gap Analysis Results

**Critical Gaps (None):**
El MVP Serverless con Google Calendar es autosuficiente.

**Important Gaps (Solucionados por la Arquitectura):**
No existía un diagrama de estados para cuando la API de Google fallase temporalmente. La arquitectura ha impuesto que `TanStack Query` y `Sileo Toasts` deben envolver estos problemas suavemente sin crashear el Wizard.

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**
- [x] Critical decisions documented con versiones
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**✅ Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**✅ Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** HIGH - Las APIs son estables, el ecosistema es robusto y el scope del MVP al saltarse una BDD tradicional a favor de Google Calendar mitiga el 80% del riesgo.

**Key Strengths:**
- Infraestructura 100% Serverless, reduciendo costos a cero en reposo.
- Completa TypeSafety de punta a punta (Zod -> Server Actions -> UI).
- UI Optimista incorporada por diseño.

**Areas for Future Enhancement:**
- Incorporar una Base de Datos (ej. PostgreSQL + Drizzle) si la tracción requiere guardar un CRM avanzado de clientes más allá del Calendario.
- Panel de Administrador propio cuando el esquema de Webhooks por correo empiece a abrumar la bandeja de nmd.wav@gmail.com.

### Implementation Handoff

**AI Agent Guidelines:**
- Sigan todas las decisiones arquitectónicas estrictamente documentadas aquí.
- Los componentes autogenerados de ShadcnUI en `components/ui` solo deben usarse como bloques base para fabricar en `components/blocks`.
- Toda invocación de estado asíncrono se orquesta en un Hook de TanStack Query, no de forma suelta en un botón.

**First Implementation Priority:**
```bash
npx create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```
