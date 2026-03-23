# Stack Profiles

This directory contains stack-specific ANR overlays.

The base ANR template stays tool-neutral. Profiles add the missing domain-specific context that a generic repository scaffold should not guess on its own.

Current profiles:

- `java-spring`: service/application repositories built around Java, Spring Boot, testing, persistence, and API contracts
- `platformio-iot`: embedded firmware repositories using PlatformIO, device configuration, hardware validation, and deployment guardrails
- `mcp-infra`: repositories that render, deploy, validate, and operate MCP-facing infrastructure and routing
- `startup-os`: solo-builder and small-team operating overlay for fast product, growth, launch, and experiment work

How to use a profile:

1. choose the closest profile after creating a new repository from this template
2. merge the profile's `AGENTS.fragment.md` into the repo `AGENTS.md`
3. use the profile checklist to add stack-specific docs, skills, workflows, and guardrails
4. adapt the examples to the real repository instead of copying them blindly

Profiles are guidance layers, not rigid generators.
