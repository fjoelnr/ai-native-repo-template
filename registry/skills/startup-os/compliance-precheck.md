---
anr:
  kind: skill
  version: 0.2
skill:
  id: compliance-precheck
  title: Compliance Precheck
  summary: Run an initial policy and risk screen for product, data, or messaging changes before human review.
  scope:
    - policy screening
    - launch checklist precheck
    - risk triage
  activates_when:
    - compliance
    - policy check
    - are we safe
  dependencies:
    context_files:
      - AGENTS.md
      - .agents/context-index.md
    workflows:
      - registry/workflows/startup-os/ship-weekly-release.md
    guardrails:
      - registry/guardrails/startup-os/human-approval-required.md
    tools: []
  compatible_tools:
    - codex
    - claude-code
    - cursor
  outputs:
    - risk_list
    - open_questions
    - escalation_recommendation
  constraints:
    - never_claim_legal_signoff
    - surface_unknowns_explicitly
---

# Skill: Compliance Precheck

Use this skill for first-pass screening only.

## Process

1. Identify what changed in product behavior, data handling, claims, or payments.
2. List obvious policy, privacy, regulatory, or contractual risks.
3. State what cannot be determined from repository context alone.
4. Recommend whether human review is required before shipping.

## Quality bar

- This skill must never present itself as final approval.
- Unknowns are part of the result.
- Escalation conditions should be explicit and conservative.
