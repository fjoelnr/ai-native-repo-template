# AI-Native Repository Template (ANR Quickstart v0.1)

Minimales, sofort nutzbares Template fuer Repositories, in denen Menschen und Coding-Agents zusammenarbeiten.

## AI-Native Repository Model

- Global context: `AGENTS.md`
- Repository navigation: `.agents/context-index.md`
- Directory context: `*/AGENT.md`
- Procedures: `.agents/workflows/`
- Reusable reasoning: `.agents/skills/`
- Constraints: `.agents/guardrails/`

Design rule:

`Global -> Directory -> Workflow -> Skill`

## Architekturdiagramm

```text
                   AI-Native Repository

                      AGENTS.md
                         |
                  Repository Context
                         |
       +-----------------+-----------------+
       |                 |                 |
    src/AGENT.md     tests/AGENT.md    tools/AGENT.md
       |                 |                 |
    Source Code        Test Rules      Tooling Rules
       |                 |                 |
       +---------------+-+--+--------------+
                       |    |
                .agents/workflows
                       |
                .agents/skills
                       |
               .agents/guardrails
                       |
                      docs/
```

## Quickstart

```bash
git clone <template-repo> my-project
cd my-project
```

Dann projektbezogene Module anlegen, z. B.:

- `src/api/`
- `src/auth/`
- `src/database/`

Optional lokale Kontexte je Modul:

- `src/auth/AGENT.md`
- `src/database/AGENT.md`
