import argparse
import asyncio
import json

from google.adk.agents import ParallelAgent
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService

from common import FixedStepAgent, make_user_message, serialize_event


def build_agent():
    return ParallelAgent(
        name="ParallelCoordinator",
        description="Runs bounded specialist agents in parallel for independent subtasks.",
        sub_agents=[
            FixedStepAgent(
                name="ResearchAgent",
                description="Collects the smallest useful research slice.",
                result_text="research complete",
                delay_seconds=0.05,
            ),
            FixedStepAgent(
                name="ExecutionAgent",
                description="Implements the narrow execution step.",
                result_text="execution complete",
                delay_seconds=0.05,
            ),
            FixedStepAgent(
                name="RiskAgent",
                description="Surfaces shipping risks that need review.",
                result_text="risk review complete",
                delay_seconds=0.05,
            ),
        ],
    )


async def run_demo(message_text="prepare the MVP launch"):
    session_service = InMemorySessionService()
    runner = Runner(
        app_name="agentic-patterns-lab",
        agent=build_agent(),
        session_service=session_service,
    )
    await session_service.create_session(
        app_name="agentic-patterns-lab",
        user_id="demo-user",
        session_id="parallel-session",
    )

    outputs = []
    async for event in runner.run_async(
        user_id="demo-user",
        session_id="parallel-session",
        new_message=make_user_message(message_text),
    ):
        outputs.append(serialize_event(event))

    return outputs


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--message", default="prepare the MVP launch")
    args = parser.parse_args()

    outputs = asyncio.run(run_demo(args.message))
    if args.json:
        print(json.dumps(outputs))
    else:
        for item in outputs:
            print(f"{item['author']}: {item['text']}")


if __name__ == "__main__":
    main()
