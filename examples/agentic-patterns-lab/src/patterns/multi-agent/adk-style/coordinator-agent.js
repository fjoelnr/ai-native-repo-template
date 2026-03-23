function createAgent(name, canHandle) {
  return {
    name,
    canHandle,
    run(task) {
      return {
        author: name,
        taskId: task.id,
        status: "completed",
        result: `${name} handled ${task.id}`,
      }
    },
  }
}

const specialistAgents = [
  createAgent("SpecAgent", (task) => task.type === "spec"),
  createAgent("ExecutionAgent", (task) => task.type === "execution"),
  createAgent("ReviewAgent", (task) => task.type === "review"),
]

function assignAgent(task) {
  return specialistAgents.find((agent) => agent.canHandle(task)) || null
}

function runCoordinator(tasks = []) {
  return tasks.map((task) => {
    const agent = assignAgent(task)

    if (!agent) {
      return {
        author: "Coordinator",
        taskId: task.id,
        status: "unassigned",
        result: "No specialist available",
      }
    }

    return agent.run(task)
  })
}

module.exports = {
  assignAgent,
  runCoordinator,
}
