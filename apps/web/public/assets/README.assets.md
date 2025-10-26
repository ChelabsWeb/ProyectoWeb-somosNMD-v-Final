# Project Web NMD Asset Drop Zones

This directory holds development-ready media that the Next.js app can serve directly. Keep originals in `web-bundles/assets-source/` and copy optimized derivatives here.

### Directory Map

- `logo/` – SVG/PNG variants of the NMD logo, plus animated sprites once ready (`logo.svg`, `logo-mask.png`).
- `hero/` – Cinematic hero imagery/video sprites (`hero-desktop.jpg`, `hero-mobile.jpg`, `hero-loop.mp4`).
- `artists/` – Individual portraits or thumbs (`artist-01.jpg`, `artist-01@2x.jpg`, `artist-01-blur.jpg`).
- `music/` – Album artwork, waveform images, audio snippets (`junta-cover.jpg`, `midnight-preview.mp3`).
- `teaser/` – Typography textures, noise loops, teaser-specific media.
- `ui/` – Shared interface assets (nav icons, background textures, gradient overlays).
- `temp/` – Temporary staging area; clear before releases.

3D assets are referenced from Blob/CDN later—use `web-bundles/assets-source/3d` for originals until the pipeline is in place.

