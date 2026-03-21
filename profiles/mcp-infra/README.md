# MCP Infrastructure Profile

Use this profile for repositories that define, render, deploy, or validate MCP-facing infrastructure such as routing, generated configs, service discovery, and smoke tests.

## When This Profile Fits

- the repository owns deployment logic or generated runtime artifacts
- node identity, host routing, and deterministic smoke tests matter
- the repository is more about contracts and operations than application logic

## Recommended Additions

- `docs/runtime-boundaries.md` for source-of-truth vs runtime ownership
- `docs/contracts.md` for generated/configured interfaces
- `docs/verification.md` for smoke tests and promotion checks
- guardrails for idempotent deploys, explicit identity, and local-vs-remote test separation

## Typical Risks

- hidden node identity assumptions
- environment magic in scripts
- local smoke tests quietly becoming cross-node checks
- generated output drifting from templates
- deploy scripts mutating state non-idempotently

## Start Here

1. merge `AGENTS.fragment.md` into the repository `AGENTS.md`
2. document runtime boundaries before expanding scripts
3. keep deploy and smoke-test expectations explicit and machine-checkable
