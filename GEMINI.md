# Project Overview

This is a monorepo for the NMD website, a web application built with Next.js and TypeScript. The project is managed with pnpm and turbo.

The monorepo is structured as follows:

-   `apps/web`: The main Next.js application.
-   `packages/`: Shared packages used by the web application.
    -   `animation`: Animation utilities.
    -   `commerce`: E-commerce functionalities.
    -   `config`: Shared configuration files (ESLint, Prettier, etc.).
    -   `ui`: Shared UI components.

# Building and Running

-   **Install dependencies:**
    ```bash
    pnpm install
    ```
-   **Run in development mode:**
    ```bash
    pnpm dev
    ```
-   **Build for production:**
    ```bash
    pnpm build
    ```
-   **Run tests:**
    ```bash
    pnpm test
    ```
-   **Lint the code:**
    ```bash
    pnpm lint
    ```
-   **Format the code:**
    ```bash
    pnpm format
    ```

# Development Conventions

-   The project uses [ESLint](https://eslint.org/) for linting and [Prettier](https://prettier.io/) for code formatting.
-   The project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.
-   The project uses [Vitest](https://vitest.dev/) for testing.
-   The project uses [Husky](https://typicode.github.io/husky/#/) for pre-commit hooks.
