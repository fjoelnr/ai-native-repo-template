---
anr:
  kind: workflow
  version: 0.2
workflow:
  id: bugfix
  title: Bugfix
  intent: Resolve a reported defect with minimal change size and regression protection.
  category: maintenance
  triggers:
    - bug
    - regression
    - production issue
  inputs:
    required:
      - observed_failure
      - expected_behavior
    optional:
      - reproduction_steps
      - logs
  outputs:
    - code_change
    - regression_test
    - validation_summary
  steps:
    - id: read-context
      title: Read repository and local context
    - id: reproduce
      title: Reproduce the failure and confirm expected behavior
    - id: isolate-cause
      title: Identify root cause and minimal fix
    - id: implement
      title: Implement the fix
    - id: regressions
      title: Add regression checks
    - id: summarize
      title: Summarize impact and validation
  quality_gates:
    - root_cause_identified
    - regression_test_added
    - fix_is_minimal
  approvals:
    required: false
  failure_modes:
    - fix_masks_symptom_without_root_cause
    - no_regression_test_added
    - reproduction_not_confirmed
  success_criteria:
    - original failure resolved
    - regression coverage added
    - no unrelated behavior changed
---

# Workflow: Bugfix

## Purpose

Use this workflow when correcting a defect, regression, or production issue.

## Procedure

1. Read `AGENTS.md` and relevant local `AGENT.md`.
2. Reproduce the failure and confirm the expected behavior.
3. Identify the root cause and the smallest safe fix.
4. Implement the fix in `src/`.
5. Add a regression test in `tests/`.
6. Summarize validation and impact.

## Common pitfalls

- Fixing symptoms without isolating the real root cause.
- Changing behavior without regression coverage.
- Mixing cleanup or refactor work into an urgent bugfix.

## Related guardrails

- `.agents/guardrails/architecture-rules.md`
- `.agents/guardrails/forbidden-zones.md`
