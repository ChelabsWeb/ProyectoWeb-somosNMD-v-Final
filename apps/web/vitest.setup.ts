import { afterEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// Mock server-only so it doesn't crash JSDOM tests
vi.mock("server-only", () => ({}));

// Provide a deterministic WEBHOOK_SECRET for all test runs. Production code now
// throws when this env var is missing (see apps/web/src/lib/services/security.ts);
// tests that exercise that throw explicitly delete the var in their own scope.
if (!process.env.WEBHOOK_SECRET) {
  process.env.WEBHOOK_SECRET = "test_secret_key_do_not_use_in_production";
}

afterEach(() => {
  vi.restoreAllMocks();
});
