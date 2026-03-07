# AI-Native Repository Template

An AI-native repository is designed for human developers and coding agents to collaborate in the same codebase with shared rules, workflows, and guardrails.

## Why this template exists

- Keep agent behavior predictable across tools.
- Make collaboration auditable through explicit workflows.
- Reduce rework with shared skills and governance defaults.

## How agents interact with this repository

1. Start from `AGENTS.md` as the primary instruction contract.
2. Pick a workflow from `.agents/workflows/` for the task shape.
3. Apply one or more skills from `.agents/skills/`.
4. Respect guardrails in `.agents/guardrails/` before writing code.
5. Record decisions and assumptions in PR descriptions and docs.

## Template structure

- `.agents/`: agent operating model (skills, workflows, guardrails, registry)
- `docs/`: project-specific documentation
- `templates/`: reusable artifacts (specs, PR templates, ADRs)
- `scripts/`: utility scripts for local and CI automation
- `.github/`: issue templates and GitHub Actions workflows

## How to use this template

1. Copy this repository as your project starting point.
2. Update `AGENTS.md` with your domain rules and stack constraints.
3. Customize skills/workflows for your team.
4. Add CI checks in `.github/workflows/`.
5. Enforce the guardrails during code review.

## Quick start

```bash
git clone <your-new-repo>
cd <your-new-repo>
# Read AGENTS.md before first agent-assisted change
```
