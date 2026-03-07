function greet() {
  console.log("Hello from ANR example project")
}

module.exports = { greet }

if (require.main === module) {
  greet()
}
