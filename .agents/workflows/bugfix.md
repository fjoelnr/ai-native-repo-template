---
name: bugfix
description: Resolve a defect with minimal risk and regression coverage.
steps:
  - capture_reproduction
  - isolate_root_cause
  - design_minimal_fix
  - implement_fix
  - add_regression_test
  - run_validation_scripts
  - document_impact
inputs:
  - bug_report
  - reproduction_steps
  - affected_component
outputs:
  - fix_diff
  - regression_test
  - impact_notes
required_tools:
  - git
  - debugger
  - test-runner
scripts:
  - scripts/test.ps1
  - scripts/format.ps1
---

# Workflow: Bugfix

Use this workflow for defects and regressions.

## Steps
1. Capture exact reproduction and expected behavior.
2. Identify root cause and impacted components.
3. Implement minimal fix with low blast radius.
4. Add regression test that fails before and passes after.
5. Validate locally and in CI.
6. Document impact and rollback strategy if needed.

## Completion criteria
- Bug reproduced before fix
- Regression test prevents recurrence
- Risk assessment documented
