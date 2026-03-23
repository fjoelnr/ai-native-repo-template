# Stack Profiles

## Purpose

The ANR base template is intentionally neutral. Most real repositories still need stack-aware or operating-model-aware context.

Profiles solve that without coupling ANR to a single tool vendor or framework family.

## Design Rule

- `AGENTS.md` remains the neutral top-level memory file
- `.agents/` remains the reusable operating layer
- profiles add domain-specific context, not product-specific assumptions
- no profile should depend on a single AI tool such as Claude, Codex, or Cursor

## Current Profiles

- [Java Spring](../profiles/java-spring/README.md)
- [PlatformIO IoT](../profiles/platformio-iot/README.md)
- [MCP Infrastructure](../profiles/mcp-infra/README.md)
- [Startup OS](../profiles/startup-os/README.md)

## How To Apply A Profile

1. start from the base ANR template
2. choose the closest profile in [`profiles/`](../profiles/README.md)
3. run `node tools/anr-cli/index.js apply-profile <profile-id>` or merge the profile's `AGENTS.fragment.md` manually
4. add or trim the recommended docs, skills, workflows, and guardrails to fit the real repository
5. remove anything that does not match the real repository

## Why Profiles Matter

A generic ANR repository can tell an agent where things belong.
A stack profile tells the agent what kinds of mistakes are likely in this domain.

That is the difference between a readable repository and a repo that is actually useful for high-quality AI-assisted work.
