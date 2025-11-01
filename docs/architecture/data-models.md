# Data Models

### CollaborationInquiry
**Purpose:** Persist collaboration/booking requests captured from the contact form for follow-up and KPI tracking.

**Key Attributes:**
- `id`: UUID – Primary key for each inquiry
- `submitted_at`: timestamptz – UTC timestamp of submission
- `name`: text – Requestor’s full name
- `organization`: text – Company/collective (optional)
- `email`: citext – Contact email, unique per inquiry
- `inquiry_type`: text – Enum (`collaboration`, `booking`, `press`, `other`)
- `message`: text – Free-form description of request
- `target_artist`: text – Optional artist/member referenced
- `source_path`: text – Page/section where CTA triggered
- `consent_newsletter`: boolean – Whether user opted into updates

**Relationships:**
- None initially; standalone table but can join to future `notify_opt_ins`.

### NotifyOptIn
**Purpose:** Store “Midnight Is Close” teaser opt-ins for future release announcements.

**Key Attributes:**
- `id`: UUID
- `email`: citext – subscriber email
- `opted_at`: timestamptz – timestamp
- `campaign`: text – e.g., `midnight-is-close`
- `metadata`: jsonb – device, locale, etc.

**Relationships:**
- Can reference `collaboration_inquiries.email` for deduplication but not enforced.
