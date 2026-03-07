# Guardrail: Forbidden Zones

Changes in these areas require explicit human approval:

1. `.github/workflows/` security-sensitive pipeline permissions
2. `scripts/` deployment or release automation
3. database migrations and schema contract files
4. secrets, keys, and environment configuration baselines

Never do the following:
- commit credentials
- force-push protected branches
- remove audit or compliance logs
