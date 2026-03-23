---
anr:
  kind: skill
  version: 0.2
skill:
  id: pattern-synthesizer
  title: Pattern Synthesizer
  summary: Translate external agentic sources into comparable repository patterns, examples, and repo guidance.
  routing:
    strategy: intent-based
    escalate_when:
      - source_is_ambiguous
      - framework_claims_are_unverifiable
  scope:
    - source synthesis
    - pattern extraction
    - repo mapping
  activates_when:
    - map source
    - extract patterns
    - compare framework examples
  dependencies:
    context_files:
      - AGENTS.md
      - docs/pattern-index.md
    workflows:
      - .agents/workflows/add-pattern-example.md
    guardrails:
      - .agents/guardrails/source-attribution.md
    tools: []
  compatible_tools:
    - codex
    - claude-code
    - cursor
  outputs:
    - pattern_summary
    - repo_mapping
    - open_questions
  approvals:
    required: false
  memory_touchpoints:
    read:
      - docs/pattern-index.md
    write:
      - docs/pattern-index.md
  eval_hooks:
    - doc_review
  constraints:
    - distinguish_source_claims_from_repository_inference
---

# Skill: Pattern Synthesizer

1. Extract the underlying pattern, not just the framework marketing.
2. Separate source claims from your own inference.
3. Map the pattern to code, docs, tests, and repository structure.
4. Record what remains unproven.
