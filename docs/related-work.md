# Related Work

This document explains how ANR relates to existing conventions for guiding coding agents.

## Existing concepts

### AGENTS.md

`AGENTS.md` defines instructions for coding agents in a repository.
It is currently the most widely used open standard for guiding agent behavior.

### CLAUDE.md

`CLAUDE.md` is a tool-specific instruction convention used in Claude Code setups.
It usually captures project guidance for Claude-based agents.

### .cursorrules

`.cursorrules` is a Cursor-specific rule file that provides agent instructions inside Cursor workflows.

### Agent Skills

Skills are reusable task patterns (for example code review, debugging, refactoring) that can be invoked across projects.

## ANR vs AGENTS.md

`AGENTS.md` is a single instruction file.

ANR builds on that foundation and introduces a full repository architecture layer including:

- skills
- workflows
- guardrails
- context index
- manifest (`anr.yaml`)

In short:

- `AGENTS.md` explains baseline behavior.
- ANR defines how the whole repository is structured for consistent human-agent collaboration.
