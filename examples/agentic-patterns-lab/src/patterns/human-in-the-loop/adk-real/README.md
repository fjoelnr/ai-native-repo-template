# ADK Real

This example uses the real `google-adk` Python package to demonstrate a human approval gate.

It demonstrates:

- a real `FunctionTool`
- `require_confirmation=True`
- pending confirmation requests through `requested_tool_confirmations`
- explicit reject and approve paths through `ToolConfirmation`
- persisted session updates only after approval

Run:

```bash
.venv\Scripts\python src/patterns/human-in-the-loop/adk-real/tool_confirmation_demo.py --json
```

What the example proves:

- `pending`: ADK requests confirmation and blocks the tool call
- `rejected`: ADK rejects the tool call without changing session state
- `approved`: ADK executes the tool and persists state through `tool_context.state`
