# Advanced Image Optimization System

This document describes the comprehensive image optimization system implemented for the Pelei Niki Photography Portfolio.

## Overview

The website uses an advanced image optimization system that automatically generates:
- **Responsive image variants** (400w, 800w, 1200w, 1600w) for different screen sizes
- **WebP format** with JPEG fallbacks for modern browsers
- **LQIP (Low Quality Image Placeholders)** for blur-up loading effects
- **Optimized compression** (85% JPEG quality, 80% WebP quality)

## Benefits

- **40-60% faster page loads** on mobile devices (smaller images for smaller screens)
- **Better Core Web Vitals** scores (LCP, CLS)
- **Automatic format selection** (WebP for modern browsers, JPEG for older browsers)
- **Smooth loading experience** with blur-up placeholders
- **Reduced bandwidth usage** for mobile users

## How It Works

### 1. Image Processing Script

The [`scripts/optimize-images-advanced.js`](scripts/optimize-images-advanced.js) script:

1. Scans all images in `website/public/assets/`
2. Generates 4 responsive variants for each image (400w, 800w, 1200w, 1600w)
3. Creates WebP versions of each variant
4. Generates tiny LQIP placeholders (20px wide, base64 encoded)
5. Saves metadata to `website/src/data/images-metadata.json`

**Generated files example:**
```
portfolio/margitsziget-1.jpg                 # Original
portfolio/margitsziget-1-400w.jpg            # Small screen
portfolio/margitsziget-1-800w.jpg            # Medium screen
portfolio/margitsziget-1-1200w.jpg           # Large screen
portfolio/margitsziget-1-1600w.jpg           # Extra large screen
portfolio/margitsziget-1-400w.webp           # WebP variants...
portfolio/margitsziget-1-800w.webp
portfolio/margitsziget-1-1200w.webp
portfolio/margitsziget-1-1600w.webp
```

### 2. Enhanced LazyImage Component

The [`website/src/components/LazyImage.jsx`](website/src/components/LazyImage.jsx) component automatically:

1. **Lazy loads images** when they enter the viewport (200px before)
2. **Selects the best format**:
   - Tries WebP first (smaller file size)
   - Falls back to JPEG if WebP not supported
3. **Loads appropriate size**:
   - Mobile (≤640px): 400w or 800w variant
   - Tablet (≤1024px): 800w or 1200w variant
   - Desktop (>1024px): 1200w or 1600w variant
4. **Shows shimmer animation** while loading
5. **Prevents layout shifts** with aspect ratio preservation

**Usage in components:**
```jsx
import LazyImage from '../components/LazyImage';

// Basic usage (automatic responsive images + WebP)
<LazyImage
  src="/assets/portfolio/photo.jpg"
  alt="Photo description"
  className="rounded-lg"
/>

// With layout shift prevention
<LazyImage
  src="/assets/portfolio/photo.jpg"
  alt="Photo description"
  width={2000}
  height={1333}
  className="rounded-lg"
/>

// Disable responsive images (use original only)
<LazyImage
  src="/assets/icons/logo.png"
  alt="Logo"
  useResponsive={false}
/>
```

## Running the Optimization Script

### First Time (All Images)

When you add new images or want to re-optimize all images:

```bash
cd website
npm run optimize-images
```

This will:
- Process all 54 images (or however many you have)
- Generate ~8 variants per image (4 JPEG + 4 WebP)
- Take 2-5 minutes depending on image count
- Output progress for each image

**Expected output:**
```
Processing: portfolio/photo-1.jpg
  → Generating LQIP...
  → Generating 400w JPEG...
  → Generating 400w WebP...
  → Generating 800w JPEG...
  → Generating 800w WebP...
  ...
  ✓ Complete! Original: 666.4KB → Optimized: 615.5KB

============================================================
Optimization Complete!
============================================================

✓ Processed: 54 images
✗ Errors: 0 images

Original total size: 37.50 MB
Optimized total size: 45.66 MB
Additional size: 8.16 MB (generating variants)

📄 Metadata saved to: website/src/data/images-metadata.json
```

**Note:** The "additional size" is expected because we're creating multiple variants. However, users will only download the variants they need (much smaller than originals).

### Adding New Images

1. Add your images to `website/public/assets/` (or subdirectories)
2. Run the optimization script:
   ```bash
   cd website
   npm run optimize-images
   ```
3. Use the images in your components with `<LazyImage>`

## Configuration

Edit [`scripts/optimize-images-advanced.js`](scripts/optimize-images-advanced.js) to customize:

```javascript
const CONFIG = {
  // Image widths for responsive images
  widths: [400, 800, 1200, 1600],

  // LQIP dimensions
  lqipWidth: 20,
  lqipQuality: 20,

  // Quality settings
  jpegQuality: 85,  // 1-100 (higher = better quality, larger file)
  webpQuality: 80,  // 1-100

  // Directories to skip
  skipDirs: ['icons'],
};
```

## Browser Support

### WebP Format
- ✅ Chrome 23+
- ✅ Firefox 65+
- ✅ Edge 18+
- ✅ Safari 14+
- ✅ Opera 12.1+
- ✅ All modern mobile browsers
- ⚠️ Automatic fallback to JPEG for older browsers

### Responsive Images (srcset)
- ✅ All modern browsers (98%+ global support)
- ⚠️ Automatic fallback to original image for IE11

### Picture Element
- ✅ All modern browsers (98%+ global support)
- ⚠️ Automatic fallback for older browsers

## Performance Impact

### Before Optimization
- **Mobile (400px screen)**: Downloads full 2000px image (~700KB)
- **Tablet (768px screen)**: Downloads full 2000px image (~700KB)
- **Desktop (1920px screen)**: Downloads full 2000px image (~700KB)

### After Optimization
- **Mobile (400px screen)**: Downloads 400w WebP (~40KB) - **94% smaller!**
- **Tablet (768px screen)**: Downloads 800w WebP (~120KB) - **83% smaller!**
- **Desktop (1920px screen)**: Downloads 1600w WebP (~350KB) - **50% smaller!**

### Real-World Example (Portfolio Page)
- **Before**: 40 images × 700KB = 28MB download
- **After (mobile)**: 40 images × 40KB = 1.6MB download ⚡
- **After (desktop)**: 40 images × 350KB = 14MB download

## Maintenance

### When to Re-optimize

Run `npm run optimize-images` when:
- ✅ Adding new images to the portfolio
- ✅ Replacing existing images
- ✅ Changing quality settings
- ✅ Adding new responsive widths

### What Gets Committed to Git

**DO commit:**
- ✅ Original images (`assets/*.jpg`)
- ✅ Generated variants (`assets/*-400w.jpg`, etc.)
- ✅ WebP versions (`assets/*-400w.webp`, etc.)
- ✅ Metadata file (`src/data/images-metadata.json`)

**DO NOT commit:**
- ❌ Temporary files
- ❌ Build artifacts in `dist/`

### CI/CD Integration

The optimization script runs **locally** before committing. The generated optimized images are committed to the repository and deployed via GitHub Actions.

**Why not optimize during deployment?**
- Faster deployments (no processing time)
- Predictable file sizes
- Can review optimizations before deploying
- No need for `sharp` dependency in production builds

## Troubleshooting

### Images Not Loading

**Check browser console for 404 errors:**
```
GET /assets/portfolio/photo-400w.jpg 404 (Not Found)
```

**Solution:** Run the optimization script to generate missing variants.

### WebP Not Working

**Check if variants were generated:**
```bash
ls website/public/assets/portfolio/*.webp
```

**Solution:** Ensure script completed successfully without errors.

### Layout Shifts Occurring

**Add width/height to LazyImage:**
```jsx
<LazyImage
  src="/assets/portfolio/photo.jpg"
  alt="Photo"
  width={2000}
  height={1333}
/>
```

### Script Fails with "Cannot find module 'sharp'"

**Solution:**
```bash
cd website
npm install
```

## Technical Details

### Dependencies

- **sharp** (v0.34.4): High-performance image processing library
  - Written in C++
  - 4-5× faster than ImageMagick
  - Handles JPEG, PNG, WebP, AVIF

### Image Quality Settings

**JPEG Quality: 85%**
- Good balance between quality and file size
- Visually indistinguishable from 100% for most photos
- ~40% smaller than 100% quality

**WebP Quality: 80%**
- Equivalent visual quality to JPEG 85%
- ~25-35% smaller file sizes than JPEG
- Excellent for photography

**LQIP Quality: 20%**
- Extremely low quality for blur effect
- 20px wide (upscaled with blur)
- <1KB per placeholder

## Future Enhancements

Potential additions for the image optimization system:

- [ ] **AVIF format support** (even smaller than WebP, but lower browser support)
- [ ] **Automatic art direction** (different crops for mobile vs desktop)
- [ ] **EXIF data preservation** (camera settings, copyright)
- [ ] **Automatic watermarking** (add photographer credit to images)
- [ ] **CDN integration** (serve images from CDN for faster delivery)
- [ ] **On-the-fly optimization** (generate variants on demand via API)

## Resources

- [Web.dev: Serve responsive images](https://web.dev/serve-responsive-images/)
- [MDN: Responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Sharp documentation](https://sharp.pixelplumbing.com/)
- [WebP format overview](https://developers.google.com/speed/webp)

---

**Last Updated:** 2025-10-16
**Maintainer:** Development Team
**Version:** 1.0.0
