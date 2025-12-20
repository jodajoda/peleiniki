import { useState, useCallback } from 'react';

/**
 * Custom hook for managing lightbox state
 * Handles opening, closing, and navigation between images in a gallery
 *
 * @param {Array<Array<Object>>} imageGroups - Optional array of image groups (for multi-gallery support)
 * @returns {Object} Lightbox state and control functions
 *
 * @example
 * // Single gallery
 * const { isOpen, currentIndex, openLightbox, closeLightbox, nextImage, prevImage } = useImageLightbox();
 *
 * // Multiple galleries
 * const {
 *   isOpen,
 *   currentIndex,
 *   currentGroup,
 *   openLightbox,
 *   closeLightbox,
 *   nextImage,
 *   prevImage
 * } = useImageLightbox(portfolioGroups);
 */
export const useImageLightbox = (imageGroups = null) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);

  const openLightbox = useCallback((groupIndexOrImageIndex, imageIndex = null) => {
    // Support both single gallery and multi-gallery modes
    if (imageGroups && imageIndex !== null) {
      // Multi-gallery mode: openLightbox(groupIndex, imageIndex)
      setCurrentGroup(groupIndexOrImageIndex);
      setLightboxIndex(imageIndex);
    } else {
      // Single gallery mode: openLightbox(imageIndex)
      setLightboxIndex(groupIndexOrImageIndex);
    }
  }, [imageGroups]);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setCurrentGroup(null);
  }, []);

  const nextImage = useCallback((totalImages = null) => {
    if (imageGroups && currentGroup !== null) {
      const total = imageGroups[currentGroup]?.images?.length || 0;
      setLightboxIndex((prev) => (prev + 1) % total);
    } else if (totalImages) {
      setLightboxIndex((prev) => (prev + 1) % totalImages);
    }
  }, [imageGroups, currentGroup]);

  const prevImage = useCallback((totalImages = null) => {
    if (imageGroups && currentGroup !== null) {
      const total = imageGroups[currentGroup]?.images?.length || 0;
      setLightboxIndex((prev) => (prev - 1 + total) % total);
    } else if (totalImages) {
      setLightboxIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  }, [imageGroups, currentGroup]);

  return {
    isOpen: lightboxIndex !== null,
    currentIndex: lightboxIndex,
    currentGroup,
    openLightbox,
    closeLightbox,
    nextImage,
    prevImage,
  };
};

export default useImageLightbox;
