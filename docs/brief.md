# Project Brief: Project Web NMD

## Executive Summary
Project Web NMD is an immersive Next.js 16 landing experience for a 12-member artist collective, blending cinematic visuals, interactive scroll-triggered storytelling, and 3D/GSAP animation to showcase their identity, projects, and sonic universe. Today the collective’s presence is fragmented across social snippets, ad-hoc microsites, and portfolio links, making it hard for fans, collaborators, and industry scouts to grasp the full story in one place. The new site becomes a “living music video” hub where visitors explore members, hear active releases, and experience future teasers such as “Midnight Is Close” in a single continuous narrative that keeps them engaged for minutes instead of seconds while nudging deeper actions like Spotify follows and collaboration inquiries.

## Problem Statement
- **Current State & Pain**: The collective’s online presence lives across scattered Instagram reels, individual portfolio pages, and occasional microsites, which forces fans and scouts to piece together who the 12 artists are, what they sound like, and why they matter. There’s no single destination that captures the collective’s motion-driven aesthetic or their cross-media collaborations.
- **Impact**: Fragmentation dilutes brand perception, shortens session times, and makes it hard to drive actions like Spotify follows or booking inquiries. Potential partners see a disjointed identity instead of a cohesive creative force, limiting opportunities.
- **Existing Solutions Fall Short**: Standard artist portfolio templates and streaming profile pages are static, lack cinematic motion, and can’t highlight multiple members, 3D interactions, or synchronized audio/visual storytelling. DIY landing pages built on basic builders cannot handle Three.js, GSAP, or custom scroll-masking effects without major compromises.
- **Urgency**: The group is gearing up for upcoming releases (e.g., “Midnight Is Close”) and needs a unified experience before March 2026 to maximize momentum around new drops, convert casual browsers into engaged fans, and position themselves competitively against artists whose sites already blend immersive visuals with music discovery.

## Proposed Solution
Project Web NMD delivers a cinematic, scroll-driven landing page built on Next.js 16 with GSAP timelines and Three.js accents to merge art, music, and tech into one cohesive narrative. The experience opens with a Three.js-rendered 3D logo loader that seamlessly fades into a hero scene featuring the group portrait and a GTA VI–style scroll-mask reveal of the SVG logo. Horizontal scrolling galleries spotlight each of the 12 artists with GSAP-powered parallax, interactive particles, and quick profile reveals (bio, socials, related projects). Music sections elevate the debut album “Junta” and subsequent releases via animated cards that preview audio snippets, show tracklists, and deep-link to Spotify, while the “Midnight Is Close” teaser uses large animated typography and motion distortion to build hype for upcoming drops. Shadcn UI and Tailwind provide consistent, modern UI primitives, and Vercel handles deployment with Codex CI/CD so releases stay fast and reliable.

## Target Users
### Primary User Segment: Fans & Culture Enthusiasts
- Music lovers (18-34) who follow digital-first collectives, enjoy cinematic experiences, and actively discover new artists across streaming platforms.
- Already interact with the group on social media or via shared playlists but lack a single destination to explore the collective fully.
- Seek immersive storytelling, quick access to music, and insight into each artist’s personality and upcoming work.

### Secondary User Segment: Collaborators & Industry Scouts
- Creative directors, booking agents, brand partners, and label reps looking for multi-disciplinary talent for shows, campaigns, or cross-media projects.
- Need a polished hub that conveys professionalism (motion quality, site performance) and provides quick briefs, social proof, and contact pathways.
- Value the ability to preview work (audio/visual) rapidly and understand each artist’s unique contribution.

## Goals & Success Metrics
### Business Objectives
- **Increase conversions to Spotify follows and newsletter signups by 40% within 6 months of launch.**
- **Secure at least 5 collaboration or booking inquiries per quarter via the site.**
- **Extend average session duration to 3+ minutes, demonstrating deep engagement with the cinematic experience.**

### User Success Metrics
- % of visitors who interact with artist galleries or listen to audio previews.
- Completion rate of the scroll-driven journey (from hero through upcoming release teaser).
- Net Promoter Score (or qualitative feedback) on the immersive feel and clarity of the collective’s story.

### Key Performance Indicators (KPIs)
- **Spotify Click-through Rate:** % of users clicking through to album/single links.
- **Audio Preview Engagement:** Number of hover/click interactions on track previews.
- **Inquiry Conversion Rate:** Ratio of contact form submissions tied to collaboration/booking intent.
- **Page Performance:** Core Web Vitals (Largest Contentful Paint < 2.5s even with animations).

## MVP Scope
### Core Features (Must Have)
- **3D Logo Loader:** Three.js-rendered spinning logo that transitions into the hero scene, establishing the cinematic tone.
- **Hero Scroll Reveal:** Full-width group portrait with GTA VI–style SVG mask reveal that introduces the collective identity and navigation markers.
- **Artist Gallery:** Horizontally scrolling showcase of 12 members with GSAP parallax, particles, and profile overlays (bio, socials, related projects).
- **Music Projects Section:** Album/single cards starting with “Junta,” featuring artwork, concept summary, tracklist, Spotify link, and audio snippet preview.
- **Upcoming Release Teaser:** “Midnight Is Close” typography scene with subtle distortion/parallax to build anticipation.
- **Responsive Layout & Performance Guardrails:** Tailwind + Shadcn components with smooth GSAP timelines optimized for desktop and mobile.

### Out of Scope for MVP
- Full CMS integration or self-service content editing by non-technical users.
- Deep e-commerce/merch store functionality.
- Multi-language localization.
- Long-form video livestreams or interactive concert rooms.

### MVP Success Criteria
The MVP is a success if visitors can experience the cinematic journey end-to-end on mobile and desktop, interact with artist profiles, preview at least one track, and click through to Spotify without performance issues or animation glitches, resulting in measurable upticks in session duration and music engagement.

## Post-MVP Vision
### Phase 2 Features
- Expand artist profiles with behind-the-scenes footage, real-time tour dates, and collaborative project showcases.
- Introduce guided micro-experiences (e.g., “choose your mood” journeys) that re-sequence sections dynamically.
- Add a lightweight CMS or MDX pipeline to enable faster content updates by the collective’s team.

### Long-term Vision
In 1-2 years, Project Web NMD evolves into a modular digital showcase where new releases, AR-ready experiences, and community-driven events plug into the same cinematic spine. The platform becomes the primary digital venue for premieres, live listening sessions, and collaborations across music, fashion, and visual art.

### Expansion Opportunities
- Capsule merch drops synchronized with releases, using the same animation system for dramatic unveilings.
- Partnerships with immersive festivals, creative agencies, or VR platforms to embed interactive teasers elsewhere.
- Data-informed fan experiences (e.g., personalized playlists or Easter eggs unlocked by interaction patterns).

## Technical Considerations
### Platform Requirements
- **Target Platforms:** Desktop and mobile web with high emphasis on modern browsers (Chromium, Safari, Firefox).
- **Browser/OS Support:** Latest two versions of major browsers; progressive fallback for reduced-motion settings.
- **Performance Requirements:** Maintain Core Web Vitals targets despite heavy animation; leverage Next.js streaming and image optimization.

### Technology Preferences
- **Frontend:** Next.js 16 with App Router, React Server Components, Shadcn UI, Tailwind CSS.
- **Backend:** Minimal server-side logic (Vercel Functions) for contact forms and analytics events.
- **Database:** Lightweight storage (Supabase or Vercel KV) if needed for inquiries/logging; otherwise rely on third-party forms.
- **Hosting/Infrastructure:** Vercel with Codex CI/CD pipelines.

### Architecture Considerations
- **Repository Structure:** Mono repo with `apps/web` for the landing experience, `packages/ui` for shared Shadcn components, and clear separation of animation utilities.
- **Service Architecture:** Primarily frontend-driven with optional serverless functions for submissions or dynamic data.
- **Integration Requirements:** Spotify deep links, potential SoundCloud embed fallback, analytics instrumentation for interactions.
- **Security/Compliance:** Ensure HTTPS, sanitize contact forms, consider GDPR if collecting fan emails.

## Constraints & Assumptions
### Constraints
- **Budget:** Small/independent production; prioritize reuse of existing assets and open-source tooling.
- **Timeline:** Completion target March 2026, allowing paced iteration but requiring steady progress.
- **Resources:** Core team includes designers, motion specialists, and devs familiar with GSAP/Three.js; limited bandwidth for custom backend.
- **Technical:** Heavy animation must respect performance budgets; accessibility and reduced-motion fallbacks are mandatory.

### Key Assumptions
- The collective can provide high-quality media assets (photos, 3D logo, audio stems) on schedule.
- Fans and industry visitors will engage with audio previews and cinematic scroll journeys if performance is smooth.
- Spotify click-through and collaboration inquiries are the primary measurable conversions for v1.
- Codex CI/CD workflows are acceptable for the team’s deployment process.

## Risks & Open Questions
### Key Risks
- **Animation Performance Risk:** Rich GSAP/Three.js effects could harm load times or motion smoothness on lower-end devices.
- **Content Freshness Risk:** Without a CMS, updates rely on the dev team, which could bottleneck new release announcements.
- **Audio Licensing/Preview Risk:** Snippet playback must respect licensing/streaming rules; misuse could trigger takedowns.
- **Scope Creep Risk:** Adding too many auxiliary experiences (e.g., live rooms, merch) could derail the MVP timeline.

### Open Questions
- How frequently will new music or artist updates need to be published post-launch?
- Does the collective need forms for booking/collaboration, and what information should they capture?
- Are there accessibility requirements beyond reduced motion (e.g., captions, screen-reader narratives)?
- Should the site support dark/light mode toggles or stay fixed to the cinematic palette?

### Areas Needing Further Research
- Best practices for combining GSAP + Three.js without sacrificing performance.
- Audio preview implementation that balances licensing compliance with UX (Web Audio API vs. hosted snippets).
- Competitive benchmarks from sites like GTA VI, Travis Scott’s Utopia, and Lando Norris for motion pacing and load times.

## Appendices
### C. References
- GTA VI website (scroll-triggered logo reveal inspiration)
- Travis Scott “Utopia” site
- Lando Norris official page
- Project Web NMD moodboards, group photo assets, and album art (internal library)

## Next Steps
### Immediate Actions
1. Validate this brief with the collective and creative directors; capture any missing narrative beats.
2. Greenlight interactive prototypes for the loader, hero reveal, and horizontal gallery to de-risk animation performance.
3. Align on analytics instrumentation (Spotify clicks, audio preview interactions, scroll depth) before development sprints.
4. Prepare content pipeline: finalize bios, track metadata, and teaser copy for “Midnight Is Close.”

### PM Handoff
This Project Brief provides the full context for Project Web NMD. Please start in 'PRD Generation Mode', review the brief thoroughly to work with the user to create the PRD section by section as the template indicates, asking for any necessary clarification or suggesting improvements.
