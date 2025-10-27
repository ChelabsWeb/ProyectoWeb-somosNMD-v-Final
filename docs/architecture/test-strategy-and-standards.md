# Test Strategy and Standards

### Testing Philosophy
- **Approach:** Test-after with emphasis on critical motion logic + APIs; snapshot/visual tests for GSAP sequences.  
- **Coverage Goals:** ≥80% for utilities/API routes, ≥60% for animation helpers (harder to unit test).  
- **Test Pyramid:** 65% unit, 25% integration (Playwright component/route tests), 10% e2e cinematic journeys.

### Unit Tests
- **Framework:** Vitest 1.6  
- **File Convention:** `*.test.ts` adjacent to source (e.g., `useAudioPreview.test.ts`).  
- **Location:** Inside feature folders or `packages/*`.  
- **Mocking Library:** Built-in Vitest mocks + MSW for fetch stubs.  
- **Coverage Requirement:** 80% statements/branches in targeted modules.

### Integration Tests
- **Scope:** Next.js route handlers, Supabase interactions, animation hooks with mocked DOM.  
- **Location:** `tests/integration`.  
- **Test Infrastructure:**  
  - **Supabase:** Supabase CLI local instance via Docker.  
  - **PostHog:** Mock server (MSW).  
  - **Audio Previews:** Stubbed Web Audio API (jest-web-audio-mock).

### End-to-End Tests
- **Framework:** Playwright 1.43  
- **Scope:** Cinematic entry, artist exploration, music previews on mobile + desktop, contact form submission.  
- **Environment:** Vercel Preview deployments seeded with mock assets.  
- **Test Data:** YAML fixtures for artist data; environment toggle for API mocks.

### Test Data Management
- **Strategy:** Use fixture JSON/MDX for artists and YAML for tracklists; PostHog events mocked during tests.  
- **Fixtures:** `tests/fixtures/*`.  
- **Factories:** `tests/factories/inquiryFactory.ts` for generating submissions.  
- **Cleanup:** Supabase test DB truncated after each suite via CLI command.

### Continuous Testing
- **CI Integration:** Codex pipeline stages (lint → unit → integration → e2e smoke on preview).  
- **Performance Tests:** Lighthouse CI on hero + gallery pages per preview.  
- **Security Tests:** `npm audit` + `pnpm dlx depcheck`, optional Snyk scan weekly.
