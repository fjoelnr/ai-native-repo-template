---
anr:
  kind: skill
  version: 0.2
skill:
  id: skill-id
  title: Skill Title
  summary: Describe the reusable reasoning behavior.
  routing:
    strategy: intent-based
    escalate_when:
      - escalation_condition
  scope:
    - task type
  activates_when:
    - trigger phrase
  dependencies:
    context_files:
      - AGENTS.md
      - .agents/context-index.md
    workflows: []
    guardrails: []
    tools: []
  compatible_tools:
    - codex
  outputs:
    - expected_output
  approvals:
    required: false
  memory_touchpoints:
    read:
      - AGENTS.md
    write: []
  eval_hooks:
    - review_hook
  constraints:
    - important_behavioral_constraint
---

# Skill: Skill Title

Reusable reasoning process for a defined task type.

## Process

1. State what to inspect first.
2. Describe how to reason about the task.
3. Define the expected output shape.

## Quality bar

- Describe correctness criteria.
- Describe reporting expectations.
