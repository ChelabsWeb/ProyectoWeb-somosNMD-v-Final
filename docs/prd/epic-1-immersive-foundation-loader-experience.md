# Epic 1 Immersive Foundation & Loader Experience

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
