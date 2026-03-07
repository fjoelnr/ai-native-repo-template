# Guardrail: Forbidden Zones

Human review required before changing:

1. `.agents/guardrails/`
2. `.agents/workflows/`
3. `.github/ISSUE_TEMPLATE/`

Agents should not automatically:
- modify branch history on protected branches
- commit credentials or secrets
- remove policy and standards files
