# AGENTS.md

Primary entry point for all AI agents working in this repository.

## Purpose

Define how agents navigate the repo, execute tasks safely, and collaborate with humans.

## Navigation

- Project overview: `README.md`
- Agent context map: `.agents/context-index.md`
- Registry of configured agents: `.agents/registry/agents.yaml`

## Architecture documentation

- Location: `docs/`
- Suggested starting files:
  - `docs/architecture.md`
  - `docs/README.md`

If architecture docs are missing or outdated, flag this before major changes.

## Workflows

Workflows live in `.agents/workflows/`.

Use:
- `feature-development.md` for new features
- `bugfix.md` for incident and defect resolution

## Skills

Skills live in `.agents/skills/`.

Use:
- `code-review.md` for structured review passes
- `debugging.md` for root-cause analysis and fixes

## Guardrails

Guardrails live in `.agents/guardrails/`.

Always read:
- `architecture-rules.md`
- `forbidden-zones.md`

Escalate to a human reviewer before touching restricted areas.

## Local scripts for quality checks

- Test: `pwsh ./scripts/test.ps1`
- Format: `pwsh ./scripts/format.ps1`

Run both before handing work back for review.
