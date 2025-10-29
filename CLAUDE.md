# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Project Web NMD is a **cinematic web experience** for a 12-artist music collective. Built as a "living music video" landing page, it features immersive animations (GSAP, Three.js), horizontal scroll galleries, audio previews, and an integrated merch storefront. The site emphasizes performance, accessibility (reduced-motion support), and polished motion design inspired by GTA VI, Travis Scott's Utopia, and cinematic storytelling.

## Repository Structure

This is a **pnpm monorepo** managed by **Turborepo**:

```
apps/
  web/                           # Main Next.js 16 application (App Router)
packages/
  animation/                     # Shared animation utilities & hooks
  ui/                            # Shared UI components (temporary, being replaced with shadcn theming)
  config/                        # Shared ESLint, Prettier, Tailwind configurations
  commerce/                      # Commerce utilities (placeholder for future)
docs/                            # Architecture docs, PRD, creative brief
infra/                           # Infrastructure config (Vercel, Supabase)
```

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19.2 and TypeScript 5
- **Package Manager**: pnpm 10.19.0 (workspace protocol)
- **Build System**: Turborepo 2.1.0
- **Styling**: Tailwind CSS 3.4 with custom cinematic preset
- **Animation**: GSAP 3.13 (ScrollTrigger), Lenis 1.3 (smooth scroll), @tsparticles (particle effects)
- **Testing**: Vitest 4.0 with jsdom
- **UI Library**: Radix UI primitives with class-variance-authority (CVA)
- **Deployment**: Vercel with Edge Network, Functions, and Blob Storage
- **Analytics**: Vercel Analytics + Speed Insights
- **Database**: Supabase (Postgres) for collaboration inquiries

## Common Development Commands

### Development
```bash
pnpm dev              # Start Next.js dev server (apps/web) via Turborepo
```

### Build & Test
```bash
pnpm build            # Build all packages and apps
pnpm test             # Run tests across all packages
pnpm lint             # Lint all workspaces
```

### Code Quality
```bash
pnpm format           # Format code with Prettier
pnpm format:check     # Check formatting without writing
```

### Git Hooks
```bash
pnpm prepare          # Install Husky git hooks (runs automatically)
```

### Testing Specific Components
```bash
# Run tests in a specific package
cd packages/animation && pnpm test

# Run tests in the web app
cd apps/web && pnpm test

# Run tests with UI
pnpm test --ui
```

## Architecture Patterns

### Monorepo Workspace Protocol
Packages reference each other using `workspace:*` in package.json. TypeScript path aliases are configured in `tsconfig.base.json`:
- `@nmd/animation` → `packages/animation/src`
- `@nmd/ui` → `packages/ui/src`
- `@nmd/config/*` → `packages/config/*`

### Animation System Architecture

**GSAP + ScrollTrigger Integration:**
- GSAP and ScrollTrigger are registered in [PageShell.tsx](apps/web/src/components/layout/PageShell.tsx)
- ScrollTrigger is proxied to work with Lenis smooth scrolling
- Complex scroll-based animations include hero mask reveal and horizontal artist gallery scroll
- All GSAP timelines should be centralized in the `@nmd/animation` package when possible

**Lenis Smooth Scrolling:**
- Initialized in `PageShell` with custom lerp (0.075) and duration (1.1)
- Provided to components via `LenisContext`
- Used for programmatic scrolling (CTA buttons, navigation)
- Respects `prefers-reduced-motion` (disables smooth scrolling when motion is reduced)

**Reduced Motion Support:**
- Use the `useReducedMotionPreference` hook from `@nmd/animation`
- Components should provide fallback experiences when motion is disabled
- Particle backgrounds, GSAP animations, and scroll effects must respect this preference

### Component Architecture

**Section-Based Structure:**
Each major section is a standalone component composed in [page.tsx](apps/web/src/app/page.tsx):
- `LoaderSection` - Cinematic loader with app ready signaling
- `HeroSection` - Hero with mask animation and scroll effects
- `ArtistsSection` - Horizontal scroll gallery with parallax
- `MusicSection` - Music projects grid with audio previews
- `MerchSection` - Merchandise storefront
- `TeaserSection` - Release teasers ("Midnight Is Close")
- `ContactSection` - Collaboration/booking form

All sections use consistent `aria-label` attributes for accessibility.

**Context Patterns:**
- `AudioProvider`: Simple audio playback management (`play(src)`, `stop()`, `isPlaying`, `nowPlaying`)
- `LenisProvider`: Makes Lenis smooth scroll instance available to all components

### Styling & Theming

**Cinematic Color Palette** (defined in [tailwind-preset.ts](packages/config/tailwind-preset.ts)):
```
background: "233 47% 4%"    // Deep dark blue
primary:    "337 83% 55%"   // Vibrant pink (#eb2c75)
secondary:  "218 94% 55%"   // Electric blue (#1e6df8)
accent:     "44 89% 63%"    // Warm yellow (#f5c84c)
```

**Custom CSS Classes** (in [globals.css](apps/web/src/app/globals.css)):
- `.hero-mask-*` - Hero section mask animation states
- `.hero-nav-link` - Animated navigation links
- `.custom-cursor` - Custom cursor with different states

**Font System:**
- Primary: Geist Sans
- Monospace: Geist Mono
- Display: Space Grotesk (fallback)

### Analytics & Tracking

Use the `trackEvent` utility from [analytics.ts](apps/web/src/lib/analytics.ts) for all custom events:
- `hero_scroll_complete` - Hero scroll animation completed
- `hero_cta_click` - CTA button clicked in hero
- `artist_profile_view` - Artist profile overlay opened
- Custom events integrate with Vercel Analytics

## Code Conventions

### File Naming
- **Components**: PascalCase (`.tsx`) - e.g., `ArtistCard.tsx`
- **Utilities**: kebab-case (`.ts`) - e.g., `app-ready.ts`
- **Tests**: Co-located with source (`.test.ts`) - e.g., `analytics.test.ts`

### TypeScript
- Use `type` over `interface` (enforced by ESLint)
- Enable strict mode (configured in `tsconfig.base.json`)
- All external inputs validated at API boundaries using Zod

### Component Patterns
- Prefer functional components with hooks
- Use CVA (class-variance-authority) for component variants
- Combine classes with `clsx` and `tailwind-merge` via the `cn()` utility

### Animation Guidelines
- Define GSAP timelines in `packages/animation` to avoid scattered `gsap.to` calls
- Always check for reduced motion preference before enabling animations
- Maintain ≥45fps on target devices; profile complex animations
- Use `prefers-reduced-motion` CSS media queries alongside React hooks

## Performance & Accessibility

### Performance Targets (NFR1)
- LCP < 2.5s
- CLS < 0.1
- Maintain Core Web Vitals on modern desktop and mobile

### Accessibility Requirements (NFR3)
- Honor `prefers-reduced-motion` media query
- Ensure keyboard navigation through all interactive elements
- Provide descriptive `aria-label` attributes for sections and controls
- Supply captions or transcripts for audio previews
- Maintain WCAG AA color contrast standards

### Browser Support (NFR2)
- Latest two versions of Chromium, Safari, and Firefox
- Progressive enhancement for older browsers
- Graceful degradation when animations/WebGL are unsupported

## Critical Development Rules

1. **No `console.log` in production**: Use structured logging (Vercel logging) instead
2. **Validate all external inputs**: Use Zod schemas at API boundaries
3. **Centralize animation logic**: Don't scatter GSAP calls; use `@nmd/animation` package
4. **Respect reduced motion**: Always check `useReducedMotionPreference` before animating
5. **Use stable IDs**: Never use `Math.random()` or `Date.now()` for component IDs (causes hydration mismatches). Use React's `useId()` hook instead
6. **Track analytics**: All custom events must use the `trackEvent()` helper for schema consistency
7. **PascalCase for components**: React components use PascalCase, utilities use kebab-case

## API Routes & Data

### Contact Form API
- Endpoint: `/api/contact` (POST)
- Validates input with Zod
- Stores in Supabase `collaboration_inquiries` table
- Sends notifications via webhook/email
- Tracks analytics events

### Analytics Events API
- Endpoint: `/api/event` (POST)
- Records custom analytics events
- Integrates with Vercel Analytics and PostHog

## Commerce Integration (Planned)

- **Provider**: Shopify Storefront API (preferred) or Commerce Layer
- **Cart Management**: Client-side state (Zustand)
- **Checkout**: Provider-hosted for PCI compliance
- **Webhooks**: `/api/commerce/webhook` for order reconciliation
- **Caching**: ISR tags per collection with webhook-triggered revalidation

## Security & Compliance

- All endpoints enforce HTTPS (Vercel TLS)
- Contact form collects minimal PII (name, email, organization)
- Data stored in Supabase with encryption at rest
- Auto-delete inquiries after 12 months unless ongoing collaboration
- CSRF protection via Next.js middleware
- Rate limiting on contact submissions (IP + email)
- No secrets hardcoded; use `process.env`

## Testing Strategy

### Unit Tests (Vitest)
- Co-located with source files (`*.test.ts`)
- Coverage target: ≥80% for utilities and API routes
- Use MSW for mocking fetch requests

### Integration Tests
- Located in `tests/integration`
- Test Next.js route handlers and Supabase interactions
- Use Supabase CLI local instance

### End-to-End Tests (Planned: Playwright)
- Test cinematic flows: loader, hero, gallery, audio previews, contact form
- Run against Vercel Preview deployments
- Visual regression tests for animations

## Key Reference Files

**Configuration:**
- [turbo.json](turbo.json) - Turborepo task pipeline
- [tsconfig.base.json](tsconfig.base.json) - Base TypeScript config
- [apps/web/next.config.ts](apps/web/next.config.ts) - Next.js config
- [packages/config/tailwind-preset.ts](packages/config/tailwind-preset.ts) - Tailwind theme

**Entry Points:**
- [apps/web/src/app/layout.tsx](apps/web/src/app/layout.tsx) - Root layout
- [apps/web/src/app/page.tsx](apps/web/src/app/page.tsx) - Home page
- [apps/web/src/components/layout/PageShell.tsx](apps/web/src/components/layout/PageShell.tsx) - Main shell with GSAP/Lenis setup

**Core Systems:**
- [packages/animation/src/useReducedMotionPreference.ts](packages/animation/src/useReducedMotionPreference.ts) - Reduced motion hook
- [apps/web/src/context/LenisContext.tsx](apps/web/src/context/LenisContext.tsx) - Smooth scroll context
- [apps/web/src/lib/analytics.ts](apps/web/src/lib/analytics.ts) - Analytics utilities
- [apps/web/src/lib/app-ready.ts](apps/web/src/lib/app-ready.ts) - App ready event system

**Documentation:**
- [docs/architecture.md](docs/architecture.md) - Full system architecture
- [docs/prd.md](docs/prd.md) - Product requirements document
- [docs/brief.md](docs/brief.md) - Creative brief

## Deployment & CI/CD

- **Platform**: Vercel (Edge Network + Functions + Blob Storage)
- **CI/CD**: Codex CI/CD orchestrates lint/test, Vercel handles build/deploy
- **Environments**:
  - Development: Local Next.js dev server
  - Preview: Vercel Preview per PR
  - Production: Vercel Production from `main` branch
- **Rollback**: One-click Vercel deployment rollback + Supabase point-in-time recovery

## Project Goals & Context

This is an **MVP cinematic web experience** designed to:
1. Showcase all 12 artists with immersive storytelling
2. Increase Spotify follows, newsletter signups, and collaboration inquiries
3. Feature current/upcoming releases with interactive previews
4. Establish a maintainable, high-performance foundation for future drops
5. Provide an integrated merch shopping experience

**Current Status**: Site is functional with loader, hero, artists gallery, music section, merch section, teaser section, and contact form. Recent work includes fixing hydration mismatches and implementing particle effects.
