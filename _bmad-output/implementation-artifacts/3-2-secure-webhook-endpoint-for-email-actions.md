# Story 3.2: Secure Webhook Endpoint for Email Actions

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a System Administrator,
I want the "Confirm" and "Reject" buttons in my email to securely trigger the corresponding state changes in the system without authentication friction,
so that I can manage bookings with a single click securely.

## Acceptance Criteria

1. **Given** I receive a booking request email
2. **When** I click the "Confirm" or "Reject" button
3. **Then** a `GET` or `POST` request is sent to `src/app/api/webhooks/resend/route.ts`
4. **And** the webhook verifies a secure token/signature to ensure the request is legitimate
5. **And** the system updates the status of the booking request accordingly
6. **And** I see a simple success confirmation page/message in my browser.

## Tasks / Subtasks

- [x] Create Webhook Route Handler
  - [x] Implement `src/app/api/webhooks/resend/route.ts` to handle incoming verification requests. This will likely be a GET request since it's clicked from an email.
  - [x] Extract security token and parameters (e.g., booking ID, action: confirm/reject) from the URL search params.
- [x] Implement Security Verification
  - [x] Validate the received token against the expected secure hash to verify authenticity.
  - [x] Render a 401 Unauthorized or 400 Bad Request error page if the token is invalid or missing.
- [x] Update Booking Status
  - [x] Trigger the state change logic for the booking request (currently handled via email, but need to ensure it integrates well with the upcoming Calendar sync).
- [x] Render Confirmation Page
  - [x] Return a simple, visually pleasing HTML response (or redirect) confirming the action ("Reserva Confirmada" or "Reserva Rechazada") so the Admin gets immediate visual feedback.

## Dev Notes

- **Architecture Patterns**: 
  - The webhook endpoint `src/app/api/webhooks/resend/route.ts` is the ONLY traditional API route allowed. It serves as the security boundary for email responses.
  - No user session authentication is required; security relies entirely on cryptography and verified Webhook links from the email.
- **Tech Stack & Libraries**:
  - Next.js 15 App Router Route Handlers.
  - native Node `crypto` or standard Web Crypto API for token hashing/verification.
- **Relevant Architecture Constraints**:
  - Keep the endpoint lean. Ensure that it gracefully handles invalid tokens by returning an appropriate error message rather than crashing.
  - The response should be a simple HTML page or redirect because the Admin will be clicking this link from their email client.

### Project Structure Notes

- Alignment with unified project structure:
  - `src/app/api/webhooks/resend/route.ts`
  - Any security/validation utility functions should be added to `src/lib/utils.ts` or a dedicated `src/lib/services/security.ts` if complex.

### References

- Epic 3: Administrative Booking Backend [Source: \_bmad-output/planning-artifacts/epics.md#Epic 3: Administrative Booking Backend]
- Architecture API Boundaries [Source: \_bmad-output/planning-artifacts/architecture.md#Architectural Boundaries]
- Previous Story Learnings: Implemented email sending in Story 3.1. Ensure we verify the secure tokens that were formulated there. [Source: \_bmad-output/implementation-artifacts/3-1-resend-integration-admin-notification-email.md]

## Dev Agent Record

### Agent Model Used

BMAD bmm-dev-story

### Debug Log References

N/A

### Completion Notes List

- Implemented `generateSecureToken` and `verifySecureToken` using deterministic HMAC-SHA256 signatures for URL safety in emails.
- Created unit tests for the security utility (`security.test.ts`) guaranteeing timing-attack resilience and structural correctness.
- Added `GET` route handler for the webhooks with custom "Brutalismo Elegante" HTML rendering for prompt admin feedback. 
- Covered the `GET` route handler with integration tests validating various HTTP statuses matching token correctness. 
- Integrated the `generateSecureToken` utility in the email service generation.
- **[Code Review Fix]** Added a 7-day expiration timestamp to the token generation to prevent replay and stale token attacks.
- **[Code Review Fix]** Refactored the webhook API route to redirect to a new React Server Component (`src/app/booking/confirmation/page.tsx`) instead of returning strings of raw HTML.
- **[Code Review Fix]** Added production guard for `NEXT_PUBLIC_APP_URL` falling back to localhost.

### File List

- `src/app/api/webhooks/resend/route.ts`
- `src/app/api/webhooks/resend/route.test.ts`
- `src/lib/services/security.ts`
- `src/lib/services/security.test.ts`
- `src/lib/services/email.ts` (modified)
- `src/components/emails/reservation-request.tsx` (modified)
