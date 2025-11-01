# Technical Assumptions

### Repository Structure: Monorepo
Single repo with `apps/web` (Next.js 16 experience) plus supporting packages such as `packages/ui` (Shadcn component tokens) and `packages/animation` (GSAP/Three helpers). Keeps shared UI/animation logic centralized and simplifies Vercel deployment. _(Assumption: No additional services/apps are needed for MVP.)_

### Service Architecture
Next.js App Router handles the presentation layer while Vercel Functions provide lightweight endpoints for contact submissions, analytics webhooks, or future data needs. No dedicated backend service is planned initially; Supabase/email integrations can handle inquiry storage. _(Assumption: collaboration requests don’t require a separate API tier.)_

### Testing Requirements
Unit + integration focus: Vitest/Jest for utilities (audio helpers, analytics tracking), Playwright/Cypress for key flows (loader transition, gallery navigation, audio previews, inquiry form), plus manual/visual QA checklist for GSAP/Three timelines to catch animation regressions. _(Assumption: full automated audio-stream testing is unnecessary at MVP.)_

### Additional Technical Assumptions and Requests
- Audio previews hosted via compliant CDN or Spotify snippets with image fallback when playback fails.
- Codex CI/CD on Vercel enforces TS/ESLint/Prettier before deployment; failures block release.
- Analytics stream to Vercel Analytics plus future PostHog/Amplitude destination; confirm retention requirements.
- Content updates occur via git commits (no CMS). If CMS becomes necessary later, evaluate MDX or Sanity during Post-MVP phase.
