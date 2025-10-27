# Project Web NMD Upcoming Features Brief

## Purpose
Capture near-term enhancements that extend the existing architecture and UX vision. The first slated feature is the CMS-backed content pipeline; future sections can append additional initiatives as they are prioritized.

## Feature 1: CMS Integration
- **CMS Choice:** Sanity.io (2024 platform) — real-time content studio, strong image asset pipeline, excellent TypeScript tooling, and edge-friendly webhooks. Contentful remains a viable fallback if procurement requires enterprise SLAs.
- **Integration Pattern:** Next.js App Router + Sanity Content Lake queried via GROQ in RSC loaders. Use Vercel ISR for cached responses and Sanity webhooks to trigger revalidation.
- **Scope:** Replace hardcoded data for artists, music projects, teasers, and press/contact copy with CMS-managed entries. Keep animation parameters and GSAP configs in code for performance control.

### High-Level Architecture Changes
1. **New Workspace:** `packages/cms` housing schema definitions, GROQ fragments, and shared fetch utilities (`createSanityClient`, cache helpers).
2. **Environment Variables:** Add `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_VERSION`, `SANITY_READ_TOKEN` (optional for preview) to `.env.local` and Vercel envs.
3. **Data Flow:**  
   - Server components call `getArtists`, `getProjects`, `getTeasers` from `packages/cms`.  
   - Helpers wrap Next.js `cache()` to enable ISR with fallbacks.  
   - Edge revalidation endpoint (`apps/web/app/api/revalidate/route.ts`) listens to Sanity webhook payloads.  
   - Optional preview mode uses Sanity Studio drafts via token-authenticated client.
4. **Asset Strategy:** Route Sanity image URLs through Next.js Image (`next-sanity/image`) and map audio/video references to Vercel Blob paths stored in CMS documents.

### Content Model Outline
| Document | Key Fields | Notes |
| --- | --- | --- |
| `artist` | `name`, `slug`, `role`, `bioPortableText`, `spotifyUrl`, `socials[]`, `profileImage`, `accentColor`, `featuredProjects[]` | Drives horizontal gallery overlays. |
| `project` | `title`, `slug`, `type`, `releaseDate`, `summaryPortableText`, `tracklist[]`, `spotifyUrl`, `previewAudio`, `artwork`, `heroPalette` | Powers music cards and audio previews. |
| `teaser` | `title`, `headline`, `supportCopy`, `ctaLabel`, `ctaHref`, `distortionPreset`, `backgroundMedia` | Feeds “Midnight Is Close” teaser plus future drops. |
| `pressContent` | Singletons for hero copy, CTA messaging, footer links, and contact intro text. |

Portable Text fields allow rich copy while keeping formatting controlled; create custom serializers in `packages/ui` to respect typography tokens.

### Implementation Phases
1. **Setup & Plumbing**
   - Initialize Sanity project (`pnpm dlx sanity@latest init --template clean`).  
   - Add schema files mirroring the table above; commit under `packages/cms/schemas`.  
   - Configure Sanity Studio as embedded Next.js route (`apps/web/app/(studio)/studio/[[...index]]/page.tsx`) behind basic auth if needed.
2. **Data Access Layer**
   - Build typed GROQ queries + Zod validators in `packages/cms/queries` to ensure shape parity with client needs.  
   - Implement caching helpers (`withDraftMode`, `getCachedQuery`) per Next.js 16 patterns.
3. **Section Integration**
   - Replace static data imports in loader, hero, artists, music, teaser sections with CMS functions.  
   - Ensure fallback content for empty datasets (e.g., no teaser available).  
   - Update analytics metadata to include CMS IDs for event correlation.
4. **Revalidation & Previews**
   - Deploy webhook endpoint, handle secret validation, and call `revalidateTag` for relevant routes.  
   - Wire Next.js Preview Mode using Sanity draft tokens for editors to review unpublished content.
5. **Documentation & Training**
   - Produce editor onboarding guide (screenshots, field descriptions).  
   - Align content governance (roles, publishing workflow) with collective stakeholders.

### Testing & Quality Gates
- Write Vitest unit tests for CMS query helpers (mock Sanity client).  
- Add integration tests using Sanity’s `@sanity/client` with seed data fixture.  
- Extend Playwright smoke tests to assert dynamic content renders and localized images/audio load.  
- Validate revalidation by mutating CMS entries in staging and confirming Vercel preview refresh.

### Risks & Mitigations
- **Latency spikes from live queries:** Mitigate with ISR caching, `stega` preview helper, and selective edge caching.  
- **Content drift breaking layouts:** Use Zod validation + fallback defaults, plus editorial lint rules (e.g., max characters).  
- **Asset storage duplication:** Decide ownership—media either managed entirely in Sanity (image pipeline) or referenced to Vercel Blob to avoid redundant uploads.

### Open Questions
1. Do editors require localization or multiple datasets (e.g., EN/ES)?  
2. Should contact submissions be editable/logged in CMS or remain Supabase-only?  
3. Is there budget appetite for Contentful/Prismic if procurement policies restrict Sanity usage?

### Next Steps for Assigned Agent
1. Confirm CMS selection with stakeholders and handle account provisioning.  
2. Kick off Phase 1 tasks, ensuring schema PR includes review from UX/content owners.  
3. Schedule demo of Sanity Studio in staging to validate preview + publishing workflow.  
4. Update `docs/architecture.md` and `docs/front-end-spec.md` with CMS references after implementation.

---

## Feature 2: Media Optimization Pipeline
- **Goal:** Ensure 3D assets, hero imagery, and audio previews stay performant across mid-tier mobile while preserving cinematic quality.
- **Approach:** Introduce an asset processing workflow using FFmpeg (audio), Sharp (images), and optionally Vercel’s build output API to generate derivatives during CI.
- **Scope:** Optimize loader GLB, hero background video loops, gallery portraits, and audio snippets. Provide low/high quality variants and adaptive loading hints.

### Architecture Additions
1. **Pipeline Scripts:** Add `packages/media-tools` with Node scripts for image resizing, sprite sheet generation, and audio clipping/normalization.
2. **CI Integration:** Extend Turborepo tasks so `pnpm build:assets` runs before Next.js build in CI, outputting to `apps/web/public/__processed`.
3. **Runtime Selection:** Implement a `useResponsiveAsset` helper that chooses asset tier based on network information (`navigator.connection`) and `prefers-reduced-data`.

### Testing & Validation
- Automated smoke test verifying generated files exist and match expected bitrate/resolution.  
- Lighthouse CI budget updates to assert improved LCP/TBT.  
- Manual QA on low-end Android/iOS devices for visual/audio parity.

### Open Questions
1. Should we store processed assets in Vercel Blob or rely on repo outputs?  
2. Do we need designer sign-off on each compression profile?

### Next Steps
1. Draft pipeline architecture doc with required tooling + dependencies.  
2. Prototype one asset type (e.g., hero video) to benchmark size/perf improvements.  
3. Review with creative leads for quality acceptance.

---

## Feature 3: Analytics & Experimentation Enhancements
- **Goal:** Provide richer insight into engagement funnels and enable controlled experiments on high-impact sections.
- **Approach:** Expand PostHog integration with server-side ingestion, add data layer for standard event payloads, and introduce feature flags via Vercel Edge Config or LaunchDarkly.
- **Scope:** Track scroll completion, gallery interactions, audio playback, contact form conversions, and version these events for analytics consistency.

### Architecture Additions
1. **Analytics Module:** `packages/analytics` with `trackEvent`, `identifyUser`, and `withAnalyticsContext` helpers; all client components import from this module.
2. **Feature Flag Service:** Abstraction (`useFeatureFlag`) reading from Edge Config; optional LaunchDarkly adapter.
3. **Dashboard Seeds:** Templates or scripts to bootstrap PostHog dashboards/insights for the new metrics.

### Testing & Validation
- Unit tests for analytics helpers ensuring schema compliance.  
- Playwright scenario verifying events fire during hero→gallery→contact journey (using PostHog test workspace).  
- Feature-flag toggle tests to ensure fallback UIs render when disabled.

### Open Questions
1. Do we require consent gating or regional compliance (GDPR/CPRA) before enabling advanced tracking?  
2. Should experimentation govern only teaser treatments or extend to navigation/CTA positions?

### Next Steps
1. Confirm analytics governance with stakeholders; document event schema.  
2. Implement foundational helpers and wrap existing interactions.  
3. Pilot a flag-controlled variant (e.g., alternate teaser typography) to validate the pipeline.
---

## Feature 4: Content Scheduling & Release Orchestration
- **Goal:** Give non-technical editors time-based control over hero swaps, teaser drops, and featured playlists without manual deploys.
- **Approach:** Extend CMS schemas with `publishAt` fields, create a scheduling service that evaluates upcoming content, and expose a status dashboard for editors.
- **Scope:** Automate rotations for hero artwork, highlight specific artists on tour, and schedule teaser go-live dates aligned to campaign timelines.

### Architecture Additions
1. **Scheduler Worker:** Edge Function or Supabase cron job polling CMS for pending releases and triggering Vercel revalidation.
2. **Dashboard UI:** Admin-only route in Next.js showing calendar view, conflict detection, and manual override controls.
3. **Notification Hooks:** Slack/email notifications confirming content activation or alerting on conflicts.

### Testing & Validation
- Unit tests for scheduler logic ensuring correct activation windows.  
- Integration test simulating future-dated teaser to verify revalidation + UI swap.  
- Manual QA with editors to confirm dashboard usability.

### Open Questions
1. Should scheduling respect regional time zones or rely on a single canonical timezone?  
2. Do we require approval workflows before scheduled content auto-publishes?

### Next Steps
1. Prototype scheduler MVP using Supabase cron + CMS webhooks.  
2. Design dashboard wireframes for editor feedback.  
3. Align on notification channels and incident escalation path.

---

## Feature 5: Accessibility & QA Automation Suite
- **Goal:** Embed continuous accessibility and motion-safety checks into the delivery pipeline to preserve the inclusive experience defined in the UX spec.
- **Approach:** Combine automated tooling (axe-core, Pa11y CI, Playwright accessibility scans) with scripted reduced-motion validations and GPU load monitoring.
- **Scope:** Cover hero, gallery, audio preview, teaser, and contact flows; surface actionable reports in CI and on staging dashboards.

### Architecture Additions
1. **Test Harness:** `pnpm test:a11y` script invoking Playwright + axe scans with reduced-motion toggle and contrast checks.
2. **Metrics Dashboard:** Hook into Codex CI or GitHub Actions summary to display accessibility regressions and performance budgets.
3. **Telemetry Hooks:** Feed runtime `prefers-reduced-motion` usage and focus-visible metrics into analytics for monitoring.

### Testing & Validation
- Automated nightly run with baseline thresholds; PR checks block on severity violations.  
- Manual verification using VoiceOver/NVDA once per release; capture findings in QA log.  
- GPU profiling snapshots comparing before/after animation changes.

### Open Questions
1. Do we need third-party audits or compliance certification (WCAG AA/AAA) for launches?  
2. Should we store accessibility reports for historical trend analysis?

### Next Steps
1. Draft automation plan with tool selections and CI integration steps.  
2. Implement Playwright + axe prototype on current sections.  
3. Socialize reporting format with QA/PM stakeholders.

---

## Feature 6: Personalized Immersive Experiences
- **Goal:** Use lightweight personalization to tailor content (e.g., featured artist, background audio theme) based on visitor context while respecting privacy.
- **Approach:** Leverage server-side geolocation and referrer cues combined with PostHog cohorts to adjust default scenes; fall back to generic experience when data unavailable.
- **Scope:** Personalize hero CTA copy, prioritize certain artists for regional tours, and adjust teaser messaging for returning visitors.

### Architecture Additions
1. **Context Provider:** Edge middleware deriving location/referrer and passing personalization hints via request headers.
2. **Variant Handling:** Feature flag configuration mapping contexts to content variants pulled from CMS.
3. **Privacy Safeguards:** Consent banner gating personalization when required; data anonymization rules documented.

### Testing & Validation
- Unit tests for context classification to prevent incorrect targeting.  
- Playwright geolocation tests ensuring correct variant selection.  
- Monitoring to compare engagement metrics of personalized vs. default flows.

### Open Questions
1. What privacy/consent constraints apply to personalization across regions?  
2. How do we coordinate creative assets for each variant without overwhelming editors?

### Next Steps
1. Define allowed personalization signals and compliance guidelines.  
2. Implement middleware prototype with two simple variants (e.g., hero CTA).  
3. Review performance impact of variant branching and optimize caching strategy.

---

## Feature 7: Merch Shop Experience
- **Goal:** Launch a seamless merch storefront that fits the cinematic narrative while enabling direct conversions for apparel and collectibles.
- **Approach:** Add an e-commerce flow within the App Router using a headless commerce provider (e.g., Shopify Storefront API or Commerce Layer) and integrate shop modules into existing sections without disrupting performance budgets.
- **Scope:** Introduce merch teaser in the hero or teaser section, full catalog browsing, product detail overlays, cart/checkout integration, and order tracking handoff.

### Architecture Additions
1. **Commerce Provider Integration:** Create `packages/commerce` with SDK wrappers, GraphQL queries/mutations, and Zod validation for product variants/inventory.
2. **UI Components:** New section for featured merch, product cards, modal overlays, and cart drawer using Shadcn primitives themed to match cinematic styling.
3. **Checkout Flow:** Decide between embedded checkout (API-driven) or redirect to hosted checkout depending on provider capabilities and PCI scope.
4. **Storage & Analytics:** Track cart events, product views, and conversions via PostHog; ensure Supabase or provider webhooks capture order confirmations.

### Implementation Considerations
- **Inventory Sync:** Periodic jobs or webhooks to keep product data fresh in ISR caches.
- **Media Handling:** Optimize product imagery via existing media pipeline; consider 3D mockups or video loops for hero merch.
- **Payment Compliance:** Adhere to PCI requirements—lean on provider-hosted checkout if we want to avoid handling card data directly.
- **Localization & Taxes:** Evaluate if multi-currency or tax calculation is needed for target regions; leverage provider services where possible.

### Testing & Validation
- Unit tests for commerce client helpers and cart state management.  
- Integration tests simulating product browsing, add-to-cart, and checkout flows (use provider sandbox).  
- UX validation to ensure merch sections respect `prefers-reduced-motion` and maintain performance budgets.

### Open Questions
1. Which commerce platform aligns with budget, fulfillment, and analytics needs (Shopify, Commerce Layer, Saleor, etc.)?  
2. Do we need limited-release drops with waitlists or countdowns integrated into the teaser system?  
3. How will fulfillment status and order support be communicated back to the site (email only vs. account dashboard)?

### Next Steps
1. Select commerce provider and confirm API access requirements.  
2. Draft detailed flow diagrams covering browsing, cart, checkout, and confirmation states.  
3. Prototype product card + cart drawer UI in Storybook/Figma to validate with stakeholders.  
4. Update analytics plan to include merch funnel metrics (views → cart → checkout).

---
