# Source Tree
```plaintext
project-web-nmd/
├── apps/
│   └── web/
│       ├── app/                     # Next.js App Router routes
│       │   ├── api/
│       │   │   ├── contact/route.ts # POST contact handler
│       │   │   └── event/route.ts   # Custom analytics ingest
│       │   ├── page.tsx
│       │   └── layout.tsx
│       ├── components/
│       │   ├── loader.tsx           # Loader component
│       │   ├── hero.tsx             # Hero component
│       │   ├── midnight.tsx         # Midnight Teaser component
│       │   ├── artists.tsx          # Artists Gallery component
│       │   └── particles.tsx        # Shared particle effects
│       ├── lib/
│       │   ├── analytics/
│       │   ├── validations/
│       │   └── supabase.ts
│       ├── styles/
│       ├── public/                  # assets (logo.svg, etc.)
│       └── package.json
├── packages/
│   ├── ui/                          # Shadcn component extensions + tokens
│   ├── animation/                   # GSAP/Three helpers, audio controller
│   └── config/                      # Shared ESLint/TS configs
├── assets/
│   ├── images/
│   ├── audio/
│   └── models/
├── scripts/
│   ├── upload-assets.ts
│   └── generate-sitemaps.ts
├── infra/
│   ├── vercel.json                  # Edge/function config
│   ├── supabase/
│   │   └── migrations.sql
│   └── posthog/
│       └── dashboard-config.json
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
└── README.md
```
