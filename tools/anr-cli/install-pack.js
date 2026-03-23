const fs = require("fs")
const path = require("path")

function ensureDir(repoRoot, dirPath) {
  const fullPath = path.join(repoRoot, dirPath)
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true })
    console.log(`Created directory: ${dirPath}/`)
  }
}

function getRegistryRoot() {
  return path.resolve(__dirname, "..", "..", "registry")
}

function getPackFiles(categoryDir, packName) {
  const packDir = path.join(getRegistryRoot(), categoryDir, packName)
  if (!fs.existsSync(packDir) || !fs.statSync(packDir).isDirectory()) {
    return []
  }

  return fs
    .readdirSync(packDir)
    .filter((fileName) => fileName.endsWith(".md") && fileName !== "README.md")
    .map((fileName) => ({
      name: fileName,
      sourcePath: path.join(packDir, fileName),
    }))
}

function arraysEqual(left, right) {
  return JSON.stringify(left) === JSON.stringify(right)
}

function replaceYamlScalarValue(lines, key, nextValue) {
  const lineIndex = lines.findIndex((line) => line.trim().startsWith(`${key}: `))
  if (lineIndex === -1) {
    return false
  }

  const indentMatch = lines[lineIndex].match(/^(\s*)/)
  const indent = indentMatch ? indentMatch[1] : ""
  lines[lineIndex] = `${indent}${key}: ${nextValue}`
  return true
}

function upsertYamlArrayValue(lines, key, value) {
  const keyIndex = lines.findIndex((line) => line.trim() === `${key}: []`)
  if (keyIndex !== -1) {
    lines.splice(keyIndex, 1, `  ${key}:`, `    - ${value}`)
    return true
  }

  const blockIndex = lines.findIndex((line) => line.trim() === `${key}:`)
  if (blockIndex === -1) {
    return false
  }

  let insertIndex = blockIndex + 1
  const existingValues = []

  while (insertIndex < lines.length) {
    const line = lines[insertIndex]
    if (line.trim() === "" || line.trim().startsWith("#")) {
      insertIndex += 1
      continue
    }

    if (!line.startsWith("    - ")) {
      break
    }

    existingValues.push(line.replace(/^ {4}-\s*/, ""))
    insertIndex += 1
  }

  if (existingValues.includes(value)) {
    return true
  }

  const updatedValues = [...existingValues, value].sort()
  const replacement = [`  ${key}:`, ...updatedValues.map((item) => `    - ${item}`)]
  lines.splice(blockIndex, insertIndex - blockIndex, ...replacement)
  return true
}

function updateManifestRegistry(repoRoot, packName, installedCategories) {
  const manifestPath = path.join(repoRoot, "anr.yaml")
  if (!fs.existsSync(manifestPath)) {
    return
  }

  const originalLines = fs.readFileSync(manifestPath, "utf8").split(/\r?\n/)
  const lines = [...originalLines]

  const registryIndex = lines.findIndex((line) => line.trim() === "registry:")
  if (registryIndex === -1) {
    return
  }

  if (installedCategories.includes("skills")) {
    upsertYamlArrayValue(lines, "skill_packs", packName)
    replaceYamlScalarValue(lines, "skill_metadata", "true")
  }

  if (installedCategories.includes("workflows")) {
    upsertYamlArrayValue(lines, "workflow_packs", packName)
    replaceYamlScalarValue(lines, "workflow_metadata", "true")
  }

  if (!arraysEqual(lines, originalLines)) {
    fs.writeFileSync(manifestPath, lines.join("\n"), "utf8")
    console.log("Updated file: anr.yaml")
  }
}

function copyPackFiles(repoRoot, targetDir, files) {
  const results = {
    installed: [],
    skipped: [],
  }

  files.forEach(({ name, sourcePath }) => {
    const targetPath = path.join(repoRoot, targetDir, name)
    const sourceContent = fs.readFileSync(sourcePath, "utf8")

    if (fs.existsSync(targetPath)) {
      const targetContent = fs.readFileSync(targetPath, "utf8")
      if (targetContent === sourceContent) {
        results.skipped.push(path.join(targetDir, name))
        return
      }

      throw new Error(
        `Refusing to overwrite existing file with different contents: ${path.join(targetDir, name)}`
      )
    }

    fs.writeFileSync(targetPath, sourceContent, "utf8")
    results.installed.push(path.join(targetDir, name))
    console.log(`Installed file: ${path.join(targetDir, name)}`)
  })

  return results
}

function runInstallPack(packName, repoRoot = process.cwd()) {
  if (!packName) {
    throw new Error("Missing pack name. Usage: anr install-pack <pack-name>")
  }

  console.log(`ANR pack install started: ${packName}`)

  ensureDir(repoRoot, ".agents")
  ensureDir(repoRoot, ".agents/skills")
  ensureDir(repoRoot, ".agents/workflows")
  ensureDir(repoRoot, ".agents/guardrails")

  const categoryConfigs = [
    { registryDir: "skills", targetDir: ".agents/skills" },
    { registryDir: "workflows", targetDir: ".agents/workflows" },
    { registryDir: "guardrails", targetDir: ".agents/guardrails" },
  ]

  const installedCategories = []
  const summary = []

  categoryConfigs.forEach(({ registryDir, targetDir }) => {
    const files = getPackFiles(registryDir, packName)
    if (files.length === 0) {
      return
    }

    installedCategories.push(registryDir)
    const result = copyPackFiles(repoRoot, targetDir, files)
    summary.push({
      category: registryDir,
      ...result,
    })
  })

  if (installedCategories.length === 0) {
    throw new Error(`Unknown pack: ${packName}`)
  }

  updateManifestRegistry(repoRoot, packName, installedCategories)

  const installedCount = summary.reduce((sum, item) => sum + item.installed.length, 0)
  const skippedCount = summary.reduce((sum, item) => sum + item.skipped.length, 0)

  console.log(
    `ANR pack install completed: ${packName} (${installedCount} installed, ${skippedCount} skipped)`
  )

  return {
    packName,
    installedCategories,
    summary,
  }
}

module.exports = {
  runInstallPack,
}
