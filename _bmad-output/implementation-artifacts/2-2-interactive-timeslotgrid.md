# Story 2.2: interactive-timeslotgrid

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Site Visitor,
I want to see a clear grid of 3-hour blocks indicating available and occupied times for a selected day,
So that I can choose a valid time for my session without guessing.

## Acceptance Criteria

1. **Given** I have opened the booking Sheet
   **When** I view the first step of the booking wizard
   **Then** I see the `TimeSlotGrid` component showing blocks of 3 hours
2. **Given** the `TimeSlotGrid` is visible
   **Then** occupied slots are visually distinct and unclickable
3. **Given** there are available slots
   **When** selecting an available slot
   **Then** it highlights the slot and enables moving to the next step horizontally.

## Tasks / Subtasks

- [x] Task 1: Create the TimeSlotGrid Component Shell
  - [x] Create `src/components/blocks/time-slot-grid.tsx`.
  - [x] Implement a calendar picker (can use ShadcnUI Calendar for day selection).
  - [x] Display fixed 3-hour blocks for the selected day (e.g. 09:00-12:00, 12:00-15:00, 15:00-18:00, 18:00-21:00).
- [x] Task 2: Implement Data Fetching with TanStack Query v5 + Next.js Server Actions
  - [x] Create a server action in `src/lib/actions/booking.ts` to fetch availability using a mock Google Calendar service (`services/calendar.ts`) for now, adhering to `{ success, data, error, message }` contract.
  - [x] Use `@tanstack/react-query` to fetch available slots.
  - [x] Handle Loading and Error states gracefully (use Sileo Toasts if errors occur, avoid blocking whole screen spinners).
- [x] Task 3: Implement "Brutalista Elegante" Styling
  - [x] Design the time slots using the Bento Box guidelines (`rounded-[2rem]` minimum, Midnight Blue background).
  - [x] Style occupied slots clearly (e.g., `opacity-50`, no click affordance).
  - [x] Style the selected slot heavily (e.g., solid Tron Orange `bg-nmd-orange`).
  - [x] Add Framer Motion spring animations for hover/active states on available slots.
- [x] Task 4: Testing & Integration
  - [x] Render the `TimeSlotGrid` as the first step inside previously created `BookingModule`.
  - [x] Write Vitest unit tests for the TimeSlotGrid component.
  - [x] Ensure accessibility (ARIA tags for availability, keyboard navigation focus visible).

## Dev Notes

### Dev Agent Guardrails
- **Architecture Constraints**: Pure Serverless. Use Server Actions to fetch Google Calendar slot data. TanStack Query v5 for client-side state of available slots. The component must be `"use client"`.
- **UX Requirement (Optimistic UI)**: Interactions should feel instant. Use Framer Motion for micro-interactions (bouncy bento boxes) when tapping slots.
- **Component Boundaries**: `src/components/blocks/time-slot-grid.tsx` should use ShadcnUI base if needed, but styling must be heavily overridden to "Brutalista Elegante" (relying on `tailwind-merge` & `cn()`).
- **Error Handling**: Do not silence backend errors and do not use generic browser alerts. Instead, trigger a vivid Sileo Toast (`toast.error()`).

### Latest Tech Information
- **TanStack Query v5 + React 19 / Next 15**: Use React 19 Server Actions paired with TanStack Query v5's `useQuery` or `useMutation` optimally. TanStack Query simplifies data management on the client while Server Actions remove API route boilerplate. Ensure `QueryClientProvider` is properly set up in a client wrapper layout to support `useQuery`.

### Previous Story Intelligence
- **From Story 2.1**: The responsive context (`BookingModule` with `Dialog`/`Drawer`) is already established. You will render `TimeSlotGrid` inside that shell. The developer established a pattern of writing Vitest tests for new UI components (`booking-module.test.tsx`), so you must continue this testing paradigm.

### Project Structure Notes
- `src/components/blocks/time-slot-grid.tsx` [NEW]
- `src/hooks/use-booking.ts` [NEW or UPDATE if React Query context is needed]
- `src/lib/actions/booking.ts` [NEW]
- `src/lib/services/calendar.ts` [NEW - Mock stub]

### References
- Architecture Patterns: Naming, Frontend Architecture, and Component Boundaries. [Source: _bmad-output/planning-artifacts/architecture.md]
- UX Design Specs: Interactive Bento UI grids, Brutalist Aesthetic Rules. [Source: _bmad-output/planning-artifacts/ux-design-specification.md]

## Dev Agent Record

### Agent Model Used
Antigravity

### Debug Log References
- React Query configuration works successfully using a new QueryProvider integrated in RootLayout.
- Addressed `sileo.toast` method mismatch. Found `sileo` uses `sileo.error()`.
- Shadcn calendar imported securely with required `date-fns` and `react-day-picker`.
- Handled Server Action state validation properly and simulated network delay with 800ms logic for UX testings.

### Completion Notes List
- Mock calendar service `src/lib/services/calendar.ts` implemented.
- Added Booking Server Actions returning ActionState in `src/lib/actions/booking.ts`.
- Encapsulated TanStack context via `useBooking` wrapper securely.
- Responsive, framer-motion micro-interacted TimeSlotGrid inside BookingModule.
- Tested successfully by writing and green-lighting 2 unit tests for TimeSlotGrid, and adapting 3 BookingModule tests to inject the QueryClient provider correctly.

### File List
- `apps/web/package.json` [MODIFIED]
- `apps/web/src/app/layout.tsx` [MODIFIED]
- `apps/web/src/components/blocks/time-slot-grid.test.tsx` [NEW]
- `apps/web/src/components/blocks/time-slot-grid.tsx` [NEW]
- `apps/web/src/components/providers/query-provider.tsx` [NEW]
- `apps/web/src/components/sections/booking-module.test.tsx` [MODIFIED]
- `apps/web/src/components/sections/booking-module.tsx` [MODIFIED]
- `apps/web/src/components/ui/button.tsx` [NEW]
- `apps/web/src/components/ui/calendar.tsx` [NEW]
- `apps/web/src/hooks/use-booking.ts` [NEW]
- `apps/web/src/lib/actions/booking.ts` [NEW]
- `apps/web/src/lib/services/calendar.ts` [NEW]
- `package.json` [MODIFIED]
- `pnpm-lock.yaml` [MODIFIED]
- `docs/architecture/index.md` [MODIFIED]
- `docs/solo-polvo-implementation.md` [MODIFIED]
