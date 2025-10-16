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
