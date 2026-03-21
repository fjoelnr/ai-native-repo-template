# Java Spring Profile

Use this profile for repositories that build Spring Boot services, APIs, data-processing backends, or internal platform components on the JVM.

## When This Profile Fits

- the repository owns a Spring Boot application or service
- API contracts, persistence, and testing discipline matter
- runtime behavior is shaped by configuration, migrations, and integrations

## Recommended Additions

- `docs/api.md` for public or internal API contracts
- `docs/testing.md` for unit, slice, and integration test boundaries
- stack-specific skills for Spring, persistence, security, and code review
- guardrails around database migrations, transaction boundaries, and configuration drift

## Typical Risks

- controllers owning business logic
- hidden persistence side effects
- weak test layering
- configuration sprawl across profiles and environments
- breaking API changes without explicit contract updates

## Start Here

1. merge `AGENTS.fragment.md` into the repository `AGENTS.md`
2. add Spring-specific workflows and review checklists near `.agents/`
3. document API, data, and testing contracts before feature growth
