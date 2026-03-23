---
anr:
  kind: workflow
  version: 0.2
workflow:
  id: migrate-repository-to-anr
  title: Migrate Repository To ANR
  intent: Upgrade an existing repository into ANR structure with minimal disruption and explicit context layers.
  category: migration
  triggers:
    - repository migration
    - structure standardization
    - ai-native adoption
  inputs:
    required:
      - existing_repository_structure
    optional:
      - current_docs
      - build_tooling
      - team_conventions
  outputs:
    - AGENTS.md
    - context_index
    - local_agent_guides
    - workflows
    - guardrails
    - validation_result
  steps:
    - id: inspect
      title: Inspect the existing repository structure
    - id: global-context
      title: Generate global repository context
    - id: repository-map
      title: Create the repository map
    - id: local-context
      title: Add directory-level context
    - id: workflows
      title: Extract practical workflows
    - id: guardrails
      title: Define explicit guardrails
    - id: validate
      title: Validate ANR compliance
  quality_gates:
    - major_directories_mapped
    - context_is_versioned
    - validation_passes
  approvals:
    required: false
  failure_modes:
    - structure_copied_without_matching_repo_reality
    - missing_local_context_for_high_risk_areas
    - migration_stops_at_prompt_file_only
  success_criteria:
    - repository_has_anr_core_structure
    - context_is_localized_near_complexity
    - workflows_and_guardrails_exist
---

# Workflow: Migrate Repository to ANR

## Purpose

Most real-world repositories already exist.
They need to be upgraded to ANR instead of being created from scratch.

This workflow guides an AI agent through a practical migration path.

## Migration algorithm

1. Inspect repository structure
   - Detect existing directories such as `src/`, `lib/`, `services/`, `tests/`, `scripts/`, and `docs/`.
   - Identify where source code, tests, tooling, and architecture documentation currently live.

2. Generate global context
   - Create `AGENTS.md` describing project purpose, repository map, and global rules.

3. Create repository map
   - Generate `.agents/context-index.md` with links to important directories and ANR context files.

4. Create directory-level context
   - Add `AGENT.md` files to key directories (for example `src/`, `tests/`, `tools/`, `docs/`).

5. Extract workflows
   - Analyze existing scripts, build files, and developer commands.
   - Define practical workflows (for example feature development and bugfix procedures).

6. Define guardrails
   - Add architecture rules and restricted directories in `.agents/guardrails/`.

7. Validate ANR compliance
   - Run ANR validation and resolve missing files or directories.

## Example prompt

`Convert this repository to an AI Native Repository using the ANR migration workflow.`
