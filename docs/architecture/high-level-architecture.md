# High Level Architecture

### Technical Summary
Project Web NMD is a monorepo-hosted, server-rendered web experience built on Next.js 16 (App Router) with TypeScript, Shadcn UI, and Tailwind providing composable UI primitives. GSAP and Three.js handle motion/3D layers, while Vercel Functions cover light backend needs (contact form, analytics webhooks) and Supabase stores collaboration submissions. Assets (images, GLB logo, audio snippets) live in Vercel Blob/S3-compatible storage fronted by a CDN. Codex CI/CD plus Vercel deployments ensure every merge runs lint/tests, generates static assets, and promotes to preview/production with observability via Vercel Analytics and optional PostHog instrumentation.

### High Level Overview
1. **Architectural Style:** Modular monolith (Next.js app with serverless endpoints) optimized for immersive frontends; no separate backend services required initially.  
2. **Repo Structure:** Monorepo using Turborepo/PNPM workspaces housing `apps/web`, shared component packages, and infrastructure scripts.  
3. **Service Architecture:** Frontend-focused Next.js server handling SSR/ISR, API routes for form submissions + telemetry, and integrations with external services (Spotify deep links, Supabase).
4. **Primary Flow:** User hits Vercel edge → Next.js shows SVG logo stroke animation → streams hero UI → GSAP/Three orchestrate client-side motion → audio previews served via CDN → contact submissions POST to Vercel Function → stored in Supabase and notified via webhook/email.
5. **Key Decisions:** Use App Router/RSC for performance, centralize motion helpers in shared package, rely on Vercel platform for hosting + analytics, keep data footprint light (Supabase for form data) while instrumenting custom events in PostHog for KPI tracking.
6. **Commerce Extension:** Integrate a headless commerce provider (preferred: Shopify Storefront API; fallback Commerce Layer) via server-side SDK wrappers to expose merch catalog, cart, and checkout handoff without spinning up custom payment infrastructure.

### High Level Project Diagram
```mermaid
graph TD
    User((Visitor)) -->|HTTPS| Edge[Vercel Edge Network]
    Edge --> NextApp[Next.js 16 App (SSR/ISR)]
    NextApp --> UI[Shadcn/Tailwind UI Layer]
    UI --> Anim[GSAP + Three.js Engine]
    NextApp --> API[Vercel Functions (contact, telemetry)]
    API --> Supabase[(Supabase DB + Storage)]
    Supabase --> Notify[Email/Webhook Notifications]
    UI --> CDN[Asset CDN (images, GLB, audio snippets)]
    UI --> Spotify[Spotify Deep Links]
    NextApp --> Analytics[Vercel Analytics & PostHog]
```

### Commerce Integration Overview
- **Provider Evaluation:** Prefer Shopify Storefront API for catalog + checkout speed; Commerce Layer is the backup if enterprise contracts require vendor neutrality.
- **Data Flow:** App Router server components fetch products/collections via server-side SDK; client components manage cart state via Zustand and call Storefront mutations; checkout redirects to provider-hosted payment page to keep PCI scope minimal.
- **Webhooks:** Provider webhooks hit a Vercel Function (`/api/commerce/webhook`) to reconcile orders, update inventory caches, and trigger revalidation of merch displays.
- **Caching:** Product lists cached with ISR tags per collection; stock/price updates bust caches via webhook-triggered `revalidateTag`.
- **Analytics:** Cart and checkout events routed through shared analytics module with SKU metadata for funnel dashboards.
