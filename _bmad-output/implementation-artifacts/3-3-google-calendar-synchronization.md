# Story 3.3: Google Calendar Synchronization

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a System Administrator,
I want confirmed bookings to automatically create events in the studio's Google Calendar,
so that availability is always up-to-date and prevents double-booking.

## Acceptance Criteria

1. **Given** I confirm a booking request via the email webhook
2. **When** the system processes the confirmation
3. **Then** the `calendar.ts` service uses a Google Service Account (JWT) to create an event in the designated Google Calendar
4. **And** the event blocks the exact 3-hour slot requested
5. **And** the `TimeSlotGrid` on the frontend correctly reads this new event as "Occupied" for future visitors.

## Tasks / Subtasks

- [ ] Setup Google Calendar API Service
  - [ ] Implement `src/lib/services/calendar.ts` with Google API client (`googleapis`) using JWT Service Account authentication.
  - [ ] Implement a `createEvent` method to book a 3-hour slot upon confirmation.
  - [ ] Implement a `listEvents` method to retrieve occupied slots for a given date range.
- [ ] Connect Webhook to Calendar Creation
  - [ ] Update webhook handler (`src/app/api/webhooks/resend/route.ts`) to call `calendar.createEvent` when a booking is confirmed.
  - [ ] Ensure graceful error handling if the Calendar API fails (return structured error `{ success: false, message: 'Google Calendar Sync Error' }`).
- [ ] Update Booking Availability Fetching
  - [ ] Update frontend or server actions to use `calendar.listEvents` so `TimeSlotGrid` disables occupied time slots.
  - [ ] Maintain "Optimistic UI" principles and use TanStack Query (`use-booking.ts`) if communicating via client.
- [ ] Integration Testing
  - [ ] Add unit/integration tests for `calendar.ts` to verify event creation and listing (mocking `googleapis`).

## Dev Notes

- **Architecture Patterns**: 
  - **No Persistent Database:** The MVP does not use a typical database. The real state of occupation is derived directly reading from Google Calendar. This is a critical architectural constraint to maintain the app 100% Serverless.
  - **Error Handling:** If Google Calendar API fails, never crash the UI. The Server Action/Webhook must catch the exception and return a coherent structure `{ success: false, message: 'Google Calendar Sync Error' }`.
- **Tech Stack & Libraries**:
  - `googleapis` library for Node.js.
  - Google Service Account parameters (from `.env.local`).

### Project Structure Notes

- Alignment with unified project structure:
  - The calendar API wrapper goes in `src/lib/services/calendar.ts`.
  - The Webhook is at `src/app/api/webhooks/resend/route.ts`.
  - Any server action wrapping availability checks goes in `src/lib/actions/booking.ts`.

### References

- Epic 3: Administrative Booking Backend [Source: \_bmad-output/planning-artifacts/epics.md#Epic 3: Administrative Booking Backend]
- External Integrations & Deferred Decisions [Source: \_bmad-output/planning-artifacts/architecture.md#Core Architectural Decisions]
- Error Handling Patterns [Source: \_bmad-output/planning-artifacts/architecture.md#Process Patterns]
- Previous Story Learnings: Secure Webhooks [Source: \_bmad-output/implementation-artifacts/3-2-secure-webhook-endpoint-for-email-actions.md]

## Dev Agent Record

### Agent Model Used

BMAD bmm-dev-story

### Debug Log References

N/A

### Completion Notes List

- AI Review: Fixed overlap matching algorithm in booking actions
- AI Review: Added credentials validation in calendar service
- AI Review: Filtered out cancelled events from fetchCalendarEvents
- AI Review: Restored missing file list documentation

### File List

- `apps/web/src/lib/services/calendar.ts`
- `apps/web/src/lib/services/calendar.test.ts`
- `apps/web/src/app/api/webhooks/resend/route.ts`
- `apps/web/src/app/api/webhooks/resend/route.test.ts`
- `apps/web/src/lib/actions/booking.ts`
- `apps/web/src/lib/actions/booking.test.ts`
- `apps/web/src/components/blocks/time-slot-grid.tsx`
- `apps/web/src/components/blocks/time-slot-grid.test.tsx`

