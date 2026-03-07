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
    "# Repository Context Index\n\n- src/\n- tests/\n- tools/\n- docs/\n"
  )

  console.log("ANR init completed")
}

module.exports = {
  runInit,
}
