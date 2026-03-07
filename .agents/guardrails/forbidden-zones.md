# Guardrail: Forbidden Zones

Human review required before changing:

1. `.agents/guardrails/`
2. `.agents/workflows/`
3. `.github/ISSUE_TEMPLATE/`

Agents should not automatically modify:
- repository policy files (`AGENTS.md`, `CODEOWNERS`)
- git history of protected branches
- files containing credentials or secrets
