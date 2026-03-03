# Story 1.4: artist-profile-cards-lazy-loading

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Site Visitor,
I want to see high-quality images and basic information for each artist within the grid,
So that I can learn about them without the page loading slowly.

## Acceptance Criteria

1. **Given** the artists grid is rendered
   **When** I scroll to view the artists
   **Then** each artist's Bento card displays their image, name, and role
2. **Given** the images are rendering
   **Then** images are lazy-loaded using Next.js `<Image>` component for optimal performance
3. **Given** the artist cards are loaded
   **When** I hover over them or interact with them
   **Then** the cards have a subtle hover/active state using Framer Motion (spring physics).

## Tasks / Subtasks

- [x] Task 1: Update `ArtistCard` to Support Lazy Loaded Images (AC: 1, 2)
  - [x] Use `next/image`'s `<Image>` tag (lazy loading is default in Next.js 15).
  - [x] Ensure valid `width` and `height` properties are provided or `fill`, along with appropriate `sizes` prop to prevent Cumulative Layout Shift (CLS).
  - [x] Integrate the artist's name and role visibly in the Bento card following the "Brutalista Elegante" style.
- [x] Task 2: Implement Framer Motion Hover States on `ArtistCard` (AC: 3)
  - [x] Convert the `ArtistCard` or inner `BentoCard` wrapper to a `<motion.div>` or `<motion.button>`.
  - [x] Apply `whileHover` spring physics (e.g., `scale: 1.02` or subtle Y translation).
  - [x] Configure `transition={{ type: "spring", stiffness: 200, damping: 20 }}` for a "bouncy" premium tactile feel.

### Review Follow-ups (AI)
- [x] [AI-Review][HIGH] Write Unit Tests for ArtistCard [ArtistCard.test.tsx]
- [x] [AI-Review][MEDIUM] Document unlisted files in story log [package.json, pnpm-lock.yaml]

## Dev Notes

- **Technical Context**: This builds on Epic 1 Story 3 (`1.3-artists-asymmetric-grid-structure.md`), which created the CSS Grid and Bento Card layout.
- **Components to Touch**: Modifying `src/components/sections/ArtistCard.tsx`, which relies on `src/components/blocks/bento-card.tsx`.
- **Aesthetic**: Re-enforce "Sileo" dark mode aesthetics (glassmorphic hover effects, card root background, `rounded-3xl`). "Brutalista Elegante" guidelines apply: Use `Midnight Blue` background colors and `Tron Orange` accents. 
- **Next.js 15 Note**: Under Next.js 15, `next/image` is highly optimized via `Sharp` by default and laziloads inherently. It's strictly required to define dimensions (`width`/`height`) or use `fill` paired with CSS `relative`/`absolute` to prevent CLS.
- **Framer Motion Note**: Utilize `transition: { type: "spring", stiffness: 200, damping: 20 }` alongside `whileHover` and potentially `whileTap` for micro-interactions on the cards.
- **Performance**: Strict avoidance of jankiness; target 60fps running smoothly on mobile. 
- **Assets**: Find photos inside `public/images/artists/`.

### Project Structure Notes

- Alignment with unified project structure: `src/components/sections/ArtistCard.tsx` is the primary target component to update.

### References

- UX Specs: "Brutalismo Elegante" hover interactions - [Source: _bmad-output/planning-artifacts/ux-design-specification.md]
- Architecture: CSS / Framer rules - [Source: _bmad-output/planning-artifacts/architecture.md]
- Previous Story: Asymmetric Grid / Bento Cards - [Source: _bmad-output/implementation-artifacts/1-3-artists-asymmetric-grid-structure.md]

## Dev Agent Record

### Agent Model Used

Antigravity / o3a

### Debug Log References

### Completion Notes List

- Implemented `framer-motion` for bouncy physics on hover (`whileHover={{ y: -5, scale: 1.02 }}`) and tap (`whileTap={{ scale: 0.98 }}`).
- Removed eager `priority` loading from the `<Image>` component to leverage Next.js native lazy loading out-of-the-box.
- Integrated sizes correctly to prevent CLS.
- TypeScript validation (noEmit) and Linting pass successfully.
- ✅ Resolved code review finding [HIGH]: Missing Automated Tests
- ✅ Resolved code review finding [MEDIUM]: Undocumented File Changes

### File List

- `apps/web/src/components/sections/ArtistCard.tsx` [MODIFIED]
- `apps/web/src/components/sections/ArtistCard.test.tsx` [NEW]
- `package.json` [MODIFIED]
- `pnpm-lock.yaml` [MODIFIED]
