# MVP Scope

### Core Functionality (In Scope)
- Cinematic 3D loader + hero reveal (FR1–FR2) establishing the brand experience.
- Horizontal artist gallery with interactive overlays (FR3) and motion layers governed by NFR1–NFR3.
- Music projects grid/cards with tracklists, audio previews, and Spotify deep links (FR4–FR5).
- Collaboration/booking CTAs, contact form, and instrumentation/analytics (FR6, NFR4–NFR5).
- Performance/accessibility guardrails, telemetry, and reduced-motion fallbacks defined in NFRs.

### Out of Scope for MVP
- Full CMS or self-service content management (updates remain code-driven).
- Loyalty programs, user accounts, or persistent personalization tied to purchases.
- Multi-language localization and region-specific content.
- Live video livestreams, fan chat, or interactive concert rooms.
- Deep community features (accounts, personalization) beyond tracking engagement signals.

### MVP Validation & Learning Plan
- **Primary metrics:** Spotify click-throughs, newsletter signups, inquiry submissions, audio preview engagements, scroll depth completion, and average session duration (targets defined in Goals section).
- **Instrumentation:** Vercel Analytics + product analytics (e.g., PostHog) capturing the above metrics with cohort tagging (fan vs. scout).
- **Feedback loops:** Contact form responses categorized for qualitative insights, optional follow-up surveys, social listening around launch content.
- **Exit criteria for MVP:** Hit or trend toward KPI targets for three consecutive weeks, confirm animations meet performance budgets on target devices, and demonstrate the ability to refresh content (new projects/releases) without regression.
