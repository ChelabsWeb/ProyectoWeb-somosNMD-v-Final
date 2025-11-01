# Loader Integration Notes

- Loader is rendered globally from `apps/web/src/components/sections/LoaderSection.tsx` and overlays the viewport (`position: fixed`, z-index above content).
- It listens for readiness signals in priority order: a) `app:ready` custom event (dispatch via `markAppReady()`), b) `window.load`, c) fallback timeout (`FALLBACK_TIMEOUT_MS`), and will also re-show on bfcache `pageshow`.
- Use `markAppReady()` from `apps/web/src/lib/app-ready.ts` (e.g., `AppReadySignal` component) once hydration + required data are ready; this keeps the loader in sync with actual readiness.
- Scroll is locked (`body.style.overflow = "hidden"`) only while the loader is visible; it unlocks when the fade-out completes.
- Animations respect `prefers-reduced-motion`; logger output can be enabled by passing `{ log: true }` to `markAppReady`.
