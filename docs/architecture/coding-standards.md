# Coding Standards

### Core Standards
- **Languages & Runtimes:** TypeScript 5.4, Node.js 20 LTS, React 18.3 (Next.js 16).  
- **Style & Linting:** ESLint (Next.js + Tailwind plugins) + Prettier enforced via Turborepo pipeline.  
- **Test Organization:** `*.test.ts` for unit tests colocated with modules; e2e specs in `tests/e2e`.

### Naming Conventions
| Element | Convention | Example |
| --- | --- | --- |
| Components | PascalCase, descriptive | `ArtistGallery`, `TeaserScene` |
| Hooks | `use` + Verb + Noun | `useLoaderTimeline`, `useAudioPreview` |
| API Routes | Kebab-case folder | `/api/contact`, `/api/event` |

### Critical Rules
- **No console.log in prod**: Use `logger.info/warn/error` helpers tied to Vercel logging.  
- **All external inputs validated**: Use shared Zod schemas before hitting business logic.  
- **Animation timelines centralized**: Define GSAP timelines in `packages/animation`; do not scatter `gsap.to` calls in React components.  
- **Contact submissions require CSRF token**: Include Next.js anti-CSRF middleware when POSTing from form.  
- **Do not bypass PostHog helper**: All custom events must use `trackEvent()` to ensure schema parity.
