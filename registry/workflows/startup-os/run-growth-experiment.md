---
anr:
  kind: workflow
  version: 0.2
workflow:
  id: run-growth-experiment
  title: Run Growth Experiment
  intent: Execute one measurable acquisition or activation experiment with explicit decision rules.
  category: startup-os
  triggers:
    - growth test
    - launch experiment
    - message validation
  inputs:
    required:
      - target_audience
      - hypothesis
      - metric_of_success
    optional:
      - budget_limit
      - time_box
  outputs:
    - experiment_plan
    - channel_asset
    - readout
    - next_decision
  steps:
    - id: define
      title: Define the hypothesis and metrics
    - id: build
      title: Prepare one experiment asset or campaign
    - id: run
      title: Execute within a fixed budget or time box
    - id: readout
      title: Summarize evidence and next decision
  quality_gates:
    - one_core_hypothesis
    - success_metric_defined
    - stop_condition_defined
  approvals:
    required: false
  failure_modes:
    - too_many_variables_change_at_once
    - no_decision_rule
    - broad_channel_research_without_execution
  success_criteria:
    - result_supports_a_clear_next_step
    - learning_is_captured
    - spend_or_time_box_is_respected
---

# Workflow: Run Growth Experiment

## Purpose

Use this workflow when trying to learn whether a channel, message, or offer can move a measurable startup metric.

## Procedure

1. Define one hypothesis, one audience, and one measurable outcome.
2. Create the smallest experiment that can produce signal.
3. Run it within a hard budget or time box.
4. Write a readout with evidence, caveats, and next action.

## Related skills

- `growth-experimenter`
- `analytics-interpreter`
