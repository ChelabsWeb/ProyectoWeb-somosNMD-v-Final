# Story 2.3: session-type-selection-bento-cards

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As an Artist booking the studio,
I want to choose between "Solo Estudio" or "Estudio + Productor" using large, clear cards,
So that I can quickly define the type of session I need without reading small dropdowns.

## Acceptance Criteria

1. **Given** I have selected a valid time slot
   **When** I proceed to the next step horizontally
   **Then** I am presented with two large Bento Cards for the session modes ("Solo Estudio" and "Estudio + Productor").
2. **Given** the Session Type Bento Cards are visible
   **When** I select one of the cards
   **Then** it updates my booking state and advances me horizontally to the final data step.

## Tasks / Subtasks

- [x] Task 1: Create the SessionTypeCards Component
  - [x] Create `src/components/blocks/session-type-cards.tsx`.
  - [x] Implement two "Bento-style" cards displaying the available options: "Solo Estudio" and "Estudio + Productor".
- [x] Task 2: Implement "Brutalista Elegante" Styling
  - [x] Make the cards large and clear (`rounded-[2rem]` minimum radiuses, bold typography).
  - [x] Add `framer-motion` spring animations for hover/active states to make them feel highly tactile.
  - [x] Ensure optimal visualization on both mobile and desktop (adhering to Mobile First).
- [x] Task 3: Integrate state with `useBooking`
  - [x] Inspect the existing `useBooking` hook and update it to support and store `sessionType` if it doesn't already.
  - [x] Verify that transitioning from step 1 (TimeSlot) to step 2 (Session Type) and then step 3 works seamlessly.
- [x] Task 4: Testing & Integration
  - [x] Integrate the component as the second step inside `src/components/sections/booking-module.tsx`.
  - [x] Write logic to slide horizontally from step 1 to step 2 using Framer Motion (`AnimatePresence` / `motion.div`).
  - [x] Write Vitest unit tests for the explicit interaction of selecting a session type mapping to correct state updates.

## Dev Notes

### Dev Agent Guardrails
- **Architecture Constraints**: Strict Serverless context.
- **UX Requirement (Optimistic UI)**: Interactions should feel instant. Provide high value visual feedback on hover/click using Framer Motion (spring bouncy feel).
- **Component Boundaries**: The new component should accept callbacks or use the `useBooking` hook to trigger state updates gracefully, remaining isolated for testing.
- **Styling Requirements**: Brutalista Elegante aesthetics means Midnight Blue bg, Tron Orange accents, and no default borders. The bounding box of the cards should use CSS grid rules as defined in the UX specification.

### Latest Tech Information
- **Framer Motion & Next.js App Router**: Ensure `layoutId` or variant animations trigger correctly inside the booking wizard without hydration mismatches. Use `"use client"` directive on interactive components.

### Previous Story Intelligence
- **From Story 2.2**: The responsive context (`BookingModule` with `Dialog`/`Drawer`) is already established. You will render `SessionTypeCards` inside that shell as exactly step 2 of the wizard. The `TimeSlotGrid` handles step 1. 
- A robust Vitest environment is set up. You **must** write unit tests for `session-type-cards.test.tsx` using `target-testing` or similar, to continue the test-driven paradigm.

### Project Structure Notes
- `src/components/blocks/session-type-cards.tsx` [NEW]
- `src/components/blocks/session-type-cards.test.tsx` [NEW]
- `src/hooks/use-booking.ts` [MODIFIED - if needed for state]
- `src/components/sections/booking-module.tsx` [MODIFIED - to insert this component as step 2]

### References
- Architecture Patterns: Naming, Frontend Architecture, and Component Boundaries. [Source: _bmad-output/planning-artifacts/architecture.md]
- UX Design Specs: Interactive Bento UI grids, Progressive Disclosure, Form Patterns. [Source: _bmad-output/planning-artifacts/ux-design-specification.md]

## Dev Agent Record

### Agent Model Used

Antigravity

### Debug Log References

- Verified that AnimatePresence `custom` property directs the exit and enter sliding animations appropriately
- Detected that local state tracking in `BookingModule` is more appropriate than using `useBooking` strictly for React Query

### Completion Notes List

- Implemented `SessionTypeCards` with Brutalista Elegante aesthetics (Midnight Blue background, distinct borders, round corners, and Tron Orange highlights)
- Wrapped Booking Module inner components into `AnimatePresence` to enable spring animations when sliding horizontally between step 1 (TimeSlot) and step 2 (SessionType)
- Created unit tests verifying rendering, click handling, and dynamic styling selection (aria-pressed checks)

### File List

- `apps/web/src/components/blocks/session-type-cards.tsx` [NEW]
- `apps/web/src/components/blocks/session-type-cards.test.tsx` [NEW]
- `apps/web/src/components/sections/booking-module.tsx` [MODIFIED]
