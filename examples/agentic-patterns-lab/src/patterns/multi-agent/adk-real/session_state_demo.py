import argparse
import asyncio
import json

from google.adk.agents import SequentialAgent
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService

from common import FixedStepAgent, make_user_message, serialize_event


def build_agent():
    return SequentialAgent(
        name="StateCoordinator",
        description="Writes durable session state through ADK event actions.",
        sub_agents=[
            FixedStepAgent(
                name="BriefAgent",
                description="Stores the narrowed project brief.",
                result_text="brief stored",
                state_delta={
                    "app:goal": "launch-mvp",
                    "shared:stage": "brief",
                },
            ),
            FixedStepAgent(
                name="RiskAgent",
                description="Stores the current review state.",
                result_text="risk review stored",
                state_delta={
                    "app:risk_level": "medium",
                    "shared:stage": "review",
                    "user:approval_required": "true",
                },
            ),
        ],
    )


async def run_demo(message_text="store launch state"):
    session_service = InMemorySessionService()
    runner = Runner(
        app_name="agentic-patterns-lab",
        agent=build_agent(),
        session_service=session_service,
    )
    await session_service.create_session(
        app_name="agentic-patterns-lab",
        user_id="demo-user",
        session_id="state-session",
    )

    outputs = []
    async for event in runner.run_async(
        user_id="demo-user",
        session_id="state-session",
        new_message=make_user_message(message_text),
    ):
        outputs.append(serialize_event(event))

    session = await session_service.get_session(
        app_name="agentic-patterns-lab",
        user_id="demo-user",
        session_id="state-session",
    )

    return {
        "events": outputs,
        "session_state": dict(session.state),
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--message", default="store launch state")
    args = parser.parse_args()

    outputs = asyncio.run(run_demo(args.message))
    if args.json:
        print(json.dumps(outputs))
    else:
        print("Events:")
        for item in outputs["events"]:
            print(f"{item['author']}: {item['text']}")
        print("Session state:")
        for key, value in outputs["session_state"].items():
            print(f"{key}={value}")


if __name__ == "__main__":
    main()
