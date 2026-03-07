# Workflow: Bugfix

1. Capture reproducible failure with current behavior.
2. Find root cause and impacted module boundaries.
3. Apply minimal fix in `src/`.
4. Add regression test in `tests/`.
5. Verify no side effects.
6. Summarize impact and validation for review.
