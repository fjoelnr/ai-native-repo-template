# AI Native Repositories

Repositories were built for humans.  
ANR makes them readable for agents.

![ANR Standard](https://img.shields.io/badge/ANR-Standard-blue)
![ANR Level](https://img.shields.io/badge/ANR%20Level-1-green)
![Migration Ready](https://img.shields.io/badge/Migration-Ready-orange)
![ANR Validation](https://img.shields.io/badge/ANR%20Validation-pending-lightgrey)

ANR is an open, agent-neutral repository standard for software development where humans and AI coding agents collaborate.
It builds on `AGENTS.md` and extends it into a full repository architecture for AI agents.

## Quick Explanation

- `README.md` explains a project to humans.
- `AGENTS.md` explains it to AI agents.
- `skills` provide reusable reasoning patterns.
- `workflows` define development procedures.
- `guardrails` define safety constraints.

ANR introduces a structured context layer so agents can understand and modify repositories without repeated ad-hoc prompting.

## Relationship to AGENTS.md

- `AGENTS.md`: single instruction file for agent guidance.
- `ANR`: full repository architecture including:
  - skills
  - workflows
  - guardrails
  - context index
  - manifest (`anr.yaml`)

ANR builds on `AGENTS.md` and turns it into a full repository architecture for AI agents.

## Relationship to MCP

MCP standardizes how agents access external tools and services.
ANR standardizes how repositories expose structured context to agents.

```text
AI Agent
   |
ANR (repository interface)
   |
MCP (tool interface)
   |
tools and services
```

ANR and MCP are complementary layers in an agent-native development stack.

## ANR Architecture

Architecture layers:

- `AGENTS.md` -> global context
- `.agents/context-index.md` -> repository map
- directory-level `AGENT.md` files -> local context
- `.agents/skills/` -> reusable reasoning
- `.agents/workflows/` -> development procedures
- `.agents/guardrails/` -> safety constraints
- `anr.yaml` -> machine-readable repository metadata

```text
                           AI Coding Agents
               (Codex, Cursor, Copilot, Claude, ...)
                                  |
                         +--------v--------+
                         |    AGENTS.md    |
                         |  Global Context |
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

## Migration Capability

ANR is not only for greenfield projects.
Existing repositories can be upgraded using the migration workflow:

- [.agents/workflows/migrate-repository-to-anr.md](.agents/workflows/migrate-repository-to-anr.md)

This workflow guides agents to inspect existing structure, generate context files, define workflows and guardrails, and validate ANR compliance.

Example prompt:

`Convert this repository to ANR.`

Expected migration sequence:

1. analyze repository structure
2. generate `AGENTS.md`
3. create directory context files (`*/AGENT.md`)
4. define workflows and guardrails
5. validate ANR compliance

## Quickstart

```bash
git clone <template-repo> my-project
cd my-project
node tools/anr-cli/index.js init
node tools/anr-cli/index.js validate
```

## Key Links

- ANR Spec: [AI_NATIVE_REPO_SPEC.md](AI_NATIVE_REPO_SPEC.md)
- Example Project: [examples/basic-anr-project](examples/basic-anr-project)
- Migration Workflow: [.agents/workflows/migrate-repository-to-anr.md](.agents/workflows/migrate-repository-to-anr.md)
- ANR Manifest: [anr.yaml](anr.yaml)
- Related Work: [docs/related-work.md](docs/related-work.md)
- Ecosystem Registry: [registry/README.md](registry/README.md)

## Reference implementation

This repository includes a minimal ANR reference implementation:

- Example repository: [examples/basic-anr-project](examples/basic-anr-project)
- Machine-readable manifest: [anr.yaml](anr.yaml)

## ANR Manifest

`anr.yaml` is a machine-readable description of repository structure and ANR components.
It allows coding agents and tools to discover context entry points automatically.

## Philosophy

ANR is designed to be:

- **Agent-neutral** (works with Codex, Cursor, Copilot, Claude, and others)
- **Simple** (plain files over complex frameworks)
- **Open** (versioned, inspectable, and adaptable)
