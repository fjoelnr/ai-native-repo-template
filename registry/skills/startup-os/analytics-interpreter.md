---
anr:
  kind: skill
  version: 0.2
skill:
  id: analytics-interpreter
  title: Analytics Interpreter
  summary: Turn product or growth metrics into decisions, caveats, and next experiments.
  scope:
    - funnel analysis
    - usage trend analysis
    - experiment readouts
  activates_when:
    - analyze metrics
    - interpret funnel
    - summarize experiment
  dependencies:
    context_files:
      - AGENTS.md
      - .agents/context-index.md
    workflows:
      - registry/workflows/startup-os/run-growth-experiment.md
    guardrails:
      - registry/guardrails/startup-os/evidence-over-claim.md
    tools: []
  compatible_tools:
    - codex
    - claude-code
    - cursor
  outputs:
    - insight_summary
    - caveats
    - decision_recommendation
  constraints:
    - separate_observation_from_inference
    - call_out_data_gaps
---

# Skill: Analytics Interpreter

Use this skill to turn numbers into operational decisions without overstating certainty.

## Process

1. State the metric movement and the relevant time window.
2. Separate direct observations from interpretation.
3. Name data quality limits, sample issues, and confounders.
4. Recommend the next decision or experiment.

## Quality bar

- Metrics without caveats are suspect.
- Interpretation must stay proportional to the data quality.
- End with a decision, not just a dashboard summary.
