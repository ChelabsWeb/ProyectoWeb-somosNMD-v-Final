# Story 1.1: Project Initialization & Theming

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Developer,
I want to initialize the Next.js project with Tailwind CSS and ShadcnUI, configuring the "Brutalista Elegante" design system tokens (colors, typography, border-radii),
so that the foundation is set for all subsequent UI components.

## Acceptance Criteria

1. **Given** an empty project directory
   **When** the developer runs the initialization commands
   **Then** a Next.js App Router project is created with Tailwind CSS
2. **And** global CSS variables for Midnight Blue and Tron Orange are configured
3. **And** base ShadcnUI typography and border-radius overrides are applied.

## Tasks / Subtasks

- [x] Task 1: Initialize Next.js Project (AC: 1)
  - [x] Run `npx create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
  - [x] Cleanup default Next.js boilerplate code in `src/app/page.tsx` and `src/app/globals.css`.
- [x] Task 2: Configure Global Design Tokens (AC: 2)
  - [x] Define "Midnight Blue" (`#0A0F1E`) and "Tron Orange" (`#FF4D00`) in `tailwind.config.ts` (or CSS variables).
  - [x] Setup base typography (Condensed Mono for headings, Inter/Helvetica for body).
- [x] Task 3: Initialize Shadcn UI & Apply Brutalist Overrides (AC: 3)
  - [x] Initialize shadcn/ui generic config (`npx shadcn-ui@latest init`). Focus on `12px-16px` border radii.
  - [x] Override base styles to match the "Brutalista Elegante" aesthetic (solid shadows, removing default soft borders where necessary).

## Dev Notes

- **Architecture:** We are using **Next.js App Router** with Serverless focus. Vercel is the intended deployment target.
- **Styling:** **Tailwind CSS** + **ShadcnUI** (headless Radix UI). 
- **Estética "Brutalista Elegante":** 
  - Colors: Midnight Blue background, Tron Orange accents, White text.
  - Typography: Massive, condensed, monospace fonts for Headings (`h1`); clean Inter for body text.
  - Borders/Shapes: Pillow-shaped/Bento-box containers with intermediate border radius (`12px-16px` / `rounded-xl` / `rounded-2xl`), solid shadows, no standard thin borders.
- **Nomenclatura Brutalista CSS:** Use kebab-case for custom Tailwind vars reflecting status (e.g., `bg-nmd-midnight`, `text-nmd-orange`).
- **Dependencies:** Do NOT install Firebase or other heavy DBs. We are keeping the backend lean (Server Actions + third-party APIs later).

### Project Structure Notes

- Alignment with unified project structure:
  - `src/app/globals.css`: Reset Brutalista and Tailwind tokens.
  - `src/app/layout.tsx`: Root Layout (Fonts, Metadata).
  - `src/components/ui/`: Auto-generated Shadcn UI components.
  - `src/components/blocks/`: Custom "Brutalismo Elegante" atomic components (e.g. Bento cards later).

### References

- Architecture Doc: [docs/architecture.md](file:///c:/Users/Estudiante%20UCU/Desktop/ProyectoWeb-somosNMD-v-Final/_bmad-output/planning-artifacts/architecture.md)
- UX Doc: [docs/ux-design-specification.md](file:///c:/Users/Estudiante%20UCU/Desktop/ProyectoWeb-somosNMD-v-Final/_bmad-output/planning-artifacts/ux-design-specification.md)
- Epics: Epic 1: Landing Page & Portfolio Visual [docs/epics.md](file:///c:/Users/Estudiante%20UCU/Desktop/ProyectoWeb-somosNMD-v-Final/_bmad-output/planning-artifacts/epics.md)

## Dev Agent Record

### Agent Model Used

antigravity

### Debug Log References

N/A

### Completion Notes List

- Applied Midnight Blue and Tron Orange to shared `tailwind-preset.ts` and `globals.css`
- Customized Shadcn UI Button with Brutalista Elegante `shadow` and `rounded` properties
- Validated build success

### File List

- `packages/config/tailwind-preset.ts`
- `apps/web/src/app/globals.css`
- `apps/web/src/app/layout.tsx`
- `apps/web/src/app/page.tsx`
- `apps/web/src/components/ui/button.tsx`
- `apps/web/components.json`
