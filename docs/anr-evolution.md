# ANR Evolution

## Why This Document Exists

ANR currently solves the repository structure problem well.

The next ecosystem wave shows that structure alone is not enough.
Strong agent systems now combine:

- repository context
- reusable specialist agents and skills
- workflow orchestration
- persistent memory
- tool integration
- evaluation and telemetry

This document synthesizes adjacent projects and proposes how ANR should evolve without losing its core simplicity.

## What ANR Already Solves

ANR is strongest where repositories need durable, portable, versioned context:

- `AGENTS.md` as global repo memory
- local `AGENT.md` files near complexity
- `.agents/workflows/` for repeatable procedures
- `.agents/skills/` for reusable reasoning patterns
- `.agents/guardrails/` for explicit constraints
- `anr.yaml` for machine-readable structure

That remains the foundation.

## Ecosystem Signals

The current ecosystem clusters into five useful patterns.

### 1. Agent Libraries and Skill Catalogs

Projects such as `superpowers`, `awesome-claude-code`, `everything-claude-code`, `ui-ux-pro-max-skill`, `obsidian-skills`, and the Claude agents library article show demand for large, reusable catalogs of specialist instructions.

Signal:
- teams want domain experts on demand, not just one generic coding agent

Implication for ANR:
- ANR should distinguish between repository-local skills and installable shared skill packs

### 2. Workflow and Multi-Agent Orchestration

Projects such as `get-shit-done`, `specops`, and `claude-octopus` emphasize end-to-end flows, role routing, phase gates, consensus, and specialized agent handoffs.

Signal:
- users want "spec in, software out" pipelines, not just better repo prompts

Implication for ANR:
- workflows need typed phases, inputs, outputs, and quality gates

### 3. Memory, Recall, and Session Continuity

Projects such as `claude-mem`, `reporecall`, `novyx-mcp`, and `rudel` focus on persistent context, retrieval, and session analytics.

Signal:
- repository files are necessary but insufficient; agents also need operational memory

Implication for ANR:
- ANR should define a memory layer, not only a file layout

### 4. Tool and Automation Fabric

Projects such as `n8n-mcp` show that useful agents increasingly depend on tool pipelines, workflows, and external execution surfaces.

Signal:
- a repository-native standard needs a clean way to declare tool dependencies and runtime integrations

Implication for ANR:
- `anr.yaml` should grow toward tool-capability declarations and optional runtime metadata

### 5. Retrieval and Knowledge Graph Context

Projects such as `LightRAG` show a path from static documents to structured retrieval over repository and project knowledge.

Signal:
- larger projects need indexed, queryable context rather than only direct file traversal

Implication for ANR:
- ANR should stay file-first, but support optional retrieval-backed context services

## Proposed Direction

ANR should evolve from a repository architecture into a layered operating model.

### Layer 1. Context Layer

This is the current ANR core:

- `AGENTS.md`
- local `AGENT.md`
- skills
- workflows
- guardrails
- manifest

Keep this minimal and portable.

### Layer 2. Runtime Layer

Add optional runtime definitions for:

- tool providers
- MCP servers
- automation hooks
- workflow executors
- agent handoff surfaces

This should remain optional so ANR still works in plain GitHub repositories.

### Layer 3. Memory Layer

Define an interoperable memory model for:

- session summaries
- architectural decisions
- task outcomes
- prior failures
- retrieval indexes

The key design rule should be:

- repository truth stays in versioned files
- runtime memory accelerates work but does not replace source-of-truth docs

### Layer 4. Evaluation Layer

Add explicit evaluation assets for agent work:

- task benchmarks
- workflow acceptance checks
- quality gates
- review rubrics
- telemetry and trace summaries

ANR should make agent performance measurable, not anecdotal.

### Layer 5. Distribution Layer

Standardize how reusable assets move across repositories:

- shared skill packs
- workflow packs
- profile bundles
- registry metadata
- compatibility declarations

This lets ANR grow from template to ecosystem.

## Concrete ANR Extensions

These extensions are the most defensible next steps.

### 1. Split The Spec

Move from one minimal spec to a tiered model:

- `ANR Core` for repository structure
- `ANR Runtime` for tools, memory, and orchestration
- `ANR Registry` for reusable distributed assets
- `ANR Evals` for quality measurement

This avoids overloading the base standard.

### 2. Introduce Typed Workflow Metadata

Workflows should optionally declare:

- intent
- required inputs
- expected outputs
- approval points
- failure modes
- success criteria

This makes workflows machine-usable instead of purely narrative.

### 3. Add A Skill Packaging Convention

Shared skills should expose:

- name
- version
- scope
- dependencies
- compatible tools
- required context files

This turns skill directories into portable modules.

### 4. Add A Memory Contract

ANR should specify optional locations and schemas for:

- summaries
- decision logs
- task journals
- recall indexes
- evaluation traces

Keep them append-only where possible.

### 5. Add A Tool Capability Contract

Extend `anr.yaml` to describe:

- available MCP servers
- local tools
- remote services
- privileged operations
- environment prerequisites

This gives agents a stable execution map.

### 6. Add Evaluation Fixtures

Repositories should be able to ship:

- representative tasks
- expected artifacts
- pass/fail checks
- review prompts
- regression scenarios

That creates a path to benchmark ANR claims across tools.

## What ANR Should Not Become

The ecosystem also shows several failure modes.

ANR should not become:

- a giant vendor-specific prompt pack
- a persona zoo without repository grounding
- a memory system that overrides versioned truth
- a workflow engine coupled to one agent runtime
- a monolithic framework that is harder to adopt than the problem it solves

The constraint is important:

- ANR must stay useful at Level 1 with only files and conventions
- everything else should layer on top

## Suggested Roadmap

### Near Term

- document adjacent patterns more explicitly
- formalize `ANR Core`
- add typed workflow front matter
- add registry metadata for reusable skills and workflows
- publish a concrete `ANR v0.2` specification proposal

### Mid Term

- define optional `ANR Runtime` extensions
- define memory schemas and retention rules
- extend `anr.yaml` for tool and capability declarations
- publish migration examples using real repositories

### Longer Term

- define `ANR Evals`
- publish cross-tool benchmark suites
- support registries of installable ANR packs
- align runtime extensions with MCP-oriented tool ecosystems

## Working Thesis

The next step after `AGENTS.md` is not just "more prompts."

It is a layered agent operating model:

- structured repository context
- reusable packaged expertise
- portable workflow semantics
- optional runtime memory
- measurable execution quality

ANR should own the repository-facing part of that stack and interoperate cleanly with the runtime and tool layers around it.

## Sources

- [obra/superpowers](https://github.com/obra/superpowers)
- [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
- [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done)
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)
- [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
- [czlonkowski/n8n-mcp](https://github.com/czlonkowski/n8n-mcp)
- [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills)
- [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG)
- [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)
- [novyxlabs/novyx-mcp](https://github.com/novyxlabs/novyx-mcp)
- [proofofwork-agency/reporecall](https://github.com/proofofwork-agency/reporecall)
- [obsessiondb/rudel](https://github.com/obsessiondb/rudel)
- [zerowand01/markplane](https://github.com/zerowand01/markplane)
- [sanmak/specops](https://github.com/sanmak/specops)
- [nyldn/claude-octopus](https://github.com/nyldn/claude-octopus)
- [The Ultimate Claude Agents Library](https://aiagentskit.com/blog/claude-agents-library/)

## Next Artifact

- [ANR v0.2 Specification Proposal](anr-v0.2-spec.md)
