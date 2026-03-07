# AI Native Repositories (ANR) Positioning

## Overview

AI Native Repositories (ANR) define a repository architecture for AI coding agents.
The goal is to make repositories understandable, navigable, and safe for agent-assisted development.

## Positioning Summary

- `AGENTS.md` -> instruction file for agents
- `ANR` -> repository architecture for context, process, and constraints
- `MCP` -> tool interface for agent access to external capabilities

ANR is the missing layer between agent instructions and external tool execution.

## Relationship to AGENTS.md

`AGENTS.md` is a single instruction entry point.
It is essential, but intentionally lightweight.

ANR builds on `AGENTS.md` and extends it into a full architecture:

- global context (`AGENTS.md`)
- repository map (`.agents/context-index.md`)
- directory-level local context (`*/AGENT.md`)
- reusable skills (`.agents/skills/`)
- workflows (`.agents/workflows/`)
- guardrails (`.agents/guardrails/`)
- machine-readable manifest (`anr.yaml`)

## Relationship to MCP

MCP (Model Context Protocol) standardizes how agents discover and invoke tools.

ANR standardizes how repositories expose context to agents.

Together:

```text
AI Agent
   |
ANR (repository interface)
   |
MCP (tool interface)
   |
tools and services
```

ANR and MCP are complementary, not competing standards.
