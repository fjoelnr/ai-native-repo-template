# tools/AGENT.md

## Purpose

`tools/` contains developer scripts and utility helpers.

## Rules

1. Scripts should be idempotent where practical.
2. Keep business logic out of tooling.
3. Prefer portable script choices and explicit arguments.
4. Prefer compact output that answers the task before emitting full logs or large reports.

## Common patterns

- One script per responsibility
- Safe defaults with clear error output
- Predictable inputs and outputs
- Failure summaries before full output
- Grouped or deduplicated repeated errors
- Raw-output recovery through a file path or rerun command when full detail is needed

## Context efficiency

When a tool may produce large output, design or invoke it so the agent sees the smallest useful result first.

Examples:

- show failing tests before passing tests
- count or group search hits before printing every match
- summarize generated reports before pasting full report bodies
- reference saved raw output when the summary is insufficient

External helpers such as `rtk` or `context-mode` can be useful runtime integrations, but ANR Core must not depend on them.
