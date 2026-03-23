#!/usr/bin/env node

const { runInit } = require("./init")
const { runInstallPack } = require("./install-pack")
const { runValidate } = require("./validate")

const command = process.argv[2]

function printUsage() {
  console.log("Usage: anr <init|validate|install-pack> [pack-name]")
}

try {
  if (command === "init") {
    runInit()
  } else if (command === "validate") {
    runValidate()
  } else if (command === "install-pack") {
    runInstallPack(process.argv[3])
  } else {
    printUsage()
    process.exitCode = 1
  }
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
