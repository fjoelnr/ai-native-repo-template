import argparse
import asyncio
import json
import warnings

from google.adk.agents import BaseAgent
from google.adk.agents.context import Context
from google.adk.agents.invocation_context import InvocationContext
from google.adk.events import Event, EventActions
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.adk.tools import FunctionTool
from google.adk.tools.tool_confirmation import ToolConfirmation
from google.genai import types


warnings.filterwarnings(
    "ignore",
    message=r"\[EXPERIMENTAL\] feature .*TOOL_CONFIRMATION.* is enabled\.",
    category=UserWarning,
)


def publish_release(channel: str, tool_context: Context):
    tool_context.state["shared:publish_status"] = f"shipped:{channel}"
    return {
        "status": "published",
        "channel": channel,
    }


class ApprovalAgent(BaseAgent):
    decision: str = "pending"

    async def _run_async_impl(self, context: InvocationContext):
        actions = EventActions()
        tool_confirmation = None
        if self.decision != "pending":
            tool_confirmation = ToolConfirmation(
                confirmed=self.decision == "approved",
            )

        tool = FunctionTool(publish_release, require_confirmation=True)
        tool_context = Context(
            context,
            event_actions=actions,
            function_call_id="publish-release-call",
            tool_confirmation=tool_confirmation,
        )
        result = await tool.run_async(
            args={"channel": "beta"},
            tool_context=tool_context,
        )

        yield Event(
            author=self.name,
            invocationId=context.invocation_id,
            actions=actions,
            content=types.Content(
                role="model",
                parts=[types.Part.from_text(text=json.dumps(result))],
            ),
        )


def make_user_message(text: str):
    return types.Content(
        role="user",
        parts=[types.Part.from_text(text=text)],
    )


def serialize_event(event: Event):
    body = {}
    if event.content and event.content.parts:
        body = json.loads(event.content.parts[0].text)

    confirmations = {}
    if event.actions and event.actions.requested_tool_confirmations:
        confirmations = {
            key: value.model_dump()
            for key, value in event.actions.requested_tool_confirmations.items()
        }

    state_delta = {}
    if event.actions and event.actions.state_delta:
        state_delta = dict(event.actions.state_delta)

    return {
        "author": event.author,
        "body": body,
        "requested_confirmations": confirmations,
        "state_delta": state_delta,
    }


async def run_case(decision: str):
    session_service = InMemorySessionService()
    runner = Runner(
        app_name="agentic-patterns-lab",
        agent=ApprovalAgent(
            name="ApprovalAgent",
            description="Shows the ADK tool confirmation path.",
            decision=decision,
        ),
        session_service=session_service,
    )
    await session_service.create_session(
        app_name="agentic-patterns-lab",
        user_id="demo-user",
        session_id=f"hitl-{decision}",
    )

    outputs = []
    async for event in runner.run_async(
        user_id="demo-user",
        session_id=f"hitl-{decision}",
        new_message=make_user_message("ship the beta release"),
    ):
        outputs.append(serialize_event(event))

    session = await session_service.get_session(
        app_name="agentic-patterns-lab",
        user_id="demo-user",
        session_id=f"hitl-{decision}",
    )

    return {
        "events": outputs,
        "session_state": dict(session.state),
    }


async def run_demo():
    return {
        "pending": await run_case("pending"),
        "rejected": await run_case("rejected"),
        "approved": await run_case("approved"),
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    outputs = asyncio.run(run_demo())
    if args.json:
        print(json.dumps(outputs))
    else:
        print(json.dumps(outputs, indent=2))


if __name__ == "__main__":
    main()
