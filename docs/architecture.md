# Architecture

## AI-native repository overview

An AI-native repository is structured for reliable collaboration between humans and coding agents.
It combines global rules with local context so agents can make safe, scoped changes.

## Hierarchical agent context model

1. `AGENTS.md` defines global goals, repository map, and rules.
2. `.agents/context-index.md` points agents to relevant files and folders.
3. Directory-level files (`src/AGENT.md`, `tests/AGENT.md`, `tools/AGENT.md`, `docs/AGENT.md`) provide local rules.
4. Skills and workflows in `.agents/` define reusable operating procedures.

Local `AGENT.md` files refine global instructions for their directory.
When global and local guidance conflict, escalate to human review.

## Using this template in a new project

1. Keep the base structure (`src/`, `tests/`, `tools/`, `docs/`, `.agents/`).
2. Add module-level `AGENT.md` files where localized context is needed.
3. Customize skills, workflows, and guardrails to the domain.
4. Keep docs and tests updated with every behavioral change.
