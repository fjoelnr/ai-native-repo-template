#!/usr/bin/env node

const { runApplyProfile } = require("./apply-profile")
const { runInit } = require("./init")
const { runInstallPack } = require("./install-pack")
const { runValidate } = require("./validate")

function printUsage() {
  console.log("Usage: anr <init|validate|install-pack|apply-profile> [name]")
}

function main(argv = process.argv.slice(2)) {
  const command = argv[0]

  if (command === "init") {
    runInit()
  } else if (command === "validate") {
    runValidate()
  } else if (command === "install-pack") {
    runInstallPack(argv[1])
  } else if (command === "apply-profile") {
    runApplyProfile(argv[1])
  } else {
    printUsage()
    process.exitCode = 1
  }
}

if (require.main === module) {
  try {
    main()
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}

module.exports = {
  main,
  printUsage,
}
