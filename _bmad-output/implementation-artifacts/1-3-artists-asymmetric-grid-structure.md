# Story 1.3: Artists Asymmetric Grid Structure

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Site Visitor,
I want to view the 12 artist profiles organized in an asymmetric "Bento-box" grid,
So that I can easily browse the group members without visual fatigue.

## Acceptance Criteria

1. **Given** I scroll past the Hero section
   **When** the artist section becomes visible
   **Then** I see an asymmetric CSS grid layout containing 12 placeholders/cards
2. **Given** the grid is rendered
   **When** viewing on different screen sizes
   **Then** the grid changes from 1 column (mobile) to 3 columns (desktop) seamlessly.

## Tasks / Subtasks

- [x] Task 1: Create `BentoCard` Component (AC: 1, 2)
  - [x] Implement base HTML structure for the Bento Box container
  - [x] Apply "Brutalista Elegante" styling (`rounded-xl` to `rounded-[2rem]`, Midnight Blue background, Tron Orange accents, subtle borders/shadows)
  - [x] Add basic accessibility (ARIA roles, `focus-visible` styling)
- [x] Task 2: Create `ArtistsGrid` Section Component (AC: 1, 2)
  - [x] Implement foundational CSS Grid container layout
  - [x] Define responsive columns: 1 column (`flex-col` or `grid-cols-1`) on Mobile, 2 on Tablet, 3 on Desktop
  - [x] Implement asymmetric layout logic (e.g., varying row spans or col spans for specific child cards to create the bento effect)
  - [x] Apply generous spacing (`gap-6` or `gap-8`)
- [x] Task 3: Integrate `ArtistsGrid` into Landing Page (AC: 1)
  - [x] Add `ArtistsGrid` component to `src/app/page.tsx` right below the Hero/Logo sequence section
  - [x] Ensure proper flow and spacing between the Hero section and the Grid

## Dev Notes

- **Design System Constraint:** Adopción obligatoria de filosofía "Brutalista Elegante" (Tailwind CSS puro para utilidades masivas, override manual de ShadcnUI eliminando bordes estándar en favor de radius `12px-16px` y sombras sólidas).
- **Colors:** Background Principal: Midnight Blue (bg-nmd-midnight). Acentos: Tron Orange (text-nmd-orange o bg-nmd-orange). Texto Principal: Blanco.
- **Borders & Shapes:** Utilizaremos un radio de bordes intermedio, alrededor de `12px` a `16px` (el equivalente a `rounded-xl` o `rounded-[2rem]` en Tailwind).
- **Responsive Layout:**
  - `sm`/Mobile: 1 column
  - `md`/Tablet (768px+): 2 or 3 columns
  - `lg`/Desktop (1024px+): 3 columns, asymmetric spans.
  - Spacing: `gap-6` or `gap-8`.
- **Component Boundaries:**
  - `BentoCard` should go into `src/components/blocks/bento-card.tsx`.
  - `ArtistsGrid` should go into `src/components/sections/artists-grid.tsx`.
  - These are purely visual components that shouldn't do direct data fetching right now.

### Project Structure Notes

- Alignment with unified project structure: Yes, `src/components/blocks/` and `src/components/sections/` are standard.

### References

- UX Design Specs: [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Design-Direction-Decision] (Elegancia Bento)
- UX Design Specs: [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Spacing-&-Layout-Foundation]
- Architecture: [Source: _bmad-output/planning-artifacts/architecture.md#Frontend-Architecture] (Tailwind CSS puro, overrides).
- Epics: [Source: _bmad-output/planning-artifacts/epics.md#Story-1.3:-Artists-Asymmetric-Grid-Structure]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

- Implemented standard BentoCard ui block for usage across the grid
- Refactored ArtistCard to remove static widths and support responsive layout
- Created ArtistsGrid to map ARTISTS list into an asymmetric CSS Grid
- Updated page.tsx with new section flow
- [AI-Review] Implemented true asymmetric bento logic using col-span/row-span mapping.
- [AI-Review] Fixed responsive column layout to match 1 (mobile), 2 (tablet), 3 (desktop) AC.
- [AI-Review] Adjusted ArtistCard root element to be a button, enabling the overlay onSelect toggle.
- [AI-Review] Removed nested focusability issues in BentoCard.
- [AI-Review] Adopted "Sileo" dark mode aesthetics: `#111` card backgrounds, `rounded-3xl`, glassmorphic hover effects, and clean Inter typography.

### File List

- `apps/web/src/components/blocks/bento-card.tsx` [NEW]
- `apps/web/src/components/sections/artists-grid.tsx` [NEW]
- `apps/web/src/components/sections/ArtistCard.tsx` [MODIFIED]
- `apps/web/src/app/page.tsx` [MODIFIED]
