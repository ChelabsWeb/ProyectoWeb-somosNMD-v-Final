# Story 2.1: booking-trigger-bottom-sheet-modal-shell

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Site Visitor,
I want to click an always-visible "Reservar" CTA that opens a smooth overlay (Bottom Sheet on mobile, Modal on desktop),
So that I can enter the booking flow without losing context of the landing page.

## Acceptance Criteria

1. **Given** I am on any part of the landing page
   **When** I click the sticky "Reservar" button
   **Then** a ShadcnUI component opens instantly (sliding up on mobile, fading centered on desktop)
2. **Given** the booking overlay is open
   **Then** I can close it easily via swipe-down (on mobile) or clicking outside/ESC key.

## Tasks / Subtasks

- [x] Task 1: Create the Booking Module Shell and Sticky CTA (AC: 1)
  - [x] Install required ShadcnUI components: `Drawer` (for mobile Bottom Sheet) and `Dialog` (for desktop Modal). This will likely require `vaul` for the drawer.
  - [x] Implement a custom `useMediaQuery` hook (or install `usehooks-ts`) to detect mobile vs desktop viewports (e.g., `(min-width: 1024px)`).
  - [x] Create `src/components/sections/booking-module.tsx` that conditionally renders a `Drawer` wrapper on mobile and a `Dialog` wrapper on desktop.
  - [x] Add a sticky floating "Reservar" button (`Primary Action - Tron Orange Solido`) that opens this wrapper.
- [x] Task 2: Implement "Brutalista Elegante" Styling for the Shell (AC: 1, 2)
  - [x] Apply Midnight Blue background and appropriate rounded borders (`rounded-t-[2rem]` on mobile drawer, `rounded-[2rem]` on desktop dialog).
  - [x] Ensure smooth transitions using `framer-motion` or native ShadcnUI/Vaul physics.
  - [x] Configure the mobile Drawer to support swipe-to-close behavior.
- [x] Task 3: Testing and Quality Assurance
  - [x] Write Unit Tests / Component Tests for `booking-module.tsx` verifying it opens when the CTA is clicked.
  - [x] Verify accessibility properties (focus management, ARIA roles for Dialog/Drawer).

## Dev Notes

- **Architecture Constraints**: "Mobile First Estricto". Responsive hybrid using `useMediaQuery`. Bottom Sheet on mobile, Dialog Modal centered on desktop.
- **Components to Touch**: `src/components/sections/booking-module.tsx`, `src/app/page.tsx` (to include the CTA/module).
- **Libraries/Tech**: Next.js 15 Server Components for layout, Client Components for interaction (`"use client"` needed for the modal/drawer state). Tailwind CSS for Brutalist styling. ShadcnUI Dialog + Drawer (powered by Vaul).
- **Styling**: Background `Midnight Blue`. Accent CTAs `Tron Orange`. High border radius `12px-16px` or `rounded-[2rem]`. Use solid shadows or clean overlays without blur to adhere to Brutalism over pure glassmorphism.
- **Testing**: Previous story intelligence mandates unit tests for all new components. Use Vitest/React Testing Library.

### Project Structure Notes

- Alignment: The overarching module component will live in `src/components/sections/booking-module.tsx`. Any specific UI abstractions should go to `src/components/ui/` if they are direct Shadcn installations. 
- You may need to run `npx shadcn-ui@latest add dialog drawer` to get the necessary primitives. 

### References

- UX Design Specs: Overview of the Drawer/Modal hybrid and visual rules. [Source: _bmad-output/planning-artifacts/ux-design-specification.md]
- Architecture Patterns: Naming, Frontend Architecture, and Component Boundaries. [Source: _bmad-output/planning-artifacts/architecture.md]
- Previous Learnings: Requirements for unit testing and framer-motion interactions derived from Epic 1 Story 4.

## Dev Agent Record

### Agent Model Used

Antigravity / o3a

### Debug Log References

None

### Completion Notes List

- Installed shadcn-ui components `dialog` and `drawer` along with their dependencies.
- Created `useMediaQuery` hook for checking viewport sizes. Make sure it is hydration-safe.
- Implemented `BookingModule` with `Dialog` on desktop (`min-width: 1024px`) and `Drawer` on mobile. Styled using standard "Brutalista Elegante" tokens. 
- Integrated the module into `apps/web/src/app/page.tsx`.
- Wrote and passed 3 unit tests with `vitest` ensuring mobile, desktop renders and CTA interactions are completely tested. AC1 and AC2 met.

### File List

- `apps/web/src/components/sections/booking-module.tsx` [NEW]
- `apps/web/src/components/sections/booking-module.test.tsx` [NEW]
- `apps/web/src/hooks/use-media-query.ts` [NEW]
- `apps/web/src/app/page.tsx` [MODIFIED]
- `apps/web/src/components/ui/dialog.tsx` [NEW]
- `apps/web/src/components/ui/drawer.tsx` [NEW]
- `apps/web/components.json` [MODIFIED] (by shadcn)
- `apps/web/package.json` [MODIFIED] (by shadcn)
