# Security

### Input Validation
- **Validation Library:** Zod 3.x.  
- **Validation Location:** Client-side forms (basic UX) + API routes (authoritative).  
- **Required Rules:** All external inputs validated at API boundary; whitelist approach (explicit schemas); reject payloads exceeding size limits (e.g., message length).

### Authentication & Authorization
- **Auth Method:** Not required for public site; protect admin endpoints via Vercel password-protected routes if added.  
- **Session Management:** N/A currently; if CMS introduced, use Supabase auth with JWT.  
- **Required Patterns:**  
  - All mutating endpoints require CSRF token + honey-pot hidden field.  
  - Block repeated submissions via rate limit (IP + email) per minute.

### Secrets Management
- **Development:** `.env.local` managed via Doppler or Vercel env editor (never committed).  
- **Production:** Vercel encrypted env vars + Supabase secret manager.  
- **Code Requirements:** No secrets hardcoded; access via `process.env`; never log secrets.

### API Security
- **Commerce Webhook Verification:** Validate HMAC signatures from the commerce provider and reject mismatches before mutating caches or analytics.
- **CORS Policy:** Same-origin for site API; allow preview domains.  
- **Security Headers:** `Strict-Transport-Security`, `Content-Security-Policy` (restrict script origins), `Permissions-Policy` (limit sensors).  
- **HTTPS Enforcement:** Vercel-managed TLS; set `forceHttps` in `vercel.json`.

### Data Protection
- **Encryption at Rest:** Supabase (Postgres) default; Vercel Blob uses provider encryption.  
- **Encryption in Transit:** HTTPS everywhere; Supabase connections via TLS.  
- **PII Handling:** Only store necessary contact metadata; auto-delete inquiries older than 12 months unless follow-up ongoing.  
- **Logging Restrictions:** Never log raw email/message; only hashed email for dedupe.

### Dependency Security
- **Scanning Tool:** GitHub Dependabot + `pnpm audit`.  
- **Update Policy:** Patch weekly, minor monthly unless breaking.  
- **Approval Process:** New runtime deps require architect + dev lead review; record in architecture change log.

### Security Testing
- **SAST Tool:** `eslint-plugin-security` + optional Semgrep in CI.  
- **DAST Tool:** OWASP ZAP scan on preview before major launches.  
- **Penetration Testing:** Annual third-party review ahead of major release.
