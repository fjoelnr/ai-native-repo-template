function classifyIntent(message) {
  const text = String(message || "").toLowerCase()

  if (text.includes("order") || text.includes("status")) {
    return "order-status"
  }

  if (text.includes("product") || text.includes("pricing")) {
    return "product-info"
  }

  if (
    text.includes("support") ||
    text.includes("broken") ||
    text.includes("error")
  ) {
    return "technical-support"
  }

  return "clarification"
}

function runGraph(message) {
  const state = {
    input: message,
    route: classifyIntent(message),
    visited: ["classifier"],
  }

  const handlers = {
    "order-status": () => ({
      ...state,
      visited: [...state.visited, "order-status-node"],
      output: "Fetch order status flow",
    }),
    "product-info": () => ({
      ...state,
      visited: [...state.visited, "product-info-node"],
      output: "Search product information flow",
    }),
    "technical-support": () => ({
      ...state,
      visited: [...state.visited, "technical-support-node"],
      output: "Run support troubleshooting flow",
    }),
    clarification: () => ({
      ...state,
      visited: [...state.visited, "clarification-node"],
      output: "Ask clarifying question",
    }),
  }

  return handlers[state.route]()
}

module.exports = {
  classifyIntent,
  runGraph,
}
