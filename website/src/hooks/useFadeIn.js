import { useState, useEffect } from 'react';

/**
 * Custom hook for fade-in animation on mount
 *
 * @param {number} delay - Optional delay before triggering fade-in (in ms)
 * @returns {boolean} isVisible - Whether the element should be visible
 *
 * @example
 * const isVisible = useFadeIn();
 * return (
 *   <div className={`transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
 *     Content
 *   </div>
 * );
 */
export const useFadeIn = (delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isVisible;
};

export default useFadeIn;
