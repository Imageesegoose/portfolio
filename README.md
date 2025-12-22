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
