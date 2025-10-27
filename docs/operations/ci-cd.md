# CI/CD Runbook

## Pipeline Overview
- **Orchestrator:** Codex CI/CD (see `.codex/pipeline.yaml`).
- **Runtime:** Node.js 20 / pnpm 10.19.0.
- **Quality Gates:** `pnpm format:check`, `pnpm lint`, and `pnpm --filter web test` must succeed before any build or deploy step runs.
- **Build Artifact:** Next.js output in `apps/web/.next` promoted to Vercel.

## Required Secrets
| Secret | Purpose |
| --- | --- |
| `VERCEL_TOKEN` | Authenticates the Codex runners against the Vercel project for preview + production deploys. |
| `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` | Optional, but keeps `vercel deploy` non-interactive when linking from CI. |

Store the secrets in Codex (or your preferred CI) before running the pipeline. Locally, you can export them in a `.env.ci` file and `source` it before running `pnpm build`.

## Step-by-Step Flow
1. **Install** – `pnpm install --frozen-lockfile`
2. **Format Check** – `pnpm format:check` (scopes to touched frontend + shared packages)
3. **Lint** – `pnpm lint` (Turborepo fan-out over every workspace)
4. **Unit Tests** – `pnpm --filter web test` (Vitest jsdom suite)
5. **Build** – `pnpm build` (Turborepo triggers `next build` inside `apps/web`)
6. **Deploy Preview** – `vercel deploy --cwd apps/web --prebuilt --token $VERCEL_TOKEN`
7. **Deploy Production** – same command with `--prod`, gated to `main`

Codex automatically skips the deploy steps on feature branches that fail any quality gate.

## Linking the Repository to Vercel
```bash
pnpm dlx vercel link --cwd apps/web --yes \
  --project PROJECT_NAME \
  --org ORG_NAME
pnpm dlx vercel env pull .env.local --cwd apps/web
```
1. Run the commands above once locally with a user-scoped Vercel token.
2. Copy the generated `.vercel/project.json` values (`orgId`, `projectId`) into your CI secret store (or export them before invoking `vercel deploy`).
3. Commit `infra/vercel.json` so future environments share identical build settings.

## Rollbacks
- Trigger `vercel rollback DEPLOYMENT_ID` to revert to any previous green build.
- Because analytics + logging sit in Vercel, no additional infra changes are required.

## Local Smoke Test Before Commit
```bash
pnpm install
pnpm format:check
pnpm lint
pnpm --filter web test
pnpm --filter web dev
```
This mirrors the CI order, reducing “works on my machine” drift.

