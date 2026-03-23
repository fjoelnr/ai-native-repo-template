import { Annotation, END, START, StateGraph } from "@langchain/langgraph";

const RoutingState = Annotation.Root({
  input: Annotation(),
  route: Annotation(),
  visited: Annotation({
    reducer: (left, right) => left.concat(right),
    default: () => [],
  }),
  output: Annotation(),
});

function classifyIntent(input) {
  const text = String(input || "").toLowerCase();

  if (text.includes("order") || text.includes("status")) {
    return "order-status";
  }

  if (text.includes("product") || text.includes("pricing")) {
    return "product-info";
  }

  if (
    text.includes("support") ||
    text.includes("broken") ||
    text.includes("error")
  ) {
    return "technical-support";
  }

  return "clarification";
}

function buildRoutingGraph() {
  return new StateGraph(RoutingState)
    .addNode("classifier", (state) => ({
      route: classifyIntent(state.input),
      visited: ["classifier"],
    }))
    .addNode("order-status", () => ({
      output: "Fetch order status flow",
      visited: ["order-status-node"],
    }))
    .addNode("product-info", () => ({
      output: "Search product information flow",
      visited: ["product-info-node"],
    }))
    .addNode("technical-support", () => ({
      output: "Run support troubleshooting flow",
      visited: ["technical-support-node"],
    }))
    .addNode("clarification", () => ({
      output: "Ask clarifying question",
      visited: ["clarification-node"],
    }))
    .addEdge(START, "classifier")
    .addConditionalEdges("classifier", (state) => state.route)
    .addEdge("order-status", END)
    .addEdge("product-info", END)
    .addEdge("technical-support", END)
    .addEdge("clarification", END)
    .compile();
}

async function invokeRoutingGraph(input) {
  const graph = buildRoutingGraph();
  return graph.invoke({ input });
}

export { buildRoutingGraph, classifyIntent, invokeRoutingGraph };
