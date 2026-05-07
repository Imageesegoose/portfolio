#!/usr/bin/env sh
# POSIX shell script to scan the repo for adventure gallery references and related assets.
# Usage: bash diagnostics/check_references.sh
# Exits 0 in all cases so it's safe to run anywhere.

set -eu

echo "=== DIAGNOSTIC SCAN: references to assets/images/adventure ==="
# Search repository files for references to assets/images/adventure
# Use grep -I to avoid binary files; print filename:line
if command -v grep >/dev/null 2>&1; then
  grep -RIn --line-number "assets/images/adventure" . || true
else
  echo "grep not found; please run on a system with grep installed."
fi

echo
echo "=== LISTING files in assets/images/adventure (case-sensitive) ==="
if [ -d "assets/images/adventure" ]; then
  # Use ls -la to show permissions and exact filenames
  ls -la "assets/images/adventure" || true
else
  echo "No directory at assets/images/adventure (nothing to list)."
fi

echo
echo "=== REFERENCES to assets/js/main.js and assets/js/lightbox.js ==="
if command -v grep >/dev/null 2>&1; then
  echo "References to assets/js/main.js:"
  grep -RIn --line-number "assets/js/main\.js" . || echo "  (no matches)"
  echo
  echo "References to assets/js/lightbox.js:"
  grep -RIn --line-number "assets/js/lightbox\.js" . || echo "  (no matches)"
else
  echo "grep not found; cannot scan for JS references."
fi

echo
echo "=== DONE ==="
echo "Note: This is a local diagnostic script. The repository branch was not modified."

# Always exit 0 so it is safe and non-destructive
exit 0
