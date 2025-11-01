# Project Web NMD Product Requirements Document (PRD)

## Goals and Background Context

### Goals
- Deliver a single immersive destination where fans and scouts can experience all 12 artists with cinematic storytelling and synchronized audio/visual cues.
- Increase Spotify follows, newsletter signups, and collaboration inquiries by guiding visitors through a cohesive, emotionally resonant journey.
- Showcase current and upcoming releases (e.g., “Junta”, “Midnight Is Close”) with interactive previews, tracklists, and teasers that build anticipation.
- Establish a maintainable, high-performance foundation (Next.js 16, GSAP, Three.js, Shadcn UI, Tailwind, Vercel) that can expand with future drops.
- Reinforce the collective’s brand identity by merging motion graphics, 3D logo work, and curated references (GTA VI, Travis Scott Utopia, Lando Norris).
- Introduce a merch shopping experience that converts fans directly within the cinematic journey while preserving performance and accessibility standards.

### Background Context
Project Web NMD responds to a fragmented digital presence where social snippets, isolated microsites, and individual portfolios fail to tell the collective’s story cohesively. Fans, collaborators, and industry scouts must stitch together who the 12 artists are and what they sound like, resulting in short sessions, weak brand perception, and missed opportunities. The new experience acts as a “living music video” landing page—opening with a Three.js logo loader, flowing into a GTA VI-inspired hero reveal, and continuing through horizontal artist galleries, music highlights, and teasers for upcoming releases. It must feel like entering a digital music video while still performing smoothly across modern web platforms.

### Research & Market Insights
- **Sources:** Moodboards and creative direction notes from the collective, existing group photo/portrait assets, release collateral for “Junta,” and reference studies of experiential sites (GTA VI, Travis Scott’s Utopia, Lando Norris). Conversations with the 12 artists highlighted the pain of scattered storytelling and inconsistent branding.
- **Competitive Signals:** Contemporary artist collectives increasingly launch immersive drop sites (e.g., OVO, 88rising). None blend cinematic 3D loaders, scroll masking, and synchronized previews the way Project Web NMD intends, providing differentiation through motion craft.
- **User Needs Recap:** Fans want a single immersive entry point with quick access to audio and visuals; industry scouts need professional summaries plus booking/contact flows; both groups cite frustration with hopping between socials.
- **Baseline Metrics (Current State):** No centralized site exists, so Spotify click-throughs, inquiry submissions, and session duration are effectively near-zero/unknown. Success metrics will therefore compare against post-launch baselines captured in analytics.

### Change Log

| Date       | Version | Description                                                 | Author |
|------------|---------|-------------------------------------------------------------|--------|
| 2024-06-03 | v0.1    | Initial PRD draft from project brief                        | John   |
| 2024-06-04 | v0.2    | Added research insights, MVP scope, UX flows, security reqs | John   |

## Requirements

### Functional
1. **FR1:** The experience must open with an SVG logo animation using a stroke reveal effect, which then transitions into the hero scene.
2. **FR2:** On scroll, the hero section must implement a "GTA VI" effect where the hero image zooms out progressively. Simultaneously, the SVG logo, acting as a mask, zooms in from fullscreen to a small, centered position. The logo's outline reveals the hero image behind it as the general background fades to black.
3. **FR3:** The artist showcase must present all 12 members in a horizontal gallery with GSAP parallax, interactive particles, and click/tap-to-expand profiles containing bio, socials, and related projects.
4. **FR4:** The music projects area must feature album/single cards (starting with “Junta”) that display artwork, concept summary, tracklist, Spotify link, and play an authorized 5–10 second preview on hover or tap with mobile fallbacks.
5. **FR5:** The “Midnight’s too close...” teaser section must feature a typographic zoom-out animation. On scroll, the fullscreen text progressively shrinks and fades out. The background will be composed of dynamic, slow-floating particles.
6. **FR6:** The site must provide clear pathways for collaboration/booking inquiries (CTA + form) and store submissions for follow-up.
7. **FR7:** The experience must surface a merch storefront that lets users browse featured products, manage a cart, and complete checkout via an integrated headless commerce provider without leaving the site.

### Non Functional
1. **NFR1:** Maintain Core Web Vitals targets (LCP < 2.5s, CLS < 0.1) on modern desktop and mobile via lazy loading, asset optimization, and reduced-motion fallbacks.
2. **NFR2:** Support the latest two versions of Chromium, Safari, and Firefox with progressive enhancement for older browsers and graceful degradation when motion is disabled.
3. **NFR3:** Respect accessibility best practices: honor `prefers-reduced-motion`, ensure keyboard navigation through galleries, provide descriptive text for imagery, and supply captions or transcripts for audio previews.
4. **NFR4:** Deploy on Vercel with Codex CI/CD, enabling automated previews, production rollouts with rollback, and uptime monitoring.
 5. **NFR5:** Instrument analytics for Spotify clicks, audio preview plays, scroll depth, and inquiry completions while storing events securely and complying with privacy requirements (e.g., GDPR if emails collected).
  6. **NFR6:** Commerce flows must route payments through the chosen headless provider for PCI compliance, maintain Core Web Vitals budgets, and honor regional privacy/consent requirements when tracking merch conversions.

## MVP Scope

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

## User Interface Design Goals

### Overall UX Vision
A cinematic “living music video” journey: full-bleed visuals, synchronized motion/audio cues, and seamless scene transitions that feel like entering the collective’s digital world. Emphasis on drama (3D logo, theatrical lighting) balanced with a clean UI frame so content stays readable during motion-heavy sequences. _(Assumption: Visitors expect a premium, art-film aesthetic; no conflicting brand guidelines provided.)_

### Key Interaction Paradigms
- Scroll-driven storytelling with GSAP timelines, including the GTA VI–style mask reveal and progressive scene changes.
- Horizontal drag/scroll galleries for artist exploration, augmented by subtle particle motion and depth parallax.
- Hover/tap-triggered audio snippets, with tactile feedback (glow, waveforms) signaling playback.
- CTA overlays and micro-transitions that guide users toward Spotify and inquiry actions without breaking immersion. _(Assumption: Touch gestures mimic mouse interactions; confirm if additional inputs like gyroscope are desired.)_

### Core Screens and Views
- Loader + hero reveal (3D logo → portrait with mask animation)
- Artist gallery with profile overlays
- Music projects grid/cards with audio previews and tracklists
- Upcoming release teaser scene (“Midnight Is Close”)
- Contact/inquiry overlay or section for collaboration requests _(Assumption: No dedicated blog/news screen for MVP.)_

### Accessibility: None
Currently assuming standard WCAG-aligned behaviors (reduced motion, keyboard support); confirm if AA compliance is required.

### Branding
- Neon-accented, dark cinematic palette inspired by GTA VI, Travis Scott Utopia, and Lando Norris references.
- Modern bold sans-serif type and motion graphics that echo music video titles.
- Use official group logo (SVG + 3D) plus existing portraits and album art as hero assets. _(Assumption: No formal brand book yet; palette/type finalized once design direction is set.)_

### Target Device and Platforms: Web Responsive
Responsive experience that scales from large-screen hero scenes to mobile vertical scrolling, with shorter motion timelines on smaller devices.

### Primary User Flows & Edge Cases
1. **Cinematic Entry Flow:** Visitor lands on loader → hero mask reveal → navigation markers guide to artists or music sections; fallback path shows simplified fade when reduced-motion is enabled.
2. **Artist Deep Dive Flow:** From hero CTA or nav marker → horizontal gallery scroll/drag → select artist card → overlay with bio/socials/projects → optional outbound links (new tab). Edge cases: failed portrait load triggers placeholder state; overlay always provides close/back controls.
3. **Music Sampling Flow:** Scroll into music grid → expand album card → preview tracks via hover/tap → follow Spotify CTA. Edge cases: audio permission denied or snippet unavailable surfaces tooltip + disabled preview.
4. **Collaboration/Inquiry Flow:** CTA buttons (hero, overlays, teaser) → contact modal/section → submit form → success confirmation or inline validation errors. Error handling includes retry guidance and email fallback link.
5. **Release Teaser Flow:** Continue scroll → “Midnight Is Close” teaser with animated typography/distortion → optional countdown or “notify me” CTA → analytics log attention even if CTA untouched. Reduced-motion path swaps to subtle fades while preserving instructions.

Entry points include direct hero anchors or deep links from marketing campaigns; exit points include Spotify, social links, or the contact success state. Each flow logs analytics events to support KPI tracking.

## Technical Assumptions

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

## Security & Compliance Requirements
- Enforce HTTPS everywhere (Vercel provides TLS) and ensure all external embeds (Spotify, audio CDN) load over secure origins.
- Contact form collects minimal PII (name, email, organization); data stored in Supabase/secure storage with encryption at rest and auto-deletion after 12 months unless ongoing collaboration is in progress.
- Provide a concise privacy notice near the form describing data usage, retention, and contact for deletion requests; require explicit consent before subscribing users to newsletters.
- Limit analytics payloads to non-PII engagement data; anonymize IPs where possible and honor “Do Not Track”/consent banners for EU traffic.
- Log access to inquiry submissions for auditability; restrict dashboard access to authorized project leads using workspace SSO.

## Epic List

1. **Epic 1 � Immersive Foundation & Loader Experience:** Stand up the Next.js/Shadcn stack, codify design tokens, and deliver the cinematic entry (Three.js logo loader into GTA VI�style hero) with baseline analytics and performance guardrails.
2. **Epic 2 � Artist & Music Storytelling Canvas:** Implement the horizontal artist gallery with profile overlays plus the music projects grid/cards (audio previews, tracklists, Spotify links) so visitors can explore the collective�s work end-to-end.
3. **Epic 3 � Release Anticipation & Engagement Layer:** Ship the �Midnight Is Close� teaser scene, collaboration/contact pathways, and deeper analytics instrumentation to capture hype and conversion signals for upcoming drops.
4. **Epic 4 - Merch Commerce Experience:** Introduce an integrated storefront that surfaces merch within the cinematic flow, maintains cart state, and hands off to a PCI-compliant checkout while tracking conversions.

## Epic 1 Immersive Foundation & Loader Experience

Goal: Establish the production-ready Next.js/Shadcn monorepo, CI/CD, and analytics baseline, then deliver the marquee cinematic entry sequence—Three.js logo loader flowing into the GTA VI–style hero mask reveal—so every subsequent epic builds on a performant, branded foundation.

### Story 1.1 Project Foundation & Delivery Pipeline
As a development lead,
I want a configured Next.js 16 monorepo with Shadcn UI, Tailwind, linting/testing, and Vercel deployment,
so that we can ship reliable builds and enforce quality gates from day one.
#### Acceptance Criteria
1: Repo includes `apps/web`, shared packages, TS/ESLint/Prettier, Vitest/Jest, and commit hooks enforcing formatting/tests.
2: Shadcn UI + Tailwind are configured with initial tokens matching the cinematic palette.
3: Vercel + Codex CI/CD pipeline deploys to preview/production with automated checks.
4: Observability baseline (Vercel Analytics + logging) captures deployments and initial load metrics.

### Story 1.2 SVG Logo & Animation Setup
As a motion developer,
I want an optimized SVG of the logo and the GSAP library integrated into the project,
so that I can create a stroke reveal animation for the loader.
#### Acceptance Criteria
1: Three.js scene renders the provided 3D logo with lighting/materials and ≥45fps on target devices.
2: Assets are compressed/preloaded (GLB/DRACO) with fallback SVG animation if WebGL fails.
3: Reduced-motion setting swaps to a simplified fade animation verified via `prefers-reduced-motion`.
4: Performance profiling shows loader adds <300ms to initial paint on modern hardware.

### Story 1.3 SVG Stroke Reveal Loader
As a visitor,
I want to see a minimalist and professional logo animation when the site loads,
so that the experience feels polished from the very first moment.
#### Acceptance Criteria
1: Loader timeline includes easing, subtle camera drift, and progress indicator tied to real asset readiness.
2: GSAP (or equivalent) orchestrates the fade/blur transition from loader to hero with CLS < 0.05.
3: Loader includes audio toggle or ambient cue per design direction, defaulting to muted until user interacts.
4: QA checklist verifies loader responsiveness on desktop/tablet/mobile, including reduced-motion and low-bandwidth modes.

### Story 1.4 Hero Layout & Scroll-Mask Reveal
As a storytelling designer,
I want the hero scene to feature a synchronized zoom and mask animation on scroll,
so that the entrance feels cinematic and guides the user's focus. The main portrait will zoom out while the SVG logo mask simultaneously zooms in, revealing the image through its contour before settling into place.
#### Acceptance Criteria
1: Hero renders the group image full-bleed with responsive cropping, overlay copy, and nav markers pointing to downstream sections.
2: GSAP scroll trigger animates the SVG logo mask smoothly as users reach the defined threshold, maintaining ~60fps on modern devices.
3: Reduced-motion/unsupported browsers swap the mask effect for a fade-in while copy/CTA remain legible.
4: Analytics events capture hero scroll completion and CTA interactions per instrumentation requirements.

## Epic 2 Artist & Music Storytelling Canvas

Goal: Build the horizontal artist gallery and music project showcases so visitors can explore all 12 members, read profiles, and interact with albums/singles inside the cinematic narrative.

### Story 2.1 Artist Gallery Structure & Data Layer
As a frontend engineer,
I want a responsive horizontal gallery layout with mapped artist metadata,
so that all 12 members display consistently across desktop and mobile.
#### Acceptance Criteria
1: Gallery renders 12 artist cards with supplied portrait, name, role, and short teaser copy pulled from a structured data source (JSON/MDX).
2: Layout supports horizontal scroll/drag on desktop and swipe on touch, including inertia/scroll snapping for smooth navigation.
3: Reduced-motion mode disables parallax/particles while keeping navigation usable.
4: Accessibility checks confirm keyboard navigation across cards and screen-reader friendly labels.

### Story 2.2 Parallax & Particle Motion Enhancements
As a motion designer,
I want depth parallax and particle layers applied to the gallery,
so that the section feels dynamic without overwhelming performance budgets.
#### Acceptance Criteria
1: GSAP (or equivalent) powers parallax offsets tied to scroll position with configurable intensity for desktop vs mobile.
2: Particle/ambient effects render behind cards with capped draw calls to maintain ≥50fps on target devices.
3: Motion disables automatically for reduced-motion preference or low-power mode.
4: Performance profiling documents CPU/GPU impact and confirms no regressions to FR/NFR thresholds.

### Story 2.3 Artist Profile Overlays & CTAs
As a fan,
I want to tap an artist to reveal details (bio, socials, related projects) and contact paths,
so that I can understand each member and engage further.
#### Acceptance Criteria
1: Selecting a card opens an overlay or expanded panel showing bio paragraph, social links, highlight projects, and CTA(s).
2: Overlays include close/back controls, trap focus for accessibility, and load within 200ms of interaction.
3: Links open in new tabs with tracking events for outbound clicks (socials, project links).
4: Content is editable via data layer (no hardcoded strings) and supports at least two future fields (e.g., roles, tags).

### Story 2.4 Music Projects Grid & Tracklists
As a music curator,
I want album/single cards that highlight artwork, concept summary, and tracklists,
so that visitors quickly grasp each release before jumping to Spotify.
#### Acceptance Criteria
1: Grid displays at least the “Junta” album plus placeholder cards for upcoming releases, each with artwork, summary, and metadata.
2: Tracklists expand/collapse per card, showing track names and durations.
3: CTA buttons deep-link to Spotify with analytics events for clickthrough.
4: Layout remains responsive, stacking vertically on mobile while preserving hierarchy/order.

### Story 2.5 Audio Preview Playback & Telemetry
As an audiophile visitor,
I want to hear short previews on hover/tap with clear controls,
so that I can sample music without leaving the site.
#### Acceptance Criteria
1: Hover (desktop) or tap (mobile) plays a 5–10 second authorized snippet with visual feedback (waveform glow or progress ring).
2: Audio system handles one preview at a time, auto-stopping others and providing a mute toggle.
3: Reduced-motion or silent-mode users see an alternate prompt to enable audio.
4: Analytics capture preview starts/completions and errors, sending events to the instrumentation defined in NFR5.

## Epic 3 Release Anticipation & Engagement Layer

Goal: Deliver the “Midnight Is Close” teaser scene, collaboration/contact flows, and analytics enhancements so the site drives future-release hype and actionable conversions.

### Story 3.1 Teaser Scene with Typographic Zoom
As a motion art director,
I want the “Midnight’s too close...” section to feature a typographic zoom-out effect on scroll with a dynamic particle background,
so that the teaser feels immersive and builds anticipation.
#### Acceptance Criteria
1: Section includes responsive headline typography, supporting copy, and background effects (noise/distortion) aligned to creative references.
2: Layout supports future teaser variants (multiple releases) via data/config.
3: Reduced-motion mode swaps intense animations for subtle fades while retaining visual hierarchy.
4: Accessibility checks ensure text contrast meets AA and screen readers announce teaser context.

### Story 3.2 Distortion & Parallax Animation System
As an interaction engineer,
I want reusable GSAP/Three.js hooks for teaser distortions and parallax,
so that we can choreograph motion without duplicating code.
#### Acceptance Criteria
1: Animation system exposes configurable parameters (intensity, frequency, trigger thresholds) for designers to tweak.
2: Parallax responds to mouse/touch movement while remaining performant (>50fps) across target devices.
3: System auto-disables for reduced-motion or low-power mode, logging state for analytics.
4: Regression tests verify animations don’t conflict with previous sections (hero, gallery) when chained together.

### Story 3.3 Collaboration & Booking Pathways
As an industry scout,
I want a clear contact form or CTA sequence to request collaborations or bookings,
so that I can engage the collective without hunting through socials.
#### Acceptance Criteria
1: CTA buttons surface in hero, artist overlays, and teaser sections, all routing to a dedicated contact modal/section.
2: Form collects name, organization, contact info, inquiry type, and message; validations and success/failure states provided.
3: Submissions post to Vercel Function (or Supabase) with email notification to the collective; errors are logged and surfaced to the user gracefully.
4: Analytics track form opens, submissions, and drop-offs to measure conversion health.

### Story 3.4 Analytics & KPI Instrumentation Enhancements
As a product analyst,
I want enriched telemetry for the new interactions,
so that KPIs (Spotify clicks, previews, inquiries, teaser scroll depth) can be monitored in dashboards.
#### Acceptance Criteria
1: Events fire for teaser engagement (scroll completion, CTA clicks), audio preview interactions, and contact submissions with relevant metadata.
2: Events flow into Vercel Analytics plus the chosen product analytics tool (e.g., PostHog) with schema documented.
3: Privacy compliance review ensures opt-in requirements or notices are in place if capturing personal data.
4: Dashboard or report outline specifies how metrics map to the goals defined in the PRD (session length, conversions).

### Story 3.5 QA & Performance Hardening
As a release manager,
I want regression tests and monitoring for the new sections,
so that cinematic effects never compromise reliability.
#### Acceptance Criteria
1: Automated tests cover contact form happy/edge cases, teaser visibility, and audio preview guardrails.
2: Visual regression snapshots (Percy, Chromatic, or Playwright) capture loader, hero, gallery, music, and teaser scenes after animations settle.
3: Performance budgets for CPU/GPU/memory are defined and monitored via Lighthouse CI or WebPageTest; alerts trigger when thresholds exceed.
4: Launch checklist verifies reduced-motion, accessibility, and telemetry behavior post-deploy.
## Epic 4 Merch Commerce Experience

Goal: Integrate a headless commerce flow so merch can be featured, browsed, and purchased without breaking the cinematic narrative or performance budgets.

### Story 4.1 Merch Showcase & Catalog Integration
As a merch lead,
I want a storefront section that highlights featured drops within the cinematic flow and lists the full catalog,
so that fans can browse and add products to their cart without leaving the experience.
#### Acceptance Criteria
1: Commerce or CMS backend exposes product data (name, price, variants, media) and hydrates Next.js RSCs with ISR caching.
2: Featured merch tiles can be embedded in hero/teaser scenes while the full catalog lives in a dedicated section or modal.
3: Product detail overlays display sizing guides, availability, and related items with motion that respects accessibility.
4: Analytics events capture product views and add-to-cart actions with SKU metadata.

### Story 4.2 Cart State & Checkout Handoff
As a shopper,
I want to manage my cart and complete checkout confidently,
so that I can purchase merch through the headless provider using familiar payment methods.
#### Acceptance Criteria
1: Client-side cart store supports add/remove/update quantity with persistence across navigation.
2: Checkout button triggers provider-hosted checkout or secure API flow that meets PCI requirements.
3: Error states (inventory mismatch, payment failure) surface clear feedback and recovery actions.
4: Post-checkout confirmation routes users back with order summary and tracking guidance.

### Story 4.3 Merch Operations & Telemetry
As an operations analyst,
I want inventory sync, order webhooks, and conversion dashboards,
so that the collective can understand demand and support customers.
#### Acceptance Criteria
1: Webhooks or scheduled jobs refresh inventory/pricing in cache without full redeploys.
2: Product analytics records cart -> checkout -> purchase funnel with revenue metrics in PostHog (or equivalent).
3: Admin alerts notify the team when inventory is low or webhook processing fails.
4: Documentation outlines support process for refunds/exchanges and links to commerce admin tooling.

## Checklist Results Report
- **Execution:** Comprehensive PM checklist review completed 2024-06-03.
- **Section 1 – Problem Definition & Context:** Goals, problem framing, and KPIs are well documented (`docs/prd.md:5-37`), but there is no explicit summary of user research, competitive insights, or baseline metrics for Spotify/inquiry targets; add a short subsection capturing these sources/data points.
- **Section 2 – MVP Scope:** Functional scope is clear via FRs and epic descriptions, yet an explicit “Out of Scope / Future Enhancements” list and MVP test/learning plan are missing in this PRD draft (previously only in the brief). Recommend porting those details in so scope boundaries and validation approach are visible here.
- **Section 3 – User Experience Requirements:** UX vision and interaction paradigms are strong (`docs/prd.md:38-78`), but primary flows, entry/exit points, and error states are only implied—consider adding a brief flow diagram or narrative plus reduced-motion/accessibility notes for each major section.
- **Section 4 – Functional Requirements:** FRs and epic stories are testable and sequential (`docs/prd.md:23-240`). No blocking issues.
- **Section 5 – Non-Functional Requirements:** Performance/accessibility/analytics constraints are solid (`docs/prd.md:31-37`), but security/compliance specifics (data retention for contact form, authentication needs, privacy notice placement) are referenced only briefly; expand with explicit requirements in a Security subsection.

## Next Steps

### UX Expert Prompt

### Architect Prompt




