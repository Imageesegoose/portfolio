# GitHub Copilot Instructions for Portfolio Project

## Project Overview
This is a minimal static portfolio website designed for photography and art direction. It's built with vanilla HTML, CSS, and JavaScript (no frameworks) and optimized for GitHub Pages hosting.

## Project Structure
- `index.html` - Main landing page with gallery
- `about.html` - About page
- `assets/css/styles.css` - All styling (uses CSS variables for theming)
- `assets/js/main.js` - Lightbox and interactive functionality
- `assets/images/` - All image assets (SVG logos, placeholder images, adventure photos in subdirectories)
- `.github/workflows/` - GitHub Actions for site automation

## Code Style and Conventions

### HTML
- Use semantic HTML5 elements
- Include proper accessibility attributes (`alt`, `aria-label`, `aria-hidden`)
- Use `loading="lazy"` for images to optimize performance
- Keep markup minimal and clean
- Use double quotes for attributes
- Indent with 2 spaces

### CSS
- Use CSS custom properties (variables) defined in `:root` for theming
- Follow mobile-first responsive design principles
- Use modern CSS features (flexbox, grid, CSS columns)
- Keep selectors simple and avoid deep nesting
- Group related styles together
- Use consistent spacing and formatting

### JavaScript
- Write vanilla JavaScript (no frameworks or libraries)
- Keep code simple and maintainable
- Add comments only for complex logic
- Use modern ES6+ features where appropriate
- Ensure cross-browser compatibility

### Design Principles
- Minimal, clean aesthetic
- Editorial-driven imagery
- Responsive masonry-like gallery using CSS columns
- Mobile-responsive (breakpoints at 640px and 1000px)
- Focus on performance and fast loading

## Key Features
- **Responsive Gallery**: Uses CSS `column-count` for masonry layout
- **Lightbox Modal**: Keyboard navigation support for image viewing
- **Lazy Loading**: Images use `loading="lazy"` attribute
- **Google Fonts**: Major Mono Display for headings and navigation
- **Framework-free**: No dependencies, pure vanilla web technologies

## File Organization
- Keep all CSS in `assets/css/styles.css` (single file)
- Keep all JavaScript in `assets/js/main.js` (single file)
- Store all images in `assets/images/` (or subdirectories like `assets/images/adventure/`)
- Use consistent naming: lowercase with numbers (e.g., `placeholder1.svg`, `adventure-00001.jpg`)

## Testing and Validation
- Test locally using Python's simple HTTP server: `python -m http.server 8000`
- Or use `npx serve` for quick static file serving
- Test responsive behavior at different screen sizes (mobile, tablet, desktop)
- Verify lightbox keyboard navigation works (arrow keys, Escape)
- Check accessibility with screen readers
- Validate HTML and ensure no console errors

## Deployment
- Site is hosted on GitHub Pages
- Deploys from the `main` branch (root directory)
- Any changes to `main` branch are automatically published
- Site URL format: `https://<username>.github.io/<repo>/`

## Image Handling
- Recommended image sizes:
  - Hero/large work: 1400-2400px width
  - Thumbnails: 800-1200px width
- Prefer modern formats (WebP) with fallbacks
- Always include descriptive `alt` text
- Use `data-caption` attribute for lightbox captions
- Compress images for web optimization

## Best Practices
- Keep changes minimal and focused
- Maintain consistency with existing code style
- Don't add unnecessary dependencies or frameworks
- Prioritize performance and accessibility
- Test changes locally before committing
- Write clear, descriptive commit messages
- Consider mobile users (site should work well on small screens)

## Common Tasks

### Adding New Gallery Images
Add new `<a>` elements inside the `.gallery` div. Use SVG placeholders or actual photos:
```html
<!-- Example with SVG placeholder -->
<a href="assets/images/placeholder1.svg" data-caption="Project — Studio Portraits" class="gallery-item">
  <img src="assets/images/placeholder1.svg" alt="Project — Studio Portraits" loading="lazy">
</a>

<!-- Example with actual photo from subdirectory -->
<a href="assets/images/adventure/adventure-00001.jpg" data-caption="Adventure Series" class="gallery-item">
  <img src="assets/images/adventure/adventure-00001.jpg" alt="Adventure Series" loading="lazy">
</a>
```

### Changing Theme Colors
Edit CSS custom properties in `:root`:
- `--bg`: Background color
- `--fg`: Foreground/text color
- `--muted`: Secondary text color
- `--accent`: Accent color

### Modifying Typography
- Display font: Change `--display-font` variable
- Body font: Change `--body-font` variable
- Ensure Google Fonts link is updated in HTML if changing fonts

## Workflow Automation
- `.github/workflows/site-automation.yml` - Automated updates workflow
- Can be triggered manually via GitHub Actions
- Creates PRs with site updates (font + logo changes)

## Notes
- Keep the codebase simple and easy to customize
- This is a starter template - users should be able to easily understand and modify it
- Avoid over-engineering or adding complex abstractions
- Focus on clean, readable code that serves as a good example
