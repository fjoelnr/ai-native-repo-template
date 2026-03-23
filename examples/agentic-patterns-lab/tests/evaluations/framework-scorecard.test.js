const test = require("node:test")
const assert = require("node:assert/strict")

const {
  compareToBaseline,
  createBaselineFromSummary,
  renderScorecardMarkdown,
  runFrameworkScorecard,
} = require("./framework-scorecard")

test("framework scorecard shows no regressions against the committed baseline", async () => {
  const scorecard = await runFrameworkScorecard()

  assert.equal(scorecard.hasRegression, false)
  assert.equal(scorecard.currentSummary.totalFailed, 0)
  assert.equal(scorecard.delta.totalFailed, 0)
  assert.equal(scorecard.currentSummary.passRate, 1)
})

test("framework scorecard renders a readable Markdown summary", async () => {
  const scorecard = await runFrameworkScorecard()
  const markdown = renderScorecardMarkdown(scorecard)

  assert.match(markdown, /^# Framework Scorecard/m)
  assert.match(markdown, /## Tracks/m)
  assert.match(markdown, /### langgraph-real-routing/m)
  assert.match(markdown, /Overall: stable/m)
})

test("optional skipped tracks do not count as regressions against baseline", () => {
  const baseline = createBaselineFromSummary({
    totalTracks: 2,
    skippedTracks: [],
    totalCases: 3,
    totalPassed: 3,
    totalFailed: 0,
    passRate: 1,
    tracks: [
      {
        name: "required-track",
        skipped: false,
        required: true,
        runtime: "node",
        total: 1,
        passed: 1,
        failed: 0,
        passRate: 1,
        cases: [{ id: "req", passed: true, expected: { ok: true } }],
      },
      {
        name: "optional-track",
        skipped: false,
        required: false,
        runtime: "python-adk-venv",
        total: 2,
        passed: 2,
        failed: 0,
        passRate: 1,
        cases: [
          { id: "opt-1", passed: true, expected: { ok: true } },
          { id: "opt-2", passed: true, expected: { ok: true } },
        ],
      },
    ],
  })

  const scorecard = compareToBaseline(
    {
      totalTracks: 2,
      skippedTracks: ["optional-track"],
      skippedRequiredTracks: [],
      skippedOptionalTracks: ["optional-track"],
      totalCases: 1,
      totalPassed: 1,
      totalFailed: 0,
      passRate: 1,
      tracks: [
        {
          name: "required-track",
          skipped: false,
          required: true,
          runtime: "node",
          total: 1,
          passed: 1,
          failed: 0,
          passRate: 1,
          cases: [{ id: "req", passed: true, expected: { ok: true } }],
        },
        {
          name: "optional-track",
          skipped: true,
          required: false,
          runtime: "python-adk-venv",
          skipReason: "Local ADK venv not available",
          total: 0,
          passed: 0,
          failed: 0,
          passRate: 1,
          cases: [],
        },
      ],
    },
    baseline
  )

  assert.equal(scorecard.hasRegression, false)
  assert.equal(
    scorecard.trackDiffs.find((track) => track.name === "optional-track").status,
    "optional-skipped"
  )
})
