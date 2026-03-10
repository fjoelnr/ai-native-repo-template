# AGENTS.md

## Purpose

This repository is the ANR reference template.
It demonstrates how a repository becomes readable to AI coding agents through persistent structure instead of repeated prompting.

## Repository map

- `src/` application code
- `tests/` automated tests
- `tools/` scripts and utilities
- `docs/` project documentation
- `.agents/` workflows, skills, and guardrails
- `templates/` reusable context templates

## Context hierarchy

1. `AGENTS.md` (global context)
2. nearest `*/AGENT.md` (directory context)
3. `.agents/workflows/` (procedures)
4. `.agents/skills/` (reasoning patterns)
5. `.agents/guardrails/` (constraints)

## Working rules

- Keep this file short. It is repo memory, not a knowledge dump.
- Put detailed truth in local `AGENT.md` files and `docs/`.
- Keep workflows reusable and guardrails explicit.

## Locations

- Workflows: `.agents/workflows/`
- Skills: `.agents/skills/`
- Guardrails: `.agents/guardrails/`
