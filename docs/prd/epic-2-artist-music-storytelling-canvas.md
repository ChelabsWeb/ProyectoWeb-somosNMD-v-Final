# Epic 2 Artist & Music Storytelling Canvas

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
