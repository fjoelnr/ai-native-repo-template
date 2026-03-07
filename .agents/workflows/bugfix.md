# Workflow: Bugfix

Use this workflow for defects and regressions.

## Steps
1. Capture exact reproduction and expected behavior.
2. Identify root cause and impacted components.
3. Implement minimal fix with low blast radius.
4. Add regression test that fails before and passes after.
5. Validate locally and in CI.
6. Document impact and rollback strategy if needed.

## Completion criteria
- Bug reproduced before fix
- Regression test prevents recurrence
- Risk assessment documented
