# Story 3.1: Resend Integration & Admin Notification Email

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a System Administrator,
I want to receive a beautifully formatted email containing the booking request details and actionable buttons (Confirm/Reject),
so that I can review and manage requests without needing to log into a separate dashboard.

## Acceptance Criteria

1. **Given** a user successfully submits a booking request
2. **When** the Server Action processes the request
3. **Then** an email built with `@react-email/components` is dispatched via Resend to `nmd.wav@gmail.com`
4. **And** the email contains the applicant's Name, Email, Requested Time Slot, and Session Type
5. **And** the email includes visually distinct "Confirm" and "Reject" buttons that link to our secure webhook endpoint.

## Tasks / Subtasks

- [x] Setup Resend API and Email Templates
  - [x] Install `resend` SDK (v4.x+) and `@react-email/components` if not already installed.
  - [x] Configure `RESEND_API_KEY` in environment.
  - [x] Create `src/lib/services/email.ts` wrapper for Resend API connection.
- [x] Create Email Template Component
  - [x] Create `src/components/emails/reservation-request.tsx` using `@react-email/components`.
  - [x] Format the email visually applying the brand aesthetic (Brutalismo Elegante structure where possible).
  - [x] Include applicant details (Name, Email, Time Slot, Session Type).
  - [x] Add "Confirm" and "Reject" anchor tags/buttons pointing to `/api/webhooks/resend` with secure tokens/parameters.
- [x] Dispatch Email from Booking Action
  - [x] Update `src/lib/actions/booking.ts` (or the exact booking creation Server Action) to invoke `src/lib/services/email.ts` upon a successful booking request.

## Dev Notes

- **Architecture Patterns**:
  - The email service logic (`email.ts`) must remain in `src/lib/services/` and never directly in a UI component.
  - Server Actions in `src/lib/actions/` orchestrate the process and call `services/email.ts`.
  - There is NO final user authentication, security relies entirely on cryptography and verified Webhooks links from the email. Keep the URLs in the buttons secure.
- **Tech Stack & Libraries**:
  - `resend` (v4.x+ recommended).
  - `@react-email/components` for the React Email template.
- **Relevant Architecture Constraints**:
  - The frontend must remain snappy and "Optimistic" (TanStack Query + sileo toasts) while the email is sent synchronously or asynchronously in the background. If Resend takes time, catch errors gracefully.

### Project Structure Notes

- Alignment with unified project structure:
  - `src/components/emails/reservation-request.tsx`
  - `src/lib/services/email.ts`
  - Ensure all environment variables are properly typed if applicable.

### References

- Epic 3: Administrative Booking Backend [Source: \_bmad-output/planning-artifacts/epics.md#Epic 3: Administrative Booking Backend]
- Architecture Integration Points: Resend API called from Backend (`services/email.ts`) [Source: \_bmad-output/planning-artifacts/architecture.md#Integration Points]

## Dev Agent Record

### Agent Model Used

BMAD bmm-create-story

### Debug Log References

N/A

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created.
- Implemented core email service and logic, along with full test suites.
- Applied adversarial code review fixes: Added `server-only` to secure the `RESEND_API_KEY`, added explicit key presence checks, and completed file tracking.

### File List

- `src/components/emails/reservation-request.tsx`
- `src/lib/services/email.ts`
- `src/lib/actions/booking.ts` (modified)
- `package.json` (modified)
- `pnpm-lock.yaml` (modified)
- `src/lib/services/email.test.ts`
- `src/lib/actions/booking.test.ts` (modified)
- `src/components/sections/booking-module.test.tsx` (modified)
