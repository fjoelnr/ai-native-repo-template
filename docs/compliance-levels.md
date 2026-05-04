# ANR Compliance Levels

The authoritative local level check is:

```bash
node tools/anr-cli/index.js validate
```

## Level 1 - Basic ANR

### MUST include

- `AGENTS.md`
- `.agents/context-index.md`

## Level 2 - Structured ANR

### MUST include

- all Level 1 requirements
- directory-level `AGENT.md` files
- `src/`, `tests/`, `tools/`, and `docs/`

## Level 3 - Full ANR

### MUST include

- all Level 2 requirements
- `.agents/skills/`
- `.agents/workflows/`
- `.agents/guardrails/`
- `anr.yaml`

## Level 4 - Structured Metadata

### MUST include

- all Level 3 requirements
- workflow front matter in `.agents/workflows/`
- skill front matter in `.agents/skills/`
- manifest capability declarations in `anr.yaml`

## Level 5 - Runtime And Evals

### MUST include

- all Level 4 requirements
- runtime capability declarations
- optional memory conventions or evaluation assets when enabled
