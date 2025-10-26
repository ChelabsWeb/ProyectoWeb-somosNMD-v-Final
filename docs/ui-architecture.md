# Project Web NMD Frontend Architecture Document

## Template and Framework Selection
Project Web NMD’s UI is built on the same customized Next.js 16 + Turborepo scaffold described in the main architecture doc. We’re using the App Router (React Server Components), Shadcn UI, Tailwind, and a dedicated `packages/animation` workspace for GSAP/Three timelines. No legacy frontend exists; we’re greenfield but standardizing on this scaffold so AI/dev agents inherit the shared packages, ESLint/Prettier config, and Codex CI/CD hooks established in Epic 1.

### Change Log
| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2024-06-04 | v0.1 | Initial frontend architecture draft | Winston |

## Frontend Tech Stack
| Category | Technology | Version | Purpose | Rationale |
|---|---|---|---|---|
| Framework | Next.js (App Router) | 16.x | SSR/ISR + RSC foundation | Matches backend architecture, ideal for cinematic streaming experiences |
| UI Library | React | 18.3 | Component model + hooks | Native to Next.js, rich ecosystem |
| State Management | React Server Components + Zustand | Native + 4.x | RSC handles data fetching; Zustand manages client-side audio/motion toggles | Lightweight, avoids Redux overhead |
| Routing | Next.js App Router | 16.x | File-based routing, layouts, metadata | Built into framework; supports parallel routes if needed |
| Build Tool | Next.js build (SWC/Turbopack) + Turborepo | SWC 1.x / Turborepo 1.12 | Monorepo tasks, fast builds, code sharing | Consistent with system architecture |
| Styling | Tailwind CSS | 3.4.x | Utility-first styling + theme tokens | Fast iteration on custom visuals; integrates with Shadcn |
| Testing | Vitest + Testing Library + Playwright | Vitest 1.6 / @testing-library/react 14 / Playwright 1.43 | Unit + component + e2e coverage | Matches testing strategy in main architecture |
| Component Library | Shadcn UI | 2024.05 snapshot | Accessible base components themed to “NMD Neon” | Avoids reinventing primitives; fully customizable |
| Form Handling | React Hook Form + Zod Resolver | RHF 7.x | Contact/inquiry UX, validation alignment with API schemas | Minimal re-rendering, matches backend Zod |
| Animation | GSAP + Three.js + Web Audio API helpers | GSAP 3.12 / Three 0.164 | Loader, hero mask, gallery parallax, audio previews | Meets PRD’s cinematic requirements |
| Dev Tools | PNPM + Turborepo + Codex CLI | PNPM 9 / Turborepo 1.12 | Workspace management, scripts, AI agent tooling | Keeps monorepo consistent with CI/CD |

## Project Structure
```plaintext
apps/web/
├── app/
│   ├── (sections)/
│   │   ├── loader/
│   │   ├── hero/
│   │   ├── artists/
│   │   ├── music/
│   │   └── teaser/
│   ├── api/
│   │   ├── contact/route.ts
│   │   └── event/route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                # Shadcn extensions
│   ├── sections/          # Scene-specific shells
│   └── shared/            # Buttons, chips, nav markers
├── hooks/
├── lib/
│   ├── analytics/
│   ├── audio/
│   ├── animation/
│   └── validators/
├── styles/ (globals.css, tokens.css)
└── tests/
    ├── unit/
    └── e2e/

packages/ui/              # Theme tokens + re-exported components
packages/animation/       # GSAP/Three helpers + Zustand stores
packages/commerce/        # Commerce SDK wrappers + queries
packages/config/          # ESLint, Tailwind, TS configs
```

## Component Architecture & Patterns
- **Scene-driven layout:** Each major section (Loader, Hero, Artists, Music, Teaser, Contact) owns its own server component + client wrapper, keeping transitions isolated.
- **Presentation vs. orchestration:** Client components handle GSAP timelines/audio; server components fetch content (e.g., artist metadata MDX).
- **Shared primitives:** Buttons, chips, nav markers, overlays derived from Shadcn and themed via tokens in `packages/ui`.
- **Data flow:** Server components stream data into props; client components subscribe to Zustand stores for playback state, motion toggles, or analytics events.
- **Commerce surfaces:** Merch sections use server components for product queries and client cart store for interactions; checkout handoff uses provider SDK wrappers in packages/commerce.
- **Accessibility hooks:** `useReducedMotionPreference`, `useFocusVisible` ensure cinematic effects always respect user settings.

## State Management
### State Directory Structure
```plaintext
packages/animation/src/state/
    audio-store.ts        # Current track, status, volume
    motion-store.ts       # Reduced-motion flag, parallax toggles
    teaser-store.ts       # Countdown/notify modal state
packages/commerce/src/state/
    cart-store.ts         # Line items, subtotal, checkout URL
```

### State Management Template
```ts
import { create } from 'zustand';

type AudioState = {
  trackId: string | null;
  status: 'idle' | 'playing' | 'paused' | 'error';
  play: (id: string) => void;
  stop: () => void;
};

export const useAudioStore = create<AudioState>((set) => ({
  trackId: null,
  status: 'idle',
  play: (id) => set({ trackId: id, status: 'playing' }),
  stop: () => set({ trackId: null, status: 'idle' }),
));
```

```ts
type CartState = {
  items: Array<{ id: string; title: string; price: number; quantity: number; imageUrl: string; variantId?: string }>;
  subtotal: number;
  checkoutUrl: string | null;
  addItem: (item: CartState['items'][number]) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  setCheckoutUrl: (url: string) => void;
  reset: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  subtotal: 0,
  checkoutUrl: null,
  addItem: (item) => set((state) => {
    const existing = state.items.find((entry) => entry.id === item.id);
    if (existing) {
      return {
        items: state.items.map((entry) =>
          entry.id === item.id ? { ...entry, quantity: entry.quantity + item.quantity } : entry
        ),
        subtotal: state.subtotal + item.price * item.quantity,
      };
    }
    return {
      items: [...state.items, item],
      subtotal: state.subtotal + item.price * item.quantity,
    };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((entry) => entry.id !== id),
    subtotal: state.items
      .filter((entry) => entry.id !== id)
      .reduce((total, entry) => total + entry.price * entry.quantity, 0),
  })),
  setQuantity: (id, quantity) => set((state) => ({
    items: state.items.map((entry) =>
      entry.id === id ? { ...entry, quantity } : entry
    ),
    subtotal: state.items
      .map((entry) => (entry.id === id ? { ...entry, quantity } : entry))
      .reduce((total, entry) => total + entry.price * entry.quantity, 0),
  })),
  setCheckoutUrl: (url) => set({ checkoutUrl: url }),
  reset: () => set({ items: [], subtotal: 0, checkoutUrl: null }),
}));
```

## API Integration
### Service Template
```ts
// apps/web/lib/services/contact.ts
import { ContactPayload, ContactResponse } from '@/lib/types';

export async function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': getCsrfToken() },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const message = res.status === 400 ? 'Please check your details.' : 'Something went wrong.';
    throw new Error(message);
  }

  return res.json();
}
```

### Commerce Client Template
```ts
import { getCommerceClient } from '@nmd/commerce/client';
import { CommerceCart } from '@nmd/commerce/types';

export async function fetchFeaturedMerch(): Promise<CommerceCart['items']> {
  const client = getCommerceClient();
  const { data } = await client.collections.fetchByHandle('featured');
  return data?.products ?? [];
}

export async function startCheckout(lineItems: CommerceCart['items']): Promise<string> {
  const client = getCommerceClient();
  const { data } = await client.checkout.create({ lineItems });
  if (!data?.checkoutUrl) {
    throw new Error('Checkout URL missing');
  }
  return data.checkoutUrl;
}
```

### API Client Configuration
```ts
// apps/web/lib/http/client.ts
export async function post<TData, TResult>(url: string, data: TData): Promise<TResult> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': getCsrfToken(),
    },
    body: JSON.stringify(data),
    cache: 'no-store',
  });

  if (res.status === 429) {
    throw new Error('Too many attempts. Please wait a moment.');
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message ?? 'Unexpected error');
  }

  return res.json();
}
```

## Routing
### Route Configuration
```ts
// apps/web/app/(sections)/artists/page.tsx
export default async function ArtistsSection() {
  const artists = await getArtists(); // RSC data fetch
  return <ArtistsClientSection initialArtists={artists} />;
}

// Example parallel route for overlays if needed
// app/(sections)/@overlay/(...)artist/[slug]/page.tsx
```
Routing relies on anchor navigation + scroll snapping rather than complex path structures. Segment folders keep sections composable, and we can introduce parallel routes (e.g., `@modal`) if overlays need URL states later.

## Styling Guidelines
### Styling Approach
- Tailwind CSS for rapid iteration; custom utilities live in `packages/ui/tailwind.config`.
- CSS variables defined in `styles/tokens.css` for colors, spacing, shadows, and motion intensity.
- Shadcn components themed via `packages/ui/theme.ts` to ensure consistent neon palette.

### Global Theme Variables
```css
:root {
  --color-primary: #eb2c75;
  --color-secondary: #1e6df8;
  --color-accent: #f5c84c;
  --color-bg: #05060e;
  --color-text: #f5f6fb;
  --radius-lg: 32px;
  --space-unit: 8px;
  --shadow-neon: 0 0 32px rgba(235, 44, 117, 0.45);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-scale: 0.4;
  }
}
```

## Testing Requirements
### Component Test Template
```ts
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AudioPreview } from '../audio-preview';

describe('AudioPreview', () => {
  it('plays snippet when clicked', async () => {
    const user = userEvent.setup();
    render(<AudioPreview trackId="track-1" />);

    await user.click(screen.getByRole('button', { name: /preview/i }));

    expect(screen.getByLabelText(/stop preview/i)).toBeInTheDocument();
  });
});
```

### Testing Best Practices
1. **Unit Tests**: Test individual components in isolation  
2. **Integration Tests**: Test component interactions  
3. **E2E Tests**: Test critical user flows (using Playwright)  
4. **Coverage Goals**: Aim for 80% code coverage  
5. **Test Structure**: Arrange-Act-Assert pattern  
6. **Mock External Dependencies**: API calls, routing, state management
7. **Commerce Checkout**: Use provider sandbox APIs and MSW handlers to simulate cart mutations and checkout redirects.

## Environment Configuration
```dotenv
# apps/web/.env.local
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.posthog.com
NEXT_PUBLIC_CONTACT_RATE_LIMIT=5
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=env-managed
POSTHOG_API_KEY=server-key
SHOPIFY_STORE_DOMAIN=nmd-shop.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=env-managed
SHOPIFY_API_VERSION=2024-04
```
Use Vercel env editor for production values; never commit `.env.local`.

## Frontend Developer Standards
### Critical Coding Rules
- Client components must check useReducedMotion() before running motion-intense timelines.
- Commerce requests go through @nmd/commerce utilities; never call provider SDKs directly in components.
- Never call `gsap.to` directly inside server components; wrap in client-only hooks located in `packages/animation`.
- All analytics events go through `useAnalytics().track()` to ensure PostHog schema consistency.
- Form components must use React Hook Form + Zod resolver for validation parity with backend.
- Only import Shadcn components from `packages/ui` to guarantee shared theming.

### Quick Reference
```
Commands:
- pnpm dev            # Next.js dev server
- pnpm lint          # ESLint + Tailwind linting
- pnpm test          # Vitest unit tests
- pnpm test:e2e      # Playwright smoke suite

Key Imports:
import { Button } from '@nmd/ui';
import { useAudioStore } from '@nmd/animation/state/audio-store';
import { submitContact } from '@/lib/services/contact';

File Naming:
- Components: PascalCase (`HeroScene.tsx`)
- Hooks: camelCase with `use` prefix (`useLoaderTimeline.ts`)
- Client components: append `'use client';` at top

Patterns:
- Server components fetch data, pass to `<ClientSection />`
- Client sections compose Shadcn primitives + animation hooks
- Shared tokens live in `packages/ui/theme.ts`
```

