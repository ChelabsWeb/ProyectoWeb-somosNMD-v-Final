# Next Steps
- Align with UX/front-end team to ensure component inventory + animation helpers mirror this architecture.
- Set up Supabase project + migrations from `infra/supabase/migrations.sql`.
- Configure Vercel project (env vars, Blob buckets) and wire Codex CI/CD to enforce lint/tests.
- Build quick prototypes for loader, gallery, teaser to validate GSAP/Three performance budgets.

### Architect Prompt (for Frontend Architecture / Dev Handoff)
```
Use docs/architecture.md and docs/front-end-spec.md for Project Web NMD to elaborate the frontend/component architecture. Focus on:
- Monorepo structure (apps/web + packages/ui + packages/animation + packages/commerce)
- How Shadcn/Tailwind tokens map to cinematic UX spec
- GSAP/Three timeline orchestration and reduced-motion fallbacks
- Shared hooks for audio previews + analytics events
Produce a detailed frontend architecture ready for dev agents.
```


