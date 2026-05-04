---
anr:
  kind: workflow
  version: 0.2
workflow:
  id: feature-development
  title: Feature Development
  intent: Deliver a scoped feature safely with tests, documentation, and reviewable change size.
  category: delivery
  triggers:
    - new feature
    - enhancement
  inputs:
    required:
      - acceptance_criteria
      - implementation_scope
    optional:
      - design_notes
      - rollout_constraints
  outputs:
    - code_change
    - tests
    - documentation_updates
    - review_notes
  steps:
    - id: read-context
      title: Read repository and local context
    - id: confirm-scope
      title: Confirm acceptance criteria and boundaries
    - id: summarize-context
      title: Summarize large context before reading broadly
    - id: implement
      title: Implement a minimal change in source code
    - id: validate
      title: Add or update tests and validate behavior
    - id: document
      title: Update docs when behavior or interfaces change
    - id: summarize
      title: Prepare concise review notes
  quality_gates:
    - code_change_is_reviewable
    - tests_added_or_updated
    - docs_updated_if_behavior_changed
  approvals:
    required: false
  failure_modes:
    - unclear_acceptance_criteria
    - scope_expands_without_alignment
    - behavior_changes_without_tests
  success_criteria:
    - acceptance criteria satisfied
    - tests cover changed behavior
    - change remains narrow and reviewable
---

# Workflow: Feature Development

## Purpose

Use this workflow when implementing a new capability or extending an existing one.

## Procedure

1. Read `AGENTS.md`, `.agents/context-index.md`, and the nearest directory `AGENT.md`.
2. Confirm acceptance criteria, boundaries, and any explicit non-goals.
3. Use search, scripts, indexes, or compact tool output before loading large files, logs, generated reports, or broad source trees.
4. Implement the smallest coherent change in `src/`.
5. Add or update tests in `tests/` to cover the changed behavior.
6. Update docs if behavior, interfaces, or operating assumptions changed.
7. Prepare concise review notes covering scope, validation, and residual risk.

## Common pitfalls

- Expanding scope during implementation without re-checking the original goal.
- Loading broad context before checking the index, search results, or compact summaries.
- Changing behavior without adding or updating tests.
- Leaving docs stale when interfaces or operating rules changed.

## Related guardrails

- `.agents/guardrails/architecture-rules.md`
- `.agents/guardrails/forbidden-zones.md`
- `.agents/guardrails/agent-quality-rules.md`
