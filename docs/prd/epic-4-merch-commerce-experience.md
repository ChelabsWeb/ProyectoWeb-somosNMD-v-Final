# Epic 4 Merch Commerce Experience

Goal: Integrate a headless commerce flow so merch can be featured, browsed, and purchased without breaking the cinematic narrative or performance budgets.

### Story 4.1 Merch Showcase & Catalog Integration
As a merch lead,
I want a storefront section that highlights featured drops within the cinematic flow and lists the full catalog,
so that fans can browse and add products to their cart without leaving the experience.
#### Acceptance Criteria
1: Commerce or CMS backend exposes product data (name, price, variants, media) and hydrates Next.js RSCs with ISR caching.
2: Featured merch tiles can be embedded in hero/teaser scenes while the full catalog lives in a dedicated section or modal.
3: Product detail overlays display sizing guides, availability, and related items with motion that respects accessibility.
4: Analytics events capture product views and add-to-cart actions with SKU metadata.

### Story 4.2 Cart State & Checkout Handoff
As a shopper,
I want to manage my cart and complete checkout confidently,
so that I can purchase merch through the headless provider using familiar payment methods.
#### Acceptance Criteria
1: Client-side cart store supports add/remove/update quantity with persistence across navigation.
2: Checkout button triggers provider-hosted checkout or secure API flow that meets PCI requirements.
3: Error states (inventory mismatch, payment failure) surface clear feedback and recovery actions.
4: Post-checkout confirmation routes users back with order summary and tracking guidance.

### Story 4.3 Merch Operations & Telemetry
As an operations analyst,
I want inventory sync, order webhooks, and conversion dashboards,
so that the collective can understand demand and support customers.
#### Acceptance Criteria
1: Webhooks or scheduled jobs refresh inventory/pricing in cache without full redeploys.
2: Product analytics records cart -> checkout -> purchase funnel with revenue metrics in PostHog (or equivalent).
3: Admin alerts notify the team when inventory is low or webhook processing fails.
4: Documentation outlines support process for refunds/exchanges and links to commerce admin tooling.
