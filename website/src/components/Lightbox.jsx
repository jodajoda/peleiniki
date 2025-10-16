import { useEffect, useState, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import { getAssetPath } from '../utils/assets';

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageKey, setImageKey] = useState(0);
  const [direction, setDirection] = useState('none');

  useEffect(() => {
    // Trigger fade-in animation on mount
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Trigger image transition animation when index changes
    setImageKey(prev => prev + 1);
  }, [currentIndex]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
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
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Also enables mouse dragging
    delta: 50, // Minimum distance for swipe
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleClose, handleNext, handlePrev]);

  if (currentIndex === null) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Képnéző"
      className={`fixed inset-0 z-50 bg-black/95 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-all duration-300 z-10 hover:scale-110"
        aria-label="Bezárás"
      >
        <svg
          className="w-8 h-8"
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
          className="absolute left-4 text-white hover:text-gray-300 transition-all duration-300 z-10 hover:scale-110"
          aria-label="Előző kép"
        >
          <svg
            className="w-10 h-10"
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
        {...swipeHandlers}
        className="max-w-7xl max-h-[90vh] p-4 touch-pan-y select-none"
        onClick={(e) => e.stopPropagation()}
        role="img"
        aria-label={`Kép ${currentIndex + 1} / ${images.length}: ${currentImage.alt}`}
      >
        <img
          key={imageKey}
          src={getAssetPath(currentImage.src)}
          alt={currentImage.alt}
          draggable={false}
          className={`max-w-full max-h-[90vh] object-contain transition-all duration-300 ${
            direction === 'left'
              ? 'animate-slide-in-left'
              : direction === 'right'
              ? 'animate-slide-in-right'
              : 'animate-fade-in'
          }`}
        />
      </div>

      {/* Next button */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 text-white hover:text-gray-300 transition-all duration-300 z-10 hover:scale-110"
          aria-label="Következő kép"
        >
          <svg
            className="w-10 h-10"
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

      {/* Counter */}
      <div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default Lightbox;
