# Pattern Index

Initial pattern areas:

- `prompt-chaining`
- `routing`
- `planning`
- `multi-agent`
- `memory-management`
- `human-in-the-loop`
- `guardrails`
- `evaluation-and-monitoring`

For each pattern, the repository should eventually hold:

- a concise explanation
- at least one runnable example
- test or eval coverage
- notes on when not to use the pattern

Currently seeded with runnable examples:

- routing
- planning
- memory-management
- multi-agent
- human-in-the-loop
- guardrails
- evaluation-and-monitoring

Composite demo:

- `src/scenarios/startup-flow-demo.js` combines routing, planning, memory, guardrails, and monitoring
- `src/scenarios/launch-orchestration-demo.js` combines planning, multi-agent delegation, and human approval

Framework-inspired variants:

- `routing/langgraph-style`
- `routing/langgraph-real`
- `multi-agent/adk-style`
- `multi-agent/adk-real`
- `human-in-the-loop/adk-real`

Current real ADK coverage:

- sequential specialist handoff
- parallel specialist execution
- session-state persistence through event actions

Current eval coverage:

- framework regression cases under `tests/evaluations/framework-evals.js`
- scorecard and baseline comparison under `tests/evaluations/framework-scorecard.js`
- fixed fixtures for LangGraph routing and real ADK flows under `tests/fixtures/framework-evals/`
- edge and negative cases for fallback routing, empty inputs, and no-op approval paths
