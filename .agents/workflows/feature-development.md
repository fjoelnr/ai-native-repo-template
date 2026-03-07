---
name: feature-development
description: Safely implement a new feature with human-reviewed milestones.
steps:
  - read_agents_md
  - locate_target_module
  - design_change
  - implement_code
  - add_or_update_tests
  - run_validation_scripts
  - prepare_handoff
inputs:
  - task_requirements
  - acceptance_criteria
  - architecture_constraints
outputs:
  - implementation_diff
  - updated_tests
  - documentation_updates
required_tools:
  - git
  - editor
  - test-runner
scripts:
  - scripts/test.ps1
  - scripts/format.ps1
---

# Workflow: Feature Development

Use this workflow for net-new capabilities.

## Steps
1. Read requirements and define acceptance criteria.
2. Confirm impacted modules and architecture boundaries.
3. Create an implementation plan with test plan.
4. Implement in small commits with clear scope.
5. Run tests, formatting, and lint checks.
6. Update docs and prepare merge summary.

## Completion criteria
- Acceptance criteria satisfied
- Tests added or updated
- Docs updated for behavior changes
