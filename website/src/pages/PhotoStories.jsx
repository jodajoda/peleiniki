import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PhotoStory from '../components/PhotoStory';
import Lightbox from '../components/Lightbox';
import SEO from '../components/SEO';
import ScrollToTopButton from '../components/ScrollToTopButton';

const PhotoStories = () => {
  const location = useLocation();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [currentStoryImages, setCurrentStoryImages] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);
  const storyRefs = useRef({});

  // Structured data for PhotoStories page - Article/Blog schema for narrative content
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Fotótörténetek - Pelei Niki Fotós",
    "description": "Narratív fotózás Budapesten - kövess végig teljes fotózásokat elejétől a végéig. Keresztelő és családi események képekben.",
    "url": "https://peleiniki.com/photo-stories",
    "author": {
      "@type": "Person",
      "name": "Pelei Niki",
      "url": "https://peleiniki.com"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Egy keresztelő története",
          "description": "Kövessük végig ezt a különleges napot a felkészüléstől az ünneplésig."
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Délután a Városligetben",
          "description": "Egy családi fotózás története, ahol a természet és a játék találkozik."
        }
      ]
    }
  };

  useEffect(() => {
    setIsVisible(true);

    // Add smooth-scroll class to HTML for enhanced scrolling
    document.documentElement.classList.add('smooth-scroll');

    const isMobile = window.innerWidth < 768;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-section-index');
            setVisibleSections((prev) => new Set([...prev, parseInt(index)]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: isMobile ? '0px 0px 50px 0px' : '0px 0px 0px 0px'
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('smooth-scroll');
    };
  }, []);

  // Scroll to specific story when navigating from Packages page
  useEffect(() => {
    if (location.state?.scrollToStory) {
      const storyId = location.state.scrollToStory;
      const storyElement = storyRefs.current[storyId];

      if (storyElement) {
        // Wait for the page to render and initial animations to complete
        setTimeout(() => {
          const headerOffset = 120; // Account for sticky header
          const elementPosition = storyElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          // Use smooth scrolling with custom easing
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Add a subtle highlight animation to the target story
          storyElement.classList.add('story-highlight');
          setTimeout(() => {
            storyElement.classList.remove('story-highlight');
          }, 2000);
        }, 500);
      }
    }
  }, [location.state]);

  // Photo Stories - Narrative sequences with chapters
  const photoStories = [
    {
      id: 'keresztelo-story',
      title: 'Egy keresztelő története',
      description: 'Kövessük végig ezt a különleges napot a felkészüléstől az ünneplésig.',
      duration: '4 órás fotózás',
      location: 'Budapest, templom és otthon',
      date: '2024 tavasz',
      chapters: [
        {
          title: 'Felkészülés',
          icon: '🏠',
          images: [
            {
              src: '/assets/portfolio/keresztelo/keresztelo-1.JPG',
              alt: 'Felkészülés a keresztelőre',
              caption: 'A család otthon készül a nagy napra. A nyugodt pillanatok, mielőtt indul a ceremónia.'
            },
            {
              src: '/assets/portfolio/keresztelo/keresztelo-2.JPG',
              alt: 'Részletek a felkészülésből',
              caption: 'Az apró részletek, amik különlegessé teszik ezt a napot.'
            }
          ]
        },
        {
          title: 'Ceremónia',
          icon: '⛪',
          images: [
            {
              src: '/assets/portfolio/keresztelo/keresztelo-3.JPG',
              alt: 'Keresztelő ceremónia',
              caption: 'A megható pillanat, amikor a kis herceg megkeresztelkedik.'
            },
            {
              src: '/assets/portfolio/keresztelo/keresztelo-4.JPG',
              alt: 'Család a templomban',
              caption: 'A szeretet és az öröm sugárzik a családtagok arcán.'
            }
          ]
        },
        {
          title: 'Ünneplés',
          icon: '🎉',
          images: [
            {
              src: '/assets/portfolio/keresztelo/keresztelo-5.JPG',
              alt: 'Családi ünneplés',
              caption: 'Otthon folytatódik az ünneplés, ahol mindenki együtt lehet.'
            },
            {
              src: '/assets/portfolio/keresztelo/keresztelo-6.JPG',
              alt: 'Boldog pillanatok',
              caption: 'Nevetés, ölelés, emlékezetes pillanatok a család körében.'
            }
          ]
        }
      ]
    },
    {
      id: 'varosliget-story',
      title: 'Délután a Városligetben',
      description: 'Egy családi fotózás története, ahol a természet és a játék találkozik.',
      duration: '2 órás fotózás',
      location: 'Városliget, Budapest',
      date: '2024 nyár',
      chapters: [
        {
          title: 'Érkezés',
          icon: '🚶',
          images: [
            {
              src: '/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-1.jpg',
              alt: 'Séta a Városligetben',
              caption: 'A család megérkezik, és máris kezdődik a felfedezés.'
            },
            {
              src: '/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-2.jpg',
              alt: 'Első pillanatok',
              caption: 'A gyerekek azonnal nekivágnak, felfedezni a liget szépségeit.'
            }
          ]
        },
        {
          title: 'Játék',
          icon: '🎈',
          images: [
            {
              src: '/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-3.jpg',
              alt: 'Játék a természetben',
              caption: 'Szabadon szaladgálnak, nevetnek - ez a legjobb pillanat fotózásra.'
            },
            {
              src: '/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-4.jpg',
              alt: 'Családi pillanatok',
              caption: 'Szülők és gyerekek együtt - az igazi öröm pillanatai.'
            }
          ]
        },
        {
          title: 'Nyugalom',
          icon: '🌳',
          images: [
            {
              src: '/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-5.jpg',
              alt: 'Pihenő a fák alatt',
              caption: 'A fotózás végén megpihennek, élvezik a közös időt.'
            },
            {
              src: '/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-6.jpg',
              alt: 'Búcsú pillanatok',
              caption: 'Utolsó ölelések és mosolyok - tökéletes lezárás.'
            }
          ]
        }
      ]
    }
  ];

  const handleImageClick = (storyId, imageIndex) => {
    const story = photoStories.find(s => s.id === storyId);
    if (story) {
      // Flatten all images from all chapters
      const allImages = story.chapters.flatMap(chapter => chapter.images);
      setCurrentStoryImages(allImages);
      setLightboxIndex(imageIndex);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setCurrentStoryImages(null);
  };

  const nextImage = () => {
    if (currentStoryImages) {
      setLightboxIndex((prev) => (prev + 1) % currentStoryImages.length);
    }
  };

  const prevImage = () => {
    if (currentStoryImages) {
      setLightboxIndex((prev) => (prev - 1 + currentStoryImages.length) % currentStoryImages.length);
    }
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16">
      <SEO
        title="Fotótörténetek"
        description="Narratív családi fotózás Budapesten - kövess végig teljes fotózásokat elejétől a végéig. Keresztelő és családi események képekben, történetként elmesélve."
        keywords="fotótörténet, narratív fotózás Budapest, keresztelő fotózás story, családi esemény fotózás, fotóriportázs, események megörökítése"
        ogImage="/assets/portfolio/keresztelo/keresztelo-1.JPG"
        ogImageAlt="Fotótörténetek - Családi események képekben elmesélve"
        canonicalUrl="/photo-stories"
        structuredData={structuredData}
      />

      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 md:mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className={`inline-block mb-2 transition-all duration-700 md:duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-primary-600 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-semibold">Narratív fotózás</span>
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 text-gray-900 transition-all duration-700 delay-75 md:duration-1000 md:delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Fotótörténetek
          </h1>
          <div className={`w-16 sm:w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto rounded-full mb-2 sm:mb-3 transition-all duration-700 delay-100 md:duration-1000 md:delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
          <p className={`text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed transition-all duration-700 delay-150 md:duration-1000 md:delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Kövess végig teljes eseményeket a kezdetektől a befejezésig. Minden történetnek megvan a maga íve, és én szeretek képekben mesélni.
          </p>
        </div>
      </div>

      {/* Photo Stories */}
      <div className="space-y-16 sm:space-y-20 md:space-y-24">
        {photoStories.map((story, storyIndex) => {
          const isSectionVisible = visibleSections.has(storyIndex);
          return (
            <section
              key={story.id}
              ref={(el) => {
                sectionRefs.current[storyIndex] = el;
                storyRefs.current[story.id] = el;
              }}
              data-section-index={storyIndex}
              className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden py-8 sm:py-10 md:py-12"
            >
              {/* Background decorations */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-orange-200 to-amber-300 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-amber-200 to-orange-300 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
              </div>

              <div className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ${isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <PhotoStory
                  story={story}
                  onImageClick={handleImageClick}
                />
              </div>
            </section>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && currentStoryImages && (
        <Lightbox
          images={currentStoryImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}

      {/* Scroll to top button */}
      <ScrollToTopButton isLightboxOpen={lightboxIndex !== null} />
    </div>
  );
};

export default PhotoStories;
