#!/usr/bin/env python3
import json
import sys
import subprocess

try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

tool_name = input_data.get("tool_name", "")
tool_input = input_data.get("tool_input", {})
command = tool_input.get("command", "")

# Only validate git push commands
if tool_name != "Bash" or "git push" not in command:
    sys.exit(0)

# Get current branch
try:
    current_branch = subprocess.check_output(
        ["git", "branch", "--show-current"],
        stderr=subprocess.DEVNULL,
        text=True
    ).strip()
except:
    current_branch = ""

# Check if pushing to main or develop
push_cmd = command
# Check for force push flags as separate command-line tokens, not substrings
# Split command into tokens to properly detect flags
cmd_tokens = push_cmd.split()
is_force_push = "--force" in cmd_tokens or "-f" in cmd_tokens

# Check if command or current branch targets protected branches
targets_protected = (
    "origin main" in push_cmd or
    "origin develop" in push_cmd or
    current_branch in ["main", "develop"]
)

# Block all direct pushes to main/develop (including force pushes)
if targets_protected:
    if current_branch in ["main", "develop"] or "origin main" in push_cmd or "origin develop" in push_cmd:
        reason = f"""❌ Direct push to main/develop is not allowed!

Protected branches:
  - main (production)
  - develop (integration)

Git Flow workflow:
  1. Create a feature branch:
     /feature <name>

  2. Make your changes and commit

  3. Push feature branch:
     git push origin feature/<name>

  4. Create pull request:
     gh pr create

  5. After approval, merge with:
     /finish

For releases:
  /release <version> → PR → /finish

For hotfixes:
  /hotfix <name> → PR → /finish

Current branch: {current_branch}

💡 Use feature/release/hotfix branches instead of pushing directly to main/develop."""

        output = {
            "hookSpecificOutput": {
                "hookEventName": "PreToolUse",
                "permissionDecision": "deny",
                "permissionDecisionReason": reason
            }
        }
        print(json.dumps(output))
        sys.exit(0)

# Allow the command
sys.exit(0)