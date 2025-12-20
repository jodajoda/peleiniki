import { useEffect, useCallback } from 'react';

/**
 * Custom hook for locking/unlocking body scroll
 * Prevents scroll on body while maintaining scrollbar width to avoid layout shift
 * Also prevents touch and wheel scrolling
 *
 * @param {boolean} isLocked - Whether scroll should be locked
 * @param {string} targetClass - CSS class to apply when locked (default: 'no-scroll')
 *
 * @example
 * const [isModalOpen, setIsModalOpen] = useState(false);
 * useScrollLock(isModalOpen); // Locks scroll when modal is open
 */
export const useScrollLock = (isLocked = false, targetClass = 'no-scroll') => {
  const lockScroll = useCallback(() => {
    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Apply no-scroll class and compensate for scrollbar
    document.body.classList.add(targetClass);
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }, [targetClass]);

  const unlockScroll = useCallback(() => {
    document.body.classList.remove(targetClass);
    document.body.style.removeProperty('padding-right');
  }, [targetClass]);

  useEffect(() => {
    if (!isLocked) return;

    lockScroll();

    // Prevent touch and wheel scrolling
    const preventScroll = (e) => {
      // Allow scrolling within specific containers (e.g., lightbox content)
      if (e.target.closest('.scrollable-content')) {
        return;
      }
      e.preventDefault();
    };

    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('wheel', preventScroll, { passive: false });

    return () => {
      unlockScroll();
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('wheel', preventScroll);
    };
  }, [isLocked, lockScroll, unlockScroll]);

  return { lockScroll, unlockScroll };
};

/**
 * Simple scroll lock hook without automatic effect
 * Useful when you need manual control over lock/unlock timing
 *
 * @returns {Object} { lockScroll, unlockScroll } - Functions to manually control scroll
 *
 * @example
 * const { lockScroll, unlockScroll } = useScrollLockManual();
 * const handleOpen = () => {
 *   lockScroll();
 *   setIsOpen(true);
 * };
 */
export const useScrollLockManual = (targetClass = 'no-scroll') => {
  const lockScroll = useCallback(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.classList.add(targetClass);
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }, [targetClass]);

  const unlockScroll = useCallback(() => {
    document.body.classList.remove(targetClass);
    document.body.style.removeProperty('padding-right');
  }, [targetClass]);

  return { lockScroll, unlockScroll };
};

export default useScrollLock;
