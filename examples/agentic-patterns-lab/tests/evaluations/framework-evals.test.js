const test = require("node:test")
const assert = require("node:assert/strict")

const { runFrameworkEvals } = require("./framework-evals")

test("framework eval harness passes all executed framework-backed cases", async () => {
  const summary = await runFrameworkEvals()

  assert.equal(summary.totalFailed, 0)
  assert.equal(summary.passRate, 1)

  for (const track of summary.tracks) {
    if (track.skipped) {
      continue
    }

    assert.equal(track.failed, 0, track.name)
    assert.equal(track.passRate, 1, track.name)
  }
})
