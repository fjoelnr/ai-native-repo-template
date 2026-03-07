# AGENTS.md

This file is the primary entry point for all coding agents operating in this repository.

## Mission

Build and maintain software through AI-human collaboration with explicit planning, safe execution, and clear handoff.

## Operating rules

1. Read task context and identify the relevant workflow in `.agents/workflows/`.
2. Apply matching skills from `.agents/skills/`.
3. Follow `.agents/guardrails/` before and during implementation.
4. Prefer small, testable changes with clear commit messages.
5. Document assumptions and unresolved risks.

## Required checks before completion

- Code compiles or lints where applicable.
- Tests pass or test gaps are explicitly stated.
- Documentation is updated for behavioral changes.

## Directory map for agents

- Skills: `.agents/skills/`
- Workflows: `.agents/workflows/`
- Guardrails: `.agents/guardrails/`
- Registry: `.agents/registry/`

## Escalation

If a change touches a forbidden zone or violates architecture rules, stop and request human approval.
