#!/bin/sh
# Diagnostic script to check for adventure gallery references and assets
# This script is safe to run and exits with code 0 even when no matches are found

set -e

echo "=========================================="
echo "Adventure Gallery Diagnostics"
echo "=========================================="
echo ""

# Navigate to repository root (script can be run from anywhere)
cd "$(dirname "$0")/.."

echo "1. Searching for references to 'assets/images/adventure'..."
echo "----------------------------------------------------------"
if grep -r "assets/images/adventure" . --exclude-dir=.git --exclude-dir=diagnostics 2>/dev/null | head -20; then
    echo ""
else
    echo "No references found in repository files."
    echo ""
fi

echo "2. Listing files in 'assets/images/adventure/' directory..."
echo "----------------------------------------------------------"
if [ -d "assets/images/adventure" ]; then
    ls -la assets/images/adventure/ 2>/dev/null || echo "Directory exists but cannot be listed."
    echo ""
    echo "File count (excluding .gitkeep):"
    find assets/images/adventure -type f ! -name ".gitkeep" 2>/dev/null | wc -l
    echo ""
else
    echo "Directory 'assets/images/adventure/' does not exist."
    echo ""
fi

echo "3. Searching for references to 'assets/js/main.js'..."
echo "----------------------------------------------------------"
if grep -r "assets/js/main.js" . --exclude-dir=.git --exclude-dir=diagnostics 2>/dev/null; then
    echo ""
else
    echo "No references found to assets/js/main.js"
    echo ""
fi

echo "4. Searching for references to 'assets/js/lightbox.js'..."
echo "----------------------------------------------------------"
if grep -r "assets/js/lightbox.js" . --exclude-dir=.git --exclude-dir=diagnostics 2>/dev/null; then
    echo ""
else
    echo "No references found to assets/js/lightbox.js"
    echo ""
fi

echo "=========================================="
echo "Diagnostic scan complete!"
echo "=========================================="
echo ""
echo "Review the output above and refer to diagnostics/DIAGNOSTICS.md"
echo "for interpretation guidance and recommended next steps."
echo ""

# Always exit successfully
exit 0
