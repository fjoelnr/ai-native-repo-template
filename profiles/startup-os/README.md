# Startup OS Profile

Use this profile when a repository is intended to support a solo builder or very small startup team operating with AI-heavy execution across product, engineering, growth, and launch work.

## When This Profile Fits

- one person or a very small team is coordinating most work directly
- speed matters, but repeated activities still need structure
- the repository is used for product building plus adjacent operating tasks
- experimentation, launch cadence, and decision logs matter as much as code

## Recommended Additions

- `docs/experiments.md` for experiment backlog and readouts
- `docs/launch-checklist.md` for release readiness and known issues
- `docs/metrics.md` for leading metrics and decision thresholds
- `docs/claims-and-risk.md` for policy, privacy, payment, and messaging risk
- startup-os skill, workflow, and guardrail packs from `registry/`

## Typical Risks

- persona sprawl without clear routing
- prototypes described as production systems
- growth work without hypotheses or metrics
- compliance and finance advice stated too confidently
- fast releases without explicit known-issue tracking

## Start Here

1. run `node tools/anr-cli/index.js apply-profile startup-os`
2. add the recommended startup operating docs before broadening the agent pack
3. use `node tools/anr-cli/index.js install-pack startup-os` only if you want the pack without the full profile application
4. keep legal, compliance, finance, and material spending behind human approval
