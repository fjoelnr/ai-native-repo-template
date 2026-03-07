# Guardrail: Architecture Rules

1. Keep domain logic in `src/` and separated by clear module boundaries.
2. Any behavior change requires corresponding tests in `tests/`.
3. User-facing or architectural changes must update `docs/`.
4. Prefer incremental changes over large cross-cutting rewrites.
