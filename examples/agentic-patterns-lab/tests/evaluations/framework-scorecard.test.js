const test = require("node:test")
const assert = require("node:assert/strict")

const {
  renderScorecardMarkdown,
  runFrameworkScorecard,
} = require("./framework-scorecard")

test("framework scorecard shows no regressions against the committed baseline", async () => {
  const scorecard = await runFrameworkScorecard()

  assert.equal(scorecard.hasRegression, false)
  assert.equal(scorecard.currentSummary.totalFailed, 0)
  assert.equal(scorecard.delta.totalFailed, 0)
  assert.equal(scorecard.delta.passRate, 0)
})

test("framework scorecard renders a readable Markdown summary", async () => {
  const scorecard = await runFrameworkScorecard()
  const markdown = renderScorecardMarkdown(scorecard)

  assert.match(markdown, /^# Framework Scorecard/m)
  assert.match(markdown, /## Tracks/m)
  assert.match(markdown, /### langgraph-real-routing/m)
  assert.match(markdown, /Overall: stable/m)
})
