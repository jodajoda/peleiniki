import { useEffect, useState, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import { getResponsiveImagePath } from '../utils/assets';
import ImageDetails from './ImageDetails';
import { useFadeIn } from '../hooks/useFadeIn';
import { useLightboxKeyboard } from '../hooks/useKeyboardNavigation';
import { useScrollLock } from '../hooks/useScrollLock';

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const isVisible = useFadeIn();
  const [imageKey, setImageKey] = useState(0);
  const [direction, setDirection] = useState('none');

  // Use scroll lock hook
  useScrollLock(currentIndex !== null);

  useEffect(() => {
    // Trigger image transition animation when index changes
    setImageKey(prev => prev + 1);
  }, [currentIndex]);

  const handleClose = useCallback(() => {
    setTimeout(() => onClose(), 300);
  }, [onClose]);

  const handleNext = useCallback(() => {
    setDirection('right');
    setTimeout(() => {
      onNext();
      setDirection('none');
    }, 150);
  }, [onNext]);

  const handlePrev = useCallback(() => {
    setDirection('left');
    setTimeout(() => {
      onPrev();
      setDirection('none');
    }, 150);
  }, [onPrev]);

  // Use keyboard navigation hook
  useLightboxKeyboard(handleClose, handleNext, handlePrev, currentIndex !== null);

  // Swipeable handlers for touch gestures
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < images.length - 1) {
        handleNext();
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        handlePrev();
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true, // Also enables mouse dragging
    delta: 50, // Minimum distance for swipe
  });

  if (currentIndex === null) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      {...swipeHandlers}
      role="dialog"
      aria-modal="true"
      aria-label="Képnéző"
      className={`fixed inset-0 z-[90] bg-black/95 flex items-center justify-center transition-opacity duration-300 overflow-hidden ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
      style={{ touchAction: 'none' }}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white hover:text-gray-300 transition-all duration-300 z-10 hover:scale-110 p-2 sm:p-0"
        aria-label="Bezárás"
      >
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Previous button */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-2 sm:left-4 text-white hover:text-gray-300 transition-all duration-300 z-10 hover:scale-110 p-2 sm:p-0"
          aria-label="Előző kép"
        >
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Image */}
      <div
        className="lightbox-content w-full max-w-7xl max-h-screen px-0 sm:px-4 py-0 sm:py-4 select-none relative"
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.preventDefault()}
        role="img"
        aria-label={`Kép ${currentIndex + 1} / ${images.length}: ${currentImage.alt}`}
      >
        <img
          key={imageKey}
          src={getResponsiveImagePath(currentImage.src)}
          alt={currentImage.alt}
          draggable={false}
          className={`w-full h-auto max-h-screen sm:max-h-[90vh] object-contain transition-all duration-300 ${
            direction === 'left'
              ? 'animate-slide-in-left'
              : direction === 'right'
              ? 'animate-slide-in-right'
              : 'animate-fade-in'
          }`}
          style={{ userSelect: 'none' }}
        />
      </div>

      {/* Next button */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-2 sm:right-4 text-white hover:text-gray-300 transition-all duration-300 z-10 hover:scale-110 p-2 sm:p-0"
          aria-label="Következő kép"
        >
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Counter and EXIF data */}
      <div
        className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xs sm:text-sm text-center space-y-1 sm:space-y-2"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="font-medium">
          {currentIndex + 1} / {images.length}
        </div>
        <ImageDetails imageSrc={currentImage.src} className="text-white/80 text-xs sm:text-sm" />
      </div>
    </div>
  );
};

export default Lightbox;
