#!/bin/bash

# Image Optimization Script for Pelei Niki Portfolio
# Uses macOS native 'sips' tool for image optimization
# Optimizes JPG/JPEG/PNG images for web use

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ASSETS_DIR="website/public/assets"
BACKUP_DIR="website/public/assets_backup_$(date +%Y%m%d_%H%M%S)"
MAX_WIDTH=2000        # Max width for large images
MAX_HEIGHT=2000       # Max height for large images
JPG_QUALITY=85        # JPEG quality (0-100)
MIN_FILE_SIZE=100000  # Only optimize files larger than 100KB

# Statistics
TOTAL_ORIGINAL_SIZE=0
TOTAL_OPTIMIZED_SIZE=0
FILES_PROCESSED=0
FILES_SKIPPED=0

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  Pelei Niki Portfolio - Image Optimizer${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Check if assets directory exists
if [ ! -d "$ASSETS_DIR" ]; then
    echo -e "${RED}Error: Assets directory not found: $ASSETS_DIR${NC}"
    exit 1
fi

# Create backup
echo -e "${YELLOW}Creating backup...${NC}"
cp -R "$ASSETS_DIR" "$BACKUP_DIR"
echo -e "${GREEN}✓ Backup created: $BACKUP_DIR${NC}"
echo ""

# Function to get file size in bytes
get_file_size() {
    stat -f%z "$1"
}

# Function to optimize image
optimize_image() {
    local file="$1"
    local filename=$(basename "$file")
    local original_size=$(get_file_size "$file")

    # Skip small files
    if [ $original_size -lt $MIN_FILE_SIZE ]; then
        echo -e "  ${YELLOW}⊘ Skipped (already optimized):${NC} $filename"
        FILES_SKIPPED=$((FILES_SKIPPED + 1))
        return
    fi

    echo -e "  ${BLUE}→ Processing:${NC} $filename ($(numfmt --to=iec-i --suffix=B $original_size))"

    # Get current dimensions
    local width=$(sips -g pixelWidth "$file" | tail -1 | awk '{print $2}')
    local height=$(sips -g pixelHeight "$file" | tail -1 | awk '{print $2}')

    # Resize if needed
    if [ $width -gt $MAX_WIDTH ] || [ $height -gt $MAX_HEIGHT ]; then
        echo -e "    ${YELLOW}↓ Resizing from ${width}x${height}${NC}"
        sips --resampleHeightWidthMax $MAX_WIDTH "$file" > /dev/null 2>&1
    fi

    # Set JPEG quality for JPG files
    if [[ "$file" =~ \.(jpg|jpeg|JPG|JPEG)$ ]]; then
        sips --setProperty formatOptions $JPG_QUALITY "$file" > /dev/null 2>&1
    fi

    # Get optimized size
    local optimized_size=$(get_file_size "$file")
    local saved=$((original_size - optimized_size))
    local percent=$((saved * 100 / original_size))

    if [ $saved -gt 0 ]; then
        echo -e "    ${GREEN}✓ Saved: $(numfmt --to=iec-i --suffix=B $saved) (${percent}%)${NC}"
    else
        echo -e "    ${YELLOW}→ No size reduction${NC}"
    fi

    TOTAL_ORIGINAL_SIZE=$((TOTAL_ORIGINAL_SIZE + original_size))
    TOTAL_OPTIMIZED_SIZE=$((TOTAL_OPTIMIZED_SIZE + optimized_size))
    FILES_PROCESSED=$((FILES_PROCESSED + 1))
}

# Process all images
echo -e "${BLUE}Optimizing images...${NC}"
echo ""

# Find and process all JPG, JPEG, and PNG files
while IFS= read -r file; do
    optimize_image "$file"
done < <(find "$ASSETS_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \))

# Calculate total savings
TOTAL_SAVED=$((TOTAL_ORIGINAL_SIZE - TOTAL_OPTIMIZED_SIZE))
if [ $TOTAL_ORIGINAL_SIZE -gt 0 ]; then
    PERCENT_SAVED=$((TOTAL_SAVED * 100 / TOTAL_ORIGINAL_SIZE))
else
    PERCENT_SAVED=0
fi

# Display summary
echo ""
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  Optimization Summary${NC}"
echo -e "${BLUE}================================================${NC}"
echo -e "${GREEN}Files processed:${NC}    $FILES_PROCESSED"
echo -e "${YELLOW}Files skipped:${NC}      $FILES_SKIPPED"
echo -e "${BLUE}Original size:${NC}      $(numfmt --to=iec-i --suffix=B $TOTAL_ORIGINAL_SIZE)"
echo -e "${BLUE}Optimized size:${NC}     $(numfmt --to=iec-i --suffix=B $TOTAL_OPTIMIZED_SIZE)"
echo -e "${GREEN}Total saved:${NC}        $(numfmt --to=iec-i --suffix=B $TOTAL_SAVED) (${PERCENT_SAVED}%)"
echo -e "${BLUE}================================================${NC}"
echo ""
echo -e "${GREEN}✓ Optimization complete!${NC}"
echo -e "${YELLOW}Backup location: $BACKUP_DIR${NC}"
echo ""
echo -e "${BLUE}To restore from backup if needed:${NC}"
echo -e "  rm -rf $ASSETS_DIR"
echo -e "  mv $BACKUP_DIR $ASSETS_DIR"
echo ""
