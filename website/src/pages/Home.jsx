import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { getAssetPath } from '../utils/assets';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Clamp scroll value to prevent negative parallax when scrolling back to top
          const clampedScroll = Math.max(0, window.scrollY);
          setScrollY(clampedScroll);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Structured data for homepage (Professional Service + Local Business)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Pelei Niki Fotográfus",
    "image": "https://peleiniki.com/assets/homepage/hero.jpg",
    "description": "Családi és gyermekfotózás természetes környezetben. Őszinte pillanatok megörökítése Budapesten és környékén.",
    "url": "https://peleiniki.com",
    "telephone": "+36-XX-XXX-XXXX",
    "email": "peleinikifotoi@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Budapest",
      "addressCountry": "HU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.4979,
      "longitude": 19.0402
    },
    "priceRange": "$$",
    "areaServed": {
      "@type": "City",
      "name": "Budapest"
    },
    "serviceType": [
      "Családi fotózás",
      "Gyermekfotózás",
      "Kismama fotózás",
      "Keresztelő fotózás",
      "Szülinapi fotózás"
    ],
    "sameAs": [
      "https://www.facebook.com/peleinikifotoi",
      "https://www.instagram.com/peleinikifotoi"
    ]
  };

  // Preview sections with images and links
  const previewSections = [
    {
      id: 1,
      title: 'A fotózás velem',
      description: 'Fedezd fel, hogyan zajlik egy fotózás. Lazán, természetesen, sok nevetéssel.',
      image: '/assets/homepage/fotozas-velem.jpg',
      link: '/photoshooting',
    },
    {
      id: 2,
      title: 'Portfólió',
      description: 'Nézd meg korábbi munkáimat. Családok, keresztelők, szülinapok és sok-sok szeretet.',
      image: '/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-1.jpg',
      link: '/portfolio',
    },
    {
      id: 3,
      title: 'Rólam',
      description: 'Kicsoda Pelei Niki? Ismerd meg jobban a fotóst és a történetet.',
      image: '/assets/homepage/rolam.jpg',
      link: '/about',
    },
    {
      id: 4,
      title: 'Csomagok',
      description: 'Válassz a különböző fotózási csomagok közül, ami a legjobban illik hozzátok.',
      image: '/assets/homepage/csomagok.jpg',
      link: '/packages',
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Főoldal"
        description="Pelei Niki Fotográfus - Családi és gyermekfotózás természetes környezetben. Őszinte pillanatok megörökítése Budapesten és környékén."
        keywords="családi fotózás, gyermekfotózás, kismama fotózás, fotográfus Budapest, természetes fotók, családi fotós"
        ogImage="/assets/homepage/hero.jpg"
        ogImageAlt="Pelei Niki Fotográfus - Családfotózás"
        canonicalUrl="/"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-[90vh] overflow-hidden">
        {/* Hero Image with Parallax */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate3d(0, ${Math.min(scrollY * 0.3, 200)}px, 0)`,
            willChange: 'transform'
          }}
        >
          <img
            src={getAssetPath('assets/homepage/hero.jpg')}
            alt="Pelei Niki Fotográfus - Családfotózás"
            className="w-full h-[115%] object-cover image-warm-filter"
          />
          {/* Enhanced Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70"></div>
          <div className="absolute inset-0 gradient-overlay-sunset opacity-40"></div>

          {/* Decorative light rays */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-warm/10 via-transparent to-transparent opacity-60"></div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent-warm/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-20 w-40 h-40 bg-accent-rose/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-accent-gold/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            {/* Decorative line above title */}
            <div className={`flex items-center justify-center mb-4 sm:mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-white/50"></div>
              <div className="mx-2 sm:mx-4 text-white/80 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-light">Természetes fényképészet</div>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-white/50"></div>
            </div>

            <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="inline-block bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent">
                Pelei Niki
              </span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light tracking-wide text-white/95">
                Fotográfus
              </span>
            </h1>

            <p className={`text-lg sm:text-xl md:text-3xl text-white/95 max-w-4xl mx-auto mb-3 sm:mb-4 drop-shadow-lg font-light leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Családi pillanatok megörökítése
            </p>
            <p className={`text-sm sm:text-base md:text-xl text-white/85 max-w-3xl mx-auto drop-shadow-md font-light transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              természetes, spontán környezetben
            </p>

            <div className={`mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 bg-white text-gray-900 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg hover:bg-white transition-all duration-500 shadow-2xl hover:shadow-glow-warm hover:scale-105 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent-warm/20 to-accent-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative">Kapcsolatfelvétel</span>
                <svg className="relative w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/50 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg hover:bg-white/20 hover:border-white transition-all duration-300 shadow-lg hover:scale-105"
              >
                <span>Portfólió</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Scroll indicator */}
            <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex flex-col items-center gap-2 text-white/70 animate-bounce">
                <span className="text-xs tracking-wider uppercase">Görgess</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Sections */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="text-primary-600 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-semibold">Ismerd meg munkáimat</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4">
            Fedezd fel
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-accent-warm to-accent-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {previewSections.map((section, index) => (
            <Link
              key={section.id}
              to={section.link}
              className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="relative h-80 sm:h-96 md:h-[28rem] overflow-hidden">
                <img
                  src={getAssetPath(section.image)}
                  alt={section.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 via-primary-600/0 to-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 text-white">
                {/* Category badge */}
                <div className="inline-block mb-2 sm:mb-3 px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  {section.id === 1 ? 'Élmény' : section.id === 2 ? 'Galéria' : section.id === 3 ? 'Történet' : 'Árak'}
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 transform group-hover:translate-y-[-6px] transition-transform duration-500">
                  {section.title}
                </h3>

                <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {section.description}
                </p>

                {/* Enhanced Arrow with background */}
                <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/30 group-hover:bg-white group-hover:text-gray-900 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-xs sm:text-sm font-semibold tracking-wide">Megnézem</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Number indicator */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-bold text-lg sm:text-xl opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-500">
                {section.id}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-accent-warm to-accent-gold rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-accent-rose to-accent-sunset rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-300 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Icon or decorative element */}
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-orange-300 to-amber-400 mb-6 sm:mb-8 shadow-lg animate-bounce-in">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Foglalj időpontot!
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-3 sm:mb-4 max-w-3xl mx-auto leading-relaxed">
            Örökítsük meg együtt családod különleges pillanatait
          </p>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Természetes, spontán fotózás Budapest legszebb helyszínein
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-10 sm:mb-12">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-orange-400 to-amber-400 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <svg className="relative w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="relative">Kapcsolatfelvétel</span>
            </Link>

            <Link
              to="/packages"
              className="group inline-flex items-center gap-2 sm:gap-3 bg-white text-gray-900 border-2 border-gray-300 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:border-orange-300 hover:text-orange-500 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>Csomagok megtekintése</span>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base font-medium">Elégedett családok</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base font-medium">Budapest és környéke</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base font-medium">Rugalmas időpontok</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
