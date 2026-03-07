# AI Native Repository (ANR)

ANR is a repository standard for software development where humans and AI coding agents collaborate.

## ANR Validation Status

![ANR Validation](https://img.shields.io/badge/ANR%20Validation-pending-lightgrey)

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

## Philosophy

ANR is designed to be:

- **Agent-neutral**: works with Claude, Cursor, Codex, and others
- **Simple**: plain files and clear structure over heavy frameworks
- **Open**: versioned, inspectable, and adaptable by any team
