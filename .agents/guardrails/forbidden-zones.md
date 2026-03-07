# Guardrail: Forbidden Zones

Restricted areas:
1. `main` branch history rewriting.
2. Direct edits to generated files unless regeneration is documented.
3. Hardcoded credentials, tokens, or private keys.
4. Silent schema changes without migration notes.

Escalation:
- Agent must request explicit human approval before proceeding.
