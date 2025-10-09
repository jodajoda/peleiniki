import { useState } from 'react';
import Lightbox from '../components/Lightbox';

const Portfolio = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);

  const portfolioGroups = [
    {
      id: 'margitsziget',
      title: 'Családfotózás Margitszigeten',
      description: 'Egy kellemes délután a Margitszigeten, ahol a család játékosan töltötte az időt.',
      images: [
        { src: '/peleiniki/assets/portfolio/csaladfotozes-margitszigeten/Csaladfotozas-Szantner-VargaEvi-Margitsziget_20240609-04022.jpg', alt: 'Családfotózás Margitszigeten' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-margitszigeten/Csaladfotozas-Szantner-VargaEvi-Margitsziget_20240609-04063.jpg', alt: 'Családfotózás Margitszigeten' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-margitszigeten/Csaladfotozas-Szantner-VargaEvi-Margitsziget_20240609-04123.jpg', alt: 'Családfotózás Margitszigeten' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-margitszigeten/Csaladfotozas-Szantner-VargaEvi-Margitsziget_20240609-04145-2.jpg', alt: 'Családfotózás Margitszigeten' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-margitszigeten/Csaladfotozas-Szantner-VargaEvi-Margitsziget_20240609-04201.jpg', alt: 'Családfotózás Margitszigeten' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-margitszigeten/Csaladfotozas-Szantner-VargaEvi-Margitsziget_20240609-04217.jpg', alt: 'Családfotózás Margitszigeten' },
      ],
    },
    {
      id: 'jatszoteri-moka',
      title: 'Játszótéri móka',
      description: 'Spontán pillanatok a játszótéren, ahol a gyerekek szabadon játszhatnak.',
      images: [
        { src: '/peleiniki/assets/portfolio/jatszoteri-moka/EsoManoProjekt_20241018-02814.jpg', alt: 'Játszótéri fotózás' },
        { src: '/peleiniki/assets/portfolio/jatszoteri-moka/EsoManoProjekt_20241018-02821.jpg', alt: 'Játszótéri fotózás' },
        { src: '/peleiniki/assets/portfolio/jatszoteri-moka/EsoManoProjekt_20241018-02829.jpg', alt: 'Játszótéri fotózás' },
        { src: '/peleiniki/assets/portfolio/jatszoteri-moka/EsoManoProjekt_20241018-02831.jpg', alt: 'Játszótéri fotózás' },
        { src: '/peleiniki/assets/portfolio/jatszoteri-moka/EsoManoProjekt_20241018-02845.jpg', alt: 'Játszótéri fotózás' },
        { src: '/peleiniki/assets/portfolio/jatszoteri-moka/EsoManoProjekt_20241018-02851.jpg', alt: 'Játszótéri fotózás' },
      ],
    },
    {
      id: 'flori-keresztelo',
      title: 'Flori keresztelője',
      description: 'Egy különleges családi esemény megörökítése.',
      images: [
        { src: '/peleiniki/assets/portfolio/flori-keresztelo/RaczDorottya-Keresztelo_20241027-08422.JPG', alt: 'Keresztelő fotózás' },
        { src: '/peleiniki/assets/portfolio/flori-keresztelo/RaczDorottya-Keresztelo_20241027-08458.JPG', alt: 'Keresztelő fotózás' },
        { src: '/peleiniki/assets/portfolio/flori-keresztelo/RaczDorottya-Keresztelo_20241027-08471.JPG', alt: 'Keresztelő fotózás' },
        { src: '/peleiniki/assets/portfolio/flori-keresztelo/RaczDorottya-Keresztelo_20241027-08523.JPG', alt: 'Keresztelő fotózás' },
        { src: '/peleiniki/assets/portfolio/flori-keresztelo/RaczDorottya-Keresztelo_20241027-08546.JPG', alt: 'Keresztelő fotózás' },
        { src: '/peleiniki/assets/portfolio/flori-keresztelo/RaczDorottya-Keresztelo_20241027-08560.JPG', alt: 'Keresztelő fotózás' },
      ],
    },
    {
      id: 'kismama-otthon',
      title: 'Kismamafotózás otthon',
      description: 'Intim pillanatok otthon, a babavárás izgalmával.',
      images: [
        { src: '/peleiniki/assets/portfolio/kismamafotozas-otthon/MD-Csalad-Kismamafotozas-20250816-05822.JPG', alt: 'Kismamafotózás' },
        { src: '/peleiniki/assets/portfolio/kismamafotozas-otthon/MD-Csalad-Kismamafotozas-20250816-05855.JPG', alt: 'Kismamafotózás' },
        { src: '/peleiniki/assets/portfolio/kismamafotozas-otthon/MD-Csalad-Kismamafotozas-20250816-06190.JPG', alt: 'Kismamafotózás' },
        { src: '/peleiniki/assets/portfolio/kismamafotozas-otthon/MD-Csalad-Kismamafotozas-20250816-06670.JPG', alt: 'Kismamafotózás' },
        { src: '/peleiniki/assets/portfolio/kismamafotozas-otthon/MD-Csalad-Kismamafotozas-20250816-06690.JPG', alt: 'Kismamafotózás' },
        { src: '/peleiniki/assets/portfolio/kismamafotozas-otthon/MD-Csalad-Kismamafotozas-20250816-07138.JPG', alt: 'Kismamafotózás' },
      ],
    },
    {
      id: 'varosliget',
      title: 'Családfotózás a Városligetben',
      description: 'Természetes környezetben, a Városliget zöld oázisában.',
      images: [
        { src: '/peleiniki/assets/portfolio/csaladfotozes-a-varosligetben/DemjenCsalad_Varosliget_20240730-08170.jpg', alt: 'Családfotózás Városligetben' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-a-varosligetben/DemjenCsalad_Varosliget_20240730-08172.jpg', alt: 'Családfotózás Városligetben' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-a-varosligetben/DemjenCsalad_Varosliget_20240730-08188.jpg', alt: 'Családfotózás Városligetben' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-a-varosligetben/DemjenCsalad_Varosliget_20240730-08195.jpg', alt: 'Családfotózás Városligetben' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-a-varosligetben/DemjenCsalad_Varosliget_20240730-08219.jpg', alt: 'Családfotózás Városligetben' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-a-varosligetben/DemjenCsalad_Varosliget_20240730-08242-2.jpg', alt: 'Családfotózás Városligetben' },
      ],
    },
    {
      id: 'csalad-otthon',
      title: 'Családfotózás otthon',
      description: 'Otthoni környezetben, ahol a család a leginkább önmaga lehet.',
      images: [
        { src: '/peleiniki/assets/portfolio/csaladfotozes-otthon/JancsoIldiko-Csaladi_20241019_k-03928.JPG', alt: 'Családfotózás otthon' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-otthon/JancsoIldiko-Csaladi_20241019_k-03984.JPG', alt: 'Családfotózás otthon' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-otthon/JancsoIldiko-Csaladi_20241019_k-04107.JPG', alt: 'Családfotózás otthon' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-otthon/JancsoIldiko-Csaladi_20241019_k-04112.JPG', alt: 'Családfotózás otthon' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-otthon/JancsoIldiko-Csaladi_20241019_k-04163.JPG', alt: 'Családfotózás otthon' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-otthon/JancsoIldiko-Csaladi_20241019_k-04196.JPG', alt: 'Családfotózás otthon' },
      ],
    },
    {
      id: 'szulinap',
      title: 'Szülinapi fotózás',
      description: 'Egy különleges nap, tele örömmel és nevetéssel.',
      images: [
        { src: '/peleiniki/assets/portfolio/szulinap/NKR-Csaladfotozas_20250517-03892.JPG', alt: 'Szülinapi fotózás' },
        { src: '/peleiniki/assets/portfolio/szulinap/NKR-Csaladfotozas_20250517-03974.JPG', alt: 'Szülinapi fotózás' },
        { src: '/peleiniki/assets/portfolio/szulinap/NKR-Csaladfotozas_20250517-03979.JPG', alt: 'Szülinapi fotózás' },
        { src: '/peleiniki/assets/portfolio/szulinap/NKR-Csaladfotozas_20250517-04509.JPG', alt: 'Szülinapi fotózás' },
        { src: '/peleiniki/assets/portfolio/szulinap/NKR-Csaladfotozas_20250517-04599.JPG', alt: 'Szülinapi fotózás' },
        { src: '/peleiniki/assets/portfolio/szulinap/NKR-Csaladfotozas_20250517-04648.JPG', alt: 'Szülinapi fotózás' },
      ],
    },
  ];

  const openLightbox = (groupIndex, imageIndex) => {
    setCurrentGroup(groupIndex);
    setLightboxIndex(imageIndex);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setCurrentGroup(null);
  };

  const nextImage = () => {
    if (currentGroup !== null) {
      const totalImages = portfolioGroups[currentGroup].images.length;
      setLightboxIndex((prev) => (prev + 1) % totalImages);
    }
  };

  const prevImage = () => {
    if (currentGroup !== null) {
      const totalImages = portfolioGroups[currentGroup].images.length;
      setLightboxIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-fade-in text-gradient-primary">
          Portfólió
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto animate-slide-left stagger-1">
          Válogatás munkáimból
        </p>
      </div>

      <div className="space-y-20">
        {portfolioGroups.map((group, groupIndex) => (
          <section
            key={group.id}
            className="relative bg-gradient-to-br from-primary-50 via-primary-100 to-primary-50 overflow-hidden py-16 animate-fade-in"
            style={{ animationDelay: `${groupIndex * 0.1}s` }}
          >
            {/* Floating blur elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 w-72 h-72 bg-primary-300 rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-warm rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
            <div className="container mx-auto px-4">
              <div className="mb-8 relative z-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 animate-slide-right">
                  {group.title}
                </h2>
                <p className="text-gray-600 animate-fade-in stagger-1">{group.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                {group.images.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    className="relative overflow-hidden rounded-lg cursor-pointer group shadow-soft hover:shadow-soft-lg transition-all duration-500 animate-scale-in"
                    style={{ animationDelay: `${imageIndex * 0.05}s` }}
                    onClick={() => openLightbox(groupIndex, imageIndex)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-72 object-cover hover-zoom image-soft-glow"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && currentGroup !== null && (
        <Lightbox
          images={portfolioGroups[currentGroup].images}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  );
};

export default Portfolio;
