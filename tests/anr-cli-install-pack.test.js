const test = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")

const { runInit } = require("../tools/anr-cli/init")
const { runInstallPack } = require("../tools/anr-cli/install-pack")

function createTempRepo() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "anr-install-pack-"))
}

function readFile(repoRoot, filePath) {
  return fs.readFileSync(path.join(repoRoot, filePath), "utf8")
}

test("install-pack copies startup-os files into a fresh ANR repo and updates the manifest", () => {
  const repoRoot = createTempRepo()

  try {
    runInit(repoRoot)
    const result = runInstallPack("startup-os", repoRoot)

    assert.deepEqual(result.installedCategories, ["skills", "workflows", "guardrails"])
    assert.equal(fs.existsSync(path.join(repoRoot, ".agents/skills/rapid-prototyper.md")), true)
    assert.equal(fs.existsSync(path.join(repoRoot, ".agents/workflows/build-mvp.md")), true)
    assert.equal(
      fs.existsSync(path.join(repoRoot, ".agents/guardrails/human-approval-required.md")),
      true
    )

    const manifest = readFile(repoRoot, "anr.yaml")
    assert.match(manifest, /workflow_metadata:\s*true/)
    assert.match(manifest, /skill_metadata:\s*true/)
    assert.match(manifest, /skill_packs:\s*\r?\n\s*- startup-os/)
    assert.match(manifest, /workflow_packs:\s*\r?\n\s*- startup-os/)
  } finally {
    fs.rmSync(repoRoot, { recursive: true, force: true })
  }
})

test("install-pack is idempotent when the pack files are already installed", () => {
  const repoRoot = createTempRepo()

  try {
    runInit(repoRoot)
    const firstResult = runInstallPack("startup-os", repoRoot)
    const secondResult = runInstallPack("startup-os", repoRoot)

    assert.equal(firstResult.summary.every((item) => item.installed.length > 0), true)
    assert.equal(secondResult.summary.every((item) => item.installed.length === 0), true)
    assert.equal(secondResult.summary.every((item) => item.skipped.length > 0), true)

    const manifest = readFile(repoRoot, "anr.yaml")
    const skillPackMatches = manifest.match(/- startup-os/g) || []
    assert.equal(skillPackMatches.length, 2)
  } finally {
    fs.rmSync(repoRoot, { recursive: true, force: true })
  }
})

test("install-pack refuses to install an unknown pack", () => {
  const repoRoot = createTempRepo()

  try {
    runInit(repoRoot)

    assert.throws(() => runInstallPack("does-not-exist", repoRoot), /Unknown pack: does-not-exist/)
  } finally {
    fs.rmSync(repoRoot, { recursive: true, force: true })
  }
})

test("install-pack refuses to overwrite a user-modified target file", () => {
  const repoRoot = createTempRepo()

  try {
    runInit(repoRoot)
    fs.writeFileSync(
      path.join(repoRoot, ".agents/skills/rapid-prototyper.md"),
      "# User customized file\n",
      "utf8"
    )

    assert.throws(
      () => runInstallPack("startup-os", repoRoot),
      /Refusing to overwrite existing file with different contents: \.agents\\skills\\rapid-prototyper\.md/
    )
  } finally {
    fs.rmSync(repoRoot, { recursive: true, force: true })
  }
})
