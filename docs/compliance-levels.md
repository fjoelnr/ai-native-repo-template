# ANR Compliance Levels

## Level 1 - Basic ANR

### MUST include

- `AGENTS.md`
- `.agents/context-index.md`

## Level 2 - Structured ANR

### MUST include

- all Level 1 requirements

### SHOULD include

- directory-level `AGENT.md` files
- `.agents/workflows/`

## Level 3 - Full ANR

### MUST include

- all Level 2 requirements

### SHOULD include

- `.agents/skills/`
- `.agents/guardrails/`
- `anr.yaml`

## Level 4 - Structured Metadata

### MUST include

- all Level 3 requirements

### SHOULD include

- workflow front matter in `.agents/workflows/`
- skill front matter in `.agents/skills/`
- manifest capability declarations in `anr.yaml`

## Level 5 - Runtime And Evals

### MUST include

- all Level 4 requirements

### SHOULD include

- runtime capability declarations
- optional memory conventions
- evaluation assets and quality gates
