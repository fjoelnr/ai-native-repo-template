#!/usr/bin/env node

const { runInit } = require("./init")
const { runValidate } = require("./validate")

const command = process.argv[2]

if (command === "init") {
  runInit()
} else if (command === "validate") {
  runValidate()
} else {
  console.log("Usage: anr <init|validate>")
  process.exitCode = 1
}
