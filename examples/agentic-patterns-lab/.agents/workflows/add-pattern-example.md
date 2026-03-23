---
anr:
  kind: workflow
  version: 0.2
workflow:
  id: add-pattern-example
  title: Add Pattern Example
  intent: Add a new pattern implementation with docs, runnable code, and evaluation coverage.
  category: pattern-lab
  routing:
    strategy: rule-based
    dispatch_on:
      - pattern_name
      - framework_choice
  triggers:
    - add pattern
    - add framework example
  inputs:
    required:
      - pattern_name
      - framework
    optional:
      - source_reference
  outputs:
    - pattern_code
    - pattern_doc
    - smoke_test
  steps:
    - id: scope
      title: Define the pattern and framework scope
    - id: implement
      title: Add the runnable example
    - id: document
      title: Update pattern docs and notes
    - id: verify
      title: Add or update tests and evals
  quality_gates:
    - example_runs
    - doc_and_code_match
    - eval_case_exists
  approvals:
    required: false
    escalation:
      - copyrighted_source_needs_verbatim_quote
  memory_touchpoints:
    read:
      - AGENTS.md
      - docs/pattern-index.md
    write:
      - docs/pattern-index.md
  eval_hooks:
    - tests
    - smoke_example
  failure_modes:
    - code_example_without_docs
    - docs_without_runnable_example
    - framework_example_not_isolated
  success_criteria:
    - pattern_is_runnable
    - pattern_is_documented
    - pattern_has_eval_or_smoke_test
---

# Workflow: Add Pattern Example

1. Define the exact pattern and framework variant you are adding.
2. Keep the example small, runnable, and isolated.
3. Document what the example demonstrates and what it omits.
4. Add a smoke test or eval case alongside the example.
