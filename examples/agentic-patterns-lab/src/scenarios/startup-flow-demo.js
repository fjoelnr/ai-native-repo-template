const { routeRequest } = require("../patterns/routing/basic-router")
const { createPlan } = require("../patterns/planning/goal-planner")
const {
  ConversationMemory,
} = require("../patterns/memory-management/conversation-memory")
const {
  evaluateReleaseClaim,
} = require("../patterns/guardrails/human-approval-gate")
const {
  evaluateGoalProgress,
} = require("../patterns/evaluation-and-monitoring/goal-monitor")

function runStartupFlow(request, options = {}) {
  const route = routeRequest(request)
  const memory = new ConversationMemory(4)

  memory.rememberEvent({ type: "request", value: request })
  if (options.productName) {
    memory.promoteFact("productName", options.productName)
  }

  const goal =
    route === "technical-support"
      ? "launch-mvp"
      : route === "product-info"
        ? "run-growth-experiment"
        : "launch-mvp"

  const plan = createPlan({
    goal,
    constraints: {
      requiresHumanApproval: Boolean(options.requiresHumanApproval),
      noPaidChannels: Boolean(options.noPaidChannels),
    },
  })

  const releaseDecision = evaluateReleaseClaim({
    evidenceLevel: options.evidenceLevel || "weak",
    touchesRiskyDomain: Boolean(options.touchesRiskyDomain),
    humanApproved: Boolean(options.humanApproved),
  })

  const monitor = evaluateGoalProgress({
    completedSteps: options.completedSteps || 0,
    totalSteps: plan.length,
    blockerCount: options.blockerCount || 0,
    knownRiskCount: options.knownRiskCount || 0,
  })

  return {
    route,
    plan,
    memory: memory.getContextSnapshot(),
    releaseDecision,
    monitor,
  }
}

module.exports = {
  runStartupFlow,
}
