import { Link } from 'react-router-dom';

const Home = () => {
  // Preview sections with images and links
  const previewSections = [
    {
      id: 1,
      title: 'A fotózás velem',
      description: 'Fedezd fel, hogyan zajlik egy fotózás. Lazán, természetesen, sok nevetéssel.',
      image: '/peleiniki/assets/homepage/homepage-07031.jpg',
      link: '/photoshooting',
    },
    {
      id: 2,
      title: 'Portfólió',
      description: 'Nézd meg korábbi munkáimat. Családok, keresztelők, szülinapok és sok-sok szeretet.',
      image: '/peleiniki/assets/portfolio/csaladfotozes-margitszigeten/Csaladfotozas-Szantner-VargaEvi-Margitsziget_20240609-04022.jpg',
      link: '/portfolio',
    },
    {
      id: 3,
      title: 'Rólam',
      description: 'Kicsoda Pelei Niki? Ismerd meg jobban a fotóst és a történetet.',
      image: '/peleiniki/assets/about-me/magamrol_202410-03733-2.jpg',
      link: '/about',
    },
    {
      id: 4,
      title: 'Csomagok',
      description: 'Válassz a különböző fotózási csomagok közül, ami a legjobban illik hozzátok.',
      image: '/peleiniki/assets/homepage/homepage-01123.jpg',
      link: '/packages',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0">
          <img
            src="/peleiniki/assets/homepage/homepage-06935.jpg"
            alt="Pelei Niki Fotográfus - Családfotózás"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fade-in drop-shadow-lg">
              Pelei Niki Fotográfus
            </h1>
            <p className="text-lg md:text-2xl text-white max-w-3xl mx-auto animate-fade-in drop-shadow-md" style={{ animationDelay: '0.2s' }}>
              Családi pillanatok megörökítése természetes, spontán környezetben
            </p>
            <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <a
                href="/peleiniki/contact"
                className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Kapcsolatfelvétel
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Sections */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Fedezd fel
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {previewSections.map((section, index) => (
            <Link
              key={section.id}
              to={section.link}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
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
      <section className="bg-primary-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Foglalj időpontot!
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Örökítsük meg együtt családod különleges pillanatait
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors"
          >
            Kapcsolatfelvétel
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
