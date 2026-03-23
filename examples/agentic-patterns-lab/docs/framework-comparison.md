# Framework Comparison Notes

This lab currently includes framework-inspired, dependency-free examples for:

- `routing/langgraph-style`
- `multi-agent/adk-style`

It also includes one real framework-backed example:

- `routing/langgraph-real`

And one real Python ADK example:

- `multi-agent/adk-real`
- `human-in-the-loop/adk-real`

## Why This Approach

The goal is to keep examples runnable in a small repository without forcing framework installation on every reader.

These examples show:

- control-flow shape
- state transitions
- delegation boundaries

They do not claim to be drop-in implementations of the upstream frameworks.

## Current Mapping

### LangGraph-Style Routing

- graph node based control flow
- explicit state object
- route-dependent transitions

### LangGraph Real

- real `@langchain/langgraph` package
- `Annotation.Root` state schema
- `StateGraph`, `START`, `END`, and `addConditionalEdges`
- no external model dependency

### ADK-Style Multi-Agent

- coordinator plus sub-agent delegation
- bounded specialist responsibilities
- structured result events

### ADK Real

- real `google-adk` package
- custom `BaseAgent` specialists
- real `SequentialAgent`
- real `ParallelAgent`
- session persistence through `EventActions(state_delta=...)`
- execution through `Runner` and `InMemorySessionService`

### ADK Real Tool Confirmation

- real `google-adk` `FunctionTool`
- `require_confirmation=True`
- explicit pending, rejected, and approved confirmation paths
- state mutation only after confirmed execution

## Next Step

The lab now has fixed regression evals for the real framework tracks under `tests/evaluations/framework-evals.js`.

If the lab continues to grow, the next phase should add:

- richer eval fixtures with failure cases and edge conditions
- model-backed eval tracks separate from these deterministic repository-local checks
