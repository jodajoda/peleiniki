import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';
import LazyImage from './LazyImage';
import './MasonryGallery.css';

/**
 * MasonryGallery component displays images in a responsive masonry grid layout
 * Images are arranged in a Pinterest-style grid that adapts to screen size
 *
 * @param {Object} props
 * @param {Array} props.images - Array of image objects with src and alt
 * @param {Function} props.onImageClick - Callback when image is clicked
 * @param {boolean} [props.showWatermark=false] - Show copyright watermark on images
 * @param {boolean} [props.preventContextMenu=false] - Prevent right-click on images
 */
const MasonryGallery = ({
  images,
  onImageClick,
  showWatermark = false,
  preventContextMenu = false,
}) => {
  const breakpointColumns = {
    default: 3, // 3 columns on large screens
    1024: 2,    // 2 columns on tablets
    640: 1,     // 1 column on mobile
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="masonry-grid"
      columnClassName="masonry-column"
    >
      {images.map((image, index) => (
        <button
          key={index}
          type="button"
          className="relative overflow-hidden rounded-lg cursor-pointer group hover:shadow-soft-lg transition-all duration-500 animate-scale-in w-full text-left focus:outline-none focus:ring-4 focus:ring-primary-500"
          style={{ animationDelay: `${index * 0.05}s` }}
          onClick={() => onImageClick(index)}
          aria-label={`${image.alt} megnyitása nagyobb méretben`}
        >
          <LazyImage
            src={image.src}
            alt={image.alt}
            className="w-full hover-zoom image-soft-glow"
            showWatermark={showWatermark}
            preventContextMenu={preventContextMenu}
          />
        </button>
      ))}
    </Masonry>
  );
};

MasonryGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
  showWatermark: PropTypes.bool,
  preventContextMenu: PropTypes.bool,
};

export default MasonryGallery;
