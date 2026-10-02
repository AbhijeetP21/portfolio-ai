#!/usr/bin/env bash
# Installs the "understanding outputs" standing rule for ALL Claude Code sessions
# on this machine. Run it once on each device:
#
#   bash claude-config/install.sh
#
# It copies the rule to ~/.claude/understanding-outputs.md and adds one import line
# to ~/.claude/CLAUDE.md (the user-level memory file Claude Code reads in every
# session, in every project). Safe to run again: it never duplicates the line.
set -euo pipefail

src="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/understanding-outputs.md"
dest_dir="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
rule="$dest_dir/understanding-outputs.md"
memory="$dest_dir/CLAUDE.md"
line="@understanding-outputs.md"

mkdir -p "$dest_dir"
cp "$src" "$rule"

touch "$memory"
if grep -qxF "$line" "$memory"; then
  echo "Import already present in $memory"
else
  { [ -s "$memory" ] && printf '\n'; printf '%s\n' "$line"; } >> "$memory"
  echo "Added import to $memory"
fi

echo "Installed rule at $rule"
echo "Start a new Claude Code session to load it (run /memory to confirm)."
