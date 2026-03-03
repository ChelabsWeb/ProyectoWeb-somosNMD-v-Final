# Story 2.4: booking-data-form-optimistic-submission

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As an Artist booking the studio,
I want to enter my Name and Email and see an immediate confirmation upon submission,
so that I know my request was received even if my internet connection is slow.

## Acceptance Criteria

1. **Given** I have selected a time and session type
   **When** I arrive at the final step
   **Then** I see a minimalist form requesting Name and Email.
2. **Given** I am filling out the form
   **Then** Zod validates the email format inline before allowing submission.
3. **Given** the form is valid
   **When** I click "Solicitar Reserva"
   **Then** an optimistic `sileo` success Toast appears immediately
   **And** a React Query mutation is triggered in the background to handle the Server Action.

## Tasks / Subtasks

- [x] Task 1: Create the Booking Data Form component
  - [x] Create `src/components/blocks/booking-data-form.tsx`.
  - [x] Implement a minimalist ShadcnUI form for Name and Email inputs.
  - [x] Follow "Brutalista Elegante" aesthetics (e.g., input as a single bottom border on a dark background, massive typography).
- [x] Task 2: Implement Zod Validation & React Hook Form
  - [x] Define or use an existing Zod schema for the booking form data (`name`, `email`, `sessionType`, `timeSlot`).
  - [x] Integrate React Hook Form with the Zod resolver to validate the email format inline before submission.
  - [x] Ensure the submission button is disabled or handles clicks defensively until the input is valid.
- [x] Task 3: Implement Optimistic UI Submission
  - [x] Integrate a React Query mutation (`useMutation` from `@tanstack/react-query`) within `useBooking` or the form component.
  - [x] Trigger the mutation to call a Next.js Server Action (`createBookingRequest` in `src/lib/actions/booking.ts`).
  - [x] Fire an immediate optimistic success notification using `toast.success` from `sileo` upon submission.
- [x] Task 4: Integrate step 3 horizontally into BookingModule
  - [x] Insert `BookingDataForm` as the 3rd step inside `AnimatePresence` in `src/components/sections/booking-module.tsx`.
  - [x] Create Vitest unit tests verifying form validation, submission, and state transitions.

## Dev Notes

### Dev Agent Guardrails

- **Architecture Standards**: UI must reflect optimistic success. State mutations must be triggered using TanStack Query, referencing Server Actions. Zod validation is mandatory at both client and server boundaries.
- **Component Boundaries**: Do not place Server Actions inside the visual components. Actions belong in `src/lib/actions/booking.ts`.
- **Styling Requirements**: Brutalista Elegante. No default bounding boxes for inputs; use minimalist bottom borders (`border-b`). Massive typography scales on focus/input.
- **Feedback Patterns**: Avoid native browser alerts or standard Modals for feedback. Use `sileo` for all Toast notifications with spring physics.

### Architecture Compliance

- **Server Actions**: Return unified structure: `{ success: boolean, message?: string, error?: Record<string, string[]> | string, data?: T }`. Do not throw unhandled errors to the UI. If an error occurs, the server action responds with `{ success: false }` and React Query's `onError` should trigger a red `sileo` toast.
- **Validation**: All data exchange parsed via Zod (`bookingSchema.safeParse(data)`).

### Latest Tech Information

- **TanStack Query v5 / Server Actions**: `useMutation` accepts the Server Action directly. Make sure `mutationFn` is appropriately unwrapping the server response.
- **Sileo**: Ensure `sileo` is properly configured or use `sonner`/native if `sileo` cannot be initialized correctly, but prefer `sileo`'s bouncy toasts.

### Previous Story Intelligence

- `SessionTypeCards` was implemented using `AnimatePresence` and custom sliding animations in `BookingModule`. You must continue utilizing the sliding (`motion.div`) setup for step 3. 
- Local state tracking (e.g. `step` state) is managed within `BookingModule`. Update the navigation state to render the form when reaching the final step.
- Verify `useBooking` hook or Context matches how data from prior steps (time slot, session type) is consolidated with the final name and email.

### Project Structure Notes

- `src/components/blocks/booking-data-form.tsx` [NEW]
- `src/components/blocks/booking-data-form.test.tsx` [NEW]
- `src/lib/actions/booking.ts` [NEW/MODIFIED - To provide the Server Action signature]
- `src/lib/validations/booking.ts` [NEW/MODIFIED]
- `src/components/sections/booking-module.tsx` [MODIFIED - Step 3 integration]

### References

- UX Design Specs: Optimistic UI, Sileo Toasts, Minimalist Form Patterns. [Source: _bmad-output/planning-artifacts/ux-design-specification.md]
- Architecture Patterns: Next.js Server Actions, TanStack Query. [Source: _bmad-output/planning-artifacts/architecture.md]

## Dev Agent Record

### Agent Model Used

Antigravity

### Debug Log References

- Fixed Vitest async validation timing for inline testing
- Moved Zod constraints to robust booking validation schema
- Handled `sileo` module importing via object not named export default

### Completion Notes List

- ✅ Developed BookingDataForm.tsx adhering to Brutalista Elegante UI.
- ✅ Integrated Zod and RHF resolving email formats seamlessly.
- ✅ Implemented createBookingRequest as Server Action matching schema specifications.
- ✅ Wrapped BookingModule with useMutation logic handling submission with graceful Toasts.
- ✅ Added test suite verifying the multi-step module navigation flows.
- ✅ Checked full Vitest regression passing successfully (26/26 tests).

### File List

- `apps/web/src/components/blocks/booking-data-form.tsx` [NEW]
- `apps/web/src/components/blocks/booking-data-form.test.tsx` [NEW]
- `apps/web/src/lib/validations/booking.ts` [MODIFIED]
- `apps/web/src/lib/actions/booking.ts` [MODIFIED]
- `apps/web/src/components/sections/booking-module.tsx` [MODIFIED]
- `apps/web/src/components/sections/booking-module.test.tsx` [MODIFIED]
