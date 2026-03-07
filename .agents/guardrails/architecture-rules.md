# Guardrail: Architecture Rules

Agents must preserve these invariants:

1. Domain logic must not depend on UI or delivery adapters.
2. External integrations must be wrapped behind interfaces.
3. Shared contracts require versioned changes and migration notes.
4. Cross-cutting concerns (auth, logging, metrics) stay centralized.

If a task requires breaking an invariant, stop and request human review.
