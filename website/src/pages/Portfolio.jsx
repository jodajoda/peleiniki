import { useState } from 'react';
import Lightbox from '../components/Lightbox';
import LazyImage from '../components/LazyImage';

const Portfolio = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);

  const portfolioGroups = [
    {
      id: 'margitsziget',
      title: 'Családfotózás Margitszigeten',
      description: 'Egy kellemes délután a Margitszigeten, ahol a család játékosan töltötte az időt.',
      images: [
        { src: '/peleiniki/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-1.jpg', alt: 'Családfotózás Margitszigeten' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-2.jpg', alt: 'Családfotózás Margitszigeten' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-3.jpg', alt: 'Családfotózás Margitszigeten' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-4.jpg', alt: 'Családfotózás Margitszigeten' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-5.jpg', alt: 'Családfotózás Margitszigeten' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-margitszigeten/margitsziget-6.jpg', alt: 'Családfotózás Margitszigeten' },
      ],
    },
    {
      id: 'jatszoteri-moka',
      title: 'Játszótéri móka',
      description: 'Spontán pillanatok a játszótéren, ahol a gyerekek szabadon játszhatnak.',
      images: [
        { src: '/peleiniki/assets/portfolio/jatszoteri-moka/jatszoteri-moka-1.jpg', alt: 'Játszótéri fotózás' },
        { src: '/peleiniki/assets/portfolio/jatszoteri-moka/jatszoteri-moka-2.jpg', alt: 'Játszótéri fotózás' },
        { src: '/peleiniki/assets/portfolio/jatszoteri-moka/jatszoteri-moka-3.jpg', alt: 'Játszótéri fotózás' },
        { src: '/peleiniki/assets/portfolio/jatszoteri-moka/jatszoteri-moka-5.jpg', alt: 'Játszótéri fotózás' },
        { src: '/peleiniki/assets/portfolio/jatszoteri-moka/jatszoteri-moka-6.jpg', alt: 'Játszótéri fotózás' },
      ],
    },
    {
      id: 'keresztelo',
      title: 'Keresztelő',
      description: 'Egy különleges családi esemény megörökítése.',
      images: [
        { src: '/peleiniki/assets/portfolio/keresztelo/keresztelo-1.JPG', alt: 'Keresztelő fotózás' },
        { src: '/peleiniki/assets/portfolio/keresztelo/keresztelo-2.JPG', alt: 'Keresztelő fotózás' },
        { src: '/peleiniki/assets/portfolio/keresztelo/keresztelo-3.JPG', alt: 'Keresztelő fotózás' },
        { src: '/peleiniki/assets/portfolio/keresztelo/keresztelo-4.JPG', alt: 'Keresztelő fotózás' },
        { src: '/peleiniki/assets/portfolio/keresztelo/keresztelo-5.JPG', alt: 'Keresztelő fotózás' },
        { src: '/peleiniki/assets/portfolio/keresztelo/keresztelo-6.JPG', alt: 'Keresztelő fotózás' },
      ],
    },
    {
      id: 'kismama-otthon',
      title: 'Kismamafotózás otthon',
      description: 'Intim pillanatok otthon, a babavárás izgalmával.',
      images: [
        { src: '/peleiniki/assets/portfolio/kismamafotozas-otthon/kismama-otthon-1.JPG', alt: 'Kismamafotózás' }, // Column 1, Row 1
        { src: '/peleiniki/assets/portfolio/kismamafotozas-otthon/kismama-otthon-2.JPG', alt: 'Kismamafotózás' }, // Column 1, Row 2
        { src: '/peleiniki/assets/portfolio/kismamafotozas-otthon/kismama-otthon-3.JPG', alt: 'Kismamafotózás' }, // Column 2 (standing)
        { src: '/peleiniki/assets/portfolio/kismamafotozas-otthon/kismama-otthon-4.JPG', alt: 'Kismamafotózás' }, // Column 3, Row 1
        { src: '/peleiniki/assets/portfolio/kismamafotozas-otthon/kismama-otthon-5.JPG', alt: 'Kismamafotózás' }, // Column 3, Row 2
      ],
    },
    {
      id: 'varosliget',
      title: 'Családfotózás a Városligetben',
      description: 'Természetes környezetben, a Városliget zöld oázisában.',
      images: [
        { src: '/peleiniki/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-1.jpg', alt: 'Családfotózás Városligetben' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-2.jpg', alt: 'Családfotózás Városligetben' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-3.jpg', alt: 'Családfotózás Városligetben' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-4.jpg', alt: 'Családfotózás Városligetben' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-5.jpg', alt: 'Családfotózás Városligetben' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-a-varosligetben/varosliget-6.jpg', alt: 'Családfotózás Városligetben' },
      ],
    },
    {
      id: 'csalad-otthon',
      title: 'Családfotózás otthon',
      description: 'Otthoni környezetben, ahol a család a leginkább önmaga lehet.',
      images: [
        { src: '/peleiniki/assets/portfolio/csaladfotozes-otthon/csalad-otthon-1.JPG', alt: 'Családfotózás otthon' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-otthon/csalad-otthon-2.JPG', alt: 'Családfotózás otthon' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-otthon/csalad-otthon-3.JPG', alt: 'Családfotózás otthon' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-otthon/csalad-otthon-4.JPG', alt: 'Családfotózás otthon' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-otthon/csalad-otthon-5.JPG', alt: 'Családfotózás otthon' },
        { src: '/peleiniki/assets/portfolio/csaladfotozes-otthon/csalad-otthon-6.JPG', alt: 'Családfotózás otthon' },
      ],
    },
    {
      id: 'szulinap',
      title: 'Szülinapi fotózás',
      description: 'Egy különleges nap, tele örömmel és nevetéssel.',
      images: [
        { src: '/peleiniki/assets/portfolio/szulinap/szulinap-1.JPG', alt: 'Szülinapi fotózás' },
        { src: '/peleiniki/assets/portfolio/szulinap/szulinap-2.JPG', alt: 'Szülinapi fotózás' },
        { src: '/peleiniki/assets/portfolio/szulinap/szulinap-3.JPG', alt: 'Szülinapi fotózás' },
        { src: '/peleiniki/assets/portfolio/szulinap/szulinap-4.JPG', alt: 'Szülinapi fotózás' },
        { src: '/peleiniki/assets/portfolio/szulinap/szulinap-5.JPG', alt: 'Szülinapi fotózás' },
        { src: '/peleiniki/assets/portfolio/szulinap/szulinap-6.jpg', alt: 'Szülinapi fotózás' },
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

              {group.id === 'jatszoteri-moka' ? (
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 relative z-10">
                  {/* First column: 4 landscape images in 2x2 grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {group.images.slice(0, 4).map((image, imageIndex) => (
                      <button
                        key={imageIndex}
                        type="button"
                        className="relative overflow-hidden rounded-lg cursor-pointer group hover:shadow-soft-lg transition-all duration-500 animate-scale-in w-full text-left focus:outline-none focus:ring-4 focus:ring-primary-500"
                        style={{ animationDelay: `${imageIndex * 0.05}s` }}
                        onClick={() => openLightbox(groupIndex, imageIndex)}
                        aria-label={`${image.alt} megnyitása nagyobb méretben`}
                      >
                        <LazyImage
                          src={image.src}
                          alt={image.alt}
                          className="h-72 hover-zoom image-soft-glow"
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
                      </button>
                    ))}
                  </div>

                  {/* Second column: 1 tall standing image */}
                  {group.images.slice(4).map((image, imageIndex) => (
                    <button
                      key={imageIndex + 4}
                      type="button"
                      className="relative overflow-hidden rounded-lg cursor-pointer group hover:shadow-soft-lg transition-all duration-500 animate-scale-in w-full text-left focus:outline-none focus:ring-4 focus:ring-primary-500 h-[calc(36rem+1rem)]"
                      style={{ animationDelay: `${(imageIndex + 4) * 0.05}s` }}
                      onClick={() => openLightbox(groupIndex, imageIndex + 4)}
                      aria-label={`${image.alt} megnyitása nagyobb méretben`}
                    >
                      <LazyImage
                        src={image.src}
                        alt={image.alt}
                        className="h-full hover-zoom image-soft-glow"
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
                    </button>
                  ))}
                </div>
              ) : group.id === 'kismama-otthon' ? (
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-4 relative z-10">
                  {/* First column: 2 landscape images (kismama-otthon-1, kismama-otthon-4) */}
                  <div className="grid grid-cols-1 gap-4">
                    {[0, 1].map((index) => {
                      const image = group.images[index];
                      return (
                        <button
                          key={index}
                          type="button"
                          className="relative overflow-hidden rounded-lg cursor-pointer group hover:shadow-soft-lg transition-all duration-500 animate-scale-in w-full text-left focus:outline-none focus:ring-4 focus:ring-primary-500"
                          style={{ animationDelay: `${index * 0.05}s` }}
                          onClick={() => openLightbox(groupIndex, index)}
                          aria-label={`${image.alt} megnyitása nagyobb méretben`}
                        >
                          <LazyImage
                            src={image.src}
                            alt={image.alt}
                            className="h-72 hover-zoom image-soft-glow"
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
                        </button>
                      );
                    })}
                  </div>

                  {/* Second column: 1 tall standing image (kismama-otthon-5) */}
                  <button
                    type="button"
                    className="relative overflow-hidden rounded-lg cursor-pointer group hover:shadow-soft-lg transition-all duration-500 animate-scale-in w-full text-left focus:outline-none focus:ring-4 focus:ring-primary-500 h-[calc(36rem+1rem)]"
                    style={{ animationDelay: '0.1s' }}
                    onClick={() => openLightbox(groupIndex, 2)}
                    aria-label={`${group.images[2].alt} megnyitása nagyobb méretben`}
                  >
                    <LazyImage
                      src={group.images[2].src}
                      alt={group.images[2].alt}
                      className="h-full hover-zoom image-soft-glow"
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
                  </button>

                  {/* Third column: 2 images (kismama-otthon-3, kismama-otthon-2) */}
                  <div className="grid grid-cols-1 gap-4">
                    {[3, 4].map((index) => {
                      const image = group.images[index];
                      return (
                        <button
                          key={index}
                          type="button"
                          className="relative overflow-hidden rounded-lg cursor-pointer group hover:shadow-soft-lg transition-all duration-500 animate-scale-in w-full text-left focus:outline-none focus:ring-4 focus:ring-primary-500"
                          style={{ animationDelay: `${(index + 1) * 0.05}s` }}
                          onClick={() => openLightbox(groupIndex, index)}
                          aria-label={`${image.alt} megnyitása nagyobb méretben`}
                        >
                          <LazyImage
                            src={image.src}
                            alt={image.alt}
                            className="h-72 hover-zoom image-soft-glow"
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
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                  {group.images.map((image, imageIndex) => (
                    <button
                      key={imageIndex}
                      type="button"
                      className="relative overflow-hidden rounded-lg cursor-pointer group hover:shadow-soft-lg transition-all duration-500 animate-scale-in w-full text-left focus:outline-none focus:ring-4 focus:ring-primary-500"
                      style={{ animationDelay: `${imageIndex * 0.05}s` }}
                      onClick={() => openLightbox(groupIndex, imageIndex)}
                      aria-label={`${image.alt} megnyitása nagyobb méretben`}
                    >
                      <LazyImage
                        src={image.src}
                        alt={image.alt}
                        className="h-72 hover-zoom image-soft-glow"
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
                    </button>
                  ))}
                </div>
              )}
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
