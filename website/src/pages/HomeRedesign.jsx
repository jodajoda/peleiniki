import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { getAssetPath } from '../utils/assets';

const HomeRedesign = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const previewSections = [
    {
      id: 1,
      title: 'A fotózás velem',
      subtitle: 'Természetesen, lazán',
      description: 'Fedezd fel, hogyan zajlik egy fotózás. Lazán, természetesen, sok nevetéssel.',
      image: '/assets/homepage/fotozas-velem.jpg',
      link: '/photoshooting',
      rotation: 'rotate-[-2deg]',
      color: 'from-amber-50 to-orange-50'
    },
    {
      id: 2,
      title: 'Portfólió',
      subtitle: 'Őszinte pillanatok',
      description: 'Nézd meg korábbi munkáimat. Családok, keresztelők, szülinapok és sok-sok szeretet.',
      image: '/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-1.jpg',
      link: '/portfolio',
      rotation: 'rotate-[2deg]',
      color: 'from-rose-50 to-pink-50'
    },
    {
      id: 3,
      title: 'Rólam',
      subtitle: 'Ki vagyok én?',
      description: 'Kicsoda Pelei Niki? Ismerd meg jobban a fotóst és a történetet.',
      image: '/assets/homepage/rolam.jpg',
      link: '/about',
      rotation: 'rotate-[-1.5deg]',
      color: 'from-amber-50 to-yellow-50'
    },
    {
      id: 4,
      title: 'Csomagok',
      subtitle: 'Válassz!',
      description: 'Válassz a különböző fotózási csomagok közül, ami a legjobban illik hozzátok.',
      image: '/assets/homepage/csomagok.jpg',
      link: '/packages',
      rotation: 'rotate-[1deg]',
      color: 'from-peach-50 to-orange-50'
    },
  ];

  return (
    <div className="min-h-screen bg-warmPaper">
      <SEO
        title="Főoldal"
        description="Pelei Niki Fotós - Családi és gyermekfotózás természetes környezetben. Őszinte pillanatok megörökítése Budapesten és környékén."
        keywords="családi fotózás, gyermekfotózás, kismama fotózás, fotográfus Budapest, természetes fotók, családi fotós"
        ogImage="/assets/homepage/hero.jpg"
        ogImageAlt="Pelei Niki Fotós - Családfotózás"
        canonicalUrl="/"
      />

      {/* Hero Section - Scrapbook Style */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 py-20">
        {/* Textured background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-warmPaper via-cream-100 to-peach-50"></div>

        {/* Subtle grain texture overlay */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
          }}
        />

        {/* Decorative hand-drawn circles */}
        <div className="absolute top-20 right-10 w-32 h-32 border-2 border-sunsetOrange/20 rounded-full animate-float-slow"
          style={{
            borderStyle: 'dashed',
            animationDelay: '0s'
          }}
        />
        <div className="absolute bottom-32 left-16 w-24 h-24 border-2 border-goldenHour/30 rounded-full animate-float-slow"
          style={{
            borderStyle: 'dashed',
            animationDelay: '2s'
          }}
        />

        {/* Main Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Handwritten subtitle */}
            <div className="inline-block">
              <p className="font-handwritten text-2xl md:text-3xl text-terracotta mb-2">
                Természetes képek, őszinte mosolyok
              </p>
              <div className="h-0.5 w-3/4 bg-gradient-to-r from-sunsetOrange/50 to-transparent rounded-full"></div>
            </div>

            {/* Main heading */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-charcoal leading-tight">
              Pelei Niki
              <span className="block text-4xl md:text-5xl lg:text-6xl font-light text-warmBrown mt-2">
                Fotográfus
              </span>
            </h1>

            {/* Description */}
            <p className="font-body text-lg md:text-xl text-warmBrown/80 leading-relaxed max-w-xl">
              Családi pillanatok megörökítése, ahogy azok igazán történnek.
              Beállítás nélkül, természetes fényben, szeretettel.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/contact"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-terracotta text-white font-body font-semibold text-lg rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-sunsetOrange to-terracotta opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative">Foglalj időpontot</span>
                <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                to="/portfolio"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm text-warmBrown font-body font-semibold text-lg rounded-full border-2 border-warmBrown/30 hover:border-terracotta hover:bg-white transition-all duration-300 hover:scale-105 shadow-md"
              >
                <span>Portfólió</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-8 opacity-70">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-goldenHour" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-body text-sm text-warmBrown">Elégedett családok</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-sunsetOrange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-body text-sm text-warmBrown">Budapest</span>
              </div>
            </div>
          </div>

          {/* Right: Polaroid-style Hero Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-8 rotate-3'}`}>
            {/* Polaroid frame */}
            <div className="relative bg-white p-4 pb-16 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* Tape effect */}
              <div className="absolute -top-4 left-1/4 w-24 h-8 bg-amber-100/60 backdrop-blur-sm border border-amber-200/50 rotate-[-5deg] shadow-md"></div>
              <div className="absolute -top-4 right-1/4 w-20 h-8 bg-amber-100/60 backdrop-blur-sm border border-amber-200/50 rotate-[8deg] shadow-md"></div>

              {/* Photo */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={getAssetPath('assets/homepage/hero.jpg')}
                  alt="Pelei Niki - Családfotózás"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Handwritten caption */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-handwritten text-xl text-charcoal/70 text-center">
                  Örökítsük meg együtt ♡
                </p>
              </div>
            </div>

            {/* Decorative photo corner */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white p-2 shadow-xl rotate-[-12deg] hidden md:block">
              <div className="w-full h-full bg-gradient-to-br from-peach-200 to-orange-200 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-warmBrown/50">
            <span className="font-body text-xs uppercase tracking-widest">Görgess</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section - Scrapbook Cards */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-warmPaper via-cream-50 to-warmPaper"></div>

        {/* Section header */}
        <div className="relative z-10 max-w-7xl mx-auto mb-16 text-center">
          <p className="font-handwritten text-3xl text-sunsetOrange mb-3">
            Fedezd fel
          </p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-charcoal mb-4">
            Munkáim
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-goldenHour to-transparent mx-auto rounded-full"></div>
        </div>

        {/* Scrapbook-style cards grid */}
        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          {previewSections.map((section, index) => (
            <Link
              key={section.id}
              to={section.link}
              className={`group relative block transition-all duration-500 ${section.rotation} hover:rotate-0 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Card container with polaroid styling */}
              <div className="relative bg-white p-5 pb-20 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                {/* Decorative tape */}
                <div className="absolute -top-3 left-1/4 w-20 h-6 bg-amber-100/70 backdrop-blur-sm border border-amber-200/60 rotate-[-8deg] shadow-sm"></div>

                {/* Image container */}
                <div className="relative aspect-[4/3] overflow-hidden mb-4">
                  <img
                    src={getAssetPath(section.image)}
                    alt={section.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                </div>

                {/* Text content */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-handwritten text-4xl text-terracotta">
                      {section.title}
                    </span>
                  </div>

                  <p className="font-body text-warmBrown/70 leading-relaxed">
                    {section.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="inline-flex items-center gap-2 pt-2 text-sunsetOrange group-hover:translate-x-2 transition-transform duration-300">
                    <span className="font-body font-semibold text-sm uppercase tracking-wide">
                      Megnézem
                    </span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Number badge */}
                <div className="absolute bottom-5 right-5 w-12 h-12 rounded-full bg-gradient-to-br from-peach-200 to-sunsetOrange/40 flex items-center justify-center shadow-md">
                  <span className="font-serif font-bold text-2xl text-warmBrown">
                    {section.id}
                  </span>
                </div>
              </div>

              {/* Shadow layer for depth */}
              <div className="absolute inset-0 bg-warmBrown/5 -z-10 translate-y-2 translate-x-2 rounded-sm"></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action - Handwritten Style */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-peach-50 via-cream-100 to-amber-50"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-goldenHour/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-sunsetOrange/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Handwritten heading */}
          <div className="space-y-3">
            <p className="font-handwritten text-4xl md:text-5xl text-terracotta">
              Foglalj időpontot!
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal">
              Örökítsük meg együtt családod<br />különleges pillanatait
            </h2>
          </div>

          <p className="font-body text-lg text-warmBrown/80 max-w-2xl mx-auto leading-relaxed">
            Természetes, spontán fotózás Budapest legszebb helyszínein.
            Nincs kényszerítés, csak őszinte mosolyok és szeretet.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-sunsetOrange to-terracotta text-white font-body font-bold text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-sunsetOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <svg className="relative w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="relative">Kapcsolatfelvétel</span>
            </Link>
          </div>

          {/* Decorative doodle */}
          <div className="pt-8 flex justify-center">
            <svg className="w-32 h-8 text-goldenHour/30" viewBox="0 0 100 20" fill="none" stroke="currentColor">
              <path d="M 10 10 Q 30 5, 50 10 T 90 10" strokeWidth="2" strokeLinecap="round" strokeDasharray="2,4"/>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeRedesign;
