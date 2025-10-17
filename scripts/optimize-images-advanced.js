#!/usr/bin/env node

/**
 * Advanced Image Optimization Script
 *
 * Features:
 * - Generates responsive image variants (400w, 800w, 1200w, 1600w)
 * - Converts images to WebP format with JPEG fallbacks
 * - Creates LQIP (Low Quality Image Placeholders) for blur-up effect
 * - Maintains original images
 * - Generates metadata JSON for easy integration
 * - Smart handling: For images smaller than 1600px, generates 1600w version at original size
 *   (e.g., 1333px image will have 400w, 800w, 1200w sized down, and 1600w at 1333px)
 *
 * Usage:
 *   node scripts/optimize-images-advanced.js
 */

const fs = require('fs');
const path = require('path');
// Require sharp from website/node_modules
const sharp = require(path.resolve(__dirname, '../website/node_modules/sharp'));

// Configuration
const CONFIG = {
  // Image widths for responsive images
  widths: [400, 800, 1200, 1600],

  // LQIP dimensions (very small for fast loading)
  lqipWidth: 20,
  lqipQuality: 20,

  // Quality settings
  jpegQuality: 85,
  webpQuality: 80,

  // Source directory (relative to project root)
  sourceDir: path.join(__dirname, '../website/public/assets'),

  // Extensions to process
  extensions: ['.jpg', '.jpeg', '.JPG', '.JPEG', '.png', '.PNG'],

  // Directories to skip
  skipDirs: ['icons'],
};

// Statistics tracking
const stats = {
  processed: 0,
  errors: 0,
  totalOriginalSize: 0,
  totalOptimizedSize: 0,
  imagesMetadata: {},
};

/**
 * Get all image files recursively
 */
function getImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip certain directories
      const dirName = path.basename(filePath);
      if (!CONFIG.skipDirs.includes(dirName)) {
        getImageFiles(filePath, fileList);
      }
    } else {
      const ext = path.extname(file);
      if (CONFIG.extensions.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Generate LQIP (Low Quality Image Placeholder) as base64
 */
async function generateLQIP(inputPath) {
  try {
    const buffer = await sharp(inputPath)
      .resize(CONFIG.lqipWidth, null, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: CONFIG.lqipQuality })
      .toBuffer();

    return `data:image/jpeg;base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.error(`Error generating LQIP for ${inputPath}:`, error.message);
    return null;
  }
}

/**
 * Get image dimensions
 */
async function getImageDimensions(inputPath) {
  try {
    const metadata = await sharp(inputPath).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      aspectRatio: metadata.width / metadata.height,
    };
  } catch (error) {
    console.error(`Error getting dimensions for ${inputPath}:`, error.message);
    return null;
  }
}

/**
 * Process a single image: generate responsive variants and WebP versions
 */
async function processImage(inputPath) {
  const parsedPath = path.parse(inputPath);
  const relativePath = path.relative(CONFIG.sourceDir, inputPath);

  console.log(`\nProcessing: ${relativePath}`);

  try {
    // Get original image dimensions
    const dimensions = await getImageDimensions(inputPath);
    if (!dimensions) {
      stats.errors++;
      return;
    }

    // Get original file size
    const originalSize = fs.statSync(inputPath).size;
    stats.totalOriginalSize += originalSize;

    // Generate LQIP
    console.log('  → Generating LQIP...');
    const lqip = await generateLQIP(inputPath);

    // Prepare metadata
    const imageMetadata = {
      original: relativePath.replace(/\\/g, '/'),
      width: dimensions.width,
      height: dimensions.height,
      aspectRatio: dimensions.aspectRatio,
      lqip: lqip,
      variants: {},
    };

    let totalOptimizedSize = 0;
    let largestGeneratedWidth = 0;

    // Generate responsive variants
    for (const width of CONFIG.widths) {
      // Skip if width is larger than original
      if (width > dimensions.width) {
        console.log(`  ⊘ Skipping ${width}w (original is ${dimensions.width}px wide)`);
        continue;
      }

      const baseName = parsedPath.name;
      const jpegName = `${baseName}-${width}w${parsedPath.ext}`;
      const webpName = `${baseName}-${width}w.webp`;

      const jpegPath = path.join(parsedPath.dir, jpegName);
      const webpPath = path.join(parsedPath.dir, webpName);

      // Generate JPEG variant
      console.log(`  → Generating ${width}w JPEG...`);
      await sharp(inputPath)
        .resize(width, null, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality: CONFIG.jpegQuality, progressive: true })
        .toFile(jpegPath);

      // Generate WebP variant
      console.log(`  → Generating ${width}w WebP...`);
      await sharp(inputPath)
        .resize(width, null, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: CONFIG.webpQuality })
        .toFile(webpPath);

      // Track sizes
      const jpegSize = fs.statSync(jpegPath).size;
      const webpSize = fs.statSync(webpPath).size;
      totalOptimizedSize += jpegSize + webpSize;

      // Store metadata
      const relativeJpeg = path.relative(CONFIG.sourceDir, jpegPath).replace(/\\/g, '/');
      const relativeWebp = path.relative(CONFIG.sourceDir, webpPath).replace(/\\/g, '/');

      imageMetadata.variants[width] = {
        jpeg: `/assets/${relativeJpeg}`,
        webp: `/assets/${relativeWebp}`,
        jpegSize: jpegSize,
        webpSize: webpSize,
      };

      largestGeneratedWidth = width;
    }

    // If image is larger than largest generated size but smaller than max target,
    // generate an additional version at the next target size using original dimensions
    // This ensures desktop users always have a 1600w version available (or closest)
    const maxTargetWidth = CONFIG.widths[CONFIG.widths.length - 1];
    if (largestGeneratedWidth > 0 && largestGeneratedWidth < maxTargetWidth && dimensions.width > largestGeneratedWidth) {
      console.log(`  → Generating ${maxTargetWidth}w at original size (${dimensions.width}px)...`);

      const baseName = parsedPath.name;
      const jpegName = `${baseName}-${maxTargetWidth}w${parsedPath.ext}`;
      const webpName = `${baseName}-${maxTargetWidth}w.webp`;

      const jpegPath = path.join(parsedPath.dir, jpegName);
      const webpPath = path.join(parsedPath.dir, webpName);

      // Generate JPEG at original size
      await sharp(inputPath)
        .jpeg({ quality: CONFIG.jpegQuality, progressive: true })
        .toFile(jpegPath);

      // Generate WebP at original size
      await sharp(inputPath)
        .webp({ quality: CONFIG.webpQuality })
        .toFile(webpPath);

      // Track sizes
      const jpegSize = fs.statSync(jpegPath).size;
      const webpSize = fs.statSync(webpPath).size;
      totalOptimizedSize += jpegSize + webpSize;

      // Store metadata
      const relativeJpeg = path.relative(CONFIG.sourceDir, jpegPath).replace(/\\/g, '/');
      const relativeWebp = path.relative(CONFIG.sourceDir, webpPath).replace(/\\/g, '/');

      imageMetadata.variants[maxTargetWidth] = {
        jpeg: `/assets/${relativeJpeg}`,
        webp: `/assets/${relativeWebp}`,
        jpegSize: jpegSize,
        webpSize: webpSize,
      };
    }

    // If image is smaller than smallest width, just optimize original
    if (Object.keys(imageMetadata.variants).length === 0) {
      console.log('  → Image smaller than minimum width, optimizing original...');

      const baseName = parsedPath.name;
      const jpegName = `${baseName}-optimized${parsedPath.ext}`;
      const webpName = `${baseName}-optimized.webp`;

      const jpegPath = path.join(parsedPath.dir, jpegName);
      const webpPath = path.join(parsedPath.dir, webpName);

      await sharp(inputPath)
        .jpeg({ quality: CONFIG.jpegQuality, progressive: true })
        .toFile(jpegPath);

      await sharp(inputPath)
        .webp({ quality: CONFIG.webpQuality })
        .toFile(webpPath);

      const jpegSize = fs.statSync(jpegPath).size;
      const webpSize = fs.statSync(webpPath).size;
      totalOptimizedSize += jpegSize + webpSize;

      const relativeJpeg = path.relative(CONFIG.sourceDir, jpegPath).replace(/\\/g, '/');
      const relativeWebp = path.relative(CONFIG.sourceDir, webpPath).replace(/\\/g, '/');

      imageMetadata.variants['original'] = {
        jpeg: `/assets/${relativeJpeg}`,
        webp: `/assets/${relativeWebp}`,
        jpegSize: jpegSize,
        webpSize: webpSize,
      };
    }

    stats.totalOptimizedSize += totalOptimizedSize;

    // Store metadata
    const metadataKey = `/assets/${relativePath.replace(/\\/g, '/')}`;
    stats.imagesMetadata[metadataKey] = imageMetadata;

    console.log(`  ✓ Complete! Original: ${(originalSize / 1024).toFixed(1)}KB → Optimized: ${(totalOptimizedSize / 1024).toFixed(1)}KB`);
    stats.processed++;

  } catch (error) {
    console.error(`  ✗ Error processing ${relativePath}:`, error.message);
    stats.errors++;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Advanced Image Optimization Script');
  console.log('='.repeat(60));
  console.log(`\nSource directory: ${CONFIG.sourceDir}`);
  console.log(`Responsive widths: ${CONFIG.widths.join(', ')}px`);
  console.log(`JPEG quality: ${CONFIG.jpegQuality}%`);
  console.log(`WebP quality: ${CONFIG.webpQuality}%`);
  console.log(`LQIP width: ${CONFIG.lqipWidth}px\n`);

  // Get all images
  const images = getImageFiles(CONFIG.sourceDir);
  console.log(`Found ${images.length} images to process\n`);

  // Process each image
  for (const imagePath of images) {
    await processImage(imagePath);
  }

  // Save metadata to JSON
  const metadataPath = path.join(__dirname, '../website/src/data/images-metadata.json');
  const metadataDir = path.dirname(metadataPath);

  if (!fs.existsSync(metadataDir)) {
    fs.mkdirSync(metadataDir, { recursive: true });
  }

  fs.writeFileSync(
    metadataPath,
    JSON.stringify(stats.imagesMetadata, null, 2),
    'utf8'
  );

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('Optimization Complete!');
  console.log('='.repeat(60));
  console.log(`\n✓ Processed: ${stats.processed} images`);
  console.log(`✗ Errors: ${stats.errors} images`);
  console.log(`\nOriginal total size: ${(stats.totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized total size: ${(stats.totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);

  const savings = stats.totalOriginalSize - stats.totalOptimizedSize;
  const savingsPercent = ((savings / stats.totalOriginalSize) * 100).toFixed(1);

  if (savings > 0) {
    console.log(`Savings: ${(savings / 1024 / 1024).toFixed(2)} MB (${savingsPercent}%)`);
  } else {
    console.log(`Additional size: ${(Math.abs(savings) / 1024 / 1024).toFixed(2)} MB (generating variants)`);
  }

  console.log(`\n📄 Metadata saved to: ${metadataPath}`);
  console.log('\nNext steps:');
  console.log('1. Update LazyImage component to use responsive images');
  console.log('2. Use the generated metadata in your components');
  console.log('3. Test image loading on different devices\n');
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
