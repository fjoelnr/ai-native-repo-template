const { createPlan } = require("../patterns/planning/goal-planner")
const {
  coordinatePlan,
  summarizeDelegation,
} = require("../patterns/multi-agent/coordinator")
const {
  needsHumanReview,
  createApprovalRequest,
  resolveApproval,
} = require("../patterns/human-in-the-loop/approval-loop")

function orchestrateLaunch(options = {}) {
  const plan = createPlan({
    goal: options.goal || "launch-mvp",
    constraints: {
      requiresHumanApproval: Boolean(options.requiresHumanApproval),
      noPaidChannels: Boolean(options.noPaidChannels),
    },
  })

  const assignments = coordinatePlan(plan)
  const delegationSummary = summarizeDelegation(assignments)

  let approval = null
  if (
    needsHumanReview({
      touchesRiskyDomain: Boolean(options.touchesRiskyDomain),
      customerImpact: options.customerImpact || "low",
      confidence: options.confidence || "medium",
    })
  ) {
    approval = createApprovalRequest({
      artifact: "launch-plan",
      reason: "risk-sensitive launch path",
      requestedReviewer: options.requestedReviewer || "founder",
    })

    if (typeof options.approved === "boolean") {
      approval = resolveApproval(approval, {
        approved: options.approved,
        reviewer: options.requestedReviewer || "founder",
        note: options.approved ? "approved for release" : "hold release",
      })
    }
  }

  return {
    plan,
    assignments,
    delegationSummary,
    approval,
  }
}

module.exports = {
  orchestrateLaunch,
}
