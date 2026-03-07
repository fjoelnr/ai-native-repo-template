# Skill: Code Review

Use this skill to run consistent, high-signal reviews.

## Inputs
- Pull request diff
- Related issue or acceptance criteria
- Changed tests and CI status

## Process
1. Identify user-visible behavior changes.
2. Check correctness, security, and data integrity.
3. Check maintainability and architecture alignment.
4. Verify tests cover happy path and edge cases.
5. Report findings ordered by severity.

## Output
- `Findings`: clear defect/risk statements with file references
- `Questions`: assumptions that need confirmation
- `Next actions`: minimal patch and test suggestions
