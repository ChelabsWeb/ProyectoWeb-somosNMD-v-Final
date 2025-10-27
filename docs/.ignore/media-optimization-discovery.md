# Feature 2 Discovery: Media Optimization Pipeline

## Objective
Validate scope, tooling, and responsibilities for the media optimization pipeline so engineering can integrate it alongside current scaffolding work.

## Proposed Tooling & Services
- **Sharp** for image resizing, sprite sheets, and format conversion (AVIF/WebP fallback).
- **FFmpeg** for audio snippet clipping, normalization, and waveform exports.
- **Vercel Build Output API or Turborepo tasks** to embed processing within CI/CD.
- **Optional:** `squoosh-cli` benchmarking for comparison against Sharp results.

## Responsibilities
- **Media Tools Owner (TBD):** Maintains `packages/media-tools`, writes processing scripts, coordinates with design for quality thresholds.
- **CI Maintainer (TBD):** Wires `pnpm build:assets` into Turborepo pipelines and ensures output directories cache correctly.
- **Design/Creative Liaison (TBD):** Approves compression profiles and signs off visual/audio fidelity.
- **QA Lead (TBD):** Defines validation scenarios for low-end device testing and Lighthouse budget updates.

## Discovery Tasks
1. Verify Sharp/FFmpeg compatibility with project Node.js version (20 LTS).
2. Draft desired asset classes (hero video loops, GLB loader, gallery portraits, audio previews) and required variants (HQ/LQ, mobile/desktop).
3. Benchmark sample assets to estimate size reductions and identify quality loss thresholds.
4. Decide on storage strategy (keep in repo vs. publish to Vercel Blob/Supabase storage).
5. Outline CI integration steps, including caching and fail-fast behavior when processing errors occur.

## Open Questions
1. Which engineer owns the media-tools workspace during initial build-out?
2. Should designers approve every asset batch or only baseline presets?
3. Do we version processed assets for rollback, and if so, where?
4. Are there licensing or attribution requirements when re-encoding third-party stems/assets?

## Next Actions
1. Assign owners for each responsibility area.
2. Schedule a working session to review tooling benchmarks with design + engineering.
3. Capture decisions in `docs/upcoming-features.md` and convert into implementation stories.
