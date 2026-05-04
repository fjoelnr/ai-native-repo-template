# Context Efficiency Ecosystem Review

Date: 2026-05-04

This note reviews adjacent projects focused on token efficiency, context management,
repository navigation, persistent memory, and agent operating conventions.

The goal is not to copy these systems wholesale. The goal is to identify patterns
ANR can learn from while staying repository-first, portable, and lightweight.

## Reviewed Projects

| Project | Primary idea | Relevant ANR lesson |
|---|---|---|
| [jasonkneen/openclicky](https://github.com/jasonkneen/openclicky) | Local macOS agent companion with bundled instructions, skills, local secrets, screen bridge, and app-level agent dashboard | Agent context can be shipped as product resources, not only repo docs. Local-first secrets and permissions should be explicit context. |
| [drona23/claude-token-efficient](https://github.com/drona23/claude-token-efficient) | Very small instruction files that reduce verbose output and repeated mistakes | Global agent context should stay short, targeted, and benchmarked against real failure modes. |
| [zilliztech/claude-context](https://github.com/zilliztech/claude-context) | MCP semantic code search backed by vector storage | ANR should declare optional retrieval services without making them part of core compliance. |
| [ooples/token-optimizer-mcp](https://github.com/ooples/token-optimizer-mcp) | MCP-oriented token optimization, caching, hooks, dashboards, and quality gates | Runtime optimization belongs in an optional layer; ANR can describe compatibility and expected behavior. |
| [alexgreensh/token-optimizer](https://github.com/alexgreensh/token-optimizer) | Local structural audits, token/cost dashboard, compaction survival, quality scoring | ANR should distinguish structural context cost from runtime output cost and make context health measurable. |
| [Mibayy/token-savior](https://github.com/Mibayy/token-savior) | Symbol-level MCP navigation plus persistent memory with progressive disclosure | ANR can adopt the progressive disclosure contract: index first, detail only on demand. |
| [nadimtuhin/claude-token-optimizer](https://github.com/nadimtuhin/claude-token-optimizer) | Four essential startup files, archive everything else, topic learnings loaded on demand | ANR's context hierarchy should include explicit startup budget guidance and archive conventions. |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | Sandbox large tool outputs, session continuity, "think in code", compressed responses | ANR workflows can teach agents to compute summaries with scripts instead of reading bulk data into context. |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Tree-sitter code graph, blast-radius review context, incremental updates | ANR review workflows should define a minimal-context review path and optional code graph integration. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | CLI proxy that compresses common dev command output | Tool output contracts should prefer failure-only, grouped, deduplicated results with raw-output recovery. |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | Output compression skill and MCP description compression | ANR skills can define verbosity modes, but should keep professional defaults and allow user override. |
| [TheMorpheus407/RepoLens](https://github.com/TheMorpheus407/RepoLens) | Multi-lens audit orchestration across many specialist agents | ANR can learn from lens catalogs, but should avoid unbounded persona sprawl and uncontrolled cost. |
| [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) | Four behavioral principles: think first, simplicity, surgical edits, goal-driven execution | ANR guardrails should encode these as baseline agent quality rules. |

## Pattern Families

### 1. Lean Startup Context

Several projects converge on the same point: instructions help only while they
cost less than the behavior they prevent.

Useful concepts:

- keep global context short and stable
- put detailed truth near the relevant directory or workflow
- load topic-specific docs only when the task requires them
- archive completed sessions, old tasks, and historical notes away from startup
- benchmark instruction files by output saved, failures prevented, and overhead added

ANR already has the right structure for this. The missing piece is an explicit
context budget model.

Possible adoption:

- Add `context_budget` guidance to `anr.yaml`.
- Add a "startup context" section to `.agents/context-index.md`.
- Add an archive convention for historical agent notes.
- Add a validation warning for very large `AGENTS.md` and local `AGENT.md` files.

### 2. Progressive Disclosure

The strongest systems do not ask the model to read everything. They give it
pointers first, then let it expand only what matters.

Useful concepts:

- repository index before full documents
- symbol or file summaries before source bodies
- search result IDs before full result payloads
- memory index before memory body
- tool catalog search before full tool manifest

This maps cleanly to ANR:

```text
AGENTS.md
  -> .agents/context-index.md
  -> local AGENT.md
  -> workflow / skill / guardrail
  -> source files and detailed docs
```

Possible adoption:

- Treat `.agents/context-index.md` as a first-class progressive disclosure index.
- Add optional `summary`, `tokens`, `when_to_read`, and `source_of_truth` metadata
  for context entries.
- Define a convention for `docs/index.md` or per-directory indexes in large repos.

### 3. Runtime Tool Compression

Projects such as `rtk`, `context-mode`, `token-optimizer`, and `caveman-shrink`
target a different problem than repository structure: large tool outputs.

Useful concepts:

- compress command output before it reaches the model
- group repeated lines and similar errors
- show failures first
- preserve full raw output out of band
- track savings locally
- fail open when optimization breaks

ANR should not own shell rewriting or MCP proxy behavior. It should define how
a repository declares that such tools are supported.

Possible adoption:

- Extend `anr.yaml` with optional `runtime.tools`.
- Add `tools/AGENT.md` guidance for compact command output.
- Add workflow guidance: use scripts for large analysis; return summaries, not dumps.
- Define raw-output recovery expectations for CI/test/debug workflows.

### 4. Code Graph And Blast Radius

`code-review-graph`, `token-savior`, and similar tools show that code review is
often a graph problem, not a text problem.

Useful concepts:

- parse symbols, imports, calls, tests, and ownership into an index
- compute impacted files from diffs
- review minimal affected context first
- make test gaps and architectural hotspots visible
- keep graph updates incremental

ANR should remain file-first, but can become graph-aware.

Possible adoption:

- Add an optional `ANR Runtime: code_graph` capability.
- Add a code-review workflow phase: "derive blast radius before reading broadly."
- Add `eval` fixtures for review tasks to measure whether agents miss affected files.
- Keep graph outputs advisory; versioned repo docs remain source of truth.

### 5. Persistent Memory With Trust Rules

Persistent memory is valuable, but risky if it silently outranks the repository.

Useful concepts:

- store operational memory locally
- distinguish decisions, observations, warnings, conventions, and task summaries
- decay or expire stale facts
- link memory to source hashes or citations
- detect contradictions
- promote repeated observations into durable conventions

ANR's rule should be simple:

- versioned files are authoritative
- runtime memory is recall, not truth
- durable learnings should graduate into docs, guardrails, workflows, or skills

Possible adoption:

- Add optional `.agents/memory/` conventions for checked-in, curated memory.
- Add runtime memory metadata to `anr.yaml`.
- Add a workflow for promoting repeated session learnings into repository truth.
- Add memory retention and trust rules to guardrail templates.

### 6. Behavioral Guardrails

The smallest instruction projects are often effective because they target
high-frequency agent failure modes:

- starting before reading
- assuming when confused
- overbuilding abstractions
- editing unrelated code
- emitting verbose filler
- declaring success without verification

ANR already has guardrails and workflows, but it can make these defaults sharper.

Possible adoption:

- Add a baseline "agent quality guardrail" pack.
- Include rules for assumptions, simplicity, surgical edits, and verification.
- Keep verbosity rules as a mode or preference, not a universal personality.

## What We Should Not Copy

ANR should avoid:

- vendor-specific lock-in as a core requirement
- giant prompt bundles loaded on every turn
- persona catalogs without repository grounding
- mandatory cloud vector databases for baseline compliance
- runtime hooks that mutate behavior without clear repo-visible declarations
- lossy compression without raw-output recovery
- memory that can override checked-in project truth
- audit systems that create unbounded cost or unsafe shell activity by default

## Recommended ANR Extensions

### Near Term

1. Add explicit context budget guidance.
2. Expand `.agents/context-index.md` into a progressive disclosure index.
3. Add archive conventions for old sessions, completed tasks, and historical notes.
4. Add a baseline agent quality guardrail inspired by the lean instruction projects.
5. Add compact-output guidance to `tools/AGENT.md` and workflow templates.

### Mid Term

1. Extend `anr.yaml` with optional runtime capabilities:
   - MCP servers
   - code graph services
   - memory providers
   - output compression tools
   - local dashboards or telemetry
2. Define an optional memory contract:
   - source
   - trust level
   - expiry
   - citation
   - promotion path into repo truth
3. Add typed workflow metadata for success criteria, required context, and
   verification gates.

### Longer Term

1. Define `ANR Evals` for context-efficiency benchmarks.
2. Measure:
   - startup token footprint
   - files read per task
   - tool output volume
   - task success rate
   - review recall
   - compaction/resume quality
3. Support optional graph-backed and retrieval-backed context while keeping ANR
   Core purely file-based.

## Proposed Design Principle

ANR should optimize for "right context, late loaded":

- put the durable map in the repo
- make startup context small
- expose richer context through indexes
- let runtime tools compress and retrieve details
- promote repeated runtime learnings back into versioned files

This preserves ANR's core identity while absorbing the best lesson from the
ecosystem: context efficiency is not just shorter prompts. It is an operating
model for when information becomes visible to the agent.

