# AI Native Repository Specification (ANR Spec)

Version: 0.1  
Status: Draft  
Purpose: Define a minimal standard for repositories designed to be used by AI coding agents.

## 1. Overview

An AI Native Repository is structured so that coding agents can:

- understand the purpose of the system
- navigate the repository structure
- follow defined workflows
- respect architectural constraints

The repository provides structured context through versioned files rather than ad-hoc prompts.

## 2. Design Principles

### 2.1 Progressive Context

Agent context becomes more specific as scope narrows.

`Global -> Directory -> Workflow -> Skill`

Example hierarchy:

- `AGENTS.md`
- `src/AGENT.md`
- `.agents/workflows/feature-development.md`
- `.agents/skills/code-review.md`

### 2.2 Small Global Context

The global agent guide must remain concise.

Large instructions should live in specialized files.

### 2.3 Deterministic Structure

The repository structure must be predictable so agents can locate information without guesswork.

### 2.4 Human + Agent Readability

All configuration must be human readable.

Preferred formats:

- Markdown
- YAML

## 3. Required Files

### 3.1 Global Agent Guide

`AGENTS.md`

Purpose:  
Defines global repository context.

Contents:

- Why the project exists
- High-level repository map
- Global rules
- Where workflows and skills are located

### 3.2 Repository Map

`.agents/context-index.md`

Purpose:  
Helps agents navigate the repository.

Example sections:

- Source Code
- Tests
- Tools
- Workflows
- Skills
- Guardrails

## 4. Repository Structure

A compliant AI Native Repository must contain the following directories.

`src/`  
Application source code.

`tests/`  
Automated tests.

`tools/`  
Scripts and developer utilities.

`docs/`  
Project documentation.

`.agents/`  
Agent workflows, skills, and guardrails.

## 5. Directory-Level Agent Guides

Each major directory may contain an `AGENT.md` file.

Examples:

- `src/AGENT.md`
- `tests/AGENT.md`
- `tools/AGENT.md`
- `docs/AGENT.md`

These files define localized rules and conventions.

Example topics:

- Coding conventions
- Testing philosophy
- Script guidelines
- Documentation structure

## 6. Agent Skills

Location:

`.agents/skills/`

Skills define reusable reasoning procedures.

Example skills:

- `code-review`
- `debugging`
- `refactoring`

Skills should be concise and task-focused.

## 7. Agent Workflows

Location:

`.agents/workflows/`

Workflows define structured procedures for common development tasks.

Example workflows:

- `feature-development`
- `bugfix`
- `release`

## 8. Guardrails

Location:

`.agents/guardrails/`

Guardrails define constraints that agents must respect.

Examples:

- architecture rules
- restricted directories
- review requirements

## 9. Module Context

Modules may include their own `AGENT.md` files.

Example:

- `src/auth/AGENT.md`
- `src/database/AGENT.md`

These provide localized domain knowledge.

## 10. Feedback Loop

Repositories should include a mechanism for agents and developers to report issues with the template.

Example:

- `.github/ISSUE_TEMPLATE/agent-template-feedback.md`

## 11. Future Extensions

Possible future extensions include:

- agent workflow schemas
- agent orchestration
- tool execution frameworks
- multi-agent coordination

These are intentionally excluded from version 0.1.

## 12. Compliance

A repository is ANR-compliant if it includes:

- `AGENTS.md`
- `.agents/context-index.md`
- `src/`
- `tests/`
- `tools/`
- `.agents/skills/`
- `.agents/workflows/`
- `.agents/guardrails/`

Directory-level `AGENT.md` files are recommended but optional.

## 13. Versioning

This specification follows semantic versioning.

Major version increments indicate breaking structural changes.

## 14. Philosophy

An AI Native Repository treats the repository itself as a structured operating environment for coding agents.

The goal is not to replace developers, but to provide a predictable system in which agents and humans collaborate effectively.
