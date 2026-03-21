## Java Spring Extension

### Stack Focus

This repository uses the Java + Spring Boot profile.

### Additional Map

- `src/main/java/` application code
- `src/test/java/` automated tests
- `src/main/resources/` runtime configuration and templates
- `docs/api.md` API contracts and compatibility notes
- `docs/testing.md` test strategy and slice boundaries

### Extra Working Rules

- keep controller, service, and persistence responsibilities explicit
- document migrations and schema ownership before changing data shape
- make API compatibility changes visible in docs and tests
- prefer deterministic test slices over broad integration-only coverage
