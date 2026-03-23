# Routing Pattern

This directory should hold routing examples across one or more frameworks.

Suggested contents:

- intent classification router
- tool router
- escalation router

Each example should document:

- routing strategy
- dispatch criteria
- fallback behavior

Seeded example:

- `basic-router.js` demonstrates keyword-based routing into a few bounded paths
- `langgraph-style/router-graph.js` demonstrates graph-shaped state transitions
- `langgraph-real/routing-graph.mjs` demonstrates the same pattern with the real LangGraph package
