---
stepsCompleted: [1]
inputDocuments: [
  "c:\\Users\\Estudiante UCU\\Desktop\\ProyectoWeb-somosNMD-v-Final\\_bmad-output\\planning-artifacts\\architecture.md",
  "c:\\Users\\Estudiante UCU\\Desktop\\ProyectoWeb-somosNMD-v-Final\\_bmad-output\\planning-artifacts\\ux-design-specification.md"
]
---

# ProyectoWeb-somosNMD-v-Final - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for ProyectoWeb-somosNMD-v-Final, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Landing Page & Portfolio - Presentación fluida de 12 perfiles de artistas organizados en grillas asimétricas con visualización de portfolio.
FR2: Studio Booking System - Calendario interactivo con bloques de 3 horas y selector de modalidad (Estudio Solo vs. Con Productor).
FR3: Studio Booking System - Formulario simplificado para la captura de datos (Nombre y Email) dentro de un Bottom Sheet/Modal.
FR4: Administrative Booking Management - Envío de solicitudes vía email al administrador con botones para Confirmar/Rechazar utilizando webhooks de Resend.
FR5: Administrative Booking Management - Auto-cancelación de solicitudes concurrentes solapadas al confirmar una reserva.
FR6: Administrative Booking Management - Generación automática del evento en Google Calendar tras la confirmación de la reserva.

### NonFunctional Requirements

NFR1: Performance - Las interacciones deben sentirse instantáneas ("Optimistic UI"). Las animaciones (GSAP/Framer Motion) deben correr a 60fps constantes, especialmente en móvil.
NFR2: Performance - Las fotografías pesadas del portfolio requieren Lazy-loading.
NFR3: Resilience - Manejo de estado resiliente frente a conexiones móviles inestables (3G throttling protection).
NFR4: Accessibility - Cumplimiento mínimo de WCAG Nivel AA (Manejo correcto de focus, ARIA tags para animaciones y contrastes severos).
NFR5: Responsive Design - Mobile First estricto, con adaptabilidad hacia Desktop (el Bottom Sheet móvil mutará a un Modal en escritorio).

### Additional Requirements

- Starter Template: Utilizar el Official Next.js CLI (`create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`) como base limpia (Epic 1 Story 1).
- Infraestructura: Despliegue en Vercel utilizando Next.js App Router y Server Actions exclusivas (sin pages/api tradicionales excepto para el webhook).
- Estética: Filosofía "Brutalista Elegante" - Colores Midnight Blue y Tron Orange, bordes de 12px-16px, tipografías gigantes condensadas, uso de Tailwind CSS y override de ShadcnUI.
- Animaciones: GSAP (ScrollTrigger) obligatorio para Logo Post-Hero; `framer-motion` para transiciones de componentes y el Wizard del Bottom Sheet.
- Notificaciones: Uso exclusivo de la librería `sileo` para Toasts con transiciones "spring".
- Manejo de Datos: Zod para validación tanto en cliente como en servidor. TanStack Query (`useMutation`) para las peticiones asíncronas de reserva.
- Seguridad: No hay autenticación de usuarios finales. La seguridad del Admin se basa en webhooks/firmas criptográficas desde el email.

### FR Coverage Map

FR1: Epic 1 - Landing Page & Portfolio Visual
FR2: Epic 2 - Studio Booking Experience
FR3: Epic 2 - Studio Booking Experience
FR4: Epic 3 - Administrative Booking Backend
FR5: Epic 3 - Administrative Booking Backend
FR6: Epic 3 - Administrative Booking Backend

## Epic List

### Epic 1: Landing Page & Portfolio Visual
El usuario (fan, prospecto o artista) puede descubrir a los 12 artistas del grupo a través de una experiencia visual "Brutalista Elegante" altamente responsiva y animada, entendiendo inmediatamente la propuesta de valor y calidad del estudio.
**FRs covered:** FR1

### Epic 2: Studio Booking Experience
Los artistas y usuarios pueden encontrar disponibilidad e ingresar sus datos para solicitar una reserva de estudio de manera instantánea e intuitiva desde cualquier dispositivo, sin fricciones ni esperas.
**FRs covered:** FR2, FR3

### Epic 3: Administrative Booking Backend
El administrador del estudio puede gestionar, confirmar o rechazar las solicitudes de reserva directamente desde su correo electrónico. El sistema mantendrá automáticamente la congruencia de los horarios frente a concurrencias y registrará los eventos aprobados en Google Calendar de forma invisible para el cliente.
**FRs covered:** FR4, FR5, FR6

<!-- Repeat for each epic in epics_list (N = 1, 2, 3...) -->

## Epic 1: Landing Page & Portfolio Visual

El usuario (fan, prospecto o artista) puede descubrir a los 12 artistas del grupo a través de una experiencia visual "Brutalista Elegante" altamente responsiva y animada, entendiendo inmediatamente la propuesta de valor y calidad del estudio.

### Story 1.1: Project Initialization & Theming

As a Developer,
I want to initialize the Next.js project with Tailwind CSS and ShadcnUI, configuring the "Brutalista Elegante" design system tokens (colors, typography, border-radii),
So that the foundation is set for all subsequent UI components.

**Acceptance Criteria:**

**Given** an empty project directory
**When** the developer runs the initialization commands
**Then** a Next.js App Router project is created with Tailwind CSS
**And** global CSS variables for Midnight Blue and Tron Orange are configured
**And** base ShadcnUI typography and border-radius overrrides are applied.

### Story 1.2: Hero Section & Logo Animation

As a Site Visitor,
I want to see a striking Hero section with a GSAP-powered logo animation upon first load,
So that I am immediately immersed in the premium, underground aesthetic of the brand.

**Acceptance Criteria:**

**Given** I navigate to the landing page
**When** the page loads
**Then** I see the Hero section with massive, condensed typography
**And** the post-hero logo smoothly animates into view using GSAP ScrollTrigger
**And** the layout is fully responsive across mobile, tablet, and desktop.

### Story 1.3: Artists Asymmetric Grid Structure

As a Site Visitor,
I want to view the 12 artist profiles organized in an asymmetric "Bento-box" grid,
So that I can easily browse the group members without visual fatigue.

**Acceptance Criteria:**

**Given** I scroll past the Hero section
**When** the artist section becomes visible
**Then** I see an asymmetric CSS grid layout containing 12 placeholders/cards
**And** the grid changes from 1 column (mobile) to 3 columns (desktop) seamlessly.

### Story 1.4: Artist Profile Cards & Lazy Loading

As a Site Visitor,
I want to see high-quality images and basic information for each artist within the grid,
So that I can learn about them without the page loading slowly.

**Acceptance Criteria:**

**Given** the artists grid is rendered
**When** I scroll to view the artists
**Then** each artist's Bento card displays their image, name, and role
**And** images are lazy-loaded using Next.js `<Image>` component for optimal performance
**And** the cards have a subtle hover/active state using Framer Motion (spring physics).

## Epic 2: Studio Booking Experience

Los artistas y usuarios pueden encontrar disponibilidad e ingresar sus datos para solicitar una reserva de estudio de manera instantánea e intuitiva desde cualquier dispositivo, sin fricciones ni esperas.

### Story 2.1: Booking Trigger & Bottom Sheet/Modal Shell

As a Site Visitor,
I want to click an always-visible "Reservar" CTA that opens a smooth overlay (Bottom Sheet on mobile, Modal on desktop),
So that I can enter the booking flow without losing context of the landing page.

**Acceptance Criteria:**

**Given** I am on any part of the landing page
**When** I click the sticky "Reservar" button
**Then** a ShadcnUI Sheet component opens instantly (sliding up on mobile, fading centered on desktop)
**And** I can close it easily via swipe-down or clicking outside.

### Story 2.2: Interactive TimeSlotGrid

As a Site Visitor,
I want to see a clear grid of 3-hour blocks indicating available and occupied times for a selected day,
So that I can choose a valid time for my session without guessing.

**Acceptance Criteria:**

**Given** I have opened the booking Sheet
**When** I view the first step of the booking wizard
**Then** I see the `TimeSlotGrid` component showing blocks of 3 hours
**And** occupied slots are visually distinct and unclickable
**And** selecting an available slot highlights it and enables moving to the next step.

### Story 2.3: Session Type Selection (Bento Cards)

As an Artist booking the studio,
I want to choose between "Solo Estudio" or "Estudio + Productor" using large, clear cards,
So that I can quickly define the type of session I need without reading small dropdowns.

**Acceptance Criteria:**

**Given** I have selected a valid time slot
**When** I proceed to the next step horizontally
**Then** I am presented with two large Bento Cards for the session modes
**And** selecting one updates my booking state and advances me to the final data step.

### Story 2.4: Booking Data Form & Optimistic Submission

As an Artist booking the studio,
I want to enter my Name and Email and see an immediate confirmation upon submission,
So that I know my request was received even if my internet connection is slow.

**Acceptance Criteria:**

**Given** I have selected a time and session type
**When** I arrive at the final step
**Then** I see a minimalist form requesting Name and Email
**And** Zod validates the email format inline before allowing submission
**When** I click "Solicitar Reserva"
**Then** an optimistic `sileo` success Toast appears immediately
**And** a React Query mutation is triggered in the background to handle the Server Action.

## Epic 3: Administrative Booking Backend

El administrador del estudio puede gestionar, confirmar o rechazar las solicitudes de reserva directamente desde su correo electrónico. El sistema mantendrá automáticamente la congruencia de los horarios frente a concurrencias y registrará los eventos aprobados en Google Calendar de forma invisible para el cliente.

### Story 3.1: Resend Integration & Admin Notification Email

As a System Administrator,
I want to receive a beautifully formatted email containing the booking request details and actionable buttons (Confirm/Reject),
So that I can review and manage requests without needing to log into a separate dashboard.

**Acceptance Criteria:**

**Given** a user successfully submits a booking request
**When** the Server Action processes the request
**Then** an email built with `@react-email/components` is dispatched via Resend to `nmd.wav@gmail.com`
**And** the email contains the applicant's Name, Email, Requested Time Slot, and Session Type
**And** the email includes visually distinct "Confirm" and "Reject" buttons that link to our secure webhook endpoint.

### Story 3.2: Secure Webhook Endpoint for Email Actions

As a System Administrator,
I want the "Confirm" and "Reject" buttons in my email to securely trigger the corresponding state changes in the system without authentication friction,
So that I can manage bookings with a single click securely.

**Acceptance Criteria:**

**Given** I receive a booking request email
**When** I click the "Confirm" or "Reject" button
**Then** a `GET` or `POST` request is sent to `src/app/api/webhooks/resend/route.ts`
**And** the webhook verifies a secure token/signature to ensure the request is legitimate
**And** the system updates the status of the booking request accordingly
**And** I see a simple success confirmation page/message in my browser.

### Story 3.3: Google Calendar Synchronization

As a System Administrator,
I want confirmed bookings to automatically create events in the studio's Google Calendar,
So that availability is always up-to-date and prevents double-booking.

**Acceptance Criteria:**

**Given** I confirm a booking request via the email webhook
**When** the system processes the confirmation
**Then** the `calendar.ts` service uses a Google Service Account (JWT) to create an event in the designated Google Calendar
**And** the event blocks the exact 3-hour slot requested
**And** the `TimeSlotGrid` on the frontend correctly reads this new event as "Occupied" for future visitors.

### Story 3.4: Concurrency Handling & Applicant Notification

As a System Administrator,
I want the system to automatically reject overlapping requests and notify the applicants,
So that I don't have to manually email people when a time slot they requested gets taken by someone else.

**Acceptance Criteria:**

**Given** multiple users have requested the same time slot
**When** I confirm one of the requests
**Then** the system automatically identifies the other pending requests for that exact slot
**And** marks them as rejected internally
**And** sends an automated apology email to the rejected applicants using Resend
**And** sends a confirmation success email to the approved applicant.
