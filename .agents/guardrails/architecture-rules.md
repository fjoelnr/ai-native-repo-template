# Guardrail: Architecture Rules

Rules:
1. Keep business logic out of UI and transport layers.
2. Enforce clear module boundaries and public interfaces.
3. Prefer composition over deep inheritance.
4. Add tests for cross-module contracts.

Review check:
- Does this change increase coupling across layers?
