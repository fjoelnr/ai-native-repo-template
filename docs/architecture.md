# Architecture

## What is an AI-native repository?

An AI-native repository stores structured agent context in versioned files, not ad-hoc prompts.

## Hierarchical agent context

1. Global context: `AGENTS.md`
2. Directory context: `*/AGENT.md`
3. Operational context: workflows, skills, guardrails under `.agents/`

This keeps guidance maintainable and context-specific.

## How this template is used

1. Clone the template.
2. Add project modules in `src/`.
3. Add tests in `tests/`.
4. Extend local `AGENT.md` files for domain context.
5. Keep workflows/skills/guardrails concise and versioned.
