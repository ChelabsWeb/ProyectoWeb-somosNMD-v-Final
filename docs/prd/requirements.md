# Requirements

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
