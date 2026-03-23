function selectAgentForStep(stepId) {
  if (stepId.includes("scope") || stepId.includes("hypothesis")) {
    return "spec-agent"
  }

  if (
    stepId.includes("build") ||
    stepId.includes("launch") ||
    stepId.includes("experiment")
  ) {
    return "execution-agent"
  }

  if (
    stepId.includes("approval") ||
    stepId.includes("check") ||
    stepId.includes("read") ||
    stepId.includes("monitor")
  ) {
    return "review-agent"
  }

  return "coordinator-agent"
}

function coordinatePlan(plan = []) {
  return plan.map((step) => ({
    ...step,
    assignedAgent: selectAgentForStep(step.id),
  }))
}

function summarizeDelegation(assignments = []) {
  return assignments.reduce((summary, item) => {
    const current = summary[item.assignedAgent] || 0
    return {
      ...summary,
      [item.assignedAgent]: current + 1,
    }
  }, {})
}

module.exports = {
  coordinatePlan,
  summarizeDelegation,
}
