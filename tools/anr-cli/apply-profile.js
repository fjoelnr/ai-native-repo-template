const fs = require("fs")
const path = require("path")

const { runInstallPack } = require("./install-pack")

function getProfilesRoot() {
  return path.resolve(__dirname, "..", "..", "profiles")
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

function getIndentedArray(lines, key) {
  const startIndex = lines.findIndex((line) => line.trim() === `${key}:`)
  if (startIndex === -1) {
    return []
  }

  const values = []
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index]
    if (line.trim() === "" || line.trim().startsWith("#")) {
      continue
    }

    if (!line.startsWith("  - ")) {
      break
    }

    values.push(line.replace(/^ {2}-\s*/, "").trim())
  }

  return values
}

function getIndentedMap(lines, key) {
  const startIndex = lines.findIndex((line) => line.trim() === `${key}:`)
  if (startIndex === -1) {
    return {}
  }

  const values = {}
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index]
    if (line.trim() === "" || line.trim().startsWith("#")) {
      continue
    }

    if (!line.startsWith("  ")) {
      break
    }

    const match = line.match(/^ {2}([^:]+):\s*(.+)$/)
    if (!match) {
      break
    }

    values[match[1].trim()] = match[2].trim()
  }

  return values
}

function getScalar(lines, key) {
  const line = lines.find((entry) => entry.startsWith(`${key}: `))
  if (!line) {
    return ""
  }
  return line.replace(new RegExp(`^${key}:\\s*`), "").trim()
}

function readProfile(profileId) {
  const profileDir = path.join(getProfilesRoot(), profileId)
  const manifestPath = path.join(profileDir, "anr.profile.yaml")
  const fragmentPath = path.join(profileDir, "AGENTS.fragment.md")

  if (!fs.existsSync(profileDir) || !fs.statSync(profileDir).isDirectory()) {
    throw new Error(`Unknown profile: ${profileId}`)
  }

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Missing profile manifest: profiles/${profileId}/anr.profile.yaml`)
  }

  if (!fs.existsSync(fragmentPath)) {
    throw new Error(`Missing profile fragment: profiles/${profileId}/AGENTS.fragment.md`)
  }

  const lines = fs.readFileSync(manifestPath, "utf8").split(/\r?\n/)

  return {
    profileId,
    category: getScalar(lines, "category"),
    recommendedDocs: getIndentedArray(lines, "recommended_docs"),
    registryPacks: getIndentedMap(lines, "registry_packs"),
    fragment: fs.readFileSync(fragmentPath, "utf8").trim(),
  }
}

function titleFromPath(filePath) {
  const baseName = path.basename(filePath, path.extname(filePath))
  return baseName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function ensureRecommendedDocs(repoRoot, profile) {
  const created = []

  profile.recommendedDocs.forEach((relativePath) => {
    const fullPath = path.join(repoRoot, relativePath)
    const dirPath = path.dirname(fullPath)

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    if (fs.existsSync(fullPath)) {
      return
    }

    const title = titleFromPath(relativePath)
    const content = [
      `# ${title}`,
      "",
      `Created by the ANR profile \`${profile.profileId}\`.`,
      "",
      "Add repository-specific guidance here.",
      "",
    ].join("\n")

    fs.writeFileSync(fullPath, content, "utf8")
    created.push(relativePath)
    console.log(`Created file: ${relativePath}`)
  })

  return created
}

function ensureAgentsProfileSection(repoRoot, profile) {
  const agentsPath = path.join(repoRoot, "AGENTS.md")
  if (!fs.existsSync(agentsPath)) {
    throw new Error("Missing AGENTS.md; run anr init before applying a profile")
  }

  const startMarker = `<!-- anr-profile:${profile.profileId}:start -->`
  const endMarker = `<!-- anr-profile:${profile.profileId}:end -->`
  const currentContent = fs.readFileSync(agentsPath, "utf8")

  if (currentContent.includes(startMarker) && currentContent.includes(endMarker)) {
    return false
  }

  const section = [
    "",
    startMarker,
    profile.fragment,
    endMarker,
    "",
  ].join("\n")

  const normalized = currentContent.endsWith("\n") ? currentContent : `${currentContent}\n`
  fs.writeFileSync(agentsPath, `${normalized}${section}`, "utf8")
  console.log(`Updated file: AGENTS.md`)
  return true
}

function updateManifestProfile(repoRoot, profileId) {
  const manifestPath = path.join(repoRoot, "anr.yaml")
  if (!fs.existsSync(manifestPath)) {
    throw new Error("Missing anr.yaml; run anr init before applying a profile")
  }

  const originalLines = fs.readFileSync(manifestPath, "utf8").split(/\r?\n/)
  const lines = [...originalLines]

  replaceYamlScalarValue(lines, "profile", profileId)

  if (!arraysEqual(lines, originalLines)) {
    fs.writeFileSync(manifestPath, lines.join("\n"), "utf8")
    console.log("Updated file: anr.yaml")
  }
}

function installProfileRegistryPacks(profile, repoRoot) {
  const packNamesByCategory = new Map()

  Object.entries(profile.registryPacks).forEach(([category, registryPath]) => {
    if (!registryPath || registryPath === "[]") {
      return
    }

    const packName = path.basename(registryPath)
    if (!packNamesByCategory.has(packName)) {
      packNamesByCategory.set(packName, [])
    }
    packNamesByCategory.get(packName).push(category)
  })

  const results = []

  packNamesByCategory.forEach((categories, packName) => {
    results.push(runInstallPack(packName, repoRoot, { categories }))
  })

  return results
}

function runApplyProfile(profileId, repoRoot = process.cwd()) {
  if (!profileId) {
    throw new Error("Missing profile id. Usage: anr apply-profile <profile-id>")
  }

  console.log(`ANR profile apply started: ${profileId}`)

  const profile = readProfile(profileId)
  const packResults = installProfileRegistryPacks(profile, repoRoot)
  const createdDocs = ensureRecommendedDocs(repoRoot, profile)
  const agentsUpdated = ensureAgentsProfileSection(repoRoot, profile)
  updateManifestProfile(repoRoot, profile.profileId)

  console.log(
    `ANR profile apply completed: ${profileId} (${packResults.length} pack installs, ${createdDocs.length} docs created, AGENTS ${agentsUpdated ? "updated" : "unchanged"})`
  )

  return {
    profileId: profile.profileId,
    createdDocs,
    agentsUpdated,
    packResults,
  }
}

module.exports = {
  runApplyProfile,
}
