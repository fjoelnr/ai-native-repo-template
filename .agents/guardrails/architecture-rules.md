# Guardrail: Architecture Rules

1. Business logic belongs in `src/` modules with explicit boundaries.
2. Production changes require corresponding tests in `tests/`.
3. Cross-module contracts must be documented in `docs/`.
4. Prefer incremental changes over broad refactors.
