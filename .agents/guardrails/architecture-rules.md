# Guardrail: Architecture Rules

Architecture invariants:

1. Keep business logic separate from delivery layers (UI/API/CLI).
2. Changes to shared contracts require clear migration notes.
3. Prefer small, isolated module changes over cross-repo refactors.

If a task requires breaking these rules, request human review first.
