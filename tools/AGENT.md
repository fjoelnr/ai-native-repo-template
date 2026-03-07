# tools/AGENT.md

## Purpose

`tools/` contains scripts and utilities supporting development.

## Rules

1. Scripts should be idempotent when practical.
2. Tools must not contain business logic.
3. Prefer portable scripting approaches.
4. Keep commands deterministic and safe to rerun.

## Common Patterns

- One script per clear responsibility.
- Explicit inputs and outputs.
- Safe defaults with clear failure messages.

## Preferred commands

- Formatting: define one stable command in `tools/` and reference it in docs.
- Linting: keep lint command explicit and non-interactive.
- Tests: provide a single project-level test entry command.
