import { useEffect, useState, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import { getAssetPath } from '../utils/assets';
import ImageDetails from './ImageDetails';

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

    // Simply remove the no-scroll class - no scroll restoration needed
    document.body.classList.remove('no-scroll');
    document.body.style.removeProperty('padding-right');

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
    preventScrollOnSwipe: true,
    trackMouse: true, // Also enables mouse dragging
    delta: 50, // Minimum distance for swipe
  });

  // Separate effect for keyboard navigation
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, handleClose, handleNext, handlePrev]);

  // Separate effect for scroll prevention (only runs on mount/unmount)
  useEffect(() => {
    if (currentIndex === null) return;

    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Apply no-scroll class and compensate for scrollbar
    document.body.classList.add('no-scroll');
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    // Prevent touch and wheel scrolling
    const preventScroll = (e) => {
      if (e.target.closest('.lightbox-content')) {
        // Allow scrolling within lightbox content if needed
        return;
      }
      e.preventDefault();
    };

    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('wheel', preventScroll, { passive: false });

    return () => {
      // Only remove event listeners; scroll restoration is handled in handleClose
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('wheel', preventScroll);

      // Failsafe: restore if component unmounts without handleClose being called
      if (document.body.classList.contains('no-scroll')) {
        document.body.classList.remove('no-scroll');
        document.body.style.removeProperty('padding-right');
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount/unmount, not when currentIndex changes

  if (currentIndex === null) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      {...swipeHandlers}
      role="dialog"
      aria-modal="true"
      aria-label="Képnéző"
      className={`fixed inset-0 z-50 bg-black/95 flex items-center justify-center transition-opacity duration-300 overflow-hidden ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
      style={{ touchAction: 'none' }}
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
        className="lightbox-content max-w-7xl max-h-[90vh] p-4 select-none relative"
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.preventDefault()}
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
          style={{ userSelect: 'none' }}
        />
        {/* Copyright watermark */}
        <div className="absolute bottom-8 right-8 text-white/60 text-sm font-medium pointer-events-none select-none backdrop-blur-sm bg-black/30 px-3 py-2 rounded">
          © Pelei Niki
        </div>
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

      {/* Counter and EXIF data */}
      <div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm text-center space-y-2"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="font-medium">
          {currentIndex + 1} / {images.length}
        </div>
        <ImageDetails imageSrc={currentImage.src} className="text-white/80" />
      </div>
    </div>
  );
};

export default Lightbox;
