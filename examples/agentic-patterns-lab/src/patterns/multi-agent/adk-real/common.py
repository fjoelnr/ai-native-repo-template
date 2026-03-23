import asyncio

from google.adk.agents import BaseAgent
from google.adk.agents.invocation_context import InvocationContext
from google.adk.events import Event, EventActions
from google.genai import types


class FixedStepAgent(BaseAgent):
    result_text: str = "done"
    delay_seconds: float = 0.0
    state_delta: dict[str, str] = {}

    async def _run_async_impl(self, context: InvocationContext):
        if self.delay_seconds > 0:
            await asyncio.sleep(self.delay_seconds)

        event_payload = {
            "author": self.name,
            "invocationId": context.invocation_id,
            "content": types.Content(
                role="model",
                parts=[types.Part.from_text(text=self.result_text)],
            ),
        }
        if self.state_delta:
            event_payload["actions"] = EventActions(state_delta=self.state_delta)

        yield Event(
            **event_payload,
        )


def make_user_message(text: str):
    return types.Content(
        role="user",
        parts=[types.Part.from_text(text=text)],
    )


def serialize_event(event: Event):
    text = None
    if event.content and event.content.parts:
        text = getattr(event.content.parts[0], "text", None)

    state_delta = {}
    if event.actions and event.actions.state_delta:
        state_delta = dict(event.actions.state_delta)

    return {
        "author": event.author,
        "text": text,
        "state_delta": state_delta,
    }
