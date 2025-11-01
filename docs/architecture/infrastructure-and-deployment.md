# Infrastructure and Deployment

### Infrastructure as Code
- **Tool:** Vercel project config + Supabase SQL migrations
- **Location:** `infra/vercel.json`, `infra/supabase/migrations.sql`
- **Approach:** Declarative project settings (env vars, edge functions) stored in repo; Supabase CLI handles schema migrations per environment.

### Deployment Strategy
- **Strategy:** Trunk-based development with preview deployments for every PR; main merges promote to production after CI pass.
- **CI/CD Platform:** Codex CI/CD orchestrating lint/tests, handing off to Vercel for build/deploy.
- **Pipeline Configuration:** `.codex/pipeline.yaml` + `vercel.json`

### Environments
- **Development:** Local Next.js dev server + Supabase sandbox; used for rapid iteration.  
- **Preview:** Vercel Preview deployments per PR with isolated Supabase schema (branch-based).  
- **Production:** Vercel Production connected to `main`, Supabase prod project with RLS + backups.

### Environment Promotion Flow
```text
feature/* ➜ PR ➜ CI (lint/test) ➜ Vercel Preview
      │
      ▼
Code Review + QA sign-off
      │
      ▼
Merge to main ➜ CI ➜ Vercel Production ➜ Supabase migration apply
```

### Rollback Strategy
- **Primary Method:** Vercel deployment rollback (one-click revert to last good build) + Supabase point-in-time recovery.
- **Trigger Conditions:** Elevated error rates, failed smoke tests, degraded animation performance, or data corruption alerts.
- **Recovery Time Objective:** < 15 minutes for frontend rollback; < 1 hour for Supabase PITR restore.
