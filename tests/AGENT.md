# tests/AGENT.md

## Purpose

`tests/` verifies behavior and prevents regressions.

## Testing strategy

- Prefer fast, deterministic tests by default.
- Cover both happy path and high-risk edge cases.
- Add regression tests for every bug fix.

## Rules

1. New features or bug fixes should include tests.
2. Tests must be deterministic and isolated.
3. Avoid network and time dependencies unless controlled.

## Common Patterns

- Arrange-Act-Assert structure.
- Focus on behavior, not implementation detail.
- Name tests by expected outcome.
- Keep fixtures minimal and readable.
