/**
 * Get the correct asset path with base URL prefix
 * @param {string} path - The asset path (e.g., 'assets/portfolio/image.jpg')
 * @returns {string} - The full path with base URL
 */
export const getAssetPath = (path) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Get Vite's base URL (e.g., '/peleiniki/' or '/')
  const baseUrl = import.meta.env.BASE_URL;

  // Combine base URL with asset path
  return `${baseUrl}${cleanPath}`;
};

/**
 * Get responsive image path based on screen width
 * Automatically selects smaller image sizes for mobile devices
 * Includes fallback logic for images that don't have all sizes available
 * @param {string} path - The original image path (e.g., '/assets/portfolio/image.jpg')
 * @param {number} screenWidth - Current screen width in pixels
 * @returns {string} - The responsive image path with base URL
 */
export const getResponsiveImagePath = (path, screenWidth = window.innerWidth) => {
  // Determine target widths based on screen size (with fallbacks)
  let targetWidths;
  if (screenWidth <= 640) {
    // Mobile: prefer 800w, fallback to 1200w, then 400w
    targetWidths = ['800w', '1200w', '400w'];
  } else if (screenWidth <= 1024) {
    // Tablet: prefer 1200w, fallback to 1600w, then 800w
    targetWidths = ['1200w', '1600w', '800w'];
  } else {
    // Desktop: prefer 1600w, fallback to 1200w, then 800w
    targetWidths = ['1600w', '1200w', '800w'];
  }

  // Extract file path components
  const lastDot = path.lastIndexOf('.');
  const lastSlash = path.lastIndexOf('/');

  if (lastDot === -1 || lastSlash === -1) {
    // If no extension or path separator found, return original with base URL
    return getAssetPath(path);
  }

  const extension = path.substring(lastDot + 1).toLowerCase();
  const basePath = path.substring(0, lastDot);

  // Try each target width with WebP format first
  // Use the first available width from our preference list
  const primaryWidth = targetWidths[0];
  const webpPath = `${basePath}-${primaryWidth}.webp`;

  // Note: The browser will naturally handle 404 errors and can use the fallback
  // But for production, you should ensure all required sizes exist
  // If a 1600w version doesn't exist (image too small), the next smaller size will be generated
  return getAssetPath(webpPath);
};
