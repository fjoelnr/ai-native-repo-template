# AI-Native Repository Template

This repository is a reusable starting point for teams that build software with humans and coding agents working together.

## What is an AI-native repository?

An AI-native repository treats AI agents as first-class contributors.

It stores not only code, but also the operating context agents need:
- workflows for common tasks
- reusable skills for reasoning patterns
- guardrails that define safe boundaries
- governance files for traceable collaboration

## Purpose of this template

This template provides a clean baseline for new projects so teams can:
- onboard agents quickly
- keep agent behavior consistent across tools
- reduce risk with explicit constraints
- scale collaboration without losing review quality

## Human-agent collaboration model

1. Humans define goals, constraints, and acceptance criteria.
2. Agents execute scoped tasks using `.agents/workflows` and `.agents/skills`.
3. Agents follow `.agents/guardrails` and escalate when constraints are violated.
4. Humans review, approve, and merge.

The result is faster iteration with clear accountability.

## How to use this template for a new project

1. Create a new repository from this template.
2. Update `AGENTS.md` with your stack and domain-specific rules.
3. Add architecture docs under `docs/`.
4. Customize skills and workflows to match your engineering process.
5. Configure CI and issue templates under `.github/`.

## Template map

- `.agents/` agent operating model
- `docs/` architecture and project documentation
- `scripts/` test, format, and maintenance scripts
- `templates/` reusable project artifacts
- `.github/` governance and automation
