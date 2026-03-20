# Status

## Purpose

This repository is the maintained reference template for AI Native Repositories (ANR).

It exists to show the minimum durable structure that lets coding agents operate with persistent repository context instead of one-off prompting.

## What Is Stable

- `AGENTS.md` as global repository memory
- `.agents/` for workflows, skills, guardrails, and context indexing
- directory-level `AGENT.md` files for localized context
- `anr.yaml` as machine-readable repository metadata
- CI validation for required ANR structure

## What Users Should Customize

- root `README.md`
- repository description and topics
- `AGENTS.md` repository purpose and map
- local workflows and guardrails
- stack-specific tooling and CI beyond the baseline ANR validation

## Branching

- `develop` is the integration branch
- `main` is the promotion branch
- normal flow remains `feature -> develop -> main`
