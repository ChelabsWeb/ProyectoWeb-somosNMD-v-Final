# Error Handling Strategy

### General Approach
- **Error Model:** Typed `AppError` utilities encapsulating category, status code, and user-facing message.  
- **Exception Hierarchy:** `AppError` base → `ValidationError`, `ExternalServiceError`, `SystemError`.  
- **Error Propagation:** Validate/handle at API boundary; only sanitized messages returned to client, full detail logged with correlation IDs.

### Logging Standards
- **Library:** `next-axiom` (or Vercel built-in logging) + `pino` 9.x for structured logs in functions.  
- **Format:** JSON with ISO timestamps.  
- **Levels:** debug, info, warn, error (default info in prod).  
- **Required Context:**  
  - Correlation ID: UUID per request (header `x-request-id`, fallback generated).  
  - Service Context: `app=project-web-nmd`, `component=contact-api|event-api|ui`.  
  - User Context: hashed IP + user agent segment; never log raw PII.

### External API Errors
- **Retry Policy:** Exponential backoff (max 3 attempts, 250ms base) for optional webhooks; no retry for user-facing submissions to avoid duplicates.  
- **Circuit Breaker:** Not required initially (no heavy external APIs).  
- **Timeout Configuration:** 5s for Supabase writes; 2s for PostHog ingestion.  
- **Error Translation:** Map Supabase/PostHog errors to `ExternalServiceError` with generic user message.

### Business Logic Errors
- **Custom Exceptions:** `ValidationError` for Zod schema failures, `QuotaExceededError` if we later gate submissions.  
- **User-Facing Errors:** JSON `{ status: "error", message: "Please check your details and try again." }`.  
- **Error Codes:** `CONTACT_VALIDATION_FAILED`, `CONTACT_SAVE_FAILED`, `EVENT_LOG_FAILED`.

### Data Consistency
- **Transaction Strategy:** Single INSERT statements (atomic) for simple forms.  
- **Compensation Logic:** If webhook notification fails after DB write, enqueue retry (supabase function).  
- **Idempotency:** Hash (email + message + timestamp bucket) to prevent duplicate submissions on retry.
