const test = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")

const { runInit } = require("../tools/anr-cli/init")
const { runApplyProfile } = require("../tools/anr-cli/apply-profile")

function createTempRepo() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "anr-apply-profile-"))
}

function readFile(repoRoot, filePath) {
  return fs.readFileSync(path.join(repoRoot, filePath), "utf8")
}

test("apply-profile installs startup-os materials, docs, and AGENTS fragment", () => {
  const repoRoot = createTempRepo()

  try {
    runInit(repoRoot)
    const result = runApplyProfile("startup-os", repoRoot)

    assert.equal(result.profileId, "startup-os")
    assert.equal(fs.existsSync(path.join(repoRoot, ".agents/skills/rapid-prototyper.md")), true)
    assert.equal(fs.existsSync(path.join(repoRoot, ".agents/workflows/build-mvp.md")), true)
    assert.equal(fs.existsSync(path.join(repoRoot, "docs/experiments.md")), true)
    assert.equal(fs.existsSync(path.join(repoRoot, "docs/claims-and-risk.md")), true)

    const agents = readFile(repoRoot, "AGENTS.md")
    assert.match(agents, /<!-- anr-profile:startup-os:start -->/)
    assert.match(agents, /## Startup OS Extension/)
    assert.match(agents, /<!-- anr-profile:startup-os:end -->/)

    const manifest = readFile(repoRoot, "anr.yaml")
    assert.match(manifest, /profile:\s*startup-os/)
    assert.match(manifest, /skill_packs:\s*\r?\n\s*- startup-os/)
    assert.match(manifest, /workflow_packs:\s*\r?\n\s*- startup-os/)
  } finally {
    fs.rmSync(repoRoot, { recursive: true, force: true })
  }
})

test("apply-profile is idempotent and preserves existing recommended docs", () => {
  const repoRoot = createTempRepo()

  try {
    runInit(repoRoot)
    fs.writeFileSync(
      path.join(repoRoot, "docs/metrics.md"),
      "# Existing Metrics\n\nKeep this file.\n",
      "utf8"
    )

    const firstResult = runApplyProfile("startup-os", repoRoot)
    const secondResult = runApplyProfile("startup-os", repoRoot)

    assert.equal(firstResult.agentsUpdated, true)
    assert.equal(secondResult.agentsUpdated, false)
    assert.equal(readFile(repoRoot, "docs/metrics.md"), "# Existing Metrics\n\nKeep this file.\n")

    const agents = readFile(repoRoot, "AGENTS.md")
    const markerMatches = agents.match(/<!-- anr-profile:startup-os:start -->/g) || []
    assert.equal(markerMatches.length, 1)
  } finally {
    fs.rmSync(repoRoot, { recursive: true, force: true })
  }
})

test("apply-profile refuses to apply an unknown profile", () => {
  const repoRoot = createTempRepo()

  try {
    runInit(repoRoot)
    assert.throws(() => runApplyProfile("does-not-exist", repoRoot), /Unknown profile: does-not-exist/)
  } finally {
    fs.rmSync(repoRoot, { recursive: true, force: true })
  }
})

test("apply-profile works for profiles without registry packs", () => {
  const repoRoot = createTempRepo()

  try {
    runInit(repoRoot)
    const result = runApplyProfile("java-spring", repoRoot)

    assert.equal(result.packResults.length, 0)
    assert.equal(fs.existsSync(path.join(repoRoot, "docs/architecture.md")), true)
    assert.equal(fs.existsSync(path.join(repoRoot, "docs/api.md")), true)

    const manifest = readFile(repoRoot, "anr.yaml")
    assert.match(manifest, /profile:\s*java-spring/)
  } finally {
    fs.rmSync(repoRoot, { recursive: true, force: true })
  }
})
