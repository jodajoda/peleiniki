import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Photoshooting = () => {
  const sections = [
    {
      id: 'lazabb-fotozes',
      title: 'A Lazább fotózás',
      image: '/peleiniki/assets/photoshooting/lazabb-fotozes.jpg',
      content: [
        'Nálam nem kell kicsinosítanod magad, felöltöznöd, tökéletesnek lenned. Sőt! Annál jobb, minél lazábban érzitek magatokat. Akár pizsamában, kócos hajjal, kávéval a kezedben – pont olyannak, amilyenek vagytok egy hétköznap reggelén.',
        'Ez nem egy klasszikus "fotózás". Ez inkább olyan, mintha átjönnék egy kávéra, miközben ti csináljátok a dolgotokat. Játszotok a gyerekkel, bújós, cicázás, vagy csak úgy lótok-futotok a lakásban. Én meg közben csendben megörökítem, ahogy éltek, nevetgéltek, ölelgezitek egymást.',
        'Lehet otthon a kanapén hempergőzve, a konyhában süti sütés közben, vagy a játszószőnyegen autózgatva. Az a lényeg, hogy ti jól érezzétek magatokat, és közben én elkaptam azokat a pillanatokat, amiket évek múlva is szeretnétek majd visszanézni.',
      ],
    },
    {
      id: 'nincs-poz',
      title: 'Nincs póz, csak élet',
      image: '/peleiniki/assets/photoshooting/nincs-poz.jpg',
      content: [
        'Nálam nem lesz „Nézz a kamerába és mosolyogj!" felszólítás. Ehelyett játszotok, nevettek, ölelitek egymást, és én közben diszkréten megörökítem a pillanatokat. A képek tele lesznek élettel: a gyerek őszinte nevetésével, az apuka büszke pillantásával, az anyuka gyengéd simogatásával.',
        'Minden érzelem helyet kap: a játékos percek, a nevetés, de akár a könnycseppek és a megnyugtató ölelések is. Ezek az őszinte pillanatok teszik a fotókat igazán különlegessé és értékessé.',
      ],
    },
    {
      id: 'helyszin',
      title: 'A helyszín',
      image: '/peleiniki/assets/photoshooting/helyszin.jpg',
      content: [
        'Fotózhatunk otthon, a kerted zugaiban, a kedvenc játszótereken, parkokban, vagy bármilyen más helyen, ami számotokra fontos és biztonságot ad. A saját környezetetek adja a leghitelesebb hátteret – nincs szükség stúdióra vagy mesterséges díszletekre.',
        'A lényeg, hogy olyan legyen a helyszín, ahol jól érzitek magatokat, ahol szabadon mozoghattok, és ahol a gyerekek is természetesen viselkednek.',
      ],
    },
    {
      id: 'fotozes-utan',
      title: 'A fotózás után',
      image: '/peleiniki/assets/photoshooting/fotozes-utan.jpg',
      content: [
        'A fotózást követően gondosan átválogatom az összes felvételt, és kiválasztom a legszebb, legkifejezőbb pillanatokat. Ezeket professzionális szoftverekkel retusálom és színkorrigálom, hogy a végeredmény tökéletes legyen.',
        'A kész képeket online galérián keresztül kapjátok meg, ahonnan könnyedén letölthetők és megoszthatók. A képek a tieitek lesznek – nyomtathatjátok, keretezhetitek, megoszthatjátok a családdal és barátokkal.',
      ],
    },
    {
      id: 'kepzeld-el',
      title: 'Képzeld el!',
      image: '/peleiniki/assets/photoshooting/kepzeld-el.jpg',
      content: [
        'Képzeld el, hogy évek múlva visszanézed ezeket a képeket, és emlékszel arra a napra, amikor a kicsi még csak ennyike volt. A mosolyára, a nevetésére, arra, ahogy simult hozzád. Ezek az emlékek felbecsülhetetlen értékűek, és a fotók segítenek megőrizni őket.',
      ],
    },
    {
      id: 'keszen-allsz',
      title: 'Készen állsz?',
      image: '/peleiniki/assets/photoshooting/keszen-allsz.jpg',
      content: [
        'Ha felkeltette az érdeklődésed a Lazább fotózás, és szeretnéd, hogy megörökítsem a ti különleges történeteteket, vedd fel velem a kapcsolatot! Meséljétek el, milyenek vagytok, mi teszi különlegessé a ti családotokat, és találjunk egy közös időpontot!',
        'Szeretettel várlak benneteket!',
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <SEO
        title="A fotózás velem"
        description="Lazán, természetesen, sok nevetéssel - fedezd fel, hogyan zajlik egy családi fotózás. Őszinte pillanatok otthon vagy szabadban."
        keywords="fotózás menete, családi fotózás Budapest, természetes fotózás, otthoni fotózás, kismama fotózás"
        ogImage="/assets/photoshooting/lazabb-fotozes.jpg"
        ogImageAlt="A fotózás velem - Természetes családi fotózás"
        canonicalUrl="/photoshooting"
      />
      <div className="container mx-auto px-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center animate-fade-in text-gradient-primary">
          A fotózás velem
        </h1>
      </div>

      <div className="space-y-20">
        {sections.map((section, sectionIndex) => (
          <section
            key={section.id}
            className="relative bg-gradient-to-br from-primary-50 via-primary-100 to-primary-50 overflow-hidden py-16 animate-fade-in"
            style={{ animationDelay: `${sectionIndex * 0.1}s` }}
          >
            <div className="container mx-auto px-4">
              {/* Floating blur elements */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-72 h-72 bg-primary-300 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-warm rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center animate-slide-left relative z-10">
                {section.title}
              </h2>

              <div className={`grid lg:grid-cols-2 gap-12 items-center relative z-10 ${sectionIndex % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image - alternating order */}
                <div className={`${sectionIndex % 2 === 1 ? 'lg:order-2 animate-slide-right' : 'lg:order-1 animate-slide-left'}`}>
                  <div className="overflow-hidden rounded-lg shadow-soft hover:shadow-glow transition-all duration-500">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-auto object-cover hover-zoom"
                      style={{ filter: 'brightness(1.05) saturate(1.1)' }}
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text content - alternating order */}
                <div className={`space-y-4 text-gray-700 leading-relaxed ${sectionIndex % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  {section.content.map((paragraph, index) => {
                    // Check if this is the last section (Készen állsz?) and first paragraph
                    if (section.id === 'keszen-allsz' && index === 0) {
                      // Split at "vedd fel velem a kapcsolatot"
                      const parts = paragraph.split('vedd fel velem a kapcsolatot');
                      return (
                        <p key={index}>
                          {parts[0]}
                          <Link
                            to="/contact"
                            className="text-primary-700 hover:text-primary-800 underline font-medium"
                          >
                            vedd fel velem a kapcsolatot
                          </Link>
                          {parts[1]}
                        </p>
                      );
                    }
                    return <p key={index}>{paragraph}</p>;
                  })}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <div className="relative mt-16 bg-gradient-to-br from-primary-50 via-primary-100 to-primary-50 py-12 overflow-hidden">
          {/* Floating blur elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-5 left-10 w-64 h-64 bg-primary-300 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-5 right-10 w-80 h-80 bg-accent-warm rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
          <div className="container mx-auto px-4 text-center">
            <Link
              to="/contact"
              className="relative z-10 inline-block bg-primary-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-800 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 shimmer"
            >
              Kapcsolatfelvétel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photoshooting;
