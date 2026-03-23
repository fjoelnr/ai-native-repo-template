# ANR Research Direction

ANR is an active experiment in agent-native repository design.

## Research Question

How should software repositories expose structured context so AI coding agents can work reliably across tools?

## Current Hypothesis

Repositories need a layered architecture:

- global context
- local context
- reusable reasoning modules
- repeatable workflows
- explicit guardrails
- machine-readable metadata

ANR is a concrete implementation of this hypothesis.

## Validation Directions

Potential evaluation paths:

- compare task success rates with and without ANR structure
- measure reduction in repeated prompting
- measure defect rate changes under agent-assisted workflows
- evaluate portability across Codex, Cursor, Copilot, and Claude

## Publication and Ecosystem Direction

Possible next steps:

- release ANR case studies from real repositories
- publish formal ANR specification updates
- share migration benchmarks
- align ANR repository interface with MCP-based tool ecosystems
- define ANR runtime, memory, and evaluation extensions beyond the current file layout
- package reusable skills and workflows through a registry model

ANR is positioned as an open, iterative research track for practical agent-native software development.

See also:

- [ANR Evolution](anr-evolution.md)
- [ANR v0.2 Specification Proposal](anr-v0.2-spec.md)
- [Agentic Patterns Mapping](agentic-patterns-mapping.md)
