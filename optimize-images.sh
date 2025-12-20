#!/bin/bash

# Image optimization script for portfolio images
# Converts JPG to WebP with multiple resolutions for responsive loading

SOURCE_DIR="/Users/bereczkiattila/Projects/Web/peleiniki/website/public/assets/portfolio/kutyas-fotozas"
BACKUP_DIR="$SOURCE_DIR/original"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Define target widths and quality settings
WIDTHS=(800 1200 1600)
QUALITY=80

# Color codes for output
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting image optimization...${NC}"
echo "Source directory: $SOURCE_DIR"

# Process each JPG file
for file in "$SOURCE_DIR"/*.JPG "$SOURCE_DIR"/*.jpg; do
    [ -e "$file" ] || continue

    filename=$(basename "$file")
    basename_no_ext="${filename%.*}"

    echo -e "${YELLOW}Processing: $filename${NC}"

    # Backup original
    cp "$file" "$BACKUP_DIR/$filename"
    echo "  ✓ Backed up to $BACKUP_DIR"

    # Create optimized versions for each width
    for width in "${WIDTHS[@]}"; do
        output_file="$SOURCE_DIR/${basename_no_ext}-${width}w.webp"

        # Convert and resize using ImageMagick
        magick "$file" \
            -resize "${width}x${width}>" \
            -quality $QUALITY \
            -define webp:method=6 \
            "$output_file"

        if [ -f "$output_file" ]; then
            original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
            optimized_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file" 2>/dev/null)
            reduction=$((100 - (optimized_size * 100 / original_size)))
            echo "  ✓ Created: ${basename_no_ext}-${width}w.webp (${reduction}% smaller)"
        fi
    done

    # Remove original JPG
    rm "$file"
    echo "  ✓ Removed original JPG"
    echo ""
done

echo -e "${GREEN}Image optimization complete!${NC}"
echo ""
echo "Summary:"
echo "  Original files backed up to: $BACKUP_DIR"
echo "  WebP images created at: $SOURCE_DIR"
echo "  Resolutions: 800w, 1200w, 1600w"
echo "  Quality: $QUALITY%"
