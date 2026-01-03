import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { getAssetPath } from '../utils/assets';
import ScrollToTopButton from '../components/ScrollToTopButton';
import TestimonialsCarousel from '../components/TestimonialsCarousel';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  // Structured data for homepage (Professional Service + Local Business)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Pelei Niki Fotográfus",
    "image": "https://peleiniki.com/assets/homepage/hero.jpg",
    "description": "Családi és gyermekfotózás természetes környezetben. Őszinte pillanatok megörökítése Budapesten és környékén.",
    "url": "https://peleiniki.com",
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
    <div className="min-h-screen bg-warmPaper">
      <SEO
        title="Főoldal"
        description="Pelei Niki Fotós - Családi és gyermekfotózás természetes környezetben Budapesten. Játszótéri, otthoni és szabadtéri fotózás. 5+ év tapasztalat, 100+ boldog család."
        keywords="családi fotózás Budapest, gyermekfotózás, kismama fotózás, játszótéri fotózás, otthoni fotózás, természetes fotók, családi fotós Budapest, keresztelő fotózás"
        ogImage="/assets/homepage/hero.jpg"
        ogImageAlt="Pelei Niki Fotós - Természetes családi és gyermekfotózás Budapesten"
        canonicalUrl="/"
        structuredData={structuredData}
      />

      {/* Hero Section - Full-screen image focused */}
      <section className="relative h-[100svh] min-h-[600px]">
        {/* Full-screen hero image */}
        <div className="absolute inset-0">
          <img
            src={getAssetPath('assets/homepage/hero.jpg')}
            alt="Pelei Niki Fotográfus - Családfotózás"
            className="w-full h-full object-cover"
          />
          {/* Warm gradient overlay - lighter for more image visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 to-transparent"></div>
        </div>

        {/* Hero content - bottom aligned for mobile */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="px-5 pb-8 sm:px-8 sm:pb-12 md:px-12 md:pb-16 lg:pb-20">
            <div className={`max-w-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Handwritten tagline */}
              <p className="font-handwritten text-xl sm:text-2xl md:text-3xl text-goldenHour mb-2 sm:mb-3">
                Hétköznapi csodák
              </p>

              {/* Main heading */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-3 sm:mb-4">
                Pelei Niki
                <span className="block text-2xl sm:text-3xl md:text-4xl font-light text-white/90 mt-1">
                  Fotós
                </span>
              </h1>

              {/* Short description 
              <p className="font-body text-base sm:text-lg text-white/85 max-w-lg mb-6 sm:mb-8 leading-relaxed">
                Családi pillanatok megörökítése, ahogy azok igazán történnek.
              </p>*/}

              {/* CTA Buttons - Stack on mobile */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="group flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-terracotta text-white font-body font-semibold text-base rounded-full shadow-lg hover:bg-sunsetOrange hover:shadow-xl transition-all duration-300 active:scale-95"
                >
                  <span>Időpontfoglalás</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                <Link
                  to="/portfolio"
                  className="group flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-white/15 backdrop-blur-sm text-white font-body font-semibold text-base rounded-full border border-white/40 hover:bg-white/25 transition-all duration-300 active:scale-95"
                >
                  <span>Portfólió</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator - hidden on mobile, visible on tablet and up */}
          <div className={`hidden sm:block absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-60' : 'opacity-0'}`}>
            <div className="flex flex-col items-center gap-1 text-white/70 animate-bounce">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview - Image-focused grid */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="font-handwritten text-2xl sm:text-3xl text-terracotta mb-2">
            Fedezd fel
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal">
            Munkáim
          </h2>
        </div>

        {/* Image-focused grid - 2x2 on mobile, responsive */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {previewSections.map((section, index) => (
            <Link
              key={section.id}
              to={section.link}
              className={`group relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <img
                src={getAssetPath(section.image)}
                alt={section.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent"></div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-6">
                <h3 className="font-handwritten text-xl sm:text-2xl md:text-3xl text-white mb-0.5 sm:mb-1">
                  {section.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-white/80 line-clamp-2 mb-2 sm:mb-3 hidden sm:block">
                  {section.description}
                </p>

                {/* Arrow indicator */}
                <div className="flex items-center gap-1.5 text-goldenHour">
                  <span className="font-body text-xs sm:text-sm font-semibold uppercase tracking-wide">
                    Megnézem
                  </span>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-cream-100">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-8 sm:mb-12">
            <p className="font-handwritten text-2xl sm:text-3xl text-terracotta mb-2">
              Elégedett családok
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal mb-3">
              Rólam mondták
            </h2>
            <p className="font-body text-warmBrown/70 max-w-xl mx-auto">
              Nézd meg az ügyfeleim őszinte reakcióit a képek láttán.
            </p>
          </div>

          {/* Testimonials Carousel */}
          <TestimonialsCarousel autoRotate={true} interval={6000} />
        </div>
      </section>

      {/* Call to Action - Image background */}
      <section className="relative py-16 sm:py-20 md:py-24">
        {/* Background with warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-peach-100 via-cream-100 to-warmPaper"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-goldenHour/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 sm:w-40 sm:h-40 bg-terracotta/10 rounded-full blur-3xl"></div>

        <div className="relative px-5 sm:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            {/* Handwritten heading */}
            <p className="font-handwritten text-3xl sm:text-4xl md:text-5xl text-terracotta mb-3 sm:mb-4">
              Foglalj időpontot!
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-4 sm:mb-6 leading-snug">
              Örökítsük meg együtt családod különlegxes pillanatait
            </h2>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to="/contact"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-terracotta to-sunsetOrange text-white font-body font-bold text-base rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Kapcsolatfelvétel</span>
              </Link>

              <Link
                to="/packages"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-warmBrown font-body font-bold text-base rounded-full border-2 border-warmBrown/20 shadow-lg hover:border-terracotta hover:text-terracotta transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Csomagok</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mt-10 sm:mt-12 text-warmBrown/60">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-goldenHour" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-body text-xs sm:text-sm">Elégedett családok</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-sunsetOrange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-body text-xs sm:text-sm">Budapest</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-body text-xs sm:text-sm">Rugalmas időpontok</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
