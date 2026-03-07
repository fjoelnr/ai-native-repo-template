# Workflow: Migrate Repository to ANR

## Purpose

Most real-world repositories already exist.
They need to be upgraded to ANR instead of being created from scratch.

This workflow guides an AI agent through a practical migration path.

## Migration algorithm

1. Inspect repository structure
   - Detect existing directories such as `src/`, `lib/`, `services/`, `tests/`, `scripts/`, and `docs/`.
   - Identify where source code, tests, tooling, and architecture documentation currently live.

2. Generate global context
   - Create `AGENTS.md` describing project purpose, repository map, and global rules.

3. Create repository map
   - Generate `.agents/context-index.md` with links to important directories and ANR context files.

4. Create directory-level context
   - Add `AGENT.md` files to key directories (for example `src/`, `tests/`, `tools/`, `docs/`).

5. Extract workflows
   - Analyze existing scripts, build files, and developer commands.
   - Define practical workflows (for example feature development and bugfix procedures).

6. Define guardrails
   - Add architecture rules and restricted directories in `.agents/guardrails/`.

7. Validate ANR compliance
   - Run ANR validation and resolve missing files or directories.

## Example prompt

`Convert this repository to an AI Native Repository using the ANR migration workflow.`
