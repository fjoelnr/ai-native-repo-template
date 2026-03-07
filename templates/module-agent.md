# Module Agent Context Template

Use this structure for local agent guidance in modules (for example `src/auth/AGENT.md`).

## Purpose
What this module owns and why it exists.

## Boundaries
What this module can and cannot depend on.

## Key files
Primary entry points and important implementation files.

## Change rules
Safety constraints and review requirements for edits.

## Test expectations
What tests must be updated when behavior changes.

## Example module guides

- `src/auth/AGENT.md`
- `src/database/AGENT.md`
- `src/api/AGENT.md`

## Example snippet

```md
# src/auth/AGENT.md

## Purpose
Handle authentication and session flows.

## Boundaries
Do not access persistence directly; use repository interfaces.

## Key files
- auth_service.ts
- token_policy.ts

## Change rules
Any change to token behavior requires review and test updates.

## Test expectations
Update unit tests and one integration-level auth flow test.
```
