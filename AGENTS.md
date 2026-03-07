# AGENTS.md

## Purpose

Root memory fuer AI agents in diesem Repository.

## Repository Map

- `src/` application code
- `tests/` automated tests
- `tools/` scripts and utilities
- `docs/` documentation
- `.agents/` workflows, skills, guardrails

## Rules

1. Kontext in dieser Reihenfolge laden: global -> directory -> workflow -> skill.
2. Lokale Regeln in `*/AGENT.md` haben Vorrang fuer das jeweilige Verzeichnis.
3. Guardrails sind verbindlich; bei Konflikten menschliches Review einholen.

## Workflows

- `.agents/workflows/`

## Skills

- `.agents/skills/`

Hinweis: Zusätzliche Anweisungen existieren in directory-level `AGENT.md` Dateien.
