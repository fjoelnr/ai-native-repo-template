const { greet } = require("../src/main")

describe("basic ANR example", () => {
  test("exports greet function", () => {
    expect(typeof greet).toBe("function")
  })
})
