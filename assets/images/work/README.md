# Work Portfolio Images

This directory contains images for the "Selected Work" gallery on the homepage.

## Current Status

Currently using **placeholder SVG files** (work-001.svg through work-008.svg) with various aspect ratios to demonstrate the masonry grid layout.

## Replacing Placeholder Images

To replace these placeholders with actual portfolio photos:

### Option 1: Direct Replacement (Same Filenames)
1. Replace the SVG files with your actual images (JPG, PNG, or WebP)
2. Keep the same naming convention: `work-001.jpg`, `work-002.jpg`, etc.
3. Update the file extensions in `index.html` around line 125-134:
```javascript
const workImages = [
  { path: 'assets/images/work/work-001.jpg', caption: 'Your Project 001' },
  { path: 'assets/images/work/work-002.jpg', caption: 'Your Project 002' },
  // ... etc
];
```

### Option 2: New Images (Different Names)
1. Add your images to this directory
2. Update the entire `workImages` array in `index.html`:
```javascript
const workImages = [
  { path: 'assets/images/work/studio-portraits.jpg', caption: 'Studio Portraits Series' },
  { path: 'assets/images/work/editorial-fashion.jpg', caption: 'Editorial Fashion 2024' },
  { path: 'assets/images/work/brand-campaign.jpg', caption: 'Brand Campaign — Client Name' },
  // Add as many as you want
];
```

## Image Recommendations

- **Format**: JPG for photos, PNG for graphics with transparency
- **Size**: 800-1200px width is ideal for web performance
- **Compression**: Use tools like ImageOptim, TinyPNG, or jpegoptim
- **Aspect Ratios**: Vary the aspect ratios for a dynamic masonry look
  - Portrait (3:4 or 2:3)
  - Landscape (16:9 or 3:2)
  - Square (1:1)

## Features

✅ **Lazy Loading**: Images load as user scrolls
✅ **Error Handling**: Failed images are automatically hidden
✅ **Loading States**: Images show subtle loading indicator
✅ **Lightbox**: Click any image to view full-size
✅ **Responsive**: Adapts from 3 columns to 1 column on mobile
✅ **Hover Effects**: Smooth animations on desktop

## Sourcing from Bencorda.com

If you have images from the previous Bencorda.com website:
1. Download the images locally
2. Optimize them for web (resize and compress)
3. Place them in this directory
4. Update the `workImages` array as described above

## Need Help?

The gallery automatically handles:
- Different image sizes and aspect ratios
- Loading and error states  
- Lightbox integration
- Mobile responsiveness

Just update the image paths and captions in `index.html`!
