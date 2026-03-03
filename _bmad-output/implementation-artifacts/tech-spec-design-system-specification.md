---
title: 'Design System Specification'
slug: 'design-system-specification'
created: '2026-02-28T16:29:00-03:00'
status: 'Implementation Complete'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['Next.js', 'Tailwind CSS', 'Shadcn UI', 'Framer Motion']
files_to_modify: ['None (this is documentation only)']
code_patterns: ['Sileo minimalist aesthetic', 'Elegancia Bento grid system', 'Strict Dark Mode (Midnight Blue/Tron Orange)']
test_patterns: ['Visual regression testing (if applicable, but out of scope for the spec itself)']
---

# Tech-Spec: Design System Specification

**Created:** 2026-02-28T16:29:00-03:00

## Overview

### Problem Statement

The project lacks a comprehensive, rigorously defined design system specification. To ensure a cohesive, premium, and highly polished user interface, we need clear guidelines establishing tokens for aesthetics, layout, typography, interactivity, and component overrides that align with the desired Sileo-inspired minimalist design.

### Solution

Create a detailed Design System Specification that formalizes the 'Midnight Blue' and 'Tron Orange' dark mode palette, the 'Elegancia Bento' grid system, specific typography rules (round_8four and Inter/Geist), Framer Motion-based fluid interactive patterns, WCAG AA accessibility standards, and systematic guidelines for overriding Shadcn UI components to achieve a custom premium look.

### Scope

**In Scope:**
- Aesthetic principles (Sileo minimalism, perfect harmony, whitespace)
- Grid system tokens (Elegancia Bento cards, perfect centering)
- Color palette tokens (Midnight Blue, Tron Orange, strict Dark Mode)
- Typography scale and usage (round_8four for bold statements, Inter/Geist for UI text)
- Layout spacing and border-radii rules (e.g., precise smooth corners like `rounded-[24px]` or `rounded-[32px]`)
- Interactive feedback patterns (Framer Motion spring physics, gooey SVG morphing for custom Sileo Toasts)
- Accessibility requirements (WCAG AA)
- Shadcn UI component custom override guidelines (Forms, Buttons, Modals)

**Out of Scope:**
- Actual implementation of all components (this is just the specification document itself)
- Backend or API changes

## Context for Development

### Codebase Patterns

- Next.js application using Tailwind CSS for styling tokens.
- Shadcn UI for base components that must be significantly customized to avoid looking generic.
- Framer Motion for complex, fluid interactions and spring physics.

### Files to Reference

| File                           | Purpose                                                                   |
| ------------------------------ | ------------------------------------------------------------------------- |
| `apps/web/tailwind.config.ts`  | Tailwind configuration where design tokens and colors must be established |
| `apps/web/globals.css`         | Defining global CSS variables for the color palette                       |
| `apps/web/src/components/ui/*` | Shadcn UI component files that will require custom overriding             |

### Technical Decisions

- The design system will be explicitly and strictly Dark Mode.
- Tron Orange will be used strictly as a high-emphasis accent for specific interactive states.

## Implementation Plan

### Tasks

- [x] Task 1: Establish Typography and Color Tokens (F3)
  - File: `apps/web/globals.css` AND `apps/web/tailwind.config.ts`
  - Action: Document the exact CSS variables in `globals.css` for Midnight Blue (background/card layers) and Tron Orange (primary accent, ring, states). MUST update the `fontFamily` extension in `tailwind.config.ts` to map `round_8four` for headings and `Inter/Geist` for body/UI text. Verify WCAG AA contrast ratio compliance between the orange accent and the dark blue background.
  - Notes: These tokens form the bedrock of the entire aesthetic and must be applied consistently at the framework config level.

- [x] Task 2: Define Layout and Spacing Tokens & Bento Card (F4)
  - File: `apps/web/tailwind.config.ts` AND `apps/web/src/components/blocks/bento-card.tsx`
  - Action: Define strict `borderRadius` scales in Tailwind config (`rounded-[24px]`, `rounded-[32px]`). Create or modify `BentoCard` component to strictly enforce the "Elegancia Bento" structure, mandating flex/grid utility classes that perfectly center content within the cards and apply standard padding/borders.
  - Notes: All bento layouts must use this unified component.

- [x] Task 3: Codify Shadcn Component Overrides (F1)
  - File: `apps/web/src/components/ui/button.tsx`, `apps/web/src/components/ui/form.tsx`, `apps/web/src/components/ui/dialog.tsx`
  - Action: Update these components to remove the generic Shadcn look. Round corners aggressively (`rounded-full` or the new `24px` scale), apply the Midnight Blue/Tron Orange color scheme. 
  - Notes: Ensure form inputs and dialog modals also map strictly to these custom dark mode tokens.

- [x] Task 4: Standardize Interactive Patterns (F2)
  - File: `apps/web/src/lib/animation.ts`
  - Action: Define standard Framer Motion configurations (`spring` presets, mass, damping, stiffness) as constants to be used across the app. 
  - Notes: Expose utilities like `const springPreset = { stiffness: 400, damping: 25 };`

- [x] Task 5: Implement Design System Route (F9)
  - File: `apps/web/src/app/(dev)/design-system/page.tsx`
  - Action: Create a dedicated, development-only route that imports and lays out all updated design system components (buttons, forms, typography scale, bento cards) on a single page for visual inspection.
  - Notes: Conditionally render or protect this route so it doesn't accidentally ship to production if necessary, or keep it strictly for local dev/staging.

### Acceptance Criteria

- [x] AC 1: Given a developer is styling text, when they apply typography classes, then `round_8four` is correctly mapped in Tailwind and applied, and `Inter/Geist` is applied for body text.
- [x] AC 2 (F5): Given a developer integrates a Button or Modal, when it is rendered on the screen, then it visually displays Midnight Blue backgrounds and Tron Orange interactions with rounded corners, matching the Sileo visual reference perfectly.
- [x] AC 3 (F7): Given a developer adds a micro-interaction to a component, when they write the animation, then they import and use the standard shared Framer Motion `springPreset` from `apps/web/src/lib/animation.ts`.
- [x] AC 4 (F9): Given a designer needs to QA the implementation, when they navigate to `/design-system`, then they see a full catalog of all typography, colors, and customized Shadcn components (buttons, forms, dialogs) laid out.
- [x] AC 5 (F10): Given a user receives a Sileo Toast on a low-end device, when the gooey SVG morphing would drop frames, then it gracefully falls back to a standard fluid fade/slide animation.

## Additional Context

### Dependencies

- Explicit dependency on `framer-motion`, `clsx`, and `tailwind-merge` in `package.json` (F8).
- All subsequent UI epics and stories depend directly on these documented tokens.

### Testing Strategy

- Code review to ensure the documented specification is clear and actionable for developers.
- Visual inspection by UX/Design roles on the dedicated `/design-system` route (F9).
- Automated a11y checks via Storybook/axe to verify the Tron Orange meets WCAG AA contrast (F5).

### Notes

- **Risk:** Implementing the gooey SVG morphing for Toasts might be technically complex or perform poorly on low-end devices. Implement a fallback standard Framer Motion slide-in if performance dips (F10).
- **Code Pattern:** Extract all strict UI configurations into shareable constant files (e.g. `animation.ts`), not just "styling aesthetics" (F6).

## Review Notes
- Adversarial review completed
- Findings: 9 total, 4 fixed, 5 skipped
- Resolution approach: Fix automatically
