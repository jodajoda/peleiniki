import { memo } from 'react';
import PropTypes from 'prop-types';
import LazyImage from './LazyImage';

/**
 * GalleryImage component - Individual image button with hover effects and zoom icon
 * Memoized for performance in large galleries
 *
 * @param {string} src - Image source path
 * @param {string} alt - Image alt text
 * @param {Function} onClick - Click handler for opening lightbox
 * @param {string} className - Additional CSS classes for container
 * @param {string} imageClassName - CSS classes for the image
 * @param {number} animationDelay - Animation delay in seconds
 * @param {boolean} showIcon - Whether to show the zoom icon on hover
 */
const GalleryImage = memo(({
  src,
  alt,
  onClick,
  className = '',
  imageClassName = 'h-72 object-cover transition-transform duration-1000 group-hover:scale-110',
  animationDelay = 0,
  showIcon = true,
}) => {
  return (
    <button
      type="button"
      className={`relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-orange-400 ${className}`}
      style={{ animationDelay: `${animationDelay}s` }}
      onClick={onClick}
      aria-label={`${alt} megnyitása nagyobb méretben`}
    >
      <LazyImage
        src={src}
        alt={alt}
        className={imageClassName}
      />

      {/* Hover overlay with zoom icon */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
        {showIcon && (
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <svg
              className="w-14 h-14 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
});

GalleryImage.displayName = 'GalleryImage';

GalleryImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  animationDelay: PropTypes.number,
  showIcon: PropTypes.bool,
};

export default GalleryImage;
