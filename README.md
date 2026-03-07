# AI Native Repository (ANR)

ANR is a repository standard for software development where humans and AI coding agents collaborate.

## AI Native Repositories

Repositories were built for humans.  
ANR makes them readable for agents.

Software development is entering a new phase.

AI coding agents are no longer just assistants.  
They explore repositories, run tests, and modify code.

But most repositories were never designed for them.

Agents are forced to guess:

- where the architecture lives
- which commands to run
- what rules must never be broken

AI Native Repositories (ANR) solve this.

ANR introduces a simple structure that makes repositories understandable to AI agents:

- `AGENTS.md` -> global context
- directory `AGENT.md` -> local domain knowledge
- `skills` -> reusable reasoning patterns
- `workflows` -> development procedures
- `guardrails` -> safety constraints

Instead of prompting agents again and again, the repository itself contains the instructions.

The repository becomes the interface between humans and AI agents.

### The real breakthrough

ANR does not only work for new repositories.  
You can upgrade existing projects.

Give an AI agent a single instruction:

`Migrate this repository to ANR.`

The agent analyzes the project, generates context files, defines workflows, and prepares the repository for AI-assisted development.

ANR turns your existing codebase into an AI-native development environment.

## ANR Validation Status

![ANR Validation](https://img.shields.io/badge/ANR%20Validation-pending-lightgrey)

## Inspiration

The initial spark came from a post about Claude Code projects:
teams saw that repositories became far more reliable for agents when context was structured in files such as `CLAUDE.md`, plus explicit skills, workflows, and guardrails.

That practical pattern led to a bigger idea:
not a single-tool convention, but a general repository standard for agent collaboration.

ANR extends this idea into a tool-agnostic model that works with any coding agent.

**README.md explains a project to humans.  
AGENTS.md explains it to AI.**

## 1. Introduction

Traditional repositories were designed for human contributors only.
Modern development increasingly includes AI coding agents.
ANR defines how a repository can become understandable for both.

## 2. The Problem

Coding agents often work with incomplete context.
Without structure, they cannot reliably answer questions like:

- What is this system trying to do?
- Which area should be changed?
- What rules are mandatory?
- Which process should be followed?

The result is inconsistent output, unsafe edits, and repeated prompting.

## 3. The Idea

ANR introduces **AI Native Repositories**:
repositories that embed structured operational knowledge directly in versioned files.

Instead of relying on ad-hoc prompts, the repository itself provides persistent context for agent behavior.

## 4. The Model

ANR organizes context in layers:

- `AGENTS.md` -> global context
- `.agents/context-index.md` -> repository navigation
- `*/AGENT.md` -> local domain knowledge
- `.agents/skills/` -> reusable reasoning
- `.agents/workflows/` -> development procedures
- `.agents/guardrails/` -> safety constraints

Design rule:

`Global -> Directory -> Workflow -> Skill`

## 5. Why This Matters

With ANR, a repository is no longer just source code storage.
It becomes an operating environment for AI agents:

- context is explicit
- behavior is more predictable
- safety constraints are versioned
- collaboration quality improves over time

## Architecture Diagram

```text
                    AI Native Repository

                        AGENTS.md
                           |
                    Global Context Layer
                           |
          +----------------+----------------+
          |                |                |
      src/AGENT.md    tests/AGENT.md   tools/AGENT.md
          |                |                |
          +----------------+----------------+
                           |
                   .agents/context-index
                           |
          +----------------+----------------+
          |                |                |
      .agents/skills   .agents/workflows  .agents/guardrails
                           |
                          docs/
```

## Quickstart

Create a new project from this template:

```bash
git clone <template-repo> my-project
cd my-project
```

Bootstrap or validate structure:

```bash
node tools/anr-cli/index.js init
node tools/anr-cli/index.js validate
```

Then start implementing your domain in `src/` and add local context with module-level `AGENT.md` files.

## Migrating Existing Repositories

ANR is not only for new repositories.
One of its most important use cases is migrating existing projects to a structured agent-ready model.

Use the migration workflow:

- `.agents/workflows/migrate-to-anr.md`

This workflow helps agents and maintainers:

- inspect current repository layout
- generate global and local agent context
- add workflows and guardrails
- validate ANR compliance incrementally

Example prompts:

- `Convert this repository to ANR`
- `Migrate this project to ANR structure`

## Philosophy

ANR is designed to be:

- **Agent-neutral**: works with Claude, Cursor, Codex, and others
- **Simple**: plain files and clear structure over heavy frameworks
- **Open**: versioned, inspectable, and adaptable by any team

ANR is not just a template.
It is a proposal for how software repositories evolve when AI agents become regular contributors.
