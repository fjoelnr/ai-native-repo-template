# ANR v0.2 Specification Proposal

Version: 0.2-proposal  
Status: Draft  
Purpose: Extend ANR from a minimal repository structure into a layered specification with portable workflow metadata, skill packaging, and richer manifest declarations.

## 1. Design Goal

ANR v0.1 defines the minimum repository structure required for coding agents to navigate a codebase.

ANR v0.2 keeps that structure intact and adds optional, machine-usable metadata for:

- context budgets
- workflows
- skills
- repository capabilities
- runtime integrations
- evaluation assets

The core rule is unchanged:

- versioned repository files remain the primary source of truth

## 2. Compatibility Model

ANR v0.2 is backward-compatible with ANR v0.1.

### 2.1 Core Compatibility

An ANR v0.1 repository remains valid under v0.2 as `ANR Core`.

### 2.2 Layering

ANR v0.2 is split into four layers:

- `ANR Core` for repository structure
- `ANR Runtime` for tool and execution metadata
- `ANR Memory` for optional recall and continuity conventions
- `ANR Evals` for evaluation assets and quality gates

Repositories may adopt only `ANR Core` and remain compliant.

## 3. Core Repository Structure

The following remain the base structure:

- `AGENTS.md`
- `.agents/context-index.md`
- `src/`
- `tests/`
- `tools/`
- `docs/`
- `.agents/skills/`
- `.agents/workflows/`
- `.agents/guardrails/`

Recommended but optional:

- local `AGENT.md` files near complex areas
- `anr.yaml`
- `.agents/archive/` for historical agent notes that should not load by default

## 4. Context Budget

ANR v0.2 introduces an optional context budget model for repositories that want to make agent context loading explicit.

The model is descriptive in v0.2. It documents intent and examples, but does not require hard validation.

### 4.1 Context Classes

- `startup` context is loaded or read first in normal agent sessions.
- `on_demand` context is available through indexes and should be read only when the task calls for it.
- `archive` context stores old sessions, completed tasks, and historical notes that should not be read automatically.
- `runtime` context is produced by tools, MCP servers, command output, code graphs, memory systems, or dashboards.

### 4.2 Principles

- keep startup context short and stable
- prefer indexes and summaries before full documents
- promote repeated runtime learnings into versioned repository truth
- keep historical notes out of startup context
- use compact tool output for large searches, logs, tests, and generated reports

### 4.3 Progressive Context Index

`.agents/context-index.md` should act as a progressive disclosure index, not only a directory list.

Recommended entry fields:

- `path`
- `purpose`
- `read_when`
- `source_of_truth`
- `context_cost` (`low`, `medium`, `high`, or repo-defined)

## 5. Workflow File Format

Workflow files remain Markdown, but may now include YAML front matter.

Location:

- `.agents/workflows/*.md`

### 5.1 Workflow Front Matter

```yaml
---
anr:
  kind: workflow
  version: 0.2
workflow:
  id: feature-development
  title: Feature Development
  intent: Deliver a scoped feature safely with tests and docs.
  category: delivery
  routing:
    strategy: rule-based
    dispatch_on:
      - request_type
      - repository_state
  triggers:
    - new feature
    - enhancement
  inputs:
    required:
      - acceptance_criteria
      - target_scope
    optional:
      - design_links
      - rollout_notes
  outputs:
    - code_change
    - tests
    - review_notes
  steps:
    - id: read-context
      title: Read repository context
    - id: implement
      title: Implement minimal change
    - id: validate
      title: Run tests and checks
    - id: summarize
      title: Prepare review notes
  quality_gates:
    - tests_added_or_updated
    - docs_updated_if_behavior_changed
  approvals:
    required: false
    escalation:
      - architectural_risk
      - unclear_scope
  memory_touchpoints:
    read:
      - AGENTS.md
      - .agents/context-index.md
    write:
      - docs/architecture.md
  eval_hooks:
    - tests
    - review
  failure_modes:
    - unclear_acceptance_criteria
    - missing_regression_test
  success_criteria:
    - acceptance criteria satisfied
    - tests pass
    - scope remains minimal
---
```

### 5.2 Workflow Body

The Markdown body should remain human-readable and explain:

- usage intent
- execution sequence
- common pitfalls
- references to relevant guardrails

### 5.3 Required Fields

If front matter is present, these fields are required:

- `anr.kind`
- `anr.version`
- `workflow.id`
- `workflow.title`
- `workflow.intent`

### 5.4 Optional Fields

Optional but recommended:

- `workflow.category`
- `workflow.triggers`
- `workflow.inputs`
- `workflow.outputs`
- `workflow.steps`
- `workflow.routing`
- `workflow.quality_gates`
- `workflow.approvals`
- `workflow.memory_touchpoints`
- `workflow.eval_hooks`
- `workflow.failure_modes`
- `workflow.success_criteria`

## 6. Skill File Format

Skill files also remain Markdown with optional YAML front matter.

Location:

- `.agents/skills/*.md`

### 6.1 Skill Front Matter

```yaml
---
anr:
  kind: skill
  version: 0.2
skill:
  id: code-review
  title: Code Review
  summary: Review changes for correctness, regressions, and missing tests.
  routing:
    strategy: intent-based
    escalate_when:
      - security_or_compliance_risk
  scope:
    - pull requests
    - patches
    - diffs
  activates_when:
    - review
    - audit
    - inspect change risk
  dependencies:
    context_files:
      - AGENTS.md
      - .agents/context-index.md
    workflows: []
    guardrails: []
    tools: []
  compatible_tools:
    - codex
    - claude-code
    - cursor
  outputs:
    - findings
    - residual_risks
  approvals:
    required: false
  memory_touchpoints:
    read:
      - AGENTS.md
      - .agents/context-index.md
    write: []
  eval_hooks:
    - review
    - regression_suite
  constraints:
    - findings_first
    - include_file_references
---
```

### 6.2 Skill Body

The Markdown body should describe:

- the reasoning process
- what to inspect first
- what quality bar to apply
- expected reporting style

### 6.3 Required Fields

If front matter is present, these fields are required:

- `anr.kind`
- `anr.version`
- `skill.id`
- `skill.title`
- `skill.summary`

### 6.4 Optional Fields

Optional but recommended:

- `skill.scope`
- `skill.routing`
- `skill.activates_when`
- `skill.dependencies`
- `skill.compatible_tools`
- `skill.outputs`
- `skill.approvals`
- `skill.memory_touchpoints`
- `skill.eval_hooks`
- `skill.constraints`

## 7. Manifest Format

`anr.yaml` becomes the main machine-readable manifest.

### 7.1 Required Manifest Fields

```yaml
anr_version: 0.2

repository:
  name: example-repo
  type: application

agent_interface:
  global_context: AGENTS.md
  repository_map: .agents/context-index.md

directories:
  source: src
  tests: tests
  tools: tools
  documentation: docs

agent_components:
  skills: .agents/skills
  workflows: .agents/workflows
  guardrails: .agents/guardrails
```

### 7.2 Extended Manifest Fields

The following sections are optional.

```yaml
capabilities:
  migration_supported: true
  validation_supported: true
  workflow_metadata: true
  skill_metadata: true
  memory_contract: false
  runtime_contract: false
  evals_contract: false

metadata_contracts:
  workflows:
    routing: true
    approvals: true
    memory_touchpoints: true
    eval_hooks: true
  skills:
    routing: true
    approvals: true
    memory_touchpoints: true
    eval_hooks: true

context_budget:
  startup:
    max_files_guidance: 3
    includes:
      - AGENTS.md
      - .agents/context-index.md
      - nearest AGENT.md
  on_demand:
    examples:
      - docs/
      - .agents/workflows/
      - .agents/skills/
      - .agents/guardrails/
  archive:
    path: .agents/archive
    load_by_default: false
  runtime:
    compact_outputs: true
    raw_output_recovery: preferred

runtime:
  mcp_servers:
    - id: repo-memory
      purpose: repository recall and memory search
      optional: true
  local_tools:
    - id: anr-cli
      entrypoint: node tools/anr-cli/index.js
      purpose: initialize and validate repository structure
  privileged_operations:
    - writes_outside_repo
    - production_deploy

memory:
  enabled: false
  paths:
    summaries: .memory/summaries
    decisions: .memory/decisions
    working_state: .memory/working
  policy:
    source_of_truth: versioned_files
    retention: local_policy

evals:
  enabled: false
  paths:
    tasks: evals/tasks
    fixtures: evals/fixtures
    reports: evals/reports
  quality_gates:
    - tests_pass
    - no_unreviewed_high_severity_findings

registry:
  profile: base
  skill_packs: []
  workflow_packs: []
```

## 8. Memory Contract

ANR v0.2 does not require a memory system, but it defines conventions for repositories that use one.

### 8.1 Principles

- memory is optional
- memory accelerates execution, but does not replace versioned documentation
- stable knowledge should be promoted into docs or `AGENT.md` files

### 8.2 Suggested Paths

- `.memory/summaries/`
- `.memory/decisions/`
- `.memory/working/`
- `.memory/index/`

### 8.3 Suggested Classes

- `rule` for durable behavioral rules
- `fact` for stable project knowledge
- `episode` for task-specific history
- `working` for transient current-session state

## 9. Evaluation Contract

ANR v0.2 introduces optional evaluation assets.

Suggested structure:

- `evals/tasks/`
- `evals/fixtures/`
- `evals/reports/`

Suggested task file fields:

- task id
- objective
- required inputs
- expected artifacts
- evaluation rubric
- pass/fail checks

## 10. Validation Rules

### 10.1 Core Validation

An `ANR Core` repository passes validation if it contains the v0.1 required structure.

### 10.2 Metadata Validation

If a workflow or skill declares front matter:

- required fields must exist
- `anr.kind` must match file type
- identifiers must be unique within their directory
- routing, approval, memory, and evaluation fields should match the manifest's declared metadata contract when enabled

### 10.3 Manifest Validation

If `anr.yaml` declares runtime, memory, or eval sections:

- referenced directories should exist or be explicitly marked as future/disabled
- capability flags should match declared sections
- `context_budget` fields are advisory in v0.2 and should not fail Core validation

## 11. Compliance Profiles

### 11.1 ANR Core

Minimum repository structure for AI-readable repositories.

### 11.2 ANR Structured

ANR Core plus typed workflow and skill metadata.

### 11.3 ANR Runtime

ANR Structured plus runtime capability declarations.

### 11.4 ANR Evals

ANR Structured plus evaluation assets and quality gates.

## 12. Migration Guidance

Recommended migration order:

1. establish `ANR Core`
2. add `anr.yaml`
3. add context budget guidance and a progressive context index
4. add workflow front matter
5. add skill front matter
6. declare runtime capabilities
7. add memory and eval conventions where useful

## 13. Non-Goals

ANR v0.2 does not standardize:

- a specific agent runtime
- a specific MCP implementation
- a specific memory backend
- a vendor-specific persona system

It standardizes repository-facing interfaces and metadata only.
