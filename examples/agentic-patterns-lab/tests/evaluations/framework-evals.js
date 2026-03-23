const fs = require("node:fs")
const path = require("node:path")
const { spawnSync } = require("node:child_process")

const rootDir = path.resolve(__dirname, "..", "..")
const fixturesDir = path.join(rootDir, "tests", "fixtures", "framework-evals")

function getVenvPython() {
  return process.platform === "win32"
    ? path.join(rootDir, ".venv", "Scripts", "python.exe")
    : path.join(rootDir, ".venv", "bin", "python")
}

function loadJsonFixture(name) {
  return JSON.parse(fs.readFileSync(path.join(fixturesDir, name), "utf8"))
}

function runPythonJson(scriptPath, extraArgs = []) {
  const python = getVenvPython()
  if (!fs.existsSync(python)) {
    return { skipped: true }
  }

  const result = spawnSync(python, [scriptPath, "--json", ...extraArgs], {
    cwd: rootDir,
    encoding: "utf8",
  })

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || "python command failed")
  }

  return {
    skipped: false,
    value: JSON.parse(result.stdout.trim()),
  }
}

function createCaseResult(id, passed, details = {}) {
  return {
    id,
    passed,
    ...details,
  }
}

function matchesObjectSubset(actual, expected) {
  return Object.entries(expected).every(([key, value]) => actual[key] === value)
}

function avoidsObjectSubset(actual, disallowed = {}) {
  return Object.entries(disallowed).every(([key, value]) => actual[key] !== value)
}

function summarizeTrack(name, cases, skipped = false) {
  const passedCount = cases.filter((item) => item.passed).length
  return {
    name,
    skipped,
    total: cases.length,
    passed: passedCount,
    failed: cases.length - passedCount,
    passRate: cases.length === 0 ? 1 : passedCount / cases.length,
    cases,
  }
}

async function evalLangGraphRouting() {
  const fixture = loadJsonFixture("langgraph-routing.json")
  const mod = await import(
    pathToFileUrl(
      path.join(
        rootDir,
        "src",
        "patterns",
        "routing",
        "langgraph-real",
        "routing-graph.mjs"
      )
    )
  )

  const cases = []
  for (const item of fixture) {
    const result = await mod.invokeRoutingGraph(item.input)
    const passed =
      result.route === item.expectedRoute &&
      result.output === item.expectedOutput &&
      JSON.stringify(result.visited) === JSON.stringify(item.expectedVisited)

    cases.push(
      createCaseResult(item.id, passed, {
        expected: {
          route: item.expectedRoute,
          output: item.expectedOutput,
          visited: item.expectedVisited,
        },
        actual: result,
      })
    )
  }

  return summarizeTrack("langgraph-real-routing", cases)
}

function evalAdkSequential() {
  const fixture = loadJsonFixture("adk-sequential.json")
  const script = path.join(
    rootDir,
    "src",
    "patterns",
    "multi-agent",
    "adk-real",
    "sequential_demo.py"
  )
  const cases = []

  const python = getVenvPython()
  if (!fs.existsSync(python)) {
    return summarizeTrack("adk-real-sequential", [], true)
  }

  for (const item of fixture) {
    const result = runPythonJson(script, ["--message", item.message]).value
    const authors = result.map((event) => event.author)
    const texts = result.map((event) => event.text)
    const passed =
      result.length === item.expectedEventCount &&
      JSON.stringify(authors) === JSON.stringify(item.expectedAuthors) &&
      JSON.stringify(texts) === JSON.stringify(item.expectedTexts)

    cases.push(
      createCaseResult(item.id, passed, {
        expected: {
          eventCount: item.expectedEventCount,
          authors: item.expectedAuthors,
          texts: item.expectedTexts,
        },
        actual: { eventCount: result.length, authors, texts },
      })
    )
  }

  return summarizeTrack("adk-real-sequential", cases)
}

function evalAdkParallel() {
  const fixture = loadJsonFixture("adk-parallel.json")
  const script = path.join(
    rootDir,
    "src",
    "patterns",
    "multi-agent",
    "adk-real",
    "parallel_demo.py"
  )
  const cases = []

  const python = getVenvPython()
  if (!fs.existsSync(python)) {
    return summarizeTrack("adk-real-parallel", [], true)
  }

  for (const item of fixture) {
    const result = runPythonJson(script, ["--message", item.message]).value
    const authors = result.map((event) => event.author).sort()
    const texts = result.map((event) => event.text).sort()
    const expectedAuthors = [...item.expectedAuthors].sort()
    const expectedTexts = [...item.expectedTexts].sort()
    const passed =
      result.length === item.expectedEventCount &&
      JSON.stringify(authors) === JSON.stringify(expectedAuthors) &&
      JSON.stringify(texts) === JSON.stringify(expectedTexts)

    cases.push(
      createCaseResult(item.id, passed, {
        expected: {
          eventCount: item.expectedEventCount,
          authors: expectedAuthors,
          texts: expectedTexts,
        },
        actual: { eventCount: result.length, authors, texts },
      })
    )
  }

  return summarizeTrack("adk-real-parallel", cases)
}

function evalAdkSessionState() {
  const fixture = loadJsonFixture("adk-session-state.json")
  const script = path.join(
    rootDir,
    "src",
    "patterns",
    "multi-agent",
    "adk-real",
    "session_state_demo.py"
  )
  const cases = []

  const python = getVenvPython()
  if (!fs.existsSync(python)) {
    return summarizeTrack("adk-real-session-state", [], true)
  }

  for (const item of fixture) {
    const result = runPythonJson(script, ["--message", item.message]).value
    const eventCount = result.events.length
    const state = result.session_state
    const passed =
      eventCount === item.expectedEventCount &&
      matchesObjectSubset(state, item.expectedSessionState) &&
      avoidsObjectSubset(state, item.disallowedSessionState)

    cases.push(
      createCaseResult(item.id, passed, {
        expected: {
          eventCount: item.expectedEventCount,
          sessionState: item.expectedSessionState,
          disallowedSessionState: item.disallowedSessionState,
        },
        actual: {
          eventCount,
          sessionState: state,
        },
      })
    )
  }

  return summarizeTrack("adk-real-session-state", cases)
}

function evalAdkHitl() {
  const fixture = loadJsonFixture("adk-hitl.json")
  const script = path.join(
    rootDir,
    "src",
    "patterns",
    "human-in-the-loop",
    "adk-real",
    "tool_confirmation_demo.py"
  )

  const python = getVenvPython()
  if (!fs.existsSync(python)) {
    return summarizeTrack("adk-real-hitl", [], true)
  }

  const output = runPythonJson(script).value
  const cases = []

  const pending = output.pending.events[0]
  cases.push(
    createCaseResult(
      "pending-confirmation-request",
      pending.body.error === fixture.pending.expectedError &&
        Object.prototype.hasOwnProperty.call(
          pending.requested_confirmations,
          fixture.pending.expectedConfirmationKey
        ) &&
        !Object.prototype.hasOwnProperty.call(
          output.pending.session_state,
          fixture.pending.disallowedStateKey
        ),
      {
        expected: fixture.pending,
        actual: {
          ...pending,
          sessionState: output.pending.session_state,
        },
      }
    )
  )

  const rejected = output.rejected.events[0]
  cases.push(
    createCaseResult(
      "rejected-confirmation-path",
      rejected.body.error === fixture.rejected.expectedError &&
        JSON.stringify(output.rejected.session_state) === JSON.stringify({}) &&
        !Object.prototype.hasOwnProperty.call(
          output.rejected.session_state,
          fixture.rejected.disallowedStateKey
        ),
      {
        expected: {
          ...fixture.rejected,
          sessionState: {},
        },
        actual: {
          body: rejected.body,
          sessionState: output.rejected.session_state,
        },
      }
    )
  )

  const approved = output.approved.events[0]
  cases.push(
    createCaseResult(
      "approved-confirmation-path",
      approved.body.status === fixture.approved.expectedStatus &&
        approved.body.channel === fixture.approved.expectedChannel &&
        matchesObjectSubset(
          output.approved.session_state,
          fixture.approved.expectedState
        ) &&
        (fixture.approved.expectedNoPendingConfirmation
          ? Object.keys(approved.requested_confirmations).length === 0
          : true),
      {
        expected: fixture.approved,
        actual: {
          body: approved.body,
          requestedConfirmations: approved.requested_confirmations,
          sessionState: output.approved.session_state,
        },
      }
    )
  )

  return summarizeTrack("adk-real-hitl", cases)
}

function pathToFileUrl(filePath) {
  const normalized = filePath.replace(/\\/g, "/")
  return `file:///${normalized}`
}

async function runFrameworkEvals() {
  const tracks = [
    await evalLangGraphRouting(),
    evalAdkSequential(),
    evalAdkParallel(),
    evalAdkSessionState(),
    evalAdkHitl(),
  ]

  const executedTracks = tracks.filter((track) => !track.skipped)
  const skippedTracks = tracks.filter((track) => track.skipped).map((track) => track.name)
  const totalCases = executedTracks.reduce((sum, track) => sum + track.total, 0)
  const totalPassed = executedTracks.reduce((sum, track) => sum + track.passed, 0)

  return {
    totalTracks: tracks.length,
    skippedTracks,
    totalCases,
    totalPassed,
    totalFailed: totalCases - totalPassed,
    passRate: totalCases === 0 ? 1 : totalPassed / totalCases,
    tracks,
  }
}

async function main() {
  const summary = await runFrameworkEvals()
  console.log(JSON.stringify(summary, null, 2))

  if (summary.totalFailed > 0) {
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
  runFrameworkEvals,
}
