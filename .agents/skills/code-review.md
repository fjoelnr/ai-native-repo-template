---
anr:
  kind: skill
  version: 0.2
skill:
  id: code-review
  title: Code Review
  summary: Review code changes for correctness, regression risk, and missing validation.
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
    workflows:
      - .agents/workflows/feature-development.md
      - .agents/workflows/bugfix.md
    guardrails:
      - .agents/guardrails/architecture-rules.md
      - .agents/guardrails/forbidden-zones.md
    tools: []
  compatible_tools:
    - codex
    - claude-code
    - cursor
    - copilot
  outputs:
    - findings
    - residual_risks
    - testing_gaps
  constraints:
    - findings_first
    - include_file_references
    - prioritize_behavioral_risk_over_style
---

# Skill: Code Review

Reusable reasoning process for reviewing code changes.

## Process

1. Confirm change intent, expected behavior, and relevant repository context.
2. Check correctness, edge cases, and likely regression areas first.
3. Verify that tests cover the changed behavior and failure paths.
4. Report findings with severity and file references before any summary.

## Quality bar

- Prefer concrete behavioral findings over stylistic commentary.
- Call out missing tests, risky assumptions, and unclear migrations explicitly.
- If there are no findings, state that clearly and mention residual risks or testing gaps.
