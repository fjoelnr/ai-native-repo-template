---
anr:
  kind: workflow
  version: 0.2
workflow:
  id: workflow-id
  title: Workflow Title
  intent: Describe what this workflow achieves.
  category: delivery
  routing:
    strategy: rule-based
    dispatch_on:
      - request_type
  triggers:
    - when to use this workflow
  inputs:
    required:
      - required_input
    optional:
      - optional_input
  outputs:
    - expected_artifact
  steps:
    - id: step-1
      title: First step
    - id: step-2
      title: Second step
    - id: summarize-context
      title: Summarize large context before reading broadly
  quality_gates:
    - required_quality_check
  approvals:
    required: false
    escalation:
      - escalation_condition
  memory_touchpoints:
    read:
      - AGENTS.md
    write: []
  eval_hooks:
    - test_hook
  failure_modes:
    - common_failure_case
  success_criteria:
    - expected_success_outcome
---

# Workflow: Workflow Title

## Purpose

Explain when to use this workflow.

## Procedure

1. First step.
2. Second step.
3. Use scripts, search, indexes, or compact tool output before loading large files, logs, or generated reports.
4. Validation step.

## Common pitfalls

- List typical errors or ambiguity points.
- Avoid dumping large command output into agent context when a compact summary would answer the question.

## Related guardrails

- Reference any relevant guardrail files.
