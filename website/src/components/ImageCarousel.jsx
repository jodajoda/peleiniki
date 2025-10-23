import { useState, useEffect, useCallback, useRef } from 'react';
import { getAssetPath } from '../utils/assets';
import PropTypes from 'prop-types';

const ImageCarousel = ({ images, alt, className = '', autoplay = true, interval = 5000, startOnVisible = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next');
  const [isVisible, setIsVisible] = useState(!startOnVisible); // If startOnVisible is false, start immediately
  const carouselRef = useRef(null);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setDirection('next');
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setDirection('prev');
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length, isTransitioning]);

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setDirection(index > currentIndex ? 'next' : 'prev');
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Intersection Observer to detect when carousel becomes visible
  useEffect(() => {
    if (!startOnVisible || !carouselRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the carousel is visible
        rootMargin: '0px',
      }
    );

    observer.observe(carouselRef.current);

    return () => observer.disconnect();
  }, [startOnVisible]);

  // Autoplay effect - only starts when visible
  useEffect(() => {
    if (!autoplay || images.length <= 1 || !isVisible) return;

    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, images.length, isVisible, goToNext]);

  // If only one image, render static image
  if (images.length === 1) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${className}`}>
        <img
          src={getAssetPath(images[0])}
          alt={alt}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div ref={carouselRef} className={`relative overflow-hidden rounded-2xl ${className}`}>
      {/* Images Container */}
      <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9]">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentIndex
                ? 'opacity-100 translate-x-0 z-10'
                : index < currentIndex
                ? direction === 'next'
                  ? 'opacity-0 -translate-x-full z-0'
                  : 'opacity-0 translate-x-full z-0'
                : direction === 'next'
                ? 'opacity-0 translate-x-full z-0'
                : 'opacity-0 -translate-x-full z-0'
            }`}
          >
            <img
              src={getAssetPath(image)}
              alt={`${alt} - ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 pointer-events-none"></div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 opacity-0 group-hover:opacity-100"
        aria-label="Previous image"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 opacity-0 group-hover:opacity-100"
        aria-label="Next image"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 ${
              index === currentIndex
                ? 'bg-white scale-125 w-6 sm:w-8'
                : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Go to image ${index + 1}`}
            aria-current={index === currentIndex}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-30 bg-black/60 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  autoplay: PropTypes.bool,
  interval: PropTypes.number,
  startOnVisible: PropTypes.bool,
};

export default ImageCarousel;
