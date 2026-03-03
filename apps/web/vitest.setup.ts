import { afterEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// Mock server-only so it doesn't crash JSDOM tests
vi.mock("server-only", () => ({}));

afterEach(() => {
  vi.restoreAllMocks();
});
