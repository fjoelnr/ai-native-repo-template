# AI Native Repositories: A Repository Architecture for AI Coding Agents

## Abstract

Recent advances in AI coding agents have transformed software development workflows. Tools such as Codex, Copilot, Cursor, and Claude Code increasingly operate directly within software repositories: modifying code, running tests, and implementing changes.

However, modern repositories were designed primarily for human developers, not autonomous or semi-autonomous agents.

This mismatch causes recurring problems: missing structured context, inconsistent instruction conventions, duplicated setup across tools, and limited interoperability.

Recent conventions such as `AGENTS.md` partially address the issue by introducing a standard location for repository-level guidance. Yet a single instruction file is not, by itself, a full repository architecture.

This paper introduces **AI Native Repositories (ANR)**: a repository architecture that organizes contextual knowledge, workflows, safety constraints, and machine-readable metadata for coding agents.

ANR builds on existing practices (including `AGENTS.md`) and complements the Model Context Protocol (MCP). MCP standardizes tool access; ANR standardizes repository context. Together, these layers form a practical foundation for agent-native software development environments.

## 1. Introduction

AI coding agents are rapidly becoming integral to development workflows. They can analyze repositories, implement features, run tests, and refactor systems.

Yet most repositories remain optimized for human implicit knowledge: architecture boundaries, build commands, testing expectations, and risk constraints are often undocumented or fragmented.

As a result, agents reconstruct context via exploration and repeated prompting, which increases variance and failure risk.

`AGENTS.md` has emerged as a useful repository-level guidance mechanism. It is often described as a “README for agents.” While effective, it does not define a complete architecture for agent-operated repositories.

## 2. Related Work

### 2.1 AGENTS.md

`AGENTS.md` is a lightweight, open convention for repository-level agent guidance. Typical contents include repository structure, conventions, commands, and constraints.

Strengths:
- simple and portable
- easy to adopt
- discoverable by agents

Limitations:
- single-file scope
- no formal architecture for layered context
- no built-in model for reusable workflows/skills
- no machine-readable repository contract by default

### 2.2 Tool-Specific Instruction Files

Patterns such as `CLAUDE.md` and `.cursorrules` provide valuable tool-local behavior tuning. They improve outcomes within specific environments, but they are not a cross-tool repository architecture standard.

### 2.3 Model Context Protocol (MCP)

MCP is an open standard for connecting AI systems to tools and data sources. It standardizes discovery and invocation of external capabilities.

MCP defines a **tool interface layer**.
It does not define how repositories should expose internal context and constraints to agents.

## 3. The Missing Layer

Current practice leaves a structural gap:

How should repositories expose persistent, layered, and auditable context to AI coding agents?

Neither single-file guidance nor tool interface protocols fully answer this.

## 4. AI Native Repositories (ANR)

ANR defines a repository architecture optimized for coding agents and human collaboration.

### 4.1 Global Context

`AGENTS.md` provides top-level goals, constraints, and operating expectations.

### 4.2 Repository Map

`.agents/context-index.md` provides a navigable map of major repository areas and context entry points.

### 4.3 Local Context

Directory-level `AGENT.md` files (for example `src/AGENT.md`, `tests/AGENT.md`, `tools/AGENT.md`) provide localized rules and patterns.

### 4.4 Reusable Reasoning Modules

`.agents/skills/` stores reusable reasoning procedures (for example review, debugging, refactoring).

### 4.5 Development Procedures

`.agents/workflows/` defines structured procedures for common tasks (for example feature development, bugfix, migration).

### 4.6 Safety Constraints

`.agents/guardrails/` encodes architecture invariants, restricted zones, and review constraints.

## 5. Machine-Readable Repository Interface

ANR introduces a manifest (`anr.yaml`) as a machine-readable repository contract.

The manifest can describe:
- repository metadata
- context entry points
- structural directories
- available components (skills/workflows/guardrails)
- supported capabilities (for example migration, validation)

This reduces discovery ambiguity and supports automation-safe tooling.

## 6. Migration of Existing Repositories

ANR is designed for incremental adoption in existing repositories.

Typical migration prompt:

`Convert this repository to ANR.`

Expected migration sequence:
1. analyze existing structure
2. generate global context (`AGENTS.md`)
3. create repository map and local context files
4. define workflows and guardrails
5. validate compliance

This migration-first model is critical because most production repositories are brownfield systems.

## 7. Relationship to MCP

ANR and MCP are complementary layers:

```text
AI Agent
   |
ANR (repository interface)
   |
MCP (tool interface)
   |
external tools and services
```

MCP standardizes how agents call tools.
ANR standardizes how repositories provide context.

## 8. Research Directions

Potential research and publication directions:
- controlled studies comparing agent task outcomes with and without ANR
- measurement of prompt repetition reduction
- defect-rate and review-quality impact under ANR adoption
- interoperability evaluations across Codex, Cursor, Copilot, and Claude
- formalization of ANR compliance levels and benchmark suites

## 9. Conclusion

AI coding agents require structured repository context to operate reliably.

AI Native Repositories provide a practical architecture for making repositories agent-operable without abandoning human readability.

By building on `AGENTS.md` and complementing MCP, ANR offers a path toward standardized, tool-agnostic, agent-native software development.
