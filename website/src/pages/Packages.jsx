import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollToTopButton from '../components/ScrollToTopButton';

const Packages = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  useEffect(() => {
    setIsVisible(true);

    // Intersection Observer for card animations
    // On mobile: trigger earlier with increased rootMargin for faster card appearance
    const isMobile = window.innerWidth < 768;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-card-index');
            setVisibleCards((prev) => new Set([...prev, parseInt(index)]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: isMobile ? '0px 0px 150px 0px' : '0px 0px -50px 0px'
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleInterestClick = (packageTitle) => {
    const message = `Szia! Érdeklődnék a "${packageTitle}" csomaggal kapcsolatban. Kérek további információt!`;
    navigate('/contact', { state: { message } });
  };

  const packages = [
    {
      id: 1,
      title: 'Játszótéri móka',
      description: 'Kedvenc játszótereteken, vagy parkban.',
      duration: '40 perc fotózás',
      photos: '15 db digitális kép (online tárhelyről letölthető)',
      price: '25.000 Ft',
    },
    {
      id: 2,
      title: 'Röpke pillanatok',
      description: 'Egy helyszínen (otthon, kedvenc játszótereteken, vagy parkban).',
      duration: '60 perc fotózás',
      photos: '30 db digitális kép (online tárhelyről letölthető)',
      price: '35.000 Ft',
    },
    {
      id: 3,
      title: 'Mindennapi csodák',
      description: 'Akár két helyszínen (otthon, kertben, parkban, vagy más számotokra kedves környezetben).',
      duration: '1.5 – 2 óra fotózás',
      photos: '50 db digitális kép (online tárhelyről letölthető)',
      price: '50.000 Ft',
    },
    {
      id: 4,
      title: 'Események',
      description: 'Szülinap, keresztelő, eljegyzési fotózás, esküvő',
      duration: null,
      photos: null,
      price: 'Egyedi árazás',
      note: 'Üzenetben tudsz érdeklődni az egyedi ajánlatért.',
    },
  ];

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 relative overflow-hidden">
      <SEO
        title="Fotózási Csomagok"
        description="Válassz a fotózási csomagjaim közül - játszótéri fotózás, családi fotózás, kismama fotózás, keresztelő és egyedi rendezvények. Árak és részletek."
        keywords="fotózási csomagok, fotózás árak, családi fotózás ár, kismama fotózás ár, keresztelő fotózás ár, esküvői fotózás"
        ogImage="/assets/homepage/csomagok.jpg"
        ogImageAlt="Fotózási Csomagok és Árak"
        canonicalUrl="/packages"
      />

      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-200 to-amber-300 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tl from-amber-200 to-orange-300 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-100 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="packages-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#packages-dots)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10">
          <div className={`inline-block mb-2 transition-all duration-700 md:duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-primary-600 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-semibold">Áraim</span>
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 text-gray-900 transition-all duration-700 delay-75 md:duration-1000 md:delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Fotózási Csomagok
          </h1>
          <div className={`w-16 sm:w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto rounded-full mb-2 sm:mb-3 transition-all duration-700 delay-100 md:duration-1000 md:delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
          <p className={`text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed transition-all duration-700 delay-150 md:duration-1000 md:delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Válassz a fotózási csomagjaim közül, és örökítsük meg együtt a családod legszebb pillanatait
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
          {packages.map((pkg, index) => {
            const isCardVisible = visibleCards.has(index);
            return (
              <article
                key={pkg.id}
                ref={(el) => (cardRefs.current[index] = el)}
                data-card-index={index}
                className={`relative group bg-gradient-to-br from-white via-primary-50 to-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-soft hover:shadow-soft-lg transition-all duration-600 md:duration-700 overflow-hidden ${
                  isCardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: window.innerWidth < 768 ? `${index * 0.08}s` : `${index * 0.15}s`
                }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-amber-100 opacity-0 group-hover:opacity-20 rounded-bl-full transition-all duration-700 transform translate-x-16 -translate-y-16 group-hover:translate-x-0 group-hover:translate-y-0"></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Package Title */}
                  <div className="mb-2">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-800 mb-1 sm:mb-2 group-hover:text-primary-900 transition-colors duration-500">
                      {pkg.title}
                    </h2>
                    <div className="w-10 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full transform origin-left transition-all duration-500 group-hover:w-14 sm:group-hover:w-16"></div>
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">{pkg.description}</p>

                  {/* Package Details */}
                  {pkg.duration || pkg.photos ? (
                    <ul className="space-y-2 mb-3 sm:mb-4">
                      {pkg.duration && (
                        <li className="flex items-start group/item">
                          <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-500">
                            <svg
                              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <strong className="text-gray-900 text-sm sm:text-base block mb-0.5">Időtartam</strong>
                            <span className="text-gray-700 text-sm sm:text-base">{pkg.duration}</span>
                          </div>
                        </li>
                      )}
                      {pkg.photos && (
                        <li className="flex items-start group/item">
                          <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-500">
                            <svg
                              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <strong className="text-gray-900 text-sm sm:text-base block mb-0.5">Képek száma</strong>
                            <span className="text-gray-700 text-sm sm:text-base">{pkg.photos}</span>
                          </div>
                        </li>
                      )}
                    </ul>
                  ) : null}

                  {/* Spacer to push price to bottom */}
                  <div className="flex-grow"></div>

                  {/* Price Section with Action Icons */}
                  <div className="border-t border-gray-200 pt-2 sm:pt-3 pb-1">
                    <div className="flex items-center justify-between gap-3">
                      {/* Price */}
                      <div className="pb-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Ár</p>
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent leading-tight pb-1" aria-label={`Ár: ${pkg.price}`}>
                          {pkg.price}
                        </p>
                      </div>

                      {/* Action Icons - Right Side */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        {/* View Photo Story Icon */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const packageStoryMap = {
                              1: 'varosliget-story',
                              2: 'varosliget-story',
                              3: 'varosliget-story',
                              4: 'keresztelo-story'
                            };
                            const storyId = packageStoryMap[pkg.id];
                            if (storyId) {
                              navigate('/photo-stories', { state: { scrollToStory: storyId } });
                            }
                          }}
                          className="group/story transition-all duration-300 hover:scale-110"
                          aria-label={`${pkg.title} fotótörténet megtekintése`}
                          title="Fotótörténet megtekintése"
                        >
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300">
                            <svg
                              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </button>

                        {/* Interest Icon */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInterestClick(pkg.title);
                          }}
                          className="group/email transition-all duration-300 hover:scale-110"
                          aria-label={`Érdeklődés a ${pkg.title} csomagról`}
                          title="Érdeklődöm"
                        >
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300">
                            <svg
                              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>
                    {pkg.note && (
                      <p className="text-xs text-gray-600 mt-2 italic">{pkg.note}</p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className={`text-center mt-8 sm:mt-12 md:mt-16 transition-all duration-700 delay-200 md:duration-1000 md:delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block bg-gradient-to-r from-orange-50 to-amber-50 rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-orange-200">
            <p className="text-xs sm:text-sm text-gray-700 italic">
              * Az árak a választott helyszíntől függően változhatnak
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
};

export default Packages;
