# Urgent Optimization — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close known production-readiness gaps in SomosNMD (security hardening, performance, SEO fundamentals, repo hygiene) without touching client-dependent work.

**Architecture:** Four phases executed in order on `main`, each capped by a conventional commit. Phase A hardens secrets and production metadata; Phase B measures, trims dead deps, and remeasures; Phase C adds SEO scaffolding; Phase D cleans the repo. Checkpoints (build + tests + screenshot) run between phases.

**Tech Stack:** Next.js 16.0.7 (App Router), React 19.2, TypeScript 5.x, Turborepo, pnpm 10.19, Vitest 4, Playwright, Tailwind 3.4, Resend, Google Calendar API, GSAP, Framer Motion, tsParticles, Lenis.

**Related spec:** `docs/superpowers/specs/2026-04-21-urgent-optimization-design.md`

---

## Pre-flight

- [ ] **PF-1: Confirm clean working tree**

Run: `git status`
Expected: `nothing to commit, working tree clean` on branch `main`.
If dirty, stop and ask user.

- [ ] **PF-2: Establish a known-good build baseline**

Run: `pnpm --filter web build 2>&1 | tail -40`
Expected: build succeeds. Note any existing warnings (they are NOT regressions caused by this plan).

- [ ] **PF-3: Establish a known-good test baseline**

Run: `pnpm --filter web test 2>&1 | tail -20`
Expected: all existing tests pass. Count passing tests for later comparison.

---

## Phase A — Bugs & security

### Task A1: Harden `WEBHOOK_SECRET` via TDD

**Files:**
- Modify: `apps/web/src/lib/services/security.ts`
- Modify: `apps/web/src/lib/services/security.test.ts`

- [ ] **Step 1: Add failing test for missing-secret throw**

Open `apps/web/src/lib/services/security.test.ts`. At the end of the `describe("createSignature", () => { ... })` block, add:

```typescript
    it("should throw when WEBHOOK_SECRET is not set", () => {
      delete process.env.WEBHOOK_SECRET;
      expect(() => createSignature("anything")).toThrow(
        /Missing WEBHOOK_SECRET/i
      );
    });
```

Also add to the end of the outer `describe("Security Service", ...)` block, a new sibling describe:

```typescript
  describe("missing secret", () => {
    it("verifySecureToken returns null when WEBHOOK_SECRET is missing (no crash)", () => {
      // generate while secret is set
      const token = generateSecureToken({ bookingId: "b1", action: "confirm" });
      // then remove
      delete process.env.WEBHOOK_SECRET;
      const result = verifySecureToken(token);
      expect(result).toBeNull();
    });
  });
```

- [ ] **Step 2: Run the new tests and confirm they fail**

Run: `pnpm --filter web test -- --run src/lib/services/security.test.ts`
Expected: FAIL — the new `should throw` test fails because current code uses a fallback. The `verifySecureToken returns null` test may or may not fail depending on ordering; confirm both fail or one fails with the current behaviour.

- [ ] **Step 3: Refactor `security.ts` to throw instead of falling back**

Replace the full contents of `apps/web/src/lib/services/security.ts` with:

```typescript
import "server-only";
import crypto from "crypto";

export interface TokenPayload {
  bookingId: string;
  action: "confirm" | "reject";
  applicantName?: string;
  applicantEmail?: string;
  timeSlot?: string;
  sessionType?: string;
}

/**
 * Reads WEBHOOK_SECRET lazily so static analysis and test setup/teardown
 * can manipulate env without crashing at module load.
 */
function getSecretKey(): string {
  const key = process.env.WEBHOOK_SECRET;
  if (!key || key.trim().length === 0) {
    throw new Error(
      "Missing WEBHOOK_SECRET environment variable. " +
        "Generate with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\" " +
        "and set it in apps/web/.env.local and in Vercel project environment."
    );
  }
  return key;
}

/**
 * Creates a deterministic HMAC-SHA256 signature for the given string.
 */
export function createSignature(payload: string): string {
  return crypto.createHmac("sha256", getSecretKey()).update(payload).digest("hex");
}

/**
 * Creates a secure token for a booking action.
 * Encodes all necessary data since there is no persistence layer.
 */
export function generateSecureToken(
  payloadData: Omit<TokenPayload, "expiryTimestamp">,
  expiresInDays: number = 7
): string {
  const expiryTimestamp = Date.now() + expiresInDays * 24 * 60 * 60 * 1000;
  const dataToEncode = { ...payloadData, expiryTimestamp };

  const payloadStr = JSON.stringify(dataToEncode);
  const signature = createSignature(payloadStr);

  const encodedPayload = Buffer.from(payloadStr).toString("base64url");

  return `${encodedPayload}.${signature}`;
}

/**
 * Verifies a secure token and returns the parsed payload if valid.
 * Returns null for any invalid, expired, or tampered token — including
 * the case where WEBHOOK_SECRET is missing (callers must never treat a
 * missing-secret server as "all tokens valid").
 */
export function verifySecureToken(token: string): TokenPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [encodedPayload, providedSignature] = parts;

    const payloadStr = Buffer.from(encodedPayload, "base64url").toString("utf-8");
    const parsedData = JSON.parse(payloadStr);

    if (
      !parsedData.bookingId ||
      (parsedData.action !== "confirm" && parsedData.action !== "reject") ||
      !parsedData.expiryTimestamp
    ) {
      return null;
    }

    if (Date.now() > parsedData.expiryTimestamp) {
      console.warn(`[Security] Token expired for booking ${parsedData.bookingId}`);
      return null;
    }

    const expectedSignature = createSignature(payloadStr);

    const providedBuffer = Buffer.from(providedSignature, "hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");

    if (providedBuffer.length !== expectedBuffer.length) {
      return null;
    }

    if (crypto.timingSafeEqual(providedBuffer, expectedBuffer)) {
      return parsedData as TokenPayload;
    }

    return null;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message !== "Input length must be a multiple of 16 when decoding with a block cipher"
    ) {
      console.error("[Security] Error verifying secure token:", error);
    }
    return null;
  }
}
```

- [ ] **Step 4: Run full security test suite — expect all green**

Run: `pnpm --filter web test -- --run src/lib/services/security.test.ts`
Expected: all tests pass (existing ones + 2 new ones).

- [ ] **Step 5: Run full web test suite — confirm no regressions**

Run: `pnpm --filter web test`
Expected: same number of passing tests as baseline + 2 (the new ones). No failures.

### Task A2: Verify `.env.local` values and document Vercel setup

**Files:**
- Inspect (do not print to chat): `apps/web/.env.local`
- Modify if needed: `apps/web/.env.local`
- Modify: `apps/web/.env.example`

- [ ] **Step 1: Verify `WEBHOOK_SECRET` has adequate entropy**

Run (do NOT echo the value anywhere that persists):
```bash
node -e "const k=require('fs').readFileSync('apps/web/.env.local','utf8').split('\n').find(l=>l.startsWith('WEBHOOK_SECRET=')).split('=')[1]; console.log('len=' + k.length + ' is_default=' + (k === 'default_development_secret_key_change_me_in_prod!'));"
```
Expected: `len=64 is_default=false` (64 hex chars from `randomBytes(32)`).

If `len < 32` or `is_default=true`, proceed to Step 2. Otherwise skip to Step 3.

- [ ] **Step 2 (conditional): Regenerate `WEBHOOK_SECRET`**

Generate a new secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Replace the value in `apps/web/.env.local`. Do this with a targeted sed to avoid exposing:
```bash
NEW_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
sed -i.bak "s|^WEBHOOK_SECRET=.*|WEBHOOK_SECRET=${NEW_SECRET}|" apps/web/.env.local
rm apps/web/.env.local.bak
```

Verify again with Step 1's command — should now show `len=64 is_default=false`.

- [ ] **Step 3: Verify `NEXT_PUBLIC_APP_URL`**

Run:
```bash
grep "^NEXT_PUBLIC_APP_URL=" apps/web/.env.local
```
Expected: contains `http://localhost:3000` (or a valid URL). If missing or empty, append:
```bash
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" >> apps/web/.env.local
```

- [ ] **Step 4: Ensure `.env.example` is current**

Read `apps/web/.env.example`. Confirm it lists `WEBHOOK_SECRET`, `NEXT_PUBLIC_APP_URL`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `STUDIO_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_CLIENT_EMAIL`, `GOOGLE_CALENDAR_ID`. If any is missing, add with a placeholder value and a short comment.

- [ ] **Step 5: Create a deploy-readiness note**

Create `docs/deploy-vercel-env.md` with exactly these contents:

```markdown
# Vercel Environment Setup

Before the next production deploy, set these env vars in the Vercel project
(Settings → Environment Variables). Values marked SENSITIVE are secrets — copy
them from `apps/web/.env.local` one-time and never commit.

## Required

| Key | Value | Notes |
|---|---|---|
| `WEBHOOK_SECRET` | SENSITIVE (see .env.local) | HMAC signing key for booking confirmation tokens. Without this set, the app fails loudly on any booking webhook (by design — see commit hardening security.ts). |
| `NEXT_PUBLIC_APP_URL` | `https://<your-vercel-domain>` | Used by Resend email templates and `metadataBase`. Must be the exact prod URL. |
| `RESEND_API_KEY` | SENSITIVE | Resend production API key. |
| `RESEND_FROM_EMAIL` | e.g. `Reserva NMD <reservas@nmdmusic.uy>` | Once dominio verified in Resend; until then `onboarding@resend.dev` works. |
| `STUDIO_EMAIL` | `nmd.wav@gmail.com` | Destination for booking requests and contact form. |
| `GOOGLE_PRIVATE_KEY` | SENSITIVE | Service account private key, newlines as literal `\n`. |
| `GOOGLE_CLIENT_EMAIL` | SENSITIVE | Service account email. |
| `GOOGLE_CALENDAR_ID` | SENSITIVE | Target calendar id. |

## How to set via CLI

```bash
vercel env add WEBHOOK_SECRET production
# paste value when prompted
vercel env add NEXT_PUBLIC_APP_URL production
# paste https://<domain>
# ...repeat for each
```

Or use the Vercel dashboard UI.
```

- [ ] **Step 6: Confirm no secrets are being staged**

Run: `git status` and `git diff --stat`
Expected: `.env.local` NOT in the list (it's gitignored). Only new docs and `.env.example` changes should appear.

### Task A3: Replace placeholder metadata in `layout.tsx`

**Files:**
- Modify: `apps/web/src/app/layout.tsx`

- [ ] **Step 1: Apply production metadata**

Replace the block at lines 20-23 (the `metadata` export) with:

```typescript
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "NMD — Nómades",
    template: "%s | NMD",
  },
  description:
    "NMD (Nómades) — colectivo musical uruguayo. Reservá sesiones, explorá a los artistas y descubrí la obra del colectivo.",
  keywords: [
    "NMD",
    "Nómades",
    "música uruguaya",
    "estudio de grabación",
    "colectivo musical",
    "rap uruguayo",
    "hip hop Uruguay",
  ],
  authors: [{ name: "NMD" }],
  creator: "NMD",
  publisher: "NMD",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: appUrl,
    siteName: "NMD",
    title: "NMD — Nómades",
    description:
      "Colectivo musical uruguayo. Reservá sesiones y descubrí a los artistas.",
    images: [
      {
        url: "/assets/logo/logoNMD.svg",
        width: 1200,
        height: 630,
        alt: "NMD — Nómades",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NMD — Nómades",
    description:
      "Colectivo musical uruguayo. Reservá sesiones y descubrí a los artistas.",
    images: ["/assets/logo/logoNMD.svg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};
```

- [ ] **Step 2: Verify build still compiles**

Run: `pnpm --filter web build 2>&1 | tail -20`
Expected: build succeeds. No type errors on the metadata shape.

### Task A4: Update legal pages last-updated stamp

**Files:**
- Modify: `apps/web/src/app/terminos/page.tsx:95`
- Modify: `apps/web/src/app/privacidad/page.tsx:85`

- [ ] **Step 1: Update `terminos` stamp**

In `apps/web/src/app/terminos/page.tsx`, change the line reading `Última actualización: Marzo 2026` to `Última actualización: Abril 2026`.

- [ ] **Step 2: Update `privacidad` stamp**

In `apps/web/src/app/privacidad/page.tsx`, change the line reading `Última actualización: Marzo 2026` to `Última actualización: Abril 2026`.

### Task A5: Phase A verification + commit

- [ ] **Step 1: Full build**

Run: `pnpm --filter web build 2>&1 | tail -40`
Expected: success, zero new warnings.

- [ ] **Step 2: Full test suite**

Run: `pnpm --filter web test`
Expected: all pass, including the 2 new security tests.

- [ ] **Step 3: Lint**

Run: `pnpm --filter web lint`
Expected: pass (or only pre-existing non-new warnings).

- [ ] **Step 4: Visual smoke-test evidence (optional but recommended)**

If Chrome DevTools MCP is available, open `http://localhost:3000` (dev), `http://localhost:3000/contacto`, `http://localhost:3000/terminos`, `http://localhost:3000/privacidad` and capture screenshots. Save under `tasks/evidence/A5-YYYY-MM-DD/`.

- [ ] **Step 5: Stage and commit Phase A**

```bash
git add apps/web/src/lib/services/security.ts \
        apps/web/src/lib/services/security.test.ts \
        apps/web/src/app/layout.tsx \
        apps/web/src/app/terminos/page.tsx \
        apps/web/src/app/privacidad/page.tsx \
        apps/web/.env.example \
        docs/deploy-vercel-env.md
git status  # verify .env.local not staged
git commit -m "$(cat <<'EOF'
fix(security): harden webhook secret and update production metadata

- security.ts now throws on missing WEBHOOK_SECRET (was: silent public fallback)
- layout.tsx metadata replaced with full OG/Twitter/SEO config tied to NEXT_PUBLIC_APP_URL
- legal pages last-updated bumped to April 2026
- docs/deploy-vercel-env.md lists every env var needed on Vercel

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

Expected: commit succeeds, working tree clean.

- [ ] **Step 6: Phase A checkpoint report**

Report to user:
- Pass/fail of build, test, lint
- Summary of what changed
- Reminder to set env vars on Vercel before next deploy (link `docs/deploy-vercel-env.md`)

Await user confirmation before starting Phase B.

---

## Phase B — Performance

### Task B1: Lighthouse baseline

**Files:**
- Create: `tasks/evidence/B1-lighthouse-baseline.json` (output)
- Create: `tasks/evidence/B1-lighthouse-baseline.md` (human summary)

- [ ] **Step 1: Build production bundle**

Run: `pnpm --filter web build 2>&1 | tail -60`
Expected: success. Capture the "First Load JS shared by all" and per-route sizes from output.

- [ ] **Step 2: Start production server in background**

Run (in a separate terminal or backgrounded):
```bash
pnpm --filter web start
```
Wait for `Ready in Xms`.

- [ ] **Step 3: Run Lighthouse via Chrome DevTools MCP**

Use `mcp__chrome-devtools__new_page` → navigate to `http://localhost:3000` → `mcp__chrome-devtools__lighthouse_audit` with category `performance`.

Save the raw JSON result to `tasks/evidence/B1-lighthouse-baseline.json`.

- [ ] **Step 4: Write human-readable baseline summary**

Create `tasks/evidence/B1-lighthouse-baseline.md` with:

```markdown
# Lighthouse Baseline — 2026-04-21

## Performance
- Score: <X>
- LCP: <X> ms
- FCP: <X> ms
- TBT: <X> ms
- CLS: <X>
- Speed Index: <X> ms

## Bundle (from `next build` output)
- First Load JS shared: <X> kB
- Home route: <X> kB
- Booking route: <X> kB
- Artists route: <X> kB

## Notes
- Build ran on: <date>
- Node: <version>
- Three.js / R3F / drei still in deps (to be removed in B2).
```

- [ ] **Step 5: Stop production server**

Terminate the background process.

### Task B2: Remove unused three.js stack

**Files:**
- Modify: `apps/web/package.json`
- Modify: `pnpm-lock.yaml` (auto)

- [ ] **Step 1: Final grep to confirm zero references**

Run:
```bash
grep -r "from ['\"]@react-three\|from ['\"]three['\"]\|from ['\"]@types/three" apps/web/src packages
```
Expected: no matches.

If ANY match appears, STOP — the dependencies are in use and removal would break the build. Update the plan and escalate.

- [ ] **Step 2: Remove packages**

Run:
```bash
pnpm --filter web remove three @react-three/fiber @react-three/drei @types/three
```
Expected: success, lockfile updated.

- [ ] **Step 3: Rebuild to confirm nothing breaks**

Run: `pnpm --filter web build 2>&1 | tail -40`
Expected: success.

- [ ] **Step 4: Re-run tests**

Run: `pnpm --filter web test`
Expected: all pass.

### Task B3: Enable Next.js production optimizations

**Files:**
- Modify: `apps/web/next.config.ts`

- [ ] **Step 1: Expand `next.config.ts`**

Replace the contents of `apps/web/next.config.ts` with:

```typescript
import type { NextConfig } from "next";

// Next.js 16 no longer accepts the `eslint` config block here; linting runs via CLI.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Rebuild to confirm**

Run: `pnpm --filter web build 2>&1 | tail -20`
Expected: success.

### Task B4: Lazy-load `ParticleBackground` via client wrapper

**Files:**
- Read first: `apps/web/src/components/layout/PageShell.tsx`
- Read first: `apps/web/src/components/system/ParticleBackground.tsx` (to know the export shape)
- Create: `apps/web/src/components/system/ParticleBackgroundLazy.tsx`
- Modify: `apps/web/src/components/layout/PageShell.tsx`

**Why a wrapper:** In Next.js 16, `dynamic(..., { ssr: false })` can only be called from a Client Component (React 19 behaviour). `PageShell` is imported by `layout.tsx` and is almost certainly a Server Component. The minimal fix is a tiny `"use client"` wrapper that owns the `dynamic` call.

- [ ] **Step 1: Read both files to confirm export shapes and server/client boundary**

Run: open `apps/web/src/components/layout/PageShell.tsx` — check the first line for `"use client"`. Open `apps/web/src/components/system/ParticleBackground.tsx` — check whether it's a named export (`export function ParticleBackground`) or default export (`export default`). Note: `ParticleBackground.tsx` itself must already be a client component (tsparticles requires window). Confirm that first line is `"use client"`.

- [ ] **Step 2: Create the client-only wrapper**

Create `apps/web/src/components/system/ParticleBackgroundLazy.tsx`:

```typescript
"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type { ParticleBackground as ParticleBackgroundType } from "./ParticleBackground";

const ParticleBackground = dynamic(
  () =>
    import("./ParticleBackground").then((m) => ({
      default: (m as { ParticleBackground?: typeof ParticleBackgroundType; default?: typeof ParticleBackgroundType }).ParticleBackground
        ?? (m as { default: typeof ParticleBackgroundType }).default,
    })),
  { ssr: false, loading: () => null }
);

export function ParticleBackgroundLazy(props: ComponentProps<typeof ParticleBackgroundType>) {
  return <ParticleBackground {...props} />;
}
```

If `ParticleBackground.tsx` uses `export default` instead of the named export, simplify to:

```typescript
"use client";

import dynamic from "next/dynamic";
import type { ComponentProps, ComponentType } from "react";

const ParticleBackground = dynamic<Record<string, never>>(
  () => import("./ParticleBackground"),
  { ssr: false, loading: () => null }
);

export function ParticleBackgroundLazy(props: ComponentProps<ComponentType>) {
  return <ParticleBackground {...props} />;
}
```

Pick the version that matches the actual export from Step 1. If unsure, read `ParticleBackground.tsx` again.

- [ ] **Step 3: Swap the import in `PageShell.tsx`**

Find the static import of `ParticleBackground` (e.g., `import { ParticleBackground } from "@/components/system/ParticleBackground";`). Replace with:

```typescript
import { ParticleBackgroundLazy as ParticleBackground } from "@/components/system/ParticleBackgroundLazy";
```

Keep all JSX usages intact — `<ParticleBackground ... />` still resolves correctly.

- [ ] **Step 4: Rebuild**

Run: `pnpm --filter web build 2>&1 | tail -25`
Expected: success. In the route output, look for a new `_next/static/chunks/…ParticleBackground…` chunk split out from the main bundle.

- [ ] **Step 5: Manual visual test**

Start dev: `pnpm --filter web dev`. If Chrome DevTools MCP is available, navigate to `http://localhost:3000` and confirm the particle effect renders after initial paint (it may appear a fraction of a second later than before — that is the expected trade-off). Stop the dev server.

### Task B5: Remove build artefacts from repo

**Files:**
- Delete: `apps/web/dev_error.log` (if exists)
- Delete: `apps/web/build_log.txt` (if exists)
- Delete: `apps/web/lh-report.json` (if exists)
- Delete: `apps/web/tsconfig.tsbuildinfo` (if exists)

- [ ] **Step 1: Delete artefacts**

Run:
```bash
rm -f apps/web/dev_error.log apps/web/build_log.txt apps/web/lh-report.json apps/web/tsconfig.tsbuildinfo
```

- [ ] **Step 2: Verify they're tracked before this change**

Run: `git status`
Expected: each of the files above appears as deleted in tracked files (confirming they were committed). If untracked, they were already gitignored — no-op.

### Task B6: Re-measure Lighthouse and commit

**Files:**
- Create: `tasks/evidence/B6-lighthouse-after.json`
- Create: `tasks/evidence/B6-lighthouse-after.md`

- [ ] **Step 1: Rebuild**

Run: `pnpm --filter web build 2>&1 | tail -40`
Expected: success. Capture post-change bundle sizes.

- [ ] **Step 2: Start prod server and re-run Lighthouse**

Same procedure as B1: `pnpm --filter web start` in background, then Lighthouse audit via Chrome DevTools MCP. Save raw JSON to `tasks/evidence/B6-lighthouse-after.json`.

- [ ] **Step 3: Write delta summary**

Create `tasks/evidence/B6-lighthouse-after.md`:

```markdown
# Lighthouse After Phase B — 2026-04-21

| Metric | Baseline | After | Delta |
|---|---|---|---|
| Performance score | <X> | <Y> | <Y-X> |
| LCP (ms) | <X> | <Y> | <Y-X> |
| FCP (ms) | <X> | <Y> | <Y-X> |
| TBT (ms) | <X> | <Y> | <Y-X> |
| CLS | <X> | <Y> | <Y-X> |
| First Load JS (kB) | <X> | <Y> | <Y-X> |

## Interpretation
- <2-3 bullet points about what moved and why>

## Regressions
- <none, or list>
```

- [ ] **Step 4: Stop server and stage changes**

```bash
# stop the prod server
git add apps/web/package.json \
        apps/web/next.config.ts \
        apps/web/src/components/layout/PageShell.tsx \
        apps/web/src/components/system/ParticleBackgroundLazy.tsx \
        pnpm-lock.yaml \
        tasks/evidence/B1-lighthouse-baseline.json \
        tasks/evidence/B1-lighthouse-baseline.md \
        tasks/evidence/B6-lighthouse-after.json \
        tasks/evidence/B6-lighthouse-after.md
# stage deletions of apps/web/{dev_error.log,build_log.txt,lh-report.json,tsconfig.tsbuildinfo} if they were tracked
git add -u apps/web/
```

- [ ] **Step 5: Commit Phase B**

```bash
git commit -m "$(cat <<'EOF'
perf: remove three.js dead deps, enable next.js prod optimizations, lazy-load particles

- Uninstalled three, @react-three/fiber, @react-three/drei, @types/three (zero imports in source)
- next.config.ts: reactStrictMode, compress, AVIF/WebP image formats
- ParticleBackground now dynamic with ssr:false (moved off main bundle)
- Removed tracked build artefacts (dev_error.log, build_log.txt, lh-report.json, tsconfig.tsbuildinfo)
- Lighthouse before/after captured in tasks/evidence/

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 6: Phase B checkpoint report**

Report to user:
- Before/after Lighthouse numbers
- Bundle size delta
- Any regressions observed

Await user confirmation before Phase C.

---

## Phase C — SEO & metadata

### Task C1: Add `robots.txt`

**Files:**
- Create: `apps/web/public/robots.txt`

- [ ] **Step 1: Write `robots.txt`**

Create `apps/web/public/robots.txt` with:

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://nmd.vercel.app/sitemap.xml
```

Note: the sitemap URL should use the production domain. If the final domain is unknown, use `https://nmd.vercel.app` as a placeholder — update in a follow-up once the real domain is fixed. Document this in commit msg.

- [ ] **Step 2: Verify accessibility**

Run dev: `pnpm --filter web dev`
Fetch: `curl http://localhost:3000/robots.txt`
Expected: prints the content above.
Stop dev server.

### Task C2: Add dynamic `sitemap.ts`

**Files:**
- Create: `apps/web/src/app/sitemap.ts`

- [ ] **Step 1: Write the sitemap generator**

Create `apps/web/src/app/sitemap.ts` with:

```typescript
import type { MetadataRoute } from "next";
import { ARTISTS } from "@/data/artists";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${baseUrl}/contacto`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/terminos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/booking`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/shop`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const artistEntries: MetadataRoute.Sitemap = ARTISTS.map((artist) => ({
    url: `${baseUrl}/artists/${artist.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...artistEntries];
}
```

- [ ] **Step 2: Verify build picks up the route**

Run: `pnpm --filter web build 2>&1 | tail -40`
Expected: the build output lists `/sitemap.xml` as a generated route.

- [ ] **Step 3: Verify output**

Run dev: `pnpm --filter web dev`
Fetch: `curl http://localhost:3000/sitemap.xml`
Expected: XML sitemap listing 6 static routes + 12 artist routes. Stop dev server.

### Task C3: Per-page metadata for dynamic routes

**Files:**
- Modify: `apps/web/src/app/artists/[id]/page.tsx`
- Modify: `apps/web/src/app/shop/page.tsx`
- Modify: `apps/web/src/app/booking/page.tsx` (if present — confirm first)

- [ ] **Step 1: Confirm page file paths**

Run: `ls apps/web/src/app/artists/\[id\]/ apps/web/src/app/shop/ apps/web/src/app/booking/ 2>&1`
Note which page.tsx files exist. Adjust steps below to the real files.

- [ ] **Step 2: Add `generateMetadata` to the artist detail page**

Open `apps/web/src/app/artists/[id]/page.tsx`. If it already exports a `metadata` constant, remove it. Add near the top (after imports):

```typescript
import type { Metadata } from "next";
import { ARTISTS } from "@/data/artists";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const artist = ARTISTS.find((a) => a.id === id);
  if (!artist) {
    return { title: "Artista no encontrado" };
  }
  const title = `${artist.name} | NMD`;
  const description = artist.bio ?? artist.blurb ?? `Perfil de ${artist.name} en NMD.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: artist.imageSrc, alt: artist.name }],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [artist.imageSrc],
    },
  };
}
```

Adjust the `params` type to match Next.js 16's convention in the existing file (may be sync `{ id: string }` or async `Promise<{ id: string }>` — read the file, match it).

- [ ] **Step 3: Add metadata to `/shop/page.tsx`**

If `apps/web/src/app/shop/page.tsx` lacks a `metadata` export, add at the top:

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Beats, merch y pieza única del colectivo NMD. Catálogo curado por los 12 artistas.",
  openGraph: {
    title: "Shop | NMD",
    description: "Beats, merch y pieza única del colectivo NMD.",
  },
};
```

If the file is a client component (`"use client"`), metadata must be exported from a nearby server layout — read existing structure and decide. If the shop page is client-only, skip this step and instead create/modify `apps/web/src/app/shop/layout.tsx` with the metadata export.

- [ ] **Step 4: Add metadata to `/booking/page.tsx` (if it exists)**

Same pattern. Title: `"Reservar sesión"`, description: `"Agendá una sesión de estudio con NMD. Horarios en tiempo real vía Google Calendar."`.

- [ ] **Step 5: Build**

Run: `pnpm --filter web build 2>&1 | tail -30`
Expected: success.

### Task C4: Image alt attribute audit

**Files:**
- Modify (as needed): `apps/web/src/components/shop/BeatPlayer.tsx:37`
- Modify (as needed): any file surfaced by the grep below

- [ ] **Step 1: Find images without alt**

Run:
```bash
grep -rn "<Image\|<img" apps/web/src --include="*.tsx" | grep -v "alt=" | grep -v "\.test\."
```
List all results. For each:
- If the image is purely decorative (e.g., a background graphic): add `alt=""` explicitly.
- If it is content: add a descriptive `alt`.

- [ ] **Step 2: Apply fixes**

For each line returned by Step 1, open the file and add an appropriate `alt` attribute. Example: `<Image src="/logo.svg" width={20} height={20} alt="NMD" />`.

- [ ] **Step 3: Verify grep returns nothing**

Re-run the grep from Step 1. Expected: empty output (all images now have alt).

- [ ] **Step 4: Build + tests**

Run: `pnpm --filter web build && pnpm --filter web test`
Expected: both pass.

### Task C5: Phase C verification + commit

- [ ] **Step 1: Re-run Lighthouse for SEO score**

Same procedure as B1/B6 but check the SEO category specifically. Save to `tasks/evidence/C5-lighthouse-seo.json`.

- [ ] **Step 2: Confirm SEO score >= 95**

Read the JSON. If SEO score < 95, inspect the audit details, fix flagged items inline, rerun. Common issues: missing lang attribute (already present in layout.tsx), missing viewport meta (Next handles), missing descriptions (handled).

- [ ] **Step 3: Stage and commit Phase C**

```bash
git add apps/web/public/robots.txt \
        apps/web/src/app/sitemap.ts \
        apps/web/src/app/artists/ \
        apps/web/src/app/shop/ \
        apps/web/src/app/booking/ \
        tasks/evidence/C5-lighthouse-seo.json
git add -u apps/web/src/  # pick up any alt fixes
git commit -m "$(cat <<'EOF'
feat(seo): add robots, sitemap, per-page metadata, image alt audit

- public/robots.txt (allow all, disallow /api, sitemap pointer)
- app/sitemap.ts generates full sitemap including 12 artist routes
- generateMetadata on /artists/[id] with per-artist OG/Twitter
- metadata exports on /shop and /booking
- All Image/img elements now have alt attributes

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 4: Phase C checkpoint report**

Report to user. Await confirmation before Phase D.

---

## Phase D — Hygiene

### Task D1: Delete stale root-level files

**Files (delete):**
- `tmp2.tsx`, `tmp3.diff`, `tmp4.diff`, `tmp5.diff`, `tmp6.tsx`
- `tmp_footer_log.txt`, `tmp_footer_old.tsx`
- `lint_output.txt`, `lint_output8.txt`, `test_output.txt`, `test_output8.txt`
- `npm-shrinkwrap.json`

- [ ] **Step 1: Confirm file list still matches**

Run: `ls tmp* lint_output* test_output* npm-shrinkwrap.json 2>/dev/null`
Expected: each listed file is present. If any is missing, remove from the deletion list — do not fail.

- [ ] **Step 2: Delete**

Run:
```bash
rm -f tmp2.tsx tmp3.diff tmp4.diff tmp5.diff tmp6.tsx \
      tmp_footer_log.txt tmp_footer_old.tsx \
      lint_output.txt lint_output8.txt test_output.txt test_output8.txt \
      npm-shrinkwrap.json
```

- [ ] **Step 3: Verify**

Run: `ls tmp* lint_output* test_output* npm-shrinkwrap.json 2>&1`
Expected: `No such file or directory`.

### Task D2: Update `.gitignore`

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Append hygiene entries**

Open `.gitignore`. After the existing entries, append:

```
# Test artefacts
**/test-results/
**/playwright-report/

# Build artefacts
**/tsconfig.tsbuildinfo
**/build_log.txt
**/dev_error.log
**/lh-report.json

# Generic noise
*.log
tmp*
*_output.txt
```

- [ ] **Step 2: Verify nothing currently tracked is now ignored by error**

Run: `git check-ignore -v apps/web/src/**/*.ts 2>&1 | head -10`
Expected: no source files match ignore patterns.

Run: `git status`
Expected: clean tracked files; any untracked noise now hidden.

### Task D3: Investigate ambiguous folders (NO deletion)

**Files:** None modified.

- [ ] **Step 1: Check references for each folder**

Run (for each folder, one at a time):
```bash
grep -r "beats caba\|beats%20caba" apps/web/src packages --include="*.ts" --include="*.tsx" --include="*.json"
grep -r "shop assets\|shop%20assets" apps/web/src packages --include="*.ts" --include="*.tsx" --include="*.json"
grep -r "_bmad\|web-bundles\|infra/" apps/web/src packages --include="*.ts" --include="*.tsx" --include="*.json" | head -20
```

- [ ] **Step 2: Record findings**

Create `tasks/evidence/D3-folder-investigation.md`:

```markdown
# Ambiguous folders — 2026-04-21

| Folder | Referenced in code? | Recommendation |
|---|---|---|
| `beats caba/` | <yes/no> | <keep / move to docs/pending-assets/ / remove> |
| `shop assets/` | <yes/no> | <keep / move / remove> |
| `_bmad/` | <yes/no> | <keep / remove> |
| `_bmad-output/` | <yes/no> | <keep / remove> |
| `web-bundles/` | <yes/no> | <keep / remove> |
| `infra/` | <yes/no> | <keep — likely deployment infra, leave alone> |
```

DO NOT delete any of these folders. This task only documents findings for user decision.

### Task D4: Phase D verification + commit

- [ ] **Step 1: Final sanity build + test**

Run:
```bash
pnpm --filter web build
pnpm --filter web test
pnpm --filter web lint
```
Expected: all pass.

- [ ] **Step 2: Stage and commit Phase D**

```bash
git add -u .  # picks up deletions
git add .gitignore tasks/evidence/D3-folder-investigation.md
git commit -m "$(cat <<'EOF'
chore: remove stale temp files, tighten gitignore, document candidates

- Deleted tmp*.tsx/diff, *_output.txt, lint_output*.txt, npm-shrinkwrap.json
  (pnpm is the project's package manager per packageManager field)
- .gitignore: added test-results/, playwright-report/, tsconfig.tsbuildinfo,
  *.log, tmp*, *_output.txt
- D3 investigation report in tasks/evidence/ flags ambiguous folders
  (beats caba/, shop assets/, _bmad/, web-bundles/) for user decision

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 3: Final checkpoint**

Run: `git log --oneline -5`
Expected: 4 new commits on `main`:
- chore: remove stale temp files…
- feat(seo): add robots, sitemap…
- perf: remove three.js dead deps…
- fix(security): harden webhook secret…

Run: `git status`
Expected: clean.

---

## Final Report

- [ ] **Write final report to user covering:**
  - Pass/fail per phase
  - Lighthouse before/after deltas
  - Bundle size delta
  - List of files changed / deleted
  - Vercel env-var reminder (link to `docs/deploy-vercel-env.md`)
  - D3 folder investigation summary with questions for user
  - List of deferred items (from spec §11) that still need attention
