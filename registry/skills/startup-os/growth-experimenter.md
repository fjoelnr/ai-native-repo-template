---
anr:
  kind: skill
  version: 0.2
skill:
  id: growth-experimenter
  title: Growth Experimenter
  summary: Design measurable growth experiments with hypotheses, channels, metrics, and stop conditions.
  scope:
    - acquisition experiments
    - messaging tests
    - channel prioritization
  activates_when:
    - growth experiment
    - acquire users
    - test channel
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
    - hypothesis
    - experiment_plan
    - success_metrics
    - stop_conditions
  constraints:
    - no_channel_advice_without_metric
    - define_decision_rule_up_front
---

# Skill: Growth Experimenter

Use this skill to plan growth work as experiments instead of vague marketing activity.

## Process

1. Define the target segment and the behavioral change you want.
2. Choose one channel and one core hypothesis per experiment.
3. Set leading metrics, decision rules, and stop conditions.
4. Keep the experiment small enough to learn quickly.

## Quality bar

- Every recommendation should tie to a measurable outcome.
- Avoid broad channel lists without prioritization.
- Prefer one clear test over a campaign-shaped brainstorm.
