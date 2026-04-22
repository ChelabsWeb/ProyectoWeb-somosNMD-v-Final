# Urgent Optimization — Final Report

**Date:** 2026-04-21
**Branch:** main (ahead of origin/main by 6 commits)
**Related docs:** `docs/superpowers/specs/2026-04-21-urgent-optimization-design.md`, `docs/superpowers/plans/2026-04-21-urgent-optimization-plan.md`

## Summary

All four planned phases executed on `main`, one conventional commit per phase. Build and test baselines preserved — no regressions introduced. Three security and metadata vulnerabilities closed. Repo cleaned of ~16000 lines of stale cruft (mostly `npm-shrinkwrap.json`). 6 packages removed from the dependency graph.

## Phases

| Phase | Scope | Commit | Status |
|---|---|---|---|
| A | Bugs & security | `d4c582b` fix(security)… | ✅ |
| B | Performance | `7ce2918` perf… | ✅ |
| C | SEO & metadata | `b2371e3` feat(seo)… | ✅ |
| D | Hygiene | `a7bdcef` chore… | ✅ |

## Metrics

### Tests

| | Passing | Failing | Total |
|---|---|---|---|
| Baseline (pre-flight) | 45 | 6 | 51 |
| After Phase A | 48 | 6 | 54 (+3 new security tests) |
| After Phase B | 48 | 6 | 54 |
| After Phase C | 48 | 6 | 54 |
| After Phase D | 48 | 6 | 54 |

The 6 pre-existing failures (booking-data-form ×2, session-type-cards ×1, time-slot-grid ×2, ArtistCard ×1) are NOT in the scope of this session. They were present before and remain unchanged — flagged for a separate session.

### Build

All phase-end builds passed. 23 → 24 static routes (added `/sitemap.xml`).

### Dependencies removed (Phase B)

- `three@0.180.0`, `@react-three/fiber@9.4.0`, `@react-three/drei@10.7.6`, `@types/three@0.180.0` (direct)
- `maath@0.10.8`, `stats-gl@2.4.2` (transitive)

Lockfile delta: -9931 lines in `pnpm-lock.yaml`. Disk footprint (pnpm store, apps/web scope): ~5-6 MB removed.

### Lighthouse

Runtime Lighthouse measurement was blocked in the sandbox environment (port conflicts + background process termination). Vercel Speed Insights (wired into `apps/web/src/app/layout.tsx`) will track Core Web Vitals in production automatically. See `tasks/evidence/B-performance-report.md` for the static evidence captured.

## Security posture — changes

1. `apps/web/src/lib/services/security.ts` no longer has a hardcoded public fallback for `WEBHOOK_SECRET`. If the env var is missing, `createSignature` throws an actionable error with instructions to generate the secret. `verifySecureToken` returns `null` on the same condition (fail-closed, never "all tokens valid").
2. `vitest.setup.ts` seeds a deterministic test secret so regular tests keep running; specific security tests exercise the missing-secret throw path.
3. `docs/deploy-vercel-env.md` lists every env var to configure in Vercel before the next production deploy, with a CLI recipe.

## SEO / metadata — changes

1. `app/layout.tsx` metadata replaced with full production config tied to `NEXT_PUBLIC_APP_URL`: `metadataBase`, title template, description, keywords, authors, robots directives, OG (es_UY, website, images), Twitter summary_large_image.
2. `public/robots.txt` added: allow all, disallow /api, sitemap pointer. **Note: the sitemap URL currently hardcodes `https://nmd.vercel.app` as placeholder — update once the real production domain is decided.**
3. `app/sitemap.ts` generates a full sitemap (home + 5 static routes + 12 dynamic artist routes) driven by `NEXT_PUBLIC_APP_URL`.
4. `/artists/[id]` now exports `generateMetadata` with per-artist title/description/OG/Twitter, profile type.
5. `/shop/layout.tsx` added to expose metadata (the page itself is a Client Component).
6. Image alt audit: all `<Image>` and `<img>` in source already had `alt` attributes. No fixes needed.

## Legal pages

`/terminos` and `/privacidad` last-updated stamps bumped from "Marzo 2026" to "Abril 2026".

## Repo hygiene

Deleted from root:
- 7 `tmp*` files (leftover WIP)
- 4 `*_output.txt` log files
- `npm-shrinkwrap.json` (conflicted with pnpm; project uses pnpm per `packageManager`)
- 3 build artefacts from `apps/web/` (`build_log.txt`, `dev_error.log`, `lh-report.json`)

`.gitignore` tightened with: `test-results/`, `playwright-report/`, `tsconfig.tsbuildinfo`, `*.log`, `tmp*`, `*_output.txt`, plus explicit gitignore for the artefacts above. Also added `!.env.example` exception in `apps/web/.gitignore` so env docs can be tracked.

## Required user actions

Before the next production deploy:

1. **Set Vercel env vars.** See `docs/deploy-vercel-env.md` for the full list and CLI commands. Key: `WEBHOOK_SECRET`, `NEXT_PUBLIC_APP_URL`, plus existing Resend/Google vars. After Phase A, the app will now throw a loud error on any booking webhook if `WEBHOOK_SECRET` is missing — this is by design.
2. **Decide the real production domain.** `public/robots.txt` has `https://nmd.vercel.app` as placeholder. Update once you know the real URL. Alternatively, remove the `Sitemap:` line from robots.txt and set the base URL via `NEXT_PUBLIC_APP_URL` on Vercel (the sitemap route will then emit correct URLs automatically).
3. **Review `tasks/evidence/D3-folder-investigation.md`.** Four root-level folders (`beats caba/`, `shop assets/`, `_bmad/`, `web-bundles/`) were NOT touched — they may hold client deliverables. Please confirm disposition: relocate to `docs/pending-assets/` or delete.

## Deferred (known, out of scope for this session)

These were identified during audit and intentionally left:

- Real artist bios and Spotify URLs in `apps/web/src/data/artists.ts`
- Real artist photography and `/artists/[id]` gallery (4 placeholder boxes)
- Payment processor integration for `/shop`
- Resend domain verification (still on `onboarding@resend.dev` sandbox)
- Unifying contact email (`hola@nomades.uy` in footer vs `nmd.wav@gmail.com` elsewhere)
- Mounting `SoloPolvoSection` on the homepage
- Booking optimistic UI race condition (UI shows success before email confirmation lands)
- Rate limiting on `/api/webhooks/resend` and `sendContactMessage`
- Booking persistence in a DB (Supabase/Neon) — currently if email fails, the booking is lost
- Fixing the 6 pre-existing test failures (booking-data-form ×2, session-type-cards ×1, time-slot-grid ×2, ArtistCard ×1)
- Real Lighthouse audit on a dev machine or CI
- Deep accessibility audit (keyboard nav, screen reader, ARIA beyond alt)
- Mixed es/en language strategy
- Pre-existing ESLint errors (43 in total — none new)

## Commits in this session

```
a7bdcef chore: remove stale temp files, tighten gitignore, document candidates
b2371e3 feat(seo): add robots, sitemap, per-page metadata
7ce2918 perf: remove three.js dead deps, enable next.js prod optimizations, lazy-load particles
d4c582b fix(security): harden webhook secret and update production metadata
66c71c4 docs: add urgent optimization implementation plan
e069174 docs: add urgent optimization design spec
```

All ready to push to `origin/main` whenever you confirm.
