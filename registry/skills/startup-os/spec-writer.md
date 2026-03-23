---
anr:
  kind: skill
  version: 0.2
skill:
  id: spec-writer
  title: Spec Writer
  summary: Convert product ideas into scoped implementation specs with acceptance criteria and non-goals.
  scope:
    - product specs
    - feature briefs
    - implementation planning
  activates_when:
    - write spec
    - clarify scope
    - define acceptance criteria
  dependencies:
    context_files:
      - AGENTS.md
      - .agents/context-index.md
    workflows:
      - registry/workflows/startup-os/build-mvp.md
    guardrails:
      - registry/guardrails/startup-os/evidence-over-claim.md
    tools: []
  compatible_tools:
    - codex
    - claude-code
    - cursor
  outputs:
    - scoped_spec
    - acceptance_criteria
    - non_goals
  constraints:
    - make_tradeoffs_explicit
    - separate_requirements_from_ideas
---

# Skill: Spec Writer

Use this skill to turn vague requests into execution-grade specs.

## Process

1. State the problem, target user, and desired outcome.
2. Define scope, acceptance criteria, and non-goals.
3. Separate assumptions from confirmed requirements.
4. Leave the spec small enough to execute in one or a few iterations.

## Quality bar

- A builder should be able to implement from the spec without reinterpreting the goal.
- Non-goals should be explicit.
- Any unresolved decision should be called out, not hidden.
