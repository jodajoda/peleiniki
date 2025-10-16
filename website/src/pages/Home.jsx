import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Home = () => {
  // Preview sections with images and links
  const previewSections = [
    {
      id: 1,
      title: 'A fotózás velem',
      description: 'Fedezd fel, hogyan zajlik egy fotózás. Lazán, természetesen, sok nevetéssel.',
      image: '/peleiniki/assets/homepage/fotozas-velem.jpg',
      link: '/photoshooting',
    },
    {
      id: 2,
      title: 'Portfólió',
      description: 'Nézd meg korábbi munkáimat. Családok, keresztelők, szülinapok és sok-sok szeretet.',
      image: '/peleiniki/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-1.jpg',
      link: '/portfolio',
    },
    {
      id: 3,
      title: 'Rólam',
      description: 'Kicsoda Pelei Niki? Ismerd meg jobban a fotóst és a történetet.',
      image: '/peleiniki/assets/homepage/rolam.jpg',
      link: '/about',
    },
    {
      id: 4,
      title: 'Csomagok',
      description: 'Válassz a különböző fotózási csomagok közül, ami a legjobban illik hozzátok.',
      image: '/peleiniki/assets/homepage/csomagok.jpg',
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
      />
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0">
          <img
            src="/peleiniki/assets/homepage/hero.jpg"
            alt="Pelei Niki Fotográfus - Családfotózás"
            className="w-full h-full object-cover image-warm-filter animate-scale-in"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
          <div className="absolute inset-0 gradient-overlay-sunset opacity-30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fade-in drop-shadow-lg">
              Pelei Niki Fotográfus
            </h1>
            <p className="text-lg md:text-2xl text-white max-w-3xl mx-auto animate-slide-left drop-shadow-md stagger-2">
              Családi pillanatok megörökítése természetes, spontán környezetben
            </p>
            <div className="mt-8 animate-bounce-in stagger-4">
              <a
                href="/peleiniki/contact"
                className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 hover:shadow-glow-warm transition-all duration-300 shadow-lg hover:-translate-y-1"
              >
                Kapcsolatfelvétel
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Sections */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 animate-fade-in">
          Fedezd fel
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {previewSections.map((section, index) => (
            <Link
              key={section.id}
              to={section.link}
              className="group relative overflow-hidden rounded-lg shadow-soft hover:shadow-soft-lg transition-all duration-500 animate-fade-in hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ filter: 'brightness(1.05) saturate(1.1)' }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:translate-y-[-4px] transition-transform duration-300">
                  {section.title}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  {section.description}
                </p>

                {/* Arrow Icon */}
                <div className="mt-4 flex items-center text-white/80 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                  <span className="text-sm font-medium mr-2">Tovább</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative bg-gradient-to-br from-primary-50 via-primary-100 to-primary-50 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary-300 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-warm rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">
            Foglalj időpontot!
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto animate-slide-left stagger-1">
            Örökítsük meg együtt családod különleges pillanatait
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-800 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 animate-bounce-in stagger-2 shimmer"
          >
            Kapcsolatfelvétel
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
