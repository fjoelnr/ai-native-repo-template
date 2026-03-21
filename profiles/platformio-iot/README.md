# PlatformIO IoT Profile

Use this profile for firmware repositories that target ESP32/ESP8266-class devices, sensors, MQTT telemetry, and hardware-coupled validation.

## When This Profile Fits

- the repository builds firmware with PlatformIO
- hardware wiring, sensors, and runtime configuration matter
- verification on real devices is part of normal development

## Recommended Additions

- `docs/hardware.md` for boards, pins, sensors, and wiring assumptions
- `docs/verification.md` for reproducible retest steps after firmware changes
- `docs/topic-contracts.md` if the device publishes or consumes MQTT-style payloads
- guardrails for secrets, local config files, and OTA/deployment safety

## Typical Risks

- local credentials committed by accident
- hidden hardware assumptions in code
- undocumented MQTT topic changes
- OTA/deploy steps drifting away from the repository
- build success treated as proof of device correctness

## Start Here

1. merge `AGENTS.fragment.md` into the repository `AGENTS.md`
2. document board, sensor, and runtime assumptions before new feature work
3. keep local credentials/templates separate and explicit
