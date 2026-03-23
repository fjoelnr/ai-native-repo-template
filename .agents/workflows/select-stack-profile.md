---
anr:
  kind: workflow
  version: 0.2
workflow:
  id: select-stack-profile
  title: Select Stack Profile
  intent: Choose the narrowest matching profile after ANR initialization and merge only relevant guidance.
  category: configuration
  triggers:
    - repository bootstrap
    - profile selection
    - stack alignment
  inputs:
    required:
      - repository_type
      - technology_stack
    optional:
      - deployment_model
  outputs:
    - selected_profile
    - merged_guidance
    - removed_irrelevant_defaults
  steps:
    - id: classify
      title: Classify the repository type
    - id: select
      title: Pick the closest profile
    - id: merge
      title: Merge relevant AGENTS guidance
    - id: expand
      title: Add recommended profile docs
    - id: trim
      title: Remove irrelevant copied guidance
  quality_gates:
    - closest_profile_selected
    - irrelevant_guidance_removed
  approvals:
    required: false
  failure_modes:
    - profile_too_broad
    - copied_guidance_left_unedited
    - stack_specific_docs_missing
  success_criteria:
    - profile_matches_actual_repo
    - AGENTS_guidance_is_relevant
    - unnecessary_structure_not_imported
---

# Select Stack Profile

## Goal

Choose the narrowest stack profile that matches the repository after ANR initialization.

## Steps

1. classify the repository as application, firmware, infrastructure, or mixed
2. pick the closest profile from `profiles/`
3. merge only the relevant `AGENTS.fragment.md` content into `AGENTS.md`
4. add the profile's recommended docs before feature work expands
5. remove any copied guidance that does not match the actual repository

## Rule

Profiles are starting points. They are not licenses to import irrelevant structure.
