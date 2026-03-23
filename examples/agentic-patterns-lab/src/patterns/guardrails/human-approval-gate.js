function evaluateReleaseClaim(options = {}) {
  const {
    evidenceLevel = "weak",
    touchesRiskyDomain = false,
    humanApproved = false,
  } = options

  if (touchesRiskyDomain && !humanApproved) {
    return "escalate"
  }

  if (evidenceLevel !== "strong") {
    return "warn"
  }

  return "allow"
}

module.exports = {
  evaluateReleaseClaim,
}
