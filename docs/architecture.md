# Architecture

## What is an AI-native repository?

An AI-native repository is structured so coding agents and humans can collaborate reliably.
It provides explicit context, repeatable workflows, and guardrails that reduce unsafe changes.

## How agents interact with this repository

1. Read `AGENTS.md` for core rules and structure.
2. Use `.agents/context-index.md` to navigate relevant files.
3. Follow workflows in `.agents/workflows/`.
4. Apply reusable skills in `.agents/skills/`.
5. Respect constraints in `.agents/guardrails/` and request human review when required.

## How to use this template for a new project

1. Keep the directory structure (`src/`, `tests/`, `tools/`, `docs/`, `.agents/`).
2. Replace placeholder files with project-specific implementation and tests.
3. Adapt workflows, skills, and guardrails to your domain.
4. Add module-level context files using `templates/module-agent.md`.
