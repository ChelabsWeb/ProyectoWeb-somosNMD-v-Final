# Observability Baseline

## Metrics & Dashboards
- **Vercel Analytics** is enabled via `<Analytics />` in `apps/web/src/app/layout.tsx`.
- **Vercel Speed Insights** streams core web vital deltas with `<SpeedInsights />`.
- After each deploy, visit the project dashboard (`Vercel > Analytics`) and confirm the new deployment appears in the timeline. The first request usually takes ~2 minutes to populate.

## Verification Checklist per Deployment
1. Hit the preview or production URL with DevTools open and confirm the network call to `/analytics/script.js` succeeds.
2. In Vercel, filter the Analytics dashboard by the deployment URL and verify the "Views" and "Core Web Vitals" cards updated.
3. Use `vercel logs <deployment-url>` to inspect Edge/function logs for loader + contact endpoints once they are added.
4. Export a CSV from the Analytics dashboard if stakeholders need snapshots (Download > CSV).

## Alerting Hooks
- Configure email or Slack alerts directly in Vercel for error-rate spikes.
- For deeper product analytics, wire PostHog using the shared helpers in `packages/animation` once event schemas are finalized (see docs/architecture/tech-stack.md).

## Hero Analytics Events
- `hero_mask_complete` — fired when the scroll-driven mask animation finishes its reveal sequence.
- `hero_cta_click` — fired when a hero CTA marker (artists/music/contact) is activated. Payload includes `{ target }` representing the section id.

## Local Instrumentation Notes
- The analytics packages are no-ops locally but keep them mounted to catch layout regressions.
- `markAppReady` (tested via Vitest) emits a custom `app:ready` event; hook future performance measurements to that event instead of `window.onload`.

- The analytics packages are no-ops locally but keep them mounted to catch layout regressions.
- `markAppReady` (tested via Vitest) emits a custom `app:ready` event; hook future performance measurements to that event instead of `window.onload`.



