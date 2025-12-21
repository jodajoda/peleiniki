import { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * DecorativeBackground component with floating blur elements and pattern overlay
 * Provides a consistent decorative background for sections
 * Memoized for performance since props rarely change
 *
 * @param {string} patternId - Unique ID for the SVG pattern (required for multiple instances)
 * @param {string} variant - Color variant ('orange', 'primary', 'warm', 'sunset')
 * @param {boolean} showPattern - Whether to show the dot pattern overlay
 * @param {number} blurIntensity - Opacity of blur elements (0-1)
 */
const DecorativeBackground = memo(({
  patternId = 'none',
  variant = 'orange',
  showPattern = true,
  blurIntensity = 0.15,
}) => {
  // Color variants for blur elements
  const colorVariants = {
    orange: {
      blur1: 'from-orange-200 to-amber-300',
      blur2: 'from-amber-200 to-orange-300',
      blur3: 'bg-orange-100',
    },
    primary: {
      blur1: 'from-primary-200 to-primary-300',
      blur2: 'from-primary-200 to-primary-300',
      blur3: 'bg-primary-100',
    },
    warm: {
      blur1: 'from-accent-warm/30 to-accent-gold/30',
      blur2: 'from-accent-rose/30 to-accent-sunset/30',
      blur3: 'bg-primary-300',
    },
    sunset: {
      blur1: 'from-accent-sunset/40 to-accent-warm/40',
      blur2: 'from-accent-gold/40 to-accent-rose/40',
      blur3: 'bg-accent-lavender/30',
    },
  };

  const colors = colorVariants[variant] || colorVariants.orange;

  return (
    <>
      {/* Floating blur elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: blurIntensity }}
      >
        <div
          className={`absolute top-10 left-10 w-80 h-80 bg-gradient-to-br ${colors.blur1} rounded-full blur-3xl animate-float`}
        ></div>
        <div
          className={`absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl ${colors.blur2} rounded-full blur-3xl animate-float`}
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className={`absolute top-1/2 left-1/3 w-64 h-64 ${colors.blur3} rounded-full blur-3xl animate-float`}
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      {/* Decorative pattern overlay */}
      {showPattern && (
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id={patternId}
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="20" cy="20" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        </div>
      )}
    </>
  );
});

DecorativeBackground.displayName = 'DecorativeBackground';

DecorativeBackground.propTypes = {
  patternId: PropTypes.string,
  variant: PropTypes.oneOf(['orange', 'primary', 'warm', 'sunset']),
  showPattern: PropTypes.bool,
  blurIntensity: PropTypes.number,
};

export default DecorativeBackground;
