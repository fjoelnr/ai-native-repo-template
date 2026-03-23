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

function readLines(filePath) {
  return fs.readFileSync(filePath, "utf8").split(/\r?\n/)
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function leadingSpaces(line) {
  const match = line.match(/^ */)
  return match ? match[0].length : 0
}

function isIgnorableYamlLine(line) {
  const trimmed = line.trim()
  return trimmed === "" || trimmed.startsWith("#")
}

function findBlockEnd(lines, startIndex, indent) {
  for (let i = startIndex + 1; i < lines.length; i += 1) {
    if (isIgnorableYamlLine(lines[i])) {
      continue
    }
    if (leadingSpaces(lines[i]) <= indent) {
      return i
    }
  }
  return lines.length
}

function findYamlEntry(lines, keyPath) {
  let scopeStart = 0
  let scopeEnd = lines.length
  let indent = 0

  for (let index = 0; index < keyPath.length; index += 1) {
    const key = keyPath[index]
    const pattern = new RegExp(`^ {${indent}}${escapeRegExp(key)}:(.*)$`)

    let matchIndex = -1
    let value = ""

    for (let i = scopeStart; i < scopeEnd; i += 1) {
      const match = lines[i].match(pattern)
      if (match) {
        matchIndex = i
        value = match[1].trim()
        break
      }
    }

    if (matchIndex === -1) {
      return { exists: false }
    }

    const blockEnd = findBlockEnd(lines, matchIndex, indent)
    const entry = {
      exists: true,
      value,
      indent,
      lineNumber: matchIndex + 1,
      blockLines: lines.slice(matchIndex + 1, blockEnd),
    }

    if (index === keyPath.length - 1) {
      return entry
    }

    if (value !== "") {
      return {
        ...entry,
        invalidNesting: true,
      }
    }

    scopeStart = matchIndex + 1
    scopeEnd = blockEnd
    indent += 2
  }

  return { exists: false }
}

function parseScalar(value) {
  if (value === "true") {
    return true
  }
  if (value === "false") {
    return false
  }
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }
  return value
}

function getYamlScalar(lines, keyPath) {
  const entry = findYamlEntry(lines, keyPath)
  if (!entry.exists || entry.invalidNesting || entry.value === "") {
    return {
      exists: false,
      lineNumber: entry.lineNumber,
    }
  }
  return {
    exists: true,
    value: parseScalar(entry.value),
    lineNumber: entry.lineNumber,
  }
}

function getYamlArray(lines, keyPath) {
  const entry = findYamlEntry(lines, keyPath)
  if (!entry.exists) {
    return {
      exists: false,
      values: [],
      lineNumber: null,
    }
  }

  if (entry.value === "[]") {
    return {
      exists: true,
      values: [],
      lineNumber: entry.lineNumber,
    }
  }

  if (entry.value !== "") {
    return {
      exists: true,
      values: [parseScalar(entry.value)],
      lineNumber: entry.lineNumber,
    }
  }

  const itemIndent = entry.indent + 2
  const values = []

  entry.blockLines.forEach((line) => {
    const match = line.match(new RegExp(`^ {${itemIndent}}-\\s*(.*)$`))
    if (match) {
      values.push(parseScalar(match[1].trim()))
    }
  })

  return {
    exists: true,
    values,
    lineNumber: entry.lineNumber,
  }
}

function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  return match ? match[1] : null
}

function listMarkdownFiles(repoRoot, relativeDir) {
  const fullDir = path.join(repoRoot, relativeDir)
  if (!fs.existsSync(fullDir)) {
    return []
  }
  return fs
    .readdirSync(fullDir)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => path.join(relativeDir, fileName))
}

function addError(errors, message) {
  errors.push(message)
}

function validateRequiredPath(errors, repoRoot, manifestLines, yamlPath, type) {
  const entry = getYamlScalar(manifestLines, yamlPath)
  const label = yamlPath.join(".")

  if (!entry.exists || !entry.value) {
    addError(errors, `Missing manifest field: ${label}`)
    return
  }

  if (!pathExists(repoRoot, entry.value, type)) {
    addError(errors, `Manifest path does not exist for ${label}: ${entry.value}`)
  }
}

function validateMetadataDirectory({
  errors,
  repoRoot,
  relativeDir,
  type,
  requiredFields,
  requireFrontmatter,
}) {
  const files = listMarkdownFiles(repoRoot, relativeDir)
  const ids = new Map()
  let frontmatterCount = 0

  files.forEach((relativeFile) => {
    const fullPath = path.join(repoRoot, relativeFile)
    const content = fs.readFileSync(fullPath, "utf8")
    const frontmatter = extractFrontmatter(content)

    if (!frontmatter) {
      if (requireFrontmatter) {
        addError(errors, `Missing ${type} front matter: ${relativeFile}`)
      }
      return
    }

    frontmatterCount += 1
    const lines = frontmatter.split(/\r?\n/)

    const kindEntry = getYamlScalar(lines, ["anr", "kind"])
    if (!kindEntry.exists || kindEntry.value !== type) {
      addError(errors, `Invalid ${type} kind in ${relativeFile}; expected anr.kind: ${type}`)
    }

    const versionEntry = getYamlScalar(lines, ["anr", "version"])
    if (!versionEntry.exists || String(versionEntry.value) !== "0.2") {
      addError(errors, `Invalid ${type} metadata version in ${relativeFile}; expected anr.version: 0.2`)
    }

    requiredFields.forEach((fieldPath) => {
      const entry = getYamlScalar(lines, fieldPath)
      if (!entry.exists || entry.value === "") {
        addError(errors, `Missing ${type} field in ${relativeFile}: ${fieldPath.join(".")}`)
      }
    })

    const idField = [type, "id"]
    const idEntry = getYamlScalar(lines, idField)
    if (idEntry.exists && idEntry.value !== "") {
      const priorFile = ids.get(idEntry.value)
      if (priorFile) {
        addError(errors, `Duplicate ${type} id "${idEntry.value}" in ${relativeFile} and ${priorFile}`)
      } else {
        ids.set(idEntry.value, relativeFile)
      }
    }
  })

  return {
    fileCount: files.length,
    frontmatterCount,
  }
}

function validateManifest(errors, repoRoot) {
  const manifestPath = path.join(repoRoot, "anr.yaml")
  if (!fs.existsSync(manifestPath)) {
    return {
      workflowMetadata: false,
      skillMetadata: false,
    }
  }

  const lines = readLines(manifestPath)

  const requiredFilePaths = [
    ["agent_interface", "global_context"],
    ["agent_interface", "repository_map"],
  ]

  const requiredDirPaths = [
    ["directories", "source"],
    ["directories", "tests"],
    ["directories", "tools"],
    ["directories", "documentation"],
    ["agent_components", "skills"],
    ["agent_components", "workflows"],
    ["agent_components", "guardrails"],
  ]

  const requiredScalarFields = [
    ["anr_version"],
    ["repository", "name"],
    ["repository", "type"],
  ]

  requiredScalarFields.forEach((fieldPath) => {
    const entry = getYamlScalar(lines, fieldPath)
    if (!entry.exists || entry.value === "") {
      addError(errors, `Missing manifest field: ${fieldPath.join(".")}`)
    }
  })

  requiredFilePaths.forEach((fieldPath) => {
    validateRequiredPath(errors, repoRoot, lines, fieldPath, "file")
  })

  requiredDirPaths.forEach((fieldPath) => {
    validateRequiredPath(errors, repoRoot, lines, fieldPath, "dir")
  })

  const workflowMetadata = getYamlScalar(lines, ["capabilities", "workflow_metadata"])
  const skillMetadata = getYamlScalar(lines, ["capabilities", "skill_metadata"])
  const runtimeContract = getYamlScalar(lines, ["capabilities", "runtime_contract"])
  const memoryContract = getYamlScalar(lines, ["capabilities", "memory_contract"])
  const evalsContract = getYamlScalar(lines, ["capabilities", "evals_contract"])

  if (!workflowMetadata.exists) {
    addError(errors, "Missing manifest field: capabilities.workflow_metadata")
  }
  if (!skillMetadata.exists) {
    addError(errors, "Missing manifest field: capabilities.skill_metadata")
  }
  if (!runtimeContract.exists) {
    addError(errors, "Missing manifest field: capabilities.runtime_contract")
  }
  if (!memoryContract.exists) {
    addError(errors, "Missing manifest field: capabilities.memory_contract")
  }
  if (!evalsContract.exists) {
    addError(errors, "Missing manifest field: capabilities.evals_contract")
  }

  const runtimeSignals =
    getYamlArray(lines, ["runtime", "mcp_servers"]).values.length +
    getYamlArray(lines, ["runtime", "local_tools"]).values.length +
    getYamlArray(lines, ["runtime", "privileged_operations"]).values.length

  if (runtimeSignals > 0 && runtimeContract.value !== true) {
    addError(
      errors,
      "Manifest mismatch: runtime declarations exist but capabilities.runtime_contract is not true"
    )
  }

  const memoryEnabled = getYamlScalar(lines, ["memory", "enabled"])
  if (memoryEnabled.exists && memoryEnabled.value === true) {
    if (memoryContract.value !== true) {
      addError(
        errors,
        "Manifest mismatch: memory.enabled is true but capabilities.memory_contract is not true"
      )
    }

    ;[
      ["memory", "paths", "summaries"],
      ["memory", "paths", "decisions"],
      ["memory", "paths", "working_state"],
    ].forEach((fieldPath) => {
      validateRequiredPath(errors, repoRoot, lines, fieldPath, "dir")
    })
  }

  const evalsEnabled = getYamlScalar(lines, ["evals", "enabled"])
  if (evalsEnabled.exists && evalsEnabled.value === true) {
    if (evalsContract.value !== true) {
      addError(
        errors,
        "Manifest mismatch: evals.enabled is true but capabilities.evals_contract is not true"
      )
    }

    ;[
      ["evals", "paths", "tasks"],
      ["evals", "paths", "fixtures"],
      ["evals", "paths", "reports"],
    ].forEach((fieldPath) => {
      validateRequiredPath(errors, repoRoot, lines, fieldPath, "dir")
    })
  }

  return {
    workflowMetadata: workflowMetadata.value === true,
    skillMetadata: skillMetadata.value === true,
  }
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

  const errors = []

  requiredDirs.forEach((dirPath) => {
    if (!pathExists(repoRoot, dirPath, "dir")) {
      addError(errors, `Missing directory: ${dirPath}/`)
    }
  })

  requiredFiles.forEach((filePath) => {
    if (!pathExists(repoRoot, filePath, "file")) {
      addError(errors, `Missing file: ${filePath}`)
    }
  })

  if (errors.length > 0) {
    errors.forEach((message) => console.log(message))
    process.exitCode = 1
    return
  }

  const manifestValidation = validateManifest(errors, repoRoot)

  const workflowValidation = validateMetadataDirectory({
    errors,
    repoRoot,
    relativeDir: ".agents/workflows",
    type: "workflow",
    requiredFields: [
      ["workflow", "id"],
      ["workflow", "title"],
      ["workflow", "intent"],
    ],
    requireFrontmatter: manifestValidation.workflowMetadata,
  })

  const skillValidation = validateMetadataDirectory({
    errors,
    repoRoot,
    relativeDir: ".agents/skills",
    type: "skill",
    requiredFields: [
      ["skill", "id"],
      ["skill", "title"],
      ["skill", "summary"],
    ],
    requireFrontmatter: manifestValidation.skillMetadata,
  })

  if (workflowValidation.frontmatterCount > 0 && !manifestValidation.workflowMetadata) {
    addError(
      errors,
      "Manifest mismatch: workflow front matter exists but capabilities.workflow_metadata is not true"
    )
  }

  if (skillValidation.frontmatterCount > 0 && !manifestValidation.skillMetadata) {
    addError(
      errors,
      "Manifest mismatch: skill front matter exists but capabilities.skill_metadata is not true"
    )
  }

  if (errors.length > 0) {
    errors.forEach((message) => console.log(message))
    process.exitCode = 1
    return
  }

  console.log("ANR validation passed")
}

module.exports = {
  runValidate,
}
