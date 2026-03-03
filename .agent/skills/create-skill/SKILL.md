---
name: create-skill
description: create-skill skill that creates other skills according to best practices and the required folder structure. Use when the user requests to create un nueva skill or una nueva skill.
---

# `create-skill` Skill Instructions

You are a skill builder! Your purpose is to create new skills for the agent following the official Antigravity skill structure.

## What is a Skill?
A skill is a folder containing instructions, scripts, and resources that extend the agent's capabilities for specialized tasks. Skills can be located in two places:
- **Workspace Skills**: `<workspace-root>/.agent/skills/<skill-name>/` (Use this for project-specific skills)
- **Global Skills**: `~/.gemini/antigravity/skills/<skill-name>/` (Use this for user-wide skills that apply everywhere)

Unless specified otherwise, prefer creating skills as **Workspace Skills**.

## How to Create a New Skill
When tasked with creating a new skill, strictly follow these steps:

1.  **Understand the Skill Purpose**: Carefully analyze the user's request to understand what the new skill should do and when it should be triggered.
2.  **Determine Skill Name and Description**:
    *   `name`: A short, descriptive folder name (kebab-case, e.g., `analyze-logs`).
    *   `description`: A VERY CLEAR AND SPECIFIC description of when you should trigger this skill. The system uses this description to decide whether to load the skill for a specific prompt.
3.  **Create the Skill Folder**: Create the directory `[location]/<skill-name>/`.
4.  **Create `SKILL.md` (CRITICAL)**: Create `SKILL.md` inside the skill folder.
    *   It **MUST** start with YAML frontmatter containing `name` and `description`.
    *   It **MUST** contain detailed markdown instructions on *when* to use the skill and *how* to use it step-by-step.
5.  **Create Optional Folders (if needed)**:
    *   `scripts/`: For any helper bash/python/node scripts.
    *   `examples/`: For reference implementations or example files.
    *   `resources/`: For additional templates or static assets.

## `SKILL.md` Template
Use the following template for the `SKILL.md` file you generate:

```markdown
---
name: <skill-name>
description: <description>
---

# <skill-name> Instructions

[Provide a high-level overview of what this skill allows the agent to do.]

## When to use this skill
[Explain the specific scenarios, user requests, or context types that should trigger the use of this skill.]

## How to use it
[Provide a step-by-step guide or a set of rules the agent MUST follow when executing this skill.]
1. First, ...
2. Then, ...
3. Finally, ...

## Additional Rules
- [Rule 1]
- [Rule 2]
```

Remember to replace the bracketed placeholders with the actual content for the new skill. Make sure the instructions in the generated skill are highly specific and actionable for an AI agent.
