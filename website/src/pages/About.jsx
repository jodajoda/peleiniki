const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <article className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="animate-fade-in">
              <img
                src="/peleiniki/assets/about-me/magamrol_202410-03733-2.jpg"
                alt="Pelei Niki fotográfus portréja"
                className="w-full rounded-lg shadow-lg"
                loading="eager"
              />
            </div>

            {/* Text */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 animate-fade-in">
                Magamról
              </h1>

              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  Pelei Niki vagyok, feleség és egy kislány anyukája, valamint két kutya büszke tulajdonosa.
                  A fotózás iránti szeretetem a saját családom és a mindennapi pillanatok megörökítéséből fakad.
                  Rájöttem, hogy a legértékesebb kincseink az emlékeink, és a fényképek segítenek megőrizni
                  ezeket a múló pillanatokat.
                </p>

                <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  A fotózás számomra nem csak munka, hanem szenvedély. Szeretem megfigyelni az embereket,
                  az érzelmeket és a kapcsolatokat, és ezeket őszintén, természetes módon visszaadni a képeimen.
                  Hiszem, hogy a legjobb fotók akkor születnek, amikor mindenki felszabadultan érzi magát,
                  ezért a fotózásaim során barátságos és laza légkört teremtek.
                </p>

                <p className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  Célom, hogy olyan képeket készítsek, amelyek nemcsak szépek, hanem történetet mesélnek,
                  és évek múltán is mosolyt csalnak az arcotokra.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center p-6 bg-primary-50 rounded-lg">
              <div className="text-3xl font-bold text-primary-700 mb-2">5+</div>
              <div className="text-gray-700">Év tapasztalat</div>
            </div>
            <div className="text-center p-6 bg-primary-50 rounded-lg">
              <div className="text-3xl font-bold text-primary-700 mb-2">100+</div>
              <div className="text-gray-700">Boldog család</div>
            </div>
            <div className="text-center p-6 bg-primary-50 rounded-lg">
              <div className="text-3xl font-bold text-primary-700 mb-2">∞</div>
              <div className="text-gray-700">Különleges pillanat</div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default About;
