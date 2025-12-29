import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getAssetPath } from '../utils/assets';
import ScrollToTopButton from '../components/ScrollToTopButton';
import ImageCarousel from '../components/ImageCarousel';

const Photoshooting = () => {
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
  const sections = [
    {
      id: 'fotozas-velem',
      title: 'A fotózás velem',
      images: [
        '/assets/photoshooting/nincs-poz.jpg',
      ],
      content: [
        'A családi fotózás nálam laza, természetes, szeretettel teli közös élmény. Nem kell megfelelni, nem kell tudni pózolni — csak együtt vagytok, én pedig csendben figyelem a közöttetek lévő kapcsolatot. A célom, hogy természetes, őszinte pillanatokat kapjak el, amik valóban rólatok szólnak.'
      ],
    },
    {
      id: 'nincs-poz',
      title: 'Nincs póz, csak élet',
      images: [
        '/assets/photoshooting/lazabb-fotozes.jpg',
      ],
      content: [
        'A legszebb képek mindig azok, amik maguktól születnek: egy nevetésből, egy ölelésből, játékból, kapcsolódásból. Nálam nincsenek erőltetett beállítások vagy „nézz ide és mosolyogj!” kérések. Inkább hagyom, hogy a gyerekek játsszanak, a szülők öleljenek, és a család pont olyan legyen, amilyen a mindennapokban.',
      ],
    },
    {
      id: 'helyszin',
      title: 'A helyszín',
      images: [
        '/assets/photoshooting/helyszin.jpg',
      ],
      content: [
        'Fotózhatunk otthon, a kertetekben, a kedvenc játszótéren, parkban, vagy bármilyen helyen, ami számotokra fontos és biztonságos.',
        'Nem használok díszleteket vagy stúdiós háttereket — hiszem, hogy a legszebb fotókat az adja, ami már eleve a tiétek: a saját környezetetek, a gyerekek kedvenc játéka, a közös mozdulatok. Így lesz minden kép természetes és hiteles.',
      ],
    },
    {
      id: 'fotozas-utan',
      title: 'A fotózás után',
      images: [
        '/assets/photoshooting/fotozes-utan.jpg',
      ],
      content: [
        'A fotózás után gondosan átnézem az összes képet, és kiválasztom azokat, amelyek a legszebben mesélik el a történeteteket. Finoman egységesítem őket - színek, hangulat, tónusok - éppen annyi utómunkával, amennyi kiemeli a történeteteket, úgy, hogy a fotók megőrizzék a pillanat valódiságát.',
        'Ezután kaptok tőlem egy válogatást, amiből kényelmesen kiválaszthatjátok a kedvenceiteket.',
        'A végleges, nagy felbontású képeket egy letölthető linken keresztül küldöm. Könnyedén elmenthetitek, megoszthatjátok, nyomtathatjátok.'
      ],
    }
  ];

  return (
    <div className="min-h-screen bg-warmPaper pt-28 sm:pt-32 pb-16">
      <SEO
        title="A fotózás velem"
        description="Hogyan zajlik egy családi fotózás? Természetes ritmusban, nincs póz, csak élet. Ismerj meg, és nézd meg, hogyan dolgozom Budapesten."
        keywords="fotózás menete, családi fotózás Budapest, természetes fotózás, hogyan zajlik fotózás, otthoni fotózás, játszótéri fotózás, kismama fotózás"
        ogImage="/assets/photoshooting/lazabb-fotozes.jpg"
        ogImageAlt="A fotózás velem - Természetes és laza családi fotózás Budapesten"
        canonicalUrl="/photoshooting"
      />
      {/* Enhanced Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 md:mb-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className={`inline-block mb-2 transition-all duration-700 md:duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="font-handwritten text-terracotta text-xl sm:text-2xl md:text-3xl ">Hogyan dolgozom</span>
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-2 sm:mb-3 text-charcoal transition-all duration-700 delay-75 md:duration-1000 md:delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            A fotózás velem
          </h1>
          <div className={`w-16 sm:w-20 h-1 bg-gradient-to-r from-terracotta to-goldenHour mx-auto rounded-full mb-2 sm:mb-3 transition-all duration-700 delay-100 md:duration-1000 md:delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
          <p className={`font-body text-base sm:text-lg md:text-xl text-warmBrown/70 leading-relaxed transition-all duration-700 delay-150 md:duration-1000 md:delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Természetes ritmusban, a saját tempótokban – bepillantás a fotózás menetébe
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
            className="relative bg-gradient-to-br from-peach-100 via-cream-100 to-warmPaper overflow-hidden py-6 sm:py-8 md:py-10"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {/* Enhanced floating blur elements */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-terracotta/30 to-goldenHour/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-goldenHour/20 to-sunsetOrange/30 rounded-full blur-3xl" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-peach-200/20 rounded-full blur-3xl" style={{ animationDelay: '4s' }}></div>
              </div>

              <div className="text-center mb-4 sm:mb-5 md:mb-6 relative z-10">
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-charcoal mb-2 transition-all duration-700 md:duration-1000 ${isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  {section.title}
                </h2>
                <div className={`w-12 sm:w-14 h-1 bg-gradient-to-r from-terracotta to-goldenHour rounded-full mx-auto transition-all duration-700 delay-75 md:duration-1000 md:delay-200 ${isSectionVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
              </div>

              <div className={`grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center relative z-10 ${sectionIndex % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image/Carousel - alternating order */}
                <div className={`${sectionIndex % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className={`group transition-all duration-700 delay-100 md:duration-1000 md:delay-300 ${isSectionVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${sectionIndex % 2 === 1 ? 'translate-x-8' : '-translate-x-8'}`}`}>
                    {section.images ? (
                      <ImageCarousel
                        images={section.images}
                        alt={section.title}
                        className="shadow-soft hover:shadow-2xl transition-shadow duration-700"
                        autoplay={true}
                        interval={5000}
                        startOnVisible={true}
                      />
                    ) : (
                      <div className="relative overflow-hidden rounded-2xl shadow-soft hover:shadow-2xl transition-shadow duration-700">
                        <img
                          src={getAssetPath(section.image)}
                          alt={section.title}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Text content - alternating order */}
                <div className={`space-y-4 sm:space-y-5 md:space-y-6 ${sectionIndex % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  {section.content.map((paragraph, index) => {
                    // Faster delays on mobile (150ms base + 80ms per item), slower on desktop (200ms base + 150ms per item)
                    const paragraphDelayMobile = 150 + (index * 80);
                    const paragraphDelayDesktop = 150 + (index * 80);
                    // Check if this is the last section (Készen állsz?) and first paragraph
                    if (section.id === 'keszen-allsz' && index === 0) {
                      // Split at "vedd fel velem a kapcsolatot"
                      const parts = paragraph.split('vedd fel velem a kapcsolatot');
                      return (
                        <p key={index} className={`font-body text-sm sm:text-base md:text-lg text-warmBrown leading-relaxed transition-all duration-700 md:duration-1000 ${isSectionVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${sectionIndex % 2 === 1 ? '-translate-x-8' : 'translate-x-8'}`}`} style={{ transitionDelay: window.innerWidth < 768 ? `${paragraphDelayMobile}ms` : `${paragraphDelayDesktop}ms` }}>
                          {parts[0]}
                          <Link
                            to="/contact"
                            className="text-terracotta hover:text-sunsetOrange underline font-semibold transition-colors duration-300"
                          >
                            vedd fel velem a kapcsolatot
                          </Link>
                          {parts[1]}
                        </p>
                      );
                    }
                    return <p key={index} className={`font-body text-sm sm:text-base md:text-lg text-warmBrown leading-relaxed transition-all duration-700 md:duration-1000 ${isSectionVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${sectionIndex % 2 === 1 ? '-translate-x-8' : 'translate-x-8'}`}`} style={{ transitionDelay: window.innerWidth < 768 ? `${paragraphDelayMobile}ms` : `${paragraphDelayDesktop}ms` }}>{paragraph}</p>;
                  })}
                </div>
              </div>
            </div>
          </section>
          );
        })}

        {/* Enhanced CTA */}
        <div className="relative mt-12 sm:mt-14 md:mt-16 bg-gradient-to-br from-peach-100 via-cream-100 to-warmPaper py-16 sm:py-20 md:py-24 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-terracotta/30 to-goldenHour/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-goldenHour/20 to-sunsetOrange/30 rounded-full blur-3xl" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-peach-200/20 rounded-full blur-3xl" style={{ animationDelay: '4s' }}></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-terracotta to-sunsetOrange mb-6 sm:mb-8 shadow-lg">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4 sm:mb-6">
              Készen állsz a fotózásra?
            </h2>
            <p className="font-body text-base sm:text-lg md:text-xl text-warmBrown/70 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Foglalj időpontot még ma, és örökítsük meg együtt családod különleges pillanatait!
            </p>

            <Link
              to="/contact"
              className="group flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-terracotta to-sunsetOrange text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-body font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Kapcsolatfelvétel</span>
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
