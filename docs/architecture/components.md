# Components

### Next.js Web Experience
**Responsibility:** Render SSR/ISR pages, hydrate cinematic UI, orchestrate data fetching.  
**Key Interfaces:** HTTP(S) requests, React Server Components, API routes `/api/contact`, `/api/events`.  
**Dependencies:** Shadcn UI, Tailwind, GSAP/Three packages, Vercel Edge network.  
**Technology Stack:** Next.js 16, TypeScript, App Router.

### Animation & Audio Engine
**Responsibility:** Encapsulate GSAP timelines, Three.js scenes, audio preview controller shared across sections.  
**Key Interfaces:** Exposes hooks/components (`useLoaderTimeline`, `<AudioPreview />`).  
**Dependencies:** GSAP, Three.js, Web Audio API, Zustand store.  
**Technology Stack:** Custom packages `packages/animation` and `packages/commerce`.

### Asset Pipeline & CDN
**Responsibility:** Store and deliver portraits, GLB logo, audio snippets with caching + signed URLs.  
**Key Interfaces:** Vercel Blob REST, image optimization endpoints.  
**Dependencies:** Build scripts to upload assets, Next.js Image component.  
**Technology Stack:** Vercel Blob storage, Next.js Image optimization.

### Contact & Telemetry API
**Responsibility:** Handle POST submissions, validate inputs, persist to Supabase, emit notifications and analytics events.  
**Key Interfaces:** `/api/contact` (POST JSON), `/api/event` (POST metrics), `/api/commerce/webhook` (POST provider webhook).  
**Dependencies:** Supabase client, email/webhook service (Supabase functions or Resend), PostHog SDK, commerce provider webhook secret.  
**Technology Stack:** Vercel Functions (Node 20), Supabase JS client.

### Analytics & Monitoring Layer
**Responsibility:** Capture Core Web Vitals, PostHog custom events, log errors, expose dashboards.  
**Key Interfaces:** PostHog ingest API, Vercel Analytics collector, Logflare streaming logs.  
**Dependencies:** Contact/API events, client-side hooks.  
**Technology Stack:** PostHog, Vercel Analytics, Logflare (optional).

### Component Diagram
```mermaid
graph TD
    subgraph Frontend
        WebApp[Next.js Web App]
        AnimPkg[Animation Package]
        AudioCtrl[Audio Preview Controller]
    end
    subgraph Backend
        ContactAPI[Vercel Function /api/contact]
        EventsAPI[/api/event]
        SupabaseDB[(Supabase Postgres)]
    end
    subgraph Infra
        Blob[Vercel Blob/CDN]
        AnalyticsSvc[Vercel Analytics + PostHog]
    end

    WebApp --> AnimPkg
    WebApp --> AudioCtrl
    WebApp --> Blob
    WebApp --> ContactAPI
    WebApp --> EventsAPI
    ContactAPI --> SupabaseDB
    ContactAPI --> AnalyticsSvc
    EventsAPI --> AnalyticsSvc
    AnimPkg --> Blob
```
