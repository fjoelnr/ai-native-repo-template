# AI-Native Architecture Reference

## What is an AI-native repository?

An AI-native repository is engineered so coding agents can operate as reliable contributors.
It includes machine-readable process definitions, human-readable policy, and governance hooks in CI.

## Human-agent interaction model

1. Humans provide objectives, constraints, and acceptance criteria.
2. Agents execute tasks through documented workflows in `.agents/workflows/`.
3. Agents apply reusable skills from `.agents/skills/`.
4. Agents enforce guardrails from `.agents/guardrails/` and escalate restricted changes.
5. Humans review outcomes and merge with accountability.

## Purpose of repository components

- `skills`: reusable reasoning patterns for review, debugging, and execution quality.
- `workflows`: procedural task blueprints with YAML specs for automation and validation.
- `guardrails`: non-negotiable safety and architecture constraints.
- `schemas`: machine-readable contracts that make workflows verifiable in CI.
- `registry`: declared agent capabilities and preferred task types.

## Why schemas matter

Workflow schemas make process quality enforceable.
CI can validate that each workflow declares expected fields such as inputs, outputs, tools, and scripts.
This reduces ambiguity and improves portability across agent runtimes.

## How new projects adopt this template

1. Copy this repository as the project baseline.
2. Update `AGENTS.md` and guardrails for domain constraints.
3. Extend workflow YAML specs with project-specific steps and scripts.
4. Register active agents and capability profiles in `.agents/registry/agents.yaml`.
5. Keep `.github/workflows/validate-agents.yml` enabled to prevent policy drift.

## Operating principle

Treat agent behavior as architecture, not prompt text.
Version workflows, capabilities, and guardrails like any other critical system contract.
