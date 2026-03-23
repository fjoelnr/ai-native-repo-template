---
anr:
  kind: workflow
  version: 0.2
workflow:
  id: ship-weekly-release
  title: Ship Weekly Release
  intent: Keep product momentum high with a regular release cadence that still surfaces quality and compliance risks.
  category: startup-os
  triggers:
    - weekly release
    - demo day
    - regular product push
  inputs:
    required:
      - change_list
      - validation_status
    optional:
      - support_notes
      - launch_copy
  outputs:
    - release_candidate_review
    - blocker_list
    - release_notes
    - follow_up_actions
  steps:
    - id: collect
      title: Collect change list and release scope
    - id: review
      title: Review quality, risk, and support impact
    - id: precheck
      title: Run compliance and claims precheck
    - id: ship
      title: Release with explicit known issues
  quality_gates:
    - blockers_identified
    - known_issues_recorded
    - release_scope_explicit
  approvals:
    required: false
  failure_modes:
    - hidden_known_issue
    - readiness_claim_without_checks
    - product_or_marketing_claims_unreviewed
  success_criteria:
    - release_go_no_go_is_clear
    - customer_visible_risks_are_known
    - follow_up_work_is_tracked
---

# Workflow: Ship Weekly Release

## Purpose

Use this workflow to preserve speed without pretending that frequent releases remove the need for review.

## Procedure

1. Collect the exact scope of what changed.
2. Review quality, breakage risk, and support impact.
3. Run a precheck for claims, privacy, payment, or policy risks.
4. Release with clear known issues and follow-up tasks.

## Related skills

- `qa-reviewer`
- `compliance-precheck`
- `analytics-interpreter`
