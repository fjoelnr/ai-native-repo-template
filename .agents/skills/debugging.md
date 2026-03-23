---
anr:
  kind: skill
  version: 0.2
skill:
  id: debugging
  title: Debugging
  summary: Resolve failures through evidence, narrowing, and one-hypothesis-at-a-time validation.
  scope:
    - defect analysis
    - runtime failure investigation
    - regression diagnosis
  activates_when:
    - debug
    - investigate failure
    - find root cause
  dependencies:
    context_files:
      - AGENTS.md
      - .agents/context-index.md
    workflows:
      - .agents/workflows/bugfix.md
    guardrails:
      - .agents/guardrails/architecture-rules.md
    tools: []
  compatible_tools:
    - codex
    - claude-code
    - cursor
    - copilot
  outputs:
    - reproduction_notes
    - root_cause_hypothesis
    - validation_result
  constraints:
    - evidence_before_fix
    - one_hypothesis_at_a_time
    - minimal_safe_change
---

# Skill: Debugging

Reusable reasoning process for resolving failures.

## Process

1. Reproduce the issue and capture evidence.
2. Narrow the failure to the smallest relevant component.
3. Validate one root-cause hypothesis at a time.
4. Implement the minimal safe fix.
5. Verify with regression checks.

## Quality bar

- Prefer reproducible evidence over speculation.
- Isolate root cause before changing code.
- Verify the fix closes the original failure and does not widen scope.
