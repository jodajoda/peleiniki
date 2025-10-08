import { Link } from 'react-router-dom';

const Photoshooting = () => {
  const sections = [
    {
      id: 'lazabb-fotozes',
      title: 'A Lazább fotózás',
      images: [
        '/peleiniki/assets/homepage/homepage-07031.jpg',
        '/peleiniki/assets/homepage/homepage-07078.jpg',
        '/peleiniki/assets/homepage/homepage-01034.jpg',
        '/peleiniki/assets/homepage/homepage-01066.jpg',
      ],
      content: [
        'Nálam nem kell kicsinosítanod magad, felöltöznöd, tökéletesnek lenned. Sőt! Annál jobb, minél lazábban érzitek magatokat. Akár pizsamában, kócos hajjal, kávéval a kezedben – pont olyannak, amilyenek vagytok egy hétköznap reggelén.',
        'Ez nem egy klasszikus "fotózás". Ez inkább olyan, mintha átjönnék egy kávéra, miközben ti csináljátok a dolgotokat. Játszotok a gyerekkel, bújós, cicázás, vagy csak úgy lótok-futotok a lakásban. Én meg közben csendben megörökítem, ahogy éltek, nevetgéltek, ölelgezitek egymást.',
        'Lehet otthon a kanapén hempergőzve, a konyhában süti sütés közben, vagy a játszószőnyegen autózgatva. Az a lényeg, hogy ti jól érezzétek magatokat, és közben én elkaptam azokat a pillanatokat, amiket évek múlva is szeretnétek majd visszanézni.',
      ],
    },
    {
      id: 'nincs-poz',
      title: 'Nincs póz, csak élet',
      images: [
        '/peleiniki/assets/homepage/homepage-07168.jpg',
        '/peleiniki/assets/homepage/homepage-07212.jpg',
        '/peleiniki/assets/homepage/homepage-01123.jpg',
        '/peleiniki/assets/homepage/homepage-01141.jpg',
      ],
      content: [
        'Nálam nem lesz „Nézz a kamerába és mosolyogj!" felszólítás. Ehelyett játszotok, nevettek, ölelitek egymást, és én közben diszkréten megörökítem a pillanatokat. A képek tele lesznek élettel: a gyerek őszinte nevetésével, az apuka büszke pillantásával, az anyuka gyengéd simogatásával.',
        'Minden érzelem helyet kap: a játékos percek, a nevetés, de akár a könnycseppek és a megnyugtató ölelések is. Ezek az őszinte pillanatok teszik a fotókat igazán különlegessé és értékessé.',
      ],
    },
    {
      id: 'helyszin',
      title: 'A helyszín',
      images: [
        '/peleiniki/assets/homepage/homepage-05796.jpg',
        '/peleiniki/assets/homepage/homepage-06565.jpg',
        '/peleiniki/assets/homepage/homepage-06935.jpg',
        '/peleiniki/assets/homepage/homepage-01321.jpg',
      ],
      content: [
        'Fotózhatunk otthon, a kerted zugaiban, a kedvenc játszótereken, parkokban, vagy bármilyen más helyen, ami számotokra fontos és biztonságot ad. A saját környezetetek adja a leghitelesebb hátteret – nincs szükség stúdióra vagy mesterséges díszletekre.',
        'A lényeg, hogy olyan legyen a helyszín, ahol jól érzitek magatokat, ahol szabadon mozoghattok, és ahol a gyerekek is természetesen viselkednek.',
      ],
    },
    {
      id: 'fotozes-utan',
      title: 'A fotózás után',
      images: [
        '/peleiniki/assets/homepage/homepage-07333.jpg',
        '/peleiniki/assets/homepage/homepage-07351.jpg',
        '/peleiniki/assets/homepage/homepage-07420.jpg',
        '/peleiniki/assets/homepage/homepage-01352.jpg',
      ],
      content: [
        'A fotózást követően gondosan átválogatom az összes felvételt, és kiválasztom a legszebb, legkifejezőbb pillanatokat. Ezeket professzionális szoftverekkel retusálom és színkorrigálom, hogy a végeredmény tökéletes legyen.',
        'A kész képeket online galérián keresztül kapjátok meg, ahonnan könnyedén letölthetők és megoszthatók. A képek a tieitek lesznek – nyomtathatjátok, keretezhetitek, megoszthatjátok a családdal és barátokkal.',
      ],
    },
    {
      id: 'kepzeld-el',
      title: 'Képzeld el!',
      images: [
        '/peleiniki/assets/homepage/homepage-7704.jpg',
        '/peleiniki/assets/homepage/homepage-8236.jpg',
        '/peleiniki/assets/homepage/emma-harmadik-szulinapja-20231030-06499.jpg',
        '/peleiniki/assets/homepage/emma-harmadik-szulinapja-20231030-06780.jpg',
      ],
      content: [
        'Képzeld el, hogy évek múlva visszanézed ezeket a képeket, és emlékszel arra a napra, amikor a kicsi még csak ennyike volt. A mosolyára, a nevetésére, arra, ahogy simult hozzád. Ezek az emlékek felbecsülhetetlen értékűek, és a fotók segítenek megőrizni őket.',
      ],
    },
    {
      id: 'keszen-allsz',
      title: 'Készen állsz?',
      images: [
        '/peleiniki/assets/homepage/homepage-07264.jpg',
        '/peleiniki/assets/homepage/homepage-07304.jpg',
        '/peleiniki/assets/homepage/homepage-06959.jpg',
      ],
      content: [
        'Ha felkeltette az érdeklődésed a Lazább fotózás, és szeretnéd, hogy megörökítsem a ti különleges történeteteket, vedd fel velem a kapcsolatot! Meséljétek el, milyenek vagytok, mi teszi különlegessé a ti családotokat, és találjunk egy közös időpontot!',
        'Szeretettel várlak benneteket!',
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
          A fotózás velem
        </h1>

        <div className="max-w-7xl mx-auto space-y-20">
          {sections.map((section, sectionIndex) => (
            <section
              key={section.id}
              className="animate-fade-in"
              style={{ animationDelay: `${sectionIndex * 0.1}s` }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {section.title}
              </h2>

              <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Images */}
                <div className="grid grid-cols-2 gap-4">
                  {section.images.map((image, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-lg"
                    >
                      <img
                        src={image}
                        alt={section.title}
                        className="w-full h-64 object-cover hover-zoom"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                {/* Text content */}
                <div className="space-y-4 text-gray-700 leading-relaxed">
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
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-block bg-primary-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors"
          >
            Kapcsolatfelvétel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Photoshooting;
