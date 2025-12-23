# Diagnostics: Adventure gallery & asset reference checks

Purpose
- Provide a safe, non-destructive scan that finds references to the Adventure gallery assets and reports missing/case-mismatched filenames or missing JS includes referenced by the homepage.
- This is a diagnostics-only addition — it does not change main behavior.

What is included
- diagnostics/check_references.sh — a small POSIX shell script you can run locally to list references and files.
- diagnostics/RESULTS_PLACEHOLDER.txt — example output so you know what to expect.

How to run the check (one-liner)
- From the repository root run:
  bash diagnostics/check_references.sh

What the script checks
1. References to `assets/images/adventure` across the repository (shows files and matching lines).
2. Actual filenames present in `assets/images/adventure` (case-sensitive listing).
3. References to `assets/js/main.js` and `assets/js/lightbox.js` across the repo (files that reference them).
4. The script exits 0 in all cases (safe to run).

Interpreting the results
- If files reference `assets/images/adventure/adventure-00001.jpg` but the listing shows `adventure-00001.JPG` (different case/extension) that will cause 404s on many hosts — those references should be corrected to match the real filenames.
- If `assets/js/main.js` is referenced but missing, the homepage may show console errors; adding a fallback or restoring the original script is recommended.
- The sample output file (RESULTS_PLACEHOLDER.txt) shows how matches will look.

Recommended next steps (after running the script)
- If most issues are filename mismatches, create a small PR that updates the references to exactly match the filenames in `assets/images/adventure`.
- If `adventure.html` exists and you don't want it public, consider removing it from main (keep images in the backup branch).
- If images are large and you want better performance, generate thumbnails and update `<img src>` to the thumbs while keeping anchor hrefs pointing to the large images.
- After fixes, verify:
  - Homepage: open in browser and check console for 404s / JS errors.
  - Click a few gallery images to confirm the lightbox works.

If you want me to create a PR that performs one of the recommended fixes, tell me which small fix to make (e.g., "fix filenames" or "remove adventure.html") and I will prepare a focused PR for your review.
