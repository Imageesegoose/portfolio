# Portfolio — Starter (Static)

This is a minimal static portfolio scaffold intended for photography / art direction.

Structure
- index.html
- assets/
  - css/styles.css
  - js/main.js
  - images/
    - logo.svg
    - placeholder1.svg ... placeholder6.svg

Features
- Responsive masonry-like gallery using CSS columns
- Lightbox with keyboard navigation
- Lazy-loading images
- Small, framework-free, easy to customize
- Optimized for hosting on GitHub Pages

How to use / edit
1. Replace content
   - Title: edit `<title>` in `index.html` and the `.site-title` text.
   - Hero: edit the heading and `.lead` paragraph in the `.hero` section.
   - About/bio: update the `.bio` paragraph in the `#about` section.
   - Contact: edit the mailto link and social link in `#contact`.

2. Replace logo
   - Replace `assets/images/logo.svg` with your logo (keep the filename or update `<img src="...">` in `index.html`).

3. Replace or add images
   - Replace `assets/images/placeholder1.svg` ... `placeholder6.svg` with your optimized images (same filenames) OR
   - Add new images to `assets/images/` and add new gallery entries inside the `.gallery` div in `index.html`:

```html
<a href="assets/images/your-image.jpg" data-caption="Project title" class="gallery-item">
  <img src="assets/images/your-image.jpg" alt="Project title" loading="lazy">
</a>
```

   - For large galleries, consider adding many `<a>` items or generating the list from a small JSON file + JS.

4. Image recommendations
   - Export web-friendly sizes: for hero/large work use ~1400–2400px width, for thumbnails 800–1200px width.
   - Use modern formats (WebP) for better perf. You can keep fallback JPG/PNG if needed.
   - Compress images (jpegoptim, mozjpeg, or an image compressor).
   - Add descriptive `alt` text and `data-caption` so lightbox captions make sense.

5. Change colors / fonts
   - Edit CSS variables at top of `assets/css/styles.css` (`:root { --bg: ...; --fg: ... }`).

6. Test locally
   - Simple Python server:
     - Python 3: `python -m http.server 8000` then open `http://localhost:8000`.
   - Or use `npx serve` for a quick static server.

7. Deploy on GitHub Pages
   - Commit files to your repository (branch `main` recommended).
   - On GitHub: Settings → Pages → Build and deployment → Branch: select `main` (root) and save.
   - The site will be published at `https://<your-username>.github.io/<repo>/` (or custom domain).
   - If you want images hosted in another repo, use raw URLs: `https://raw.githubusercontent.com/{owner}/{repo}/{branch}/path/to/image.jpg`.

Notes & tips
- For many photos consider using responsive `srcset` and `sizes` attributes to serve appropriately sized images per screen width.
- If you later want CMS-like editing, you can pair this with Netlify CMS, Forestry, or a headless CMS and still host on GitHub Pages.
- I can add optional features: pagination, lazy-loading intersection observer (for better performance), or a JSON-driven gallery so you don't edit HTML directly.
