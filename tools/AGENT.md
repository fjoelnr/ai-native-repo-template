# tools/AGENT.md

## Purpose

`tools/` contains developer scripts and utility helpers.

## Rules

1. Scripts should be idempotent where practical.
2. Keep business logic out of tooling.
3. Prefer portable script choices and explicit arguments.

## Common patterns

- One script per responsibility
- Safe defaults with clear error output
- Predictable inputs and outputs
