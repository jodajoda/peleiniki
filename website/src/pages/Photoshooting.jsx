import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getAssetPath } from '../utils/assets';
import ScrollToTopButton from '../components/ScrollToTopButton';

const Photoshooting = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);

  useEffect(() => {
    setIsVisible(true);

    // Intersection Observer for section animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-section-index');
            setVisibleSections((prev) => new Set([...prev, parseInt(index)]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);
  const sections = [
    {
      id: 'lazabb-fotozes',
      title: 'A Lazább fotózás',
      image: '/assets/photoshooting/lazabb-fotozes.jpg',
      content: [
        'Nálam nem kell kicsinosítanod magad, felöltöznöd, tökéletesnek lenned. Sőt! Annál jobb, minél lazábban érzitek magatokat. Akár pizsamában, kócos hajjal, kávéval a kezedben – pont olyannak, amilyenek vagytok egy hétköznap reggelén.',
        'Ez nem egy klasszikus "fotózás". Ez inkább olyan, mintha átjönnék egy kávéra, miközben ti csináljátok a dolgotokat. Játszotok a gyerekkel, bújós, cicázás, vagy csak úgy lótok-futotok a lakásban. Én meg közben csendben megörökítem, ahogy éltek, nevetgéltek, ölelgezitek egymást.',
        'Lehet otthon a kanapén hempergőzve, a konyhában süti sütés közben, vagy a játszószőnyegen autózgatva. Az a lényeg, hogy ti jól érezzétek magatokat, és közben én elkaptam azokat a pillanatokat, amiket évek múlva is szeretnétek majd visszanézni.',
      ],
    },
    {
      id: 'nincs-poz',
      title: 'Nincs póz, csak élet',
      image: '/assets/photoshooting/nincs-poz.jpg',
      content: [
        'Nálam nem lesz „Nézz a kamerába és mosolyogj!" felszólítás. Ehelyett játszotok, nevettek, ölelitek egymást, és én közben diszkréten megörökítem a pillanatokat. A képek tele lesznek élettel: a gyerek őszinte nevetésével, az apuka büszke pillantásával, az anyuka gyengéd simogatásával.',
        'Minden érzelem helyet kap: a játékos percek, a nevetés, de akár a könnycseppek és a megnyugtató ölelések is. Ezek az őszinte pillanatok teszik a fotókat igazán különlegessé és értékessé.',
      ],
    },
    {
      id: 'helyszin',
      title: 'A helyszín',
      image: '/assets/photoshooting/helyszin.jpg',
      content: [
        'Fotózhatunk otthon, a kerted zugaiban, a kedvenc játszótereken, parkokban, vagy bármilyen más helyen, ami számotokra fontos és biztonságot ad. A saját környezetetek adja a leghitelesebb hátteret – nincs szükség stúdióra vagy mesterséges díszletekre.',
        'A lényeg, hogy olyan legyen a helyszín, ahol jól érzitek magatokat, ahol szabadon mozoghattok, és ahol a gyerekek is természetesen viselkednek.',
      ],
    },
    {
      id: 'fotozes-utan',
      title: 'A fotózás után',
      image: '/assets/photoshooting/fotozes-utan.jpg',
      content: [
        'A fotózást követően gondosan átválogatom az összes felvételt, és kiválasztom a legszebb, legkifejezőbb pillanatokat. Ezeket professzionális szoftverekkel retusálom és színkorrigálom, hogy a végeredmény tökéletes legyen.',
        'A kész képeket online galérián keresztül kapjátok meg, ahonnan könnyedén letölthetők és megoszthatók. A képek a tieitek lesznek – nyomtathatjátok, keretezhetitek, megoszthatjátok a családdal és barátokkal.',
      ],
    },
    {
      id: 'kepzeld-el',
      title: 'Képzeld el!',
      image: '/assets/photoshooting/kepzeld-el.jpg',
      content: [
        'Képzeld el, hogy évek múlva visszanézed ezeket a képeket, és emlékszel arra a napra, amikor a kicsi még csak ennyike volt. A mosolyára, a nevetésére, arra, ahogy simult hozzád. Ezek az emlékek felbecsülhetetlen értékűek, és a fotók segítenek megőrizni őket.',
      ],
    },
    {
      id: 'keszen-allsz',
      title: 'Készen állsz?',
      image: '/assets/photoshooting/keszen-allsz.jpg',
      content: [
        'Ha felkeltette az érdeklődésed a Lazább fotózás, és szeretnéd, hogy megörökítsem a ti különleges történeteteket, vedd fel velem a kapcsolatot! Meséljétek el, milyenek vagytok, mi teszi különlegessé a ti családotokat, és találjunk egy közös időpontot!',
        'Szeretettel várlak benneteket!',
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16">
      <SEO
        title="A fotózás velem"
        description="Lazán, természetesen, sok nevetéssel - fedezd fel, hogyan zajlik egy családi fotózás. Őszinte pillanatok otthon vagy szabadban."
        keywords="fotózás menete, családi fotózás Budapest, természetes fotózás, otthoni fotózás, kismama fotózás"
        ogImage="/assets/photoshooting/lazabb-fotozes.jpg"
        ogImageAlt="A fotózás velem - Természetes családi fotózás"
        canonicalUrl="/photoshooting"
      />
      {/* Enhanced Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 md:mb-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className={`inline-block mb-2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-primary-600 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-semibold">Hogyan dolgozom</span>
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 text-gray-900 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            A fotózás velem
          </h1>
          <div className={`w-16 sm:w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto rounded-full mb-2 sm:mb-3 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
          <p className={`text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Lazán, természetesen, sok nevetéssel - fedezd fel, hogyan zajlik egy családi fotózás
          </p>
        </div>
      </div>

      <div className="space-y-6 sm:space-y-8 md:space-y-10">
        {sections.map((section, sectionIndex) => {
          const isSectionVisible = visibleSections.has(sectionIndex);
          return (
          <section
            key={section.id}
            ref={(el) => (sectionRefs.current[sectionIndex] = el)}
            data-section-index={sectionIndex}
            className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden py-6 sm:py-8 md:py-10"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                    <pattern id={`dots-${section.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="2" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#dots-${section.id})`} />
                </svg>
              </div>

              <div className="text-center mb-4 sm:mb-5 md:mb-6 relative z-10">
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 transition-all duration-1000 ${isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  {section.title}
                </h2>
                <div className={`w-12 sm:w-14 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mx-auto transition-all duration-1000 delay-200 ${isSectionVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
              </div>

              <div className={`grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center relative z-10 ${sectionIndex % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image - alternating order */}
                <div className={`${sectionIndex % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className={`group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-2xl transition-all duration-1000 transform hover:scale-[1.02] delay-300 ${isSectionVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${sectionIndex % 2 === 1 ? 'translate-x-8' : '-translate-x-8'}`}`}>
                    <img
                      src={getAssetPath(section.image)}
                      alt={section.title}
                      className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                </div>

                {/* Text content - alternating order */}
                <div className={`space-y-4 sm:space-y-5 md:space-y-6 ${sectionIndex % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  {section.content.map((paragraph, index) => {
                    const paragraphDelay = 500 + (index * 200);
                    // Check if this is the last section (Készen állsz?) and first paragraph
                    if (section.id === 'keszen-allsz' && index === 0) {
                      // Split at "vedd fel velem a kapcsolatot"
                      const parts = paragraph.split('vedd fel velem a kapcsolatot');
                      return (
                        <p key={index} className={`text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed transition-all duration-1000 ${isSectionVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${sectionIndex % 2 === 1 ? '-translate-x-8' : 'translate-x-8'}`}`} style={{ transitionDelay: `${paragraphDelay}ms` }}>
                          {parts[0]}
                          <Link
                            to="/contact"
                            className="text-orange-500 hover:text-orange-600 underline font-semibold transition-colors duration-300"
                          >
                            vedd fel velem a kapcsolatot
                          </Link>
                          {parts[1]}
                        </p>
                      );
                    }
                    return <p key={index} className={`text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed transition-all duration-1000 ${isSectionVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${sectionIndex % 2 === 1 ? '-translate-x-8' : 'translate-x-8'}`}`} style={{ transitionDelay: `${paragraphDelay}ms` }}>{paragraph}</p>;
                  })}
                </div>
              </div>
            </div>
          </section>
          );
        })}

        {/* Enhanced CTA */}
        <div className="relative mt-12 sm:mt-14 md:mt-16 bg-gradient-to-br from-primary-50 via-white to-primary-100 py-16 sm:py-20 md:py-24 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-orange-200 to-amber-300 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-amber-200 to-orange-300 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-100 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
          </div>

          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dots-cta" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots-cta)" />
            </svg>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-orange-300 to-amber-400 mb-6 sm:mb-8 shadow-lg">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Készen állsz a fotózásra?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Foglalj időpontot még ma, és örökítsük meg együtt családod különleges pillanatait!
            </p>

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
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
};

export default Photoshooting;
