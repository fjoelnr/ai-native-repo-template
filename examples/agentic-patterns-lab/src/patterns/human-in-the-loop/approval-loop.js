function needsHumanReview(options = {}) {
  const {
    touchesRiskyDomain = false,
    customerImpact = "low",
    confidence = "medium",
  } = options

  return (
    touchesRiskyDomain ||
    customerImpact === "high" ||
    confidence === "low"
  )
}

function createApprovalRequest(options = {}) {
  return {
    status: "pending",
    artifact: options.artifact || "unspecified-artifact",
    reason: options.reason || "manual review required",
    requestedReviewer: options.requestedReviewer || "human-operator",
  }
}

function resolveApproval(request, resolution = {}) {
  return {
    ...request,
    status: resolution.approved ? "approved" : "rejected",
    reviewer: resolution.reviewer || request.requestedReviewer,
    note: resolution.note || "",
  }
}

module.exports = {
  needsHumanReview,
  createApprovalRequest,
  resolveApproval,
}
