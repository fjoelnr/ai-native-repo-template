# tests/AGENT.md

## Purpose

`tests/` verifies behavior and prevents regressions.

## Rules

1. New features or bug fixes should include tests.
2. Tests must be deterministic and isolated.
3. Avoid network and time dependencies unless controlled.

## Common Patterns

- Arrange-Act-Assert structure.
- Focus on behavior, not implementation detail.
- Name tests by expected outcome.
