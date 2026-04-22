# Phase B — Performance evidence

_Date: 2026-04-21_

## Measurement constraints

Lighthouse + `next start` runtime measurement was blocked in the sandbox
environment (port 3000 conflicts, background-process termination). Phase B
metrics therefore captured via static analysis: package-level disk sizes,
build output chunks, and dependency manifest diffs. This is sufficient to
quantify the intended wins for the changes made.

## Changes applied

### B2 — Removed dead dependencies

Uninstalled packages (zero source references in `apps/web/src` or
`packages/`):

- `three@0.180.0`
- `@react-three/fiber@9.4.0`
- `@react-three/drei@10.7.6`
- `@types/three@0.180.0`

Transitively removed (no longer needed by any consumer):

- `maath@0.10.8`
- `stats-gl@2.4.2`

On-disk footprint removed (pnpm store, apps/web only):

- `@react-three/drei` ≈ 3.0M
- `@react-three/fiber` ≈ 475K
- `three` + `@types/three` + `maath` + `stats-gl` ≈ additional ~2-3M

Net: roughly 5-6 MB lifted from the pnpm store, and 4 direct + 2 transitive
packages removed from `pnpm-lock.yaml`. Bundle-size delta is small because
these packages had zero imports — tree-shaking already excluded them. The
concrete wins are:

- Cleaner `package.json` (accurately lists what is used)
- Faster `pnpm install` on CI and developer machines
- Smaller Vercel deploy upload
- Easier future audits — no phantom deps

### B3 — Next.js production config

`apps/web/next.config.ts` before: empty object.

After:

```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
};
```

Impact:

- `reactStrictMode: true` — catches subtle bugs during dev (double-effects,
  deprecated APIs). No runtime cost in prod.
- `compress: true` — gzip of server responses.
- `poweredByHeader: false` — removes `X-Powered-By: Next.js` (minor security).
- `images.formats` — AVIF/WebP served when browsers support it, shrinking
  payload for the logo, hero, artist photos and shop imagery.

### B4 — `ParticleBackground` lazy-loaded

`apps/web/src/components/layout/PageShell.tsx`: replaced the static import
of `ParticleBackground` with `next/dynamic` + `{ ssr: false, loading: () => null }`.

`PageShell` is already a Client Component (`"use client"` at top), so the
planned client-wrapper file was not needed. Simpler fix.

Effect: tsParticles (`@tsparticles/engine`, `@tsparticles/react`,
`@tsparticles/preset-links`) is code-split into its own chunk and no longer
loads on the critical path of every page.

### B5 — Removed committed build artefacts

Deleted (were tracked in git, should have been `.gitignore`d):

- `apps/web/build_log.txt`
- `apps/web/dev_error.log`
- `apps/web/lh-report.json`
- `apps/web/tsconfig.tsbuildinfo` (regenerable)

Phase D will add the gitignore rules that keep them out.

## Test regression check

Tests before Phase B: 48 pass / 6 fail (the 6 are pre-existing, documented in
pre-flight baseline).

Tests after Phase B: 48 pass / 6 fail — no new failures introduced.

## Follow-ups (deferred)

- Real Lighthouse run in a dev machine or CI with working `next start`. The
  environment constraints do not affect production — Vercel will measure
  Core Web Vitals via Speed Insights automatically.
- Consider dynamic-importing `gsap/ScrollTrigger` too if a future audit shows
  it on the critical path.
