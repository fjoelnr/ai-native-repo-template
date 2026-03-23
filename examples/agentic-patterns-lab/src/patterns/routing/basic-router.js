function routeRequest(input) {
  const normalized = String(input || "").toLowerCase()

  if (normalized.includes("order") || normalized.includes("status")) {
    return "order-status"
  }

  if (normalized.includes("product") || normalized.includes("catalog")) {
    return "product-info"
  }

  if (
    normalized.includes("support") ||
    normalized.includes("broken") ||
    normalized.includes("error")
  ) {
    return "technical-support"
  }

  return "clarification"
}

module.exports = {
  routeRequest,
}
