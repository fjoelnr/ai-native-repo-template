const test = require("node:test")
const assert = require("node:assert/strict")

const { main } = require("../tools/anr-cli/index")

function withConsoleCapture(callback) {
  const originalLog = console.log
  const output = []
  const priorExitCode = process.exitCode

  console.log = (message) => {
    output.push(String(message))
  }
  process.exitCode = undefined

  try {
    callback()
    return {
      output,
      exitCode: process.exitCode,
    }
  } finally {
    console.log = originalLog
    process.exitCode = priorExitCode
  }
}

test("index prints usage and exits with failure for an unknown command", () => {
  const { output, exitCode } = withConsoleCapture(() => main(["unknown"]))

  assert.equal(exitCode, 1)
  assert.deepEqual(output, ["Usage: anr <init|validate|install-pack|apply-profile> [name]"])
})

test("index passes command arguments to install-pack", () => {
  assert.throws(() => main(["install-pack"]), /Missing pack name/)
})

test("index passes command arguments to apply-profile", () => {
  assert.throws(() => main(["apply-profile"]), /Missing profile id/)
})
