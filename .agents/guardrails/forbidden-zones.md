# Guardrail: Forbidden Zones

Human review required before changes in:

1. `.agents/guardrails/`
2. `.agents/workflows/`
3. `.github/ISSUE_TEMPLATE/`

Agents must not automatically:
- commit secrets or credentials
- rewrite protected branch history
- remove governance documentation
