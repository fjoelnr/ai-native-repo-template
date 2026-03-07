# Workflow: Migrate to ANR

## Purpose

Use this workflow to convert an existing repository into an ANR-compliant repository.
Most real-world projects already exist and need adaptation, not greenfield setup.

## Steps

1. Inspect repository structure
   - Identify current directories such as `src/`, `lib/`, `tests/`, `scripts/`, `docs/`.
   - Map where business logic, tests, and tooling currently live.

2. Generate global agent context
   - Create `AGENTS.md` describing project purpose, structure, and global rules.

3. Create repository navigation
   - Create `.agents/context-index.md` with links to key directories and ANR files.

4. Create directory-level agent guides
   - Add `AGENT.md` files to important directories (for example `src/`, `tests/`, `tools/`, `docs/`).

5. Define workflows
   - Add practical workflows such as `feature-development` and `bugfix` under `.agents/workflows/`.

6. Add guardrails
   - Add architecture rules and forbidden zones in `.agents/guardrails/`.

7. Validate ANR compliance
   - Run ANR validation and resolve missing files/directories.

## Example prompts

- "Convert this repository to ANR"
- "Migrate this project to ANR structure"

## Outcome

The repository gains persistent agent context, reusable procedures, and explicit safety constraints.
