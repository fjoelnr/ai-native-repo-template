function createPlan(options = {}) {
  const { goal = "launch-mvp", constraints = {} } = options

  const templates = {
    "launch-mvp": [
      { id: "define-scope", title: "Define scope and non-goals" },
      { id: "build-core-flow", title: "Build the core user flow" },
      { id: "run-smoke-checks", title: "Run smoke checks" },
      { id: "prepare-launch", title: "Prepare launch notes" },
    ],
    "run-growth-experiment": [
      { id: "write-hypothesis", title: "Write a testable hypothesis" },
      { id: "choose-channel", title: "Choose a single channel" },
      { id: "launch-experiment", title: "Launch the experiment" },
      { id: "read-results", title: "Read results and decide next step" },
    ],
  }

  const basePlan = (templates[goal] || templates["launch-mvp"]).map((step) => ({
    ...step,
    status: "pending",
  }))

  if (constraints.requiresHumanApproval) {
    basePlan.splice(basePlan.length - 1, 0, {
      id: "human-approval",
      title: "Obtain human approval before final action",
      status: "pending",
    })
  }

  if (constraints.noPaidChannels && goal === "run-growth-experiment") {
    return basePlan.map((step) =>
      step.id === "choose-channel"
        ? { ...step, title: "Choose a single non-paid channel" }
        : step
    )
  }

  return basePlan
}

function replanAfterFailure(plan, failedStepId, fallbackTitle) {
  return plan.flatMap((step) => {
    if (step.id !== failedStepId) {
      return [step]
    }

    return [
      { ...step, status: "failed" },
      {
        id: `${failedStepId}-fallback`,
        title: fallbackTitle,
        status: "pending",
      },
    ]
  })
}

module.exports = {
  createPlan,
  replanAfterFailure,
}
