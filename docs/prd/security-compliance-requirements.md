# Security & Compliance Requirements
- Enforce HTTPS everywhere (Vercel provides TLS) and ensure all external embeds (Spotify, audio CDN) load over secure origins.
- Contact form collects minimal PII (name, email, organization); data stored in Supabase/secure storage with encryption at rest and auto-deletion after 12 months unless ongoing collaboration is in progress.
- Provide a concise privacy notice near the form describing data usage, retention, and contact for deletion requests; require explicit consent before subscribing users to newsletters.
- Limit analytics payloads to non-PII engagement data; anonymize IPs where possible and honor “Do Not Track”/consent banners for EU traffic.
- Log access to inquiry submissions for auditability; restrict dashboard access to authorized project leads using workspace SSO.
