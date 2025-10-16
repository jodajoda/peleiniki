/**
 * Skeleton placeholder for image loading states
 * Displays an animated shimmer effect while content loads
 * @param {Object} props
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
function SkeletonImage({ className = '' }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
        <div className="aspect-[4/3] w-full"></div>
      </div>
    </div>
  );
}

export default SkeletonImage;
