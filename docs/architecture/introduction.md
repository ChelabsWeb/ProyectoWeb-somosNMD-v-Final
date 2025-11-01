# Introduction
This document outlines the overall project architecture for Project Web NMD, including backend systems, shared services, and non-UI specific concerns. Its primary goal is to serve as the guiding architectural blueprint for AI-driven development, ensuring consistency and adherence to chosen patterns and technologies.

**Relationship to Frontend Architecture:**
If the project includes a significant user interface, a separate Frontend Architecture Document will detail the frontend-specific design and MUST be used in conjunction with this document. Core technology stack choices documented herein (see "Tech Stack") are definitive for the entire project, including any frontend components.

### Starter Template or Existing Project
Adopting a customized Next.js 16 + Turborepo scaffold (via `create-next-app` inside a monorepo) as the foundation. This gives us App Router defaults, shared package support (`packages/ui`, `packages/animation`, `packages/commerce`), and smooth integration with Shadcn UI, Tailwind, Codex CI/CD, and Vercel deploy scripts while leaving room for GSAP/Three.js tooling from Epic 1.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2024-06-04 | v0.1 | Initial architecture draft kickoff | Winston |
