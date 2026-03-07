# Related Work

This document summarizes adjacent conventions and standards in the AI coding agent ecosystem.

## AGENTS.md

`AGENTS.md` is currently the most widely used open standard for guiding coding agents at repository level.
It provides a common, discoverable instruction file for agent behavior.

Strength:
- simple and portable

Limitation:
- single-file guidance without full repository architecture

## CLAUDE.md

`CLAUDE.md` is a tool-specific instruction pattern used in Claude-oriented workflows.
It provides useful local guidance but is not a cross-tool architecture standard.

## Cursor Rules (`.cursorrules`)

Cursor rules are editor/tool-specific directives for Cursor sessions.
They improve behavior within Cursor, but are not a general repository-wide architecture.

## Model Context Protocol (MCP)

MCP is an open standard for connecting AI systems to tools and data sources.
It addresses tool discovery and invocation across services.

MCP defines the **tool interface layer**.
It does not define how repositories structure agent context internally.

## ANR Position

ANR builds on `AGENTS.md` and extends it into a repository architecture with:

- context index
- directory-level context files
- skills
- workflows
- guardrails
- manifest (`anr.yaml`)

In short:

- `AGENTS.md` -> instruction file
- `MCP` -> tool interface
- `ANR` -> repository architecture for agent-native development

## Comparison Table

| Approach | Primary Scope | Strength | Limitation |
|---|---|---|---|
| AGENTS.md | Repository instruction file | Simple, open, widely adopted | Single-file guidance only |
| Tool-specific rules (`CLAUDE.md`, `.cursorrules`) | Tool/editor-local behavior | Good local optimization | Not cross-tool architecture |
| Model Context Protocol (MCP) | Tool interface layer | Standardized tool discovery/invocation | Does not define repository context architecture |
| AI Native Repositories (ANR) | Repository architecture layer | Layered context + workflows + guardrails + manifest | Still evolving, requires adoption discipline |

ANR builds on AGENTS.md and complements MCP:
- AGENTS.md provides baseline repository guidance.
- MCP provides the tool integration interface.
- ANR structures the repository itself for agent-native operation.
