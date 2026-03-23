import argparse
import asyncio
import json

from google.adk.agents import SequentialAgent
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService

from common import FixedStepAgent, make_user_message, serialize_event


def build_agent():
    return SequentialAgent(
        name="Coordinator",
        description="Runs a simple multi-agent sequence with bounded specialist agents.",
        sub_agents=[
            FixedStepAgent(
                name="SpecAgent",
                description="Turns the request into a scoped plan.",
                result_text="spec complete",
            ),
            FixedStepAgent(
                name="ExecutionAgent",
                description="Implements the bounded execution step.",
                result_text="execution complete",
            ),
            FixedStepAgent(
                name="ReviewAgent",
                description="Reviews the output and records residual risks.",
                result_text="review complete",
            ),
        ],
    )


async def run_demo(message_text="launch a narrow MVP"):
    session_service = InMemorySessionService()
    runner = Runner(app_name="agentic-patterns-lab", agent=build_agent(), session_service=session_service)
    await session_service.create_session(
        app_name="agentic-patterns-lab",
        user_id="demo-user",
        session_id="demo-session",
    )

    outputs = []
    async for event in runner.run_async(
        user_id="demo-user",
        session_id="demo-session",
        new_message=make_user_message(message_text),
    ):
        outputs.append(serialize_event(event))

    return outputs


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--message", default="launch a narrow MVP")
    args = parser.parse_args()

    outputs = asyncio.run(run_demo(args.message))
    if args.json:
        print(json.dumps(outputs))
    else:
        for item in outputs:
            print(f"{item['author']}: {item['text']}")


if __name__ == "__main__":
    main()
