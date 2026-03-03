import { test as base } from '@playwright/test';

// Extend base test by providing custom fixtures.
export const test = base.extend<{
  standardUser: void;
}>({
  standardUser: async ({ page }, use) => {
    // Scaffold for when authentication is needed.
    // For now we just yield.
    await use();
  },
});

export { expect } from '@playwright/test';
