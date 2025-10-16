import SEO from '../components/SEO';
import { getAssetPath } from '../utils/assets';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <SEO
        title="Rólam"
        description="Pelei Niki vagyok, családi és gyermekfotós. Ismerd meg jobban a történetemet és azt, miért szeretem megörökíteni a családok őszinte pillanatait."
        keywords="Pelei Niki, fotográfus bemutatkozás, családi fotós Budapest, fotós bemutatkozó"
        ogImage="/assets/about-me/magamrol_202410-03733-2.jpg"
        ogImageAlt="Pelei Niki fotográfus portréja"
        canonicalUrl="/about"
      />
      <div className="container mx-auto px-4">
        <article className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="animate-scale-in overflow-hidden rounded-lg shadow-soft hover:shadow-glow transition-shadow duration-500">
              <img
                src={getAssetPath('assets/about-me/magamrol_202410-03733-2.jpg')}
                alt="Pelei Niki fotográfus portréja"
                className="w-full h-auto object-cover transition-all duration-700 ease-in-out hover:scale-110"
                style={{ filter: 'saturate(1.1) brightness(1.05) contrast(1.02)' }}
                loading="eager"
              />
            </div>

            {/* Text */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 animate-slide-right pb-2 text-gradient-primary">
                Magamról
              </h1>

              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p className="animate-slide-left stagger-1">
                  Pelei Niki vagyok, feleség és egy kislány anyukája, valamint két kutya büszke tulajdonosa.
                  A fotózás iránti szeretetem a saját családom és a mindennapi pillanatok megörökítéséből fakad.
                  Rájöttem, hogy a legértékesebb kincseink az emlékeink, és a fényképek segítenek megőrizni
                  ezeket a múló pillanatokat.
                </p>

                <p className="animate-slide-left stagger-2">
                  A fotózás számomra nem csak munka, hanem szenvedély. Szeretem megfigyelni az embereket,
                  az érzelmeket és a kapcsolatokat, és ezeket őszintén, természetes módon visszaadni a képeimen.
                  Hiszem, hogy a legjobb fotók akkor születnek, amikor mindenki felszabadultan érzi magát,
                  ezért a fotózásaim során barátságos és laza légkört teremtek.
                </p>

                <p className="animate-slide-left stagger-3">
                  Célom, hogy olyan képeket készítsek, amelyek nemcsak szépek, hanem történetet mesélnek,
                  és évek múltán is mosolyt csalnak az arcotokra.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg shadow-soft hover:shadow-glow transition-all duration-300 hover-lift animate-bounce-in stagger-4">
              <div className="text-3xl font-bold text-primary-700 mb-2 animate-pulse-soft">5+</div>
              <div className="text-gray-700">Év tapasztalat</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg shadow-soft hover:shadow-glow transition-all duration-300 hover-lift animate-bounce-in stagger-5">
              <div className="text-3xl font-bold text-primary-700 mb-2 animate-pulse-soft">100+</div>
              <div className="text-gray-700">Boldog család</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg shadow-soft hover:shadow-glow transition-all duration-300 hover-lift animate-bounce-in stagger-6">
              <div className="text-3xl font-bold text-primary-700 mb-2 animate-pulse-soft">∞</div>
              <div className="text-gray-700">Különleges pillanat</div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default About;
