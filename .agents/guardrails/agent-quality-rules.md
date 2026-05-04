# Guardrail: Agent Quality Rules

Use these rules for all non-trivial agent work.

## Rules

1. Read the relevant repository context before editing.
2. State important assumptions when the task is ambiguous.
3. Prefer the smallest coherent change that satisfies the goal.
4. Do not refactor, reformat, or remove unrelated code as a side effect.
5. Validate the result with the narrowest meaningful test or check.
6. Report outcomes concisely, including residual risk when validation is incomplete.

## Context efficiency

- Read indexes and summaries before broad file trees.
- Use search or scripts to narrow large context.
- Prefer compact command output and failure summaries.
- Do not load archived sessions or historical notes unless the user asks for history.

## Promotion rule

Repeated learnings from sessions should become durable repository truth.
Promote them into `docs/`, local `AGENT.md` files, workflows, skills, or guardrails rather than relying on transient memory.
