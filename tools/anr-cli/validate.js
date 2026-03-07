const fs = require("fs")
const path = require("path")

function pathExists(repoRoot, relativePath, type) {
  const fullPath = path.join(repoRoot, relativePath)
  if (!fs.existsSync(fullPath)) {
    return false
  }
  const stat = fs.statSync(fullPath)
  return type === "dir" ? stat.isDirectory() : stat.isFile()
}

function runValidate(repoRoot = process.cwd()) {
  console.log("ANR validation started")

  const requiredFiles = ["AGENTS.md", ".agents/context-index.md"]
  const requiredDirs = [
    "src",
    "tests",
    "tools",
    "docs",
    ".agents",
    ".agents/skills",
    ".agents/workflows",
    ".agents/guardrails",
  ]

  let hasMissing = false

  requiredDirs.forEach((dirPath) => {
    if (!pathExists(repoRoot, dirPath, "dir")) {
      console.log(`Missing directory: ${dirPath}/`)
      hasMissing = true
    }
  })

  requiredFiles.forEach((filePath) => {
    if (!pathExists(repoRoot, filePath, "file")) {
      console.log(`Missing file: ${filePath}`)
      hasMissing = true
    }
  })

  if (hasMissing) {
    process.exitCode = 1
    return
  }

  console.log("ANR validation passed")
}

module.exports = {
  runValidate,
}
