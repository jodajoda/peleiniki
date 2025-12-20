import { useState, useEffect, useRef } from 'react';
import Lightbox from '../components/Lightbox';
import LazyImage from '../components/LazyImage';
import SEO from '../components/SEO';
import ScrollToTopButton from '../components/ScrollToTopButton';
import PhotoStory from '../components/PhotoStory';

const Portfolio = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);

  useEffect(() => {
    setIsVisible(true);

    // Intersection Observer for section animations
    // On mobile: trigger earlier with reduced rootMargin for faster content appearance
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

    return () => observer.disconnect();
  }, []);

  const portfolioGroups = [
    {
      id: 'csalad-otthon-1',
      title: 'Családfotózás otthon',
      description: 'Otthoni környezetben, ahol a család a leginkább önmaga lehet.',
      images: [
        { src: '/assets/portfolio/csaladfotozes-otthon-1/csalad-otthon-1-1.JPG', alt: 'Családfotózás otthon' },
        { src: '/assets/portfolio/csaladfotozes-otthon-1/csalad-otthon-1-2.JPG', alt: 'Családfotózás otthon' },
        { src: '/assets/portfolio/csaladfotozes-otthon-1/csalad-otthon-1-3.JPG', alt: 'Családfotózás otthon' },
        { src: '/assets/portfolio/csaladfotozes-otthon-1/csalad-otthon-1-4.JPG', alt: 'Családfotózás otthon' },
        { src: '/assets/portfolio/csaladfotozes-otthon-1/csalad-otthon-1-5.JPG', alt: 'Családfotózás otthon' },
        { src: '/assets/portfolio/csaladfotozes-otthon-1/csalad-otthon-1-6.JPG', alt: 'Családfotózás otthon' },
      ],
    },
    {
      id: 'kutyas-fotozas',
      title: 'Kutyás fotózás a balatonnál',
      description: 'Egy különleges kapcsolat,  egy csodás helyen.',
      images: [
        { src: '/assets/portfolio/kutyas-fotozas/kutya-1.jpg', alt: 'Kutyás fotózás' },
        { src: '/assets/portfolio/kutyas-fotozas/kutya-2.jpg', alt: 'Kutyás fotózás' },
        { src: '/assets/portfolio/kutyas-fotozas/kutya-3.jpg', alt: 'Kutyás fotózás' },
        { src: '/assets/portfolio/kutyas-fotozas/kutya-4.jpg', alt: 'Kutyás fotózás' },
        { src: '/assets/portfolio/kutyas-fotozas/kutya-5.jpg', alt: 'Kutyás fotózás' },
        { src: '/assets/portfolio/kutyas-fotozas/kutya-6.jpg', alt: 'Kutyás fotózás' },
      ],
    },
    {
      id: 'jatszoteri-moka',
      title: 'Játszótéri móka',
      description: 'Anyukák és gyermekeik kedvenc helye.',
      images: [
        { src: '/assets/portfolio/jatszoteri-moka/jatszoteri-moka-1.jpg', alt: 'Játszótéri fotózás' },
        { src: '/assets/portfolio/jatszoteri-moka/jatszoteri-moka-2.jpg', alt: 'Játszótéri fotózás' },
        { src: '/assets/portfolio/jatszoteri-moka/jatszoteri-moka-3.jpg', alt: 'Játszótéri fotózás' },
        { src: '/assets/portfolio/jatszoteri-moka/jatszoteri-moka-5.jpg', alt: 'Játszótéri fotózás' },
        { src: '/assets/portfolio/jatszoteri-moka/jatszoteri-moka-6.jpg', alt: 'Játszótéri fotózás' },
      ],
    },
    {
      id: 'keresztelo',
      title: 'Keresztelő',
      description: 'Egy különleges családi esemény megörökítése.',
      images: [
        { src: '/assets/portfolio/keresztelo/keresztelo-1.JPG', alt: 'Keresztelő fotózás' },
        { src: '/assets/portfolio/keresztelo/keresztelo-2.JPG', alt: 'Keresztelő fotózás' },
        { src: '/assets/portfolio/keresztelo/keresztelo-3.JPG', alt: 'Keresztelő fotózás' },
        { src: '/assets/portfolio/keresztelo/keresztelo-4.JPG', alt: 'Keresztelő fotózás' },
        { src: '/assets/portfolio/keresztelo/keresztelo-5.JPG', alt: 'Keresztelő fotózás' },
        { src: '/assets/portfolio/keresztelo/keresztelo-6.JPG', alt: 'Keresztelő fotózás' },
      ],
    },
    {
      id: 'margitsziget',
      title: 'Családfotózás Margitszigeten',
      description: 'Egy kellemes délután a Margitszigeten, ahol a család játékosan töltötte az időt.',
      images: [
        { src: '/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-1.jpg', alt: 'Családfotózás Margitszigeten' },
        { src: '/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-2.jpg', alt: 'Családfotózás Margitszigeten' },
        { src: '/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-3.jpg', alt: 'Családfotózás Margitszigeten' },
        { src: '/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-4.jpg', alt: 'Családfotózás Margitszigeten' },
        { src: '/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-5.jpg', alt: 'Családfotózás Margitszigeten' },
        { src: '/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-6.jpg', alt: 'Családfotózás Margitszigeten' },
      ],
    },
    {
      id: 'kismama-otthon',
      title: 'Kismamafotózás otthon',
      description: 'Intim pillanatok otthon, a babavárás izgalmával.',
      images: [
        { src: '/assets/portfolio/kismamafotozas-otthon/kismama-otthon-1.JPG', alt: 'Kismamafotózás' }, // Column 1, Row 1
        { src: '/assets/portfolio/kismamafotozas-otthon/kismama-otthon-2.JPG', alt: 'Kismamafotózás' }, // Column 1, Row 2
        { src: '/assets/portfolio/kismamafotozas-otthon/kismama-otthon-5.JPG', alt: 'Kismamafotózás' }, // Column 2 (standing)
        { src: '/assets/portfolio/kismamafotozas-otthon/kismama-otthon-4.JPG', alt: 'Kismamafotózás' }, // Column 3, Row 1
        { src: '/assets/portfolio/kismamafotozas-otthon/kismama-otthon-3.JPG', alt: 'Kismamafotózás' }, // Column 3, Row 2
      ],
    },
    {
      id: 'varosliget',
      title: 'Családfotózás a Városligetben',
      description: 'Természetes környezetben, a Városliget zöld oázisában.',
      images: [
        { src: '/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-1.jpg', alt: 'Családfotózás Városligetben' },
        { src: '/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-2.jpg', alt: 'Családfotózás Városligetben' },
        { src: '/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-3.jpg', alt: 'Családfotózás Városligetben' },
        { src: '/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-4.jpg', alt: 'Családfotózás Városligetben' },
        { src: '/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-5.jpg', alt: 'Családfotózás Városligetben' },
        { src: '/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-6.jpg', alt: 'Családfotózás Városligetben' },
      ],
    },
    {
      id: 'csalad-otthon',
      title: 'Családfotózás otthon',
      description: 'Otthoni környezetben, ahol a család a leginkább önmaga lehet.',
      images: [
        { src: '/assets/portfolio/csaladfotozes-otthon/csalad-otthon-1.JPG', alt: 'Családfotózás otthon' },
        { src: '/assets/portfolio/csaladfotozes-otthon/csalad-otthon-2.JPG', alt: 'Családfotózás otthon' },
        { src: '/assets/portfolio/csaladfotozes-otthon/csalad-otthon-3.JPG', alt: 'Családfotózás otthon' },
        { src: '/assets/portfolio/csaladfotozes-otthon/csalad-otthon-4.JPG', alt: 'Családfotózás otthon' },
        { src: '/assets/portfolio/csaladfotozes-otthon/csalad-otthon-5.JPG', alt: 'Családfotózás otthon' },
        { src: '/assets/portfolio/csaladfotozes-otthon/csalad-otthon-6.JPG', alt: 'Családfotózás otthon' },
      ],
    },
    {
      id: 'szulinap',
      title: 'Szülinapi fotózás',
      description: 'Egy különleges nap, tele örömmel és nevetéssel.',
      images: [
        { src: '/assets/portfolio/szulinap/szulinap-1.JPG', alt: 'Szülinapi fotózás' },
        { src: '/assets/portfolio/szulinap/szulinap-2.JPG', alt: 'Szülinapi fotózás' },
        { src: '/assets/portfolio/szulinap/szulinap-3.JPG', alt: 'Szülinapi fotózás' },
        { src: '/assets/portfolio/szulinap/szulinap-4.JPG', alt: 'Szülinapi fotózás' },
        { src: '/assets/portfolio/szulinap/szulinap-5.JPG', alt: 'Szülinapi fotózás' },
        { src: '/assets/portfolio/szulinap/szulinap-6.jpg', alt: 'Szülinapi fotózás' },
      ],
    },
  ];

  const openLightbox = (groupIndex, imageIndex) => {
    setCurrentGroup(groupIndex);
    setLightboxIndex(imageIndex);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setCurrentGroup(null);
  };

  const nextImage = () => {
    if (currentGroup !== null) {
      const totalImages = portfolioGroups[currentGroup].images.length;
      setLightboxIndex((prev) => (prev + 1) % totalImages);
    }
  };

  const prevImage = () => {
    if (currentGroup !== null) {
      const totalImages = portfolioGroups[currentGroup].images.length;
      setLightboxIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16">
      <SEO
        title="Portfólió"
        description="Tekintse meg korábbi munkáimat - családfotózás, gyermekfotózás, kismama fotózás, keresztelő, szülinap és különleges családi pillanatok."
        keywords="portfólió, családi fotók, gyermekfotók, kismama fotók, keresztelő fotók, szülinapi fotók, fotó galéria"
        ogImage="/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-1.jpg"
        ogImageAlt="Portfólió - Családfotózás Margitszigeten"
        canonicalUrl="/portfolio"
      />
      {/* Enhanced Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 md:mb-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className={`inline-block mb-2 transition-all duration-700 md:duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-primary-600 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-semibold">Munkáim</span>
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 text-gray-900 transition-all duration-700 delay-75 md:duration-1000 md:delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Portfólió
          </h1>
          <div className={`w-16 sm:w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto rounded-full mb-2 sm:mb-3 transition-all duration-700 delay-100 md:duration-1000 md:delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
          <p className={`text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed transition-all duration-700 delay-150 md:duration-1000 md:delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Fedezd fel korábbi munkáimat - családi pillanatok, keresztelők, szülinapok és különleges emlékek
          </p>
        </div>
      </div>

      <div className="space-y-6 sm:space-y-8 md:space-y-10">
        {portfolioGroups.map((group, groupIndex) => {
          const isSectionVisible = visibleSections.has(groupIndex);
          return (
          <section
            key={group.id}
            ref={(el) => (sectionRefs.current[groupIndex] = el)}
            data-section-index={groupIndex}
            className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden py-6 sm:py-8 md:py-10"
          >
            {/* Enhanced floating blur elements */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-orange-200 to-amber-300 rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-amber-200 to-orange-300 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-orange-100 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Decorative pattern overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id={`dots-${group.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="2" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#dots-${group.id})`} />
              </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-4 sm:mb-5 md:mb-6 relative z-10 text-center md:text-left max-w-4xl mx-auto">
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 transition-all duration-700 md:duration-1000 ${isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  {group.title}
                </h2>
                <div className={`w-12 sm:w-14 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mb-2 mx-auto md:mx-0 transition-all duration-700 delay-75 md:duration-1000 md:delay-200 ${isSectionVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
                <p className={`text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed transition-all duration-700 delay-100 md:duration-1000 md:delay-300 ${isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>{group.description}</p>
              </div>

              {group.id === 'jatszoteri-moka' ? (
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 relative z-10">
                  {/* First column: 4 landscape images in 2x2 grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {group.images.slice(0, 4).map((image, imageIndex) => (
                      <button
                        key={imageIndex}
                        type="button"
                        className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-orange-400"
                        style={{ animationDelay: `${imageIndex * 0.05}s` }}
                        onClick={() => openLightbox(groupIndex, imageIndex)}
                        aria-label={`${image.alt} megnyitása nagyobb méretben`}
                      >
                        <LazyImage
                          src={image.src}
                          alt={image.alt}
                          className="h-72 object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <svg
                              className="w-14 h-14 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100"
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
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Second column: 1 tall standing image */}
                  {group.images.slice(4).map((image, imageIndex) => (
                    <button
                      key={imageIndex + 4}
                      type="button"
                      className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-orange-400 h-[calc(36rem+1rem)]"
                      style={{ animationDelay: `${(imageIndex + 4) * 0.05}s` }}
                      onClick={() => openLightbox(groupIndex, imageIndex + 4)}
                      aria-label={`${image.alt} megnyitása nagyobb méretben`}
                    >
                      <LazyImage
                        src={image.src}
                        alt={image.alt}
                        className="h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <svg
                            className="w-14 h-14 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100"
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
                      </div>
                    </button>
                  ))}
                </div>
              ) : group.id === 'csalad-otthon' ? (
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 relative z-10">
                  {/* First column: 1 tall standing image (csalad-otthon-1.JPG) */}
                  <button
                    type="button"
                    className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-orange-400 h-[calc(36rem+1rem)]"
                    style={{ animationDelay: '0s' }}
                    onClick={() => openLightbox(groupIndex, 0)}
                    aria-label={`${group.images[0].alt} megnyitása nagyobb méretben`}
                  >
                    <LazyImage
                      src={group.images[0].src}
                      alt={group.images[0].alt}
                      className="h-full hover-zoom image-soft-glow"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
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
                  </button>

                  {/* Second column: 2 rows with 2-2 images */}
                  <div className="grid grid-cols-1 gap-4">
                    {/* First row: 2 images (csalad-otthon-2, csalad-otthon-3) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[1, 2].map((index) => {
                        const image = group.images[index];
                        return (
                          <button
                            key={index}
                            type="button"
                            className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-orange-400"
                            style={{ animationDelay: `${index * 0.05}s` }}
                            onClick={() => openLightbox(groupIndex, index)}
                            aria-label={`${image.alt} megnyitása nagyobb méretben`}
                          >
                            <LazyImage
                              src={image.src}
                              alt={image.alt}
                              className="h-72 object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                              <svg
                                className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
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
                          </button>
                        );
                      })}
                    </div>

                    {/* Second row: 2 images (csalad-otthon-4, csalad-otthon-5) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[3, 4].map((index) => {
                        const image = group.images[index];
                        return (
                          <button
                            key={index}
                            type="button"
                            className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-orange-400"
                            style={{ animationDelay: `${index * 0.05}s` }}
                            onClick={() => openLightbox(groupIndex, index)}
                            aria-label={`${image.alt} megnyitása nagyobb méretben`}
                          >
                            <LazyImage
                              src={image.src}
                              alt={image.alt}
                              className="h-72 object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                              <svg
                                className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
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
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : group.id === 'kismama-otthon' ? (
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-4 relative z-10">
                  {/* First column: 2 landscape images (kismama-otthon-1, kismama-otthon-4) */}
                  <div className="grid grid-cols-1 gap-4">
                    {[0, 1].map((index) => {
                      const image = group.images[index];
                      return (
                        <button
                          key={index}
                          type="button"
                          className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-orange-400"
                          style={{ animationDelay: `${index * 0.05}s` }}
                          onClick={() => openLightbox(groupIndex, index)}
                          aria-label={`${image.alt} megnyitása nagyobb méretben`}
                        >
                          <LazyImage
                            src={image.src}
                            alt={image.alt}
                            className="h-72 object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
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
                        </button>
                      );
                    })}
                  </div>

                  {/* Second column: 1 tall standing image (kismama-otthon-5) */}
                  <button
                    type="button"
                    className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-orange-400 h-[calc(36rem+1rem)]"
                    style={{ animationDelay: '0.1s' }}
                    onClick={() => openLightbox(groupIndex, 2)}
                    aria-label={`${group.images[2].alt} megnyitása nagyobb méretben`}
                  >
                    <LazyImage
                      src={group.images[2].src}
                      alt={group.images[2].alt}
                      className="h-full hover-zoom image-soft-glow"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
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
                  </button>

                  {/* Third column: 2 images (kismama-otthon-3, kismama-otthon-2) */}
                  <div className="grid grid-cols-1 gap-4">
                    {[3, 4].map((index) => {
                      const image = group.images[index];
                      return (
                        <button
                          key={index}
                          type="button"
                          className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-orange-400"
                          style={{ animationDelay: `${(index + 1) * 0.05}s` }}
                          onClick={() => openLightbox(groupIndex, index)}
                          aria-label={`${image.alt} megnyitása nagyobb méretben`}
                        >
                          <LazyImage
                            src={image.src}
                            alt={image.alt}
                            className="h-72 object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
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
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                  {group.images.map((image, imageIndex) => (
                    <button
                      key={imageIndex}
                      type="button"
                      className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-orange-400"
                      style={{ animationDelay: `${imageIndex * 0.05}s` }}
                      onClick={() => openLightbox(groupIndex, imageIndex)}
                      aria-label={`${image.alt} megnyitása nagyobb méretben`}
                    >
                      <LazyImage
                        src={image.src}
                        alt={image.alt}
                        className="h-72 hover-zoom image-soft-glow"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <svg
                            className="w-14 h-14 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100"
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
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && currentGroup !== null && (
        <Lightbox
          images={portfolioGroups[currentGroup].images}
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

export default Portfolio;
