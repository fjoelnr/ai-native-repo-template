#!/usr/bin/env node

const { runInit } = require("./init")

const command = process.argv[2]

if (command === "init") {
  runInit()
} else if (command === "validate") {
  console.log("validate command not implemented yet")
  process.exitCode = 1
} else {
  console.log("Usage: anr <init|validate>")
  process.exitCode = 1
}
