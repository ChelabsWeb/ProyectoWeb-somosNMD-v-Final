# Tech Stack

### Cloud Infrastructure
- **Provider:** Vercel (Edge + Functions + Blob Storage)
- **Key Services:** Edge Network/Edge Config, Next.js SSR/ISR hosting, Vercel Functions for contact form + webhooks, Vercel Blob for static/GLB/audio assets, integrated analytics dashboards
- **Deployment Regions:** Auto-distributed edge, primary build region `iad1` (US East) with global CDN replication

### Technology Stack Table
| Category | Technology | Version | Purpose | Rationale |
| --- | --- | --- | --- | --- |
| Language | TypeScript | 5.4.x | Strongly typed application code across Next.js + functions | Aligns with React ecosystem, improves reliability for AI agents |
| Runtime | Node.js | 20 LTS | Server runtime for Next.js + Vercel Functions | Latest LTS with stable Fetch API, good perf for SSR |
| Framework | Next.js | 16.x (App Router) | Primary web framework (SSR/ISR, RSC) | Matches PRD, excellent for cinematic UX + streaming |
| UI Library | Shadcn UI | 2024.05 snapshot | Accessible, composable component primitives | Rapid theming with Tailwind, matches UX spec |
| Styling | Tailwind CSS | 3.4.x | Utility-first styling + theming tokens | Fast iteration for bespoke visuals |
| Animation | GSAP / Three.js / Lenis / tsparticles.js | GSAP 3.12.x, Three.js 0.164.x | Scroll/motion/3D engine & effects | Meets PRD animation requirements |
| State/Data Layer | React Server Components + Zustand (optional) | RSC native, Zustand 4.x | Lightweight shared state for audio/teaser toggles | Avoids heavier global stores |
| Commerce | Shopify Storefront API (preferred) / Commerce Layer | Latest stable | Headless merch catalog, cart, checkout APIs | Provides PCI-compliant payments without custom backend |
| Bundler/Build | Turborepo + PNPM | Turborepo 1.12, PNPM 9 | Monorepo orchestration & package management | Speeds shared package builds (`ui`, `animation`) |
| Testing (unit) | Vitest | 1.6.x | Fast unit/utility tests | TS-native, compatible with Next.js |
| Testing (e2e/visual) | Playwright | 1.43.x | End-to-end + visual regression (GSAP flows) | Handles motion, multi-browser coverage |
| Backend/API | Vercel Functions | Node 20 | Contact form + analytics ingestion | Zero-maintenance serverless |
| Database | Supabase (Postgres) | 15.x | Store collaboration inquiries + optional metadata | Simple serverless Postgres with RLS & dashboards |
| Storage/CDN | Vercel Blob (S3-compatible) | Managed | Host portraits, GLB logo, audio snippets | Integrated CDN + signed URLs |
| Analytics | Vercel Analytics + PostHog | Native + 1.80.x | Core Web Vitals + KPI event tracking | Combines platform metrics with custom events |
| CI/CD | Codex CI/CD on Vercel | Managed | Lint/test/build/deploy pipeline | Matches PRD, simple approvals/rollbacks |
| Monitoring/Logging | Vercel observability + Logflare (optional) | Managed | Edge/function logs | Centralized access via Vercel dashboard |
