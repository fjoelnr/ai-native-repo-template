const fs = require("node:fs")
const path = require("node:path")

const { runFrameworkEvals } = require("./framework-evals")

const baselinesDir = path.join(__dirname, "baselines")
const reportsDir = path.join(__dirname, "reports")
const defaultBaselinePath = path.join(
  baselinesDir,
  "framework-evals-baseline.json"
)

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function sortObject(value) {
  if (Array.isArray(value)) {
    return value.map(sortObject)
  }

  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = sortObject(value[key])
        return acc
      }, {})
  }

  return value
}

function createCaseSignature(trackName, item) {
  return `${trackName}:${item.id}`
}

function createBaselineFromSummary(summary) {
  return {
    totalTracks: summary.totalTracks,
    totalCases: summary.totalCases,
    totalPassed: summary.totalPassed,
    totalFailed: summary.totalFailed,
    passRate: summary.passRate,
    skippedTracks: [...summary.skippedTracks].sort(),
    tracks: summary.tracks.map((track) => ({
      name: track.name,
      skipped: track.skipped,
      required: track.required,
      runtime: track.runtime,
      total: track.total,
      passed: track.passed,
      failed: track.failed,
      passRate: track.passRate,
      cases: track.cases.map((item) => ({
        id: item.id,
        passed: item.passed,
        expected: sortObject(item.expected),
      })),
    })),
  }
}

function indexCases(tracks) {
  const index = new Map()
  for (const track of tracks) {
    for (const item of track.cases) {
      index.set(createCaseSignature(track.name, item), item)
    }
  }
  return index
}

function compareToBaseline(summary, baseline) {
  const current = createBaselineFromSummary(summary)
  const trackMap = new Map(current.tracks.map((track) => [track.name, track]))
  const baselineTrackMap = new Map(
    baseline.tracks.map((track) => [track.name, track])
  )

  const trackDiffs = []
  const regressions = []

  const allTrackNames = new Set([
    ...trackMap.keys(),
    ...baselineTrackMap.keys(),
  ])

  for (const trackName of [...allTrackNames].sort()) {
    const now = trackMap.get(trackName)
    const before = baselineTrackMap.get(trackName)

    if (!before) {
      trackDiffs.push({
        name: trackName,
        status: "added",
        current: now,
      })
      continue
    }

    if (!now) {
      trackDiffs.push({
        name: trackName,
        status: "removed",
        baseline: before,
      })
      regressions.push(`track removed: ${trackName}`)
      continue
    }

    const passRateDelta = now.passRate - before.passRate
    const totalDelta = now.total - before.total
    const failedDelta = now.failed - before.failed
    const skippedChanged = now.skipped !== before.skipped
    const required = now.required ?? before.required ?? true

    const caseDiffs = []
    if (!(now.skipped && !required)) {
      const currentCases = indexCases([now])
      const baselineCases = indexCases([before])
      const allCaseKeys = new Set([...currentCases.keys(), ...baselineCases.keys()])

      for (const caseKey of [...allCaseKeys].sort()) {
        const currentCase = currentCases.get(caseKey)
        const baselineCase = baselineCases.get(caseKey)

        if (!baselineCase) {
          caseDiffs.push({
            id: caseKey.split(":").slice(1).join(":"),
            status: "added",
          })
          continue
        }

        if (!currentCase) {
          caseDiffs.push({
            id: caseKey.split(":").slice(1).join(":"),
            status: "removed",
          })
          regressions.push(`case removed: ${caseKey}`)
          continue
        }

        if (baselineCase.passed && !currentCase.passed) {
          caseDiffs.push({
            id: currentCase.id,
            status: "regressed",
          })
          regressions.push(`case regressed: ${caseKey}`)
          continue
        }

        if (!baselineCase.passed && currentCase.passed) {
          caseDiffs.push({
            id: currentCase.id,
            status: "improved",
          })
          continue
        }

        caseDiffs.push({
          id: currentCase.id,
          status: "unchanged",
        })
      }
    }

    if (failedDelta > 0) {
      regressions.push(`failed count increased: ${trackName}`)
    }

    if (passRateDelta < 0) {
      regressions.push(`pass rate dropped: ${trackName}`)
    }

    if (skippedChanged && now.skipped && required) {
      regressions.push(`track became skipped: ${trackName}`)
    }

    trackDiffs.push({
      name: trackName,
      status: now.skipped && !required ? "optional-skipped" : "existing",
      baseline: {
        total: before.total,
        passed: before.passed,
        failed: before.failed,
        passRate: before.passRate,
        skipped: before.skipped,
        required: before.required ?? true,
        runtime: before.runtime ?? "local",
      },
      current: {
        total: now.total,
        passed: now.passed,
        failed: now.failed,
        passRate: now.passRate,
        skipped: now.skipped,
        required,
        runtime: now.runtime ?? before.runtime ?? "local",
        skipReason: now.skipReason ?? null,
      },
      delta: {
        total: totalDelta,
        failed: failedDelta,
        passRate: passRateDelta,
      },
      caseDiffs,
    })
  }

  return {
    baselineSummary: {
      totalTracks: baseline.totalTracks,
      totalCases: baseline.totalCases,
      totalPassed: baseline.totalPassed,
      totalFailed: baseline.totalFailed,
      passRate: baseline.passRate,
    },
    currentSummary: {
      totalTracks: current.totalTracks,
      totalCases: current.totalCases,
      totalPassed: current.totalPassed,
      totalFailed: current.totalFailed,
      passRate: current.passRate,
    },
    delta: {
      totalTracks: current.totalTracks - baseline.totalTracks,
      totalCases: current.totalCases - baseline.totalCases,
      totalPassed: current.totalPassed - baseline.totalPassed,
      totalFailed: current.totalFailed - baseline.totalFailed,
      passRate: current.passRate - baseline.passRate,
    },
    regressions,
    hasRegression: regressions.length > 0,
    trackDiffs,
  }
}

function loadBaseline(filePath = defaultBaselinePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

function saveBaseline(summary, filePath = defaultBaselinePath) {
  ensureDirectory(path.dirname(filePath))
  const baseline = createBaselineFromSummary(summary)
  fs.writeFileSync(filePath, JSON.stringify(baseline, null, 2) + "\n")
  return baseline
}

function writeScorecardReport(scorecard, filePath) {
  ensureDirectory(path.dirname(filePath))
  fs.writeFileSync(filePath, JSON.stringify(scorecard, null, 2) + "\n")
}

function formatDelta(value) {
  if (value > 0) {
    return `+${value}`
  }

  return String(value)
}

function renderScorecardMarkdown(scorecard) {
  const lines = []
  lines.push("# Framework Scorecard")
  lines.push("")
  lines.push(
    `Overall: ${scorecard.hasRegression ? "regression detected" : "stable"}`
  )
  lines.push("")
  lines.push("| Metric | Baseline | Current | Delta |")
  lines.push("| --- | ---: | ---: | ---: |")
  lines.push(
    `| Tracks | ${scorecard.baselineSummary.totalTracks} | ${scorecard.currentSummary.totalTracks} | ${formatDelta(scorecard.delta.totalTracks)} |`
  )
  lines.push(
    `| Cases | ${scorecard.baselineSummary.totalCases} | ${scorecard.currentSummary.totalCases} | ${formatDelta(scorecard.delta.totalCases)} |`
  )
  lines.push(
    `| Passed | ${scorecard.baselineSummary.totalPassed} | ${scorecard.currentSummary.totalPassed} | ${formatDelta(scorecard.delta.totalPassed)} |`
  )
  lines.push(
    `| Failed | ${scorecard.baselineSummary.totalFailed} | ${scorecard.currentSummary.totalFailed} | ${formatDelta(scorecard.delta.totalFailed)} |`
  )
  lines.push(
    `| Pass rate | ${scorecard.baselineSummary.passRate.toFixed(2)} | ${scorecard.currentSummary.passRate.toFixed(2)} | ${formatDelta(Number(scorecard.delta.passRate.toFixed(2)))} |`
  )

  if (scorecard.regressions.length > 0) {
    lines.push("")
    lines.push("## Regressions")
    lines.push("")
    for (const item of scorecard.regressions) {
      lines.push(`- ${item}`)
    }
  }

  lines.push("")
  lines.push("## Tracks")
  lines.push("")

  for (const track of scorecard.trackDiffs) {
    lines.push(`### ${track.name}`)
    lines.push("")

    if (track.status === "added") {
      lines.push("- status: added")
      lines.push(
        `- current: ${track.current.passed}/${track.current.total} passed`
      )
      lines.push("")
      continue
    }

    if (track.status === "removed") {
      lines.push("- status: removed")
      lines.push("")
      continue
    }

    if (track.status === "optional-skipped") {
      lines.push("- status: optional runtime skipped")
      lines.push(`- runtime: ${track.current.runtime}`)
      lines.push(`- reason: ${track.current.skipReason || "not provided"}`)
      lines.push("")
      continue
    }

    lines.push(
      `- status: ${track.current.failed === 0 ? "stable" : "degraded"}`
    )
    lines.push(
      `- summary: ${track.current.passed}/${track.current.total} passed, delta failed ${formatDelta(track.delta.failed)}, delta pass rate ${formatDelta(Number(track.delta.passRate.toFixed(2)))}`
    )

    const highlights = track.caseDiffs.filter(
      (item) => item.status !== "unchanged"
    )

    if (highlights.length === 0) {
      lines.push("- case changes: none")
      lines.push("")
      continue
    }

    lines.push("- case changes:")
    for (const item of highlights) {
      lines.push(`  - ${item.id}: ${item.status}`)
    }
    lines.push("")
  }

  return lines.join("\n") + "\n"
}

function writeScorecardMarkdown(scorecard, filePath) {
  ensureDirectory(path.dirname(filePath))
  fs.writeFileSync(filePath, renderScorecardMarkdown(scorecard))
}

async function runFrameworkScorecard(options = {}) {
  const {
    baselinePath = defaultBaselinePath,
    writeReport = false,
    reportPath = path.join(reportsDir, "framework-scorecard.latest.json"),
    writeMarkdown = false,
    markdownPath = path.join(reportsDir, "framework-scorecard.latest.md"),
  } = options

  const summary = await runFrameworkEvals()
  const baseline = loadBaseline(baselinePath)
  const scorecard = compareToBaseline(summary, baseline)

  if (writeReport) {
    writeScorecardReport(scorecard, reportPath)
  }

  if (writeMarkdown) {
    writeScorecardMarkdown(scorecard, markdownPath)
  }

  return scorecard
}

async function main() {
  const args = new Set(process.argv.slice(2))

  if (args.has("--refresh-baseline")) {
    const summary = await runFrameworkEvals()
    const baseline = saveBaseline(summary)
    console.log(JSON.stringify(baseline, null, 2))
    return
  }

  const scorecard = await runFrameworkScorecard({
    writeReport: args.has("--write-report"),
    writeMarkdown: args.has("--write-markdown") || args.has("--write-report"),
  })
  console.log(JSON.stringify(scorecard, null, 2))

  if (scorecard.hasRegression) {
    process.exitCode = 1
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}

module.exports = {
  compareToBaseline,
  createBaselineFromSummary,
  defaultBaselinePath,
  loadBaseline,
  renderScorecardMarkdown,
  runFrameworkScorecard,
  saveBaseline,
  writeScorecardMarkdown,
  writeScorecardReport,
}
