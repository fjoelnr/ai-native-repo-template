# ADK Real

This example uses the real `google-adk` Python package.

It demonstrates:

- custom model-free agents by extending `BaseAgent`
- a real `SequentialAgent`
- a real `ParallelAgent`
- durable session updates through `EventActions(state_delta=...)`
- execution through `Runner` and `InMemorySessionService`
- structured event output without requiring an API key

Setup:

```bash
python -m venv .venv
.venv\Scripts\python -m pip install -r requirements-adk.txt
```

Run:

```bash
.venv\Scripts\python src/patterns/multi-agent/adk-real/sequential_demo.py --json
.venv\Scripts\python src/patterns/multi-agent/adk-real/parallel_demo.py --json
.venv\Scripts\python src/patterns/multi-agent/adk-real/session_state_demo.py --json
```

What each example proves:

- `sequential_demo.py`: bounded specialist handoff with the real `SequentialAgent`
- `parallel_demo.py`: independent specialist work with the real `ParallelAgent`
- `session_state_demo.py`: persisted session state through `EventActions(state_delta=...)`

Official references:

- https://google.github.io/adk-docs/agents/multi-agents/
- https://google.github.io/adk-docs/context/
- https://google.github.io/adk-docs/sessions/
