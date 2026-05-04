const test = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")

const { runInit } = require("../tools/anr-cli/init")
const { runValidate } = require("../tools/anr-cli/validate")

function createTempRepo() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "anr-validate-"))
}

function writeFile(repoRoot, filePath, content) {
  const fullPath = path.join(repoRoot, filePath)
  fs.mkdirSync(path.dirname(fullPath), { recursive: true })
  fs.writeFileSync(fullPath, content, "utf8")
}

function readFile(repoRoot, filePath) {
  return fs.readFileSync(path.join(repoRoot, filePath), "utf8")
}

function updateManifest(repoRoot, updater) {
  const manifestPath = path.join(repoRoot, "anr.yaml")
  fs.writeFileSync(manifestPath, updater(readFile(repoRoot, "anr.yaml")), "utf8")
}

function withConsoleCapture(callback) {
  const originalLog = console.log
  const output = []
  const priorExitCode = process.exitCode

  console.log = (message) => {
    output.push(String(message))
  }
  process.exitCode = undefined

  try {
    const result = callback()
    return {
      result,
      output,
      exitCode: process.exitCode,
    }
  } finally {
    console.log = originalLog
    process.exitCode = priorExitCode
  }
}

function workflowFrontmatter(id, overrides = {}) {
  return [
    "---",
    "anr:",
    `  kind: ${overrides.kind || "workflow"}`,
    `  version: ${overrides.version || "0.2"}`,
    "workflow:",
    `  id: ${id}`,
    "  title: Test Workflow",
    "  intent: Validate test behavior.",
    "---",
    "",
    "# Test Workflow",
    "",
  ].join("\n")
}

function skillFrontmatter(id, overrides = {}) {
  return [
    "---",
    "anr:",
    `  kind: ${overrides.kind || "skill"}`,
    `  version: ${overrides.version || "0.2"}`,
    "skill:",
    `  id: ${id}`,
    "  title: Test Skill",
    "  summary: Validate test behavior.",
    "---",
    "",
    "# Test Skill",
    "",
  ].join("\n")
}

test("validate passes for a freshly initialized ANR repo", () => {
  const repoRoot = createTempRepo()

  try {
    runInit(repoRoot)
    const { result, output, exitCode } = withConsoleCapture(() => runValidate(repoRoot))

    assert.equal(result.ok, true)
    assert.equal(result.level, 1)
    assert.equal(exitCode, 0)
    assert.match(output.join("\n"), /ANR validation passed \(level 1\)/)
  } finally {
    fs.rmSync(repoRoot, { recursive: true, force: true })
  }
})

test("validate passes for the reference template and reports the consolidated level", () => {
  const repoRoot = path.resolve(__dirname, "..")
  const { result, output, exitCode } = withConsoleCapture(() => runValidate(repoRoot))

  assert.equal(result.ok, true)
  assert.equal(result.level, 5)
  assert.equal(exitCode, 0)
  assert.match(output.join("\n"), /ANR validation passed \(level 5\)/)
})

test("validate fails when core files are missing", () => {
  const repoRoot = createTempRepo()

  try {
    runInit(repoRoot)
    fs.rmSync(path.join(repoRoot, ".agents/context-index.md"))

    const { result, output, exitCode } = withConsoleCapture(() => runValidate(repoRoot))

    assert.equal(result.ok, false)
    assert.equal(exitCode, 1)
    assert.match(result.errors.join("\n"), /Missing file: \.agents\/context-index\.md/)
    assert.match(output.join("\n"), /ANR validation failed/)
  } finally {
    fs.rmSync(repoRoot, { recursive: true, force: true })
  }
})

test("validate fails when required manifest fields are missing", () => {
  const repoRoot = createTempRepo()

  try {
    runInit(repoRoot)
    updateManifest(repoRoot, (content) => content.replace(/\n  name: my-repository/, ""))

    const { result, exitCode } = withConsoleCapture(() => runValidate(repoRoot))

    assert.equal(result.ok, false)
    assert.equal(exitCode, 1)
    assert.match(result.errors.join("\n"), /Missing manifest field: repository\.name/)
  } finally {
    fs.rmSync(repoRoot, { recursive: true, force: true })
  }
})

test("validate requires workflow front matter when workflow metadata is enabled", () => {
  const repoRoot = createTempRepo()

  try {
    runInit(repoRoot)
    updateManifest(repoRoot, (content) =>
      content.replace("workflow_metadata: false", "workflow_metadata: true")
    )
    writeFile(repoRoot, ".agents/workflows/plain.md", "# Plain Workflow\n")

    const { result, exitCode } = withConsoleCapture(() => runValidate(repoRoot))

    assert.equal(result.ok, false)
    assert.equal(exitCode, 1)
    assert.match(
      result.errors.join("\n"),
      /Missing workflow front matter: \.agents[\\/]workflows[\\/]plain\.md/
    )
  } finally {
    fs.rmSync(repoRoot, { recursive: true, force: true })
  }
})

test("validate requires skill front matter when skill metadata is enabled", () => {
  const repoRoot = createTempRepo()

  try {
    runInit(repoRoot)
    updateManifest(repoRoot, (content) =>
      content.replace("skill_metadata: false", "skill_metadata: true")
    )
    writeFile(repoRoot, ".agents/skills/plain.md", "# Plain Skill\n")

    const { result, exitCode } = withConsoleCapture(() => runValidate(repoRoot))

    assert.equal(result.ok, false)
    assert.equal(exitCode, 1)
    assert.match(
      result.errors.join("\n"),
      /Missing skill front matter: \.agents[\\/]skills[\\/]plain\.md/
    )
  } finally {
    fs.rmSync(repoRoot, { recursive: true, force: true })
  }
})

test("validate fails on invalid metadata kind, version, and duplicate ids", () => {
  const repoRoot = createTempRepo()

  try {
    runInit(repoRoot)
    updateManifest(repoRoot, (content) =>
      content.replace("workflow_metadata: false", "workflow_metadata: true")
    )
    writeFile(repoRoot, ".agents/workflows/first.md", workflowFrontmatter("duplicate"))
    writeFile(
      repoRoot,
      ".agents/workflows/second.md",
      workflowFrontmatter("duplicate", { kind: "skill", version: "0.1" })
    )

    const { result, exitCode } = withConsoleCapture(() => runValidate(repoRoot))
    const errors = result.errors.join("\n")

    assert.equal(result.ok, false)
    assert.equal(exitCode, 1)
    assert.match(errors, /Invalid workflow kind in \.agents[\\/]workflows[\\/]second\.md/)
    assert.match(errors, /Invalid workflow metadata version in \.agents[\\/]workflows[\\/]second\.md/)
    assert.match(errors, /Duplicate workflow id "duplicate"/)
  } finally {
    fs.rmSync(repoRoot, { recursive: true, force: true })
  }
})

test("validate fails on runtime, memory, and eval capability mismatches", () => {
  const repoRoot = createTempRepo()

  try {
    runInit(repoRoot)
    updateManifest(repoRoot, (content) =>
      content
        .replace("  local_tools: []", "  local_tools:\n    - id: test-tool")
        .replace("  enabled: false", "  enabled: true")
        .replace("evals:\n  enabled: false", "evals:\n  enabled: true")
    )

    const { result, exitCode } = withConsoleCapture(() => runValidate(repoRoot))
    const errors = result.errors.join("\n")

    assert.equal(result.ok, false)
    assert.equal(exitCode, 1)
    assert.match(errors, /runtime declarations exist but capabilities\.runtime_contract is not true/)
    assert.match(errors, /memory\.enabled is true but capabilities\.memory_contract is not true/)
    assert.match(errors, /evals\.enabled is true but capabilities\.evals_contract is not true/)
  } finally {
    fs.rmSync(repoRoot, { recursive: true, force: true })
  }
})

test("validate accepts valid skill metadata when enabled", () => {
  const repoRoot = createTempRepo()

  try {
    runInit(repoRoot)
    updateManifest(repoRoot, (content) => content.replace("skill_metadata: false", "skill_metadata: true"))
    writeFile(repoRoot, ".agents/skills/test.md", skillFrontmatter("test"))

    const { result, exitCode } = withConsoleCapture(() => runValidate(repoRoot))

    assert.equal(result.ok, true)
    assert.equal(exitCode, 0)
  } finally {
    fs.rmSync(repoRoot, { recursive: true, force: true })
  }
})
