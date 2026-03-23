# LangGraph Real

This example uses the real `@langchain/langgraph` package.

It demonstrates:

- graph state defined with LangGraph annotations
- a classifier node
- route-dependent transitions via `addConditionalEdges`
- execution through `graph.invoke(...)`

It intentionally avoids external model providers so the example remains runnable without API keys.

Official references:

- https://docs.langchain.com/oss/javascript/langgraph/install
- https://docs.langchain.com/oss/javascript/langgraph/graph-api
