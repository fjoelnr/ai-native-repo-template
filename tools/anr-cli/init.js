const fs = require("fs")
const path = require("path")

function ensureDir(repoRoot, dirPath) {
  const fullPath = path.join(repoRoot, dirPath)
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true })
    console.log(`Created directory: ${dirPath}/`)
  }
}

function ensureFile(repoRoot, filePath, content) {
  const fullPath = path.join(repoRoot, filePath)
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content, "utf8")
    console.log(`Created file: ${filePath}`)
  }
}

function runInit(repoRoot = process.cwd()) {
  console.log("ANR init started")

  const requiredDirs = [
    "src",
    "tests",
    "tools",
    "docs",
    ".agents",
    ".agents/skills",
    ".agents/workflows",
    ".agents/guardrails",
    "templates",
    ".github/ISSUE_TEMPLATE",
  ]

  requiredDirs.forEach((dirPath) => ensureDir(repoRoot, dirPath))

  ensureFile(
    repoRoot,
    "AGENTS.md",
    "# AGENTS.md\n\nRoot memory for AI agents in this repository.\n"
  )
  ensureFile(
    repoRoot,
    ".agents/context-index.md",
    "# Repository Context Index\n\nUse this file as the repository map for AI agents.\n\n## Main directories\n\n- `src/` source code\n- `tests/` automated tests\n- `tools/` utilities\n- `docs/` documentation\n\n## Agent operating context\n\n- Workflows: `.agents/workflows/`\n- Skills: `.agents/skills/`\n- Guardrails: `.agents/guardrails/`\n"
  )
  ensureFile(
    repoRoot,
    "anr.yaml",
    [
      "anr_version: 0.2",
      "",
      "repository:",
      "  name: my-repository",
      "  type: application",
      "",
      "agent_interface:",
      "  global_context: AGENTS.md",
      "  repository_map: .agents/context-index.md",
      "",
      "directories:",
      "  source: src",
      "  tests: tests",
      "  tools: tools",
      "  documentation: docs",
      "",
      "agent_components:",
      "  skills: .agents/skills",
      "  workflows: .agents/workflows",
      "  guardrails: .agents/guardrails",
      "",
      "capabilities:",
      "  migration_supported: true",
      "  validation_supported: true",
      "  workflow_metadata: false",
      "  skill_metadata: false",
      "  memory_contract: false",
      "  runtime_contract: false",
      "  evals_contract: false",
      "",
      "runtime:",
      "  mcp_servers: []",
      "  local_tools: []",
      "  privileged_operations: []",
      "",
      "memory:",
      "  enabled: false",
      "  paths:",
      "    summaries: .memory/summaries",
      "    decisions: .memory/decisions",
      "    working_state: .memory/working",
      "  policy:",
      "    source_of_truth: versioned_files",
      "    retention: local_policy",
      "",
      "evals:",
      "  enabled: false",
      "  paths:",
      "    tasks: evals/tasks",
      "    fixtures: evals/fixtures",
      "    reports: evals/reports",
      "  quality_gates: []",
      "",
      "registry:",
      "  profile: base",
      "  skill_packs: []",
      "  workflow_packs: []",
      "",
    ].join("\n")
  )

  console.log("ANR init completed")
}

module.exports = {
  runInit,
}
