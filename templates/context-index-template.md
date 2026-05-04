# Repository Context Index Template

Use this file as the progressive disclosure map for AI agents.
The goal is to read the index first, then open only task-relevant context.

## Startup Context

| Path | Purpose | Read when | Source of truth | Context cost |
|---|---|---|---|---|
| `AGENTS.md` | Global repository memory and operating rules | Always at session start | Yes | low |
| `.agents/context-index.md` | Repository map and context routing index | Always after `AGENTS.md` | Yes | low |
| nearest `AGENT.md` | Local directory rules and conventions | Before editing or reviewing files in that directory | Yes | low |

## On-Demand Context

| Path | Purpose | Read when | Source of truth | Context cost |
|---|---|---|---|---|
| `src/` | Application source code | Implementing or reviewing runtime behavior | Yes | high |
| `tests/` | Automated tests and test conventions | Changing behavior or validating regressions | Yes | medium |
| `tools/` | Developer scripts and utilities | Updating scripts or using repo tooling | Yes | medium |
| `docs/` | Project documentation and specifications | Updating behavior, architecture, or docs | Yes | medium |
| `.agents/workflows/` | Repeatable procedures for agent work | A task matches a workflow trigger | Yes | low |
| `.agents/skills/` | Reusable reasoning patterns | A task needs specialist reasoning | Yes | low |
| `.agents/guardrails/` | Constraints agents must respect | Before risky or policy-sensitive work | Yes | low |

## Archive Context

| Path | Purpose | Read when | Source of truth | Context cost |
|---|---|---|---|---|
| `.agents/archive/` | Historical agent notes, completed task records, and old session material | Only when explicitly investigating history | No | high |

Archive context should not load by default.
Promote repeated learnings into `docs/`, local `AGENT.md` files, workflows, skills, or guardrails.

## Runtime Context

Runtime context comes from tool output, MCP servers, generated reports, code graphs, memory systems, or dashboards.

Prefer compact summaries before raw output:

- failure lines before full logs
- grouped duplicate errors before repeated output
- script-generated counts before reading many files
- graph or search summaries before broad source reads
- raw output references only when full detail is needed

## Reading Order

1. `AGENTS.md`
2. `.agents/context-index.md`
3. nearest local `AGENT.md`
4. relevant workflow
5. relevant skill
6. relevant guardrails
7. source files, docs, or runtime output only as needed
