# Architecture

## AI-native repository concept

An AI-native repository stores operational context in versioned files so agents can work reliably without repeated ad-hoc prompting.

## Agent context hierarchy

1. Global context: `AGENTS.md`
2. Directory context: `*/AGENT.md`
3. Operational context: workflows, skills, and guardrails in `.agents/`

As scope narrows, guidance becomes more specific.

## Starting a new project from this template

1. Clone this repository as the project base.
2. Implement modules in `src/` and tests in `tests/`.
3. Add localized `AGENT.md` files for complex areas.
4. Keep workflows, skills, and guardrails concise and current.
