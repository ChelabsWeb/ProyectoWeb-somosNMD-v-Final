# End-to-End Testing (Playwright)

This directory contains the End-to-End (E2E) testing framework for the project, powered by [Playwright](https://playwright.dev/).

## Structure

- `e2e/`: Contains all full end-to-end test specifications.
- `support/fixtures/`: Playwright fixtures extending the base test context (e.g., auth states, custom page objects).
- `support/helpers/`: Utility functions used across tests (e.g., layout verification, data factories).

## Running Tests

From the monorepo root:

```bash
# Run all E2E tests in headless mode
npm run test:e2e

# Run tests with the Playwright UI mode (great for debugging)
npx playwright test --ui

# Run a specific test file
npx playwright test tests/e2e/example.spec.ts

# Generate and view HTML report (automatically saves on failure)
npx playwright show-report
```

## Best Practices

1. **Isolation**: Tests should never depend on the state left by another test.
2. **Selectors**: Prefer user-facing attributes (`getByRole`, `getByText`) or explicit `data-testid` attributes over brittle CSS selectors.
3. **Clean Up**: If a test creates data, it should ideally clean it up (or use an isolated environment where data teardown happens automatically).
4. **Fixtures over BeforeAll**: Use Playwright fixtures instead of `beforeAll`/`beforeEach` for better encapsulation and parallel execution safety.

## CI Integration

Tests are configured to run automatically in CI. On failure, trace zip files, screenshots, and videos are retained as artifacts for debugging. Local executions only retain these on failure by default.
