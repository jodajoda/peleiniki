import SkeletonImage from './SkeletonImage';

/**
 * Skeleton placeholder for gallery loading states
 * Displays a grid of skeleton image placeholders
 * @param {Object} props
 * @param {number} props.count - Number of skeleton items to display (default: 6)
 * @returns {JSX.Element}
 */
function SkeletonGallery({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonImage key={index} className="w-full" />
      ))}
    </div>
  );
}

export default SkeletonGallery;
