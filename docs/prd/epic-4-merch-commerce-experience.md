# Epic 4 NMD Shop Experience

Goal: Integrate a headless commerce flow and a bespoke shop interface segmented into Merch, Furniture, and Beats, maintaining the collective's cinematic aesthetic and high performance.

### Story 4.1 NMD Shop Landing & Segmentation
As a visitor,
I want a centralized shop page with clear segments for Merch, Furniture, and Beats,
so that I can easily browse the collective's diverse offerings.
#### Acceptance Criteria
1: New `/shop` page with a HUD-inspired header and smooth transitions between segments.
2: Navigation includes Tabs or a Filter system for "Merch", "Furniture", and "Beats".
3: Aesthetic remains consistent with the site (dark mode, grain, particles, HUD elements).
4: "Shop" link added to the `QuickNavMenu`.

### Story 4.2 Merch & Furniture Showcase
As a collector,
I want to see high-quality images and details for NMD merch and furniture pieces,
so that I can appreciate the design before purchasing.
#### Acceptance Criteria
1: Product grid for Merch and Furniture with hover effects and cinematic reveals.
2: Product detail overlays with size guides (for merch) and material info (for furniture).
3: Integrated "Add to Cart" functionality with local state management.

### Story 4.3 NMD Beats (Beatstars Style)
As a producer/artist,
I want a specialized section to browse and preview NMD beats in a "Beatstars" style,
so that I can find the perfect track for my project.
#### Acceptance Criteria
1: Beats list with track artwork, title, producer, BPM, Key, and tags.
2: Audio player with waveform visualization and playback controls.
3: Price selection (Basic, Premium, Unlimited) and "Add to Cart" button per track.
4: Featured beats carousel or highlight section.

### Story 4.4 Checkout & Cart Management
As a shopper,
I want to manage my cart and checkout securely,
so that I can complete my purchase of physical items and digital beats.
#### Acceptance Criteria
1: Global cart state (persistent) with clear distinction between physical and digital items.
2: Checkout handoff to a secure provider (simulated or integrated if keys provided).
3: Order confirmation and download links for purchased beats.


