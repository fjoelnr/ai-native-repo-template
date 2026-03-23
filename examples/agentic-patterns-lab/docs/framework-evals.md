# Framework Evals

This lab includes a small repository-local eval harness for framework-backed examples.

Current coverage:

- `routing/langgraph-real`
- `multi-agent/adk-real` sequential flow
- `multi-agent/adk-real` parallel flow
- `multi-agent/adk-real` session-state persistence
- `human-in-the-loop/adk-real` tool confirmation

Negative and edge coverage includes:

- fallback routing for ambiguous and empty inputs
- empty-input stability for bounded ADK multi-agent flows
- disallowed intermediate state values in session-state checks
- explicit no-state-change assertions for pending and rejected HITL paths

Runtime behavior:

- `routing/langgraph-real` is treated as a required local track
- the real ADK tracks are treated as optional runtime-backed tracks until `requirements-adk.txt` is installed into `.venv`
- optional skipped tracks stay visible in the JSON and Markdown scorecards without failing the whole lab on fresh clones

Files:

- `tests/evaluations/framework-evals.js` runs the eval suite and prints a JSON summary
- `tests/evaluations/framework-evals.test.js` keeps the eval suite in the normal test run
- `tests/evaluations/framework-scorecard.js` compares the current eval run to a committed baseline
- `tests/evaluations/baselines/framework-evals-baseline.json` is the committed baseline snapshot
- `tests/fixtures/framework-evals/` holds fixed regression cases

Run:

```bash
npm run eval:frameworks
npm run scorecard:frameworks
npm run baseline:refresh:frameworks
```

Scorecard behavior:

- `scorecard:frameworks` prints deltas versus the committed baseline and writes both `tests/evaluations/reports/framework-scorecard.latest.json` and `tests/evaluations/reports/framework-scorecard.latest.md`
- `baseline:refresh:frameworks` updates the committed baseline when intentional changes raise or lower the expected score

What this proves:

- framework examples keep their claimed routing and handoff behavior
- ADK state and confirmation flows stay stable across refactors
- the lab has a repeatable baseline beyond smoke-only assertions

What this does not prove:

- model quality under real LLM calls
- latency or production-scale performance
- framework behavior outside these bounded, model-free examples
