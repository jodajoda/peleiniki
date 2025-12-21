import { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import { getAssetPath } from '../utils/assets';
import ScrollToTopButton from '../components/ScrollToTopButton';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Intersection Observer for content section
    // On mobile: trigger earlier with reduced rootMargin for faster content appearance
    const isMobile = window.innerWidth < 768;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setContentVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: isMobile ? '0px 0px 50px 0px' : '0px 0px -100px 0px'
      }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16">
      <SEO
        title="Rólam"
        description="Pelei Niki vagyok, családi és gyermekfotós. Ismerd meg jobban a történetemet és azt, miért szeretem megörökíteni a családok őszinte pillanatait."
        keywords="Pelei Niki, fotográfus bemutatkozás, családi fotós Budapest, fotós bemutatkozó"
        ogImage="/assets/about-me/magamrol_202410-03733-2.jpg"
        ogImageAlt="Pelei Niki fotográfus portréja"
        canonicalUrl="/about"
      />

      {/* Enhanced Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 md:mb-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className={`inline-block mb-2 transition-all duration-700 md:duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="font-handwritten text-terracotta text-xl sm:text-2xl md:text-3xl">Ki vagyok én?</span>
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-2 sm:mb-3 text-charcoal transition-all duration-700 delay-75 md:duration-1000 md:delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Magamról
          </h1>
          <div className={`w-16 sm:w-20 h-1 bg-gradient-to-r from-terracotta to-sunsetOrange mx-auto rounded-full mb-2 sm:mb-3 transition-all duration-700 delay-100 md:duration-1000 md:delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
          <p className={`text-base sm:text-lg md:text-xl font-body text-warmBrown leading-relaxed transition-all duration-700 delay-150 md:duration-1000 md:delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Ismerj meg jobban - történetem és szenvedélyem a fotózás iránt
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="relative bg-gradient-to-br from-peach-100 via-warmPaper to-cream-100 overflow-hidden py-6 sm:py-8 md:py-10">
        {/* Enhanced floating blur elements */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-terracotta/30 to-sunsetOrange/40 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-sunsetOrange/30 to-goldenHour/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-peach-100/50 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Decorative pattern overlay */}


        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <article className="max-w-6xl mx-auto relative z-10" ref={contentRef}>
            <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center mb-8 sm:mb-10 md:mb-12">
              {/* Image */}
              <div className={`group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-2xl transition-all duration-700 md:duration-1000 transform hover:scale-[1.02] ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <img
                  src={getAssetPath('assets/about-me/magamrol_202410-03733-2.jpg')}
                  alt="Pelei Niki fotográfus portréja"
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              {/* Text */}
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-4 sm:space-y-5 md:space-y-6 font-body text-warmBrown text-sm sm:text-base md:text-lg leading-relaxed">
                  <p className={`transition-all duration-700 delay-75 md:duration-1000 md:delay-200 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                    Pelei Niki vagyok - feleség, egy kislány anyukája és két kutya büszke gazdája. A fotózás iránti szeretetem a saját családom mindennapi pillanataiból indult. Rájöttem, hogy azok a kis, hétköznapi történések, amiket sokszor észre sem veszünk, valójában óriási kincsek. A fényképek segítenek megőrizni ezeket a múló, mégis nagyon fontos emlékeket.
                  </p>

                  <p className={`transition-all duration-700 delay-150 md:duration-1000 md:delay-400 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                    Amit imádok a fotózásban, az az élet maga. A valódi történések, az ismerős terek, a család és barátok közelsége, a kutyák bohó jelenléte - minden, ami tényleg ti vagytok. Nincs beállított díszlet, nincs mesterkéltség: csak őszinte nevetések, mozdulatok és történetek.
                  </p>

                  <p className={`transition-all duration-700 delay-200 md:duration-1000 md:delay-600 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                    A fotózás számomra nem csupán munka, hanem szívből jövő szenvedély. Imádom megfigyelni az emberek közötti apró rezdüléseket: egy ölelést, egy mosolyt, egy fél pillantást. Szeretem ezeket a kapcsolatokat és érzelmeket természetesen, őszintén visszaadni a képeimen.
                  </p>
                  <p className={`transition-all duration-700 delay-200 md:duration-1000 md:delay-600 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                    Hiszem, hogy a legszebb fotók akkor születnek, amikor mindenki felszabadultan érzi magát. Ezért a fotózásokon barátságos, könnyed légkört teremtek, ahol nincs elvárás, nincs szerep - csak ti vagytok és a köztetek lévő szeretet.
                  </p>
                  <p className={`transition-all duration-700 delay-200 md:duration-1000 md:delay-600 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                    A célom, hogy olyan családi fotókat készítsek, amelyek nemcsak szépek, hanem történetet is mesélnek. Olyan képeket, amelyekre évekkel később is örömmel néztek vissza, és amelyek újra előhozzák azt az érzést, amit abban a pillanatban megéltetek.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Stat Cards */}
            <div className="grid md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            <div className={`group relative text-center p-4 sm:p-5 bg-gradient-to-br from-peach-100 via-warmPaper to-cream-100 rounded-xl shadow-soft hover:shadow-2xl transition-all duration-700 delay-250 md:duration-1000 md:delay-700 transform hover:scale-105 overflow-hidden ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-terracotta/30 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-terracotta to-sunsetOrange mb-2 sm:mb-3 shadow-lg">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-terracotta to-sunsetOrange bg-clip-text text-transparent mb-1 sm:mb-2">5+</div>
                <div className="text-sm sm:text-base font-body text-warmBrown font-medium">Év tapasztalat</div>
              </div>
            </div>

            <div className={`group relative text-center p-4 sm:p-5 bg-gradient-to-br from-peach-100 via-warmPaper to-cream-100 rounded-xl shadow-soft hover:shadow-2xl transition-all duration-700 delay-300 md:duration-1000 md:delay-[900ms] transform hover:scale-105 overflow-hidden ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-terracotta/30 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-terracotta to-sunsetOrange mb-2 sm:mb-3 shadow-lg">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-terracotta to-sunsetOrange bg-clip-text text-transparent mb-1 sm:mb-2">100+</div>
                <div className="text-sm sm:text-base font-body text-warmBrown font-medium">Boldog család</div>
              </div>
            </div>

            <div className={`group relative text-center p-4 sm:p-5 bg-gradient-to-br from-peach-100 via-warmPaper to-cream-100 rounded-xl shadow-soft hover:shadow-2xl transition-all duration-700 delay-[350ms] md:duration-1000 md:delay-[1100ms] transform hover:scale-105 overflow-hidden ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-terracotta/30 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-terracotta to-sunsetOrange mb-2 sm:mb-3 shadow-lg">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-terracotta to-sunsetOrange bg-clip-text text-transparent mb-1 sm:mb-2">∞</div>
                <div className="text-sm sm:text-base font-body text-warmBrown font-medium">Különleges pillanat</div>
              </div>
            </div>
          </div>
          </article>
        </div>
      </section>

      {/* Scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
};

export default About;
