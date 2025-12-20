import { useEffect, useCallback } from 'react';

/**
 * Custom hook for keyboard navigation
 * Supports common navigation patterns like arrows, escape, enter, etc.
 *
 * @param {Object} handlers - Object mapping key names to handler functions
 * @param {boolean} enabled - Whether keyboard navigation is enabled
 * @param {Array} dependencies - Additional dependencies for the effect
 *
 * @example
 * useKeyboardNavigation({
 *   Escape: handleClose,
 *   ArrowLeft: handlePrev,
 *   ArrowRight: handleNext,
 *   Enter: handleSubmit,
 * }, isOpen, [isOpen, currentIndex]);
 */
export const useKeyboardNavigation = (handlers = {}, enabled = true, dependencies = []) => {
  const handleKeyDown = useCallback((e) => {
    const handler = handlers[e.key];
    if (handler) {
      handler(e);
    }
  }, [handlers]);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, handleKeyDown, ...dependencies]); // eslint-disable-line react-hooks/exhaustive-deps
};

/**
 * Preset hook for lightbox keyboard navigation
 * Common pattern for image galleries and lightboxes
 *
 * @param {Function} onClose - Handler for Escape key
 * @param {Function} onNext - Handler for ArrowRight key
 * @param {Function} onPrev - Handler for ArrowLeft key
 * @param {boolean} enabled - Whether keyboard navigation is enabled
 *
 * @example
 * useLightboxKeyboard(closeLightbox, nextImage, prevImage, isOpen);
 */
export const useLightboxKeyboard = (onClose, onNext, onPrev, enabled = true) => {
  useKeyboardNavigation(
    {
      Escape: onClose,
      ArrowRight: onNext,
      ArrowLeft: onPrev,
    },
    enabled,
    [onClose, onNext, onPrev]
  );
};

/**
 * Preset hook for modal keyboard navigation
 * Common pattern for modals and dialogs
 *
 * @param {Function} onClose - Handler for Escape key
 * @param {Function} onConfirm - Handler for Enter key (optional)
 * @param {boolean} enabled - Whether keyboard navigation is enabled
 *
 * @example
 * useModalKeyboard(closeModal, handleConfirm, isModalOpen);
 */
export const useModalKeyboard = (onClose, onConfirm = null, enabled = true) => {
  const handlers = {
    Escape: onClose,
  };

  if (onConfirm) {
    handlers.Enter = onConfirm;
  }

  useKeyboardNavigation(handlers, enabled, [onClose, onConfirm]);
};

export default useKeyboardNavigation;
