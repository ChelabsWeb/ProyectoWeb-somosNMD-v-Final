# Vercel Environment Setup

Before the next production deploy, set these env vars in the Vercel project
(Settings → Environment Variables). Values marked SENSITIVE are secrets — copy
them from `apps/web/.env.local` one-time and never commit.

## Required

| Key | Value | Notes |
|---|---|---|
| `WEBHOOK_SECRET` | SENSITIVE (see `apps/web/.env.local`) | HMAC signing key for booking confirmation tokens. Without this set, the app fails loudly on any booking webhook (by design — see `security.ts`). |
| `NEXT_PUBLIC_APP_URL` | `https://<your-vercel-domain>` | Used by Resend email templates and `metadataBase`. Must be the exact prod URL. |
| `RESEND_API_KEY` | SENSITIVE | Resend production API key. |
| `RESEND_FROM_EMAIL` | e.g. `Reserva NMD <reservas@nmdmusic.uy>` | Once domain verified in Resend; until then `onboarding@resend.dev` works. |
| `STUDIO_EMAIL` | `nmd.wav@gmail.com` | Destination for booking requests and contact form. |
| `GOOGLE_PRIVATE_KEY` | SENSITIVE | Service account private key, newlines as literal `\n`. |
| `GOOGLE_CLIENT_EMAIL` | SENSITIVE | Service account email. |
| `GOOGLE_CALENDAR_ID` | SENSITIVE | Target calendar id. |

## How to set via CLI

```bash
vercel env add WEBHOOK_SECRET production
# paste the value from apps/web/.env.local when prompted

vercel env add NEXT_PUBLIC_APP_URL production
# paste https://<domain>

# ...repeat for each variable
```

Or use the Vercel dashboard UI.

## Verifying the deploy

After setting env vars and triggering a deploy, test:

1. `https://<domain>/booking/confirmation` with a valid token from an email — should load.
2. Submit a booking from `/` → check that the admin email arrives and contains working Confirm/Reject URLs pointing to `https://<domain>`.
3. View page source of `/` — OG and Twitter metadata should resolve to absolute URLs on `<domain>`, not `http://localhost:3000`.

If any of those fail, the most likely cause is a missing or mis-set env var.
