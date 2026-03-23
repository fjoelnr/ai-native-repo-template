---
anr:
  kind: skill
  version: 0.2
skill:
  id: rapid-prototyper
  title: Rapid Prototyper
  summary: Turn a rough idea into a narrow prototype plan or first implementation with explicit scope limits.
  scope:
    - mvp scaffolding
    - prototype implementation
    - spike work
  activates_when:
    - prototype
    - build quickly
    - mvp
  dependencies:
    context_files:
      - AGENTS.md
      - .agents/context-index.md
    workflows:
      - registry/workflows/startup-os/build-mvp.md
    guardrails:
      - registry/guardrails/startup-os/no-fake-readiness.md
    tools: []
  compatible_tools:
    - codex
    - claude-code
    - cursor
  outputs:
    - prototype_plan
    - narrow_implementation
    - explicit_tradeoffs
  constraints:
    - optimize_for_speed_but_name_shortcuts
    - no_false_production_claims
    - keep_scope_narrow
---

# Skill: Rapid Prototyper

Use this skill to get from idea to working prototype quickly.

## Process

1. Reduce the request to the smallest credible prototype scope.
2. Name what is intentionally excluded from the first cut.
3. Prefer direct implementation paths over architectural polishing.
4. Record shortcuts, risks, and production gaps explicitly.

## Quality bar

- The result should be demoable, not dressed up as production-ready.
- Every shortcut should be explicit.
- Prototype speed must not become hidden operational debt.
