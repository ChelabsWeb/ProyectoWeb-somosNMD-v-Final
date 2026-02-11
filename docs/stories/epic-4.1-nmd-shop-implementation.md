# Story 4.1 NMD Shop Implementation

**Status:** Draft
**Epic:** Epic 4 NMD Shop Experience

## Story
As a visitor,
I want a centralized shop page with clear segments for Merch, Furniture, and Beats,
so that I can easily browse the collective's diverse offerings and preview beats in a specialized interface.

## Acceptance Criteria
- [ ] New `/shop` page with HUD-inspired header and navigation.
- [ ] Tab/Segment system for "Merch", "Furniture", and "Beats".
- [ ] ProductGrid for Merch and Furniture with cinematic cards.
- [ ] "Beatstars-style" BeatList with waveform previews and track info.
- [ ] Global/Mini BeatPlayer that syncs with the list.
- [ ] Persistent Cart state with CartOverlay.
- [ ] "Shop" link in QuickNavMenu.

## Tasks
- [ ] Create `/shop` page and layout components.
- [ ] Implement `ShopSegmentController` and `ShopHeader`.
- [ ] Implement `ProductGrid` and `ProductCard`.
- [ ] Implement `BeatList` and `BeatItem`.
- [ ] Implement `BeatPlayer` and audio context for beats.
- [ ] Implement `CartOverlay` and cart logic (Zustand or React state).
- [ ] Update `QuickNavMenu` links.

## Testing
- [ ] Verify responsive behavior on all shop segments.
- [ ] Verify audio playback logic (exclusive play) in BeatList.
- [ ] Verify cart persistence and item grouping.

## Dev Notes
- Use `PageShell` for cinematic effects.
- Reuse `ArtistCard` aesthetic for product cards.
- Use `Lenis` for smooth horizontal or vertical scrolling as needed.
