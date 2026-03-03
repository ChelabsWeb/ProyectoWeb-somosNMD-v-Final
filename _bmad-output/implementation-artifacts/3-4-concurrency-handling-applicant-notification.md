# Story 3.4: Concurrency Handling & Applicant Notification

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a System Administrator,
I want the system to automatically reject overlapping requests and notify the applicants,
so that I don't have to manually email people when a time slot they requested gets taken by someone else.

## Acceptance Criteria

1. **Given** multiple users have requested the same time slot
2. **When** I confirm one of the requests (or attempt to confirm a subsequent request)
3. **Then** the system automatically handles the concurrency conflict
4. **And** ensures only one booking is registered in Google Calendar for that slot
5. **And** sends an automated apology email to the rejected applicants using Resend
6. **And** sends a confirmation success email to the approved applicant.

## Tasks / Subtasks

- [x] Create Email Templates for Notifications
  - [x] Create `reservation-success.tsx` template in `src/components/emails` for the approved applicant.
  - [x] Create `reservation-rejected.tsx` template in `src/components/emails` for the rejected applicant.
- [x] Implement Concurrency Check in Webhook
  - [x] Update `src/app/api/webhooks/resend/route.ts` to check Google Calendar availability *before* creating the event.
  - [x] If the slot is already occupied, abort creation, send the `reservation-rejected` email to the applicant, and redirect admin to an appropriate error/info page.
  - [x] If the slot is available, create the event and send the `reservation-success` email to the applicant.
- [x] Add explicit applicant email logic to `src/lib/services/email.ts`
  - [x] Export a function to send the success email.
  - [x] Export a function to send the rejection email.

## Dev Notes

- **CRITICAL ARCHITECTURAL CONSTRAINT**: According to the Architecture Document, there is **No Persistent Database**. 
- **Conflict Resolution**: Because there is no database to store "pending requests", the system cannot bulk-find other pending requests for the same slot when one is approved. Instead, you must handle concurrency *at the time the admin attempts to confirm a request*. 
- **Implementation Strategy**: When the webhook is triggered to "confirm", it must first query Google Calendar. If the slot is already occupied (e.g., the admin already approved another request for this slot earlier), the system must reject this current confirmation attempt, and send the apology email to *this* applicant. 
- **Design System**: Use standard Brutalist styling for the newly created React Email templates (Midnight Blue, Tron Orange, Inter font).

### Project Structure Notes

- New email templates should go to `src/components/emails/`.
- Email sending logic should be added to `src/lib/services/email.ts`.
- Webhook logic resides in `src/app/api/webhooks/resend/route.ts`.
- Calendar check logic should use the `fetchCalendarEvents` or similar from `src/lib/services/calendar.ts`.

### References

- Epic 3: Administrative Booking Backend [Source: \_bmad-output/planning-artifacts/epics.md#Epic 3: Administrative Booking Backend]
- Core Architecture: No Persistent Database [Source: \_bmad-output/planning-artifacts/architecture.md#Core Architectural Decisions]
- Previous Story: Google Calendar Synchronization [Source: \_bmad-output/implementation-artifacts/3-3-google-calendar-synchronization.md]

## Dev Agent Record

### Agent Model Used

BMAD bmm-create-story

### Debug Log References

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created. Addressed architectural constraint regarding the lack of a database and adapted the concurrency strategy accordingly.
- Implemented `ReservationSuccessEmail` and `ReservationRejectedEmail` React Email templates respecting the Brutalist Elegant design system.
- Updated `email.ts` with new exported functions to handle the sending of the new templates via Resend.
- Updated `route.ts` Webhook GET handler to fetch calendar availability *before* creating an event. Handles concurrent bookings by immediately sending a rejection email to the overlapping applicant.
- Updated `route.test.ts` to include unit tests covering the new branch paths (concurrency conflict vs success). All tests passed successfully.

### Change Log
- Addressed code review findings - Fixed missing try/catch in Webhook, extracted Sender Email to constant, and fixed Resend initialization.
- Executed Red-Green-Refactor cycle
- Added new React Email templates for confirmation/rejection paths
- Modified API to protect against Google Calendar double-booking

### File List

- `_bmad-output/implementation-artifacts/3-4-concurrency-handling-applicant-notification.md`
- `apps/web/src/components/emails/reservation-success.tsx`
- `apps/web/src/components/emails/reservation-rejected.tsx`
- `apps/web/src/lib/services/email.ts`
- `apps/web/src/app/api/webhooks/resend/route.ts`
- `apps/web/src/app/api/webhooks/resend/route.test.ts`
- `apps/web/src/components/emails/reservation-request.tsx`
