const test = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const path = require("node:path")
const { spawnSync } = require("node:child_process")

const { routeRequest } = require("../src/patterns/routing/basic-router")
const {
  classifyIntent,
  runGraph,
} = require("../src/patterns/routing/langgraph-style/router-graph")
const {
  createPlan,
  replanAfterFailure,
} = require("../src/patterns/planning/goal-planner")
const {
  ConversationMemory,
} = require("../src/patterns/memory-management/conversation-memory")
const {
  coordinatePlan,
  summarizeDelegation,
} = require("../src/patterns/multi-agent/coordinator")
const {
  assignAgent,
  runCoordinator,
} = require("../src/patterns/multi-agent/adk-style/coordinator-agent")
const {
  needsHumanReview,
  createApprovalRequest,
  resolveApproval,
} = require("../src/patterns/human-in-the-loop/approval-loop")
const {
  evaluateReleaseClaim,
} = require("../src/patterns/guardrails/human-approval-gate")
const {
  evaluateGoalProgress,
} = require("../src/patterns/evaluation-and-monitoring/goal-monitor")
const { runStartupFlow } = require("../src/scenarios/startup-flow-demo")
const { orchestrateLaunch } = require("../src/scenarios/launch-orchestration-demo")

function getVenvPython() {
  const root = path.resolve(__dirname, "..")
  return process.platform === "win32"
    ? path.join(root, ".venv", "Scripts", "python.exe")
    : path.join(root, ".venv", "bin", "python")
}

function runPythonJson(scriptPath) {
  const python = getVenvPython()
  if (!fs.existsSync(python)) {
    return { skipped: true }
  }

  const result = spawnSync(python, [scriptPath, "--json"], {
    cwd: path.resolve(__dirname, ".."),
    encoding: "utf8",
  })

  assert.equal(result.status, 0, result.stderr)
  return { skipped: false, value: JSON.parse(result.stdout.trim()) }
}

test("routing example dispatches known requests", () => {
  assert.equal(routeRequest("check my order status"), "order-status")
  assert.equal(routeRequest("product catalog details"), "product-info")
  assert.equal(routeRequest("the login flow is broken"), "technical-support")
  assert.equal(routeRequest("hello there"), "clarification")
})

test("langgraph-style routing example models graph transitions", () => {
  assert.equal(classifyIntent("pricing details"), "product-info")

  const result = runGraph("pricing details")
  assert.equal(result.route, "product-info")
  assert.deepEqual(result.visited, ["classifier", "product-info-node"])
  assert.equal(result.output, "Search product information flow")
})

test("langgraph-real example runs with the actual framework package", async () => {
  const mod = await import(
    "../src/patterns/routing/langgraph-real/routing-graph.mjs"
  )

  assert.equal(mod.classifyIntent("pricing details"), "product-info")

  const result = await mod.invokeRoutingGraph("pricing details")
  assert.equal(result.route, "product-info")
  assert.deepEqual(result.visited, ["classifier", "product-info-node"])
  assert.equal(result.output, "Search product information flow")
})

test("planning example adapts to constraints and replans failures", () => {
  const plan = createPlan({
    goal: "run-growth-experiment",
    constraints: { noPaidChannels: true, requiresHumanApproval: true },
  })

  assert.equal(plan[1].title, "Choose a single non-paid channel")
  assert.equal(plan.some((step) => step.id === "human-approval"), true)

  const replanned = replanAfterFailure(
    plan,
    "launch-experiment",
    "Launch a smaller fallback experiment"
  )

  assert.equal(
    replanned.some((step) => step.id === "launch-experiment-fallback"),
    true
  )
})

test("memory example keeps short-term context bounded and long-term facts persistent", () => {
  const memory = new ConversationMemory(2)
  memory.rememberEvent("first")
  memory.rememberEvent("second")
  memory.rememberEvent("third")
  memory.promoteFact("productName", "Pattern Lab")

  const snapshot = memory.getContextSnapshot()
  assert.deepEqual(snapshot.shortTerm, ["second", "third"])
  assert.equal(snapshot.longTerm.productName, "Pattern Lab")
})

test("multi-agent example assigns plan steps to specialized agents", () => {
  const plan = createPlan({ goal: "launch-mvp" })
  const assignments = coordinatePlan(plan)
  const summary = summarizeDelegation(assignments)

  assert.equal(assignments.length, plan.length)
  assert.equal(summary["execution-agent"] > 0, true)
  assert.equal(summary["spec-agent"] > 0, true)
})

test("adk-style multi-agent example assigns specialist agents and returns events", () => {
  const tasks = [
    { id: "write-spec", type: "spec" },
    { id: "build-core", type: "execution" },
    { id: "final-review", type: "review" },
  ]

  assert.equal(assignAgent(tasks[0]).name, "SpecAgent")

  const events = runCoordinator(tasks)
  assert.equal(events.length, 3)
  assert.equal(events[1].author, "ExecutionAgent")
  assert.equal(events[2].status, "completed")
})

test("adk-real example runs with the actual framework package", (t) => {
  const script = path.resolve(
    __dirname,
    "../src/patterns/multi-agent/adk-real/sequential_demo.py"
  )
  const result = runPythonJson(script)
  if (result.skipped) {
    t.skip("local ADK venv not available")
    return
  }

  const events = result.value
  assert.equal(events.length, 3)
  assert.equal(events[0].author, "SpecAgent")
  assert.equal(events[2].author, "ReviewAgent")
})

test("adk-real parallel example runs with the actual ParallelAgent", (t) => {
  const script = path.resolve(
    __dirname,
    "../src/patterns/multi-agent/adk-real/parallel_demo.py"
  )
  const result = runPythonJson(script)
  if (result.skipped) {
    t.skip("local ADK venv not available")
    return
  }

  const events = result.value
  assert.equal(events.length, 3)
  assert.deepEqual(
    new Set(events.map((event) => event.author)),
    new Set(["ResearchAgent", "ExecutionAgent", "RiskAgent"])
  )
})

test("adk-real session-state example persists state through event actions", (t) => {
  const script = path.resolve(
    __dirname,
    "../src/patterns/multi-agent/adk-real/session_state_demo.py"
  )
  const result = runPythonJson(script)
  if (result.skipped) {
    t.skip("local ADK venv not available")
    return
  }

  const output = result.value
  assert.equal(output.events.length, 2)
  assert.equal(output.events[0].state_delta["app:goal"], "launch-mvp")
  assert.equal(output.session_state["shared:stage"], "review")
  assert.equal(output.session_state["user:approval_required"], "true")
})

test("adk-real HITL example requests, rejects, and approves tool execution", (t) => {
  const script = path.resolve(
    __dirname,
    "../src/patterns/human-in-the-loop/adk-real/tool_confirmation_demo.py"
  )
  const result = runPythonJson(script)
  if (result.skipped) {
    t.skip("local ADK venv not available")
    return
  }

  const output = result.value
  assert.equal(
    output.pending.events[0].body.error,
    "This tool call requires confirmation, please approve or reject."
  )
  assert.equal(
    output.pending.events[0].requested_confirmations["publish-release-call"]
      .confirmed,
    false
  )
  assert.equal(output.rejected.events[0].body.error, "This tool call is rejected.")
  assert.deepEqual(output.rejected.session_state, {})
  assert.equal(output.approved.events[0].body.status, "published")
  assert.equal(
    output.approved.session_state["shared:publish_status"],
    "shipped:beta"
  )
})

test("human-in-the-loop example creates and resolves approval requests", () => {
  assert.equal(
    needsHumanReview({
      touchesRiskyDomain: true,
      customerImpact: "low",
      confidence: "high",
    }),
    true
  )

  const request = createApprovalRequest({
    artifact: "launch-plan",
    reason: "risk-sensitive launch path",
    requestedReviewer: "founder",
  })

  const approved = resolveApproval(request, {
    approved: true,
    reviewer: "founder",
    note: "ship it",
  })

  assert.equal(request.status, "pending")
  assert.equal(approved.status, "approved")
  assert.equal(approved.reviewer, "founder")
})

test("guardrail example escalates risky claims without human approval", () => {
  assert.equal(
    evaluateReleaseClaim({
      evidenceLevel: "strong",
      touchesRiskyDomain: true,
      humanApproved: false,
    }),
    "escalate"
  )

  assert.equal(
    evaluateReleaseClaim({
      evidenceLevel: "weak",
      touchesRiskyDomain: false,
      humanApproved: false,
    }),
    "warn"
  )

  assert.equal(
    evaluateReleaseClaim({
      evidenceLevel: "strong",
      touchesRiskyDomain: true,
      humanApproved: true,
    }),
    "allow"
  )
})

test("monitoring example surfaces blocked and ready states", () => {
  assert.equal(
    evaluateGoalProgress({
      completedSteps: 1,
      totalSteps: 4,
      blockerCount: 1,
      knownRiskCount: 0,
    }).status,
    "blocked"
  )

  assert.equal(
    evaluateGoalProgress({
      completedSteps: 4,
      totalSteps: 4,
      blockerCount: 0,
      knownRiskCount: 0,
    }).status,
    "ready"
  )
})

test("startup flow demo composes multiple patterns into one run", () => {
  const result = runStartupFlow("product catalog launch", {
    productName: "Pattern Lab",
    noPaidChannels: true,
    requiresHumanApproval: true,
    evidenceLevel: "strong",
    touchesRiskyDomain: true,
    humanApproved: false,
    completedSteps: 1,
    blockerCount: 0,
    knownRiskCount: 1,
  })

  assert.equal(result.route, "product-info")
  assert.equal(result.plan.some((step) => step.id === "human-approval"), true)
  assert.equal(result.memory.longTerm.productName, "Pattern Lab")
  assert.equal(result.releaseDecision, "escalate")
  assert.equal(result.monitor.status, "in-progress")
})

test("launch orchestration demo combines delegation and approval flow", () => {
  const result = orchestrateLaunch({
    goal: "launch-mvp",
    requiresHumanApproval: true,
    touchesRiskyDomain: true,
    requestedReviewer: "founder",
    approved: false,
    confidence: "low",
  })

  assert.equal(result.assignments.length > 0, true)
  assert.equal(result.delegationSummary["execution-agent"] > 0, true)
  assert.equal(result.approval.status, "rejected")
})
