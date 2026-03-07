# AI Native Repository Compliance Checklist (ANR v0.1)

This checklist helps determine whether a repository follows the
AI Native Repository Specification.

A repository that passes all required checks can be considered
ANR-compatible.

## 1. Global Agent Context

### Required

- [ ] `AGENTS.md` exists at repository root
- [ ] `AGENTS.md` explains project purpose
- [ ] `AGENTS.md` contains a repository map
- [ ] `AGENTS.md` references workflows, skills, and guardrails

### Recommended

- [ ] `AGENTS.md` includes examples of preferred patterns
- [ ] `AGENTS.md` includes safety or permission rules

## 2. Repository Navigation

### Required

- [ ] `.agents/context-index.md` exists
- [ ] context-index lists main directories
- [ ] context-index links to workflows, skills, guardrails

### Recommended

- [ ] context-index links to directory-level `AGENT.md` files

## 3. Required Directory Structure

### Required

- [ ] `src/` directory exists
- [ ] `tests/` directory exists
- [ ] `tools/` directory exists
- [ ] `docs/` directory exists
- [ ] `.agents/` directory exists

## 4. Directory-Level Agent Guides

### Recommended

- [ ] `src/AGENT.md` exists
- [ ] `tests/AGENT.md` exists
- [ ] `tools/AGENT.md` exists
- [ ] `docs/AGENT.md` exists

Each file should define:

- purpose of directory
- rules for working in that directory
- common patterns

## 5. Agent Skills

### Required

- [ ] `.agents/skills` directory exists

### Recommended

- [ ] at least one reusable skill exists
- [ ] skills describe reasoning procedures

Example skills:

- `code-review`
- `debugging`
- `refactoring`

## 6. Agent Workflows

### Required

- [ ] `.agents/workflows` directory exists

### Recommended

- [ ] feature-development workflow exists
- [ ] bugfix workflow exists

Workflows should contain step-by-step procedures.

## 7. Guardrails

### Required

- [ ] `.agents/guardrails` directory exists

### Recommended

- [ ] architecture rules defined
- [ ] restricted directories defined

## 8. Documentation

### Required

- [ ] `docs/architecture.md` exists

### Recommended

- [ ] repository model explained
- [ ] agent context hierarchy documented

## 9. Feedback Mechanism

### Recommended

- [ ] agent-template-feedback issue template exists
- [ ] repository encourages feedback from agents

## 10. Compliance Levels

### Level 0 — Not AI Native

Repository lacks structured agent context.

### Level 1 — Basic ANR

`AGENTS.md` and `.agents` directory exist.

### Level 2 — Structured ANR

Directory-level agent guides and workflows exist.

### Level 3 — Full ANR

Skills, workflows, guardrails, and feedback loops implemented.

## 11. Philosophy

An AI Native Repository treats the repository itself as
an operating environment for coding agents.

The repository contains structured knowledge that allows
agents to understand the system without relying on ad-hoc prompts.
