# Agent Loading Order

Use this order to load context before implementing changes.

1. `AGENTS.md` (global rules and repository intent)
2. `.agents/context-index.md` (navigation map)
3. nearest directory `AGENT.md` (local constraints)
4. relevant workflow in `.agents/workflows/`
5. relevant skills in `.agents/skills/`
6. `.agents/guardrails/` (final safety constraints)

Rule: guidance becomes more specific as scope narrows.

`Global -> Directory -> Workflow -> Skill`
