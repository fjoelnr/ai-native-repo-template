# AI Native Repositories

Repositories were built for humans.  
ANR makes them readable for agents.

![ANR Standard](https://img.shields.io/badge/ANR-Standard-blue)
![ANR Level](https://img.shields.io/badge/ANR%20Level-1-green)
![Migration Ready](https://img.shields.io/badge/Migration-Ready-orange)
![ANR Validation](https://img.shields.io/badge/ANR%20Validation-pending-lightgrey)

Most people treat `AGENTS.md` like a prompt file.

That is the mistake.

If you want an AI coding agent to feel like a senior engineer living inside your repository, the repository needs structure.

ANR is that structure.

## The Core Idea

An effective agent needs four things at all times:

- the why -> what the system does
- the map -> where things live
- the rules -> what is allowed and what is not
- the workflows -> how work gets done

Prompting is temporary.  
Structure is permanent.

`README.md` explains a project to humans.  
`AGENTS.md` explains it to AI.

## The Anatomy of an AI Native Repository

- `AGENTS.md` -> repo memory
- `.agents/context-index.md` -> repository map
- local `AGENT.md` files -> context near risky modules
- `.agents/skills/` -> reusable expert modes
- `.agents/workflows/` -> development procedures
- `.agents/guardrails/` -> deterministic boundaries
- `docs/` -> progressive source of truth
- `anr.yaml` -> machine-readable repository manifest

ANR builds on `AGENTS.md` and turns it into a full repository architecture for AI agents.

## ANR Reference Architecture

```text
                           AI Coding Agents
               (Codex, Cursor, Copilot, Claude, ...)
                                  |
                         +--------v--------+
                         |    AGENTS.md    |
                         |  Repo Memory    |
                         +--------+--------+
                                  |
                         +--------v--------+
                         | .agents/context |
                         |    -index.md    |
                         +--------+--------+
                                  |
         +------------------------+------------------------+
         |                        |                        |
   +-----v------+           +-----v------+           +-----v------+
   | src/AGENT.md|          |tests/AGENT.md|         |docs/AGENT.md|
   +-----+------+           +-----+------+           +-----+------+
         |                        |                        |
         +------------------------+------------------------+
                                  |
        +-------------------------+-------------------------+
        |                         |                         |
 +------v---------+      +--------v--------+      +--------v--------+
 | .agents/skills |      |.agents/workflows|      |.agents/guardrails|
 +----------------+      +-----------------+      +-----------------+
                                  |
                         +--------v--------+
                         |    anr.yaml     |
                         | Machine Metadata|
                         +-----------------+
```

## From Traditional Repository to AI Native Repository

```text
Traditional Repository                           AI Native Repository
----------------------                           --------------------
README.md as primary guide                       README.md + AGENTS.md
implicit team knowledge                          explicit context layer
ad-hoc prompts per task                          reusable skills/workflows
unclear edit boundaries                          versioned guardrails

                    Transform
     "Migrate this repository to ANR"
```

## Why This Matters

When a repository is organized this way, an agent stops behaving like a chatbot and starts behaving more like a project-native engineer.

The important change is not the model.
It is the repository becoming an operating environment for the model.

## Existing Repositories, Not Just New Ones

Most production repositories already exist.
ANR is designed for migration, not just greenfield setup.

Migration workflow:

- [.agents/workflows/migrate-repository-to-anr.md](.agents/workflows/migrate-repository-to-anr.md)

Typical prompt:

`Convert this repository to ANR.`

Expected migration sequence:

1. inspect the current structure
2. generate `AGENTS.md`
3. create `.agents/context-index.md`
4. add local `AGENT.md` files near sharp edges
5. define workflows and guardrails
6. validate ANR compliance

## Quickstart

```bash
git clone <template-repo> my-project
cd my-project
node tools/anr-cli/index.js init
node tools/anr-cli/index.js validate
```

Then start implementing your domain in `src/` and add local context where the risk is highest.

## Key Links

- ANR Spec: [AI_NATIVE_REPO_SPEC.md](AI_NATIVE_REPO_SPEC.md)
- Example Project: [examples/basic-anr-project](examples/basic-anr-project)
- Migration Workflow: [.agents/workflows/migrate-repository-to-anr.md](.agents/workflows/migrate-repository-to-anr.md)
- ANR Manifest: [anr.yaml](anr.yaml)
- Related Work: [docs/related-work.md](docs/related-work.md)
- Positioning: [docs/anr-positioning.md](docs/anr-positioning.md)
- Research: [docs/research.md](docs/research.md)
- Ecosystem Registry: [registry/README.md](registry/README.md)

## Reference Implementation

This repository includes a minimal ANR reference implementation:

- Example repository: [examples/basic-anr-project](examples/basic-anr-project)
- Machine-readable manifest: [anr.yaml](anr.yaml)

## Relationship to AGENTS.md

- `AGENTS.md` -> single instruction file
- `ANR` -> full repository architecture

## Relationship to MCP

- `ANR` -> repository interface
- `MCP` -> tool interface

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
