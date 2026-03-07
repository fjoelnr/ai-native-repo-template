#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import sys
import yaml

REPO_ROOT = Path(__file__).resolve().parents[1]

REQUIRED_FILES = [
    ".agents/schemas/workflow.schema.yaml",
    ".agents/workflows/feature-development.md",
    ".agents/workflows/bugfix.md",
    ".agents/guardrails/architecture-rules.md",
    ".agents/guardrails/forbidden-zones.md",
    ".agents/registry/agents.yaml",
    "AGENTS.md",
    "README.md",
]

WORKFLOW_FILES = [
    ".agents/workflows/feature-development.md",
    ".agents/workflows/bugfix.md",
]


def fail(message: str) -> None:
    print(f"ERROR: {message}")
    sys.exit(1)


def load_yaml_file(path: Path):
    try:
        with path.open("r", encoding="utf-8") as f:
            return yaml.safe_load(f)
    except Exception as exc:
        fail(f"Failed to parse YAML in {path}: {exc}")


def extract_frontmatter(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        fail(f"Workflow file {path} is missing YAML frontmatter")
    end = text.find("\n---\n", 4)
    if end == -1:
        fail(f"Workflow file {path} has unterminated YAML frontmatter")
    raw = text[4:end]
    try:
        data = yaml.safe_load(raw)
    except Exception as exc:
        fail(f"Invalid workflow frontmatter in {path}: {exc}")
    if not isinstance(data, dict):
        fail(f"Workflow frontmatter in {path} must be a YAML object")
    return data


def validate_required_files() -> None:
    missing = [f for f in REQUIRED_FILES if not (REPO_ROOT / f).exists()]
    if missing:
        fail(f"Required files missing: {', '.join(missing)}")


def validate_yaml_files() -> None:
    yaml_files = list((REPO_ROOT / ".agents").rglob("*.yaml")) + list((REPO_ROOT / ".github").rglob("*.yml"))
    for file in yaml_files:
        load_yaml_file(file)


def validate_workflow_schema_compliance() -> None:
    schema = load_yaml_file(REPO_ROOT / ".agents/schemas/workflow.schema.yaml")
    required_keys = schema.get("required", []) if isinstance(schema, dict) else []
    if not required_keys:
        fail("Schema file does not declare required keys")

    for workflow in WORKFLOW_FILES:
        path = REPO_ROOT / workflow
        data = extract_frontmatter(path)
        missing = [k for k in required_keys if k not in data]
        if missing:
            fail(f"Workflow {workflow} missing required keys: {', '.join(missing)}")


def main() -> None:
    validate_required_files()
    validate_yaml_files()
    validate_workflow_schema_compliance()
    print("Agent infrastructure validation passed")


if __name__ == "__main__":
    main()
