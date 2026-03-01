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

  // Structured data for Portfolio page - ImageGallery schema
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Pelei Niki Fotós Portfólió",
    "description": "Családi és gyermekfotózás portfólió - családfotózás, kismama fotózás, keresztelő, szülinapi és játszótéri fotózás Budapesten.",
    "url": "https://peleiniki.com/portfolio",
    "author": {
      "@type": "Person",
      "name": "Pelei Niki",
      "jobTitle": "Családi és Gyermekfotós",
      "url": "https://peleiniki.com"
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Családfotózás"
      },
      {
        "@type": "Thing",
        "name": "Gyermekfotózás"
      },
      {
        "@type": "Thing",
        "name": "Kismamafotózás"
      },
      {
        "@type": "Thing",
        "name": "Keresztelő fotózás"
      }
    ],
    "locationCreated": {
      "@type": "Place",
      "name": "Budapest és környéke"
    }
  };

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
      id: 'anyak-napi-mini',
      title: 'Anyák napi mini',
      description: 'Tavaszi mini fotózás a Városligetben.',
      images: [
        { src: '/assets/portfolio/anyak-napi-mini/anyak-napi-mini--3.JPG', alt: 'Anyák napi mini fotózás Városligetben - anya emeli gyermekét a virágzó fa ágai felé' },
        { src: '/assets/portfolio/anyak-napi-mini/anyak-napi-mini--4.JPG', alt: 'Gyermekfotózás Városligetben - göndör hajú kisfiú pipaccsal' },
        { src: '/assets/portfolio/anyak-napi-mini/anyak-napi-mini--12.JPG', alt: 'Anyák napi mini fotózás - anya két gyermekével sétál a parkban' },
        { src: '/assets/portfolio/anyak-napi-mini/anyak-napi-mini--8.JPG', alt: 'Anyák napi mini fotózás - anya két gyermekével és kutyájával a Városligetben' },
        { src: '/assets/portfolio/anyak-napi-mini/anyak-napi-mini--14.JPG', alt: 'Anyák napi mini fotózás Városligetben - anya a karján tartja kislányát, kisfia fut előre' },
      ],
    },
    {
      id: 'csalad-otthon-1',
      title: 'Családfotózás otthon',
      description: 'Otthoni környezetben, ahol a család a leginkább önmaga lehet.',
      images: [
        { src: '/assets/portfolio/csaladfotozes-otthon-1/csalad-otthon-1-1.JPG', alt: 'Otthoni családfotózás - szülők és gyermek közös pillanata' },
        { src: '/assets/portfolio/csaladfotozes-otthon-1/csalad-otthon-1-4.JPG', alt: 'Családi ölelés otthoni környezetben Budapesten' },
        { src: '/assets/portfolio/csaladfotozes-otthon-1/csalad-otthon-1-3.JPG', alt: 'Természetes családi pillanat otthon - játék és nevetés' },
        { src: '/assets/portfolio/csaladfotozes-otthon-1/csalad-otthon-1-7.JPG', alt: 'Meghitt családi fotó az otthon melegében' },
        { src: '/assets/portfolio/csaladfotozes-otthon-1/csalad-otthon-1-5.JPG', alt: 'Gyermekfotózás otthon - őszinte mosoly' },
      ],
    },
    {
      id: 'kutyas-fotozas',
      title: 'Kutyás fotózás a Balatonnál',
      description: 'Egy különleges kapcsolat,  egy csodás helyen.',
      images: [
        { src: '/assets/portfolio/kutyas-fotozas/kutya-1.jpg', alt: 'Kutyás családi fotózás a Balatonnál - gazdi és kedvenc' },
        { src: '/assets/portfolio/kutyas-fotozas/kutya-3.jpg', alt: 'Játékos pillanat kutyával a tóparton' },
        { src: '/assets/portfolio/kutyas-fotozas/kutya-4.jpg', alt: 'Kutya és gazdi szeretet a Balaton mellett' },
        { src: '/assets/portfolio/kutyas-fotozas/kutya-7.JPG', alt: 'Portré kutyával a balatoni naplementében' },
        { src: '/assets/portfolio/kutyas-fotozas/kutya-6.jpg', alt: 'Boldog pillanatok kutyával a szabadban' },
      ],
    },
    {
      id: 'jatszoteri-moka',
      title: 'Játszótéri móka',
      description: 'Anyukák és gyermekeik kedvenc helye.',
      images: [
        { src: '/assets/portfolio/jatszoteri-moka/jatszoteri-moka-1.jpg', alt: 'Játszótéri fotózás Budapest - anyuka és gyermeke hintázik' },
        { src: '/assets/portfolio/jatszoteri-moka/jatszoteri-moka-2.jpg', alt: 'Gyermekfotózás játszótéren - nevetés és öröm' },
        { src: '/assets/portfolio/jatszoteri-moka/jatszoteri-moka-3.jpg', alt: 'Anya és gyermek közös játéka a játszótéren' },
        { src: '/assets/portfolio/jatszoteri-moka/jatszoteri-moka-5.jpg', alt: 'Természetes családi pillanat budapesti játszótéren' },
        { src: '/assets/portfolio/jatszoteri-moka/jatszoteri-moka-6.jpg', alt: 'Játékos gyermekfotó szabadtéri környezetben' },
      ],
    },
    {
      id: 'keresztelo',
      title: 'Keresztelő',
      description: 'Egy különleges családi esemény megörökítése.',
      images: [
        { src: '/assets/portfolio/keresztelo/keresztelo-1.JPG', alt: 'Keresztelő fotózás Budapest - felkészülés az ünnepre' },
        { src: '/assets/portfolio/keresztelo/keresztelo-2.JPG', alt: 'Családi pillanat a keresztelő előtt' },
        { src: '/assets/portfolio/keresztelo/keresztelo-3.JPG', alt: 'Keresztelő ceremónia megörökítése templomban' },
        { src: '/assets/portfolio/keresztelo/keresztelo-4.JPG', alt: 'Család együtt a keresztelő szertartáson' },
        { src: '/assets/portfolio/keresztelo/keresztelo-5.JPG', alt: 'Keresztelő ünneplés - családi öröm' },
        { src: '/assets/portfolio/keresztelo/keresztelo-6.JPG', alt: 'Boldog pillanatok a keresztelő után' },
      ],
    },
    {
      id: 'margitsziget',
      title: 'Családfotózás Margitszigeten',
      description: 'Egy kellemes délután a Margitszigeten, ahol a család játékosan töltötte az időt.',
      images: [
        { src: '/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-1.jpg', alt: 'Családfotózás a Margitszigeten - séta a parkban' },
        { src: '/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-2.jpg', alt: 'Természetes családi pillanat a Margitsziget zöldjében' },
        { src: '/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-3.jpg', alt: 'Gyermekfotózás a Margitszigeten - játék a fűben' },
        { src: '/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-4.jpg', alt: 'Család együtt a Margitsziget fái alatt' },
        { src: '/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-5.jpg', alt: 'Szülők és gyermek közös nevetése a Margitszigeten' },
        { src: '/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-6.jpg', alt: 'Meghitt családi portré a Margitsziget parkjában' },
      ],
    },
    {
      id: 'kismama-otthon',
      title: 'Kismamafotózás otthon',
      description: 'Intim pillanatok otthon, a babavárás izgalmával.',
      images: [
        { src: '/assets/portfolio/kismamafotozas-otthon/kismama-otthon-1.JPG', alt: 'Kismamafotózás otthon Budapest - várandós portré' },
        { src: '/assets/portfolio/kismamafotozas-otthon/kismama-otthon-2.JPG', alt: 'Babavárás öröme - kismama fotó otthoni környezetben' },
        { src: '/assets/portfolio/kismamafotozas-otthon/kismama-otthon-5.JPG', alt: 'Elegáns kismama portré természetes fényben' },
        { src: '/assets/portfolio/kismamafotozas-otthon/kismama-otthon-4.JPG', alt: 'Várandós anya meghitt pillanata otthon' },
        { src: '/assets/portfolio/kismamafotozas-otthon/kismama-otthon-3.JPG', alt: 'Kismamafotózás Budapest - intim családi fotó' },
      ],
    },
    {
      id: 'varosliget',
      title: 'Családfotózás a Városligetben',
      description: 'Természet, játék és egy kis együtt töltött idő a Városligetben.',
      images: [
        { src: '/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-1.jpg', alt: 'Családfotózás a Városligetben Budapest - séta a parkban' },
        { src: '/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-2.jpg', alt: 'Természetes családi pillanat a Városliget fái között' },
        { src: '/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-3.jpg', alt: 'Gyermekfotózás a Városligetben - játék és nevetés' },
        { src: '/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-4.jpg', alt: 'Család együtt a Városliget zöldjében' },
        { src: '/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-5.jpg', alt: 'Szülők és gyermekek pihenése a Városligetben' },
        { src: '/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-6.jpg', alt: 'Családi portré a budapesti Városliget parkjában' },
      ],
    },
    {
      id: 'szulinap',
      title: 'Szülinapi fotózás',
      description: 'Egy különleges nap, tele örömmel és nevetéssel.',
      images: [
        { src: '/assets/portfolio/szulinap/szulinap-1.JPG', alt: 'Szülinapi fotózás Budapest - az ünnepelt mosolya' },
        { src: '/assets/portfolio/szulinap/szulinap-2.JPG', alt: 'Gyermek születésnapi fotózás - torta és öröm' },
        { src: '/assets/portfolio/szulinap/szulinap-3.JPG', alt: 'Születésnapi ünneplés megörökítése családdal' },
        { src: '/assets/portfolio/szulinap/szulinap-4.JPG', alt: 'Boldog szülinapi pillanat - gyertyafújás' },
        { src: '/assets/portfolio/szulinap/szulinap-5.JPG', alt: 'Szülinapi buli fotózás - nevetés és játék' },
        { src: '/assets/portfolio/szulinap/szulinap-6.jpg', alt: 'Családi öröm a születésnapon' },
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
        description="Családi és gyermekfotózás portfólió Budapesten - családfotózás otthon, játszótéren és parkokban, kismama fotózás, keresztelő és szülinapi fotózás. Nézd meg korábbi munkáimat!"
        keywords="portfólió, családi fotók Budapest, gyermekfotók, kismama fotók, keresztelő fotók, szülinapi fotók, fotó galéria, Margitsziget fotózás, Városliget fotózás"
        ogImage="/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-1.jpg"
        ogImageAlt="Portfólió - Családfotózás a Margitszigeten"
        canonicalUrl="/portfolio"
        structuredData={structuredData}
      />
      {/* Enhanced Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 md:mb-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className={`inline-block mb-2 transition-all duration-700 md:duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="font-handwritten text-terracotta text-xl sm:text-2xl md:text-3xl">Munkáim</span>
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-2 sm:mb-3 text-charcoal transition-all duration-700 delay-75 md:duration-1000 md:delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Portfólió
          </h1>
          <div className={`w-16 sm:w-20 h-1 bg-gradient-to-r from-terracotta to-sunsetOrange mx-auto rounded-full mb-2 sm:mb-3 transition-all duration-700 delay-100 md:duration-1000 md:delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
          <p className={`text-base sm:text-lg md:text-xl font-body text-warmBrown leading-relaxed transition-all duration-700 delay-150 md:duration-1000 md:delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
              className="relative bg-gradient-to-br from-peach-100 via-warmPaper to-cream-100 overflow-hidden py-6 sm:py-8 md:py-10"
            >
              {/* Enhanced floating blur elements */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-terracotta/30 to-goldenHour/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-terracotta/30 to-goldenHour/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-peach-100/50 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
              </div>

              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-4 sm:mb-5 md:mb-6 relative z-10 text-center md:text-left max-w-4xl mx-auto">
                  <h2 className={`text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-charcoal mb-2 transition-all duration-700 md:duration-1000 ${isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {group.title}
                  </h2>
                  <div className={`w-12 sm:w-14 h-1 bg-gradient-to-r from-terracotta to-sunsetOrange rounded-full mb-2 mx-auto md:mx-0 transition-all duration-700 delay-75 md:duration-1000 md:delay-200 ${isSectionVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
                  <p className={`text-sm sm:text-base md:text-lg font-body text-warmBrown leading-relaxed transition-all duration-700 delay-100 md:duration-1000 md:delay-300 ${isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>{group.description}</p>
                </div>

                {group.id === 'anyak-napi-mini' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-4 relative z-10">
                    {/* Left column: 2 landscape images (--3, --4) */}
                    <div className="grid grid-cols-1 gap-4">
                      {[0, 1].map((index) => {
                        const image = group.images[index];
                        return (
                          <button
                            key={index}
                            type="button"
                            className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-terracotta"
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
                              <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Middle column: --12 displayed as portrait (cropped center) */}
                    <button
                      type="button"
                      className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-terracotta h-[calc(36rem+1rem)]"
                      style={{ animationDelay: '0.1s' }}
                      onClick={() => openLightbox(groupIndex, 2)}
                      aria-label={`${group.images[2].alt} megnyitása nagyobb méretben`}
                    >
                      <LazyImage
                        src={group.images[2].src}
                        alt={group.images[2].alt}
                        className="h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </button>

                    {/* Right column: 2 landscape images (--8, --14) */}
                    <div className="grid grid-cols-1 gap-4">
                      {[3, 4].map((index) => {
                        const image = group.images[index];
                        return (
                          <button
                            key={index}
                            type="button"
                            className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-terracotta"
                            style={{ animationDelay: `${(index - 2) * 0.05 + 0.15}s` }}
                            onClick={() => openLightbox(groupIndex, index)}
                            aria-label={`${image.alt} megnyitása nagyobb méretben`}
                          >
                            <LazyImage
                              src={image.src}
                              alt={image.alt}
                              className="h-72 object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                              <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : group.id === 'kutyas-fotozas' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-4 relative z-10">
                    {/* First column: 2 landscape images (kutya-1, kutya-3) */}
                    <div className="grid grid-cols-1 gap-4">
                      {[0, 1].map((index) => {
                        const image = group.images[index];
                        return (
                          <button
                            key={index}
                            type="button"
                            className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-terracotta"
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

                    {/* Second column: 1 tall standing image (kutya-7) */}
                    <button
                      type="button"
                      className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-terracotta h-[calc(36rem+1rem)]"
                      style={{ animationDelay: '0.1s' }}
                      onClick={() => openLightbox(groupIndex, 3)}
                      aria-label={`${group.images[3].alt} megnyitása nagyobb méretben`}
                    >
                      <LazyImage
                        src={group.images[3].src}
                        alt={group.images[3].alt}
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

                    {/* Third column: 2 images (kutya-4, kutya-5) */}
                    <div className="grid grid-cols-1 gap-4">
                      {[2, 4].map((index) => {
                        const image = group.images[index];
                        return (
                          <button
                            key={index}
                            type="button"
                            className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-terracotta"
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
                ) : group.id === 'jatszoteri-moka' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 relative z-10">
                    {/* First column: 4 landscape images in 2x2 grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {group.images.slice(0, 4).map((image, imageIndex) => (
                        <button
                          key={imageIndex}
                          type="button"
                          className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-terracotta"
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
                        className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-terracotta h-[calc(36rem+1rem)]"
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
                      className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-terracotta h-[calc(36rem+1rem)]"
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
                              className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-terracotta"
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
                              className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-terracotta"
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
                ) : group.id === 'csalad-otthon-1' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-4 relative z-10">
                    {/* First column: 2 landscape images (csalad-otthon-1-1, csalad-otthon-1-3) */}
                    <div className="grid grid-cols-1 gap-4">
                      {[0, 1].map((index) => {
                        const image = group.images[index];
                        return (
                          <button
                            key={index}
                            type="button"
                            className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-terracotta"
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

                    {/* Second column: 1 tall standing image (csalad-otthon-1-7) */}
                    <button
                      type="button"
                      className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-terracotta h-[calc(36rem+1rem)]"
                      style={{ animationDelay: '0.1s' }}
                      onClick={() => openLightbox(groupIndex, 3)}
                      aria-label={`${group.images[3].alt} megnyitása nagyobb méretben`}
                    >
                      <LazyImage
                        src={group.images[3].src}
                        alt={group.images[3].alt}
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

                    {/* Third column: 2 images (csalad-otthon-1-2, csalad-otthon-1-4) */}
                    <div className="grid grid-cols-1 gap-4">
                      {[2, 4].map((index) => {
                        const image = group.images[index];
                        return (
                          <button
                            key={index}
                            type="button"
                            className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-terracotta"
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
                            className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-terracotta"
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
                      className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-terracotta h-[calc(36rem+1rem)]"
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
                            className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-terracotta"
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
                        className="relative overflow-hidden rounded-2xl cursor-pointer group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] w-full text-left focus:outline-none focus:ring-4 focus:ring-terracotta"
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
