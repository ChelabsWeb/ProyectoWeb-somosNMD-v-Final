# Asset Structure Guide

## Source of Truth
- `web-bundles/assets-source/images` – master hero shots, artist portraits, merch photography.
- `web-bundles/assets-source/3d` – GLB/GLTF files, HDRI maps, textures.
- `web-bundles/assets-source/audio` – long-form audio, stems, voiceover.

## App-Ready Derivatives
- `apps/web/public/assets/logo` – logo SVG/PNGs, animated masks.
- `apps/web/public/assets/hero` – optimized hero imagery/videos by breakpoint.
- `apps/web/public/assets/artists` – optimized portraits, blur placeholders.
- `apps/web/public/assets/music` – album art, waveform images, snippet MP3s.
- `apps/web/public/assets/teaser` – teaser typography textures, noise loops.
- `apps/web/public/assets/ui` – navigation icons, gradients, background textures.
- `apps/web/public/assets/temp` – staging area to be cleared before release.

## Pipeline Notes
- Source assets stay in `web-bundles/assets-source`; only optimized derivatives land in `apps/web/public/assets`.
- Feature 2 (Media Optimization Pipeline) will automate conversion/compression and move heavy assets to Vercel Blob.
- 3D assets remain in source until Blob integration; use placeholders in `public/assets` for dev.
