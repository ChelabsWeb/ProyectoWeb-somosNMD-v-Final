# Urgent Optimization — SomosNMD

**Date:** 2026-04-21
**Status:** Approved, pending implementation plan
**Author:** Chelabs (Master agent session)

## 1. Context

SomosNMD is a Next.js 16 monorepo (Turborepo) for NMD, a Uruguayan music collective of 12 artists. The site has a fully functional booking system, artist pages, and a mock shop. A previous audit in March 2026 documented a list of pending critical fixes in `tasks/plan.md`. This session audits the current state and executes the fixes that remain — some of those items were already resolved since March.

The user request: "urgently optimize this website and make it better, fix all mistakes." Scope was narrowed through brainstorming to an integral audit that excludes work requiring client input (real bios, photos, Spotify URLs, payment processor, domain verification).

## 2. Scope

### In scope

- Production security vulnerabilities (`WEBHOOK_SECRET` fallback, missing env vars)
- Production-grade `layout.tsx` metadata (currently says "nmd lokitaaa")
- Performance optimization — baseline Lighthouse, remove dead dependencies, lazy-load heavy components, remeasure
- SEO fundamentals — robots.txt, sitemap.xml, per-page OG/Twitter metadata, image alt attributes
- Repository hygiene — stale temp files, log files, duplicate lockfiles, incomplete `.gitignore`

### Out of scope (requires client input or business decisions)

- Real artist bios and Spotify URLs in `apps/web/src/data/artists.ts`
- Real artist photography and `/artists/[id]` gallery images
- Payment processor integration (Stripe / MercadoPago) for shop
- Resend domain verification (currently uses `onboarding@resend.dev`)
- Unifying contact email across the project (`hola@nomades.uy` in footer vs `nmd.wav@gmail.com` in booking/contact)
- Mounting `SoloPolvoSection` on the homepage
- Replacing shop mock data with real catalog
- Rate limiting on `/api/contact` or `/api/webhooks/resend`
- Persisting bookings to a database (Supabase/Neon)
- Deep accessibility audit (ARIA beyond alt tags, keyboard navigation, screen reader testing)
- Content internationalization decisions (mixed es/en in labels)

## 3. Pre-implementation state (verified 2026-04-21)

### Already resolved since March 2026 (do not re-do)

- `/contacto` exists and has a functional form (`contact-form.tsx`) that calls `sendContactMessage` in `apps/web/src/lib/actions/contact.ts` using Resend. Admin email is `nmd.wav@gmail.com`.
- `/terminos/page.tsx` has full Spanish legal text tailored to Uruguay (acceptance, usage, bookings, liability, modifications, legislation). Last-updated stamp reads "Marzo 2026".
- `/privacidad/page.tsx` has full Spanish privacy text (data collection, usage, cookies, third parties, contact). Last-updated stamp reads "Marzo 2026".
- `apps/web/src/lib/actions/booking.ts` no longer uses `fs.appendFileSync`; it uses `console.error` (compatible with Vercel's read-only filesystem).

### Still broken

- `apps/web/src/lib/services/security.ts:4` uses `process.env.WEBHOOK_SECRET || "default_development_secret_key_change_me_in_prod!"`. The fallback is a public hardcoded string — anyone reading the repo can forge valid HMAC tokens. The warning at runtime is only `console.warn` and does not halt execution.
- `apps/web/src/app/layout.tsx:20-23` still has `title: "Proyecto Web NMD"` and `description: "Bienvenido a la pagina web de nmd lokitaaa"`. No `metadataBase`, no OG tags, no Twitter cards.
- `apps/web/.env.local` is missing `WEBHOOK_SECRET` and `NEXT_PUBLIC_APP_URL`.
- `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` are in `apps/web/package.json` dependencies despite the 3D logo being replaced with a static SVG (commit `fc1c46d`). Grep for `@react-three` or `from "three"` in `apps/web/src` returns zero matches — confirmed dead weight.
- `apps/web/next.config.ts` is empty (`const nextConfig: NextConfig = {}`) — no image optimization, compression, or strict mode configured.
- Repo root contains: `tmp2.tsx`, `tmp3.diff`, `tmp4.diff`, `tmp5.diff`, `tmp6.tsx`, `tmp_footer_log.txt`, `tmp_footer_old.tsx`, `lint_output.txt`, `lint_output8.txt`, `test_output.txt`, `test_output8.txt`, `npm-shrinkwrap.json` (conflict with `pnpm-lock.yaml`).
- `.gitignore` does not cover `test-results/`, `playwright-report/`, `tsconfig.tsbuildinfo`, `*.log`, `lh-report.json`, `tmp*`, `*_output.txt`.
- No `robots.txt`, no `sitemap.ts` in Next.js app router.

## 4. Execution strategy

Phase-by-phase with checkpoints. One conventional commit per phase. After each phase: run `pnpm build` and `pnpm test`, capture evidence (screenshot or diff), report to user, proceed or adjust.

Order: A → B → C → D. Performance comes after bug fixes so that baseline measurement reflects a clean state.

## 5. Phase A — Bugs & security

### A1. Harden `WEBHOOK_SECRET`

- File: `apps/web/src/lib/services/security.ts`
- Remove hardcoded fallback string on line 4.
- Replace the top-level `SECRET_KEY` constant with a lazy getter (e.g., `function getSecretKey(): string`) that reads `process.env.WEBHOOK_SECRET` on first use and throws a clear `Error("Missing WEBHOOK_SECRET environment variable")` if absent. Reason for lazy evaluation: throwing at module import time breaks Next.js's static analysis and SSR tooling; throwing at first cryptographic operation fails just as loudly without that cost.
- Apply the throw unconditionally (both production and development). Rationale: `console.warn` is easy to miss, and the default key compromises security even locally if dev tunnels or shared networks are in use.
- Update `createSignature` and any other callers to use `getSecretKey()` instead of the module-level constant.
- Keep the core HMAC logic of `createSignature`, `generateSecureToken`, `verifySecureToken` unchanged — only how the secret is sourced changes.

### A2. Generate secrets and update env files

- Generate a fresh secret with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
- Write it to `apps/web/.env.local` as `WEBHOOK_SECRET=<value>`.
- Add `NEXT_PUBLIC_APP_URL=http://localhost:3000` to `apps/web/.env.local`.
- Update `apps/web/.env.example` to document all required env vars, grouped by concern (Resend, Google Calendar, webhook security, app URL), with instructions to generate the secret.
- At end of phase, report the generated secret in a private note to user (for Vercel setup).

### A3. Production-grade `layout.tsx` metadata

- File: `apps/web/src/app/layout.tsx`
- Replace `metadata` export with a full object: `metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000")`, proper `title` with template, `description`, `keywords`, `openGraph` (type website, locale es_UY, title, description, siteName, url, images), `twitter` (card summary_large_image, title, description, images), `robots`, `themeColor`.
- Default title: `"NMD — Nómades"` with template `"%s | NMD"`.
- Description: short brand-appropriate text about the collective.
- OG image: reuse existing `/assets/logo/logoNMD.svg` or create a new 1200x630 png in `apps/web/public/assets/og/default.png` — if png does not exist, reference the SVG and leave a TODO note in the doc (SVG is acceptable but png is preferred for OG).

### A4. Update legal pages last-updated stamp

- `apps/web/src/app/terminos/page.tsx` and `apps/web/src/app/privacidad/page.tsx`: change "Última actualización: Marzo 2026" to "Abril 2026" — reflects actual review date.

### A5. Verification

- `pnpm build` passes with zero errors.
- `pnpm test` passes.
- Manually navigate booking flow in dev and confirm email is sent (or fails with an actionable error if Resend sandbox is off).
- Screenshot `/`, `/contacto`, `/terminos`, `/privacidad` for the before/after record.
- Commit: `fix(security): harden webhook secret, update production metadata`

## 6. Phase B — Performance

### B1. Baseline measurement

- Build and start production server: `pnpm --filter web build && pnpm --filter web start` (or turbo equivalents).
- Use Chrome DevTools MCP to run Lighthouse on `http://localhost:3000`. Capture: Performance score, LCP, FCP, CLS, TBT, TTFB, total bundle size.
- Save raw numbers in `tasks/lessons.md` under a new dated section.

### B2. Remove dead dependencies

- `pnpm --filter web remove three @react-three/fiber @react-three/drei @types/three`
- Verified via grep: zero imports of `@react-three/*` or `from "three"` in `apps/web/src`.
- Run `pnpm build` — if build succeeds, dependencies were truly unused. If it fails, revert and investigate.

### B3. Enable Next.js production optimizations

- File: `apps/web/next.config.ts`
- Add: `reactStrictMode: true`, `compress: true`, `poweredByHeader: false`, `images: { formats: ['image/avif', 'image/webp'] }`.
- Keep the file minimal — no speculative config.

### B4. Lazy-load ParticleBackground

- File: `apps/web/src/components/system/ParticleBackground.tsx` and its consumers.
- If not already, wrap consumer imports with `dynamic(() => import(...), { ssr: false })`. Tsparticles is a heavy client-only library that should not block initial render.
- Verify after the change that the particle effect still appears on load.

### B5. Remove build artefacts from repo

- Delete (if present): `apps/web/dev_error.log`, `apps/web/build_log.txt`, `apps/web/lh-report.json`, `apps/web/tsconfig.tsbuildinfo`.
- These are regenerable and should not be committed.

### B6. Re-measurement and comparison

- Rebuild and rerun Lighthouse.
- Compute deltas. Document in commit message and `tasks/lessons.md`.
- Commit: `perf: remove three.js dead deps, enable next.js prod optimizations, lazy-load particles`

### B7. Acceptance

- No regression in any Lighthouse metric (Performance, Accessibility, Best Practices, SEO).
- Ideally: LCP improves ≥10% or Performance score improves ≥5 points. If no measurable gain, document why (e.g., already well-optimized, bottleneck elsewhere).

## 7. Phase C — SEO & metadata

### C1. `robots.txt`

- File: `apps/web/public/robots.txt`
- Content: `User-agent: *` with `Allow: /`, disallow `/api/` only, `Sitemap: <NEXT_PUBLIC_APP_URL>/sitemap.xml`.

### C2. `sitemap.ts`

- File: `apps/web/src/app/sitemap.ts`
- Use Next.js 16 App Router sitemap convention (export default async function returning `MetadataRoute.Sitemap`).
- Include: `/`, `/contacto`, `/terminos`, `/privacidad`, `/shop` (if publicly browsable), `/artists/[id]` for each of the 12 artists (read from `apps/web/src/data/artists.ts`).
- `lastModified: new Date()`, `changeFrequency: "monthly"`, `priority: 0.8` for home, 0.6 for others.

### C3. Per-page `generateMetadata`

- `/contacto`, `/terminos`, `/privacidad` already have `metadata` exports; enrich with `openGraph` and `alternates.canonical`.
- `/artists/[id]/page.tsx` — add `generateMetadata` that returns per-artist title (`${artist.name} | NMD`), description (short), openGraph images (artist photo placeholder or site default), Twitter card.
- `/shop/page.tsx` — add basic metadata with OG tags.

### C4. Image alt attributes

- Grep for `<Image` and `<img` in `apps/web/src` and list any without `alt`. Fix each to describe the image content (not decorative-only; use `alt=""` for purely decorative images).

### C5. Verification & commit

- `pnpm build` passes.
- Re-run Lighthouse — SEO score should be 95+.
- Manual: fetch `http://localhost:3000/sitemap.xml` and `robots.txt`, verify content.
- Commit: `feat(seo): add robots, sitemap, per-page metadata, image alt audit`

## 8. Phase D — Hygiene

### D1. Delete root-level stale files

From repo root, delete:
- `tmp2.tsx`, `tmp3.diff`, `tmp4.diff`, `tmp5.diff`, `tmp6.tsx`, `tmp_footer_log.txt`, `tmp_footer_old.tsx`
- `lint_output.txt`, `lint_output8.txt`, `test_output.txt`, `test_output8.txt`
- `npm-shrinkwrap.json` (conflicts with `pnpm-lock.yaml` — project uses pnpm per `packageManager` in `package.json`)

### D2. Update `.gitignore`

Add entries:
- `**/test-results/`
- `**/playwright-report/`
- `**/tsconfig.tsbuildinfo`
- `*.log`
- `**/lh-report.json`
- `tmp*`
- `*_output.txt`
- `**/build_log.txt`
- `**/dev_error.log`

Leave existing entries intact.

### D3. Investigate ambiguous folders (do NOT delete without confirmation)

Run grep to check if the following paths are referenced in source:
- `beats caba/` (spaces in name — possibly raw audio assets)
- `shop assets/` (possibly raw shop imagery)
- `_bmad/`, `_bmad-output/`, `web-bundles/`, `infra/`

If unreferenced: flag to user in final report as "candidates for removal or relocation to `docs/pending-assets/`" — do NOT delete. These may be client deliverables.

### D4. Commit

- `chore: remove stale temp files and tighten gitignore`

## 9. Global success criteria

- `pnpm build` passes with zero errors and no new warnings.
- `pnpm test` passes.
- `pnpm lint` passes (or only reports pre-existing issues).
- Lighthouse Performance score ≥ baseline; SEO score ≥ 95; Accessibility score ≥ baseline.
- `apps/web/.env.local` has `WEBHOOK_SECRET` and `NEXT_PUBLIC_APP_URL` populated.
- No hardcoded security fallback remains in `security.ts`.
- No 404 on internal links from home or footer.
- Four conventional commits on `main`, in phase order (A, B, C, D).
- Evidence captured: before/after Lighthouse JSON, screenshots of main pages, list of removed files.

## 10. Risks

- **Removing Three.js**: if any consumer imports are missed by grep (e.g., via string-based dynamic import), build fails. Mitigation: `pnpm build` immediately after uninstall. Revert if it fails.
- **`WEBHOOK_SECRET` hard-fail in prod**: if the site is already deployed on Vercel without this env var set, the next deploy will crash on startup. Mitigation: at end of Phase A, instruct user to set both env vars in Vercel before next push. Include the exact `vercel env add` commands.
- **Lighthouse variance**: single-run Lighthouse is noisy. Mitigation: run 3 times, use median, or accept ±5 point variance as normal.
- **Next.js 16 sitemap API drift**: verify `MetadataRoute.Sitemap` shape via Context7 docs before implementing if any type errors appear.
- **Asset folders `beats caba/` and `shop assets/`**: if they contain client deliverables that are not yet integrated, moving or deleting them loses work. Mitigation: leave alone, flag in final report.

## 11. Deferred / follow-up items

These were identified during the audit but intentionally left for a later session:

- Payment processor for shop
- Real bios, photos, Spotify URLs for the 12 artists
- Resend domain verification
- Contact-form rate limiting (spam risk)
- Booking persistence in a database
- Race condition in optimistic booking UI (email failure after UI success)
- Mixed es/en language strategy
- Full accessibility audit
- Decide whether to mount `SoloPolvoSection`

## 12. Acceptance process

After implementation:
1. Master agent reports per-phase evidence to user
2. User reviews diffs and screenshots
3. User confirms deploy-ready or requests adjustments
4. User runs Vercel env-var setup commands (provided)
5. Merge / deploy decision is user's
