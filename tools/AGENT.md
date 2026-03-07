# tools/AGENT.md

## Purpose

`tools/` contains scripts and utilities supporting development.

## Rules

1. Scripts should be idempotent when practical.
2. Tools must not contain business logic.
3. Prefer portable scripting approaches.

## Common Patterns

- One script per clear responsibility.
- Explicit inputs and outputs.
- Safe defaults with clear failure messages.
