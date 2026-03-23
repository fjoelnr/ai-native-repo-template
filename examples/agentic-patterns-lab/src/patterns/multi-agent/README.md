# Multi-Agent Pattern

This directory holds examples where a coordinator delegates bounded work to specialized agents.

Suggested contents:

- coordinator and sub-agent delegation
- hierarchical task breakdown
- structured handoffs
- aggregation of sub-agent output

Seeded examples:

- `coordinator.js` demonstrates simple bounded delegation
- `adk-style/coordinator-agent.js` demonstrates coordinator plus specialist event flow
- `adk-real/sequential_demo.py` demonstrates the same pattern with the real Google ADK package
- `adk-real/parallel_demo.py` demonstrates parallel specialist execution with the real Google ADK package
- `adk-real/session_state_demo.py` demonstrates persistent session updates with the real Google ADK package
