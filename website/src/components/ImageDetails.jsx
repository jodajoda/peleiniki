import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EXIF from 'exif-js';
import { getAssetPath } from '../utils/assets';

/**
 * ImageDetails component displays EXIF metadata for an image
 * Shows camera model, aperture, ISO, shutter speed, and focal length
 *
 * @param {Object} props
 * @param {string} props.imageSrc - Image source path
 * @param {string} [props.className] - Additional CSS classes
 */
const ImageDetails = ({ imageSrc, className = '' }) => {
  const [exifData, setExifData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setExifData(null);

    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Enable CORS for external images
    img.src = getAssetPath(imageSrc);

    img.onload = () => {
      EXIF.getData(img, function() {
        const make = EXIF.getTag(this, 'Make');
        const model = EXIF.getTag(this, 'Model');
        const fNumber = EXIF.getTag(this, 'FNumber');
        const iso = EXIF.getTag(this, 'ISOSpeedRatings');
        const exposureTime = EXIF.getTag(this, 'ExposureTime');
        const focalLength = EXIF.getTag(this, 'FocalLength');

        // Only set EXIF data if we have at least one piece of information
        if (make || model || fNumber || iso || exposureTime || focalLength) {
          setExifData({
            camera: model ? `${make ? make + ' ' : ''}${model}` : null,
            aperture: fNumber ? `f/${fNumber}` : null,
            iso: iso ? `ISO ${iso}` : null,
            shutterSpeed: exposureTime ? `${exposureTime}s` : null,
            focalLength: focalLength ? `${focalLength}mm` : null,
          });
        }
        setLoading(false);
      });
    };

    img.onerror = () => {
      setLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSrc]);

  // Don't render if no EXIF data is available
  if (loading || !exifData) {
    return null;
  }

  return (
    <div className={`text-xs text-gray-400 space-y-1 ${className}`}>
      {exifData.camera && (
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          <span>{exifData.camera}</span>
        </div>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        {exifData.aperture && (
          <span title="Apertúra">{exifData.aperture}</span>
        )}
        {exifData.shutterSpeed && (
          <span title="Zársebesség">{exifData.shutterSpeed}</span>
        )}
        {exifData.iso && (
          <span title="ISO érzékenység">{exifData.iso}</span>
        )}
        {exifData.focalLength && (
          <span title="Fókusztávolság">{exifData.focalLength}</span>
        )}
      </div>
    </div>
  );
};

ImageDetails.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ImageDetails;
