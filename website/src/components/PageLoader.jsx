/**
 * PageLoader Component
 *
 * Loading fallback displayed during route-based code splitting.
 * Shows a centered spinner with shimmer animation while the page loads.
 */

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-white">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
        </div>

        {/* Loading text with shimmer */}
        <p className="text-primary-600 font-medium animate-pulse">
          Betöltés...
        </p>
      </div>
    </div>
  );
}

export default PageLoader;
