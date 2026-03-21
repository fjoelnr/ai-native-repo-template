## MCP Infrastructure Extension

### Stack Focus

This repository uses the MCP infrastructure profile.

### Additional Map

- `templates/` canonical templates for generated runtime artifacts
- `generated/` rendered outputs, if committed
- `scripts/` or `tools/` deployment and validation helpers
- `docs/runtime-boundaries.md` source-of-truth versus runtime ownership
- `docs/verification.md` smoke tests and promotion checks

### Extra Working Rules

- keep node identity external and explicit
- prefer idempotent deploy paths over convenience scripts with side effects
- separate local smoke tests from remote/network-wide checks
- document generated/runtime boundaries before adding more automation
