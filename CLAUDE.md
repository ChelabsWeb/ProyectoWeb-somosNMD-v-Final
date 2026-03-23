# SomosNMD — Context

**Client:** NMD (hobby/passion project)
**Purpose:** Web presence for NMD — likely a creative or community project. Exact scope: check with founders.
**Current status:** In progress.

---

# Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS (assumed — verify in `package.json`) |

> Note: Stack details are minimal. Read `package.json` and existing code before making assumptions.

---

# Current Phase & Pending Work

**Status:** In progress — check `tasks/plan.md` if it exists, otherwise run `git log --oneline -20` to understand recent work.

**Before starting any session:**
1. `git status` — see what's uncommitted
2. `git log --oneline -10` — understand recent history
3. Read the existing pages and components to understand what's built

---

# Conventions

- Follow whatever patterns are already established in the codebase
- Read existing components before creating new ones — match the style
- Next.js App Router conventions: Server Components by default, `"use client"` only when needed

---

# Do Not Touch

- Read existing code and confirm with founders before making structural changes
- This is a hobby/passion project — treat client brand and creative direction with care

---

# Quick Start

```bash
cd "C:/Users/Estudiante UCU/Desktop/ProyectoWeb-somosNMD-v-Final"
pnpm install   # or npm install — check package.json for lock file
pnpm dev
# App runs on http://localhost:3000
```
