# AI Native Repository Compliance Checklist (ANR v0.2)

Use this checklist to evaluate ANR compatibility.

The local source of truth is:

```bash
node tools/anr-cli/index.js validate
```

## Global context

- [ ] `AGENTS.md` exists
- [ ] project purpose documented
- [ ] repository map documented
- [ ] workflows/skills/guardrails referenced

## Navigation

- [ ] `.agents/context-index.md` exists
- [ ] core directories listed
- [ ] directory `AGENT.md` links included

## Structure

- [ ] `src/` exists
- [ ] `tests/` exists
- [ ] `tools/` exists
- [ ] `docs/` exists
- [ ] `.agents/` exists

## Operations

- [ ] `.agents/skills/` exists
- [ ] `.agents/workflows/` exists
- [ ] `.agents/guardrails/` exists
- [ ] workflow metadata is valid when `capabilities.workflow_metadata` is true
- [ ] skill metadata is valid when `capabilities.skill_metadata` is true

## Manifest

- [ ] `anr.yaml` exists for Level 3+
- [ ] required manifest paths point to existing files or directories
- [ ] runtime, memory, and eval capability flags match enabled declarations

## Documentation and feedback

- [ ] `docs/architecture.md` exists
- [ ] `.github/ISSUE_TEMPLATE/agent-template-feedback.md` exists
