# AGENTS.md

## Project purpose

This repository is the ANR v0.1 quickstart template for AI-native projects.
It provides persistent context so coding agents and humans can collaborate predictably.

## Repository map

- `src/` application code
- `tests/` automated tests
- `tools/` scripts and utilities
- `docs/` project documentation
- `.agents/` workflows, skills, and guardrails
- `templates/` reusable context templates

## Agent context hierarchy

1. `AGENTS.md` (global context)
2. nearest `*/AGENT.md` (directory context)
3. `.agents/workflows/` (procedures)
4. `.agents/skills/` (reasoning patterns)
5. `.agents/guardrails/` (constraints)

## Locations

- Workflows: `.agents/workflows/`
- Skills: `.agents/skills/`
- Guardrails: `.agents/guardrails/`
