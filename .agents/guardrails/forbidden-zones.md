# Guardrail: Forbidden Zones

Human review required before changing:

1. `.agents/guardrails/`
2. `.agents/workflows/`
3. `.github/ISSUE_TEMPLATE/`

Agents must not automatically:
- modify protected branch history
- commit credentials or secrets
- remove policy files without approval
