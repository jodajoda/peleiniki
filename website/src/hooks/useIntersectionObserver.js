import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for tracking element visibility with IntersectionObserver
 *
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Threshold at which to trigger (0-1)
 * @param {string} options.rootMargin - Root margin for early/late triggering
 * @param {boolean} options.triggerOnce - Whether to disconnect after first trigger
 * @param {boolean} options.useMobileOptimization - Auto-adjust rootMargin for mobile
 * @returns {Object} { ref, isIntersecting, isVisible } - Ref to attach and visibility state
 *
 * @example
 * const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
 * return <div ref={ref} className={isVisible ? 'fade-in' : 'hidden'}>Content</div>;
 */
export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  useMobileOptimization = true,
} = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    // Mobile optimization: adjust rootMargin for smoother experience
    const isMobile = useMobileOptimization && window.innerWidth < 768;
    const adjustedRootMargin = isMobile && rootMargin === '0px'
      ? '0px 0px 50px 0px'
      : rootMargin;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);

          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: adjustedRootMargin,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce, useMobileOptimization]);

  return { ref, isIntersecting, isVisible };
};

/**
 * Custom hook for tracking multiple elements with IntersectionObserver
 * Useful for staggered animations on lists/grids
 *
 * @param {number} count - Number of elements to track
 * @param {Object} options - IntersectionObserver options (same as useIntersectionObserver)
 * @returns {Object} { refs, visibleIndices } - Array of refs and Set of visible indices
 *
 * @example
 * const { refs, visibleIndices } = useMultipleIntersectionObserver(items.length);
 * return items.map((item, i) => (
 *   <div ref={refs[i]} className={visibleIndices.has(i) ? 'visible' : 'hidden'} />
 * ));
 */
export const useMultipleIntersectionObserver = (
  count,
  { threshold = 0.1, rootMargin = '0px', useMobileOptimization = true } = {}
) => {
  const [visibleIndices, setVisibleIndices] = useState(new Set());
  const refs = useRef([]);

  useEffect(() => {
    // Initialize refs array
    refs.current = Array(count).fill(null).map(() => null);
  }, [count]);

  useEffect(() => {
    const isMobile = useMobileOptimization && window.innerWidth < 768;
    const adjustedRootMargin = isMobile && rootMargin === '0px'
      ? '0px 0px 50px 0px'
      : rootMargin;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-section-index'));
            setVisibleIndices((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        threshold,
        rootMargin: adjustedRootMargin,
      }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [threshold, rootMargin, useMobileOptimization]);

  return { refs, visibleIndices };
};

export default useIntersectionObserver;
