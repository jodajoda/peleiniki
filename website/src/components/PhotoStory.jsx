import { useState, useRef, useEffect } from 'react';
import LazyImage from './LazyImage';

const PhotoStory = ({ story, onImageClick }) => {
  const [activeChapter, setActiveChapter] = useState(0);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      return () => scrollContainer.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollToChapter = (index) => {
    setActiveChapter(index);
    if (scrollRef.current) {
      const chapterElements = scrollRef.current.querySelectorAll('[data-chapter]');
      if (chapterElements[index]) {
        chapterElements[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

  return (
    <div className="relative">
      {/* Story Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
              Fotótörténet
            </span>
          </div>
          {story.duration && (
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {story.duration}
            </span>
          )}
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {story.title}
        </h3>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          {story.description}
        </p>
      </div>

      {/* Chapter Timeline */}
      {story.chapters.length > 1 && (
        <div className="mb-6 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 min-w-max pb-2">
            {story.chapters.map((chapter, index) => (
              <button
                key={index}
                onClick={() => scrollToChapter(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                  activeChapter === index
                    ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label={`Ugrás: ${chapter.title}`}
              >
                <span className="mr-2">{chapter.icon}</span>
                {chapter.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Horizontal Scroll Gallery */}
      <div className="relative group">
        {/* Scroll Buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl flex items-center justify-center text-gray-700 hover:text-orange-500 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-4 focus:ring-orange-400/50"
            aria-label="Előző képek"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl flex items-center justify-center text-gray-700 hover:text-orange-500 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-4 focus:ring-orange-400/50"
            aria-label="Következő képek"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto hide-scrollbar scroll-smooth pb-4"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {story.chapters.map((chapter, chapterIndex) => (
            <div
              key={chapterIndex}
              data-chapter={chapterIndex}
              className="flex-shrink-0 scroll-snap-start"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Chapter Images */}
              <div className="flex gap-4 sm:gap-6">
                {chapter.images.map((image, imageIndex) => {
                  const globalImageIndex = story.chapters
                    .slice(0, chapterIndex)
                    .reduce((acc, ch) => acc + ch.images.length, 0) + imageIndex;

                  return (
                    <div
                      key={imageIndex}
                      className="relative flex-shrink-0 w-64 sm:w-80 md:w-96 group/image"
                    >
                      {/* Image Container */}
                      <button
                        type="button"
                        onClick={() => onImageClick(story.id, globalImageIndex)}
                        className="relative block w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-orange-400"
                        aria-label={`${image.alt} - kattints a nagyításhoz`}
                      >
                        <div className="aspect-[3/4]">
                          <LazyImage
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                          />
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover/image:opacity-100 transition-all duration-500 flex items-end justify-center pb-4">
                          <svg
                            className="w-12 h-12 text-white transform translate-y-4 group-hover/image:translate-y-0 transition-transform duration-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                        </div>

                        {/* Chapter Badge */}
                        <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-md">
                          <span className="text-xs font-semibold text-gray-800 flex items-center gap-1">
                            <span>{chapter.icon}</span>
                            <span>{chapter.title}</span>
                          </span>
                        </div>
                      </button>

                      {/* Caption */}
                      {image.caption && (
                        <div className="mt-3 px-2">
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            {image.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>

      {/* Story Stats */}
      {(story.location || story.date) && (
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
          {story.location && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{story.location}</span>
            </div>
          )}
          {story.date && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{story.date}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoStory;
