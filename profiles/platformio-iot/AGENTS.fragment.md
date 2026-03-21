## PlatformIO IoT Extension

### Stack Focus

This repository uses the PlatformIO IoT profile.

### Additional Map

- `platformio.ini` build matrix and upload targets
- `src/` firmware code
- `docs/hardware.md` boards, pins, and sensor assumptions
- `docs/verification.md` retest steps on real hardware
- local config templates for Wi-Fi, MQTT, OTA, or other secrets

### Extra Working Rules

- never commit device-specific secrets or local deployment values
- treat hardware assumptions as documentation, not tribal knowledge
- keep telemetry/topic changes explicit and versioned
- separate compile success from hardware validation success
