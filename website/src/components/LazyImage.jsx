import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getAssetPath } from '../utils/assets';

/**
 * Enhanced LazyImage component with responsive images, WebP support, and blur-up placeholders
 *
 * Features:
 * - Lazy loading with IntersectionObserver
 * - Responsive images (srcset) for different screen sizes
 * - WebP format with JPEG fallback
 * - LQIP (Low Quality Image Placeholder) for blur-up effect
 * - Layout shift prevention with aspect ratio
 * - Shimmer animation while loading
 *
 * @param {Object} props
 * @param {string} props.src - Original image path
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} [props.onClick] - Click handler
 * @param {Object} [props.style] - Inline styles
 * @param {number} [props.width] - Image width for layout shift prevention
 * @param {number} [props.height] - Image height for layout shift prevention
 * @param {boolean} [props.useResponsive=true] - Enable responsive images
 */
const LazyImage = ({
  src,
  alt,
  className = '',
  onClick,
  style,
  width,
  height,
  useResponsive = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  // Get the correct asset path with base URL
  const imageSrc = getAssetPath(src);

  // Generate responsive image variants
  const generateSrcSet = (basePath) => {
    const ext = basePath.substring(basePath.lastIndexOf('.'));
    const pathWithoutExt = basePath.substring(0, basePath.lastIndexOf('.'));
    const widths = [400, 800, 1200, 1600];

    return widths
      .map(w => `${getAssetPath(pathWithoutExt + `-${w}w${ext}`)} ${w}w`)
      .join(', ');
  };

  // Generate WebP srcset
  const generateWebPSrcSet = (basePath) => {
    const pathWithoutExt = basePath.substring(0, basePath.lastIndexOf('.'));
    const widths = [400, 800, 1200, 1600];

    return widths
      .map(w => `${getAssetPath(pathWithoutExt + `-${w}w.webp`)} ${w}w`)
      .join(', ');
  };

  useEffect(() => {
    const currentRef = imgRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '200px', // Start loading 200px before image enters viewport
        threshold: 0.01,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Calculate aspect ratio for layout shift prevention
  const aspectRatio = width && height ? (height / width) * 100 : null;

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
      style={{
        ...style,
        ...(aspectRatio && { paddingBottom: `${aspectRatio}%` }),
      }}
    >
      {/* Skeleton loader with shimmer */}
      {!isLoaded && (
        <>
          <div className="absolute inset-0 bg-primary-100"></div>
          {isInView && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-200 to-transparent animate-shimmer bg-[length:200%_100%]"></div>
          )}
        </>
      )}

      {/* Responsive image with WebP support */}
      {isInView && useResponsive ? (
        <picture className={aspectRatio ? 'absolute inset-0' : ''}>
          {/* WebP format (modern browsers) */}
          <source
            type="image/webp"
            srcSet={generateWebPSrcSet(src)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* JPEG fallback with srcset */}
          <source
            type="image/jpeg"
            srcSet={generateSrcSet(src)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Fallback img tag */}
          <img
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            loading="lazy"
            decoding="async"
          />
        </picture>
      ) : (
        /* Simple image without responsive features */
        isInView && (
          <img
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            loading="lazy"
            decoding="async"
          />
        )
      )}
    </div>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  useResponsive: PropTypes.bool,
};

export default LazyImage;
