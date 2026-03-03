---
name: clone-design-system
description: Analyzes a target website URL to extract its design system and UI patterns, then generates a consistent, responsive, and professional design system for the current project, including mobile considerations and component cloning. Use when the user requests to clone a UI from a URL or asks for UI inspiration from a specific site.
---

# `clone-design-system` Instructions

Your purpose is to act as an expert UI/UX Engineer and Frontend Developer. When the user provides a URL for UI/UX inspiration, your goal is to extract its design patterns, colors, typography, component structures, and functionalities, and apply them to the current project's design system thoughtfully and professionally.

## When to use this skill
Use this skill when the user asks to:
- Clone a design system or UI from a specific URL.
- Get inspiration from a reference website and apply its UI/UX to the current project.
- Modify the existing app's styling to match a target URL's aesthetics and functionalities.

## How to use it
1. **Analyze the Target URL**:
    - Use the `browser_subagent` to visit the target URL.
    - Instruct the subagent to inspect the styling details: Color palette (primary, secondary, background, text, accents), Typography (font families, sizes, weights), Spacing & Layout patterns, and Shadow/Border Radius styles.
    - Instruct the subagent to observe the responsive behavior (mobile layout vs desktop layout).
    - Identify key UI components: Buttons, form inputs, navigation bars, cards, and modals.
    - Observe interactive functionalities (hover effects, active states, transitions, animations).

2. **Define the Design System Architecture**:
    - Based on the extracted data, map out the **Design Tokens**: Colors, Typography sizes/scales, Spacing scale, and Breakpoints.
    - Plan how to integrate these tokens into the project's existing styling approach (e.g., updating CSS variables in `index.css`, `globals.css`, or modifying Tailwind configurations).

3. **Implement the Foundation**:
    - **Global Styles & Tokens**: Update global CSS files with the new variables. Ensure high-quality, professional naming conventions.
    - **Typography**: Apply the extracted typography scheme, ensuring readability, hierarchy, and sufficient contrast for accessibility.
    - **Responsive Layouts**: Establish strict breakpoints for Mobile, Tablet, and Desktop. Start with a mobile-first philosophy, ensuring the foundation naturally adapts to larger screens.

4. **Clone UI Components and Functionality**:
    - Re-create the identified core components within the project's framework (e.g., React `tsx` files, Vue, etc.).
    - Accurately reproduce the interactive behaviors (hover dynamics, focus rings, smooth transitions, micro-animations).
    - Ensure components are fully responsive out-of-the-box (e.g., elements wrapping correctly, paddings adjusting for mobile).

5. **Review & Refine**:
    - Verify that the modified UI feels cohesive and premium across all pages.
    - Rigorously check the mobile version: ensure mobile menus work, touch targets are adequate, and spacing is comfortable on small screens.

## Additional Rules
- **Aesthetics are Critical**: The resulting design MUST be premium and avoid looking generic. Apply smooth gradients, glassmorphism, or sleek dark modes if they match the source.
- **Responsiveness is Mandatory**: Never deliver a design that only looks good on a desktop. Mobile coherence is a top priority.
- **Intelligent Adaptation**: Do NOT just blindly copy HTML structure. Adapt the visual language of the inspiration to the actual components, content, and framework of the current project.
