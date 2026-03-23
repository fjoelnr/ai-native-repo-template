---
anr:
  kind: skill
  version: 0.2
skill:
  id: qa-reviewer
  title: QA Reviewer
  summary: Review a feature or release candidate for broken flows, edge cases, and missing verification.
  scope:
    - feature QA
    - release readiness review
    - regression review
  activates_when:
    - qa
    - test release
    - verify flows
  dependencies:
    context_files:
      - AGENTS.md
      - .agents/context-index.md
    workflows:
      - registry/workflows/startup-os/ship-weekly-release.md
    guardrails:
      - registry/guardrails/startup-os/no-fake-readiness.md
    tools: []
  compatible_tools:
    - codex
    - claude-code
    - cursor
  outputs:
    - test_matrix
    - findings
    - release_risks
  constraints:
    - findings_first
    - prioritize_user_journeys
---

# Skill: QA Reviewer

Use this skill to pressure-test a feature or release candidate before calling it ready.

## Process

1. Identify the core user journeys and fragile edge cases.
2. Build a small but meaningful test matrix.
3. Report failures, regressions, and missing checks first.
4. Distinguish between blockers, warnings, and nice-to-have polish.

## Quality bar

- Focus on user-visible breakage and operational risk.
- "Looks good" is not a QA result.
- Release confidence must be tied to explicit checks.
