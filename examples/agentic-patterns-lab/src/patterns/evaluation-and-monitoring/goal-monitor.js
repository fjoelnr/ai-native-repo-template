function evaluateGoalProgress(options = {}) {
  const {
    completedSteps = 0,
    totalSteps = 1,
    blockerCount = 0,
    knownRiskCount = 0,
  } = options

  const progress = totalSteps === 0 ? 0 : completedSteps / totalSteps

  if (blockerCount > 0) {
    return {
      status: "blocked",
      progress,
      recommendation: "resolve blockers before continuing",
    }
  }

  if (progress === 1 && knownRiskCount === 0) {
    return {
      status: "ready",
      progress,
      recommendation: "ship or close the goal",
    }
  }

  return {
    status: "in-progress",
    progress,
    recommendation: "continue execution and review known risks",
  }
}

module.exports = {
  evaluateGoalProgress,
}
