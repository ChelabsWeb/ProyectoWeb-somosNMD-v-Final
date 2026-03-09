---
name: tailwind-dry-refactor
description: Refactors repetitive inline Tailwind CSS classes (like long repetitive shadows, borders, or layout strings) across a project into global DRY CSS tokens in globals.css using @layer components and @apply.
---

# `tailwind-dry-refactor` Instructions

This skill enables the agent to act as a Tailwind CSS Architect to identify and extract "Code Smells" of overly long, repeated inline Tailwind classes into reusable, global semantic utility classes (tokens) to keep the codebase DRY (Don't Repeat Yourself).

## When to use this skill
- When the user asks to extract, refactor, or clean up repetitive Tailwind CSS classes.
- When you detect long "kilometric" utility classes repeated identically across multiple components (e.g., complex shadows like `shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-y-1`).
- When the user requests to create global CSS tokens, components, or utilities for their design system (like brutalist UI elements, custom cards, or buttons).

## How to use it
When applying this skill, strictly follow these steps:

1. **Identify the Target Classes**: Use `grep_search` to find instances of the repeated inline Tailwind classes in the project files (e.g., `src/components/`, `app/`).
2. **Define the Semantic Name**: Choose a semantic, clear class name for the new utility (e.g., `.card-brutalist`, `.btn-primary`).
3. **Inject Global Tokens**:
   - Locate the main CSS file (usually `globals.css` or `index.css`).
   - Find or create an `@layer components { ... }` block.
   - Use the `@apply` directive inside the semantic class block to define the token. Example:
     ```css
     @layer components {
       .card-brutalist {
         @apply border-2 border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 rounded-none;
       }
     }
     ```
4. **Refactor the Codebase**: 
   - Use `multi_replace_file_content` or `replace_file_content` to replace the long string of inline classes with the new semantic token in all affected `.tsx`, `.jsx`, or `.html` files.
   - For interactive elements like disabled buttons, make sure to add specific states in the global CSS (e.g. `.btn-brutalist:disabled { @apply ... }`).
5. **Verify and Report**: Inform the user about the changes, showing a Before/After snippet of the refactoring to demonstrate the cleaner, DRY codebase.

## Additional Rules
- Always preserve the exact styling behavior when creating the `@apply` token; do not accidentally drop responsive prefixes (`md:`, `lg:`) unless you plan on putting them inside the token explicitly via media queries.
- Never delete the `globals.css` imports like `@tailwind base; @tailwind components; @tailwind utilities;`.
- Consider creating variants if components slightly differ (e.g., `.card-brutalist` vs `.card-brutalist-sm`).
