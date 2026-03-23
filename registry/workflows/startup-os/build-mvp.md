---
anr:
  kind: workflow
  version: 0.2
workflow:
  id: build-mvp
  title: Build MVP
  intent: Move from idea to a narrowly scoped, testable MVP without hiding shortcuts.
  category: startup-os
  triggers:
    - mvp build
    - initial launch
    - new product idea
  inputs:
    required:
      - target_user
      - problem_statement
      - success_definition
    optional:
      - design_direction
      - launch_deadline
  outputs:
    - scoped_spec
    - prototype_or_mvp
    - explicit_shortcuts
    - launch_checklist
  steps:
    - id: write-spec
      title: Define scope, constraints, and non-goals
    - id: prototype
      title: Build the narrowest useful product slice
    - id: verify
      title: Check core flows and obvious breakpoints
    - id: prepare-launch
      title: Document shortcuts and launch conditions
  quality_gates:
    - non_goals_listed
    - core_flow_demoable
    - shortcuts_explicit
  approvals:
    required: false
  failure_modes:
    - prototype_presented_as_production_ready
    - scope_expands_without_validation
    - no_clear_success_definition
  success_criteria:
    - mvp_solves_one_clear_problem
    - launch_risks_are_named
    - next_iteration_is_obvious
---

# Workflow: Build MVP

## Purpose

Use this workflow when a solo builder or small team needs to turn an idea into a first usable product slice quickly.

## Procedure

1. Write a short spec with user, problem, scope, acceptance criteria, and non-goals.
2. Build the narrowest version that proves the workflow or value proposition.
3. Test the core path and obvious failure cases.
4. Document what is intentionally incomplete before calling it launchable.

## Related skills

- `spec-writer`
- `rapid-prototyper`
- `qa-reviewer`
