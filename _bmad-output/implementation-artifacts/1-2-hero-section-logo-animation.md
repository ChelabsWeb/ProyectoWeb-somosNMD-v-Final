# Story 1.2: Hero Section & Logo Animation

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Site Visitor,
I want to see a striking Hero section with a GSAP-powered logo animation upon first load,
so that I am immediately immersed in the premium, underground aesthetic of the brand.

## Acceptance Criteria

1. **Given** I navigate to the landing page
   **When** the page loads
   **Then** I see the cinematic loader which transitions into the Hero section via a massive logo mask expanding into view.
2. **And** the Hero features massive, condensed typography that animates into view.
3. **And** the layout is fully responsive across mobile, tablet, and desktop.

## Tasks / Subtasks

- [x] Task 1: Create the basic responsive Hero Section structure (AC: 1, 3)
  - [x] Implement `HeroSection.tsx`.
  - [x] Use massive, condensed typography for the main headline.
  - [x] Apply semantic HTML and Tailwind CSS utilities for mobile-first responsiveness, adapting up to desktop.
- [x] Task 2: Implement Loader to Hero Intro Transition (AC: 1, 2)
  - [x] Refactor `LoaderSection.tsx` to handle shorter autoAlpha fadeouts.
  - [x] Implement an intro group nested `<g>` in the Hero SVG mask.
  - [x] Ensure `HeroSection.tsx` listens for the `app:loader-hidden` event to trigger the GSAP mask expansion.
- [x] Task 3: Integration and Polish (AC: 1, 2, 3)
  - [x] Orchestrate text stagger animations in `HeroSection.tsx`.
  - [x] Ensure 60fps performance without jankiness.
  - [x] Verify accessibility compliance ( proper heading hierarchy, ARIA labels for animated elements if needed).

## Dev Notes

- **Architecture:** 
  - Strict purely functional components with React 19 / Next 16 App Router.
  - The Hero section should be an immersive experience conforming to the "Brutalista Elegante" aesthetic.
  - Use Tailwind CSS with custom variables like `bg-nmd-midnight` and `text-nmd-orange` if applicable.
- **Animation constraints:** 
  - GSAP (`gsap` component) is already installed (`^3.13.0`). **IMPORTANT**: Since React 19 is used, you must properly manage GSAP context to avoid strict-mode double-firing. Highly recommended to use `@gsap/react` package `useGSAP` hook or ensure `gsap.context()` is used correctly for cleanup within standard `useEffect` / `useLayoutEffect`.
  - Frame rate target: 60fps consistently, particularly on mobile devices.
- **Source tree components to touch:**
  - `apps/web/src/app/page.tsx`
  - `apps/web/src/components/sections/HeroSection.tsx`
  - `apps/web/src/components/sections/LogoSequence.tsx`
  - `apps/web/src/hooks/use-gsap-sequence.ts`

### Project Structure Notes

- **Alignment:** 
  - The project is configured as a monorepo with `apps/web`.
  - Placed features in `apps/web/src/components/sections/` in line with the established architecture. 
  - Component files use PascalCase (e.g. `HeroSection.tsx`), hooks use kebab-case (`use-gsap-sequence.ts`).

### References

- UX Inspiration: Niki Sadeki (audacity in typography, minimalist). [Source: _bmad-output/planning-artifacts/ux-design-specification.md]
- Architecture Rules: [Source: _bmad-output/planning-artifacts/architecture.md]
- Tech Stack: React 19, Next 16, GSAP 3.13, Tailwind CSS.

## Dev Agent Record

### Agent Model Used

antigravity

### Debug Log References

- Refactored `LoaderSection.tsx` to handle shorter autoAlpha fadeouts upon load completion.
- Implemented nested intro mask logic in `HeroSection.tsx` (`hero-mask-intro`).
- Cleaned up GSAP event listeners for strict mode.

### Completion Notes List

- ✅ Developed responsive `HeroSection.tsx` with massive responsive typography.
- ✅ Integrated GSAP Loader-to-Hero expanding logo mask transition.
- ✅ Ensured `HeroSection.tsx` mounts smoothly post-loader.

### File List

- `apps/web/src/components/sections/HeroSection.tsx` (modified)
- `apps/web/src/components/sections/LoaderSection.tsx` (modified)
