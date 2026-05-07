# Diagnostics: Adventure Gallery References

## Purpose

This diagnostics check helps identify potential issues related to the Adventure gallery integration. The script scans the repository for references that may need attention after gallery-related changes.

## What This Checks

The `check_references.sh` script performs the following checks:

1. **Adventure image references** - Searches all files for references to `assets/images/adventure`
2. **Adventure directory contents** - Lists all files currently in `assets/images/adventure/` 
3. **JavaScript references** - Finds references to `assets/js/main.js` and `assets/js/lightbox.js`

## How to Run

From the repository root, execute:

```bash
bash diagnostics/check_references.sh
```

The script is safe to run multiple times and will exit successfully even if no matches are found.

## Interpreting Results

### Expected Findings

If the Adventure gallery was recently removed or modified, you may see:

- **Orphaned image files** - Images in `assets/images/adventure/` that are no longer referenced
- **Missing references** - No HTML/CSS/JS files referencing the adventure images
- **Case sensitivity issues** - Filenames with mixed case extensions (`.jpg` vs `.JPG`)
- **Missing lightbox.js** - References to a lightbox script that doesn't exist

### Checklist: What to Review

- [ ] Are there files in `assets/images/adventure/` that are no longer used?
- [ ] Are there any HTML files (like `adventure.html`) that should be removed?
- [ ] Do all image references use consistent, correct case for filenames?
- [ ] Is `lightbox.js` referenced but missing from the repository?
- [ ] Are there thumbnail images needed for the gallery display?

## Recommended Next Steps

Based on typical findings, consider these actions:

1. **If adventure images are unused:**
   - Remove the `assets/images/adventure/` directory if no longer needed
   - Or add proper gallery page/references if the gallery should be active

2. **If adventure.html exists but is unlinked:**
   - Remove `adventure.html` from the root if it's no longer part of the site
   - Or add proper navigation links if it should be accessible

3. **If lightbox.js is referenced but missing:**
   - Remove references to `assets/js/lightbox.js` from HTML files
   - Verify that `assets/js/main.js` provides the needed lightbox functionality

4. **If case sensitivity issues exist:**
   - Standardize all image filenames to lowercase extensions
   - Update any references accordingly

5. **If thumbnails are needed:**
   - Create optimized thumbnail versions of adventure images
   - Update gallery HTML to use thumbnails with full-size links

## After Making Fixes

After addressing any issues found:

- [ ] Re-run the diagnostic script to verify fixes
- [ ] Test the site locally to ensure no broken links or images
- [ ] Verify the lightbox functionality works correctly
- [ ] Check that all gallery pages load properly
- [ ] Validate that no 404 errors occur for images or scripts
