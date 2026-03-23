# Agentic Patterns Mapping

## Purpose

This document maps core agentic design patterns to ANR layers, metadata fields, and repository structures.

It is intended as a bridge between:

- repository-native structure
- runtime agent behavior
- reusable pattern implementations

## Why This Matters

A repository of specialist agents is useful, but incomplete on its own.

Pattern-oriented design clarifies:

- when to route work
- when to plan versus follow a fixed workflow
- where memory belongs
- when human approval is required
- how to evaluate agent behavior over time

ANR should therefore model not only files and roles, but also recurring agentic operating patterns.

## Pattern To ANR Mapping

### Prompt Chaining

- ANR layer: `Core`
- Main artifact: workflow
- Best use: deterministic, repeatable sequences
- Repository implication: encode as structured workflows before introducing dynamic planners

### Routing

- ANR layer: `Core` and `Runtime`
- Main artifact: workflow and skill metadata
- Best use: choosing between tools, skills, or sub-agents based on intent or state
- Repository implication: skills and workflows should declare routing intent and escalation paths

### Parallelization

- ANR layer: `Runtime`
- Main artifact: workflow metadata
- Best use: independent research, validation, and retrieval branches
- Repository implication: workflows should declare which steps may run concurrently

### Reflection

- ANR layer: `Runtime`
- Main artifact: skill behavior and eval hooks
- Best use: self-checking and iterative refinement
- Repository implication: reflection should be explicit and measurable, not hidden inside prompts

### Tool Use

- ANR layer: `Runtime`
- Main artifact: manifest and skill dependencies
- Best use: APIs, databases, filesystems, and external services
- Repository implication: tools should be declared in `anr.yaml`, not implied

### Planning

- ANR layer: `Core` and `Runtime`
- Main artifact: workflow metadata
- Best use: problems where the "how" is not known in advance
- Repository implication: fixed workflows should remain the default; planners are for genuinely open execution

### Multi-Agent

- ANR layer: `Runtime`
- Main artifact: workflow routing plus registry packs
- Best use: delegation across specialized sub-agents
- Repository implication: sub-agents need bounded contracts and handoff semantics

### Memory Management

- ANR layer: `Memory`
- Main artifact: memory contract and touchpoints
- Best use: persistent decisions, prior outcomes, and user/session continuity
- Repository implication: distinguish short-term context from persistent memory explicitly

### MCP

- ANR layer: `Runtime`
- Main artifact: manifest runtime section
- Best use: standardized tool and data access
- Repository implication: tool access should be portable and machine-declared

### Goal Setting And Monitoring

- ANR layer: `Evals`
- Main artifact: eval hooks and quality gates
- Best use: outcome tracking, stop conditions, progress checks
- Repository implication: workflows should declare success criteria and monitoring points

### Exception Handling And Recovery

- ANR layer: `Safety`
- Main artifact: workflows and guardrails
- Best use: retries, fallback paths, escalation logic
- Repository implication: workflows should name failure modes and recovery behavior

### Human-In-The-Loop

- ANR layer: `Safety`
- Main artifact: approvals and escalation metadata
- Best use: ambiguous, risky, or high-impact decisions
- Repository implication: high-risk skills must declare where human approval is mandatory

### Retrieval / RAG

- ANR layer: `Memory`
- Main artifact: memory indexes and retrieval-backed docs
- Best use: larger knowledge corpora and context recall
- Repository implication: repositories should remain file-first but may add retrieval services

### Inter-Agent Communication

- ANR layer: `Runtime`
- Main artifact: workflow handoffs and structured outputs
- Best use: collaborative or hierarchical agent systems
- Repository implication: handoff contracts must be explicit, not role-played

### Resource-Aware Optimization

- ANR layer: `Runtime`
- Main artifact: routing and model/tool selection policy
- Best use: model selection by cost, latency, or risk
- Repository implication: execution policy belongs in metadata, not tribal knowledge

### Guardrails / Safety Patterns

- ANR layer: `Safety`
- Main artifact: guardrails plus moderation hooks
- Best use: policy boundaries, tool restrictions, output filtering, escalation
- Repository implication: guardrails should be layered and auditable

### Evaluation And Monitoring

- ANR layer: `Evals`
- Main artifact: eval fixtures, hooks, reports
- Best use: regression tracking and operational confidence
- Repository implication: an agent repository without evals is still experimental

## Metadata Implications

To support these patterns, ANR skill and workflow metadata should expose at least:

- `routing`
- `approvals`
- `memory_touchpoints`
- `eval_hooks`

These fields are not cosmetic. They make patterns machine-usable.

## Recommended Design Rules

1. Encode deterministic work as workflows before introducing planners.
2. Use routing to narrow scope, not to hide ambiguity.
3. Treat memory as a separate contract from repository truth.
4. Gate risky domains through explicit approvals.
5. Attach eval hooks to important skills and workflows from the start.

## Implication For Future Repositories

A dedicated repository for agentic design patterns should not be a note collection.

It should include:

- pattern docs
- runnable code examples
- tests and evals
- comparison notes across frameworks
- migration notes back into ANR-compatible repositories
